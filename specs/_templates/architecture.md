---
artifact: architecture
status: draft            # draft | refining | ready (tech confidence gate)
confidence: 1            # 1–5, see the tech gate in sdd-tech-refine
source_of_truth: ./briefing.md
tech_stack: ./tech-stack.md
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
---

# Architecture

> How the system is structured to deliver the product spec on the chosen stack. The product
> description is the source of truth; this conforms to it, and the `architecture-guardian`
> subagent enforces that. This decides *how*, never *what*.

## Principles

The handful of rules every implementation must follow (e.g. "domain logic has no framework
imports", "all external I/O behind an interface"). Keep these few and firm.

- …

## Component boundaries

The major components/modules, their responsibilities, and how they may talk to each other.
A diagram-in-words is fine.

- …

## Key decisions

Significant, hard-to-reverse choices and why (data model, sync vs async, auth model). Each
traces to a product need.

- …

## Cross-cutting concerns

Error handling, logging/observability, auth, configuration, testing strategy — how each is
handled consistently.

- …

## Guidelines for implementation

Concrete dos and don'ts the `architecture-guardian` checks implementation against.

- …

## Open questions

- …

## Changelog

- <YYYY-MM-DD> — created (confidence 1)
