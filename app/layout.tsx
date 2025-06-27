import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GRA Core Platform Documentation",
  description:
    "Enterprise-grade data processing and analytics platform for Bank of America's global risk analytics needs.",
  keywords: ["GRA", "Core Platform", "Bank of America", "Data Processing", "Analytics", "Risk Management"],
  authors: [{ name: "GRA Core Platform Team" }],
  creator: "Bank of America",
  publisher: "Bank of America",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "GRA Core Platform Documentation",
    description: "Enterprise-grade data processing and analytics platform",
    type: "website",
    locale: "en_US",
    siteName: "GRA Core Platform",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#012169" />
        <meta name="msapplication-TileColor" content="#012169" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border bg-background">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
                        <span className="text-sm font-bold text-white">GRA</span>
                      </div>
                      <span className="font-bold text-foreground">GRA Core Platform</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade data processing and analytics platform for Bank of America.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Documentation</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="/user-guide/getting-started"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Getting Started
                        </a>
                      </li>
                      <li>
                        <a
                          href="/user-guide"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          User Guide
                        </a>
                      </li>
                      <li>
                        <a
                          href="/api-reference"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          API Reference
                        </a>
                      </li>
                      <li>
                        <a
                          href="/examples"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Examples
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Support</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="mailto:gra-support@bankofamerica.com"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Contact Support
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mattermost.bankofamerica.com/gra-core"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Community
                        </a>
                      </li>
                      <li>
                        <a
                          href="/changelog"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Changelog
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://jira.bankofamerica.com/projects/GRA"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Report Issues
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="/legal/terms"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Terms of Use
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legal/privacy"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legal/security"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Security Policy
                        </a>
                      </li>
                      <li>
                        <a
                          href="/contact"
                          className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-sm text-muted-foreground">
                      © 2024 Bank of America Corporation. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Version 5.8.0-beta</span>
                      <span>•</span>
                      <span>Built with ❤️ by GRA Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
