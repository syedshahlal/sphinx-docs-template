"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { cn } from "@/lib/utils"

interface CollapsibleNavItemProps {
  item: NavItem
  /** Current indentation level (used internally for padding) */
  level?: number
}

/**
 * A recursive, collapsible sidebar item that renders itself
 * and any nested children in a tree structure.
 */
export function CollapsibleNavItem({ item, level = 0 }: CollapsibleNavItemProps) {
  const pathname = usePathname()

  // Section is open if:
  //  • user clicked to open it OR
  //  • current route is inside the section
  const routeIsInside = pathname.startsWith(item.href)
  const [isOpen, setIsOpen] = useState(routeIsInside)

  // Keep it open when navigating inside the section
  useEffect(() => {
    if (routeIsInside) setIsOpen(true)
  }, [routeIsInside])

  const isActive = pathname === item.href
  const hasChildren = item.items && item.items.length > 0

  /* ------------ Leaf item ------------- */
  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "block rounded-md py-1.5 pr-3 text-sm transition-colors",
          isActive
            ? "font-semibold text-sky-600 dark:text-sky-400"
            : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800",
        )}
        /* indent each level by 1 rem (≈16 px) */
        style={{ paddingLeft: `${1 + level}rem` }}
      >
        {item.title}
      </Link>
    )
  }

  /* ------------ Parent item ------------- */
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md py-1.5 pr-3 text-sm transition-colors",
          "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800",
          isActive && "font-semibold text-sky-600 dark:text-sky-400",
        )}
        style={{ paddingLeft: `${1 + level}rem` }}
      >
        <span>{item.title}</span>
        <ChevronRight
          className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-90")}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="space-y-1">
          {item.items!.map((child) => (
            <CollapsibleNavItem key={child.href} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
