---
name: sdd-epic
model: sonnet
description: Draft one or more epics from the product briefing into specs/epics/. Use after a briefing exists and the user wants to turn intent into structured, scoped epics. Each epic is a coherent slice of value with acceptance criteria.
---

# sdd-epic

Turn `${CLAUDE_PROJECT_DIR}/specs/briefing.md` into one or more epics under `${CLAUDE_PROJECT_DIR}/specs/epics/`. Read
`${CLAUDE_PLUGIN_ROOT}/CONVENTIONS.md` for the ID scheme, status lifecycle, and confidence gate.

## Preconditions

- `${CLAUDE_PROJECT_DIR}/specs/briefing.md` exists. If not, stop and recommend `sdd-briefing` first.
- **Brownfield promotion exception:** when promoting from a ratified domain dossier (see below),
  a briefing may not exist yet. That is fine — capture the *intent of the change* with
  `sdd-briefing` first if it's missing, then promote.

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

   **Brownfield-aware (if `${CLAUDE_PROJECT_DIR}/specs/domains/` exists):** scan the dossier index for contexts
   the proposed epics touch. Where an epic changes behaviour a dossier already records, prefer
   **promotion** (see below) and say so; flag any new epic that overlaps or contradicts a dossier's
   *Current capabilities*. Keep this to a flag — the full conflict check belongs to `sdd-reconcile`.

3. **Assign IDs.** Scan `${CLAUDE_PROJECT_DIR}/specs/epics/` for the highest existing `EPIC-NNN` and continue
   from there. Never reuse an ID. Filename: `EPIC-NNN-<kebab-slug>.md`.

4. **Write each epic** by copying `${CLAUDE_PLUGIN_ROOT}/templates/epic.md` and filling every section.
   - Set front-matter: `id`, `title`, `status: draft`, `confidence: 1`, dates.
   - Link the briefing goal(s) each epic serves in *Motivation*.
   - Write each acceptance criterion as a Given/When/Then scenario — observable and testable.
   - Capture any new domain terms in `${CLAUDE_PROJECT_DIR}/specs/glossary.md` so language stays consistent.
   - It is fine to leave honest `Open questions`; that is what `sdd-refine` resolves.

5. **Don't over-refine here.** The job is good first drafts, not finished epics. Resist
   answering every open question now.

## Promotion mode — brownfield (from a domain dossier)

When the project was onboarded with `sdd-adopt`, current state lives in **ratified domain
dossiers** (`${CLAUDE_PROJECT_DIR}/specs/domains/<name>.md`), not in epics. A dossier is backward-looking
("what is"); an epic is forward-looking ("what will change"). To change a brownfield area, you
**promote** a slice of a dossier into a new epic:

- Read the relevant dossier's *Current capabilities*. **Seed** the epic's acceptance criteria from
  the Given/When/Then that describe behaviour you intend to keep or change.
- **Author the intent fresh** — *Summary*, *Motivation* (link the briefing goal driving the
  change), *Scope*, *Risks*. Do not copy these from the dossier; the dossier has no intent to copy.
- Only the slice you're actually changing becomes an epic. The dossier stays as the durable
  current-state baseline for the rest of the context.

The epic is `origin: authored` (the intended change is new), even though it descends from an
inferred-then-ratified dossier.

## Done when

- Each new epic file exists in `${CLAUDE_PROJECT_DIR}/specs/epics/`, follows the template, has a unique ID, and
  is `status: draft`, `confidence: 1`.

## Next

Recommend `sdd-refine` on each epic to drive it to the confidence gate.
