"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { AppSidebar } from "@/components/app-sidebar"
import { CommandPalette } from "@/components/command-palette"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState(false)
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar onOpenPalette={() => setPalette(true)} />
          <SidebarInset>
            <header className="flex h-12 items-center gap-2 border-b px-4">
              <SidebarTrigger />
            </header>
            <main className="flex flex-col gap-6 p-6">{children}</main>
          </SidebarInset>
          <CommandPalette open={palette} setOpen={setPalette} />
          <Toaster richColors closeButton />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
