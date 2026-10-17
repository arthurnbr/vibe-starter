import { z } from "zod"
import { taskInput } from "./validation"

// Reference for batch screens: typed payload (not FormData), validated per line, written in one transaction.
export const taskBatchInput = z.object({
  lines: z.array(taskInput).min(1, "Ajoutez au moins une ligne").max(50),
})

export type TaskBatchInput = z.infer<typeof taskBatchInput>

export type BatchState = {
  ok: boolean
  message?: string
  // keys like "lines.2.title" → first error message, shown next to the line
  lineErrors?: Record<string, string>
}
