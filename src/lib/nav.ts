import { BookOpenIcon, LayoutDashboardIcon, ListPlusIcon, ListTodoIcon, type LucideIcon } from "lucide-react"

// Single source for sidebar and command palette. Add one line per new page.
export const NAV: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboardIcon },
  { href: "/tasks", label: "Tâches", icon: ListTodoIcon },
  { href: "/tasks/batch", label: "Saisie rapide", icon: ListPlusIcon },
  { href: "/about", label: "Méthodologie", icon: BookOpenIcon },
]
