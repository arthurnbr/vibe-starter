import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppNav } from "@/components/app-nav"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = { title: "Starter", description: "Vibe-coding interview starter" }

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-muted/30">
        <TooltipProvider>
          <header className="border-b bg-background">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
              <span className="font-semibold">Starter</span>
              <AppNav />
            </div>
          </header>
          <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">{children}</main>
          <Toaster richColors />
        </TooltipProvider>
      </body>
    </html>
  )
}
