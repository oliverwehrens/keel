---
name: sdd-breakdown
description: Break a ready epic into implementation stories under specs/stories/. Use when an epic has cleared the confidence gate (status ready) and the user wants concrete, independently implementable and verifiable work items with sequencing.
---

# sdd-breakdown

Split a `ready` epic into implementation stories. Read `specs/README.md` for the ID
scheme and the story template.

## Preconditions

- The target epic is `status: reconciled` (final). If it is only `ready`, recommend
  `sdd-reconcile` first so the epic is consistent with the briefing and its siblings; if it
  is `draft`/`refining`, recommend `sdd-refine`. Breaking down a soft or unreconciled epic
  produces soft stories. (If the user insists, warn once, then proceed.)
- `specs/tech-stack.md` is `accepted` and `specs/architecture.md` is `ready`. If not,
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

4. **Write the stories.** For each, copy `specs/_templates/story.md` into
   `specs/stories/EPIC-NNN/` as `EPIC-NNN-SMM-<slug>.md`:
   - Assign `EPIC-NNN-SMM` IDs sequentially within the epic.
   - Derive acceptance criteria from the parent epic, narrowed to the slice.
   - Fill *Implementation notes* with enough to start, grounded in `specs/tech-stack.md` and
     `specs/architecture.md` (name the components/interfaces involved); defer only deliberately.

5. **Close the loop on the epic.** Set the epic's `status: broken-down`, add a Changelog
   entry listing the story IDs created, and confirm every epic acceptance criterion maps
   to ≥1 story.

## Done when

- `specs/stories/EPIC-NNN/` contains the stories, each following the template with a
  unique ID and testable criteria.
- The parent epic is `broken-down` and fully covered by its stories.

## Next

Stories are ready for implementation (the implement/verify phases plug in here).
