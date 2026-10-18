"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TASK_PRIORITIES, type Task } from "@/db/schema"
import { createTasksBatch } from "./batch-actions"
import { MAX_BATCH_LINES, type BatchState } from "./batch"
import { priorityLabel } from "./labels"

type Line = { key: number; title: string; priority: Task["priority"]; estimateHours: number }

// Reference batch-entry screen: type → Enter adds a line and refocuses, live totals, one submit, per-line errors.
export function TaskBatchSheet() {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)
  const nextKey = useRef(0)
  const [draft, setDraft] = useState("")
  const [lines, setLines] = useState<Line[]>([])
  const [errors, setErrors] = useState<NonNullable<BatchState["lineErrors"]>>({})
  const [pending, startTransition] = useTransition()
  // Set synchronously on click: `pending` only flips on the next render, too late to stop a fast double submit.
  const submitting = useRef(false)

  const add = () => {
    const title = draft.trim()
    if (!title || lines.length >= MAX_BATCH_LINES) return
    setLines((current) => [...current, { key: nextKey.current++, title, priority: "medium", estimateHours: 1 }])
    setDraft("")
    input.current?.focus()
  }
  const update = (key: number, patch: Partial<Line>) =>
    setLines((current) => current.map((line) => (line.key === key ? { ...line, ...patch } : line)))

  const submit = () => {
    if (submitting.current) return
    submitting.current = true
    startTransition(async () => {
      const result = await createTasksBatch({ lines: lines.map((line) => ({ ...line, status: "todo" })) })
      setErrors(result.lineErrors ?? {})
      if (!result.ok) {
        submitting.current = false
        return void toast.error(result.message)
      }
      toast.success(result.message)
      router.push("/tasks")
    })
  }

  const totalHours = lines.reduce((sum, line) => sum + line.estimateHours, 0)
  return (
    // fieldset disabled locks every input while saving, so nothing typed during the request is silently lost.
    <fieldset disabled={pending} className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          ref={input}
          autoFocus
          placeholder="Titre de la tâche puis Entrée…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
        />
        {/* Disabled (not silently ignored) when there is nothing to add: a button that does nothing is a dead click. */}
        <Button variant="outline" onClick={add} disabled={!draft.trim() || lines.length >= MAX_BATCH_LINES}>Ajouter</Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead className="w-40">Priorité</TableHead>
              <TableHead className="w-32">Estimation (h)</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                  Saisissez un titre ci-dessus : chaque Entrée ajoute une ligne.
                </TableCell>
              </TableRow>
            )}
            {lines.map((line) => (
              <TableRow key={line.key}>
                <TableCell>
                  <Input value={line.title} onChange={(e) => update(line.key, { title: e.target.value })} aria-invalid={!!errors[line.key]?.title} />
                  {errors[line.key]?.title && <p className="mt-1 text-xs text-destructive">{errors[line.key].title}</p>}
                </TableCell>
                <TableCell>
                  <Select value={line.priority} onValueChange={(v) => update(line.key, { priority: v as Line["priority"] })}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TASK_PRIORITIES.map((p) => <SelectItem key={p} value={p}>{priorityLabel[p]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input type="number" min={1} value={line.estimateHours} onChange={(e) => update(line.key, { estimateHours: Number(e.target.value) })} aria-invalid={!!errors[line.key]?.estimateHours} />
                  {errors[line.key]?.estimateHours && <p className="mt-1 text-xs text-destructive">{errors[line.key].estimateHours}</p>}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" aria-label="Retirer la ligne" onClick={() => setLines((c) => c.filter((l) => l.key !== line.key))}>
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>{lines.length} / {MAX_BATCH_LINES} ligne(s)</TableCell>
              <TableCell />
              <TableCell className="tabular-nums">{totalHours} h</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button onClick={submit} disabled={pending || lines.length === 0}>
          {pending ? "Enregistrement…" : `Créer ${lines.length} tâche(s)`}
        </Button>
      </div>
    </fieldset>
  )
}
