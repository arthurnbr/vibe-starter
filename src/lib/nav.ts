import { BookOpenIcon, LayoutDashboardIcon, ListTodoIcon, type LucideIcon } from "lucide-react"

// Single source for sidebar, command palette and "g <key>" shortcuts. Add one line per new page.
export const NAV: { href: string; label: string; icon: LucideIcon; shortcut: string }[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboardIcon, shortcut: "g d" },
  { href: "/tasks", label: "Tâches", icon: ListTodoIcon, shortcut: "g t" },
  { href: "/about", label: "Méthodologie", icon: BookOpenIcon, shortcut: "g m" },
]
