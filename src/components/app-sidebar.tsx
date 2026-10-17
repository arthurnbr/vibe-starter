"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MoonIcon, SearchIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Kbd } from "@/components/ui/kbd"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useHotkeys } from "@/hooks/use-hotkey"
import { NAV } from "@/lib/nav"

export function AppSidebar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  useHotkeys(Object.fromEntries(NAV.map((item) => [item.shortcut, () => router.push(item.href)])))

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">S</div>
                <span className="font-semibold">Starter</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onOpenPalette} tooltip="Rechercher (Ctrl K)">
              <SearchIcon />
              <span className="flex-1">Rechercher…</span>
              <Kbd>Ctrl K</Kbd>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span className="flex-1">{item.label}</span>
                      <Kbd>{item.shortcut}</Kbd>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} tooltip="Thème">
              {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span>Thème {resolvedTheme === "dark" ? "clair" : "sombre"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
