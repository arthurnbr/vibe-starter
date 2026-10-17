import { z } from "zod"
import { TASK_PRIORITIES, TASK_STATUSES } from "@/db/schema"

export const taskInput = z.object({
  title: z.string().trim().min(2, "2 caractères minimum").max(120),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  estimateHours: z.coerce.number().int().min(1, "Au moins 1 h").max(100),
})

export type TaskInput = z.infer<typeof taskInput>

export const taskFilters = z.object({
  q: z.string().trim().catch(""),
  status: z.enum(TASK_STATUSES).optional().catch(undefined),
})
