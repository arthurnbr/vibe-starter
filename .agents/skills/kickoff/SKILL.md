---
name: kickoff
description: Turn a product brief / cahier des charges into a one-page SPEC.md (entities, invariants, routes, screens, acceptance, cut list) before writing code. Use at the very start of a timed build, or when the user pastes a brief, subject, or "sujet".
---

# Kickoff: brief → SPEC.md in under 5 minutes

Write `SPEC.md` at the repo root. No application code in this step.

## Steps

1. Read `AGENTS.md` and skim `src/features/tasks` (the reference pattern). Note what can be reused as-is.
2. Extract from the brief, in the brief's own words:
   - **Entities**: table, fields with types (`text`, `integer`, cents for money, timestamp), constraints (unique, not null, enum).
   - **Invariants**: rules the data must never break ("stock >= 0", "SKU unique"). For each: WHERE it is enforced (zod, DB constraint, inside a transaction).
   - **Derived values**: stored or computed? If stored (e.g. cached quantity), name the write that keeps it in sync.
   - **Screens**: route → what it shows → actions offered.
   - **Server actions**: name, input schema, effect.
3. Classify every requirement **MUST / SHOULD / BONUS**. Ambiguity: pick the boring interpretation, write it as an explicit assumption.
4. Build order = vertical slices, each demoable. Data model + seed first, dashboard after the core flows.
5. Cut list: out of scope (auth, multi-user, pagination…), one line each.

## SPEC.md template

```md
# <App> — spec
## Assumptions
## Data model
| table | field | type | constraints |
## Invariants
| rule | enforced in |
## Screens & actions
| route | shows | actions |
## Build order (timeboxed)
1. schema + seed (≈5 min) → verify: db:reset, rows visible
## Out of scope
```

One screen of text max. If running interactively, show it and wait for a go; if told to proceed autonomously, continue with `ship-feature`.
