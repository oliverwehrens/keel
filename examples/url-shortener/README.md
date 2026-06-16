# Worked example — the SDD loop end-to-end

A small, real run of the spec-driven development pipeline on a tiny product: **Snip**, an
in-memory URL shortener. Everything here was produced by walking the `sdd-*` phases in order,
with this folder as the project root.

Run the tests:

```bash
cd examples/url-shortener
npm test        # node --test  → 4 passing
```

## What each phase produced

| Phase | Skill | Artifact | Notes |
| ----- | ----- | -------- | ----- |
| Briefing | `sdd-briefing` | `specs/briefing.md` | Problem, 2 goals, explicit non-goals, success metric |
| Epic | `sdd-epic` | `specs/epics/EPIC-001-shorten-and-resolve.md` | Criteria as Given/When/Then |
| Refine | `sdd-refine` | EPIC-001 → `ready`, confidence 5 | Resolved the code-generation question as a 3-option decision |
| Reconcile | `sdd-reconcile` | EPIC-001 → `reconciled` | Traces to briefing goals; terms match glossary |
| Tech stack | `sdd-techstack` | `specs/tech-stack.md` | Node + `node:test`, zero deps — each choice traced to a need |
| Tech refine | `sdd-tech-refine` | `specs/architecture.md` | Ports & adapters; ADR-001, ADR-002; guardian PASS |
| Breakdown | `sdd-story-breakdown` | `specs/stories/EPIC-001/*.md` | S01 shorten, S02 resolve; DoD + traceability |
| Implement | `sdd-implement` | `src/`, `test/` | London-school TDD — ports mocked; one wired acceptance test |
| Verify | `sdd-verify` | this run | Suite green, criteria ↔ tests traced, guardian PASS |

## The gates that fired

- **Confidence gate** (refine): the code-generation open question was posed as three options
  (random base-36 *(recommended)* / sequential counter / URL hash); **A** was chosen and recorded
  as a `Decision:` in the epic changelog before the epic could reach `ready`.
- **Source of truth**: every tech-stack row and ADR traces to a product need; nothing invented.
- **London TDD**: `Shortener` is tested with `CodeGenerator` and `LinkStore` **mocked** (owned
  ports); the acceptance test wires the real adapters end-to-end.
- **Architecture guardian** (a subagent): reviewed the diff and returned **PASS** — pure domain
  with no I/O imports, one port per adapter, ADR-001/ADR-002 honored, glossary terms used.
- **Verify**: all 4 tests pass; each acceptance criterion maps to a test that names it
  (criterion ↔ test ↔ code); EPIC-001 rolls up to `verified`.

## Traceability at a glance

| Acceptance criterion (EPIC-001) | Test | Code |
| ------------------------------- | ---- | ---- |
| Shorten → code + link stored | `EPIC-001-S01: shorten generates a code and stores the mapping` | `Shortener.shorten` |
| Resolve known code → original | `EPIC-001-S02: resolve returns the stored long URL for a known code` | `Shortener.resolve` |
| Resolve unknown code → null | `EPIC-001-S02: resolve returns null for an unknown code` | `Shortener.resolve` + `InMemoryLinkStore.find` |
| Round-trip (success metric) | `EPIC-001: a shortened URL resolves back to the exact original` | all adapters |
