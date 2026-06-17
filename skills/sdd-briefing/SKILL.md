---
name: sdd-briefing
model: sonnet
description: Start or refine the product briefing (specs/briefing.md) — the entry artifact of spec-driven development. Use when the user wants to capture a new idea, write a briefing, kick off a project, or sharpen the problem/goals/constraints before any epics exist.
---

# sdd-briefing

Capture the raw intent in `${CLAUDE_PROJECT_DIR}/specs/briefing.md`. This is the seed every epic grows from.
Read `${CLAUDE_PLUGIN_ROOT}/CONVENTIONS.md` first for conventions.

## When to use

- No `${CLAUDE_PROJECT_DIR}/specs/briefing.md` exists yet and the user is describing a new product/initiative.
- A briefing exists and the user wants to revise the problem, goals, or constraints.

## Procedure

1. **Locate the artifact.** If `${CLAUDE_PROJECT_DIR}/specs/briefing.md` exists, read it and treat this as a
   refinement. Otherwise copy `${CLAUDE_PLUGIN_ROOT}/templates/briefing.md` to `${CLAUDE_PROJECT_DIR}/specs/briefing.md`.

2. **Interview, don't dictate.** Work section by section (Problem → Users → Goals →
   Non-goals → Constraints → Success metrics → Assumptions & risks → Open questions). Ask one
   focused batch of questions at a time. Pull as much as possible from what the user already
   said before asking. Probe the problem space, not just the solution:
   - **Job to be done / cost of inaction** — what is the user really trying to get done, and
     what happens if we build nothing?
   - **Current alternative** — what do people do today, and where does it fall short? (That
     workaround is the real bar to beat.)

3. **Press on the weak spots.** A briefing is only useful if it is honest about:
   - **Non-goals** — get at least one explicit non-goal; vague scope is the #1 failure.
   - **Success metrics** — outcomes, not features, each with a **baseline → target** so it's
     measurable ("checkout completes in <30s, today 90s" — not "fast checkout").
   - **Constraints** — deadlines, platforms, compliance, systems we must integrate with.
   - **Assumptions & risks** — surface at least one load-bearing assumption (something believed
     but unvalidated) and the risk if it's false. These are what to de-risk first; nothing
     downstream captures them.

4. **Record unknowns, don't invent answers.** Anything genuinely undecided goes under
   *Open questions* rather than being guessed. Keep the line between an **assumption** (we're
   proceeding as if true) and an **open question** (unresolved, may block) clean.

5. **Write it back.** Keep the briefing short (one screen if possible). It is allowed to
   be incomplete early — but every filled section must be true.

## Done when

- `${CLAUDE_PROJECT_DIR}/specs/briefing.md` has a real Problem (with the current alternative), at
  least one Goal, one Non-goal, and one Success metric with a baseline → target.
- At least one load-bearing **assumption or risk** is named.
- Remaining unknowns are parked under *Open questions*, not faked — and it still fits on roughly
  one screen. Depth lives in the questions you asked, not the length of the document.

## Next

Suggest running `sdd-epic` to turn the briefing into epics.
