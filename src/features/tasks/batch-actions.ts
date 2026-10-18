"use server"

import { omit } from "es-toolkit"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { taskBatchInput, type BatchState } from "./batch"

export async function createTasksBatch(input: unknown): Promise<BatchState> {
  const parsed = taskBatchInput.safeParse(input)
  if (!parsed.success) {
    const lines = Array.isArray((input as { lines?: unknown })?.lines) ? (input as { lines: { key?: number }[] }).lines : []
    const lineErrors: NonNullable<BatchState["lineErrors"]> = {}
    let global: string | undefined
    for (const issue of parsed.error.issues) {
      const [root, index, field] = issue.path
      const key = typeof index === "number" ? lines[index]?.key : undefined
      if (root === "lines" && key !== undefined && typeof field === "string") (lineErrors[key] ??= {})[field] ??= issue.message
      else global ??= issue.message
    }
    return { ok: false, message: global ?? "Certaines lignes sont invalides", lineErrors }
  }

  // All or nothing: one invalid line (or a DB constraint) rolls back the whole batch.
  db.transaction((tx) => {
    for (const line of parsed.data.lines) tx.insert(tasks).values(omit(line, ["key"])).run()
  })

  revalidatePath("/", "layout")
  return { ok: true, message: `${parsed.data.lines.length} tâche(s) créée(s)` }
}
