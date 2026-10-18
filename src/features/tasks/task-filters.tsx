"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TASK_STATUSES } from "@/db/schema"
import { statusLabel } from "./labels"

const ALL_STATUSES = "all"

// Filters live in the URL: shareable, survive refresh, read by the server page. The input mirrors the URL
// (so a search launched from the palette updates it) and every write merges into the *current* URL.
export function TaskFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const urlQuery = params.get("q") ?? ""
  const [query, setQuery] = useState(urlQuery)
  const timer = useRef<number | undefined>(undefined)

  const [syncedQuery, setSyncedQuery] = useState(urlQuery)
  if (syncedQuery !== urlQuery) {
    setSyncedQuery(urlQuery)
    setQuery(urlQuery)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Each write starts from the current URL and includes the latest typed query, so a pending search is never
  // lost or overwritten by a status change made during the debounce.
  const write = (patch: Record<string, string | null>) => {
    window.clearTimeout(timer.current)
    const next = new URLSearchParams(window.location.search)
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    router.replace(`${pathname}?${next}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        className="max-w-xs"
        placeholder="Rechercher…"
        value={query}
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => write({ q: value.trim() || null }), 250)
        }}
        aria-label="Rechercher une tâche"
      />
      <Select
        value={params.get("status") ?? ALL_STATUSES}
        onValueChange={(v) => write({ q: query.trim() || null, status: v === ALL_STATUSES ? null : v })}
      >
        <SelectTrigger className="w-40" aria-label="Filtrer par statut"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_STATUSES}>Tous les statuts</SelectItem>
          {TASK_STATUSES.map((s) => <SelectItem key={s} value={s}>{statusLabel[s]}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
