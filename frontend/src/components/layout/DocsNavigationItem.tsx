"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronRight, Folder, FileText } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation" // Ensure this path is correct

interface DocsNavigationItemProps {
  item: NavItem
  level: number
  isInitiallyOpen?: boolean // Added to control open state from search
}

export const DocsNavigationItem: React.FC<DocsNavigationItemProps> = ({ item, level, isInitiallyOpen = false }) => {
  const pathname = usePathname()
  const isActive = pathname === item.path || (item.path !== `/docs/${item.version}` && pathname.startsWith(item.path)) // More robust active check

  // Determine if the item should be open by default:
  // 1. If it's an ancestor of the active path.
  // 2. If isInitiallyOpen is true (e.g., due to search).
  const isAncestorOfActivePath =
    item.children && item.children.length > 0 && pathname.startsWith(item.path + (item.path.endsWith("/") ? "" : "/"))
  const [isOpen, setIsOpen] = useState(isInitiallyOpen || isAncestorOfActivePath || isActive)

  useEffect(() => {
    // If the item becomes an ancestor of the active path, open it.
    // Also respect isInitiallyOpen for search.
    const shouldBeOpen =
      isInitiallyOpen || isAncestorOfActivePath || (isActive && item.children && item.children.length > 0)
    if (shouldBeOpen) {
      setIsOpen(true)
    }
  }, [pathname, item.path, isActive, isAncestorOfActivePath, isInitiallyOpen, item.children])

  const hasChildren = item.children && item.children.length > 0

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent navigation if it's a button on a link
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const commonLinkClasses = `
    flex items-center justify-between w-full px-2.5 py-1.5 text-sm rounded-md
    transition-colors duration-150 ease-in-out group
  `
  const activeClasses = "bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 font-medium"
  const inactiveClasses = "text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-gray-800"

  const IconComponent = hasChildren ? Folder : FileText

  return (
    <div style={{ paddingLeft: `${level * 0.75}rem` }}>
      {" "}
      {/* Indentation based on level */}
      <Link href={item.path} passHref legacyBehavior>
        <a
          className={`${commonLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
          onClick={() => {
            if (hasChildren && !isActive) setIsOpen(true)
          }} // Open on click if it has children and isn't already active
          aria-current={isActive ? "page" : undefined}
        >
          <span className="flex items-center truncate">
            <IconComponent
              className={`mr-2.5 h-4 w-4 flex-shrink-0 ${isActive ? "text-primary dark:text-blue-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"}`}
            />
            <span className="truncate" title={item.title}>
              {item.title}
            </span>
          </span>
          {hasChildren && (
            <button
              onClick={handleToggle}
              className={`p-0.5 rounded-md hover:bg-muted-foreground/10 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
              aria-expanded={isOpen}
              aria-label={isOpen ? `Collapse ${item.title}` : `Expand ${item.title}`}
            >
              <ChevronRight size={16} />
            </button>
          )}
        </a>
      </Link>
      {hasChildren && isOpen && (
        <div className="mt-1 space-y-0.5">
          {item.children.map((child) => (
            <DocsNavigationItem key={child.path} item={child} level={level + 1} isInitiallyOpen={isInitiallyOpen} />
          ))}
        </div>
      )}
    </div>
  )
}
