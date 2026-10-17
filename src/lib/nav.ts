import { BookOpenIcon, LayoutDashboardIcon, ListPlusIcon, ListTodoIcon, type LucideIcon } from "lucide-react"

// Single source for sidebar, command palette and "g <key>" shortcuts. Add one line per new page.
export const NAV: { href: string; label: string; icon: LucideIcon; shortcut: string }[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboardIcon, shortcut: "g d" },
  { href: "/tasks", label: "Tâches", icon: ListTodoIcon, shortcut: "g t" },
  { href: "/tasks/batch", label: "Saisie rapide", icon: ListPlusIcon, shortcut: "g s" },
  { href: "/about", label: "Méthodologie", icon: BookOpenIcon, shortcut: "g m" },
]
