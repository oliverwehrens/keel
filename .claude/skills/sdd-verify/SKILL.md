---
name: sdd-verify
description: Verify a completed story (or epic) against its acceptance criteria and Definition of Done — checking traceability (criterion ↔ test ↔ code), conformance, and that the tests actually run green. Use after sdd-implement; marks the story verified.
---

# sdd-verify

Independently confirm that an implemented story meets its acceptance criteria and Definition of
Done. Verify is a *separate* judgment from implement — never assume green because the implementer
said so; run it.

## Preconditions

- The story is `status: in-progress` with implementation present.

## Checks

1. **Tests run green.** Actually execute the suite (per `specs/tech-stack.md` testing). If you
   cannot run them, say so explicitly — do not infer a pass.

2. **Traceability — criterion ↔ test ↔ code.** Every acceptance criterion (Given/When/Then) has a
   test that exercises it, and every such test names the criterion. Flag any criterion with no
   test, or any test that asserts nothing meaningful.

3. **Definition of Done.** Walk the story's DoD checklist (see `specs/README.md`). Each item is
   pass/fail with evidence, not assertion.

4. **Conformance.** Run the `architecture-guardian` subagent over the change for product fidelity,
   stack, and architecture conformance. Any blocker fails verification.

5. **No scope drift.** The implementation does only what the story/epic require — nothing the
   product spec doesn't sanction.

## Outcome

- **Pass** — set the story `status: verified` and record in the story which criteria/DoD items
  were checked and how. When all of an epic's stories are `verified`, mark the epic `verified`.
- **Fail** — list the specific failures (criterion, DoD item, or guardian blocker) and hand back
  to `sdd-implement`. Never mark `verified` while a failure is open.
