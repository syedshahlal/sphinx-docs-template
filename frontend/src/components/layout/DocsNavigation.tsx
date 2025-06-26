"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Search, X, Menu } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { DocsNavigationItem } from "./DocsNavigationItem"
import Link from "next/link" // For logo link

interface DocsNavigationProps {
  navItems: NavItem[]
  currentVersion: string
  availableVersions: string[]
  onVersionChange: (version: string) => void
}

export const DocsNavigation: React.FC<DocsNavigationProps> = ({
  navItems,
  currentVersion,
  // availableVersions, // For future version switcher
  // onVersionChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const filteredNavItems = useMemo(() => {
    if (!searchQuery) return navItems
    const lowerQuery = searchQuery.toLowerCase()

    function filterItems(items: NavItem[]): NavItem[] {
      return items.reduce((acc, item) => {
        const titleMatches = item.title.toLowerCase().includes(lowerQuery)
        if (titleMatches) {
          // If title matches, include the item and all its children
          acc.push(item)
        } else if (item.children) {
          // If title doesn't match, check children
          const filteredChildren = filterItems(item.children)
          if (filteredChildren.length > 0) {
            // If children match, include the item with its filtered children
            acc.push({ ...item, children: filteredChildren })
          }
        }
        return acc
      }, [] as NavItem[])
    }
    return filterItems(navItems)
  }, [navItems, searchQuery])

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-3.5 left-3.5 z-[60] p-2.5 bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[9998] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          flex flex-col transition-transform duration-300 ease-in-out z-[9999]
          lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 
          ${isMobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-label="Documentation Navigation"
      >
        <div className="p-4 h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-sm group-hover:opacity-90 transition-opacity">
              📚
            </div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              GRA Docs
            </h2>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 -mr-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          {/* Version Switcher Placeholder - TODO: Implement fully */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Version:</div>
          <select
            value={currentVersion}
            // onChange={(e) => onVersionChange(e.target.value)}
            disabled // Enable when onVersionChange is implemented
            className="w-full p-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={currentVersion}>{currentVersion.toUpperCase()}</option>
            {/* {availableVersions.filter(v => v !== currentVersion).map(v => (
              <option key={v} value={v}>{v.toUpperCase()}</option>
            ))} */}
          </select>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-9 pr-3 py-2 text-sm
                bg-gray-50 dark:bg-gray-800 
                border border-gray-300 dark:border-gray-600
                rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-500
                text-gray-900 dark:text-gray-100 
                placeholder-gray-500 dark:placeholder-gray-400
              "
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
          {filteredNavItems.length > 0 ? (
            filteredNavItems.map((item) => <DocsNavigationItem key={item.path} item={item} level={0} />)
          ) : (
            <p className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No items match your filter.</p>
          )}
        </nav>
      </aside>
    </>
  )
}
