"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { CollapsibleNavItem } from "./collapsible-nav-item"
import { Skeleton } from "@/components/ui/skeleton"

interface SidebarProps {
  version?: string
}

export function Sidebar({ version = "v5.7" }: SidebarProps) {
  const [nav, setNav] = useState<NavItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setNav(null) // Reset on version change
    setError(null)

    fetch(`/api/docs-nav?version=${version}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json()
          throw new Error(body.error || "Failed to fetch navigation")
        }
        return res.json()
      })
      .then((data: NavItem[]) => {
        if (mounted) setNav(data)
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message)
          setNav([])
        }
      })

    return () => {
      mounted = false
    }
  }, [version])

  const renderNav = () => {
    if (nav === null) {
      // Loading state
      return (
        <div className="space-y-2 px-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-5/6" />
        </div>
      )
    }
    if (error) {
      return <p className="px-3 text-sm text-red-500">{error}</p>
    }
    if (nav.length === 0) {
      return <p className="px-3 text-sm text-gray-500">No documentation found for this version.</p>
    }
    return nav.map((item) => <CollapsibleNavItem key={item.href} item={item} />)
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 hidden lg:block">
      <div className="h-full py-6 px-4 overflow-y-auto">
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
        <nav className="space-y-1">{renderNav()}</nav>
      </div>
    </aside>
  )
}
