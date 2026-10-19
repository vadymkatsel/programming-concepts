#!/usr/bin/env python3
"""
Incremental Content-Addressed PDF Builder for Quarto Website.

Decouples expensive Typst PDF compilation from HTML rendering:
1. Computes SHA-256 hashes of every .qmd file (+ local assets + _quarto.yml typst config).
2. Restores unchanged PDFs from local/CI cache (.pdf-cache/) or live GitHub Pages.
3. Batch-renders ONLY new or modified .qmd files via `quarto render ... --to typst`.
4. Ensures every rendered HTML page in docs/ has a valid PDF download link in #TOC.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
COURSES_DIR = ROOT_DIR / "courses"
DOCS_DIR = ROOT_DIR / "docs"
CACHE_DIR = ROOT_DIR / ".pdf-cache"
MANIFEST_NAME = "pdf-manifest.json"
LIVE_SITE_URL = "https://vadymkatsel.github.io/programming-concepts"
PDF_LINK_TEXT = "Завантажити PDF"


def get_typst_config_hash() -> str:
    """Hash the _quarto.yml typst block so global PDF config changes invalidate cache."""
    quarto_yml = ROOT_DIR / "_quarto.yml"
    if not quarto_yml.exists():
        return ""
    content = quarto_yml.read_text(encoding="utf-8")
    match = re.search(r"(?m)^  typst:\s*\n(?:    .*\n?)*", content)
    typst_block = match.group(0) if match else ""
    return hashlib.sha256(typst_block.encode("utf-8")).hexdigest()[:16]


def compute_qmd_hash(qmd_path: Path, global_cfg_hash: str) -> str:
    """Compute SHA-256 of .qmd content plus local sources/images in the same module dir."""
    hasher = hashlib.sha256()
    hasher.update(global_cfg_hash.encode("utf-8"))
    hasher.update(qmd_path.read_bytes())

    sources_dir = qmd_path.parent / "sources"
    if sources_dir.is_dir():
        for asset in sorted(sources_dir.rglob("*")):
            if asset.is_file():
                hasher.update(str(asset.relative_to(qmd_path.parent)).encode("utf-8"))
                hasher.update(asset.read_bytes())

    return hasher.hexdigest()


def load_json_file(path: Path) -> dict[str, str]:
    if path.is_file():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def fetch_live_manifest() -> dict[str, str]:
    url = f"{LIVE_SITE_URL}/{MANIFEST_NAME}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Quarto-PDF-Cache/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                return json.loads(resp.read().decode("utf-8"))
    except Exception:
        pass
    return {}


def get_git_changed_qmds() -> set[str]:
    """Return set of relative posix paths of .qmd files changed in HEAD~1..HEAD or working tree."""
    changed: set[str] = set()
    for cmd in (
        ["git", "diff", "--name-only", "HEAD~1", "HEAD", "--", "courses/"],
        ["git", "diff", "--name-only", "HEAD", "--", "courses/"],
    ):
        try:
            res = subprocess.run(cmd, cwd=ROOT_DIR, capture_output=True, text=True, check=False)
            if res.returncode == 0:
                for line in res.stdout.splitlines():
                    line = line.strip().replace("\\", "/")
                    if line.endswith(".qmd"):
                        changed.add(line)
        except Exception:
            pass
    return changed


def download_live_pdf(rel_pdf_posix: str, dest_path: Path) -> bool:
    url = f"{LIVE_SITE_URL}/{rel_pdf_posix}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Quarto-PDF-Cache/1.0"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            if resp.status == 200 and data.startswith(b"%PDF"):
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                dest_path.write_bytes(data)
                return True
    except Exception:
        pass
    return False


def ensure_html_pdf_link(html_path: Path, pdf_filename: str) -> None:
    """Ensure <div class="quarto-alternate-formats"> is present inside #TOC in HTML."""
    if not html_path.is_file():
        return

    html = html_path.read_text(encoding="utf-8")
    alt_block = (
        f'<div class="quarto-alternate-formats">'
        f'<h2>Інші формати</h2>'
        f'<ul><li><a href="{pdf_filename}">'
        f'<i class="bi bi-file-pdf"></i>{PDF_LINK_TEXT}</a></li></ul></div>'
    )

    if 'class="quarto-alternate-formats"' in html:
        updated = re.sub(
            r'<div class="quarto-alternate-formats">.*?</div>',
            alt_block,
            html,
            flags=re.DOTALL,
        )
        if updated != html:
            html_path.write_text(updated, encoding="utf-8")
        return

    # Inject right before closing </nav> of #TOC inside #quarto-margin-sidebar
    pattern = re.compile(r'(<nav id="TOC"[^>]*>.*?)(</nav>)', re.DOTALL)
    if pattern.search(html):
        updated = pattern.sub(rf"\1{alt_block}\2", html, count=1)
        html_path.write_text(updated, encoding="utf-8")


def main() -> int:
    # Ensure stdout handles UTF-8 emojis on Windows consoles
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    if not DOCS_DIR.is_dir():
        print("❌ Error: docs/ directory does not exist. Run `quarto render --to live-html` first.")
        return 1

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_manifest_path = CACHE_DIR / MANIFEST_NAME
    cache_manifest = load_json_file(cache_manifest_path)
    live_manifest: dict[str, str] | None = None
    git_changed_qmds: set[str] | None = None

    global_cfg_hash = get_typst_config_hash()
    qmd_files = sorted(COURSES_DIR.rglob("*.qmd"))

    if not qmd_files:
        print("No .qmd files found in courses/.")
        return 0

    new_manifest: dict[str, str] = {}
    to_render: list[Path] = []
    to_download: list[tuple[Path, str, Path, str]] = []
    cache_hits = 0

    for qmd_path in qmd_files:
        rel_qmd = qmd_path.relative_to(ROOT_DIR).as_posix()
        rel_pdf = qmd_path.relative_to(ROOT_DIR).with_suffix(".pdf").as_posix()
        cached_pdf = CACHE_DIR / rel_pdf
        dest_pdf = DOCS_DIR / rel_pdf
        current_hash = compute_qmd_hash(qmd_path, global_cfg_hash)

        # Layer 1: Local / GitHub Actions disk cache (.pdf-cache/)
        if (
            cache_manifest.get(rel_qmd) == current_hash
            and cached_pdf.is_file()
            and cached_pdf.stat().st_size > 0
        ):
            dest_pdf.parent.mkdir(parents=True, exist_ok=True)
            if cached_pdf.resolve() != dest_pdf.resolve():
                shutil.copy2(cached_pdf, dest_pdf)
            new_manifest[rel_qmd] = current_hash
            cache_hits += 1
            continue

        # Layer 2: Check live GitHub Pages manifest if disk cache missed
        if live_manifest is None:
            live_manifest = fetch_live_manifest()

        if live_manifest:
            if live_manifest.get(rel_qmd) == current_hash:
                to_download.append((qmd_path, rel_qmd, cached_pdf, current_hash))
            else:
                to_render.append(qmd_path)
        else:
            # Bootstrap fallback (when pdf-manifest.json is not yet deployed to live site):
            # If the .qmd was not modified in the latest commit, try fetching its existing PDF from live site
            if git_changed_qmds is None:
                git_changed_qmds = get_git_changed_qmds()
            if rel_qmd not in git_changed_qmds:
                to_download.append((qmd_path, rel_qmd, cached_pdf, current_hash))
            else:
                to_render.append(qmd_path)

    # Execute Layer 2 downloads in parallel
    live_hits = 0
    if to_download:
        print(f"🌐 Attempting to restore {len(to_download)} unchanged PDF(s) from live site...")

        def _fetch(item: tuple[Path, str, Path, str]):
            qmd_path, rel_qmd, cached_pdf, h = item
            rel_pdf = qmd_path.relative_to(ROOT_DIR).with_suffix(".pdf").as_posix()
            ok = download_live_pdf(rel_pdf, cached_pdf)
            return qmd_path, rel_qmd, rel_pdf, cached_pdf, h, ok

        with ThreadPoolExecutor(max_workers=8) as pool:
            for qmd_path, rel_qmd, rel_pdf, cached_pdf, h, ok in pool.map(_fetch, to_download):
                if ok:
                    dest_pdf = DOCS_DIR / rel_pdf
                    dest_pdf.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(cached_pdf, dest_pdf)
                    new_manifest[rel_qmd] = h
                    live_hits += 1
                else:
                    to_render.append(qmd_path)

    print(
        f"📊 PDF Status: {len(qmd_files)} total | "
        f"{cache_hits} disk cache hits | "
        f"{live_hits} live site hits | "
        f"{len(to_render)} to render"
    )

    # Render only cache-missed .qmd files in a single Quarto invocation
    if to_render:
        rel_render_args = [p.relative_to(ROOT_DIR).as_posix() for p in to_render]
        print(f"⚙️ Rendering {len(to_render)} PDF(s) via Typst: {', '.join(rel_render_args)}")
        quarto_bin = shutil.which("quarto") or "quarto"
        cmd = [quarto_bin, "render", *rel_render_args, "--to", "typst"]
        result = subprocess.run(cmd, cwd=ROOT_DIR)
        if result.returncode != 0:
            print("❌ Error: Quarto Typst rendering failed.")
            return result.returncode

        for qmd_path in to_render:
            rel_qmd = qmd_path.relative_to(ROOT_DIR).as_posix()
            rel_pdf = qmd_path.relative_to(ROOT_DIR).with_suffix(".pdf").as_posix()
            generated_pdf = DOCS_DIR / rel_pdf
            cached_pdf = CACHE_DIR / rel_pdf

            if not generated_pdf.is_file() or generated_pdf.stat().st_size == 0:
                print(f"❌ Error: Expected generated PDF missing or empty: {generated_pdf}")
                return 1

            cached_pdf.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(generated_pdf, cached_pdf)
            new_manifest[rel_qmd] = compute_qmd_hash(qmd_path, global_cfg_hash)

    # Save updated manifests to both .pdf-cache/ and docs/
    manifest_json = json.dumps(new_manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n"
    cache_manifest_path.write_text(manifest_json, encoding="utf-8")
    (DOCS_DIR / MANIFEST_NAME).write_text(manifest_json, encoding="utf-8")

    # Ensure every HTML page in docs/ has its PDF link and validate all PDFs exist
    missing_pdfs: list[str] = []
    for qmd_path in qmd_files:
        rel_pdf = qmd_path.relative_to(ROOT_DIR).with_suffix(".pdf").as_posix()
        rel_html = qmd_path.relative_to(ROOT_DIR).with_suffix(".html").as_posix()
        pdf_in_docs = DOCS_DIR / rel_pdf
        html_in_docs = DOCS_DIR / rel_html

        if not pdf_in_docs.is_file() or pdf_in_docs.stat().st_size == 0:
            missing_pdfs.append(rel_pdf)
            continue

        ensure_html_pdf_link(html_in_docs, pdf_in_docs.name)

    if missing_pdfs:
        print(f"❌ Validation failed! Missing PDFs in docs/: {missing_pdfs}")
        return 1

    print(f"✅ All {len(qmd_files)} PDFs and HTML download links verified in docs/!")
    return 0


if __name__ == "__main__":
    sys.exit(main())
