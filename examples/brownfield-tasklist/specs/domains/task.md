---
artifact: domain
name: task
origin: ratified         # was `inferred` (sdd-adopt), ratified by a human
scope: parsing, formatting, and completing a single task
source_paths:
  - src/task.js
glossary: ../glossary.md
created: 2026-06-17
updated: 2026-06-17
---

# Domain — task

> Current-state assessment of the **task** context, reverse-engineered from `src/task.js` and
> ratified. Descriptive — what this context *is* and currently *does*. To change any of this, do
> not edit here: promote the slice into a forward epic with `sdd-epic`.

## Purpose / responsibility

Owns the *Task* value and the pure operations on it: turning a *task line* into a Task and back,
and producing a completed copy. It holds no state and performs no I/O; the *store* context owns
persistence.

## Structure — what it *is*

### Domain model

- **Task** — plain immutable data `{ text, tags, done }` (gains an `id` only once stored by the
  *store* context). See glossary: Task, Tag, Done.
- **Task line** — the text encoding of a Task: `[ ]`/`[x]` box, free text, then `#tag` tokens.

### Key components

- `src/task.js` — `parseTask(line)`, `formatTask(task)`, `completeTask(task)`. Free functions over
  plain task objects.

### Interfaces

- **Exposes:** `parseTask`, `formatTask`, `completeTask`.
- **Consumes:** nothing (no dependencies on other contexts).

## Behaviour — what it currently *does*

### Key behaviours

- A task line must match `[ ]`/`[x]` + space + text; anything else is rejected with a thrown error.
- Tags are `#`-prefixed `[a-z0-9-]` tokens; they are stripped out of the task text.
- `completeTask` returns a **new** task with `done: true` — it never mutates its input.

### Current capabilities

- **Parse a task line into a Task**
  - [ ] **Given** the line `[ ] buy milk #home #errand` **when** parsed **then** I get
        `{ text: "buy milk", tags: ["home", "errand"], done: false }`.
  - [ ] **Given** a line starting with `[x]` **when** parsed **then** `done` is `true`.
  - [ ] **Given** a line that isn't a task (no `[ ]`/`[x]` box) **when** parsed **then** it throws.
- **Format a Task back into a line**
  - [ ] **Given** a parsed task **when** formatted **then** the original `[ ] text #tags` line is
        reproduced (round-trips).
- **Complete a Task**
  - [ ] **Given** an open task **when** completed **then** a new task with `done: true` is
        returned and the original is unchanged.

## Dependencies

- None upstream. **store** depends on this context (calls `completeTask`).

## Risks, unknowns & drift

- Plain objects mean a caller can construct a malformed task (e.g. missing `tags`); `formatTask`
  guards with `task.tags || []` but nothing else validates. Flagged, not fixed.

## Changelog

- 2026-06-17 — assessed from code by `sdd-adopt` (origin: inferred); ratified.
