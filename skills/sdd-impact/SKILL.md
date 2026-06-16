---
name: sdd-impact
model: opus
description: Predict the blast radius of a proposed change before you make it — which product epics, tech decisions, stories, tests, and code it would affect. Use before amending an epic, refactoring, changing an ADR or tech-stack choice, or renaming a glossary term, to size, sequence, and de-risk the change.
---

# sdd-impact

Forward-looking impact analysis: given a proposed change, traverse the dependency graph already
encoded in the artifacts and report what it would disturb — **product epics first**, then tech, then
code/tests. Read-only; it predicts ripples, it does not make them. It is the predictive complement
to `sdd-reconcile` (cross-epic consistency) and `sdd-audit` (current-state drift).

## Input

The change target — an epic, a story, an ADR / architecture component, a tech-stack choice, a
glossary term, or a code module — plus a one-line description of the intended change.

## Traverse in three directions

State lives in the artifacts; follow the links both ways (what depends on the target, and what the
target depends on):

- **Across (product)** — sibling epics that share a capability, depend on the target, reference the
  same glossary term, or whose acceptance criteria would overlap or contradict after the change.
- **Up (to product)** — for a tech/code change, which **product epics** does the touched code serve
  (via criterion ↔ test ↔ code)? A change that touches an epic's criteria is a product impact even
  if it was filed as a "pure refactor".
- **Down (to build)** — the ADRs, architecture components, stories, tests, and files that implement
  the target.

## Output — impact report

Lead with the product layer; it is the source of truth.

1. **Product epics affected** — direct and transitive. For each: the epic, *why* it's impacted
   (shared capability / dependency / criterion conflict / shared briefing goal / glossary term), and
   whether its acceptance criteria are threatened. Flag any **contradiction between two product
   promises** as the highest-severity finding.
2. **Briefing goals/non-goals implicated** — and which other epics share them.
3. **Tech impact** — ADRs/components affected, and whether an architecture change
   (`sdd-tech-refine`) is implied.
4. **Build impact** — stories to re-break-down / re-implement, and the tests/epics **likely to
   regress** (feed this to `sdd-verify`'s non-regression check).

Then a **plan**: recommended sequencing, the phases to re-enter (see `${CLAUDE_PLUGIN_ROOT}/docs/iteration.md`), and a
**size verdict** — *contained* (a small epic) vs *sprawling* (split it).

## Guardrails

- Read-only: analyse, never change. Resolution goes through the owning phase and its gates.
- It's an **estimate**. Where traceability is incomplete (common in brownfield), say so and mark
  low-confidence areas rather than implying certainty; supplement spec links with code search.
- Product impact outranks the rest: surface epic-level contradictions before convenience.
