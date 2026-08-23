# Workspace Agent Rules

## Git Commit Convention

All git commits must follow the conventional commits standard. 
Specifically, use the format:
`<type>(<scope>): <message>`

Example: `refactor(ebd-course): merge Live Coding 4 into Capstone`

## Committing

You must NEVER execute `git commit` or push code without explicit permission from the user. Always ask for permission or wait for the user to instruct you to commit.

## Available Custom Agents (`.agents/agents/`)

- **`educational-designer`** (`.agents/agents/educational-designer.md`): Main pedagogical content generator for Python beginners.
- **`educational-critic`** (`.agents/agents/educational-critic.md`): Strict reviewer for pedagogical flow, AST backticks, and Quarto standards.
- **`web-architect`** (`.agents/agents/web-architect.md`): UI/UX, CSS styling, and `_quarto.yml` structure specialist.

## Available Skills & Slash Commands (`.agents/skills/`)

- **`/generate-practice`** (`.agents/skills/generate-practice/SKILL.md`): End-to-end workflow to generate, critique (up to 3 iterations), and register new practice `.qmd` files across courses (`courses/ebd-course`, `courses/be-course`, `courses/math-course`).

