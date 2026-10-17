import "server-only"
import { and, count, desc, eq, like, sum } from "drizzle-orm"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import type { taskFilters } from "./validation"
import type { z } from "zod"

export function listTasks({ q, status }: z.infer<typeof taskFilters>) {
  return db
    .select()
    .from(tasks)
    .where(and(q ? like(tasks.title, `%${q}%`) : undefined, status ? eq(tasks.status, status) : undefined))
    .orderBy(desc(tasks.createdAt))
    .all()
}

export function searchTasks(q: string) {
  return db.select({ title: tasks.title, status: tasks.status }).from(tasks).where(like(tasks.title, `%${q}%`)).limit(5).all()
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
    openHours: byStatus.filter((row) => row.status !== "done").reduce((acc, row) => acc + row.hours, 0),
  }
}
