# QMD Standards & Formatting

## YAML Frontmatter

Every `.qmd` file must start with a standard YAML configuration:

```yaml
---
title: "Назва практичного заняття"
toc: true
lang: ua
execute:
  eval: false
page-layout: full
---
```

_(Optionally include HTML headers for FontAwesome icons if needed, e.g., in the format block)._

## Formatting Rules

- **Headers**: Use appropriate header levels. `##` for main sections, `###` for sub-sections. Do NOT include code syntax (e.g. `map`, `*args`) in header titles. Make them natural and descriptive (e.g., "Анонімні функції та масова обробка").
- **Icons/Emojis**: Always start main sections and sub-sections with an emoji rather than a number to make them visually distinct and engaging (e.g., `## 📚 Вступ`, `## 🧹 Очищення даних`, `### 👨‍💻 Live coding`). Do not use numbering like `1.`, `2.` for main headers.
- **Code Blocks & Interactivity**:
  - **Interactive Demos**: Use `{pyodide}` blocks **ONLY** for sections where actual demonstration of working code is pedagogically valuable (e.g., in "Cheat Sheet" or "Live Coding" where execution illustrates the concept). DO NOT use interactive snippets just for the sake of having a snippet. Ensure that any code inside a `{pyodide}` block (especially Cheat Sheets) is valid, runnable Python code that will not break when `#| autorun: true` is triggered (e.g. do not use it for file reading/writing unless files are mocked). These blocks MUST include `#| autorun: true` (or `false`) and `#| edit: true`. **CRITICAL**: If a file uses `{pyodide}`, you MUST add `engine: jupyter` to the YAML frontmatter. DO NOT add `execute: eval: false` globally in the YAML frontmatter, as it breaks Quarto Live.
  - **Prohibition of `input()` in Pyodide**: Pyodide executes in a browser Web Worker where synchronous standard input (`stdin`) is unsupported. **NEVER use `input()` inside `{pyodide}` blocks** (it causes `RuntimeError` / `EOFError`). Any code demonstrating or requiring `input()` must be formatted in standard static ` ```python ` blocks for local execution in an IDE / terminal. In `{pyodide}` blocks, always declare explicit variables (e.g., simulating received string or numeric data) with `#| edit: true` so students can modify values directly in the code editor.
  - **Static Code**: For all other sections (including "Bug Hunter", "Guided Practice", theoretical syntax examples, and data inputs), use standard static ` ```python ` blocks. Practice tasks should be executed by students in their own local IDEs.
  - **Evaluation**: If a standard python block needs to be evaluated during rendering to show static output, use `#| eval: true` inside the block.
- **Callouts**: Use Quarto callouts to highlight specific types of information and warnings:
  - `::: {.callout-tip}` - for hints, tips, or congratulations.
  - `::: {.callout-warning}` - for constraints, restrictions, or common pitfalls.
  - `::: {.callout-important}` - for critical information (e.g., strict instructions).
  - `::: {.callout-note}` - for general notes.
- **Placeholders**: When the practice requires screenshots, repositories, or other custom content outside of standard markdown, insert clear placeholders. Use format like `![[Screenshot Placeholder: Description of what should be here]]()` for images.
- **No Dividers**: Do not use Markdown horizontal dividers (`---`) between sections or blocks. The Quarto headers (`##`, `###`) already provide sufficient visual separation.
- **Block Elements Spacing**: Always leave an empty line before and after block elements such as lists (`-`, `1.`), code blocks, and blockquotes (`>`). Crucially, an empty line MUST always precede the first list item, including after bold lead-ins (e.g., after `**Вхідні дані:**`, `**Очікуваний результат:**`, or `де:`).
- **Backticks & Inline Code (AST Strictness Rule)**: Inline code is permitted EXCLUSIVELY for Python syntactic elements (function names, methods, variables, data types, operators, e.g., print(), len(), TOTAL_COUNT, .split()).
  - **Exception for Syntax Signatures**: Human language words ARE allowed inside backticks ONLY if they act as descriptive parameter placeholders within a formal syntax signature (e.g., `map(функція, список)` or `lambda параметри: що_повернути`).
  - **Critical Prohibition**: It is strictly forbidden to wrap ordinary human language words in inline code formatting in regular prose (e.g., query, algorithm, condition, result). If a word is not a reserved token in the Python 3.11 interpreter (and is not part of a syntax signature placeholder), it must remain as plain text.
- **Input Data Formatting**: When presenting `**Вхідні дані:**` (Input Data) for practice tasks, choose the most appropriate format based on the data structure to prevent visual clutter:
  - **Single simple variable/constant**: Write inline on the same line (e.g., `**Вхідні дані:** вартість замовлення 450 грн`). Do NOT use bullet points.
  - **Single long collection (list, dict, etc.)**: Place it in a standard python code block below the text. Do NOT use bullet points.
  - **Multiple distinct variables**: Use a tight bulleted list with an empty line before the first item.
  - **No Redundant Parentheses**: Strictly avoid unnecessary parenthetical clarifications (e.g., `(у гривнях)`, `(грн)`, `(відповідь "так" або "ні")`, `(наприклад, 10 або 15)`). State units naturally or omit them if self-evident in context.
- **List Density & Spacing (Tight Lists Only)**: For correct Quarto (Pandoc) rendering, bulleted lists must be compact (Tight Lists).
  - Do not leave empty lines BETWEEN individual list items (-). Exactly one empty line should be placed BEFORE the entire list and AFTER it. Empty lines between items force Quarto to wrap each item in a <p> tag, which visually breaks and stretches the layout.
- **Math Formulas & Typography (Display Equations)**: Keep mathematical and financial formulas (`$$...$$`) compact, readable, and well-proportioned. Avoid cramming long narrative sentences into fraction numerators or denominators using `\text{...}` (e.g., avoid `\frac{\text{Сумарний виторг від використання...}}{...}`). Instead, use clear, standard domain terms (e.g., `\frac{\text{Виторг} - \text{Вартість}}{\text{Вартість}}`), and define each component below the formula in a clean list after `де:`. Do not sacrifice student understanding by overcomplicating with single-letter abstractions if domain words are clearer.
