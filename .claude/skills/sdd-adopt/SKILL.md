---
name: sdd-adopt
description: Baseline an existing (brownfield) codebase into the spec — reverse-engineer the briefing, epics, tech-stack, architecture, and glossary from the real code, mark them inferred, and ratify with a human before they become the source of truth. Use to onboard a repo that has code but thin or no specs, or to spec just the area you are about to change.
---

# sdd-adopt

Bring an existing codebase under spec-driven development by deriving the spec *from the code*,
then having a human ratify it. Greenfield writes spec → code; adopt reads code → spec, so the
artifacts start as **inferred guesses** and are trusted only once **ratified**.

## When to use

- A repo has code but little or no spec, and you want to start the SDD loop on it.
- You are about to change a brownfield area and need its slice specified first.

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
   - `specs/tech-stack.md` — the **actual** stack from dependencies/build files (descriptive).
   - `specs/architecture.md` — components, boundaries, and cross-cutting patterns as they exist;
     capture significant existing decisions as **retroactive ADRs** (`Status: accepted`).
   - `specs/glossary.md` — domain terms found in code and tests.
   - `specs/briefing.md` — an **inferred** problem/users/goals, clearly marked as a guess.
   - `specs/epics/EPIC-NNN-*.md` — one per existing capability in scope ("as-is" epics), with
     Given/When/Then criteria describing **current** behaviour.

3. **Flag unknowns and drift.** Call out behaviour you couldn't infer, code with no obvious
   purpose, and anything inconsistent or risky. Do not invent intent to fill gaps — mark it
   "needs ratification".

## Ratification gate — required

Inferred is not true. Walk the human through each inferred artifact and get explicit confirmation
or correction. On sign-off, set `origin: ratified` and the normal `status`:

- a ratified as-is epic that describes shipped behaviour → `status: reconciled` (a final, agreed
  description of what exists);
- `tech-stack.md` → `accepted`; `architecture.md` → `ready`.

Nothing is a source of truth while it is still `origin: inferred`.

## After adoption

- **To trust the baseline:** as-is epics usually have no tests. Use `sdd-implement` in brownfield
  mode to add **characterization tests** that pin current behaviour, then `sdd-verify` → `verified`.
- **To change behaviour:** treat it as iteration — amend the ratified epic via `sdd-refine`,
  reconcile, breakdown, implement (brownfield mode), verify.

## Guardrails

- Descriptive first: adopt documents what **is**, not what we wish. Wishes are a separate, later
  to-be change.
- Inferred artifacts must be visibly marked and ratified before anything downstream relies on them.
