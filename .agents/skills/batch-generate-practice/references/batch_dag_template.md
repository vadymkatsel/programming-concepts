# Batch Practice Generation Plan (DAG Template)

Use this specification format during Phase 1 of `/batch-generate-practice` to map dependencies and orchestrate execution waves.

---

## 1. Scope & Course Context

- **Target Course(s)**: `courses/<course-name>/` (e.g., `courses/ebd-course/`, `courses/be-course/`, `courses/math-course/`)
- **Shared Narrative / Domain Story**: (e.g., «Аналіз фінансових транзакцій банку», «Логістика інтернет-магазину», «Обробка експериментальних даних»)

---

## 2. Prior Course Context (Targeted Verification)

- **Baseline Assumed Primitives**: (e.g., `print()`, basic math, `int`/`float`/`str`, `input()`, `if/else`)
- **On-Demand File Lookups (if needed)**:
  - *Module Checked*: `courses/<course>/modules/<topic>/<file>.qmd`
  - *Syntax Verified*: (e.g., `list.append()`, `range()`, `dict.keys()`)
  - *Status*: ✅ Вже вивчено (дозволено для Warm Up) / ❌ Ще не вивчалось (заборонено)

---

## 3. Dependency Graph & Execution Waves

| ID | Практика (Тема) | Файл (.qmd) | Архетип | Батьківські модулі | Хвиля | Режим |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **M1** | Основи списків | `lists-intro-ps.qmd` | `standard-coding` | None (кореневий) | **Wave 1** | Parallel |
| **M2** | Налаштування Git CLI | `git-cli-setup-ps.qmd` | `tooling-setup` | None (інструментарій) | **Wave 1** | Parallel |
| **M3** | Методи списків та зрізи | `lists-methods-ps.qmd` | `standard-coding` | **M1** | **Wave 2** | Sequential |
| **M4** | Вкладені списки й матриці | `nested-lists-ps.qmd` | `standard-coding` | **M3** | **Wave 3** | Sequential |

---

## 4. Syntax Boundaries per Node

| ID | Дозволений синтаксис для `Warm Up` (Prior Syntax Only) | Новий синтаксис модуля (`Live / Guided`) |
| :--- | :--- | :--- |
| **M1** | Базові змінні, типи даних, математичні оператори, `if/else` | `list()`, `[]`, `.append()`, `len()`, індексація `lst[i]` |
| **M2** | Термінал CLI basics | `git init`, `git status`, `git add`, `git commit` |
| **M3** | Усе з M1 + змінні/умови | `.pop()`, `.remove()`, `.sort()`, `slicing [start:stop:step]` |
| **M4** | Усе з M1 та M3 | Вкладена індексація `matrix[i][j]`, подвійні цикли `for` |

---

## 5. Execution & Audit Checklist

- [ ] **Wave 1 Execution**:
  - [ ] M1: Designer Draft ➔ Critic Audit (Iter 1-3) ➔ Approved
  - [ ] M2: Designer Draft ➔ Critic Audit (Iter 1-3) ➔ Approved
- [ ] **Wave 1 Cheat Sheet Extraction**:
  - [ ] M1 `## 📝 Cheat Sheet` extracted for M3
- [ ] **Wave 2 Execution**:
  - [ ] M3: Designer Draft ➔ Critic Audit (Iter 1-3) ➔ Approved
- [ ] **Cross-Coherence Audit**:
  - [ ] No duplicate Live Coding or Guided Practice tasks across M1, M3, M4
  - [ ] Warm Up purity checked across all modules
- [ ] **Atomic Sidebar Integration**:
  - [ ] Single atomic update to `_quarto.yml` under corresponding sections
