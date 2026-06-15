---
name: sdd-refine
model: opus
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
   - Acceptance criteria: each a testable Given/When/Then scenario?
   - Risks & dependencies: listed?
   - Confidence: honestly 4–5 of 5?

2. **Pose every open question as a choice — don't decide for the user.** For each open
   question (existing or newly surfaced), write **exactly three** distinct, viable options
   into the epic's *Open questions* section as a checklist, each with pros and cons, and
   mark the one you recommend with `(recommend)`:

   ```
   ### Q: <the open question>
   - [ ] **A — <short name>** (recommend)
     - Pros: <why this is good>
     - Cons: <the trade-off>
   - [ ] **B — <short name>**
     - Pros: …
     - Cons: …
   - [ ] **C — <short name>**
     - Pros: …
     - Cons: …
   ```

   The three must be real alternatives, not one option and two straw men. Leave the boxes
   empty — the user picks by marking `[x]` when they review the file. Then hand back so
   they can choose; do not pick for them.

3. **Fold in the user's picks.** Once questions are marked `[x]`, apply each chosen option:
   tighten scope / sharpen acceptance criteria / record the resulting risk, then replace
   that question's block with a one-line `**Decision:** <choice> — <why>` so the trail is
   kept.

4. **Update the epic and score it.** Re-assess confidence honestly. Append a Changelog
   entry: date, what changed, new confidence. Bump `confidence` and `updated` in
   front-matter.

5. **Stop conditions.**
   - **All questions answered & gate met** → set `status: ready`, state which criteria now
     pass, and **suggest `sdd-reconcile`** to make the document final.
   - **Questions still open** → hand back with the three-option blocks in place and wait for
     the user's `[x]` picks; do not advance.
   - **Blocked** → if a question genuinely can't be answered yet, defer it explicitly (owner
     + why it's safe to defer). Never fake confidence to pass the gate.

## Guardrails

- One epic per run. Don't silently rewrite scope the user didn't agree to — propose, then
  apply.
- Never set `status: ready` while a gate item fails. The gate is the whole point.

## Next

When every open question is answered and the gate passes, recommend `sdd-reconcile` to
reconcile the epic against the briefing and make the document final. (Breakdown into
stories follows once the epic is final.)
