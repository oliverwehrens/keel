---
name: sdd-refine
description: Iterate a single epic until it clears the confidence gate and can be marked ready. Use when an epic is draft/refining and the user wants to resolve open questions, tighten scope and acceptance criteria, and build confidence before breaking it down or implementing.
---

# sdd-refine

Drive one epic from `draft` to `ready` through deliberate iteration. Read
`specs/README.md` — especially the **confidence gate** — before starting.

## Input

The target epic. If the user didn't name one, list epics in `specs/epics/` with their
`status`/`confidence` and ask which to refine (default to the lowest-confidence
non-`ready` epic).

## The loop

Set the epic's `status: refining`, then repeat until the gate is met:

1. **Critique the epic against the gate.** For each gate item, state pass or fail:
   - Scope: both in/out explicit, no "TBD"?
   - Open questions: each answered or deliberately deferred with owner + rationale?
   - Acceptance criteria: each observable and testable?
   - Risks & dependencies: listed?
   - Confidence: honestly 4–5 of 5?

2. **Attack the biggest gap.** Take the weakest item and resolve it:
   - Surface the specific ambiguity to the user as concrete options/questions, not open
     prose. Prefer "A or B?" over "what do you think?".
   - Turn answers into tightened scope, sharper criteria, or resolved questions.
   - Convert resolved unknowns from *Open questions* into the relevant section.

3. **Update the epic and score it.** Re-assess confidence honestly. Append a Changelog
   entry: date, what changed, new confidence. Bump `confidence` and `updated` in
   front-matter.

4. **Stop conditions.**
   - **Gate met** → set `status: ready`. State which criteria now pass.
   - **Blocked** → if a question can't be answered now, either defer it explicitly
     (owner + why it's safe to defer) or stop and tell the user what external input is
     needed. Do not fake confidence to pass the gate.

## Guardrails

- One epic per run. Don't silently rewrite scope the user didn't agree to — propose, then
  apply.
- Never set `status: ready` while a gate item fails. The gate is the whole point.

## Next

When `ready`, recommend `sdd-breakdown` to split it into implementation stories.
