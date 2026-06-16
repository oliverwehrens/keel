---
id: EPIC-NNN-SMM
title: <short title>
status: draft        # draft | ready | in-progress | verified
epic: ../../epics/EPIC-NNN-<slug>.md
estimate: <S | M | L>
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# EPIC-NNN-SMM — <title>

## Goal

One sentence: the slice of the epic this story delivers. A story should be independently
implementable and verifiable.

## Acceptance criteria

Derived from the parent epic, narrowed to this slice. Each a **Given/When/Then** scenario and the
seed of an outer acceptance test. Record the test that covers it for traceability.

- [ ] **Given** … **when** … **then** … — _test:_ `<test name once written>`

## Definition of Done

- [ ] Every acceptance criterion above has a passing test that names it (criterion ↔ test).
- [ ] Implemented London-style: collaborators behind owned ports; no third-party mocks.
- [ ] Conforms to `specs/architecture.md` (boundaries, guidelines) and `specs/tech-stack.md`.
- [ ] New domain terms added to `specs/glossary.md`.
- [ ] `architecture-guardian` returns PASS on the change.
- [ ] Full test suite green.

## Implementation notes

Approach, key files/modules, interfaces, data shapes. Enough for an implementer to start
without re-deriving decisions. Leave empty if the breakdown deliberately defers it.

## Dependencies

Other stories or epics that must land first. Reference IDs.

- …

## Out of scope

What this story explicitly does not cover (so reviewers don't expect it).

- …

## Open questions

Implementation-level unknowns to resolve during `sdd-implement` (test-first). Anything that
touches scope or acceptance criteria belongs back in the epic via `sdd-refine`, not here.

- …
