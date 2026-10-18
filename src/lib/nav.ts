import { BookOpenIcon, LayoutDashboardIcon, ListPlusIcon, ListTodoIcon, type LucideIcon } from "lucide-react"

type NavItem = { href: string; label: string; icon: LucideIcon }

// Single source for sidebar and command palette. Add one line per new page.
export const NAV: NavItem[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboardIcon },
  { href: "/tasks", label: "Tâches", icon: ListTodoIcon },
  { href: "/tasks/batch", label: "Saisie rapide", icon: ListPlusIcon },
]

// For the jury, not the users: kept out of the main menu (sidebar footer + palette only).
export const ABOUT: NavItem = { href: "/about", label: "Méthodologie", icon: BookOpenIcon }
