import { z } from "zod"
import { taskInput } from "./validation"

export const MAX_BATCH_LINES = 50

// Reference for batch screens: typed payload (not FormData), each line carries its client key so errors stay
// attached to the right row even after rows are removed; validated per line, written in one transaction.
export const taskBatchInput = z.object({
  lines: z
    .array(taskInput.extend({ key: z.number().int() }))
    .min(1, "Ajoutez au moins une ligne")
    .max(MAX_BATCH_LINES, `${MAX_BATCH_LINES} lignes maximum`),
})

export type BatchState = {
  ok: boolean
  message?: string
  // line key → field → first error message
  lineErrors?: Record<number, Record<string, string>>
}
