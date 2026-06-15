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

3. **Story acceptance criteria met.** Each Given/When/Then criterion on the story is demonstrably
   satisfied by its test(s).

4. **Epic fidelity — check against the product epic, not just the story.** The story's criteria
   correctly derive from and serve the parent epic's acceptance criteria, and the delivered
   behaviour advances the epic's intent without contradicting it. The epic (with the briefing) is
   the source of truth; a story that passes its own criteria but drifts from the epic fails here.

5. **Definition of Done.** Walk the story's DoD checklist (see `specs/README.md`). Each item is
   pass/fail with evidence, not assertion.

6. **Conformance.** Run the `architecture-guardian` subagent over the change for product fidelity,
   stack, and architecture conformance. Any blocker fails verification.

7. **No scope drift.** The implementation does only what the story and epic require — nothing the
   product spec doesn't sanction.

## Outcome

- **Story pass** — set the story `status: verified` and record which criteria/DoD items were
  checked and how.
- **Epic rollup** — when every story under an epic is `verified`, verify the **epic as a whole**:
  each epic acceptance criterion (Given/When/Then) is demonstrably met by the union of its
  stories, with no uncovered criterion. Only then mark the epic `verified`. If an epic criterion
  is unmet or uncovered, the epic is not verified — raise it (likely a missing story via
  `sdd-breakdown`).
- **Fail** — list the specific failures (criterion, epic-fidelity gap, DoD item, or guardian
  blocker) and hand back to `sdd-implement`. Never mark `verified` while a failure is open.
