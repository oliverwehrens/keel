---
name: sdd-adopt
model: opus
description: Baseline an existing (brownfield) codebase into the spec — reverse-engineer per-domain current-state assessments (dossiers), the tech-stack, architecture, and glossary from the real code, mark them inferred, and ratify with a human before they become the source of truth. Use to onboard a repo that has code but thin or no specs, or to spec just the area you are about to change.
---

# sdd-adopt

Bring an existing codebase under spec-driven development by deriving the spec *from the code*,
then having a human ratify it. Greenfield writes spec → code; adopt reads code → spec, so the
artifacts start as **inferred guesses** and are trusted only once **ratified**.

Adopt is **backward-looking**: it assesses *what is*, it does not author intended change. It does
**not** invent a briefing or write epics — those are forward-looking artifacts. The current state
of each bounded context is captured in a **domain dossier**; epics are authored later, forward,
when you decide to change something (see *After adoption*).

## When to use

- A repo has code but little or no spec, and you want to start the SDD loop on it.
- You are about to change a brownfield area and need its slice assessed first.

## Scope first — go just-in-time

Do **not** reverse-engineer the whole system by default. Ask what we are about to work on and
baseline only that slice (a module, a feature, a bounded context). Whole-repo adoption is opt-in
and expensive. Record the scope you chose.

## Procedure

1. **Survey the code.** Read build/manifest files (`package.json`, `pyproject.toml`, `go.mod`, …),
   entry points, directory structure, tests, and the targeted area. Identify what the system does,
   its components and boundaries, the de-facto stack, and recurring domain terms.

2. **Emit inferred artifacts** (only for the chosen scope), each with front-matter
   `origin: inferred`:
   - `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md` — the **actual** stack from dependencies/build files (descriptive).
   - `${CLAUDE_PROJECT_DIR}/specs/architecture.md` — system-wide components, boundaries, and cross-cutting
     patterns as they exist; capture significant existing decisions as **retroactive ADRs**
     (`Status: accepted`).
   - `${CLAUDE_PROJECT_DIR}/specs/glossary.md` — domain terms found in code and tests (ubiquitous language).
   - `${CLAUDE_PROJECT_DIR}/specs/domains/index.md` — a navigation map of the dossiers in scope, by copying
     `${CLAUDE_PLUGIN_ROOT}/templates/domain-index.md`.
   - `${CLAUDE_PROJECT_DIR}/specs/domains/<name>.md` — one **dossier per bounded context** in scope, by copying
     `${CLAUDE_PLUGIN_ROOT}/templates/domain.md`. Each dossier is a current-state assessment: the context's
     structure (domain model, key components with paths, interfaces) and its behaviour (key
     behaviours, plus *Current capabilities* — the features it provides today, each with
     Given/When/Then describing **current** behaviour).

   Do **not** write `briefing.md` or epics here. The dossier is descriptive; intent comes later.

3. **Flag unknowns and drift.** Call out behaviour you couldn't infer, code with no obvious
   purpose, and anything inconsistent or risky. Do not invent intent to fill gaps — mark it
   "needs ratification".

## Ratification gate — required

Inferred is not true. Walk the human through each inferred artifact and get explicit confirmation
or correction. On sign-off, flip `origin: inferred → ratified`:

- each domain dossier → `origin: ratified` (an agreed description of what exists);
- `domains/index.md` → `ratified` once every dossier it lists is ratified;
- `tech-stack.md` → `accepted`; `architecture.md` → `ready`.

Nothing is a source of truth while it is still `origin: inferred`.

## After adoption

- **To trust the baseline:** dossiers describe behaviour that usually has no tests. Use
  `sdd-implement` in brownfield mode to add **characterization tests** that pin the current
  behaviour recorded in a dossier's *Current capabilities*.
- **To change behaviour:** this is forward work, so author it forward. Use `sdd-epic` in
  **promotion mode** to turn the slice you're changing into a real epic, seeding its acceptance
  criteria from the dossier's *Current capabilities* and authoring its intent fresh (capture the
  change's intent with `sdd-briefing` if no briefing exists yet). Then refine → reconcile →
  story-breakdown → implement (brownfield) → verify.

## Guardrails

- Descriptive first: adopt documents what **is**, not what we wish, and never as an epic. Wishes
  are a separate, later forward change authored via `sdd-epic`.
- Inferred artifacts must be visibly marked and ratified before anything downstream relies on them.
- One dossier per bounded context; keep term definitions in the glossary, not duplicated per
  dossier.
