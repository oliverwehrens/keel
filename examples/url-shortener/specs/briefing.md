# Briefing: Snip — a tiny URL shortener

## Problem

People share long, unwieldy URLs in chats, slides, and print. They need a short,
stable link that redirects to the original.

## Users & stakeholders

- **Primary users:** developers embedding shortening in a tool or demo.
- **Stakeholders:** whoever clicks the short links.

## Goals

- Turn a long URL into a short code.
- Resolve a short code back to its original URL.

## Non-goals

- No web UI, accounts, analytics, or custom vanity codes (now).
- No persistence beyond the running process (now).
- No expiry / deletion (now).

## Constraints

- Library-first: usable as a small module, no network service required.
- Zero runtime dependencies preferred.

## Success metrics

- A shortened URL always resolves back to the exact original within the process.
- Codes are collision-free for the volumes a single process handles.

## Open questions

- How should short codes be generated? (resolved during refine — see EPIC-001)
