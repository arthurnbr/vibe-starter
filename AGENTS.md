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

## Pace (single timeline, minutes from the start of the interview)

| min | phase | what happens |
|---|---|---|
| 0–5 | Frame | `kickoff` writes `SPEC.md`, then **STOP and wait for the candidate's go** (one message). The candidate picks the priority workflow, the critical invariant, and what is deferred. This is the only stop. |
| 5–8 | Identity | `art-direction`. Remove the `tasks` example now (see `demo-ready` step 0), not at the end. |
| 8–22 | Core | Brief-covering workflows, one slice = one commit. After each slice: `npm run check` + **only its own** e2e journey (`npx playwright test -g "<journey>"`). |
| 22–28 | Extend | Next item of SPEC "Phase 2", then stop at 28 even if unfinished (revert it). |
| 28–32 | Freeze | `demo-ready`: no new features. Invariants, then the **full** `npm run e2e` **once** (≈ 5 min: start it in the background and write `/about` + `DEMO.md` meanwhile), verify, commit. A red test → rerun only that test (`-g`), never the whole suite. |
| 32–40 | Demo | The candidate demos. The agent is idle. |

**The clock is the hard limit.** A run that is correct at minute 52 fails the interview. Check the time (`date`)
at each commit; at minute 28 freeze whatever is done.

- After the go, work autonomously: decide, note the assumption in `SPEC.md`, keep going.
- Deferring a bonus is a legitimate decision; write it in SPEC "Phase 2" with the reason. Do not drop brief lines.
- If an approach fails twice, cut the slice smaller or ask the candidate; do not loop.
- Use subagents for independent slices when available (one owner per file; shared contracts first).
- At the end, stop every dev server you started (including background services of your own harness).

## Commands

| Command | Use |
|---|---|
| `npm run dev` | dev server (http://localhost:3000) |
| `npm run db:push` | sync `src/db/schema.ts` to `data/app.db` (no migration files) |
| `npm run db:seed` | reset + seed demo data (`src/db/seed.ts`) |
| `npm run db:reset` | delete the DB, push, seed |
| `npm run check` | typecheck + lint, MUST pass before saying "done" |
| `npm run verify` | check + production build: the final gate |
| `npm run e2e` | Playwright on a fresh reset + production build: every page loads, **no dead click on any page**, each workflow journey passes (~1 min) |
| `npm run invariants` | `scripts/check-invariants.ts`: forbidden cases against the real write code + global DB assertions |
| `npm run demo` | reset + production build + `next start` on all interfaces (port 3000): what the candidate demos |

Remote access: `next.config.ts` sets `allowedDevOrigins` to this machine's IPs. Without it, opening `next dev` from
another device (LAN, Tailscale, phone) shows the page but blocks its scripts: **nothing reacts**. Do not remove it.

Over plain http on a network IP the page is **not a secure context**: `crypto.randomUUID()`, `navigator.clipboard`,
`navigator.share`, geolocation… are undefined and crash the page. Use `newRequestId()` from `src/lib/request-id.ts`
for form ids, and give every clipboard action a fallback. `npm run e2e` runs over the network IP to catch this.

SQLite gotcha: `db:reset` deletes the file a running dev server holds open. **After any reset, restart the dev server**
before looking at the app, or it shows an orphaned database.

## Stack

Next.js App Router · shadcn/ui (radix) · Tailwind v4 · Drizzle + better-sqlite3 · zod 4 · recharts via shadcn `chart` ·
es-toolkit · date-fns · lucide-react · sonner · motion · next-themes · offline fonts `@fontsource-variable/*`
(Bricolage Grotesque, Fraunces, Space Grotesk, Instrument Sans, Manrope, DM Sans, JetBrains Mono).
Already wired in the shell: sidebar, command palette (Ctrl K), dark mode, toasts, `/about` methodology page.
No other keyboard shortcuts: single-key shortcuts are undiscoverable in a demo and conflict with typing.

Adding a dependency is fine when it buys a visible feature (map: `maplibre-gl`; drag & drop: `@dnd-kit/core`;
calendar views; PDF/QR…). Missing shadcn component: `npx shadcn@latest add <name>`, never hand-write one.
Pages that read the DB at request time need `export const dynamic = "force-dynamic"` (see `src/app/page.tsx`); pages
reading `searchParams` are dynamic automatically. `cacheComponents` is off to avoid Suspense/prerender constraints.

## Architecture: copy `src/features/tasks` (replace it with the real domain at minute 5–8)

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
src/lib/text.ts                 searchKey() (accent-free search/uniqueness, SQL search_key()), frenchNumber() ("12,5")
src/lib/zod.ts                  import zod from here: French error messages by default
src/components/command-palette.tsx  ACTIONS: one line per global action (create, export…)
src/app/about/page.tsx          methodology page: fill STACK/CHOICES/LIMITS at the end
```

## Hard rules (these are what "clean" means here)

- Reads in server components via `queries.ts`; filter/aggregate in SQL. `route.ts` only for downloads (CSV, PDF).
- Mutations are server actions; zod `safeParse` on the server, always, including ids and lookups. Single-form actions
  return `ActionState` with `values: formValues(formData)`; batch actions take a typed object and return per-line errors.
- Updates/deletes check `changes`: 0 rows affected is an error ("introuvable / déjà modifié"), never a success toast.
- Multi-step writes go in ONE `db.transaction((tx) => ...)` (synchronous, no `await`). Invariants checked inside it,
  backed by DB constraints (`unique`, `check(...)`, including enum membership). See `data-integrity` for the
  recurring traps (capacity, undo, double submit, time zone, codes, date validation).
- State a user would want to share (filters, sort, tab, period) lives in the URL; the inputs reflect the URL.
- Money in integer cents (`formatCurrency(cents / 100)`); dates as `integer({ mode: "timestamp" })` + date-fns.
- UI: compose shadcn; semantic tokens only (works in dark mode); every list has an empty state; a KPI or chart that
  links to a list uses **exactly the same filter** as its number.
- UI copy in French. Code and comments in English; comment only a non-obvious why.
- Every feature you build must be reachable in the demo: in the nav, the palette, or one click from a page.
- Claims in `/about` and `DEMO.md` must be true of the final state; each "refused" claim is backed by a script in
  `scripts/` that the candidate can run live (`npx tsx scripts/<name>.ts`).

## Done means

1. `npm run invariants`, `npm run e2e` and `npm run verify` pass on the final state (after the last edit, not before).
2. Every brief line has an e2e journey in `e2e/app.spec.ts`, including one rejected case; every page is in `PAGES`
   so the click audit covers it.
3. `/about` and `DEMO.md` true for this state (`demo-ready`).

Seed volume: enough that each screen looks used and each workflow has something to do; include at least one edge
state per invariant. Derive timestamps from one reference instant and respect every invariant (lead times, no future history).

## Skills (`.agents/skills`)

- `kickoff`: brief → `SPEC.md` = today's day, before → after (the new way of working), workflows, brief coverage, model, art direction, demo storyline.
- `art-direction`: domain-tied palette, font pairing, signature element, voice. ≤ 5 min.
- `workflow-screens`: visual domain models, the app decides, self-service sides, batch entry, expected vs actual, documents, today page.
- `ship-feature`: implement one vertical slice following `src/features/tasks`.
- `data-integrity`: transactions, invariants, history, undo.
- `demo-ready`: final pass, `/about`, `DEMO.md`.
- `shadcn`: component usage.
