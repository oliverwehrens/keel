---
artifact: architecture
status: ready            # draft | refining | ready
origin: ratified         # was `inferred` (sdd-adopt), ratified by a human
confidence: 4
tech_stack: ./tech-stack.md
created: 2026-06-17
updated: 2026-06-17
---

# Architecture

> Reverse-engineered from the code by `sdd-adopt`, then ratified. Records the structure as it
> **is**, with significant existing choices captured as **retroactive ADRs** (`accepted`). The
> per-context detail lives in `domains/`.

## Component boundaries

Two small modules, mapping one-to-one to the two bounded contexts:

- `src/task.js` — the **task** context: pure parse / format / complete functions over a plain task
  object. No state, no I/O.
- `src/task-store.js` — the **store** context: an in-memory collection keyed by a sequential id.
  Depends on `task` (calls `completeTask`); `task` does not depend on it.

Dependency direction: `store → task` (one way).

## Key decisions (ADRs)

### ADR-001 — In-memory, process-local storage

- **Status:** accepted (retroactive — inferred from code)
- **Context:** the store holds tasks in a `Map` and assigns ids from an in-process counter; there
  is no persistence layer.
- **Decision:** keep state in memory, scoped to the process.
- **Consequences:** trivial and dependency-free; all data is lost on restart and ids are not
  stable across runs. Replacing this later would be a forward change (promote `store` to an epic).

### ADR-002 — Plain task objects, not a class

- **Status:** accepted (retroactive — inferred from code)
- **Context:** `task.js` works on plain `{ text, tags, done }` objects and returns new objects
  (e.g. `completeTask`) rather than mutating.
- **Decision:** model a task as immutable plain data; behaviour lives in free functions.
- **Consequences:** easy to test and copy; no encapsulation of invariants (any caller can build a
  malformed task object).

## Cross-cutting concerns

- **Errors:** `parseTask` throws on a non-task line; lookups for an unknown id return `null` (a
  value, not an exception).
- **Testing:** `node:test`; the existing suite is effectively characterization (it pins current
  behaviour).

## Open questions

- [ ] Are `task` and `store` the right context boundary, or should "tagging" be its own context?
      Flagged at ratification; left as-is for now.

## Changelog

- 2026-06-17 — inferred from code by `sdd-adopt`; ratified (confidence 4).
