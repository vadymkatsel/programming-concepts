# Workflow: Generate Practice Module (`/generate-practice`)

## Опис

Цей воркфлоу автоматизований у вигляді нативного скіла Antigravity: [`.agents/skills/generate-practice/SKILL.md`](file:///d:/KSE/programming-concepts-course/.agents/skills/generate-practice/SKILL.md).

Його можна запускати в Antigravity CLI або IDE через слеш-команду:
```text
/generate-practice [опис практичного заняття та курс]
```

## Кроки виконання

1. **Аналіз контексту**: вибір цільового курсу (`ebd-course`, `be-course`, `math-course`) та завантаження правил із `.agents/rules/`.
2. **Генерація драфту (Educational Designer)**: створення структури Quarto (`.qmd`) згідно з `pedagogical_flow.md` та `qmd_standards.md`.
3. **Петля валідації (Educational Critic)**: сувора багаторівнева перевірка (бектіки, форматування, відсутність розв'язків, педагогічний темп) до 3 ітерацій.
4. **Збереження**: збереження файлу в `courses/<course>/modules/<topic>/<practice>.qmd`.
5. **Реєстрація**: автоматичне додавання посилання на файл у відповідний сайдбар `_quarto.yml`.

