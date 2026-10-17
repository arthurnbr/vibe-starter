---
name: ship-feature
description: Implement one vertical slice (schema → validation → queries → actions → UI → nav/palette → seed → verify) by mirroring src/features/tasks. Use for every new entity, page, form, list, dashboard widget, or wow feature in this starter.
---

# Ship one vertical slice

One slice = one thing the user can demo. Finish it end-to-end, commit, move on fast.

1. **Pattern first.** Open the matching file in `src/features/tasks/` before writing its counterpart.
2. **Schema** (`src/db/schema.ts`): table, const enums, `$inferSelect` type, constraints. `npm run db:push`.
3. **Validation** (`validation.ts`): zod input (`z.coerce` for FormData numbers), URL filter schema with `.catch()`.
4. **Queries** (`queries.ts`, `import "server-only"`): filter, sort, aggregate in SQL.
5. **Actions** (`actions.ts`, `"use server"`): `safeParse` → write (transaction if >1 write or an invariant) →
   `revalidatePath("/", "layout")` → `ActionState`; errors carry `values: formValues(formData)`.
6. **UI**: server page + client islands only for interactivity. Every list: empty state; every chart/KPI: clickable.
7. **Reachability**: page in `src/lib/nav.ts`, entity in `src/lib/search.ts`, create/export in palette `ACTIONS`.
8. **Seed**: extend `src/db/seed.ts` so the slice looks alive. `npm run db:reset`.
9. **Verify**: `npm run check`, exercise the flow in the browser, `git commit`.

If a step fails twice, cut the slice smaller instead of looping.
