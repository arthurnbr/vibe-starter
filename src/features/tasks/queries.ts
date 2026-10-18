import "server-only"
import { and, count, desc, eq, inArray, like, sql, sum } from "drizzle-orm"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { searchKey } from "@/lib/text"
import { OPEN_STATUSES, type taskFilters } from "./validation"
import type { z } from "zod"

// Accent- and case-insensitive: "ete" finds "Été" (search_key is registered in src/db/index.ts).
const titleMatches = (q: string) => like(sql`search_key(${tasks.title})`, `%${searchKey(q)}%`)

export function listTasks({ q, status }: z.infer<typeof taskFilters>) {
  const statusFilter = status === "open" ? inArray(tasks.status, OPEN_STATUSES) : status ? eq(tasks.status, status) : undefined
  return db
    .select()
    .from(tasks)
    .where(and(q ? titleMatches(q) : undefined, statusFilter))
    .orderBy(desc(tasks.createdAt))
    .all()
}

export function searchTasks(q: string) {
  return db.select({ title: tasks.title, status: tasks.status }).from(tasks).where(titleMatches(q)).limit(5).all()
}

export function getTaskStats() {
  const byStatus = db
    .select({ status: tasks.status, count: count(), hours: sum(tasks.estimateHours).mapWith(Number) })
    .from(tasks)
    .groupBy(tasks.status)
    .all()
  return {
    byStatus,
    total: byStatus.reduce((acc, row) => acc + row.count, 0),
    openHours: byStatus.filter((row) => (OPEN_STATUSES as readonly string[]).includes(row.status)).reduce((acc, row) => acc + row.hours, 0),
  }
}
