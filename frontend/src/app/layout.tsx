import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRA Core Platform Docs",
  description: "Documentation for the GRA Core Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                GRA Core Platform
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/docs/introduction"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Docs
                </Link>
              </div>
            </nav>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
            © {new Date().getFullYear()} GRA Core Platform. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
