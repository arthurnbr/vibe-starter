---
name: demo-ready
description: >-
  Freeze and verify the final state before a demo (minutes 28-32): no new features, restart the server after reset,
  walk every brief line, make /about and DEMO.md true, then run the final gate. Use when the timeline reaches the
  freeze phase, or when the user says demo, wrap up, finish.
---

# Demo ready (freeze, then verify the state you will show)

0. **Should already be done at minute 5–8**: the `tasks` example is removed everywhere — `src/features/tasks`,
   `src/app/tasks/**`, imports in `src/app/page.tsx`, `src/lib/nav.ts`, `src/lib/search.ts`, palette `ACTIONS`,
   the `tasks` table in `src/db/schema.ts`, `src/db/seed.ts`. If not, do it first.
1. No new features from here. Only fixes.
2. Update `src/app/about/page.tsx` (STACK with rejected alternatives, CHOICES, LIMITS, how AI output was checked)
   and write `DEMO.md`. Every claim must match the code: no feature that was removed, no guarantee without a test.
3. Run `npx tsx scripts/check-invariants.ts` (see `data-integrity`); all PASS.
4. Stop the dev server → `npm run db:reset` → start the dev server again.
5. Walk every brief line and every workflow in the browser, including one rejected case each, at the current time
   of day (do not script the demo around a specific hour: "today", "late", "full" depend on now).
6. `npm run verify` (check + build) as the very last command. If anything changes after it, run it again.
7. Commit. Stop every server you started.

`DEMO.md`:
- **Storyline** = the persona's new day, 6–8 beats; each beat names the before → after and what to click.
- **Brief coverage** table.
- **Proof**: which script proves which invariant.
- **AI usage**: concrete cases where AI output was corrected or rejected (file, what was wrong, how it was caught).
- **Limits / phase 2** with reasons.
