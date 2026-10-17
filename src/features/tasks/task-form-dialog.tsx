"use client"

import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TASK_PRIORITIES, TASK_STATUSES, type Task } from "@/db/schema"
import { initialActionState } from "@/lib/action-state"
import { saveTask } from "./actions"
import { priorityLabel, statusLabel } from "./labels"

export function TaskFormDialog({ task, trigger, defaultOpen = false }: { task?: Task; trigger: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Modifier la tâche" : "Nouvelle tâche"}</DialogTitle>
          <DialogDescription>Les champs sont validés côté serveur.</DialogDescription>
        </DialogHeader>
        {/* Remount on open so the form state resets. */}
        {open && <TaskForm task={task} onDone={() => setOpen(false)} />}
      </DialogContent>
    </Dialog>
  )
}

function TaskForm({ task, onDone }: { task?: Task; onDone: () => void }) {
  const [state, action, pending] = useActionState(saveTask.bind(null, task?.id ?? null), initialActionState)

  useEffect(() => {
    if (state.ok) {
      toast.success(state.message)
      onDone()
    } else if (state.message) toast.error(state.message)
  }, [state, onDone])

  const errors = state.fieldErrors ?? {}
  const values = { ...task, ...state.values }
  return (
    <form action={action}>
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="title">Titre</FieldLabel>
          <Input id="title" name="title" defaultValue={values.title} aria-invalid={!!errors.title} autoFocus />
          <FieldError>{errors.title?.[0]}</FieldError>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Statut</FieldLabel>
            <Select key={values.status} name="status" defaultValue={values.status ?? "todo"}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {TASK_STATUSES.map((s) => <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>Priorité</FieldLabel>
            <Select key={values.priority} name="priority" defaultValue={values.priority ?? "medium"}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {TASK_PRIORITIES.map((p) => <SelectItem key={p} value={p}>{priorityLabel[p]}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field data-invalid={!!errors.estimateHours}>
          <FieldLabel htmlFor="estimateHours">Estimation (h)</FieldLabel>
          <Input id="estimateHours" name="estimateHours" type="number" min={1} defaultValue={values.estimateHours ?? 1} aria-invalid={!!errors.estimateHours} />
          <FieldError>{errors.estimateHours?.[0]}</FieldError>
        </Field>
        <DialogFooter>
          <Button type="submit" disabled={pending}>{pending ? "Enregistrement…" : "Enregistrer"}</Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  )
}
