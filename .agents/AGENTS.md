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

## Available Custom Agents (`.agents/agents/`)

- **`educational-designer`** (`.agents/agents/educational-designer.md`): Main pedagogical content generator for Python beginners.
- **`educational-critic`** (`.agents/agents/educational-critic.md`): Strict reviewer for pedagogical flow, AST backticks, and Quarto standards.
- **`web-architect`** (`.agents/agents/web-architect.md`): UI/UX, CSS styling, and `_quarto.yml` structure specialist.

## Available Skills & Slash Commands (`.agents/skills/`)

- **`/generate-practice`** (`.agents/skills/generate-practice/SKILL.md`): End-to-end workflow to generate, critique (up to 3 iterations), and register new practice `.qmd` files across courses (`courses/ebd-course`, `courses/be-course`, `courses/math-course`).

