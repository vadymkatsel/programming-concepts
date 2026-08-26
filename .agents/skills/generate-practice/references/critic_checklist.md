# Educational Critic Audit Checklist

This checklist is used by the **educational-critic** subagent to evaluate generated `.qmd` practical session files across both practice archetypes (`standard-coding` and `tooling-setup`).

---

## 1. Tier 1: Universal Binary Blocker Checks (Pass / Fail for ALL Archetypes)

- [ ] **Language Rule (Ukrainian Only)**:
  - All student-facing prose, explanations, task scenarios, callouts, and hints are written 100% in natural Ukrainian.
- [ ] **AST Strictness (Backtick Rules)**:
  - NO ordinary human language words are wrapped in backticks (e.g., `рядок`, `число`, `функція`, `параметр`, `коміт` are forbidden in prose).
  - Backticks are used EXCLUSIVELY for valid Python identifiers, functions, keywords, methods, variables, terminal commands (`python --version`), or syntactic signatures (e.g., `len()`, `dict()`, `map(функція, список)`).
- [ ] **No English Duplicate Translations**:
  - NO redundant English translations in brackets for basic programming terms (e.g., `список (list)`, `словник (dictionary)`).
- [ ] **List Formatting (Tight Lists)**:
  - NO blank lines between list items (`- ` or `1. `). Blank lines only exist before and after the whole list block.
- [ ] **Input Data Formatting (When applicable)**:
  - Single simple primitive: inline on the same line without bullet points (`**Вхідні дані:** \`RATE = 0.20\``).
  - Single collection or code snippet: standard python code block on next line without bullet points.
  - Multiple distinct variables: tight bulleted list.
- [ ] **Zero Solution Exposure (Zero Solution Tolerance)**:
  - NO complete solutions or answers exposed to students.
- [ ] **Expected Output (`**Очікуваний результат:**`)**:
  - Only describes final output format and values.
  - Contains ZERO algorithmic implementation hints or code logic guidance.

---

## 2. Tier 2: Archetype-Specific Pedagogical Audit

### A. For `standard-coding` (Functions, Loops, OOP, Data Handling, etc.)
- [ ] **YAML Frontmatter**: Standard configuration (`title`, `toc: true`, `lang: ua`, `execute: eval: false`, `page-layout: full`).
- [ ] **Introduction & Plan**: `## 📚 Вступ...` + `## 📌 План заняття:`.
- [ ] **Cheat Sheet**: `## 📝 [Topic] Cheat Sheet` concise summary with runnable atomic examples.
- [ ] **Warm Up**: `## 🏃‍♂️ Warm Up` relies ONLY on prior knowledge. ZERO new syntax.
- [ ] **Live Coding & Guided Practice Pairs**:
  - `### 👨‍💻 Live Coding N: [Назва]` — collaborative phrasing ("Ми").
  - `### 🛠 Guided Practice` — imperative phrasing ("Напишіть", "Створіть").
  - Students write code from scratch.
- [ ] **Bug Hunter**:
  - Placed in the middle of the lesson wrapped in tabsets `::: {.panel-tabset}` without revealed answers.
- [ ] **Capstone**: Single capstone at the end of the topic.

### B. For `tooling-setup` (IDE Setup, Git, CLI, Environments)
- [ ] **YAML Frontmatter**: Standard configuration.
- [ ] **Intuitive Analogies**: Relatable mental models for abstract tools (e.g. Git as camera).
- [ ] **Mermaid Visuals**: Diagrams included for workflow architecture or git branch graphs.
- [ ] **Numbered Steps**: Clean numbered headings (e.g. `## 1️⃣ Встановлення...`, `## 2️⃣ Налаштування...`).
- [ ] **Cross-Platform Guidance**: Clear callouts for OS differences (Windows PATH, macOS specifics).
- [ ] **Actionable Verification**: Terminal check commands provided (e.g. `python --version`, `git --version`).
- [ ] **Hands-On Milestones**: Interactive student actions (Fork -> Clone -> Branch -> Commit -> Push).
- [ ] **Exemptions Verified**: Correctly exempt from mandatory Bug Hunter and Live/Guided pairs.
