"use server"

import { searchTasks } from "@/features/tasks/queries"

export type SearchHit = { group: string; label: string; hint?: string; href: string }

// Global search for the command palette: add one block per entity.
export async function searchEverything(query: string): Promise<SearchHit[]> {
  const q = query.trim()
  if (q.length < 2) return []
  return [
    ...searchTasks(q).map((t) => ({ group: "Tâches", label: t.title, hint: t.status, href: `/tasks?q=${encodeURIComponent(t.title)}` })),
  ]
}
