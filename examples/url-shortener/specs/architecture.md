---
artifact: architecture
status: ready            # draft | refining | ready
origin: authored
confidence: 5
source_of_truth: ./briefing.md
tech_stack: ./tech-stack.md
created: 2026-06-16
updated: 2026-06-16
---

# Architecture

> Decides *how*. The product spec still wins. Reviewed by the architecture-guardian.

## Principles

- **Ports & adapters.** The domain (`Shortener`) depends only on small interfaces (ports);
  concrete implementations are injected. The domain imports no I/O and no globals.
- **Pure domain.** `Shortener` holds no side effects of its own beyond calling its ports.

## Component boundaries

- `Shortener` (domain) — orchestrates shorten/resolve using two ports.
- **Port `CodeGenerator`** — `next(): string`.
- **Port `LinkStore`** — `save(code, longUrl): void`, `find(code): string | null`.
- Adapters: `RandomCodeGenerator` (implements CodeGenerator), `InMemoryLinkStore`
  (implements LinkStore).

## Key decisions (ADRs)

### ADR-001 — In-memory store behind a LinkStore port

- **Status:** accepted
- **Context:** Briefing non-goal "no persistence beyond the running process". We still want
  to swap storage later without touching the domain.
- **Decision:** Define a `LinkStore` port; ship an `InMemoryLinkStore` (`Map`) adapter.
- **Consequences:** Trivial, dependency-free now; a DB adapter can be added later by
  implementing the same port. Data is lost on restart (acceptable per non-goals).

### ADR-002 — Random fixed-length base-36 codes behind a CodeGenerator port

- **Status:** accepted
- **Context:** Refine picked random fixed-length codes (EPIC-001). Generation strategy may
  change; the domain shouldn't care.
- **Decision:** Define a `CodeGenerator` port; ship `RandomCodeGenerator` (7 chars, `[a-z0-9]`).
- **Consequences:** ~78 billion codes, no shared counter; collision probability negligible at
  single-process volumes. Strategy is swappable via the port.

## Cross-cutting concerns

- **Errors:** unknown code resolves to `null` (a value, not an exception) — see criteria.
- **Testing:** London-school — unit tests mock the two ports; one acceptance test wires the
  real adapters end-to-end.

## Guidelines for implementation

- Domain code (`src/shortener.js`) imports neither adapter nor any node built-in.
- Adapters implement exactly one port each.

## Open questions

- None.

## Changelog

- 2026-06-16 — created, refined to ready (confidence 5). Guardian: **PASS**.
