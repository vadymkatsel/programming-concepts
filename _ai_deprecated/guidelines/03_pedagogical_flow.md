# Pedagogical Flow & Structure

Practical sessions should follow a structured, iterative pedagogical approach:

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
- Typically a small syntax exercise or a very basic problem.

## 3. Iterative Learning Cycles (Topics)

For each sub-topic, use the following paired structure to enforce learning:

- **Theory (Optional)**: A brief, conceptual explanation if needed to introduce the specific problem. It should focus on "why" we need to do this in the real world. Do not overload this concise description with specific method names or technical syntax; keep it high-level.
- **`### 👨‍💻 Live Coding N: [Name]`**:
  - Done collaboratively by the instructor and students.
  - **Контекст**: Scenario or problem description. If the task requires a specific mathematical or business formula (e.g., compound interest, break-even point), provide the exact formula here so students don't have to recall it from memory. Do NOT provide algorithmic hints here.
  - **Вхідні дані**: Input data or starting code.
  - **Очікуваний результат**: ONLY describe what the code should produce or output. DO NOT write the solution algorithm here (e.g., do not write "Use a for loop from 1 to 7").
  - **Підказки (Optional)**: If the task is complex and requires a hint, use a `::: {.callout-tip}` block after the expected result.
  - **No Solutions**: NEVER include the actual solution code in the file. The instructor will write it live.
- **`### 🛠 Guided Practice`**:
  - Independent or loosely guided work for students to solidify the concept just introduced in Live Coding.
  - **Контекст**: Slightly modified or expanded scenario of the previous Live Coding. The approach in solution is the same, the parameters or the story is what differs. Provide mathematical formulas if needed.
  - **Вхідні дані**: Data or starting point.
  - **Очікуваний результат**: ONLY describe what the final outcome should be. DO NOT write the solution algorithm here.
  - **Підказки (Optional)**: Use a `::: {.callout-tip}` block if a specific technical hint is needed.
  - **No Solutions**: NEVER include the actual solution code (e.g., inside a "Розв'язок" callout) in the practice file itself. The `.qmd` is for the students to solve during the session.

## 4. Progressive Difficulty

Start with simple, trivial examples (e.g., creating a base class, or writing a basic function) and gradually build up to more complex interactions (e.g., composition, inheritance, recursive functions, complex logic) by the end of the module.

## 5. Bug Hunter (`## 🐛 Bug Hunter`)

- A dedicated section usually placed at the end of the module.
- Contains broken code that students must analyze and fix.
- **Format**: The entire Bug Hunter section must be wrapped in a single Quarto tabset (`::: {.panel-tabset}`). Each bug is a separate tab (`### Баг 1`, `### Баг 2`).
- [ONLY UPON REQUEST] Inside each tab, provide the code with bugs, and a dropdown callout (`::: {.callout-note collapse="true" appearance="minimal"}`) containing the explanation of the bug and the correct code.

  ```quarto
  ::: {.panel-tabset}

  ### Баг 1

  **Контекст**: [Short context of the problem]

  ` ` `python
  # Code with bugs
  ` ` `

  ::: {.callout-note collapse="true" appearance="minimal"}
  ## 👀 Десь тут заховалась помилка...
  [Explanation of the bug and the correct code snippet]
  :::

  ### Баг 2
  ...
  :::
  ```
