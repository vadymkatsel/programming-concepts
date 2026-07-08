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
- **Constraint**: Must rely ONLY on previously learned, familiar concepts or intuitive logic puzzles. NEVER introduce new syntax in the Warm Up.

## 3. Iterative Learning Cycles (Topics)

For each sub-topic, use the following paired structure to enforce learning. **IMPORTANT**: Students must WRITE code from scratch in these sections, do not just provide broken code for them to refactor.

- **Theory (Optional)**: A brief, conceptual explanation if needed to introduce the specific problem. It should focus on "why" we need to do this in the real world.
- **`### 👨‍💻 Live Coding N: [Name]`**:
  - Done collaboratively by the instructor and students. IF you need to describe an action, use collaborative phrasing ("Ми", "Разом"). However, do NOT forcefully inject "Разом ми" into every description.
  - **Контекст**: Scenario or problem description. The context MUST be a pure real-world story. First and foremost, describe the situation and the business goal. Do NOT forcefully inject instructions like "Разом ми зробимо X". Do NOT explain technical motivation or meta-programming concepts here (e.g., do not say "Instead of writing a for loop, analysts use map"). Just set the scene. If the task requires a specific mathematical or business formula, provide the exact formula here. Do NOT provide algorithmic hints here.
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

Start with simple, trivial examples and gradually build up to more complex interactions by the end of the module. Don't over-engineer examples (e.g., teaching `global` when shadowing is enough).

## 5. Bug Hunter (`## 🐛 Bug Hunter`)

- A dedicated section placed somewhere in the **middle** of the module to switch up the activity. Do NOT place it exclusively at the very end.
- Contains broken code that students must analyze and fix.
- **Format**: The entire Bug Hunter section must be wrapped in a single Quarto tabset (`::: {.panel-tabset}`). Each bug is a separate tab (`### Баг 1`, `### Баг 2`).
- **No Answers**: Do NOT include hidden callouts with the answers. It must be a pure exercise for the students.

  ```quarto
  ::: {.panel-tabset}

  ### Баг 1: [Short engaging title]

  **Контекст**: [Short context of the problem]

  ` ` `python
  # Code with bugs
  ` ` `

  ### Баг 2: [Short engaging title]
  ...
  :::
  ```

## 6. Capstone (`## 🏆 Capstone: [Name]`)

- A final, overarching problem that integrates all the concepts learned in the module.
- **Constraint**: There should be only ONE Capstone per sub-module (topic). If a topic spans across multiple practice files (e.g., List Comprehensions followed by Dictionaries), the Capstone should be placed at the very end of the final practice file for that topic (e.g., at the end of Dictionaries) to serve as a "Grand Capstone" that unites both files.
