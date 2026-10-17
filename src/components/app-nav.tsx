"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Tableau de bord" },
  { href: "/tasks", label: "Tâches" },
]

export function AppNav() {
  const pathname = usePathname()
  return (
    <nav className="flex gap-1">
      {links.map((link) => (
        <Button key={link.href} asChild variant={pathname === link.href ? "secondary" : "ghost"} size="sm">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  )
}
