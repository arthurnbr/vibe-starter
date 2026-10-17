---
name: data-integrity
description: Enforce invariants on writes that touch derived or counter values (stock, balance, quantity, totals, reversals/undo). Use whenever a mutation updates one row based on another, or a rule like "never negative", "unique", or "cannot cancel twice" appears.
---

# Data integrity on writes

1. **One transaction per business operation.** With better-sqlite3, `db.transaction((tx) => { ... })` is synchronous: no `await` inside. Read, check, write in the same callback.
2. **Check then write inside the transaction.** Read with `tx`, compute, reject if an invariant breaks, then write. Never check in one request and write in another.
3. **Atomic conditional update for counters**:
   `tx.update(t).set({ qty: sql`${t.qty} + ${delta}` }).where(and(eq(t.id, id), gte(sql`${t.qty} + ${delta}`, 0))).run()`; `changes === 0` means rejected.
4. **Back invariants with the DB when cheap**: `unique()` on natural keys, `check()` constraints (`qty >= 0`), `notNull`, foreign keys (enabled in `src/db/index.ts`).
5. **Append-only history.** Movements/events are never edited. Undo = compensating write in the same transaction, guarded so it cannot happen twice (e.g. `cancelledAt` set once).
6. **Translate failures**: unique violation → field error ("SKU déjà utilisé"); invariant → `{ ok: false, message }` in French saying what to do.
7. **Archive, don't delete,** rows referenced by history (`archivedAt`). Lists hide archived rows by default.

Verify: a throwaway script or curl sequence trying the forbidden case (remove more than in stock, cancel twice, duplicate SKU) and confirming rejection with data unchanged.
