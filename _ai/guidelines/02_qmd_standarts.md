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

- **Headers**: Use appropriate header levels. `##` for main sections, `###` for sub-sections.
- **Icons/Emojis**: Always start main sections and sub-sections with an emoji rather than a number to make them visually distinct and engaging (e.g., `## 📚 Вступ`, `## 🧹 Очищення даних`, `### 👨‍💻 Live coding`). Do not use numbering like `1.`, `2.` for main headers.
- **Code Blocks**: Use standard python code blocks ` ```{python} ` or ` ```python `. If a block needs to be evaluated during rendering, use `#| eval: true` inside the block.
- **Callouts**: Use Quarto callouts to highlight specific types of information and warnings:
  - `::: {.callout-tip}` - for hints, tips, or congratulations.
  - `::: {.callout-warning}` - for constraints, restrictions, or common pitfalls.
  - `::: {.callout-important}` - for critical information (e.g., strict instructions).
  - `::: {.callout-note}` - for general notes.
- **Placeholders**: When the practice requires screenshots, repositories, or other custom content outside of standard markdown, insert clear placeholders. Use format like `![[Screenshot Placeholder: Description of what should be here]]()` for images, and `<!-- [Repository/Content Placeholder: Description] -->` for other custom notes.
- **No Dividers**: Do not use Markdown horizontal dividers (`---`) between sections or blocks. The Quarto headers (`##`, `###`) already provide sufficient visual separation.
