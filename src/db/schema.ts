import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const TASK_STATUSES = ["todo", "doing", "done"] as const
export const TASK_PRIORITIES = ["low", "medium", "high"] as const

export const tasks = sqliteTable("tasks", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  status: text({ enum: TASK_STATUSES }).notNull().default("todo"),
  priority: text({ enum: TASK_PRIORITIES }).notNull().default("medium"),
  estimateHours: integer().notNull().default(1),
  createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
})

export type Task = typeof tasks.$inferSelect
