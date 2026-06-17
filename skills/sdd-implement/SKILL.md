---
name: sdd-implement
model: sonnet
description: Implement a story test-first in the London (mockist) TDD style — outside-in, need-driven, mocking only owned collaborators — conforming to the architecture, tech stack, and product spec. Use after sdd-story-breakdown when a story is ready to build.
---

# sdd-implement

Implement one story using **London-school (mockist) TDD**, outside-in, staying faithful to the
product spec (the source of truth), the tech stack, and the architecture. Before writing code,
read the story, its parent epic, the relevant `${CLAUDE_PROJECT_DIR}/specs/architecture.md` and `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md`
sections, and `${CLAUDE_PROJECT_DIR}/specs/glossary.md`.

## Preconditions

- A target story exists, its epic is `broken-down`, and `${CLAUDE_PROJECT_DIR}/specs/architecture.md` is `ready`. If
  not, point back to `sdd-story-breakdown` / `sdd-tech-refine`.
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
  `${CLAUDE_PROJECT_DIR}/specs/architecture.md`. Ports & adapters — keep domain logic free of framework/I-O imports;
  adapters implement the ports. If you make a new significant, hard-to-reverse decision, record
  it as an ADR via `sdd-tech-refine` rather than burying it in code.
- **Stack:** stay within `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md`. No unsanctioned dependency without recording the
  decision.
- **Ubiquitous language:** name code and tests with the terms in `${CLAUDE_PROJECT_DIR}/specs/glossary.md`. If you need
  a new domain term, add it to the glossary.

## Architecture conformance — required

Every breakdown task (story) **must** be checked by the `architecture-guardian` subagent before
it is considered done. This is mandatory, not optional:

- Invoke the `architecture-guardian` subagent (the Agent/Task tool with
  `subagent_type: architecture-guardian`) on the story's diff, pointing it at the story, its
  parent epic, and the changed files.
- Treat every `blocker` it returns as remaining work: fix and **re-run the guardian** until it
  returns **PASS**. Resolve `warning`s or record explicitly why they are acceptable.
- Do not hand off, and do not let the story leave `in-progress`, while the guardian reports any
  blocker. The guardian's verdict on conformance is a gate, not advice.

## Keep traceability current

Each acceptance criterion maps to the acceptance test that covers it — fill the `_test:_`
reference in the story as tests are written.

## Brownfield / legacy code

When implementing against existing code that lacks test seams, adapt the loop — don't abandon it:

- **Pin before you change.** Write **characterization tests** that capture current behaviour as-is
  (even if it looks wrong) before modifying, so you have a safety net. This is also how an adopted
  domain dossier's *Current capabilities* get locked in.
- **Find a seam, then inject.** Introduce the smallest seam (parameterize, extract, wrap) to get
  the code under test; only then mock the owned collaborators as usual.
- **Add, don't rewrite.** Prefer **sprout** (a new method/class TDD'd in isolation) and **wrap**
  (wrap the existing call) over rewriting working code. Use the **strangler fig** pattern for larger
  replacements — grow the new path beside the old, then retire the old.
- **Respect the ratified baseline.** Changes still conform to the adopted architecture and the
  ratified domain dossiers (and any epic promoted from them) and are guardian-reviewed; new
  decisions become ADRs. If the code contradicts a ratified dossier, that is drift — surface it,
  don't silently "fix" the spec.

## Done

When every criterion's acceptance test (and its unit tests) is green **and** the
`architecture-guardian` has returned PASS on the change, hand off to `sdd-verify`. Leave
`status: in-progress` until verify confirms the Definition of Done — implement does not
self-certify.
