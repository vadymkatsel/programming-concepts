---
name: batch-generate-practice
description: End-to-end multi-practice curriculum orchestration across courses (EBD, BE, Math). Builds dependency DAGs, executes parallel/sequential subagent waves with on-demand prior-knowledge verification, maintains cross-module pedagogical coherence, and performs atomic _quarto.yml registration. Invoked as /batch-generate-practice <prompt>.
---

# Skill: Batch Generate Practice Curriculum (`/batch-generate-practice`)

This skill orchestrates the generation of **multiple interconnected practical sessions (`.qmd`)** across university programming courses. Led by the [curriculum-orchestrator](file:///d:/KSE/programming-concepts-course/.agents/agents/curriculum-orchestrator.md), it analyzes course progression, constructs a dependency graph (DAG), executes waves of parallel or sequential generation using [educational-designer](file:///d:/KSE/programming-concepts-course/.agents/agents/educational-designer.md) and [educational-critic](file:///d:/KSE/programming-concepts-course/.agents/agents/educational-critic.md), enforces strict pedagogical coherence, and atomicity in [`_quarto.yml`](file:///d:/KSE/programming-concepts-course/_quarto.yml) integration.

---

## 1. Scope Analysis & On-Demand Prior Knowledge Verification

1. **Course & Scope Identification**:
   - Parse prompt to identify courses (`courses/ebd-course/`, `courses/be-course/`, `courses/math-course/`) and all requested topics.
   - For each topic, determine its practice archetype:
     - **`standard-coding`**: Python syntax, algorithms, data structures, data analysis.
     - **`tooling-setup`**: Git/GitHub, IDE setup, Terminal, Virtual Environments.
2. **Linear Course Position**:
   - Open [`_quarto.yml`](file:///d:/KSE/programming-concepts-course/_quarto.yml) to determine the exact insertion point of the requested practices within the course sidebar.
3. **On-Demand Prior Knowledge Verification (Principle of Pedagogical Restraint)**:
   - **Baseline Primitives**: Assume students know basic primitives (`print()`, arithmetic `+`, `-`, `*`, `/`, `int`, `str`, `input()`, basic `if/else`) once past module 1 without reading previous files.
   - **Targeted Lookups (Only When in Doubt)**: If the designer is considering using a more advanced feature (e.g. list comprehensions, slicing with step, `.get()` defaults, nested loops, custom functions) in a practice's `Warm Up`:
     - Do NOT read all previous `.qmd` files.
     - Locate the specific candidate module in [`_quarto.yml`](file:///d:/KSE/programming-concepts-course/_quarto.yml).
     - Read **ONLY** its `## 📝 Cheat Sheet` section to confirm if that syntax was officially introduced.
   - **Rule**: If a construct was NOT explicitly introduced in prior modules, it is **strictly forbidden** in `Warm Up`. Never introduce advanced syntax prematurely.

---

## 2. Dependency Graph (DAG) & Wave Planning

Construct a generation plan following [batch_dag_template.md](./references/batch_dag_template.md):

1. **Classify Dependencies**:
   - **Parallel Nodes (Independent)**:
     - Practices across different courses.
     - Autonomous setup modules (`tooling-setup`) or standalone data topics.
     - Scheduled in `Wave 1` (or run concurrently within the wave).
   - **Sequential Nodes (Parent-Child)**:
     - Practices where Topic B builds upon Topic A (e.g. List Basics ➔ List Methods).
     - Topic B is scheduled in `Wave 2` (after Topic A is fully approved).
2. **Formulate Execution Waves**:
   - `Wave 1`: All independent root practices.
   - `Wave 2`: Modules depending on `Wave 1`.
   - `Wave 3`: Modules depending on `Wave 2`.
3. **Establish Shared Domain & Narrative**:
   - Define a consistent business context, domain scenario, or cumulative dataset for related modules (e.g. e-commerce transactions, academic research, logistics) to maintain cohesive storytelling.

---

## 3. Wave Execution Loop (Designer + Critic)

Execute wave by wave:

```text
For each Wave:
  For each Practice in Wave:
    1. Prepare Context Contract:
       - Archetype (standard-coding / tooling-setup)
       - Target file path
       - Syntax boundary for Warm Up (prior Cheat Sheets)
       - Shared domain context
    2. Educational Designer generates .qmd draft following .agents/rules/:
       - global_context.md (100% Ukrainian, no bracketed English terms)
       - pedagogical_flow.md (Warm Up -> Live Coding + Guided Practice -> Bug Hunter -> Capstone)
       - qmd_standards.md (AST backtick strictness, tight lists, no solutions)
    3. Educational Critic audits draft (up to 3 iterations):
       - Tier 1 binary blocker checks (AST backticks, no solutions, tight lists)
       - Tier 2 archetype checks
       - Revisions applied until APPROVED
    4. Extract ## 📝 Cheat Sheet from approved practice for downstream child waves.
```

- **Parallelism**: Practices within the same wave with no mutual dependencies are generated concurrently.
- **Context Handoff**: Child practices receive the exact `Cheat Sheet` of their parent practices to enforce warm-up compliance.

---

## 4. Cross-Module Coherence & Deduplication Audit

Before updating configuration files:
1. **Deduplication**: Verify that Live Coding and Guided Practice exercises across the entire batch do not duplicate tasks or datasets.
2. **Pacing Continuity**: Ensure cognitive load increases smoothly across sequential practices.
3. **Warm Up Isolation**: Re-verify that no practice's `Warm Up` contains syntax introduced later in the batch.

---

## 5. Atomic Integration & Walkthrough

1. **Atomic Sidebar Update**:
   - Gather all approved `.qmd` paths.
   - In accordance with [web-architect](file:///d:/KSE/programming-concepts-course/.agents/agents/web-architect.md) standards, update the relevant `section:` blocks in [`_quarto.yml`](file:///d:/KSE/programming-concepts-course/_quarto.yml) in a **single atomic edit**.
2. **Present Walkthrough Report**:
   - Output summary of all generated practices, files, wave progression, and validation statuses.
   - **REMINDER**: Never execute `git commit` without explicit user permission.
