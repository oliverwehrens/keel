# Worked example — adopting a brownfield repo

A small, real run of **`sdd-adopt`** on a tiny *pre-existing* library: **tasklist**, an in-memory
task store written **without any spec**. This is the brownfield counterpart to the greenfield
[`url-shortener`](../url-shortener/) example — here the code came first and the spec is
reverse-engineered from it.

Run the tests:

```bash
cd examples/brownfield-tasklist
npm test        # node --test  → 10 passing
```

## The code that already existed

- `src/task.js` — parse / format / complete a single task (pure, stateless).
- `src/task-store.js` — an in-memory `TaskStore` keyed by a sequential id.
- `test/` — the existing suite (acts as characterization tests).

No `specs/` existed. Everything under `specs/` below was produced by `sdd-adopt`.

## What `sdd-adopt` produced

Adopt is **backward-looking**: it records *what is*, so it writes **no briefing and no epics**
(those are forward-looking). It emitted, all `origin: inferred` first, then ratified:

| Artifact | What it captures |
| -------- | ---------------- |
| `specs/tech-stack.md` | the observed stack (Node ESM, `node:test`, zero deps) — descriptive |
| `specs/architecture.md` | the two modules as they are, with **retroactive ADRs** (in-memory storage; plain task objects) |
| `specs/glossary.md` | the ubiquitous language found in code (Task, Tag, Done, Store) |
| `specs/domains/index.md` | a navigation map of the bounded contexts |
| `specs/domains/task.md` | dossier: the **task** context — structure + current behaviour |
| `specs/domains/store.md` | dossier: the **store** context — structure + current behaviour |

Each **dossier** has a *Structure* half (domain model, key components with paths, interfaces) and
a *Behaviour* half — including **Current capabilities**, the features that exist today written as
Given/When/Then. Those Given/When/Thens are exactly what the tests in `test/` pin.

## The ratification gate

Inferred is a guess. A human walked each artifact and confirmed or corrected it, which flipped
`origin: inferred → ratified` (and set `tech-stack` → `accepted`, `architecture` → `ready`). The
one unresolved point — *is "tagging" its own context?* — is left as an explicit open question in
`architecture.md`, not papered over. Until ratification, nothing downstream may rely on it.

## What you'd do next

- **Trust the baseline:** the existing tests already serve as **characterization tests** pinning
  each dossier's *Current capabilities*.
- **Change behaviour (forward):** e.g. to make storage durable, you would **promote** the `store`
  dossier slice into a forward-looking epic with `sdd-epic` — seeding its acceptance criteria from
  the dossier's *Current capabilities* and authoring the intent fresh — then refine → reconcile →
  story-breakdown → implement (brownfield) → verify.

See [`docs/brownfield.md`](../../docs/brownfield.md) for the full how-to.
