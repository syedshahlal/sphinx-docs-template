"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"

interface DocsNavigationItemProps {
  item: NavItem
  level: number
}

export const DocsNavigationItem: React.FC<DocsNavigationItemProps> = ({ item, level }) => {
  const pathname = usePathname()
  const router = useRouter() // For programmatic navigation if needed

  // An item is active if its path matches the current pathname.
  // For folders with an index page, item.path will be /docs/version/folder-name.
  // For pages, item.path will be /docs/version/folder-name/page-name.
  const isActive = pathname === item.path || pathname === `${item.path}/`

  // A parent is active if not directly active, has children, and current path starts with item's path.
  const isParentActive = !isActive && item.children && item.children.length > 0 && pathname.startsWith(item.path + "/")

  const [isExpanded, setIsExpanded] = useState(isActive || isParentActive)

  useEffect(() => {
    // Auto-expand if navigating to a child page
    if (isParentActive) {
      setIsExpanded(true)
    }
  }, [pathname, item.path, isParentActive])

  const hasChildren = item.children && item.children.length > 0

  // Determine the href for the link
  // If it's a page (isPage=true), link to item.path.
  // If it's a folder without its own page (isPage=false) but has children, link to the first child.
  // If it's a folder without its own page and no children (shouldn't happen with current logic), link to item.path (might 404).
  const linkHref = item.isPage ? item.path : hasChildren ? item.children![0].path : item.path

  const handleItemClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault() // Prevent Link's default navigation for folders
      setIsExpanded(!isExpanded)
      // If it's a folder that doesn't have its own page (e.g. no index.md)
      // and we are not already on a child of this folder, navigate to the first child.
      if (!item.isPage && !pathname.startsWith(item.path + "/")) {
        router.push(linkHref) // Navigate to first child or its defined path
      } else if (item.isPage && pathname !== item.path) {
        // If it IS a page (e.g. folder with index.md) and we are not on it, navigate to it.
        router.push(item.path)
      }
    }
    // If it's a simple page (not a folder), Link component handles navigation.
  }

  const itemContent = (
    <>
      <span className="flex-1 truncate" title={item.title}>
        {item.title}
      </span>
      {hasChildren &&
        (isExpanded ? (
          <ChevronDown size={16} className="ml-auto opacity-70 flex-shrink-0" />
        ) : (
          <ChevronRight size={16} className="ml-auto opacity-70 flex-shrink-0" />
        ))}
    </>
  )

  return (
    <div className="text-sm">
      <Link
        href={linkHref}
        onClick={handleItemClick}
        className={`
          flex items-center w-full py-1.5 rounded-md transition-colors duration-150 group
          hover:bg-gray-100 dark:hover:bg-gray-700/50
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400
          ${isActive ? "font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" : "text-gray-600 dark:text-gray-300"}
          ${isParentActive ? "font-medium text-blue-600 dark:text-blue-400" : ""}
        `}
        style={{ paddingLeft: `${level * 16 + 12}px`, paddingRight: "12px" }}
        aria-current={isActive ? "page" : undefined}
      >
        {itemContent}
      </Link>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <DocsNavigationItem key={child.path} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
