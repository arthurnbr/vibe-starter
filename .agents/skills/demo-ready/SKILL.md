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
3. `npm run invariants`: all PASS.
4. `npm run e2e`: all green. It resets the DB, builds, and runs on its own port, so it tests exactly what is demoed:
   every page loads without console error, **every clickable element on every page does something** (no dead or
   misrouted click), and every workflow journey passes. A red click audit is a demo bug: fix it, never skip it.
5. Stop the dev server, then `npm run demo` (reset + production build + `next start` on all interfaces): **demo the
   production build**, not `next dev`. Open it once **from another device or the machine's network IP**, not only
   localhost, and click a button and a chart bar: the page must react. Look at the landing page and the main workflow
   at the current time of day ("today", "late", "full" depend on now).
6. `npm run verify` as the very last command. If anything changes after it, run 3–6 again.
7. Commit. Stop every server you started.

`DEMO.md`:
- **Storyline** = the persona's new day, 6–8 beats; each beat names the before → after and what to click.
- **Brief coverage** table.
- **Proof**: which script proves which invariant.
- **AI usage**: concrete cases where AI output was corrected or rejected (file, what was wrong, how it was caught).
- **Limits / phase 2** with reasons.
