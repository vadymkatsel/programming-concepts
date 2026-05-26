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
*(Optionally include HTML headers for FontAwesome icons if needed, e.g., in the format block).*

## Formatting Rules
- **Headers**: Use appropriate header levels. `##` for main sections, `###` for sub-sections.
- **Icons/Emojis**: Use emojis or FontAwesome icons in headers to make them visually distinct (e.g., `## 📚 Вступ`, `### 👨‍💻 Live coding 1`).
- **Code Blocks**: Use standard python code blocks ` ```{python} ` or ` ```python `. If a block needs to be evaluated during rendering, use `#| eval: true` inside the block.
- **Callouts**: Use Quarto callouts to highlight specific types of information and warnings:
  - `::: {.callout-tip}` - for hints, tips, or congratulations.
  - `::: {.callout-warning}` - for constraints, restrictions, or common pitfalls.
  - `::: {.callout-important}` - for critical information (e.g., strict instructions).
  - `::: {.callout-note}` - for general notes.
- **Placeholders**: When the practice requires screenshots, repositories, or other custom content outside of standard markdown, insert clear placeholders. Use format like `![[Screenshot Placeholder: Description of what should be here]]()` for images, and `<!-- [Repository/Content Placeholder: Description] -->` for other custom notes.

