# clauderemote — Spec-Driven Development skills

A set of [Claude Code](https://claude.com/claude-code) skills that turn a rough idea into
implementation-ready specs through a deliberate, gated pipeline. You drive each phase from
the chat; the skills keep the spec artifacts in `specs/` consistent and reviewable.

## Pipeline

```
briefing  ─►  epics  ─►  refine  ─►  reconcile  ─►  breakdown  ─►  (implement · verify)
```

| Phase     | Skill            | Produces                          |
| --------- | ---------------- | --------------------------------- |
| Briefing  | `/sdd-briefing`  | `specs/briefing.md`               |
| Epics     | `/sdd-epic`      | `specs/epics/EPIC-NNN-*.md`       |
| Refine    | `/sdd-refine`    | a `ready` epic (confidence gate)  |
| Reconcile | `/sdd-reconcile` | a `reconciled` (final) epic       |
| Breakdown | `/sdd-breakdown` | `specs/stories/EPIC-NNN/*.md`     |

This is the **spine**. Planned next phases: tech-stack definition, an
**architecture-guardian subagent** that reviews work against guidelines, and the
implement/verify phases.

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
5. `/sdd-breakdown` — split a reconciled epic into implementation stories.

The key idea: **nothing advances until it's earned it.** `sdd-refine` will not mark an
epic `ready` until scope, acceptance criteria, open questions, and risks all pass the
gate — so breakdown and implementation start from solid ground.
