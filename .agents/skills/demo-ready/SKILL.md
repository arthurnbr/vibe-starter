---
name: demo-ready
description: Final pass before a demo: reset seed, run checks, walk every flow, fill the /about methodology page, write DEMO.md with a narrative script. Use when the user says demo, wrap up, finish, or ~5 minutes remain.
---

# Demo ready

1. `npm run db:reset`, `npm run check`. Fix anything red first.
2. Walk every MUST and every shipped WOW feature in the browser. Fix only failures; hide nothing broken behind a link.
3. Fill `src/app/about/page.tsx`: STACK (with rejected alternatives), CHOICES (data model, where invariants are
   enforced, UX principles), LIMITS. Add the build process: brief → SPEC → slices, how AI output was checked.
4. Remove the `tasks` example if a real feature replaced it (nav, search, palette, seed, feature folder).
5. Write `DEMO.md`:
   - **Storyline** (6–8 beats from `SPEC.md`), each: what to click, which feature it shows, what to say.
   - **Feature list**: MUST and WOW, one line each.
   - **Choices & AI usage**: where AI output was corrected or rejected.
   - **Limits / next hour**.
