# Skill: Generate Practice Module

## Description

This skill enables the agent to create a complete, ready-to-use `.qmd` practice session file for the Introduction to Programming course, adhering to the project's pedagogical guidelines and formatting standards.

## Execution Steps

1. **Gather Context**: Read the `_ai/guidelines/` directory (`01_global_context.md`, `02_qmd_standarts.md`, `03_pedagogical_flow.md`, `04_generation_pipeline.md`) to understand the tone, flow, and formatting requirements.
2. **Accept Input**: Receive the topic, learning objectives, and any provided theory or lecture notes from the user.
3. **Data Check**: If the practice involves large datasets or external repositories, verify if the user provided the necessary resources. If not, explicitly **ask the user** for them. Do not generate fake, small mock datasets (like 10-line CSVs) unless explicitly asked.
4. **Apply Template**: Use the standard template structure:
   - YAML Frontmatter
   - Introduction & Topic Name
   - 📌 План заняття
   - 📝 Cheat Sheet
   - Iterative blocks of `👨‍💻 Live Coding` and `🛠 Guided Practice`
5. **Enforce Tone**: Ensure the text is written in friendly Ukrainian, uses relevant emojis, and employs a cohesive, relatable scenario (e.g., smart home devices, robots).
6. **Output**: Generate the fully formatted Quarto markdown document, using placeholders for missing screenshots or repositories. Save the file strictly following the structure: `courses/[course-name]/modules/[topic]/[practice].qmd`.
7. **Register in `_quarto.yml`**: Open the root `_quarto.yml` file, find the correct sidebar for the course (e.g., `ebd-sidebar`), locate the appropriate `- section:`, and add the new file path to its `contents:` array.
