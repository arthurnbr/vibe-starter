---
name: wow-features
description: Catalogue of high-impact features that make an internal web app impress in a demo (analytics, forecasting, keyboard UX, bulk actions, import/export, drill-down, detail drawers, activity feed, maps, kanban), with how to build each in this Next.js + shadcn + SQLite starter. Use when planning the backlog, or when the brief's MUSTs are done and time remains.
---

# Wow features

Pick the ones that answer a real persona question in the domain. Each item: what it is → how to build it here.
Build each as a vertical slice (`ship-feature`), wire it into nav/palette, add it to the demo storyline.

## Insight (computes what a spreadsheet does not)

- **Clickable KPIs with deltas**: value + % vs previous period, colored arrow → SQL for both periods; card is a `Link` to the filtered list.
- **Trend chart with period switch** (7/30/90 days, URL param) → `ToggleGroup` + one grouped SQL query (`strftime('%Y-%m-%d', ts, 'unixepoch')`).
- **Cross-filter / drill-down**: click a bar/slice → navigate with the filter in the URL (see `status-chart.tsx`).
- **Forecast / run-out date**: average daily outflow over N days → "rupture estimée le …", sort by urgency.
- **Rankings**: top/flop N, ABC/Pareto (cumulative share), movers vs previous period.
- **Anomaly highlights**: rows whose value deviates from their own average → badge + reason tooltip.
- **Suggestions**: computed next actions ("commander 24 unités pour couvrir 30 jours") with a one-click apply button.
- **Sparklines in table rows**: tiny recharts `LineChart` per row (last 30 days) → spot trends without opening.
- **Heatmap** (day × hour or day × category) → CSS grid with `bg-primary` opacity by value.

## Product feel

- **Command palette** (already wired): add entities to `src/lib/search.ts`, actions to `ACTIONS`.
- **Keyboard shortcuts** (`useHotkeys`): `n` create, `/` focus search, `g x` navigate; show them with `Kbd`.
- **Detail drawer**: click a row → `Sheet` with full record, mini chart, history, actions, without leaving the list.
- **Inline edit**: click a cell → input → server action on blur, optimistic with `useOptimistic`.
- **Bulk actions**: row checkboxes + sticky action bar ("Archiver 3 produits", "Exporter la sélection").
- **Saved views**: name the current URL filters → `localStorage` → listed in a dropdown and the palette.
- **Activity feed / audit log**: append-only `events` table written in the same transaction as each mutation; timeline component.
- **Undo toast**: after a destructive action, `toast("…", { action: { label: "Annuler", onClick } })` calling a compensating action.
- **Empty states with a call to action**, skeletons via `loading.tsx`, motion on list changes (`motion` `AnimatePresence`).
- **Dark mode** (wired), responsive layout, print-friendly page (`print:` variants) for a report.

## Data in / out

- **CSV export** of the current filtered view (`route.ts`, `;` + BOM for Excel FR).
- **CSV import** with preview, per-row validation (zod), and a summary ("42 créés, 3 rejetés : …").
- **Printable/PDF report** page (`/report?period=…`) styled for print.
- **QR code / label** per item (`qrcode` package) if the domain is physical.

## Domain views

- **Kanban** by status with drag & drop (`@dnd-kit/core`) → server action on drop.
- **Calendar / timeline** of dated events.
- **Map** (`maplibre-gl` + OpenFreeMap style) when data has places.
- **Multi-entity**: suppliers, locations, customers with their own pages and cross-links.

## Rules

- A wow feature is done only if it is reachable (nav, palette, or one click) and appears in `DEMO.md`.
- Seed must make it visible (forecasts need history, anomalies need an anomaly).
- Never trade the hard rules in `AGENTS.md` (validation, transactions, invariants) for a feature.
