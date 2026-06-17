# SDD conventions

The **spec-driven development (SDD)** skills generate and refine a project's living
specification under `specs/` in the working repo. This document is the shared rulebook —
IDs, status lifecycle, the confidence gate, the interaction loop, anchors, and model
choices — that every skill follows. Treat the generated specs as the source of truth that
implementation must conform to.

This file ships with the **`keel` plugin** (the `sdd-*` skills + the `architecture-guardian`
subagent). Templates ship in the plugin's `templates/`; the skills copy them into the
project's `specs/` as work proceeds.

## Pipeline

```
PRODUCT:  briefing ─► epics ─► refine ─► reconcile
TECH:     tech-stack ─► tech-refine
BUILD:    story-breakdown ─► implement ─► verify
```

The **product description** (`briefing.md` + reconciled epics) is the **source of truth**.
The tech phases decide *how* and must trace to it; they never redefine *what*.

1. **Briefing** (`sdd-briefing`) — capture the raw intent in `briefing.md`.
2. **Epic** (`sdd-epic`) — turn the briefing into one or more epics under `epics/`.
3. **Refine** (`sdd-refine`) — iterate an epic until it clears the confidence gate (`ready`).
4. **Reconcile** (`sdd-reconcile`) — check the `ready` epic against the briefing and its
   sibling epics, resolve inconsistencies, and mark it `reconciled` (final).
5. **Tech stack** (`sdd-techstack`) — choose the stack, each decision traced to a product
   need, in `tech-stack.md`.
6. **Tech refine** (`sdd-tech-refine`) — design the architecture on that stack and refine it
   to the tech gate in `architecture.md`; the `architecture-guardian` subagent reviews it.
7. **Breakdown** (`sdd-story-breakdown`) — split a `reconciled` epic into implementation stories,
   now grounded in the stack and architecture.
8. **Implement** (`sdd-implement`) — build each story test-first, London-school (mockist) TDD,
   outside-in, conforming to the architecture and stack.
9. **Verify** (`sdd-verify`) — independently check each story against its acceptance criteria
   and Definition of Done; mark it `verified`.

> The `architecture-guardian` subagent reviews technical work and implementation throughout
> (tech-refine, implement, verify), not just one phase.

**Brownfield?** A repo that already has code starts with **`sdd-adopt`** — reverse-engineer a
current-state assessment (per-context dossiers, stack, architecture, glossary) from the code and
ratify it, then author epics forward (promote a dossier slice) as you change things. `sdd-adopt`
assesses what *is*; it does not write a briefing or epics. See `docs/brownfield.md`.

**Iterating?** After the first loop you re-enter at the right phase. Before a change, **`sdd-impact`**
predicts the blast radius (product epics first); `sdd-verify` enforces non-regression; and
**`sdd-audit`** detects spec ↔ code drift. See `docs/iteration.md`.

## The interaction loop

Every refining phase (`sdd-refine`, `sdd-reconcile`, `sdd-techstack`, `sdd-tech-refine`,
`sdd-story-breakdown`) works the same way, and **all state lives in the artifacts — never only in
chat**:

1. **Run** the skill. It does what it can, then for any decision that is yours it writes the
   open question into the artifact as exactly three options (`[ ]`, pros/cons, one marked
   `(recommended)`) and hands back.
2. **Decide** — either answer inline in the same session, or mark your pick with `[x]` in the
   file (and add notes / edit freely).
3. **Continue** — say "continue", or just re-invoke the skill. Because the state is the files
   (status front-matter + which boxes are `[x]`), it re-reads, folds your picks in as
   `Decision:` records, and moves on. Re-running is safe and idempotent: it resumes from the
   artifact, not from memory, so a new session or lost context never loses progress.
4. **Repeat** until no open questions remain and the phase's gate / "done when" is met; then it
   advances the status and points to the next phase.

Routing still applies: a phase only decides what is genuinely its own (e.g. `sdd-story-breakdown`
decides slicing, but a product question goes back to `sdd-refine`).

## Layout

The plugin ships the rulebook, templates, guides, and the guardian:

```
<plugin root>/
  CONVENTIONS.md       ← you are here (the shared rulebook)
  templates/           ← canonical templates the skills copy into the project
    briefing.md  epic.md  story.md  tech-stack.md  architecture.md  glossary.md
    domain.md  domain-index.md   ← brownfield current-state dossiers (sdd-adopt)
  agents/architecture-guardian.md
  docs/                ← brownfield.md, iteration.md
```

The skills generate and maintain the spec in the project's working tree:

```
specs/
  briefing.md          ← the product brief (entry artifact, source of truth)
  epics/
    EPIC-001-<slug>.md
  tech-stack.md        ← chosen stack (after reconcile)
  architecture.md      ← architecture / guidelines (refined by sdd-tech-refine)
  glossary.md          ← ubiquitous language (shared term definitions)
  domains/             ← brownfield only: current-state assessment per bounded context (sdd-adopt)
    index.md           ← navigation map of the dossiers
    <context>.md       ← one dossier per bounded context
  stories/
    EPIC-001/
      EPIC-001-S01-<slug>.md
```

The `architecture-guardian` subagent ships at the plugin's `agents/architecture-guardian.md`
and reviews technical work against the product spec, the stack, and the architecture.

## ID scheme

- **Epics:** `EPIC-NNN` (zero-padded, monotonically increasing, never reused).
- **Stories:** `EPIC-NNN-SMM` (scoped to the parent epic).
- The slug is a short kebab-case summary, e.g. `EPIC-001-user-auth.md`.
- IDs are assigned once and are stable; renaming the slug is fine, the ID is not.

## Status lifecycle

Every epic and story carries a `status` in its front-matter:

| status         | meaning                                                        |
| -------------- | -------------------------------------------------------------- |
| `draft`        | created, not yet refined                                       |
| `refining`     | actively being iterated by `sdd-refine`                        |
| `ready`        | cleared the confidence gate; ready to reconcile                |
| `reconciled`   | consistent with briefing & sibling epics; final, ready to split |
| `broken-down`  | epic has been split into stories                               |
| `in-progress`  | implementation under way (`sdd-implement`)                     |
| `verified`     | passed `sdd-verify` against acceptance criteria + DoD          |

### Tech artifacts

- `tech-stack.md` — `draft` → `accepted` (`sdd-techstack`).
- `architecture.md` — `draft` → `refining` → `ready` (`sdd-tech-refine`'s tech gate),
  reviewed by the `architecture-guardian` subagent. The product spec always outranks it.

### Origin — authored vs inferred (brownfield)

Every spec artifact also carries an `origin` in front-matter, orthogonal to `status`:

- `authored` (default) — written intent-first (greenfield).
- `inferred` — reverse-engineered from existing code by `sdd-adopt`; a guess, not yet trusted.
- `ratified` — a human has confirmed an inferred artifact; it may now serve as source of truth.

Nothing downstream may rely on an `origin: inferred` artifact. See `docs/brownfield.md`.

## Confidence gate

`sdd-refine` does not mark an epic `ready` until **all** of these hold:

1. **Scope** — in-scope and out-of-scope are both explicit; no "TBD" in scope.
2. **Open questions** — every open question is either answered or explicitly deferred
   with an owner and rationale.
3. **Acceptance criteria** — each is observable and testable (a reviewer could mark it
   pass/fail without guessing).
4. **Risks & dependencies** — known risks and upstream/downstream dependencies are listed.
5. **Confidence score** — author records a self-assessed score of **4 or 5 of 5**:

   - 1 — vague idea, many unknowns
   - 2 — direction clear, scope fuzzy
   - 3 — scope clear, criteria/edge-cases still soft
   - 4 — criteria testable, minor open questions deferred deliberately
   - 5 — no material unknowns; ready to implement as written

Each refine pass appends a dated entry to the epic's **Changelog** so the reasoning
trail is preserved.

## Definition of Done & traceability

A story is `verified` only when `sdd-verify` confirms its **Definition of Done** (in the
story template) and full **traceability**:

- every acceptance criterion (Given/When/Then) has a test that names it, and
- every such test traces to exactly one criterion — criterion ↔ test ↔ code.

## Semantic anchors

The skills lean on a few fixed reference points; keep using these terms consistently:

- **Source of truth** — the product description (`briefing.md` + reconciled epics). Tech and
  code conform to it, never the reverse.
- **Definition of Ready** — the confidence gate above that lets an epic become `ready`.
- **Definition of Done** — the story checklist `sdd-verify` enforces.
- **Given/When/Then** — the form of every acceptance criterion; it becomes the outer test.
- **London-school (mockist) TDD** — outside-in, need-driven, mock only owned roles; how
  `sdd-implement` builds.
- **ADR** — immutable, numbered architecture decisions in `architecture.md`.
- **Ubiquitous language** — the `glossary.md` term registry.

## Model selection

Each skill pins a Claude model in its front-matter (`model:`) — a turn-scoped override sized to the
work. Judgment-heavy phases use the strongest model; structured generation and coding use a faster,
cheaper one. Set the session model with `/model` if you'd rather run one model throughout.

| Model    | Skills                                                        | Why                                                                |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| `opus`   | refine · reconcile · techstack · tech-refine · adopt · impact | Ambiguity, hard-to-reverse tradeoffs, cross-artifact judgment, inferring intent from code |
| `sonnet` | briefing · epic · story-breakdown · implement · verify · audit | Structured capture, drafting, decomposition, coding, checking      |

The **`architecture-guardian`** subagent is pinned to `opus` in its own front-matter, so its
conformance review is always done by the strongest model — even when `implement` / `verify` /
`audit` run on `sonnet`. That's the best cost/quality split: cheap generation, strong gate.

`haiku` isn't used as a primary model here (every phase carries judgment); `fable` is a viable
alternative for the heaviest reasoning skills if you prefer the newest model. Bump `story-breakdown` or
`implement` to `opus` for unusually gnarly epics or legacy code.
