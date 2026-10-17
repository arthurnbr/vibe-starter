import type { z } from "zod"

export type ActionState = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
  // Echoed back on error: React 19 resets uncontrolled forms after an action, this refills them.
  values?: Record<string, string>
}

export const initialActionState: ActionState = { ok: false }

export function formValues(formData: FormData): Record<string, string> {
  return Object.fromEntries([...formData].filter(([, v]) => typeof v === "string")) as Record<string, string>
}

export function invalid(error: z.ZodError, values?: Record<string, string>): ActionState {
  return { ok: false, fieldErrors: error.flatten().fieldErrors, values }
}
