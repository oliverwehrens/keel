---
name: sdd-story-breakdown
model: sonnet
description: Break a ready epic into implementation stories under specs/stories/. Use when an epic has cleared the confidence gate (status ready) and the user wants concrete, independently implementable and verifiable work items with sequencing.
---

# sdd-story-breakdown

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
be resolved. Route anything that surfaces by its kind — never absorb it silently. And whenever a
question stays inside the breakdown (a decomposition or implementation choice), **never write it
down as a bare question.** Pose **exactly three** distinct, viable options as a checklist, each
with pros and cons, mark the one you recommend `(recommended)`, and leave the boxes empty so the
user picks one with `[x]` when they review the file:

```
### Q: <the open question>
- [ ] **A — <short name>** (recommended)
  - Pros: <why this is good>
  - Cons: <the trade-off>
- [ ] **B — <short name>**
  - Pros: …
  - Cons: …
- [ ] **C — <short name>**
  - Pros: …
  - Cons: …
```

The three must be real alternatives, not one option and two straw men. Then hand back and let the
user choose; do not pick for them.

- **Product / scope / acceptance ambiguity** → stop and send it back to `sdd-refine` (or
  `sdd-reconcile`). The epic is the source of truth; breakdown may not redefine it. A real scope
  question here means the epic wasn't as `ready` as assumed.
- **Architecture / stack ambiguity** → send it back to `sdd-tech-refine` (record it there as an ADR).
- **Decomposition choices** (how to slice, sequencing, which story owns a capability) → these are
  breakdown's own decisions. Pose them with the three-option checklist above (three viable
  slicings) and let the user pick with `[x]`.
- **Genuine implementation detail** that doesn't affect scope or the slice → record it as a
  story-level *Open question*, using the same three-option checklist so the user can choose one
  later in the story file. Never block the breakdown on it: until the user picks, the `(recommended)`
  option stands as the default for `sdd-implement` to resolve test-first.

## Done when

- `${CLAUDE_PROJECT_DIR}/specs/stories/EPIC-NNN/` contains the stories, each following the template with a
  unique ID and testable criteria.
- The parent epic is `broken-down` and fully covered by its stories.

## Next

Stories are ready for implementation (the implement/verify phases plug in here).
