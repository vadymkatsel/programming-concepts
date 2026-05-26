# Practice Module Generation Pipeline

When generating a new practical session, the AI agent must follow these steps:

1. **Analyze Requirements**: 
   - Determine the topic, learning objectives, and whether a lecture preceded this practice (to gauge how much theory is needed).
2. **Draft the Plan**:
   - Outline the `📌 План заняття`.
   - Identify 2-3 logical sub-topics for Live Coding and Guided Practice pairs.
3. **Develop the Cheat Sheet**:
   - Extract the core concepts, syntax, and examples into a concise `📝 Cheat Sheet`.
4. **Create Scenarios**:
   - Invent relatable, analogy-driven scenarios (e.g., robots, smart home devices, games) that connect the sub-topics into a cohesive theme for the session.
5. **Flesh out Tasks**:
   - For each Live Coding and Guided Practice, define:
     - `**Контекст:**` (Engaging story/setup)
     - `**Вхідні дані:**` (Clear inputs)
     - `**Очікуваний результат:**` (Clear outputs)
6. **Review & Refine**:
   - Check against `01_global_context.md` for appropriate tone of voice and beginner-friendly difficulty.
   - Check against `02_qmd_standarts.md` for correct YAML, Quarto formatting, and callouts.
   - Ensure the difficulty progresses logically as per `03_pedagogical_flow.md`.

7. **Handling Data & External Content**:
   - **Large Datasets**: If a practice involves data processing (e.g., pandas, working with libraries), do **not** invent small mock datasets (like a 10-line CSV) unless explicitly requested or clearly justified by the context.
   - **External Resources**: The user will typically provide the necessary datasets, repositories, or external resources beforehand. If they don't, and the topic clearly requires it, **ask the user** for the data source and method of work before making things up.
   - **Placeholders**: If a task requires a screenshot or a link to a specific repository that is not yet available, use placeholders as defined in `02_qmd_standarts.md`.

8. **Output Directory Structure**:
   - Save the final `.qmd` file strictly following this structure: `courses/[course-name]/modules/[topic]/[practice].qmd`.
   - Ensure the file is placed in the correct course and topic module (e.g., `courses/ebd-course/modules/functions/practice.qmd`).

9. **Register in `_quarto.yml`**:
   - Every new practice module **MUST** be added to the root `_quarto.yml` file.
   - Locate the correct sidebar for the course (e.g., `math-sidebar`, `be-sidebar`, `ebd-sidebar`).
   - Find the appropriate `- section: "..."` or create a new one if it doesn't exist.
   - Add the relative path to the newly created `.qmd` file under the `contents:` list for that section.
