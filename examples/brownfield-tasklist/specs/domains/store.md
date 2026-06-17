---
artifact: domain
name: store
origin: ratified         # was `inferred` (sdd-adopt), ratified by a human
scope: in-memory storage and retrieval of tasks
source_paths:
  - src/task-store.js
glossary: ../glossary.md
created: 2026-06-17
updated: 2026-06-17
---

# Domain — store

> Current-state assessment of the **store** context, reverse-engineered from `src/task-store.js`
> and ratified. Descriptive — what this context *is* and currently *does*. To change any of this,
> promote the slice into a forward epic with `sdd-epic`.

## Purpose / responsibility

Owns the in-memory collection of tasks: assigning ids, storing, retrieving, filtering by tag, and
marking a stored task done. It delegates completion logic to the *task* context and adds nothing
about how a task is parsed or formatted.

## Structure — what it *is*

### Domain model

- **Store** — a `Map<id, Task>` plus a monotonically increasing id counter. Ids start at `1`.
- Stored tasks are the *task* context's Task, with an added numeric `id`.

### Key components

- `src/task-store.js` — `class TaskStore` with `add`, `get`, `all`, `withTag`, `complete`. State
  is held in private fields (`#tasks`, `#nextId`).

### Interfaces

- **Exposes:** `add(task) → id`, `get(id) → task|null`, `all() → task[]`,
  `withTag(tag) → task[]`, `complete(id) → task|null`.
- **Consumes:** `completeTask` from the **task** context.

## Behaviour — what it currently *does*

### Key behaviours

- Ids are sequential per store instance, assigned on `add`; they are **not** stable across runs
  (process-local, no persistence — see architecture ADR-001).
- Misses are values, not errors: `get`/`complete` of an unknown id return `null`.
- `complete` replaces the stored task with the completed copy from `completeTask`.

### Current capabilities

- **Add and retrieve a task**
  - [ ] **Given** an empty store **when** I `add` a task **then** I get id `1` and `get(1)`
        returns that task.
  - [ ] **Given** any store **when** I `get` an id that was never issued **then** I get `null`.
- **Filter tasks by tag**
  - [ ] **Given** tasks tagged `#home` and `#work` **when** I call `withTag("home")` **then** I
        get only the `#home` task.
- **Complete a stored task**
  - [ ] **Given** a stored open task **when** I `complete` its id **then** `get` shows it `done`.
  - [ ] **Given** any store **when** I `complete` an unknown id **then** I get `null`.

## Dependencies

- Depends on the **task** context (`completeTask`). Nothing depends on **store** within this repo.

## Risks, unknowns & drift

- No persistence: all tasks are lost on restart (ADR-001). Making storage durable is the most
  likely first forward change — it would be authored as an epic promoted from this dossier.

## Changelog

- 2026-06-17 — assessed from code by `sdd-adopt` (origin: inferred); ratified.
