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

-   **Headers**: Use appropriate header levels. `##` for main sections, `###` for sub-sections. Do NOT include code syntax (e.g. `map`, `*args`) in header titles. Make them natural and descriptive (e.g., "Анонімні функції та масова обробка").
-   **Icons/Emojis**: Always start main sections and sub-sections with an emoji rather than a number to make them visually distinct and engaging (e.g., `## 📚 Вступ`, `## 🧹 Очищення даних`, `### 👨‍💻 Live coding`). Do not use numbering like `1.`, `2.` for main headers.
- **Code Blocks**: Use standard python code blocks. If a block needs to be evaluated during rendering, use `#| eval: true` inside the block.
- **Callouts**: Use Quarto callouts to highlight specific types of information and warnings:
  - `::: {.callout-tip}` - for hints, tips, or congratulations.
  - `::: {.callout-warning}` - for constraints, restrictions, or common pitfalls.
  - `::: {.callout-important}` - for critical information (e.g., strict instructions).
  - `::: {.callout-note}` - for general notes.
- **Placeholders**: When the practice requires screenshots, repositories, or other custom content outside of standard markdown, insert clear placeholders. Use format like `![[Screenshot Placeholder: Description of what should be here]]()` for images.
- **No Dividers**: Do not use Markdown horizontal dividers (`---`) between sections or blocks. The Quarto headers (`##`, `###`) already provide sufficient visual separation.
- **Block Elements Spacing**: Always leave an empty line before and after block elements such as lists (`-`, `1.`), code blocks, and blockquotes (`>`). This is necessary for proper Markdown and HTML rendering in Quarto.
- **Backticks & Inline Code (AST Strictness Rule)**: Inline code is permitted EXCLUSIVELY for Python syntactic elements (function names, methods, variables, data types, operators, e.g., print(), len(), TOTAL_COUNT, .split()).
  - **Exception for Syntax Signatures**: Human language words ARE allowed inside backticks ONLY if they act as descriptive parameter placeholders within a formal syntax signature (e.g., `map(функція, список)` or `lambda параметри: що_повернути`).
  - **Critical Prohibition**: It is strictly forbidden to wrap ordinary human language words in inline code formatting in regular prose (e.g., query, algorithm, condition, result). If a word is not a reserved token in the Python 3.11 interpreter (and is not part of a syntax signature placeholder), it must remain as plain text.
- **Input Data Formatting**: When presenting `**Вхідні дані:**` (Input Data) for practice tasks, choose the most appropriate format based on the data structure to prevent visual clutter:
  - **Single simple variable/constant**: Write inline on the same line (e.g., `**Вхідні дані:** \`TAX_RATE = 0.20\``). Do NOT use bullet points.
  - **Single long collection (list, dict, etc.)**: Place it in a standard python code block below the text. Do NOT use bullet points.
  - **Multiple distinct variables**: Use a tight bulleted list (e.g., `- \`revenue = 500000\``).
- **List Density & Spacing (Tight Lists Only)**: For correct Quarto (Pandoc) rendering, bulleted lists must be compact (Tight Lists).
  - Do not leave empty lines BETWEEN individual list items (-). An empty line should only be placed BEFORE the entire list and AFTER it. Empty lines between items force Quarto to wrap each item in a <p> tag, which visually breaks and stretches the layout.
