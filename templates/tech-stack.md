---
artifact: tech-stack
status: draft            # draft | accepted
origin: authored         # authored | inferred | ratified (brownfield)
source_of_truth: ./briefing.md   # the product spec governs; tech conforms, never redefines
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# Tech stack

> Technical choices for the product. Every choice must trace to a product need (a goal,
> constraint, or success metric in the briefing / epics). The product description is the
> source of truth; nothing here may redefine it.

## Summary

One paragraph: the shape of the stack and the single biggest reason for it.

## Decisions

For each area: the choice, the product need it serves, and the alternatives considered.

| Area                  | Choice | Serves (product need) | Alternatives considered |
| --------------------- | ------ | --------------------- | ----------------------- |
| Language(s)           |        |                       |                         |
| Framework(s)          |        |                       |                         |
| Data storage          |        |                       |                         |
| Interface / API style |        |                       |                         |
| Infra / hosting       |        |                       |                         |
| Testing               |        |                       |                         |

## Non-functional drivers

The product constraints / success metrics that shaped the stack (scale, latency,
compliance, team skills, time-to-market).

- …

## Open questions

Unresolved technical choices. `sdd-tech-refine` resolves these as three-option decisions.

- …
