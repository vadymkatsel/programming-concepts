# Workflow: Generate Practice Module

## Description

This workflow details how the AI agent creates a complete, ready-to-use `.qmd` practice session file for the Introduction to Programming course. It ensures strict adherence to the project's pedagogical guidelines and formatting standards.

## Execution Steps

1. **Analyze Requirements & Context**: 
   - Read the `.agents/rules/` directory (`global_context.md`, `qmd_standards.md`, `pedagogical_flow.md`) to internalize the tone, flow, and formatting requirements.
   - Determine the topic, learning objectives, and preceding lecture context.
2. **Accept Input & Data Check**: 
   - If the practice involves large datasets or external repositories, verify if the user provided the necessary resources. 
   - If not, explicitly **ask the user** for them. Do not generate fake, small mock datasets (like 10-line CSVs) unless explicitly asked.
3. **Draft the Plan**:
   - Outline the `📌 План заняття`.
   - Identify 2-3 logical sub-topics for Live Coding and Guided Practice pairs.
4. **Develop the Cheat Sheet**:
   - Extract the core concepts, syntax, and examples into a concise `📝 Cheat Sheet`.
5. **Create Scenarios**:
   - Invent relatable, analogy-driven scenarios (e.g., robots, smart home devices, games) that connect the sub-topics into a cohesive theme for the session.
6. **Apply Template & Flesh out Tasks**:
   - YAML Frontmatter
   - Introduction & Topic Name
   - 📌 План заняття
   - 📝 Cheat Sheet
   - 🏃‍♂️ Warm Up (No new syntax, only familiar concepts)
   - Iterative blocks of `👨‍💻 Live Coding` (collaborative tone) and `🛠 Guided Practice` (imperative tone). 
     - Define `**Контекст:**`, `**Вхідні дані:**`, `**Очікуваний результат:**` (no algorithmic hints).
     - Ensure students *write code* from scratch, no refactoring.
   - 🐛 Bug Hunter (in the middle, no hidden answers).
7. **Enforce Tone**: Ensure the text is written in friendly Ukrainian, uses relevant emojis, avoids redundant English translations, and does not overuse backticks.
8. **Output**: Generate the fully formatted Quarto markdown document. Use placeholders like `![[Screenshot Placeholder]]()` for missing screenshots. Save the file strictly following the structure: `courses/[course-name]/modules/[topic]/[practice].qmd`.
9. **Register in `_quarto.yml`**: Open the root `_quarto.yml` file, find the correct sidebar for the course (e.g., `ebd-sidebar`), locate the appropriate `- section:`, and add the new file path to its `contents:` array.
