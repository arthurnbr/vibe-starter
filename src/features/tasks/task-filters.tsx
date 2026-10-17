"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { debounce } from "es-toolkit"
import { useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TASK_STATUSES } from "@/db/schema"
import { statusLabel } from "./labels"

const ALL = "all"

// Filters live in the URL: shareable, survive refresh, read by the server page.
export function TaskFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const setParam = useMemo(
    () => (key: string, value: string) => {
      const next = new URLSearchParams(params)
      if (value && value !== ALL) next.set(key, value)
      else next.delete(key)
      router.replace(`${pathname}?${next}`)
    },
    [params, pathname, router],
  )
  const setQuery = useMemo(() => debounce((value: string) => setParam("q", value), 250), [setParam])

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        className="max-w-xs"
        placeholder="Rechercher…"
        defaultValue={params.get("q") ?? ""}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Rechercher une tâche"
      />
      <Select value={params.get("status") ?? ALL} onValueChange={(v) => setParam("status", v)}>
        <SelectTrigger className="w-40" aria-label="Filtrer par statut"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Tous les statuts</SelectItem>
          {TASK_STATUSES.map((s) => <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
