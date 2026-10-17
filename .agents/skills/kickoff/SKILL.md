---
name: kickoff
description: Turn a product brief / cahier des charges into SPEC.md by designing around the users' real work (jobs, moments, pains) instead of the database: workflows, task-shaped screens, decisions the app makes for them, data model, invariants, demo storyline. Use at the very start of a timed build, or when the user pastes a brief, subject, or "sujet".
---

# Kickoff: brief → SPEC.md (≤ 6 minutes, then build)

The trap: the brief describes **data** ("a product has a name, a SKU…"). A naive app mirrors it: one table per
entity, one form per table, a dashboard of counts. That is a notebook. The reviewer wants a **tool**: it knows
the user's job, removes their tedious steps, and tells them what to do next.

## 1. Live a day in the user's shoes (write it down, 8–12 lines)

For each persona (owner, clerk, warehouse…): a timeline of a real day/week. For each moment:
**when · where · what they hold (phone, box, receipt, supplier email) · what they must decide · what is painful today**
(re-typing, counting, checking two places, remembering, calculating in their head, forgetting).

Example (shop stock): "Tue 9:00, a supplier box arrives with a packing slip of 14 lines; today the owner types
each line into a spreadsheet, and never notices the 2 missing items." → a feature is born.

## 2. Turn pains into workflows (the core of the backlog)

For each painful moment, design a **workflow screen** shaped like the task, not like the table:
- **Batch entry where reality is batch**: end-of-day sales sheet, reception of a delivery against an order,
  inventory count by shelf. One screen, many lines, keyboard-driven, scan/search-to-add, totals live, one submit.
- **Compare expected vs actual**: received vs ordered, counted vs system, cash vs sales → show the gap, ask for
  a reason, write the adjustment.
- **Decisions computed for the user**: "order 24 from Supplier X before Thursday to avoid a stock-out on
  Saturday", "these 5 items have not sold in 90 days: discount them", "you count shelf B this week".
  Each decision has a one-click way to act on it (draft order, mark, schedule).
- **Lifecycle objects** the brief implies but does not name: purchase order (draft → sent → partially received
  → received), inventory session (open → counted → validated), return. Status, timestamps, who/when.
- **Inbox / today screen**: the landing page is "what needs my attention now", ranked, each item actionable,
  not a wall of KPIs.

## 3. Rejection test (apply to every feature before keeping it)

Reject or rework a feature if:
- it is "list of <table> + form with the same fields as <table>" and nothing else;
- it only displays data the user could see by sorting a spreadsheet;
- it is decoration (theme, shortcut, palette, animation) — those are polish, never backlog items;
- you cannot name the persona moment and the minutes or the mistake it saves.
Keep it if you can write: "<persona> at <moment> no longer has to <pain>, the app <does X>".

## 4. Then the usual

- **MUST**: every line of the brief, folded into the workflows above when possible (e.g. "record an exit" is
  covered by the end-of-day sales sheet; single-movement entry stays as a fallback).
- **Do not reject an implied lifecycle document "for time"**: a recent agent ships the brief in ~12 min. Budget for
  4–5 workflows including at least one document the job implies but the brief does not name (purchase order with
  supplier, inventory session, return). Plan it as phase 2, after the brief workflows are committed.
- **Data model** that the workflows need (suppliers, orders, order lines, counts…), money in cents, constraints.
- **Invariants**: rule → where enforced.
- **Seed** that makes each workflow meaningful (an order awaiting delivery, a delivery with missing lines,
  slow movers, a product about to run out before the next delivery).
- **Demo storyline** = the persona's day, beat by beat, each beat a workflow that saves time or prevents a mistake.

## SPEC.md template

```md
# <App> — spec
## A day in the life
| when | who | situation (holds / decides) | pain today | feature |
## Workflows (task-shaped screens)
### <Workflow name> — <persona, moment>
steps · what the app computes · what it prevents · invariants touched
## Decisions the app makes for the user
| decision | inputs | action button |
## Brief coverage
| brief line | covered by |
## Data model / Invariants / Seed plan
## Demo storyline (the persona's day)
## Rejected ideas (and why)
```

Do not wait for approval: write SPEC.md, then build with `ship-feature`, workflows first.
