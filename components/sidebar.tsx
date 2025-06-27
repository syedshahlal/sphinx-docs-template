"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Book, Loader2 } from "lucide-react"
import CollapsibleNavItem from "./collapsible-nav-item"
import type { NavItem } from "@/lib/docs-navigation"

export default function Sidebar() {
  const [navigation, setNavigation] = useState<NavItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNav() {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/docs-nav?version=v5.7")
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setNavigation(data)
      } catch (e: any) {
        console.error("Sidebar fetch error:", e.message)
        setError("Failed to load navigation.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchNav()
  }, [])

  return (
    <aside className="w-72 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 hidden lg:block">
      <div className="h-full py-6 px-4 overflow-y-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Book className="h-6 w-6 text-sky-500" />
            <span>GRA Core Docs</span>
          </Link>
        </div>

        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Documentation
        </h3>
        <nav className="space-y-1">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          )}
          {error && <div className="text-red-500 px-3 text-sm">{error}</div>}
          {!isLoading && !error && navigation.map((item) => <CollapsibleNavItem key={item.href} item={item} />)}
        </nav>
      </div>
    </aside>
  )
}
