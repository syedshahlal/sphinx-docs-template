import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css" // Corrected path
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
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              GRA Core Platform
            </Link>
            <div>
              <Link href="/" className="px-3 py-2 hover:text-blue-600">
                Home
              </Link>
              <Link href="/docs/introduction" className="px-3 py-2 hover:text-blue-600">
                Docs
              </Link>
              {/* Add other nav links here */}
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="text-center py-6 text-sm text-gray-600 border-t">
          © {new Date().getFullYear()} GRA Core Platform. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
