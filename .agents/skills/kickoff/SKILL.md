---
name: kickoff
description: Turn a product brief / cahier des charges into SPEC.md: data model, invariants, a ranked feature backlog that goes well beyond the brief (wow features), and the demo storyline. Use at the very start of a timed build, or when the user pastes a brief, subject, or "sujet".
---

# Kickoff: brief → SPEC.md (≤ 5 minutes, then build)

The brief is the floor. The reviewer compares you to other candidates who all have AI: what wins is a product that
feels like a real tool with many useful features, coherent data, and a demo that tells a story.

## Steps

1. Read `AGENTS.md`, skim `src/features/tasks` and the shell (`src/lib/nav.ts`, `src/components/command-palette.tsx`).
2. **Personas & jobs**: who uses this, what 3–5 questions they ask every day ("what is about to run out?",
   "what sold best this month?"). Every feature must answer one of them.
3. **Data model**: tables, fields (cents, timestamps, enums), constraints. Design for the wow backlog too
   (e.g. suppliers, purchase cost, lead time) when it is cheap and unlocks features.
4. **Invariants**: rule → where enforced (zod, DB constraint, inside a transaction).
5. **Feature backlog**, ranked, each with the persona question it answers and its demo moment:
   - **MUST**: every line of the brief.
   - **WOW**: 10–15 candidates from `.agents/skills/wow-features`, adapted to the domain. Prefer features that
     *compute something the user could not see in a spreadsheet* (forecasts, alerts, rankings, what-if) and
     features that *feel like a product* (palette, shortcuts, bulk actions, import/export, detail drawers).
   - Order: MUSTs first, then WOW by impact ÷ effort. Mark the cut line you expect to reach.
6. **Seed plan**: volume and shape of demo data so every screen is alive (90 days of history, trends, a few
   anomalies to discover in the demo).
7. **Demo storyline**: 6–8 beats, a narrative ("Monday morning, the manager opens Stockly…"), each beat showing
   one or two features.

## SPEC.md template

```md
# <App> — spec
## Personas & questions
## Assumptions
## Data model
| table | field | type | constraints |
## Invariants
| rule | enforced in |
## Backlog
| # | feature | kind (MUST/WOW) | answers | demo moment | effort |
## Seed plan
## Demo storyline
```

Do not wait for approval: write SPEC.md, then start `ship-feature` on slice 1 immediately.
