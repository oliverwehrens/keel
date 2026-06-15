# Using SDD on a brownfield project

The SDD loop is greenfield by default — it writes spec, then code. A **brownfield** repo already
has code, and often little or no spec. `sdd-adopt` bridges the gap by deriving the spec *from the
code* and having you ratify it, after which the normal loop applies.

## The mental model

- **Greenfield: spec → code.** The spec is authored up front and is the source of truth.
- **Brownfield: code → spec → code.** You reverse-engineer a spec from reality (`sdd-adopt`),
  **ratify** it (a human confirms it's correct), and only then is it the source of truth.

Two ideas make this practical:

- **Just-in-time** — spec only the slice you're about to touch, not the whole repo.
- **Inferred vs ratified** — reverse-engineered artifacts carry `origin: inferred` until you sign
  off, which flips them to `origin: ratified`.

## Step by step

### 1. Adopt the slice you care about

Run `/sdd-adopt` and tell it the area you're working on. It surveys the code and emits, **for that
scope only**:

- `specs/tech-stack.md` — the real stack (from dependencies/build files)
- `specs/architecture.md` — components/boundaries as they are, with retroactive ADRs
- `specs/glossary.md` — domain terms found in the code
- `specs/briefing.md` — an inferred problem/goals (a guess)
- `specs/epics/…` — one "as-is" epic per existing capability, criteria as Given/When/Then

Everything is marked `origin: inferred`.

### 2. Ratify

Inferred is a guess. Go through each artifact and confirm or correct it. On sign-off the skill
flips `origin: inferred → ratified` and sets the normal status (as-is epics → `reconciled`,
tech-stack → `accepted`, architecture → `ready`). Until then, nothing downstream may rely on it.

### 3. (Optional) Pin the baseline with tests

Adopted epics describe behaviour that exists but usually has no tests. To trust them, run
`/sdd-implement` in **brownfield mode**: it writes **characterization tests** that lock in current
behaviour, then `/sdd-verify` marks the epic `verified`. Do this for the parts you're about to
change.

### 4. Change as iteration

Now you're in the normal loop. To modify or extend behaviour:

```
sdd-refine (amend the ratified epic) → sdd-reconcile → sdd-breakdown
  → sdd-implement (brownfield mode) → sdd-verify
```

Brownfield implementation differs in *tactics* — characterization tests, seams, sprout/wrap, and
the strangler-fig pattern — but the *gates* (guardian, Definition of Done, traceability,
source-of-truth) are identical.

## Tips

- **Don't boil the ocean.** Re-run `sdd-adopt` per area as you reach it; let the spec grow with
  your work.
- **Descriptive before prescriptive.** Adopt records what *is*. Wishlist changes come after, as
  normal to-be edits — keep the two separate.
- **Trust nothing unratified.** `origin: inferred` is a visible "not yet true" flag.
- **Drift is expected.** Where the inferred spec and the code disagree, surface it during
  ratification rather than papering over it.

## How it maps to the loop

| Greenfield                         | Brownfield                                             |
| ---------------------------------- | ----------------------------------------------------- |
| `sdd-briefing` authors intent      | `sdd-adopt` infers intent from code, then you ratify  |
| `sdd-techstack` decides the stack  | `sdd-adopt` documents the existing stack              |
| `sdd-tech-refine` designs the arch | `sdd-adopt` records arch-as-is (retroactive ADRs)     |
| `sdd-implement` builds from zero   | `sdd-implement` (brownfield) pins, then sprouts/wraps |
| everything else is the same        | everything else is the same                           |
