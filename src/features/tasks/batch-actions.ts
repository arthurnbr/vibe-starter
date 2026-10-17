"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { taskBatchInput, type BatchState } from "./batch"

export async function createTasksBatch(input: unknown): Promise<BatchState> {
  const parsed = taskBatchInput.safeParse(input)
  if (!parsed.success)
    return {
      ok: false,
      message: "Certaines lignes sont invalides",
      lineErrors: Object.fromEntries(parsed.error.issues.map((issue) => [issue.path.join("."), issue.message])),
    }

  // All or nothing: one invalid line (or a DB constraint) rolls back the whole batch.
  db.transaction((tx) => {
    for (const line of parsed.data.lines) tx.insert(tasks).values(line).run()
  })

  revalidatePath("/", "layout")
  return { ok: true, message: `${parsed.data.lines.length} tâche(s) créée(s)` }
}
