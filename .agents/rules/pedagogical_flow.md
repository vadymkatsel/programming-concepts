## Practice Archetypes

Practical sessions in the course fall into two distinct archetypes:

1. **`standard-coding` (Core Programming Topics)**: e.g., Functions, Loops, Dictionaries, OOP, Data Analysis.
2. **`tooling-setup` (Tooling, Environments & Workflows)**: e.g., IDE Setup, Git & GitHub, Terminal/CLI, Virtual Environments.

---

# Archetype 1: Standard Coding Practice (`standard-coding`)

Practical sessions for programming concepts should follow a structured, iterative pedagogical approach:

## 1. Introduction

- A brief, engaging introduction to the topic.
- `## 📌 План заняття:` - A bulleted list of what will be covered during the session.
- Bulleted list mostly contains headers of sections or their short essence.

## 2. Cheat Sheet (`## 📝 Cheat Sheet`)

- A concise summary of the key theoretical concepts and syntax.
- Very important if the practice is standalone or needs a quick recap from the preceding lecture.
- Provide simple, atomic code snippets for each concept.
- Do not overwhelm with unnecessary details.

## 2.5. Warm Up (`## 🏃‍♂️ Warm Up`)

- A light, introductory task placed after the Cheat Sheet.
- The goal is to help students quickly recall concepts from the lecture before diving into complex Live Coding.
- **Constraint**: Must rely ONLY on previously learned, familiar concepts or intuitive logic puzzles. NEVER introduce new syntax in the Warm Up.

## 3. Iterative Learning Cycles (Topics)

For each sub-topic, use the following paired structure to enforce learning. **IMPORTANT**: Students must WRITE code from scratch in these sections, do not just provide broken code for them to refactor.

- **Theory (Optional)**: A brief, conceptual explanation if needed to introduce the specific problem. It should focus on "why" we need to do this in the real world.
- **`### 👨‍💻 Live Coding N: [Name]`**:
  - Done collaboratively by the instructor and students. IF you need to describe an action, use collaborative phrasing ("Ми", "Разом"). However, do NOT forcefully inject "Разом ми" into every description.
  - **Контекст**: Scenario or problem description. The context MUST be a pure real-world story. First and foremost, describe the situation and the business goal. Do NOT forcefully inject instructions like "Разом ми зробимо X". Do NOT explain technical motivation or meta-programming concepts here. Just set the scene. If the task requires a specific mathematical or business formula, provide the exact formula here. Do NOT provide algorithmic hints here.
  - **Вхідні дані**: Input data or starting code.
  - **Очікуваний результат**: ONLY describe what the code should produce or output. DO NOT write the solution algorithm here.
  - **Підказки (Optional)**: If the task is complex and requires a hint, use a `::: {.callout-tip}` block.
  - **No Solutions**: NEVER include the actual solution code in the file. The instructor will write it live.
- **`### 🛠 Guided Practice`**:
  - Independent or loosely guided work for students. Use imperative phrasing ("Напишіть", "Створіть").
  - **Контекст**: Slightly modified or expanded scenario of the previous Live Coding. It MUST be a pure real-world story. Provide mathematical formulas if needed.
  - **Вхідні дані**: Data or starting point.
  - **Очікуваний результат**: ONLY describe what the final outcome should be.
  - **Підказки (Optional)**: Use a `::: {.callout-tip}` block if a specific technical hint is needed.
  - **No Solutions**: NEVER include the actual solution code.

## 4. Progressive Difficulty

Start with simple, trivial examples and gradually build up to more complex interactions by the end of the module. Don't over-engineer examples.

## 5. Bug Hunter (`## 🐛 Bug Hunter`)

- A dedicated section placed somewhere in the **middle** of the module to switch up the activity. Do NOT place it exclusively at the very end.
- Contains broken code that students must analyze and fix.
- **Format**: The entire Bug Hunter section must be wrapped in a single Quarto tabset (`::: {.panel-tabset}`). Each bug is a separate tab (`### Баг 1`, `### Баг 2`).
- **No Answers**: Do NOT include hidden callouts with the answers. It must be a pure exercise for the students.

## 6. Capstone (`## 🏆 Capstone: [Name]`)

- A final, overarching problem that integrates all the concepts learned in the module.
- **Constraint**: There should be only ONE Capstone per sub-module (topic). If a topic spans across multiple practice files, the Capstone should be placed at the very end of the final practice file for that topic.

---

# Archetype 2: Tooling & Setup Practice (`tooling-setup`)

Used for environment setup, developer tooling, and workflow tutorials (Benchmark references: `modules/git/git-ps.qmd`, `modules/ide-variables-operations/ide-setup-ps.qmd`).

## 1. Structure for Tooling/Setup
- **Conceptual Analogies**: Ground abstract developer tools in intuitive mental models (e.g., Git as a time-travel camera, branches as parallel draft notebooks).
- **Mermaid Diagrams**: Include clear visual architectural or git-branching diagrams (````{mermaid} flowchart LR ... ```` or `gitGraph`).
- **Numbered Step-by-Step Sections**: Use clear numbered headers (e.g., `## 1️⃣ Встановлення Python`, `## 2️⃣ Встановлення PyCharm`, `## 3️⃣ Перший запуск`).
- **Cross-Platform Callouts**: Explicitly guide Windows and macOS users via `::: {.callout-important title="Критично важливо для користувачів Windows!"}` (e.g., PATH checkbox).
- **Verification Commands**: Provide concrete shell commands to verify installation success (e.g., `python --version`, `git --version`).
- **Hands-On Milestones**: Walk students through an interactive workflow with mini-milestones (e.g., Fork -> Clone -> Branch -> Greeting script -> Commit -> Push -> Pull Request).
- **Screenshots & Placeholders**: Insert image references or placeholders (e.g., `![Clone Menu](/courses/.../sources/clone-repo.png)` or `![[Screenshot Placeholder: Description]]()`).
- **Exemptions**: Tooling practices are **EXEMPT** from mandatory `Bug Hunter` in tabsets and `Live Coding / Guided Practice` pairs.

