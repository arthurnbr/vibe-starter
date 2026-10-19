---
name: data-integrity
description: >-
  Enforce invariants on writes (stock, balance, capacity, totals, statuses, reversals/undo) and avoid the traps
  that independent reviews found in previous builds: non-canonical slots, undo that cannot restore, reactivation
  that skips capacity, double submit, time-zone drift, clock-based codes, unvalidated dates. Use whenever a mutation
  depends on other rows, or a rule like "never negative", "max N per slot", "cannot cancel twice" appears.
---

# Data integrity on writes

## Core rules
1. **One transaction per business operation.** better-sqlite3 transactions are synchronous: no `await` inside.
   Read, check, write in the same callback.
2. **Check then write inside the transaction**, or use an atomic conditional update and treat `changes === 0` as rejected:
   `tx.update(t).set({ qty: sql`${t.qty} + ${delta}` }).where(and(eq(t.id, id), gte(sql`${t.qty} + ${delta}`, 0))).run()`.
3. **Back invariants with the DB**: `unique()`, `check()` (`qty >= 0`, `deposit <= total`, and enum membership:
   `check("status_valid", sql`${t.status} in ('a','b')`)` because Drizzle text enums are not SQL constraints), FKs.
4. **Append-only history**; undo is a compensating write, guarded so it cannot happen twice.
5. **Translate failures** to French field errors or `{ ok: false, message }` that say what to do next.
6. **Archive, don't delete** rows referenced by history.

## Traps seen in real builds (check each one that applies)
- **Canonical keys for capacity.** Never count "orders in [t, t+1h)" from a client timestamp: normalise to the slot
  start on the server (zero minutes, seconds, ms) and reject anything else, or store a `slot` column and count by equality.
- **Every transition that consumes capacity re-checks it**: creating, moving, *and reactivating/uncancelling*.
- **Undo restores the exact previous state** (keep `previousStatus` or pass it to the action) and is only offered when
  that transition is allowed. Destructive actions (cancel, delete) get a confirmation or an undo window of ≥ 10 s.
- **Double submit**: disable the whole form with a ref set synchronously on submit (not only `pending`), and make
  creation idempotent with a client-generated `requestId` (`newRequestId()` from `src/lib/request-id.ts`, never
  `crypto.randomUUID()`: undefined over http on a network IP) stored under a `unique()` constraint.
- **One business time zone.** Define `const TZ = "Europe/Paris"` once; build slots, "today", week and month bounds
  with it on the server. Never trust the browser's local time for business rules.
- **Human codes from a sequence** (`F-0123` from the row id or a counter), never from truncated `Date.now()`.
- **Validate calendar dates**, not just their shape: `z.iso.date()` / `isValid(parseISO(x))`, then a fallback, never a 500.
- **Upper bounds too**: max date ahead, max quantity, max lines; mirror them in the UI.
- **Normalise identifiers once**: phone → E.164 digits; text search and name uniqueness through `searchKey()`
  (`src/lib/text.ts`, also the SQL function `search_key()`): lowercase **without accents**. SQLite `lower()` leaves
  "É" untouched, so `lower(name) like` misses "Émilie". Copy `titleMatches` in `src/features/tasks/queries.ts`.
- **Statuses with distinct meanings stay distinct** in alerts and KPIs ("late to prepare" vs "ready, not collected";
  "booked revenue" vs "collected revenue"; "reserved" vs "physically out" for an occupancy rate).
- **Money already taken is never rewritten.** Editing a paid record (extend, add a line, early return) creates a
  balance to collect or refund, shown where the user acts and traced as a payment row; "encaissé" KPIs and receipts
  sum payment rows, never the recomputed total.

- **No silent overwrite of shared records**: a known phone with a different name asks "update the name or new
  contact?"; never rename every past record in passing.
- **Every fallback is explicit**: when the app cannot find a valid slot/date/stock, refuse or flag ("à replanifier")
  with a message; never keep the old value silently (`?? previousValue` on a business rule is a smell).
- **Overdue work still consumes capacity**: carry unfinished past items onto today in load computations.
- **Uniqueness races**: check-then-insert outside the transaction still races; catch the UNIQUE error and return
  the existing record instead of a 500.
- **Records stay editable until a terminal status**: lines, contact, cancel, and one step back, each traced as an event.
  Data frozen at creation (price, duration) is updated by these edits, not by catalogue changes.
- **Public URLs** (QR, SMS, tracking links) come from one `publicUrl()` reading `PUBLIC_URL`, never from the `Host` header.

## Verify (and keep the proof)
Write `scripts/check-invariants.ts` (start from the template: `npm run invariants` runs it on a **copy** of the DB
through `DB_FILE`, so it may write freely and gives the same result on every run; never point it at `data/app.db`) that:
- calls **every write path** through the same function the server action uses (extract the transaction into a
  plain function in `write.ts`, call it from both the action and the script), not raw SQL;
- tries each forbidden case (over capacity, off-by-seconds slot, reactivate/resume into a full day, undo after each
  status, simultaneous double create, invalid date, past slot, rename of a shared record);
- ends with **global assertions over the whole DB** after reset (no day above capacity, totals = sum of lines,
  every status consistent with its timestamps). If the seed violates one, fix the seed.
Print PASS/FAIL. Claims in `/about` and `DEMO.md` cite only what the script really covers.
