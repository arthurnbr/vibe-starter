import type { Task } from "@/db/schema"

export const statusLabel: Record<Task["status"], string> = { todo: "À faire", doing: "En cours", done: "Terminé" }
export const priorityLabel: Record<Task["priority"], string> = { low: "Basse", medium: "Moyenne", high: "Haute" }
