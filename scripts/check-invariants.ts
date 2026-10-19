// Proof script: tries each forbidden case and prints PASS/FAIL. Replace the cases with the real domain's invariants.
// `npm run invariants` copies data/app.db to /tmp and sets DB_FILE: import `db` from "../src/db" and the write
// functions from `write.ts` as the server actions do; they all hit the copy. The demo DB is never touched, so the
// script gives the same result every time it runs.
import { eq } from "drizzle-orm"
import { db } from "../src/db"
import { tasks } from "../src/db/schema"
import { taskBatchInput } from "../src/features/tasks/batch"
import { taskInput } from "../src/features/tasks/validation"

if (!process.env.DB_FILE) throw new Error("Run through `npm run invariants` (works on a copy of the DB)")
let failed = 0

function expect(name: string, rejected: boolean) {
  console.log(`${rejected ? "PASS" : "FAIL"}  ${name}`)
  if (!rejected) failed++
}
function throws(fn: () => unknown) {
  try {
    fn()
    return false
  } catch {
    return true
  }
}

expect("zod: titre d'1 caractère refusé", !taskInput.safeParse({ title: "x", status: "todo", priority: "low", estimateHours: 1 }).success)
expect("zod: estimation 0 refusée", !taskInput.safeParse({ title: "ok", status: "todo", priority: "low", estimateHours: 0 }).success)
expect("zod: lot vide refusé", !taskBatchInput.safeParse({ lines: [] }).success)
expect("SQL: statut hors liste refusé", throws(() => db.insert(tasks).values({ title: "x", status: "bogus" as never }).run()))
expect("SQL: estimation 500 refusée", throws(() => db.insert(tasks).values({ title: "x", estimateHours: 500 }).run()))

const before = db.select().from(tasks).all().length
expect(
  "transaction: une ligne invalide annule tout le lot",
  throws(() =>
    db.transaction((tx) => {
      tx.insert(tasks).values({ title: "valide" }).run()
      tx.insert(tasks).values({ title: "invalide", estimateHours: -1 }).run()
    }),
  ) && db.select().from(tasks).all().length === before,
)
expect("update d'une ligne disparue: 0 changement détecté", db.update(tasks).set({ title: "x" }).where(eq(tasks.id, -1)).run().changes === 0)

console.log(failed ? `\n${failed} invariant(s) NON garanti(s)` : "\nTous les invariants tiennent")
process.exit(failed ? 1 : 0)
