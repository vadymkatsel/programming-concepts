---
name: generate-practice
description: End-to-end automated generation of Quarto practical session files (.qmd) in Ukrainian for Python programming courses (EBD, BE, Math) with multi-turn Educational Critic subagent review and _quarto.yml registration. Supports standard coding and tooling/setup archetypes. Invoked as /generate-practice <prompt>.
---

# Skill: Generate Practice Module (`/generate-practice`)

This skill automates the complete lifecycle of creating, critiquing, refining, and registering practical session materials (`.qmd`) across university Python programming courses. It intelligently identifies the **Practice Archetype**, generates the draft, orchestrates the **educational-critic** review loop, and integrates the file into `_quarto.yml`.

---

## 1. Input Analysis & Archetype Detection

1. **Course and Topic Identification**:
   - Parse the prompt to determine the target course (`courses/ebd-course/`, `courses/be-course/`, `courses/math-course/`) and topic.
   - If ambiguous, ask for clarification.
2. **Practice Archetype Selection**:
   - **Archetype 1: `standard-coding`** (Functions, Loops, OOP, Collections, APIs, Data Handling).
   - **Archetype 2: `tooling-setup`** (IDE Setup, Git & GitHub, Terminal/CLI, Virtual Environments). Benchmarks: [git-ps.qmd](file:///d:/KSE/programming-concepts-course/courses/ebd-course/modules/git/git-ps.qmd) and [ide-setup-ps.qmd](file:///d:/KSE/programming-concepts-course/courses/ebd-course/modules/ide-variables-operations/ide-setup-ps.qmd).
3. **Rules & Guidelines**:
   - Strictly apply [`.agents/rules/global_context.md`](file:///d:/KSE/programming-concepts-course/.agents/rules/global_context.md), [`.agents/rules/pedagogical_flow.md`](file:///d:/KSE/programming-concepts-course/.agents/rules/pedagogical_flow.md), and [`.agents/rules/qmd_standards.md`](file:///d:/KSE/programming-concepts-course/.agents/rules/qmd_standards.md).
4. **Language Rule**:
   - **CRITICAL**: The generated `.qmd` content **MUST be 100% in Ukrainian**.

---

## 2. Draft Generation (Educational Designer)

### Path A: `standard-coding` Draft
- YAML Frontmatter (`execute: eval: false`, `lang: ua`, `toc: true`, `page-layout: full`).
- `## 📚 Вступ...` + `## 📌 План заняття:` + `## 📝 Cheat Sheet`.
- `## 🏃‍♂️ Warm Up` (Zero new syntax).
- Paired `### 👨‍💻 Live Coding N` + `### 🛠 Guided Practice` (Context, Input, Expected Output; no solutions).
- `## 🐛 Bug Hunter` (in the middle, tabset `::: {.panel-tabset}`).
- `## 🏆 Capstone` (if final file in topic).

### Path B: `tooling-setup` Draft
- YAML Frontmatter.
- Intuitive mental model / analogies (e.g. Git as camera, branch as draft notebook).
- Mermaid diagram (e.g. ```` {mermaid} flowchart LR ```` or `gitGraph`).
- Numbered step-by-step sections (e.g. `## 1️⃣ Встановлення Python`, `## 2️⃣ Встановлення PyCharm`).
- OS-specific callouts (`::: {.callout-important title="Критично важливо для користувачів Windows!"}`).
- Actionable verification commands (e.g. `python --version`, `git status`).
- Hands-on milestones (e.g. Fork -> Clone -> Branch -> Greeting script -> Commit -> Push).
- Image references / placeholders (`![Caption](/path/to/img.png)` or `![[Screenshot Placeholder: Description]]()`).

---

## 3. Review & Refinement Loop (Educational Critic)

Pass the `.qmd` draft to the **educational-critic** agent or evaluate against [critic_checklist.md](./references/critic_checklist.md):

```text
Maximum Loop Iterations: 3
```

### Review Logic by Archetype:
- **Global Binary Rules (Both Archetypes)**:
  - ❌ AST backtick strictness (no backticks on natural language words).
  - ❌ No bracketed English duplicate translations (e.g., `словник (dictionary)`).
  - ❌ Tight lists (no blank lines between bullet items).
  - ❌ Zero solution exposure.
  - ❌ 100% Ukrainian language.
- **Pedagogical Structure**:
  - For `standard-coding`: verifies Warm Up, Live/Guided pairs, Bug Hunter in tabsets.
  - For `tooling-setup`: verifies numbered steps, OS callouts, verification steps, Mermaid diagrams (exempt from mandatory Bug Hunter/Live-Guided pairs).

### Loop Execution:
- If critic flags issues: Designer fixes all actionable directives and submits for re-review.
- When approved or 3 iterations reached: proceed to finalization.

---

## 4. Finalization & Sidebar Integration

1. **Write File**: Save to `courses/<course>/modules/<topic>/<file-name>.qmd`.
2. **Update `_quarto.yml`**: Add file path to the corresponding course sidebar under the right `section:`.
3. **Present Summary**: Deliver walkthrough report to user.
   - **REMINDER**: Never execute `git commit` without explicit user permission.
