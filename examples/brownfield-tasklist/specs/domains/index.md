---
artifact: domain-index
origin: ratified         # was `inferred`; flipped once both dossiers were ratified
created: 2026-06-17
updated: 2026-06-17
---

# Domain index

> Navigation map for this repo's bounded contexts, produced by `sdd-adopt`. Load this to orient,
> then open only the dossier you need. Each dossier is a current-state assessment.

| Context | Description                                                  | Dossier               | Origin   | Primary source paths |
| ------- | ------------------------------------------------------------ | --------------------- | -------- | -------------------- |
| task    | Parse, format, and complete a single task (pure, stateless). | [`task.md`](task.md)   | ratified | `src/task.js`        |
| store   | Hold tasks in memory, keyed by id; add / get / filter / complete. | [`store.md`](store.md) | ratified | `src/task-store.js`  |
