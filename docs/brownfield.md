# Using SDD on a brownfield project

The SDD loop is greenfield by default — it writes spec, then code. A **brownfield** repo already
has code, and often little or no spec. `sdd-adopt` bridges the gap by deriving the spec *from the
code* and having you ratify it, after which the normal loop applies.

## The mental model

- **Greenfield: spec → code.** The spec is authored up front and is the source of truth.
- **Brownfield: code → spec → code.** You reverse-engineer a spec from reality (`sdd-adopt`),
  **ratify** it (a human confirms it's correct), and only then is it the source of truth.

Three ideas make this practical:

- **Just-in-time** — spec only the slice you're about to touch, not the whole repo.
- **Inferred vs ratified** — reverse-engineered artifacts carry `origin: inferred` until you sign
  off, which flips them to `origin: ratified`.
- **Assess vs specify** — adopt is *backward-looking*: it records what the code **is** in
  per-context **domain dossiers**. It does **not** write a briefing or epics — those are
  *forward-looking* and are authored later, when you actually decide to change something. An epic
  is a unit of intended change; manufacturing one from existing code is a category error, so adopt
  doesn't.

## Step by step

### 1. Adopt the slice you care about

Run `/sdd-adopt` and tell it the area you're working on. It surveys the code and emits, **for that
scope only**:

- `specs/tech-stack.md` — the real stack (from dependencies/build files)
- `specs/architecture.md` — system-wide components/boundaries as they are, with retroactive ADRs
- `specs/glossary.md` — domain terms found in the code (ubiquitous language)
- `specs/domains/index.md` — a navigation map of the dossiers in scope
- `specs/domains/<name>.md` — one **dossier per bounded context**: its structure (domain model,
  key components with paths, interfaces) and its current behaviour (key behaviours, plus *Current
  capabilities* — the features it provides today, each with Given/When/Then describing **current**
  behaviour)

No briefing and no epics are written — those are forward-looking. Everything emitted is marked
`origin: inferred`.

### 2. Ratify

Inferred is a guess. Go through each artifact and confirm or correct it. On sign-off the skill
flips `origin: inferred → ratified` (each domain dossier → `ratified`, `domains/index.md` →
`ratified` once all its dossiers are, tech-stack → `accepted`, architecture → `ready`). Until
then, nothing downstream may rely on it.

### 3. (Optional) Pin the baseline with tests

A dossier's *Current capabilities* describe behaviour that exists but usually has no tests. To
trust them, run `/sdd-implement` in **brownfield mode**: it writes **characterization tests** that
lock in the current behaviour recorded in the dossier. Do this for the parts you're about to
change.

### 4. Change as iteration — promote, then go forward

A dossier is backward-looking; changing behaviour is forward work, so you **author it forward**.
Use `sdd-epic` in **promotion mode** to turn the slice you're changing into a real epic — seeding
its acceptance criteria from the dossier's *Current capabilities* and authoring its intent fresh
(`sdd-briefing` first if no briefing exists). Then you're in the normal loop:

```
sdd-epic (promote a dossier slice → forward epic) → sdd-refine → sdd-reconcile
  → sdd-story-breakdown → sdd-implement (brownfield mode) → sdd-verify
```

Brownfield implementation differs in *tactics* — characterization tests, seams, sprout/wrap, and
the strangler-fig pattern — but the *gates* (guardian, Definition of Done, traceability,
source-of-truth) are identical.

## Tips

- **Don't boil the ocean.** Re-run `sdd-adopt` per area as you reach it; let the spec grow with
  your work.
- **Descriptive before prescriptive.** Adopt records what *is* in dossiers; it never writes a
  briefing or an epic. Forward changes come after, authored as epics promoted from a dossier —
  keep "assess" and "specify" separate.
- **Trust nothing unratified.** `origin: inferred` is a visible "not yet true" flag.
- **Drift is expected.** Where the inferred spec and the code disagree, surface it during
  ratification rather than papering over it.

## How it maps to the loop

| Greenfield                         | Brownfield                                                       |
| ---------------------------------- | --------------------------------------------------------------- |
| `sdd-briefing` authors intent      | no intent inferred — authored fresh on the first forward change |
| `sdd-epic` writes forward epics    | `sdd-adopt` writes current-state dossiers; `sdd-epic` promotes a slice to a forward epic when you change it |
| `sdd-techstack` decides the stack  | `sdd-adopt` documents the existing stack                        |
| `sdd-tech-refine` designs the arch | `sdd-adopt` records arch-as-is (retroactive ADRs)               |
| `sdd-implement` builds from zero   | `sdd-implement` (brownfield) pins, then sprouts/wraps           |
| everything else is the same        | everything else is the same                                     |
