# Specs

This directory holds the living specification for the product. Everything here is
generated and refined through the **spec-driven development (SDD)** skills (the
`sdd-*` skills in `.claude/skills/`). Treat these files as the source of truth that
implementation must conform to.

## Pipeline

```
briefing  ─►  epics  ─►  refine  ─►  breakdown ─►  (implementation)
 sdd-briefing  sdd-epic   sdd-refine   sdd-breakdown
```

1. **Briefing** (`sdd-briefing`) — capture the raw intent in `briefing.md`.
2. **Epic** (`sdd-epic`) — turn the briefing into one or more epics under `epics/`.
3. **Refine** (`sdd-refine`) — iterate an epic until it clears the confidence gate.
4. **Breakdown** (`sdd-breakdown`) — split a `ready` epic into implementation stories.

> Later phases (reconcile, tech-stack, architecture guardian, implement, verify) plug
> in after breakdown and are not part of this first spine.

## Layout

```
specs/
  README.md            ← you are here (conventions + index)
  briefing.md          ← the product brief (entry artifact)
  epics/
    EPIC-001-<slug>.md
  stories/
    EPIC-001/
      EPIC-001-S01-<slug>.md
  _templates/          ← canonical templates the skills fill in
    briefing.md
    epic.md
    story.md
```

## ID scheme

- **Epics:** `EPIC-NNN` (zero-padded, monotonically increasing, never reused).
- **Stories:** `EPIC-NNN-SMM` (scoped to the parent epic).
- The slug is a short kebab-case summary, e.g. `EPIC-001-user-auth.md`.
- IDs are assigned once and are stable; renaming the slug is fine, the ID is not.

## Status lifecycle

Every epic and story carries a `status` in its front-matter:

| status         | meaning                                                        |
| -------------- | -------------------------------------------------------------- |
| `draft`        | created, not yet refined                                       |
| `refining`     | actively being iterated by `sdd-refine`                        |
| `ready`        | cleared the confidence gate; safe to break down / implement    |
| `broken-down`  | epic has been split into stories                               |
| `in-progress`  | implementation under way (later phase)                         |
| `verified`     | implementation verified against acceptance criteria (later)    |

## Confidence gate

`sdd-refine` does not mark an epic `ready` until **all** of these hold:

1. **Scope** — in-scope and out-of-scope are both explicit; no "TBD" in scope.
2. **Open questions** — every open question is either answered or explicitly deferred
   with an owner and rationale.
3. **Acceptance criteria** — each is observable and testable (a reviewer could mark it
   pass/fail without guessing).
4. **Risks & dependencies** — known risks and upstream/downstream dependencies are listed.
5. **Confidence score** — author records a self-assessed score of **4 or 5 of 5**:

   - 1 — vague idea, many unknowns
   - 2 — direction clear, scope fuzzy
   - 3 — scope clear, criteria/edge-cases still soft
   - 4 — criteria testable, minor open questions deferred deliberately
   - 5 — no material unknowns; ready to implement as written

Each refine pass appends a dated entry to the epic's **Changelog** so the reasoning
trail is preserved.
