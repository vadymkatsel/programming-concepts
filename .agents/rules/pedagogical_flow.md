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

- **Theory / Section Intro (Mandatory)**: Every main topic header (`##`) MUST begin with a concise, engaging conceptual intro paragraph (1–2 sentences) explaining the operational or business necessity ("why we need this") before diving into `### 👨‍💻 Live Coding`. Never jump directly from a `##` header to a `### 👨‍💻 Live Coding` sub-header without an introductory paragraph.
- **No Syntax Spoon-feeding**: Strictly forbid hand-holding syntax instructions in task descriptions, contexts, and expected outputs (e.g., forbidding `за допомогою методу .append() та циклу for`, `використовуючи функцію len()`, `через оператор in`). Formulate tasks purely in terms of business goals, input data, and expected outputs. Let students independently select and apply the learned programming primitives.
- **`### 👨‍💻 Live Coding N: [Name]`**:
  - Done collaboratively by the instructor and students. IF you need to describe an action, use collaborative phrasing ("Ми", "Разом"). However, do NOT forcefully inject "Разом ми" into every description.
  - **Context (`Контекст`)**: Scenario or problem description. Must be concise, dynamic, and have **high information density (maximum 2–3 sentences)**:
    - 1 sentence sets the real-world operational scene (who and where).
    - 1–2 sentences state the concrete situation, business thresholds, and the core analytical goal.
    - Avoid verbose narrative padding, filler sentences, or overly long paragraphs that cause student attention to drift. Keep the story crisp, vivid, and quick to parse. If the task requires a specific mathematical or business formula, provide the exact formula here. Do NOT provide algorithmic hints here.
  - **Input Data (`Вхідні дані:`)**: Input data or starting parameters.
  - **Expected Output (`Очікуваний результат:`)**: ONLY describe what the code should produce or output (1–2 concise sentences). DO NOT write the solution algorithm here.
  - **Hints (Pedagogically Justified When Necessary)**: Callouts `::: {.callout-tip title="Підказка: ..."}` are an appropriate and valuable pedagogical element, but their presence must be **strictly pedagogically justified** (e.g., a non-trivial mathematical trick, an unobvious formula, a warning about insidious environment behavior, or clarification of a complex business rule).
  - **Usage Boundary (Permission ≠ Obligation)**: The fact that callouts are permitted **does not mean they should be added to every task or block**. If a task is standard and directly applies the covered material, no hints should be added. Most exercises must be solved independently by students without overbearing guidance.
  - **Prohibition of Solution-Spoiling Hints**: It is strictly forbidden to use hints that directly give away the solution or dictate syntactic parameters (e.g., do not write ready expressions in hints such as `range(1, 9)`, `i += 1`, or ready fragments of conditional expressions). Students must build the algorithm independently.
  - **Callout Title**: For callouts of type tip, always use the Ukrainian title «Підказка» (e.g., `title="Підказка"` or `title="Підказка: [Topic]"`), avoiding the default Quarto label «Порада» ("Tip").
  - **No Solutions**: NEVER include the actual solution code in the file. The instructor will write it live.
- **`### 🛠 Guided Practice`**:
  - Independent or loosely guided work for students. Use imperative phrasing ("Напишіть", "Створіть").
  - **Context (`Контекст`)**: Slightly modified or expanded scenario of the previous Live Coding. Adhere to the same **concise 2–3 sentence limit with high information density**.
  - **Input Data (`Вхідні дані:`)**: Data or starting point.
  - **Expected Output (`Очікуваний результат:`)**: ONLY describe what the final outcome should be (1–2 concise sentences).
  - **Hints (Pedagogically Justified When Necessary)**: The same pedagogical justification rule applies. Do not provide direct code; hints must guide thought or remind students of a logical principle.
  - **No Solutions**: NEVER include the actual solution code.

## 4. Progressive Complexity vs. Difficulty

- **Complexity Instead of 1–2-Line Toy Problems**: Avoid primitive tasks that can be solved in 1–2 lines of code (such as calling a single isolated method `.upper()` or `.append()`). While such micro-examples are appropriate as illustrations in the Cheat Sheet, learning tasks in Live Coding, Guided Practice, and Capstone must model real **multi-step data processing pipelines**. Students should see how the newly learned concept works in combination with previously acquired knowledge (loops, conditionals, lists, formatting).
- **Complexity ≠ Algorithmic/Mathematical Difficulty**:
  - **NOT Difficulty**: It is strictly forbidden to overload tasks with competitive-programming math puzzles, tricky edge cases, convoluted combinatorics, or abstractions unknown to beginners (e.g., regular expressions before they are taught). The logic of each step must be crystal clear and intuitive.
  - **YES Complexity**: Natural composition of several straightforward steps into a single end-to-end business pipeline: 1) iteration over raw records -> 2) cleaning noise and whitespace -> 3) structural format validation -> 4) slicing or splitting into fields -> 5) business filtering or calculation -> 6) assembling a standardized report or aggregate. This naturally produces 6–12 lines of readable code without any intellectual dead ends.
- **Progressive Complexity Pipeline**:
  - Complexity within a session must increase gradually from cycle to cycle:
    1. **Warm Up**: 1–2 basic operations reviewing previous topics (e.g., a loop with an accumulator and formatted output).
    2. **Cycle 1 (First Topic)**: Baseline pipeline (e.g., iteration + slicing/indexing + filtering into a new list).
    3. **Cycle 2 (Second Topic)**: Deepened pipeline (e.g., cleaning + replacement + multi-condition validation checks).
    4. **Cycle 3 (Third Topic)**: Multi-dimensional pipeline (e.g., parsing a monolithic string with multiple delimiters, type conversions, filtering, and conditional alert generation).
    5. **Capstone**: Full-scale end-to-end audit covering every stage of the pipeline and calculating aggregate business metrics.

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
