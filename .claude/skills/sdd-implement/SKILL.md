---
name: sdd-implement
description: Implement a story test-first in the London (mockist) TDD style — outside-in, need-driven, mocking only owned collaborators — conforming to the architecture, tech stack, and product spec. Use after sdd-breakdown when a story is ready to build.
---

# sdd-implement

Implement one story using **London-school (mockist) TDD**, outside-in, staying faithful to the
product spec (the source of truth), the tech stack, and the architecture. Before writing code,
read the story, its parent epic, the relevant `specs/architecture.md` and `specs/tech-stack.md`
sections, and `specs/glossary.md`.

## Preconditions

- A target story exists, its epic is `broken-down`, and `specs/architecture.md` is `ready`. If
  not, point back to `sdd-breakdown` / `sdd-tech-refine`.
- Set the story `status: in-progress`.

## The London-TDD loop (outside-in, double loop)

For each acceptance criterion (a Given/When/Then scenario) in the story:

1. **Outer loop — acceptance test.** Write one failing acceptance test that expresses the
   criterion's Given/When/Then end-to-end at the system boundary. It stays red until the slice
   is done. Name the test after the criterion it covers (traceability).

2. **Inner loop — drive the objects.** Red → green → refactor in small steps:
   - Write a failing unit test for the next behavior the acceptance test demands.
   - **Need-driven design:** when the object under test needs a collaborator, invent the *role*
     (interface) it needs at the point of need — don't reach for a concrete class first.
   - **Mock roles, not values, and only types you own.** Never mock a third-party library — wrap
     it behind a port you own and mock the port. Assert on interactions/behaviour, not internal
     state ("tell, don't ask").
   - Make it pass with the simplest code, then refactor (names, duplication) with tests green.

3. **Close the slice.** When the acceptance test goes green, the criterion is met. Move to the
   next criterion.

## Conform as you go

- **Architecture:** honour the principles, component boundaries, and guidelines in
  `specs/architecture.md`. Ports & adapters — keep domain logic free of framework/I-O imports;
  adapters implement the ports. If you make a new significant, hard-to-reverse decision, record
  it as an ADR via `sdd-tech-refine` rather than burying it in code.
- **Stack:** stay within `specs/tech-stack.md`. No unsanctioned dependency without recording the
  decision.
- **Ubiquitous language:** name code and tests with the terms in `specs/glossary.md`. If you need
  a new domain term, add it to the glossary.

## Checkpoints

- Run the `architecture-guardian` subagent on the diff before finishing; resolve its blockers.
- Keep the story's traceability current: each criterion maps to the acceptance test that covers
  it (fill the `_test:_` reference in the story).

## Done

When every criterion's acceptance test (and its unit tests) is green and the guardian passes,
hand off to `sdd-verify`. Leave `status: in-progress` until verify confirms the Definition of
Done — implement does not self-certify.
