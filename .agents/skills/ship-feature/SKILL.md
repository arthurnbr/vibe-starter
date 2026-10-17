---
name: ship-feature
description: Implement one vertical slice (schema → validation → queries → actions → UI → seed → verify) by mirroring src/features/tasks. Use for every new entity, page, form, list, or dashboard widget in this starter.
---

# Ship one vertical slice

One slice = one thing the user can demo. Finish it end-to-end before starting the next.

1. **Pattern first.** Open the matching file in `src/features/tasks/` before writing its counterpart. Copy structure, naming, error handling; change only domain logic.
2. **Schema** (`src/db/schema.ts`): table, const enums, `$inferSelect` type. Money in integer cents. Then `npm run db:push`.
3. **Validation** (`validation.ts`): zod input (`z.coerce` for FormData numbers) and URL filter schema with `.catch()` defaults.
4. **Queries** (`queries.ts`, `import "server-only"`): filter/sort/aggregate in SQL (Drizzle `where`, `orderBy`, `sum`, `count`, `groupBy`), not JS loops over all rows.
5. **Actions** (`actions.ts`, `"use server"`): `safeParse` → write (transaction if >1 write or an invariant, see `data-integrity`) → `revalidatePath("/", "layout")` → `ActionState`. Expected domain errors return `{ ok: false, message }` in French; never throw them to the UI.
6. **UI**: server page parses `searchParams`, calls queries, renders shadcn. Client components only for interactivity (dialog form with `useActionState`, URL filters, chart).
7. **Seed**: extend `src/db/seed.ts` with realistic data covering edge states (empty, alert, zero). `npm run db:reset`.
8. **Verify**: `npm run check`, then exercise the flow. Fix before moving on.

Do not: add an API route a server component/action can replace; add a dependency, state library, or generic table abstraction; leave TODOs, placeholders, or fake data.
