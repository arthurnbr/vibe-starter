import type { z } from "zod"

export type ActionState = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

export const initialActionState: ActionState = { ok: false }

export function invalid(error: z.ZodError): ActionState {
  return { ok: false, fieldErrors: error.flatten().fieldErrors }
}
