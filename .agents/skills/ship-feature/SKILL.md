---
name: ship-feature
description: Implement one vertical slice (schema → validation → queries → actions → UI → nav/palette → seed → verify) by mirroring src/features/tasks. Use for every new entity, workflow screen, page, form, list, or dashboard widget in this starter.
---

# Ship one vertical slice

One slice = one thing a persona can do in the demo. Finish it end-to-end, commit, move on.

1. **Pattern first.** Open the matching file in `src/features/tasks/` before writing its counterpart.
   Workflow screens (batch entry, reconciliation, documents): follow `.agents/skills/workflow-screens`.
2. **Schema** (`src/db/schema.ts`): tables, const enums, `$inferSelect` types, constraints. `npm run db:push`.
3. **Validation**: zod input (`z.coerce` for FormData numbers; typed objects for batch screens), URL filters with `.catch()`.
4. **Queries** (`import "server-only"`): filter, sort, aggregate in SQL.
5. **Actions** (`"use server"`): `safeParse` → write (transaction for >1 write or any invariant, see `data-integrity`) →
   `revalidatePath("/", "layout")` → `ActionState`; errors carry `values` (forms) or per-line errors (batch).
6. **UI**: server page + client islands for interactivity. Empty state, inline consequences, one clear primary action.
7. **Reachability**: page in `src/lib/nav.ts`, entity in `src/lib/search.ts`, primary actions in palette `ACTIONS`.
8. **Seed**: extend `src/db/seed.ts` so the workflow has something real to do. `npm run db:reset`.
9. **E2E** (`e2e/app.spec.ts`, copy the existing tests): add the page to `PAGES` (load + click audit), and one journey
   test for the workflow: the happy path asserted on what the user sees, plus one refused case. Use roles and visible
   text (`getByRole`, `getByText`), never CSS classes. Run `npx playwright test -g "<name>"`.
10. **Verify**: `npm run check`, then `git commit`.

Interactive elements: a chart click handler goes on the shape (`<Bar onClick={(_, index) => …}>`), never on the chart
(`<BarChart onClick>` reads the hovered item: wrong target or dead on touch). A button that cannot act is `disabled`,
never a silent no-op. Anything with `cursor-pointer` must be a real link or button.

If a step fails twice, cut the slice smaller instead of looping.
