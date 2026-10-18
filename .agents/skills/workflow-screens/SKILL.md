---
name: workflow-screens
description: Patterns and code recipes for task-shaped screens that change how users work - visual models of the domain (timeline, capacity per slot, board by stage, plan), the app deciding/allocating for the user, customer self-service sides, batch entry, expected-vs-actual reconciliation, lifecycle documents, a today page with actions, consequences shown before commit. Use when designing or building any screen beyond plain CRUD, or when a feature risks being "a table plus a form".
---

# Workflow screens

A workflow screen matches one real task end to end. Build it as one vertical slice (`ship-feature`).

## Patterns

### 0. Visual model of the domain (the primary surface, prefer it over tables)
Show the thing the user thinks in, so constraints become visible and decisions obvious:
- **Timeline / agenda** of slots with capacity bars (orders per pickup slot, appointments per chair, deliveries per day).
  Build: CSS grid, one column per slot, a bar whose fill = load / capacity, color shifts near the limit; click a slot → its content.
- **Board by stage** (to prepare → ready → handed over; received → in repair → done), cards show what matters for the next step.
  Moving a card = server action that checks the transition.
- **Production / preparation plan** computed from demand ("4 fournées : 1 h 30 tradition, 3 h 00 viennoiseries"),
  printable, with what to start first.
- **Gauge / runway** for a resource (oven, stock, budget, seats) over time, showing when it breaks.
- **Map or floor plan** when space matters (tables, shelves, zones).
Tables remain for search/admin, never as the main screen of a workflow.

### 0b. The app decides, the user confirms
- Allocation: the app proposes the slot, the route, the batch, the person; the user accepts or drags to change.
- Constraint-aware input: impossible options are disabled with the reason ("Complet", "Four plein à 7 h"), not rejected after submit.
- Self-service side: when a third party (customer, supplier) creates work, give them their own minimal page so
  the user stops re-typing (`/commander`, `/suivi/<code>`). Public pages have no sidebar.

### 1. Batch entry sheet (end-of-day sales, delivery slip, stock count)
- Add lines by typing a name/SKU in a search box (`Command` in a `Popover`), Enter adds the line and refocuses search.
  Repeating a product increments its quantity instead of adding a duplicate.
- Each line: product, current stock, quantity input, live consequence (stock after, "sous le seuil" warning,
  over-stock error inline), remove button.
- Sticky footer: totals (units, amount), one submit button. One server action, **one transaction for all lines**;
  any invalid line rejects the whole batch and returns per-line errors (`fieldErrors["lines.3.quantity"]`).
- Client state: `useState` array of lines; submit with `startTransition` + server action taking a typed object
  (validated again with zod on the server). No FormData juggling for dynamic rows.

### 2. Expected vs actual (receive an order, inventory count, cash-up)
- Pre-fill "expected" from the system (order lines, current stock); the user types "actual" only where it differs
  ("Tout reçu" button fills actual = expected).
- Show the gap per line with color and a **required** reason select when gap ≠ 0 (cassé, manquant, erreur fournisseur,
  vol, erreur de saisie). The reason is the information the owner needs later ("why do I lose stock?"): surface it
  in a breakdown (losses by reason / category over the period).
- Validation writes the adjustments as movements with the reason, and updates the document status
  (partially received, received). Remaining quantities stay open for a later delivery.

### 3. Lifecycle document (purchase order, inventory session, return)
- Table with `status` enum + timestamps per transition (`sentAt`, `receivedAt`); lines in a child table.
- Detail page shows a status stepper, the lines, the allowed next action(s) only. Transitions are server actions
  that check the current status inside the transaction (no "receive" on a draft, no double validation).
- Generated from a recommendation in one click (e.g. reorder suggestions → draft order per supplier).

### 4. Today / inbox page (landing)
- A ranked list of things needing attention, each with **why** (computed reason) and **one action button**:
  "Commander 24 chez Vaude (rupture prévue samedi)", "Réceptionner la commande #12 (attendue hier)",
  "Compter le rayon Chaussures (pas compté depuis 45 j)", "Solder 5 produits dormants (0 vente en 90 j)".
- Group by urgency (aujourd'hui / cette semaine), show counts. KPIs move to a secondary place.
- Look beyond stock-outs: dormant items (cash tied up, suggest a markdown), overdue documents, unusual losses,
  items never counted. Each one is a decision the user would not see in a spreadsheet.

### 5. Recommendations with numbers the user trusts
- Show the formula in a tooltip/hover card: "vend 2,3/j sur 30 j · livraison en 5 j · stock 6 → rupture le 21/10".
- Respect constraints: supplier lead time, minimum order, pack size; round up to pack size.
- Let the user override the suggested quantity before acting.

### 6. Smart defaults and guards
- Default date = today, default reason from context (sale sheet → vente), last-used supplier, quantity = pack size.
- Inline consequences before submit (stock after, price change impact), not only server errors after.
- Undo for destructive or bulk actions via toast with a compensating server action.

## Anti-patterns (rewrite if you see them)
- A page whose only content is a table mirroring a DB table and a "Nouveau X" dialog with the same columns.
- A single-record dialog for something users do 20 times in a row.
- A dashboard of totals with no "so what / do what".
- Features that exist only to be shown (theme switch, single-key shortcuts) listed as backlog items.
- Single-key keyboard shortcuts (`n`, `g x`, `v`): undiscoverable in a demo, conflict with typing. Ctrl K palette only.
- A primary screen that is a table, when the domain has time, capacity or stages that a visual model would show.
