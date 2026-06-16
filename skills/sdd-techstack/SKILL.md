---
name: sdd-techstack
model: opus
description: Choose the project tech stack after product refinement is done, recording each choice traced to a product need in specs/tech-stack.md. Use once epics are reconciled and before any architecture or breakdown — to decide languages, frameworks, datastores, and infra.
---

# sdd-techstack

Decide the tech stack and record it in `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md`. The product description
(`${CLAUDE_PROJECT_DIR}/specs/briefing.md` + reconciled epics) is the **source of truth** — every technical choice
must serve a stated product need and may not redefine the product.

## Preconditions

- At least one epic is `reconciled`. If product refinement isn't done, recommend finishing
  `sdd-reconcile` first. (Warn once, then proceed if the user insists.)

## Procedure

1. **Extract the drivers.** Read the briefing and reconciled epics; list the non-functional
   forces that should drive the stack: scale, latency, data shape, compliance, integrations,
   team skills, time-to-market. A choice with no driver is a smell.

2. **Propose the stack area by area** (language, framework, data storage, interface/API
   style, infra/hosting, testing). For each, give a recommended choice plus 1–2 alternatives,
   each tied to the driver it serves. Present this before writing anything.

3. **Pose genuine forks as choices.** Where a decision is consequential and not clear-cut,
   use the three-option format from `sdd-refine` — exactly three viable options, pros and
   cons, the one you recommend marked `(recommended)` — and let the user pick with `[x]`. Don't
   railroad a single answer.

4. **Record it.** Copy `${CLAUDE_PLUGIN_ROOT}/templates/tech-stack.md` to `${CLAUDE_PROJECT_DIR}/specs/tech-stack.md` and fill the
   decisions table, including the product need each choice serves and the alternatives
   considered. Park anything unresolved under *Open questions*.

5. **Set status.** When the user accepts the stack, set `status: accepted` and bump `updated`.

## Guardrails

- Trace, don't decorate: every row must name the product need it serves.
- Don't invent product requirements to justify a stack choice. If a choice would need a
  requirement the product spec doesn't state, flag it back to the product side — don't
  fabricate it here.

## Next

Recommend `sdd-tech-refine` to design the architecture on this stack and refine it to the
tech confidence gate.
