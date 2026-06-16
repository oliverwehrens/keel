---
name: sdd-breakdown
model: sonnet
description: Break a ready epic into implementation stories under specs/stories/. Use when an epic has cleared the confidence gate (status ready) and the user wants concrete, independently implementable and verifiable work items with sequencing.
---

# sdd-breakdown

Split a `ready` epic into implementation stories. Read `${CLAUDE_PLUGIN_ROOT}/CONVENTIONS.md` for the ID
scheme and the story template.

## Preconditions

- The target epic is `status: reconciled` (final). If it is only `ready`, recommend
  `sdd-reconcile` first so the epic is consistent with the briefing and its siblings; if it
  is `draft`/`refining`, recommend `sdd-refine`. Breaking down a soft or unreconciled epic
  produces soft stories. (If the user insists, warn once, then proceed.)
- `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md` is `accepted` and `${CLAUDE_PROJECT_DIR}/specs/architecture.md` is `ready`. If not,
  recommend `sdd-techstack` / `sdd-tech-refine` first so stories can carry concrete,
  conformant implementation notes. (Warn once, then proceed if the user insists.)

## Procedure

1. **Re-read the ready epic.** Anchor on its acceptance criteria — every criterion must be
   covered by at least one story, and every story must trace back to a criterion.

2. **Propose a story slicing.** Each story should be:
   - **Vertical & valuable** — a thin end-to-end slice over a horizontal layer where
     possible.
   - **Independently verifiable** — has its own pass/fail acceptance criteria.
   - **Small** — if it can't be estimated S/M/L with confidence, split further.

   Present the proposed stories (id placeholder, title, one-line goal, dependencies) and
   confirm with the user before writing files.

3. **Sequence them.** Identify the dependency order and a sensible first story (ideally a
   walking skeleton that proves the riskiest assumption early). Record dependencies by ID.

4. **Write the stories.** For each, copy `${CLAUDE_PLUGIN_ROOT}/templates/story.md` into
   `${CLAUDE_PROJECT_DIR}/specs/stories/EPIC-NNN/` as `EPIC-NNN-SMM-<slug>.md`:
   - Assign `EPIC-NNN-SMM` IDs sequentially within the epic.
   - Derive acceptance criteria as Given/When/Then, narrowed to the slice; keep the story's
     Definition of Done checklist.
   - Fill *Implementation notes* with enough to start, grounded in `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md` and
     `${CLAUDE_PROJECT_DIR}/specs/architecture.md` (name the components/interfaces involved); defer only deliberately.

5. **Close the loop on the epic.** Set the epic's `status: broken-down`, add a Changelog
   entry listing the story IDs created, and confirm every epic acceptance criterion maps
   to ≥1 story.

## Handling open questions

Breakdown runs on a `reconciled` epic and a `ready` architecture, so big unknowns should already
be resolved. Route anything that surfaces by its kind — never absorb it silently:

- **Product / scope / acceptance ambiguity** → stop and send it back to `sdd-refine` (or
  `sdd-reconcile`). The epic is the source of truth; breakdown may not redefine it. A real scope
  question here means the epic wasn't as `ready` as assumed.
- **Architecture / stack ambiguity** → send it back to `sdd-tech-refine` (record it there as an ADR).
- **Decomposition choices** (how to slice, sequencing, which story owns a capability) → these are
  breakdown's own decisions. Resolve them with the three-option format from `sdd-refine`: exactly
  three viable slicings, pros and cons, the one you recommend marked `(recommend)`, and let the
  user pick with `[x]`.
- **Genuine implementation detail** that doesn't affect scope or the slice → capture it as a
  story-level *Open question* for `sdd-implement` to resolve test-first; never block the breakdown
  on it.

## Done when

- `${CLAUDE_PROJECT_DIR}/specs/stories/EPIC-NNN/` contains the stories, each following the template with a
  unique ID and testable criteria.
- The parent epic is `broken-down` and fully covered by its stories.

## Next

Stories are ready for implementation (the implement/verify phases plug in here).
