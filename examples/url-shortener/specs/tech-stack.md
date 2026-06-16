---
artifact: tech-stack
status: accepted         # draft | accepted
origin: authored
source_of_truth: ./briefing.md
created: 2026-06-16
updated: 2026-06-16
---

# Tech stack

> Every choice traces to a product need. The product spec governs.

## Summary

A zero-dependency Node.js library tested with the Node built-in test runner — the smallest
stack that satisfies "library-first, zero runtime dependencies".

## Decisions

| Area                  | Choice                     | Serves (product need)                          | Alternatives considered            |
| --------------------- | -------------------------- | ---------------------------------------------- | ---------------------------------- |
| Language              | JavaScript (ES modules)    | Library-first, ubiquitous, no build step       | TypeScript (adds build for a demo) |
| Runtime               | Node.js ≥ 20               | `node:test` + `mock` built in                  | Deno, Bun                          |
| Test runner           | `node:test` + `node:assert`| Zero runtime/dev deps (constraint)             | Vitest, Jest (extra deps)          |
| Storage               | In-memory `Map` behind a port | Non-goal: no cross-process persistence      | SQLite, Redis (out of scope)       |

## Non-functional drivers

- "Zero runtime dependencies preferred" → built-in test runner, no framework.
- "Usable as a small module" → ESM library, no service.

## Open questions

- None.
