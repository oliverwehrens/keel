---
name: sdd-tech-refine
model: opus
description: Design and refine the architecture on the chosen stack until it clears the tech confidence gate, staying faithful to the product spec. Use after sdd-techstack and before sdd-breakdown. Produces and refines specs/architecture.md and uses the architecture-guardian subagent to review.
---

# sdd-tech-refine

Turn the accepted tech stack into an architecture that delivers the product spec, and refine
it until it clears the tech confidence gate. The product description stays the **source of
truth** — this decides *how*, never *what*.

## Preconditions

- `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md` exists and is `accepted`. If not, recommend `sdd-techstack` first.

## Procedure

1. **Draft the architecture.** If `${CLAUDE_PROJECT_DIR}/specs/architecture.md` doesn't exist, copy
   `${CLAUDE_PLUGIN_ROOT}/templates/architecture.md` to `${CLAUDE_PROJECT_DIR}/specs/architecture.md` and draft it from the
   reconciled epics + tech stack: principles, component boundaries, key decisions,
   cross-cutting concerns, implementation guidelines. Set `status: refining`.

2. **Refine like the product side.** Loop until the tech gate passes. For each open technical
   question, write **exactly three** viable options with pros and cons into *Open questions*,
   mark the one you recommend `(recommend)`, and wait for the user's `[x]` pick. Fold each
   pick in as `**Decision:** <choice> — <why>` and append a Changelog entry with the new
   confidence.

3. **Run the guardian.** Invoke the `architecture-guardian` subagent to review
   `${CLAUDE_PROJECT_DIR}/specs/architecture.md` for (a) fidelity to the product spec, (b) internal consistency,
   and (c) conformance to the tech stack. Resolve its blockers before advancing.

4. **Tech confidence gate** — set `status: ready` only when **all** hold:
   - Component boundaries and their interactions are explicit.
   - Every key decision is recorded as an ADR, traces to a product need, and respects the stack.
   - Each cross-cutting concern has a defined approach.
   - Implementation guidelines are concrete enough for the guardian to check code against.
   - No open technical question is unresolved (or each is deferred with owner + rationale).
   - Author confidence is 4–5 of 5 — never faked.
   - The `architecture-guardian` returns PASS (no blockers).

## Guardrails

- Never let the architecture redefine product scope or acceptance criteria. If it seems to
  need to, that's a product-side question — stop and flag it for `sdd-refine`/`sdd-reconcile`.
- One source of architectural truth: `${CLAUDE_PROJECT_DIR}/specs/architecture.md`. Don't scatter decisions across
  files.

## Next

When `ready`, recommend `sdd-breakdown` — stories can now carry concrete implementation notes
grounded in the stack and architecture.
