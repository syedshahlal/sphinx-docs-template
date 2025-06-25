"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { TableOfContents } from "./TableOfContents"
import { useComponentMount } from "../../hooks/useComponentMount"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Mount React components in Sphinx content
  useComponentMount()

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} />

      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main className="flex-1 lg:ml-64">
          <div className="flex">
            <div className="flex-1 px-4 py-6 lg:px-8">
              <div className="mx-auto max-w-4xl">{children}</div>
            </div>

            <TableOfContents />
          </div>
        </main>
      </div>
    </div>
  )
}
