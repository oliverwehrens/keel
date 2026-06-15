---
name: sdd-reconcile
model: opus
description: Reconcile a ready epic against the briefing and its sibling epics, resolve inconsistencies, and mark it final (reconciled). Use after sdd-refine has brought an epic to `ready` and before breaking it down — to ensure the epic set is consistent, fully covers the briefing, and has no overlaps or contradictions.
---

# sdd-reconcile

Make a `ready` epic final by checking it for consistency in two directions and resolving
what doesn't line up. Read `specs/README.md` for the status lifecycle. Reconcile assumes
the confidence gate already passed in `sdd-refine`; it finalizes, it does not refine.

## Input / preconditions

- Target a single epic (typically the one just made `ready`). If none is named, list the
  `ready` epics and ask which to reconcile; offer to sweep all of them.
- The epic should be `status: ready`. If it is still `draft`/`refining`, stop and recommend
  `sdd-refine` first.

## Two checks

### 1. Vertical — epic ↔ briefing

Read `specs/briefing.md`, then verify:

- **Traceability** — every capability and acceptance criterion traces to a briefing goal or
  success metric. Flag anything that serves no briefing goal (scope creep).
- **No violations** — nothing in scope contradicts a briefing **non-goal** or **constraint**.
- **Coverage** — note the briefing goals this epic was meant to cover; if a goal is covered
  by *no* epic at all, flag the gap.
- **Freshness** — if the briefing changed after the epic was written, reconcile to the
  current briefing.

### 2. Horizontal — epic ↔ sibling epics

Read the other epics in `specs/epics/`, then verify:

- **No overlap** — the same capability isn't owned by two epics; if it is, decide who owns it.
- **Consistent dependencies** — a dependency this epic declares is declared (and not
  contradicted) by the other side.
- **No contradictions** — acceptance criteria across epics don't conflict.
- **Consistent terms** — the same concept uses the same name across epics; align drift against
  `specs/glossary.md` and add any missing terms to it.

## Resolving what you find

- **Mechanical fixes** (terminology, a missing back-reference, a clarifying note): apply
  directly.
- **Substantive conflicts** that would change agreed scope (who owns a capability, dropping a
  criterion): do **not** decide silently. Surface each as a choice using the same
  three-option format as `sdd-refine` — exactly three viable options, pros and cons, the one
  you recommend marked `(recommend)` — and wait for the user's `[x]` pick before changing
  scope.
- **Coverage gaps**: report them and recommend `sdd-epic` to add the missing epic rather than
  stretching this one.

## Finalize

When the epic is consistent both ways and any conflicts are resolved:

- Set `status: reconciled` and bump `updated`.
- Append a Changelog entry summarizing what was reconciled and any decisions made.
- State the result plainly: the epic is final.

## Guardrails

- Reconcile checks consistency; it does not reopen settled decisions without cause. Touch
  scope only to resolve a real conflict, violation, or gap.
- Never mark `reconciled` while a substantive conflict or briefing violation is unresolved.

## Next

When `reconciled`, recommend `sdd-breakdown` to split the final epic into implementation
stories.
