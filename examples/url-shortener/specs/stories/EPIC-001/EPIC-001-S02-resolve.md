---
id: EPIC-001-S02
title: Resolve a short code
status: verified        # draft | ready | in-progress | verified
epic: ../../epics/EPIC-001-shorten-and-resolve.md
estimate: S
created: 2026-06-16
updated: 2026-06-16
---

# EPIC-001-S02 — Resolve a short code

## Goal

Given a short code, return the long URL it maps to, or an explicit "not found".

## Acceptance criteria

- [x] **Given** a known code **when** I resolve it **then** I get the exact original long URL
      — _test:_ `EPIC-001-S02: resolve returns the stored long URL for a known code`
- [x] **Given** an unknown code **when** I resolve it **then** I get null (not an error)
      — _test:_ `EPIC-001-S02: resolve returns null for an unknown code`

## Definition of Done

- [x] Every acceptance criterion has a passing test that names it (criterion ↔ test).
- [x] Implemented London-style: `LinkStore` is mocked (owned port).
- [x] Conforms to `architecture.md` and `tech-stack.md`.
- [x] New domain terms already in `glossary.md`.
- [x] architecture-guardian returns PASS on the change.
- [x] Full test suite green.

## Implementation notes

`Shortener.resolve(code)` returns `store.find(code)` or `null`.

## Dependencies

- EPIC-001-S01 (shares the `Shortener` domain object).

## Out of scope

- Shortening (EPIC-001-S01).
