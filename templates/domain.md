---
artifact: domain
name: <context-name>
origin: inferred         # inferred | ratified (brownfield)
scope: <which code this context covers>
source_paths:
  - <path/to/code>
glossary: ../glossary.md
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# Domain — <name>

> A current-state assessment of one bounded context: what it **is** and what it currently
> **does**, reverse-engineered from the code. Descriptive, not prescriptive — no intended change
> lives here. Trust nothing while `origin: inferred`; a human ratifies it (see
> `docs/brownfield.md`). To change behaviour, **promote** a slice into a forward-looking epic with
> `sdd-epic`, seeding its acceptance criteria from *Current capabilities* below.

## Purpose / responsibility

One paragraph: what this context owns, and the boundary that separates it from its neighbours.

## Structure — what it *is*

### Domain model

Key entities / aggregates / value objects and their relationships. Reference terms from the
glossary; do not redefine them here.

- …

### Key components

The modules / services / classes that make up this context, each with its source path so an agent
can jump straight to the code.

- `<path/to/component>` — responsibility

### Interfaces

The contracts at the boundary: API endpoints, events, and public functions this context exposes,
plus the ones it consumes from other contexts.

- **Exposes:** …
- **Consumes:** …

## Behaviour — what it currently *does*

### Key behaviours

The important rules, flows, and invariants as they exist today (descriptive).

- …

### Current capabilities

The features this context provides **today**. Each capability records current behaviour as a
Given/When/Then scenario so it can seed a characterization test now, and a forward-looking epic
later (via `sdd-epic`). These describe what *is*, not what we wish.

- **<capability>**
  - [ ] **Given** <context> **when** <action> **then** <observed current outcome>

## Dependencies

Which other contexts this one relies on, and which rely on it. Reference other domain names.

- …

## Risks, unknowns & drift

Behaviour that couldn't be inferred, code with no obvious purpose, and anything inconsistent or
risky. Do not invent intent to fill gaps — mark it "needs ratification".

- …

## Changelog

- <YYYY-MM-DD> — assessed from code (origin: inferred)
