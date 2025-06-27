"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { Search, X, Menu } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { DocsNavigationItem } from "./DocsNavigationItem"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DocsNavigationProps {
  navItems: NavItem[]
  currentVersion: string
  availableVersions: string[]
  onVersionChange: (version: string) => void
}

export const DocsNavigation: React.FC<DocsNavigationProps> = ({
  navItems,
  currentVersion,
  availableVersions,
  onVersionChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMobileOpen(false) // Close mobile nav on route change
  }, [pathname])

  useEffect(() => {
    // For debugging:
    if (process.env.NODE_ENV === "development") {
      console.log("DocsNavigation navItems:", navItems)
      if (!navItems || navItems.length === 0) {
        console.warn("DocsNavigation received empty or no navItems. Sidebar content will be minimal.")
      }
    }
  }, [navItems])

  const filteredNavItems = useMemo(() => {
    if (!searchQuery) return navItems
    const lowerQuery = searchQuery.toLowerCase()
    function filterItems(items: NavItem[]): NavItem[] {
      return items.reduce((acc, item) => {
        const titleMatches = item.title.toLowerCase().includes(lowerQuery)
        if (titleMatches) {
          acc.push({ ...item, isInitiallyOpen: true }) // Ensure parent is open if title matches
        } else if (item.children) {
          const filteredChildren = filterItems(item.children)
          if (filteredChildren.length > 0) {
            acc.push({ ...item, children: filteredChildren, isInitiallyOpen: true })
          }
        }
        return acc
      }, [] as NavItem[])
    }
    return filterItems(navItems)
  }, [navItems, searchQuery])

  // DEBUG: Add a very obvious background if it's supposed to be hidden on desktop but isn't.
  // const debugHiddenClass = "lg:bg-pink-500/50"; // Remove for production

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] p-2.5 bg-card dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg text-foreground dark:text-gray-200 border border-border dark:border-gray-700"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[9998] md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-card dark:bg-gray-900 border-r border-border dark:border-gray-700
          flex flex-col transition-transform duration-300 ease-in-out z-[50] 
          md:sticky md:top-0 md:h-screen md:flex-shrink-0 md:z-auto 
          ${isMobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full md:translate-x-0"}
          `}
        // ${debugHiddenClass} // Add this to the line above for debugging
        aria-label="Documentation Navigation"
      >
        <div className="p-4 h-16 border-b border-border dark:border-gray-700 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white font-bold text-sm group-hover:opacity-90 transition-opacity">
              📚
            </div>
            <h2 className="text-base font-semibold text-foreground dark:text-gray-100 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
              GRA Docs
            </h2>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 -mr-1 text-muted-foreground dark:text-gray-300 hover:bg-muted dark:hover:bg-gray-800 rounded-md"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-3 border-b border-border dark:border-gray-700 shrink-0">
          <label htmlFor="version-select" className="text-xs text-muted-foreground dark:text-gray-400 mb-1 block">
            Version:
          </label>
          <select
            id="version-select"
            value={currentVersion}
            onChange={(e) => onVersionChange(e.target.value)}
            className="w-full p-1.5 text-sm border border-input dark:border-gray-600 rounded-md bg-background dark:bg-gray-800 text-foreground dark:text-gray-100 focus:ring-1 focus:ring-ring focus:border-primary"
          >
            {availableVersions.map((v) => (
              <option key={v} value={v}>
                {v.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="p-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              aria-label="Filter navigation items"
              placeholder="Filter navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-9 pr-3 py-2 text-sm
                bg-muted/50 dark:bg-gray-800 
                border border-input dark:border-gray-600
                rounded-md focus:outline-none focus:ring-1 focus:ring-ring dark:focus:border-primary
                text-foreground dark:text-gray-100 
                placeholder-muted-foreground dark:placeholder-gray-400
              "
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5" aria-label="Main documentation navigation">
          {filteredNavItems && filteredNavItems.length > 0 ? ( // Added check for filteredNavItems
            filteredNavItems.map((item) => (
              <DocsNavigationItem
                key={item.path}
                item={item}
                level={0}
                isInitiallyOpen={!!searchQuery || item.isInitiallyOpen}
              />
            ))
          ) : (
            <p className="px-3 py-2 text-sm text-muted-foreground dark:text-gray-400">
              {searchQuery
                ? "No items match your filter."
                : navItems && navItems.length > 0
                  ? "Filter to see items."
                  : "No navigation items found."}
            </p>
          )}
        </nav>
      </aside>
    </>
  )
}
