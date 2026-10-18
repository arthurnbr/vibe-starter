import { sql } from "drizzle-orm"
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const TASK_STATUSES = ["todo", "doing", "done"] as const
export const TASK_PRIORITIES = ["low", "medium", "high"] as const

// Drizzle `text({ enum })` is TypeScript-only: the CHECKs make SQLite enforce the same rules as zod.
const inList = (values: readonly string[]) => sql.raw(values.map((v) => `'${v}'`).join(", "))

export const tasks = sqliteTable(
  "tasks",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    status: text({ enum: TASK_STATUSES }).notNull().default("todo"),
    priority: text({ enum: TASK_PRIORITIES }).notNull().default("medium"),
    estimateHours: integer().notNull().default(1),
    createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    check("tasks_status_valid", sql`${t.status} in (${inList(TASK_STATUSES)})`),
    check("tasks_priority_valid", sql`${t.priority} in (${inList(TASK_PRIORITIES)})`),
    check("tasks_estimate_range", sql`${t.estimateHours} between 1 and 100`),
  ],
)

export type Task = typeof tasks.$inferSelect
