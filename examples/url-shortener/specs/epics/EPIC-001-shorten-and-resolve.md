---
id: EPIC-001
title: Shorten and resolve URLs
status: reconciled    # draft | refining | ready | reconciled | broken-down | in-progress | verified
origin: authored      # authored | inferred | ratified
confidence: 5         # 1–5, see confidence gate
briefing: ../briefing.md
created: 2026-06-16
updated: 2026-06-16
---

# EPIC-001 — Shorten and resolve URLs

## Summary

Provide a small module that turns a long URL into a short code and resolves that code back
to the original URL, in memory, with no external dependencies.

## Motivation

Serves both briefing goals (shorten; resolve) and the success metric "a shortened URL always
resolves back to the exact original within the process".

## Scope

### In scope

- Generate a short code for a long URL and remember the mapping.
- Resolve a known short code to its long URL.
- Report a miss (unknown code) distinctly from a hit.

### Out of scope

- Persistence across processes, expiry, custom codes, web/HTTP layer (see briefing non-goals).

## Capabilities / user stories

- As a developer, I can shorten a long URL and get back a short code.
- As a developer, I can resolve a short code to its long URL (or learn it's unknown).

## Acceptance criteria

- [ ] **Given** a long URL **when** I shorten it **then** I get a short code and the
      code→URL link is stored.
- [ ] **Given** a code returned by shortening **when** I resolve it **then** I get the exact
      original long URL.
- [ ] **Given** a code that was never issued **when** I resolve it **then** I get an explicit
      "not found" result (null), not an error.

## Dependencies

- None (greenfield, self-contained module).

## Risks

- Code collisions if the generator's space is too small for the volume — mitigated by a
  7-char base-36 space (~78 billion) for single-process use.

## Open questions

- **Decision:** Short codes are generated as **random fixed-length base-36 tokens** (Option A).
  See changelog. (Options B sequential-counter and C URL-hash were considered.)

## Changelog

- 2026-06-16 — created (confidence 1).
- 2026-06-16 — refine pass: resolved the code-generation open question.
  Posed three options — **A) random fixed-length base-36 (recommended)**: simple, no shared
  counter, opaque; B) sequential counter base-62: shortest codes but needs shared state and
  leaks volume; C) hash of URL: dedups identical URLs but fixed-length collisions need
  handling. **Picked A.** Added the "unknown code → null" criterion. Confidence → 4.
- 2026-06-16 — refine pass: criteria all Given/When/Then and testable; risks/dependencies
  listed; no open questions remain. Confidence → 5, status `ready`.
- 2026-06-16 — reconcile: traces to both briefing goals + the success metric; violates no
  non-goal; single epic so no cross-epic conflict; terms match glossary. Status `reconciled`.
