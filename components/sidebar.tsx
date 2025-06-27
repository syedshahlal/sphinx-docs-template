"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { CollapsibleNavItem } from "./collapsible-nav-item"

interface SidebarProps {
  version?: string
}

export function Sidebar({ version = "v5.7" }: SidebarProps) {
  const [nav, setNav] = useState<NavItem[] | null>(null)

  useEffect(() => {
    let mounted = true
    fetch(`/api/docs-nav?version=${version}`)
      .then((r) => r.json())
      .then((data: NavItem[]) => mounted && setNav(data))
      .catch(() => mounted && setNav([]))
    return () => {
      mounted = false
    }
  }, [version])

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 hidden lg:block">
      <div className="h-full py-6 px-4 overflow-y-auto">
        {/* HOME LINK */}
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-semibold rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
          >
            <Home className="mr-3 h-5 w-5" aria-hidden="true" />
            Home
          </Link>
        </div>

        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Documentation
        </h3>

        <nav className="space-y-1">
          {nav === null ? (
            <p className="px-3 text-sm text-gray-400">Loading…</p>
          ) : nav.length === 0 ? (
            <p className="px-3 text-sm text-gray-400">No docs found.</p>
          ) : (
            nav.map((item) => <CollapsibleNavItem key={item.href} item={item} />)
          )}
        </nav>
      </div>
    </aside>
  )
}
