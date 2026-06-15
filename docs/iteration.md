# Iterating after the first loop

The SDD loop reads like a line — briefing → … → verify — but after the first pass you don't start
over. You **re-enter at the right phase** for the kind of change you're making, and the gates do the
rest. This guide is the "where do I start?" map.

## Principle: re-enter, don't restart

The product spec already exists and is the source of truth. A change is a **delta** to it, not a
fresh beginning. Pick the entry point by the *kind* of change; the downstream phases and gates are
unchanged.

## Where to start

| You want to…                              | Start at                      | Then                                                              |
| ----------------------------------------- | ----------------------------- | ---------------------------------------------------------------- |
| Add a feature that fits the vision        | `sdd-epic` (new epic)         | refine → reconcile → (arch check) → breakdown → implement → verify |
| Change an existing feature                | `sdd-refine` (amend the epic) | reconcile → breakdown the changed stories → implement → verify    |
| Change goals / direction                  | `sdd-briefing`                | revisit affected epics (reconcile flags drift)                    |
| Refactor or upgrade (no behaviour change) | `sdd-tech-refine`             | new ADR → implement → verify (behaviour unchanged)                |
| Fix a bug                                 | `sdd-implement`               | failing test against the existing criterion → verify              |
| Onboard / spec existing code              | `sdd-adopt`                   | ratify → then iterate as above (see `docs/brownfield.md`)         |

## Two things iteration adds

- **Reconcile against what exists.** When you add or change an epic, `sdd-reconcile` checks it
  against the *existing* epics (overlap, contradictions, terms) and the briefing (freshness), so a
  new feature can't silently contradict shipped ones.
- **Non-regression at verify.** `sdd-verify` confirms not just the new work but that every
  previously `verified` epic **stays** verified — the suite is green and no prior criterion now
  fails. Adding a feature can't quietly break an old one.

## Keep it honest

- **Small changes are small epics.** Scale the ceremony down, not the gates away — a tiny epic still
  passes the confidence gate, it just does so in minutes.
- **Check for drift first.** If the area has changed outside the loop, run `sdd-audit` before
  iterating so you're amending a spec that still matches reality.
- **Impact before change.** Run `sdd-impact` to predict the blast radius — the product epics, tech,
  and tests a change would disturb — so you size and sequence it before you amend.
