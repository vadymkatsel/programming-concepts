# Workspace Agent Rules

## Git Commit Convention

All git commits must follow the conventional commits standard. 
Specifically, use the format:
`<type>(<scope>): <message>`

### Allowed Commit Types:
- **`feat`**: Значні нові функції чи суттєвий новий контент (новий модуль, практична робота, новий розділ сайту, нова інтерактивна фіча). НЕ використовувати для дрібних правок чи заміни картинок.
- **`fix`**: Виправлення помилок, збоїв білду, багів рендерингу Quarto, битих посилань або одруківок.
- **`style`**: Зміни у візуальному дизайні, темах, CSS-стилях, відступах чи UI-компонентах.
- **`refactor`**: Структурні зміни коду чи контенту без додавання нової функціональності (наприклад, заміна формату діаграм, оптимізація медіа, реорганізація файлів).
- **`docs`**: Оновлення README, інструкцій для агентів або текстової документації проєкту.
- **`chore`**: Технічні задачі (налаштування CI/CD, оновлення конфігів Quarto/Git, бейджі версій, кеш `_freeze/`).
- **`ci`**: Специфічні зміни в GitHub Actions пайплайнах (`.github/workflows/`).

Example: `fix(ebd-course): replace mermaid blocks with native SVG diagrams`

## Committing

You must NEVER execute `git commit` or push code without explicit permission from the user. Always ask for permission or wait for the user to instruct you to commit.

## Versioning & Git Tagging

1. **Landing Page Version Bump**: When creating commits for new features, bug fixes, or significant refactoring, always bump the semantic version tag in the landing page (`index.html` at the `sys-badge` element, e.g. `<span class="sys-badge"><span class="badge-label">V:</span> ...>2.0.x</span></span>`).
2. **Mandatory Git Tag for `feat`**: When creating a commit of type `feat(...)`, you MUST create a Git tag corresponding to the bumped version with a `v` prefix (e.g. `git tag v2.0.7`). Git tags must always remain in sync with the landing page badge.

## Available Custom Agents (`.agents/agents/`)

- **`curriculum-orchestrator`** (`.agents/agents/curriculum-orchestrator.md`): Curriculum architect and batch orchestrator for multi-practice generation, DAG dependency planning, and cross-module coherence.
- **`educational-designer`** (`.agents/agents/educational-designer.md`): Main pedagogical content generator for Python beginners.
- **`educational-critic`** (`.agents/agents/educational-critic.md`): Strict reviewer for pedagogical flow, AST backticks, and Quarto standards.
- **`web-architect`** (`.agents/agents/web-architect.md`): UI/UX, CSS styling, and `_quarto.yml` structure specialist.

## Strict Agent Usage & No-Bureaucracy Policy

1. **Strict Agent Registry**:
   - **DO NOT invent, generate, or configure new agents** (e.g., `orchestrator_1`, `sentinel_1`, `survey_*`, ad-hoc team managers).
   - Use ONLY the existing agents defined in `.agents/agents/` (`curriculum-orchestrator`, `educational-designer`, `educational-critic`, `web-architect`) unless the user explicitly asks to create a new agent.
   - Always load role instructions directly from their files in `.agents/agents/`.

2. **No Meta-Bureaucracy & No Temporary Agent Files**:
   - Strictly forbidden to create temporary briefing files, surveys (`teamwork_preview_explorer_survey_*`), or scratch orchestrator folders inside `.agents/` or the workspace.
   - No multi-agent deliberation loops or endless meta-planning.
   - Direct execution only: read target files -> apply code/content changes -> verify.

## Available Skills & Slash Commands (`.agents/skills/`)

- **`/generate-practice`** (`.agents/skills/generate-practice/SKILL.md`): End-to-end workflow to generate, critique (up to 3 iterations), and register new practice `.qmd` files across courses (`courses/ebd-course`, `courses/be-course`, `courses/math-course`).
- **`/batch-generate-practice`** (`.agents/skills/batch-generate-practice/SKILL.md`): Multi-practice curriculum orchestrator. Builds dependency DAGs, executes parallel/sequential subagent waves with on-demand prior-knowledge verification, maintains cross-module pedagogical coherence, and performs atomic `_quarto.yml` registration.

## Quarto Rendering & Safe Development Policy

- **Do not run `quarto render` for trivial edits**: Running full compilation or project builds after minor CSS updates (`style.css`), small wording adjustments, or isolated spacing changes is strictly forbidden. Such localized edits do not break Quarto builds and needlessly waste execution time.
- **When running `quarto render` is mandatory**:
  - Modifications to Quarto configuration (`_quarto.yml`).
  - Adding or extensively refactoring modules or practical sessions (`.qmd`) containing executable code blocks (`{python}`, `{pyodide}`, `ojs`).
  - Large-scale structural changes across multiple modules simultaneously.
  - Final pre-release verification or upon explicit user request.



