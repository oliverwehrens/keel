---
name: sdd-epic
model: sonnet
description: Draft one or more epics from the product briefing into specs/epics/. Use after a briefing exists and the user wants to turn intent into structured, scoped epics. Each epic is a coherent slice of value with acceptance criteria.
---

# sdd-epic

Turn `specs/briefing.md` into one or more epics under `specs/epics/`. Read
`specs/README.md` for the ID scheme, status lifecycle, and confidence gate.

## Preconditions

- `specs/briefing.md` exists. If not, stop and recommend `sdd-briefing` first.

## Procedure

1. **Read the briefing** in full. List the distinct goals / success metrics.

2. **Propose an epic set.** Slice the work so each epic is:
   - **Coherent** — delivers one identifiable chunk of user value.
   - **Independent-ish** — minimal entanglement with other epics (note unavoidable
     dependencies rather than merging epics to hide them).
   - **Right-sized** — if an epic clearly contains several unrelated capabilities, split
     it; if two are inseparable, keep them together.

   Present the proposed list (titles + one-line summaries) to the user and adjust before
   writing files.

3. **Assign IDs.** Scan `specs/epics/` for the highest existing `EPIC-NNN` and continue
   from there. Never reuse an ID. Filename: `EPIC-NNN-<kebab-slug>.md`.

4. **Write each epic** by copying `specs/_templates/epic.md` and filling every section.
   - Set front-matter: `id`, `title`, `status: draft`, `confidence: 1`, dates.
   - Link the briefing goal(s) each epic serves in *Motivation*.
   - Write each acceptance criterion as a Given/When/Then scenario — observable and testable.
   - Capture any new domain terms in `specs/glossary.md` so language stays consistent.
   - It is fine to leave honest `Open questions`; that is what `sdd-refine` resolves.

5. **Don't over-refine here.** The job is good first drafts, not finished epics. Resist
   answering every open question now.

## Done when

- Each new epic file exists in `specs/epics/`, follows the template, has a unique ID, and
  is `status: draft`, `confidence: 1`.

## Next

Recommend `sdd-refine` on each epic to drive it to the confidence gate.
