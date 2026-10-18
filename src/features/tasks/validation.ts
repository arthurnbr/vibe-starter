import { z } from "@/lib/zod"
import { TASK_PRIORITIES, TASK_STATUSES } from "@/db/schema"
import { frenchNumber } from "@/lib/text"

export const taskInput = z.object({
  title: z.string().trim().min(2, "2 caractères minimum").max(120),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  // frenchNumber accepts "1,5" as well as "1.5"; any number field the user types goes through it.
  estimateHours: z.preprocess(frenchNumber, z.number().int("Nombre entier").min(1, "Au moins 1 h").max(100)),
})

export type TaskInput = z.infer<typeof taskInput>

// "open" = every status that still needs work; used by both the KPI and its link so they always agree.
export const OPEN_STATUSES = ["todo", "doing"] as const satisfies readonly (typeof TASK_STATUSES)[number][]

export const taskFilters = z.object({
  q: z.string().trim().catch(""),
  status: z.enum([...TASK_STATUSES, "open"]).optional().catch(undefined),
})
