---
name: kickoff
description: Turn a product brief / cahier des charges into SPEC.md by rethinking how the job should be done, not by digitising the current process or mirroring the data - a day in the life, the pains, the new way of working the app enables, task-shaped workflows, decisions the app makes, data model, invariants, demo storyline. Use at the very start of a timed build, or when the user pastes a brief, subject, or "sujet".
---

# Kickoff: brief → SPEC.md (≤ 6 minutes, then build)

Three levels of app. Aim for level 3.
1. **Notebook**: one table + one form per entity, a dashboard of counts. Mirrors the database. Rejected.
2. **Digitised process**: today's paper/spreadsheet workflow, on screen. Better, still forgettable.
3. **New way of working**: the app changes *how* the job is done because it knows things the user cannot hold in
   their head (time, capacity, history, constraints) and does the tedious part for them. The user's day is
   different, and better, because the app exists.

## 1. A day in the life (8–12 lines)

For each persona: real moments. For each: **when · where · what they hold · what they must decide · pain today**
(re-typing, counting, checking two places, remembering, calculating, phoning, forgetting, being interrupted).

## 2. Reinvent, don't digitise (the core step)

For each pain, ask in order:
- **Can the app make this decision instead of the user?** (schedule, allocate, prioritise, suggest a quantity, pick a slot)
- **Can the app remove the step entirely?** (pre-fill from what it already knows, generate the document, infer the status)
- **Can the app change who does it or when?** (customer self-serves, work is spread to quiet hours, preparation happens before the rush)
- **What does the app know that the user cannot see?** (capacity over time, trends, conflicts, what will happen if nothing changes) → show it as a **visual model of the domain**, not a table: a timeline, a capacity gauge per slot, a board by stage, a calendar heat, a floor/shelf map, a production plan.

Write the result as **before → after** lines: "Avant : le boulanger compte les commandes sur un cahier la veille au soir.
Après : la fournée du lendemain est calculée et imprimée, les clients ne peuvent plus réserver au-delà du four."

## 3. Workflows and their primary surface

For each "after", design the screen around the **domain object the user thinks in** (the day's production, a time
slot, a route, a shelf), not around a DB table. Use `.agents/skills/workflow-screens`. Every screen has one primary
action and shows the consequence before the user commits.

**Rejection test** for every screen/feature:
- it is "list of <table> + form with the same fields" → rework into a domain view or remove;
- it displays data without changing a decision → remove or attach a decision;
- it is decoration (palette, theme, animation) → not a feature;
- you cannot write its before → after line → remove.

## 4. Then the usual

- **Brief coverage**: every brief line mapped to where it lives (often inside a workflow; plain CRUD only as fallback).
- **Scope**: a recent agent ships a brief in ~12 min. Plan 4–5 workflows, including at least one the brief implies but
  does not name (a document, a schedule, a customer-facing side). Build brief-covering workflows first, commit, then the rest.
- **Data model** that the new way of working needs; money in cents; constraints.
- **Invariants**: rule → where enforced.
- **Art direction**: 3 lines (mood, reference object, signature element), then apply `art-direction`.
- **Seed** that makes each workflow meaningful (a busy day, a conflict, a capacity limit reached, an edge case).
- **Demo storyline** = the persona's new day, beat by beat, each beat a before → after.

## SPEC.md template

```md
# <App> — spec
## A day in the life (today)
| when | who | situation | pain |
## The new way of working
| before | after (what the app does) | screen |
## Workflows
### <name> — <persona, moment>
domain object shown · what the app computes/decides · primary action · consequence shown before commit · invariants
## Brief coverage
## Data model / Invariants
## Art direction
## Seed plan
## Demo storyline (the new day)
## Rejected ideas (and why)
```

Do not wait for approval: write SPEC.md, apply art direction, then build workflows.
