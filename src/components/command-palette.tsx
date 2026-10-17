"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MoonIcon, PlusIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useDebounce } from "@/hooks/use-debounce"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { useHotkeys } from "@/hooks/use-hotkey"
import { NAV } from "@/lib/nav"
import { searchEverything, type SearchHit } from "@/lib/search"

// Global actions: add one entry per "create"/"export" a feature exposes.
const ACTIONS = [{ label: "Nouvelle tâche", href: "/tasks?new=1", icon: PlusIcon, shortcut: "n" }]

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [query, setQuery] = useState("")
  const [hits, setHits] = useState<SearchHit[]>([])
  const [, startTransition] = useTransition()
  const debounced = useDebounce(query, 150)

  useHotkeys({
    "mod+k": () => setOpen(!open),
    ...Object.fromEntries(ACTIONS.map((action) => [action.shortcut, () => router.push(action.href)])),
  })
  useEffect(() => {
    startTransition(async () => setHits(await searchEverything(debounced)))
  }, [debounced])

  const run = (fn: () => void) => {
    setOpen(false)
    setQuery("")
    fn()
  }
  const groups = Object.groupBy(hits, (hit) => hit.group)

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Rechercher une page, une action, une donnée…" value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>Aucun résultat.</CommandEmpty>
          {Object.entries(groups).map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items?.map((hit) => (
                <CommandItem
                  key={hit.href + hit.label}
                  value={`${query} ${group} ${hit.label}`}
                  onSelect={() => run(() => router.push(hit.href))}
                >
                  {hit.label}
                  {hit.hint && <CommandShortcut>{hit.hint}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          <CommandGroup heading="Actions">
            {ACTIONS.map((action) => (
              <CommandItem key={action.label} onSelect={() => run(() => router.push(action.href))}>
                <action.icon />
                {action.label}
                <CommandShortcut>{action.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
            <CommandItem onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}>
              <MoonIcon />
              Basculer le thème
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Navigation">
            {NAV.map((item) => (
              <CommandItem key={item.href} onSelect={() => run(() => router.push(item.href))}>
                <item.icon />
                {item.label}
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
