"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { invalid, type ActionState } from "@/lib/action-state"
import { taskInput } from "./validation"

export async function saveTask(id: number | null, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = taskInput.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return invalid(parsed.error)

  if (id === null) db.insert(tasks).values(parsed.data).run()
  else db.update(tasks).set(parsed.data).where(eq(tasks.id, id)).run()

  revalidatePath("/", "layout")
  return { ok: true, message: id === null ? "Tâche créée" : "Tâche mise à jour" }
}

export async function deleteTask(id: number): Promise<ActionState> {
  const { changes } = db.delete(tasks).where(eq(tasks.id, id)).run()
  if (changes === 0) return { ok: false, message: "Tâche introuvable" }
  revalidatePath("/", "layout")
  return { ok: true, message: "Tâche supprimée" }
}
