---
name: demo-ready
description: Final pass before a demo: reset seed, run checks, walk every workflow, fill the /about methodology page, write DEMO.md as the persona's day. Use when the user says demo, wrap up, finish, or ~5 minutes remain.
---

# Demo ready

1. `npm run db:reset`, `npm run check`. Fix anything red first.
2. Walk every workflow and every brief line in the browser, including one rejected case each. Fix only failures.
3. Fill `src/app/about/page.tsx`: STACK (with rejected alternatives), CHOICES (the persona pains you targeted and
   why these workflows, data model, where invariants are enforced), LIMITS, how AI output was checked.
4. Remove the `tasks` example (nav, search, palette, seed, feature folder) if not done yet.
5. Write `DEMO.md`:
   - **Storyline = the persona's day**: 6–8 beats; each beat names the pain, the workflow, the time or mistake saved.
   - **Brief coverage** table.
   - **Choices & AI usage**: where AI output was corrected or rejected.
   - **Limits / next hour**.
6. Stop any dev server you started.
