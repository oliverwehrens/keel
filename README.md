# clauderemote — Spec-Driven Development skills

A set of [Claude Code](https://claude.com/claude-code) skills that turn a rough idea into
implementation-ready specs through a deliberate, gated pipeline. You drive each phase from
the chat; the skills keep the spec artifacts in `specs/` consistent and reviewable.

## Pipeline

```
PRODUCT:  briefing ─► epics ─► refine ─► reconcile
TECH:     tech-stack ─► tech-refine
BUILD:    breakdown ─► implement ─► verify
```

The **product description** (`briefing.md` + reconciled epics) is the **source of truth**.
The tech phases decide *how* and trace back to it — they never redefine *what*.

| Phase      | Skill              | Produces                                     |
| ---------- | ------------------ | -------------------------------------------- |
| Briefing   | `/sdd-briefing`    | `specs/briefing.md`                          |
| Epics      | `/sdd-epic`        | `specs/epics/EPIC-NNN-*.md`                  |
| Refine     | `/sdd-refine`      | a `ready` epic (confidence gate)             |
| Reconcile  | `/sdd-reconcile`   | a `reconciled` (final) epic                  |
| Tech stack | `/sdd-techstack`   | `specs/tech-stack.md`                        |
| Tech refine| `/sdd-tech-refine` | `specs/architecture.md` (guardian-reviewed)  |
| Breakdown  | `/sdd-breakdown`   | `specs/stories/EPIC-NNN/*.md`                |
| Implement  | `/sdd-implement`   | code + tests (London-school TDD)             |
| Verify     | `/sdd-verify`      | a `verified` story (criteria + DoD)          |

The **`architecture-guardian`** subagent (`.claude/agents/`) reviews technical work and
implementation against the product spec, stack, and architecture throughout. Implementation is
**London-school (mockist) TDD**, outside-in, with acceptance criteria written as Given/When/Then.
A `specs/glossary.md` keeps terminology consistent from spec to code.

## How it works

- Each phase is a skill in `.claude/skills/`. Invoke it as a slash command
  (`/sdd-briefing`) or just describe the intent and Claude will pick the right one.
- All artifacts live in `specs/` as plain markdown — diffable, reviewable, committable.
- Conventions (IDs, status lifecycle, the confidence gate) are defined once in
  [`specs/README.md`](specs/README.md); every skill follows them.
- Templates in `specs/_templates/` are the single source of truth for artifact structure.

## Quick start

1. `/sdd-briefing` — answer the interview to produce `specs/briefing.md`.
2. `/sdd-epic` — draft epics from the briefing.
3. `/sdd-refine` — iterate an epic until it clears the confidence gate (`ready`).
4. `/sdd-reconcile` — reconcile the ready epic against the briefing and siblings; mark it
   `reconciled` (final).
5. `/sdd-techstack` — choose the tech stack, each decision traced to a product need.
6. `/sdd-tech-refine` — design and refine the architecture on that stack (guardian-reviewed).
7. `/sdd-breakdown` — split a reconciled epic into implementation stories grounded in the
   stack and architecture.
8. `/sdd-implement` — build each story test-first (London-school TDD), outside-in.
9. `/sdd-verify` — check each story against its acceptance criteria and Definition of Done.

The key idea: **nothing advances until it's earned it.** `sdd-refine` will not mark an
epic `ready` until scope, acceptance criteria, open questions, and risks all pass the
gate — and `sdd-verify` will not mark a story `verified` until its tests, traceability, and
Definition of Done all pass. So every phase starts from solid ground.
