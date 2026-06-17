---
artifact: tech-stack
status: accepted         # draft | accepted
origin: ratified         # was `inferred` (sdd-adopt), ratified by a human
created: 2026-06-17
updated: 2026-06-17
---

# Tech stack

> Reverse-engineered from the code by `sdd-adopt`, then ratified. **Descriptive** — this records
> the stack that *is*, not a stack we chose.

## Summary

A zero-dependency Node.js ES-module library tested with the built-in `node:test` runner. No
build step, no framework — read straight off `package.json` and the source.

## Observed stack

| Area        | Observed                       | Evidence                                  |
| ----------- | ------------------------------ | ----------------------------------------- |
| Language    | JavaScript (ES modules)        | `"type": "module"`, `import`/`export`     |
| Runtime     | Node.js (private package)      | `package.json`, `#private` class fields   |
| Test runner | `node:test` + `node:assert`    | `"test": "node --test"`, test imports     |
| Dependencies| none                           | no `dependencies` / `devDependencies`     |
| Storage     | in-memory `Map` (process-local)| `TaskStore.#tasks = new Map()`            |

## Open questions

- None — the stack is small and unambiguous.
