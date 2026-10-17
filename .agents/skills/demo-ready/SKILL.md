---
name: demo-ready
description: Final 5-minute pass before a demo: reset seed, run checks, walk the main flows, write a short demo script and trade-offs. Use when the user says demo, wrap up, finish, or time is almost over.
---

# Demo ready

1. `npm run db:reset` then `npm run check`. Fix anything red first.
2. Walk every MUST from `SPEC.md`. Fix only failures.
3. Edge states render: empty list, alert highlight, validation error, rejected invariant (toast).
4. Remove dead code, stray `console.log`, unused scaffold leftovers.
5. Write `DEMO.md`:
   - **Script**: 5–7 steps in brief order: what to click, what to point out.
   - **Choices**: stack, data model, where invariants are enforced, why (one line each).
   - **AI usage**: where AI output was corrected or rejected.
   - **Skipped / next**: what was cut, what one more hour would add.
