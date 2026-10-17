import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { AppShell } from "@/components/app-shell"
import "./globals.css"

// Fonts ship in node_modules (package `geist`): no network needed at build/dev time.

export const metadata: Metadata = { title: "Starter", description: "Vibe-coding interview starter" }

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
