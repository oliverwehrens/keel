---
name: sdd-audit
model: sonnet
description: Detect drift between the spec and the actual code — undocumented code (no epic), unbuilt spec (epics/criteria with no code or tests), architecture violations, stale traces, and terminology drift. Use periodically on a living project, or before iterating in an area, to keep the product spec a true source of truth.
---

# sdd-audit

Check that the spec still matches reality and report **drift**. Greenfield assumes code follows
spec; over a project's life, hotfixes, refactors, and outside commits pull them apart, and the spec
quietly becomes fiction. Audit finds the gaps so the source of truth stays true. It reuses the same
archaeology + guardian machinery as `sdd-adopt` (see `${CLAUDE_PLUGIN_ROOT}/docs/brownfield.md`).

## When to use

- Periodically on a living codebase, and **before** starting an iteration in an area.
- After a burst of changes that may have outpaced the spec.

## Scope

Audit a slice (a module / epic / area) by default; whole-repo is opt-in. State the scope you chose.

## What it checks

1. **Undocumented code** — behaviour, modules, endpoints, or capabilities in the code that map to
   **no epic**.
2. **Unbuilt spec** — epics or acceptance criteria with **no corresponding code or test** (either
   not implemented, or implemented and the trace was lost).
3. **Architecture violations** — run the `architecture-guardian` over the scope: boundaries crossed,
   ADRs contradicted, stack deviations.
4. **Stale traces** — `verified` epics whose tests no longer exist or no longer pass; broken
   criterion ↔ test ↔ code links.
5. **Terminology drift** — code/tests using terms that disagree with `${CLAUDE_PROJECT_DIR}/specs/glossary.md`.

### Brownfield — also audit against the dossiers

If `${CLAUDE_PROJECT_DIR}/specs/domains/` exists, treat the **ratified** dossiers as a current-state spec source
alongside epics:

- code that **contradicts** a dossier's *Current capabilities* (behaviour changed without the
  dossier being updated or the slice promoted to an epic) is drift;
- a dossier capability with **no code or test** backing it is drift;
- for "undocumented code" (check 1), behaviour covered by a ratified dossier counts as documented —
  don't re-flag it; truly uncovered behaviour still does.

## Output

A drift report grouped by the five categories. Each finding states: where it is, which spec rule or
artifact it concerns, severity, and the **resolution route** — audit does **not** fix anything
silently:

- Undocumented code → `sdd-adopt` (brownfield) or `sdd-epic` (new intent).
- Unbuilt spec → `sdd-story-breakdown` / `sdd-implement`, or retire the dead spec via `sdd-refine`.
- Architecture violation → `sdd-tech-refine` (amend arch/ADR) or fix the code via `sdd-implement`.
- Stale trace → `sdd-implement` / `sdd-verify`.
- Glossary drift → `sdd-reconcile`.
- Dossier ↔ code disagreement (brownfield) → `sdd-adopt` to re-assess/re-ratify the dossier if the
  code is right, or `sdd-epic` to promote the change forward if the behaviour change was intended.

End with a one-line verdict: **IN SYNC** (no drift) or **DRIFT FOUND (N)**.

## Guardrails

- Audit reports; it does not change code or spec. Resolution goes through the owning phase so the
  gates still apply.
- Where code and a ratified spec disagree, that *is* the finding — don't assume the code is right or
  the spec is right; surface it for a human decision.
