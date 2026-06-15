---
id: EPIC-NNN
title: <short title>
status: draft        # draft | refining | ready | broken-down | in-progress | verified
origin: authored     # authored | inferred | ratified (brownfield, see docs/brownfield.md)
confidence: 1        # 1–5, see specs/README.md confidence gate
briefing: ../briefing.md
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# EPIC-NNN — <title>

## Summary

One paragraph: what this epic delivers and why it matters. A reader should grasp the
value without scrolling.

## Motivation

Which part of the briefing does this serve? Link the goal(s) and success metric(s) this
epic moves.

## Scope

### In scope

- …

### Out of scope

- …

## Capabilities / user stories

What the user can do when this is done. Prefer `As a <role>, I can <capability> so that
<outcome>.`

- …

## Acceptance criteria

Each criterion is a **Given/When/Then** scenario — observable and testable, and the seed of an
outer (acceptance) test at implementation. A reviewer must be able to mark it pass/fail.

- [ ] **Given** <context> **when** <action> **then** <observable outcome>

## Dependencies

Upstream (blocks us) and downstream (we block). Reference other epic IDs where relevant.

- …

## Risks

What could go wrong, and how likely / how bad.

- …

## Open questions

- [ ] …

## Changelog

Each `sdd-refine` pass appends an entry: date, what changed, resulting confidence.

- <YYYY-MM-DD> — created (confidence 1)
