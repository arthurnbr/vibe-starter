<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Interview starter: Next.js 16 full-stack app (one process, SQLite file). You get a brief and ~40 minutes.
**The goal is a product that impresses in a demo**: the brief is the floor, not the ceiling. Two pages with
four interactions is a fail, even if clean. Ship the brief fast, then stack features that make the reviewer
say "wow" (see `.agents/skills/wow-features`). Quality comes from the few hard rules below, not from doing less.

## Pace

- Work autonomously: decide, note the assumption in `SPEC.md`, keep going. Never stop to ask.
- Brief MUSTs done in the first ~40% of the time, as vertical slices. Then wow features, one slice at a time.
- Use subagents/parallel work for independent slices when available (one owner per file).
- `npm run check` after each slice; commit after each slice so a broken step never costs the demo.
- At the end, stop any dev server you started and leave `npm run db:reset` state in place (the demo restarts the server).

## Commands

| Command | Use |
|---|---|
| `npm run dev` | dev server (http://localhost:3000) |
| `npm run db:push` | sync `src/db/schema.ts` to `data/app.db` (no migration files) |
| `npm run db:seed` | reset + seed demo data (`src/db/seed.ts`) |
| `npm run db:reset` | delete the DB, push, seed |
| `npm run check` | typecheck + lint, MUST pass before saying "done" |

## Stack

Next.js App Router · shadcn/ui (radix) · Tailwind v4 · Drizzle + better-sqlite3 · zod 4 · recharts via shadcn `chart` ·
es-toolkit · date-fns · lucide-react · sonner · motion · next-themes. Already wired in the shell:
sidebar, command palette (Ctrl K), keyboard shortcuts, dark mode, toasts, `/about` methodology page.

Adding a dependency is fine when it buys a visible feature (map: `maplibre-gl`; drag & drop: `@dnd-kit/core`;
calendar views; PDF/QR…). Missing shadcn component: `npx shadcn@latest add <name>`, never hand-write one.
`cacheComponents` is OFF in `next.config.ts` on purpose: every page reads SQLite at request time.

## Architecture: copy `src/features/tasks`

```
src/db/schema.ts                table + exported const enums + inferred type
src/features/<x>/validation.ts  zod input schema + URL filter schema (shared front/back)
src/features/<x>/queries.ts     "server-only" reads (Drizzle), called from server pages
src/features/<x>/actions.ts     "use server" mutations: safeParse → db → revalidatePath → ActionState
src/features/<x>/*.tsx          UI: form dialog (useActionState), table, filters (URL params), chart
src/app/<route>/page.tsx        async server page: parse searchParams with zod, call queries, render
src/lib/nav.ts                  one line per page → sidebar + palette + "g <key>" shortcut
src/lib/search.ts               one block per entity → global search in the palette
src/components/command-palette.tsx  ACTIONS: one line per global action (create, export…)
src/app/about/page.tsx          methodology page: fill STACK/CHOICES/LIMITS at the end
```

## Hard rules (these are what "clean" means here)

- Reads in server components via `queries.ts`; aggregates in SQL, not JS loops. `route.ts` only for downloads (CSV, PDF).
- Mutations are server actions returning `ActionState`; zod `safeParse` on the server, always. Error returns include
  `values: formValues(formData)` and forms use `defaultValue={values.x}` (React 19 resets forms after an action).
- Multi-step writes go in ONE `db.transaction((tx) => ...)` (synchronous, no `await`). Invariants checked inside it,
  backed by DB constraints (`unique`, `check`). See `data-integrity`.
- State that a user would want to share or undo (filters, sort, tab, selected period) lives in the URL.
- Money in integer cents (`formatCurrency(cents / 100)`); dates as `integer({ mode: "timestamp" })` + date-fns.
- UI: compose shadcn; semantic tokens only (works in dark mode); every list has an empty state; every chart and KPI is
  clickable and leads to the filtered data.
- UI copy in French. Code and comments in English; comment only a non-obvious why.
- Every feature you build must be reachable in the demo: in the nav, the palette, or one click from a page.

## Done means

1. `npm run check` passes and `npm run db:reset` seeds data that makes every screen look alive (60–200 rows,
   spread over 90 days, including alert / empty / edge states).
2. Every flow was exercised in the browser, not assumed.
3. `/about` filled, `DEMO.md` written (`demo-ready`).

## Skills (`.agents/skills`)

- `kickoff`: brief → `SPEC.md` = data model + invariants + **feature backlog** (brief MUSTs + 10–15 wow features ranked) + demo storyline.
- `ship-feature`: implement one vertical slice following `src/features/tasks`.
- `wow-features`: catalogue of high-impact features and how to build each in this stack.
- `data-integrity`: transactions, invariants, history, undo.
- `demo-ready`: final pass, `/about`, `DEMO.md`.
- `shadcn`: component usage.
