# QMD Standards & Formatting

## YAML Frontmatter

Every `.qmd` file must start with a standard YAML configuration:

- **Default for `standard-coding` practices (with 1–2 selective `{pyodide}` blocks)**:

```yaml
---
title: "Назва практичного заняття"
toc: true
lang: ua
engine: jupyter
page-layout: full
---
```

- **Fallback for purely static practices (`tooling-setup` or files with zero `{pyodide}` blocks)**:

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

- **Practice Title (`title:` in YAML Frontmatter)**: The document `title` in YAML frontmatter MUST be short and concise (ideally 2–4 words, e.g., `"Функції в Python"`, `"Словники в Python"`, `"List Comprehensions"`). Avoid long colon-separated subtitles in `title:`, as Quarto uses this field directly in the left navigation sidebar where long titles wrap awkwardly across multiple lines.
- **Headers**: Use appropriate header levels. `##` for main sections, `###` for sub-sections. Do NOT include code syntax (e.g. `map`, `*args`) in header titles. Make them natural and descriptive (e.g., "Анонімні функції та масова обробка").
- **Icons/Emojis**: Always start main sections and sub-sections with an emoji rather than a number to make them visually distinct and engaging (e.g., `## 📚 Вступ`, `## 🧹 Очищення даних`, `### 👨‍💻 Live coding`). Do not use numbering like `1.`, `2.` for main headers.
- **Code Blocks & Selective Interactivity**:
  - **Selective `{pyodide}` Demos (Default 1–2 per `standard-coding` practice)**: By default in `standard-coding` practices, include **1–2 interactive `{pyodide}` blocks** in the `## 📝 Cheat Sheet` ONLY where live execution and tinkering genuinely help students grasp a non-trivial mechanism (e.g., step-by-step unpacking of nested structures, comparing `if` filtering vs `if-else` replacement, or tracing loop state). Keep all other simple syntax illustrations in the Cheat Sheet as clean static ` ```python ` snippets! Never turn every Cheat Sheet snippet into `{pyodide}`. Ensure that any code inside a `{pyodide}` block is valid, runnable Python code that will not break when `#| autorun: true` is triggered (e.g. do not use it for file reading/writing unless files are mocked). These blocks MUST include `#| autorun: true` (or `false`) and `#| edit: true`. **CRITICAL**: If a file uses `{pyodide}`, you MUST add `engine: jupyter` to the YAML frontmatter. DO NOT add `execute: eval: false` globally in the YAML frontmatter, as it breaks Quarto Live.
  - **Prohibition of `input()` in Pyodide**: Pyodide executes in a browser Web Worker where synchronous standard input (`stdin`) is unsupported. **NEVER use `input()` inside `{pyodide}` blocks** (it causes `RuntimeError` / `EOFError`). Any code demonstrating or requiring `input()` must be formatted in standard static ` ```python ` blocks for local execution in an IDE / terminal. In `{pyodide}` blocks, always declare explicit variables (e.g., simulating received string or numeric data) with `#| edit: true` so students can modify values directly in the code editor.
  - **Static Code**: For all other sections (including "Bug Hunter", "Guided Practice", theoretical syntax examples, and data inputs), use standard static ` ```python ` blocks. Practice tasks should be executed by students in their own local IDEs.
  - **Evaluation**: If a standard python block needs to be evaluated during rendering to show static output, use `#| eval: true` inside the block.
- **Колаути та культура підказок (Педагогічна виправданість)**: Колаути Quarto є дієвим інструментом структурування уваги та акцентування, проте їх застосування має бути **педагогічно виправданим**:
  - **Межа використання (дозвіл ≠ обов'язок)**: Те, що колаути дозволені, **не означає, що їх слід додавати до кожного завдання чи блоку**. Якщо задача типова та закріплює щойно вивчене — підказка взагалі не потрібна. Більшість задач повинні розв'язуватися студентами самостійно.
  - `::: {.callout-tip title="Підказка: ..."}` — використовується для методичних підказок. За замовчуванням такий блок повинен мати заголовок **«Підказка»** (наприклад, `title="Підказка"` або `title="Підказка: [Тема]"`), а не дефолтну «Порада».
    - **Педагогічна виправданість**: Колаут має нести реальну навчальну цінність (пояснення нетривіального прийому, специфічної арифметики на зразок `% 10` та `//= 10`, економічного/математичного змісту або попередження про підступні підводні камені).
    - **Заборона спойлерів коду**: Підказка ніколи не повинна прямо підводити до готового розв'язку чи розкривати конкретні рядки коду/параметри функцій (наприклад, не давати готові виклики `range(1, 9)`, лічильники `i += 1` чи готові складені булеві вирази). Вона має спрямовувати хід думок або нагадувати логічний принцип, а не писати код за студента.
  - `::: {.callout-warning title="Увага: ..."}` — для критичних обмежень, зациклень, застережень про ризики в середовищі розробки.
  - `::: {.callout-important title="Важливо: ..."}` — для ключових вимог чи обов'язкових інструкцій.
  - `::: {.callout-note title="Примітка: ..."}` — для довідкових зауважень або концептуального контексту.
- **Placeholders**: When the practice requires screenshots, repositories, or other custom content outside of standard markdown, insert clear placeholders. Use format like `![[Screenshot Placeholder: Description of what should be here]]()` for images.
- **No Dividers**: Do not use Markdown horizontal dividers (`---`) between sections or blocks. The Quarto headers (`##`, `###`) already provide sufficient visual separation.
- **Block Elements Spacing**: Always leave an empty line before and after block elements such as lists (`-`, `1.`), code blocks, and blockquotes (`>`). Crucially, an empty line MUST always precede the first list item, including after bold lead-ins (e.g., after `**Вхідні дані:**`, `**Очікуваний результат:**`, or `де:`).
- **Backticks & Inline Code (AST Strictness Rule)**: Inline code is permitted EXCLUSIVELY for Python syntactic elements (function names, methods, variables, data types, operators, e.g., print(), len(), TOTAL_COUNT, .split()).
  - **Syntax Signatures & Identifier Conventions**: In Cheat Sheet code blocks and inline syntax signatures, use standard, conventional Python identifiers (such as `lst`, `item`, `index`, `step`, `x`, `key`, `value`, e.g. `item in lst`, `lst[start:stop]`, `sum(lst)`). It is strictly forbidden to mix Cyrillic words into Python operators or method calls to create awkward pseudocode (e.g., forbidding `значення in список`, `список[початок:кінець]`). Explanations and semantics must be given in Ukrainian in the surrounding prose, while the code tokens remain clean, valid Python.
  - **Critical Prohibition**: It is strictly forbidden to wrap ordinary human language words in inline code formatting in regular prose (e.g., query, algorithm, condition, result). If a word is not a reserved token in the Python 3.11 interpreter (and is not part of a syntax signature placeholder), it must remain as plain text.
  - **Zero Backtick Clutter in Task Descriptions (`Контекст`, `Вхідні дані`, `Очікуваний результат`)**: Never wrap plain numbers (e.g. write `1000 грн`, NOT `` `1000` грн ``), company/category names (e.g. write `DataCore`, `Enterprise`, NOT `` `"DataCore"` ``), dictionary key names in prose, orinline lists/dicts (e.g. NEVER write `` `[1200, 3500]` `` or `` `{"a": 1}` `` in `Вхідні дані` or `Очікуваний результат`) in backticks! Also, NEVER dictate custom function signatures or parameter names in backticks inside task descriptions (e.g. forbid `Напишіть функцію calc_tax(price, rate=0.2)` — write naturally: `Напишіть функцію, яка приймає ціну та ставку податку за замовчуванням 20%`).
- **Input Data Formatting**: When presenting `**Вхідні дані:**` (Input Data) for practice tasks, choose the most appropriate format based on the data structure to prevent visual clutter:
  - **Single simple variable/constant**: Write inline on the same line (e.g., `**Вхідні дані:** вартість замовлення 450 грн`). Do NOT use bullet points.
  - **Single long collection (list, dict, etc.)**: Place it in a standard python code block below the text. Do NOT use bullet points.
  - **Multiple distinct variables**: Use a tight bulleted list with an empty line before the first item.
  - **No Redundant Parentheses**: Strictly avoid unnecessary parenthetical clarifications (e.g., `(у гривнях)`, `(грн)`, `(відповідь "так" або "ні")`, `(наприклад, 10 або 15)`). State units naturally or omit them if self-evident in context.
- **List Density & Spacing (Tight Lists Only)**: For correct Quarto (Pandoc) rendering, bulleted lists must be compact (Tight Lists).
  - Do not leave empty lines BETWEEN individual list items (-). Exactly one empty line should be placed BEFORE the entire list and AFTER it. Empty lines between items force Quarto to wrap each item in a <p> tag, which visually breaks and stretches the layout.
- **Math Formulas & Typography (Display Equations)**: Keep mathematical and financial formulas (`$$...$$`) compact, readable, and well-proportioned. Avoid cramming long narrative sentences into fraction numerators or denominators using `\text{...}` (e.g., avoid `\frac{\text{Сумарний виторг від використання...}}{...}`). Instead, use clear, standard domain terms (e.g., `\frac{\text{Виторг} - \text{Вартість}}{\text{Вартість}}`), and define each component below the formula in a clean list after `де:`. Do not sacrifice student understanding by overcomplicating with single-letter abstractions if domain words are clearer.
