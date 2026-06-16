---
id: EPIC-001-S01
title: Shorten a long URL
status: verified        # draft | ready | in-progress | verified
epic: ../../epics/EPIC-001-shorten-and-resolve.md
estimate: S
created: 2026-06-16
updated: 2026-06-16
---

# EPIC-001-S01 — Shorten a long URL

## Goal

Given a long URL, generate a short code and store the code→URL link.

## Acceptance criteria

- [x] **Given** a long URL **when** I shorten it **then** I get the generated short code and
      the code→URL link is saved — _test:_ `EPIC-001-S01: shorten generates a code and stores the mapping`

## Definition of Done

- [x] Every acceptance criterion has a passing test that names it (criterion ↔ test).
- [x] Implemented London-style: `CodeGenerator` and `LinkStore` are mocked (owned ports).
- [x] Conforms to `architecture.md` (pure domain, ports & adapters) and `tech-stack.md`.
- [x] New domain terms already in `glossary.md`.
- [x] architecture-guardian returns PASS on the change.
- [x] Full test suite green.

## Implementation notes

`Shortener.shorten(longUrl)` calls `codes.next()` then `store.save(code, longUrl)` and returns
the code. Domain lives in `src/shortener.js`; no I/O imports.

## Dependencies

- None.

## Out of scope

- Resolving codes (EPIC-001-S02).
