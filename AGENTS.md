<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Interview starter: Next.js 16 full-stack app (one process, SQLite file). You get a brief and ~40 minutes.
**The goal is an app that changes how the job is done, for the better**, demoed as the user's new day.
The brief describes data and today's process; do not mirror either. The app should decide, allocate, pre-fill and
warn using what it knows (time, capacity, history, constraints), and show the domain as the user thinks of it
(timeline, slots, stages, plan), not as tables. It has its own visual identity tied to the domain.
See `kickoff`, `art-direction`, `workflow-screens`. Quality comes from the hard rules below.

## Pace

- Work autonomously: decide, note the assumption in `SPEC.md`, keep going. Never stop to ask.
- `kickoff` (SPEC) in ≤ 6 min, then `art-direction` in ≤ 5 min, then workflows. Plain CRUD only as fallback.
  Aim for 4–5 workflows; each has a before → after line in SPEC.md.
- Use subagents/parallel work for independent slices when available (one owner per file).
- `npm run check` after each slice; commit after each slice so a broken step never costs the demo.
- **Use the time.** Runs with this starter finish the whole brief in 10–14 min. Never reject an idea "for time"
  in SPEC.md; order it in phase 2. When the brief is covered and committed and more than 10 min remain, build the
  next phase-2 workflow (customer-facing page, implied document, the app deciding more). Stop starting new slices
  only when < 8 min remain, then run `demo-ready`.
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
es-toolkit · date-fns · lucide-react · sonner · motion · next-themes · offline fonts `@fontsource-variable/*`
(Bricolage Grotesque, Fraunces, Space Grotesk, Instrument Sans, Manrope, DM Sans, JetBrains Mono).
Already wired in the shell: sidebar, command palette (Ctrl K), dark mode, toasts, `/about` methodology page.
No other keyboard shortcuts: single-key shortcuts are undiscoverable in a demo and conflict with typing.

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
src/features/tasks/task-batch-sheet.tsx + batch*.ts  reference batch screen: lines in client state, typed payload,
                                one transaction, per-line errors. Copy it for any multi-line workflow.
src/app/<route>/page.tsx        async server page: parse searchParams with zod, call queries, render
src/lib/nav.ts                  one line per page → sidebar + palette
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

- `kickoff`: brief → `SPEC.md` = today's day, before → after (the new way of working), workflows, brief coverage, model, art direction, demo storyline.
- `art-direction`: domain-tied palette, font pairing, signature element, voice. ≤ 5 min.
- `workflow-screens`: visual domain models, the app decides, self-service sides, batch entry, expected vs actual, documents, today page.
- `ship-feature`: implement one vertical slice following `src/features/tasks`.
- `data-integrity`: transactions, invariants, history, undo.
- `demo-ready`: final pass, `/about`, `DEMO.md`.
- `shadcn`: component usage.
