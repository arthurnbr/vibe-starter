<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project

Interview starter: Next.js 16 (App Router, TS strict) full-stack app, one process, SQLite file.
The goal is to ship a working, coherent app from a brief in ~40 minutes and demo it.

## Commands

| Command | Use |
|---|---|
| `npm run dev` | dev server (http://localhost:3000) |
| `npm run db:push` | sync `src/db/schema.ts` to `data/app.db` (no migration files) |
| `npm run db:seed` | reset + seed demo data (`src/db/seed.ts`) |
| `npm run db:reset` | delete the DB, push, seed |
| `npm run check` | typecheck + lint, MUST pass before saying "done" |

## Stack (fixed, do not add dependencies without asking)

Next.js App Router · shadcn/ui (radix, already installed in `src/components/ui`) · Tailwind v4 ·
Drizzle ORM + better-sqlite3 · zod 4 · recharts via shadcn `chart` · es-toolkit · date-fns · lucide-react · sonner.

`cacheComponents` is OFF in `next.config.ts` on purpose: every page reads SQLite at request time.
Need a shadcn component that is not installed? `npx shadcn@latest add <name>`. Never hand-write one.

## Architecture: copy `src/features/tasks`

The `tasks` feature is the reference implementation. A new feature `<x>` mirrors it file for file:

```
src/db/schema.ts               table + exported const enums + inferred type
src/features/<x>/validation.ts zod input schema + URL filter schema (shared front/back)
src/features/<x>/queries.ts    "server-only" reads (Drizzle), called from server pages
src/features/<x>/actions.ts    "use server" mutations: safeParse → db → revalidatePath → ActionState
src/features/<x>/*.tsx         UI: form dialog (useActionState), table, filters (URL params), chart
src/app/<route>/page.tsx       async server page: parse searchParams with zod, call queries, render
```

Rules:
- Reads happen in server components via `queries.ts`. No API routes and no client fetching, except a `route.ts` for file downloads (CSV).
- Mutations are server actions returning `ActionState` (`src/lib/action-state.ts`). Validate with zod on the server, always.
  Every error return (zod or domain) includes `values: formValues(formData)`, and the form uses `defaultValue={values.x}`:
  React 19 resets uncontrolled forms after an action, so without it the user loses what they typed.
- Multi-step writes (e.g. update stock + insert movement) go in ONE `db.transaction((tx) => ...)`. Check invariants inside the transaction before writing.
- Filters, search, sort live in the URL (`searchParams`), parsed by a zod schema with `.catch()` defaults.
- Money: store integer cents, format with `formatCurrency(cents / 100)` from `src/lib/format.ts`.
- Dates: store `integer({ mode: "timestamp" })`; format with date-fns.
- UI: compose shadcn components (Card, Table, Dialog, Field, Badge, Empty, Chart). Semantic tokens only (`text-muted-foreground`, `bg-destructive/10`), no raw colors. Every list has an empty state.
- UI copy in French. Code, identifiers, comments in English.

## Code style

- Smallest complete change. No speculative abstraction, options, wrappers, or "for later" code.
- Comment only a non-obvious *why*, one line. No narrating comments.
- Reuse before writing: existing helper → es-toolkit/date-fns → new code.
- Delete what your change makes unused (including the `tasks` example once the real feature replaces it, if asked).

## Done means

1. `npm run check` passes.
2. `npm run db:reset` works and the seed exercises every screen (including alert / empty states).
3. The user flow was exercised (browser, or curl the page and grep the expected text), not assumed.
4. Report in 3 lines: what was built, what was skipped, known risks.

## Skills (`.agents/skills`)

- `kickoff`: brief → `SPEC.md` (entities, invariants, screens, cut list) before coding.
- `ship-feature`: implement one vertical slice following `src/features/tasks`.
- `data-integrity`: transactions, invariants, derived values; any stock/balance/counter logic.
- `demo-ready`: final pass, seed, check, demo script.
- `ponytail`, `karpathy-guidelines`: code discipline. `shadcn`: component usage.
