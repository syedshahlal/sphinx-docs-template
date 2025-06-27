"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { cn } from "@/lib/utils"

interface CollapsibleNavItemProps {
  item: NavItem
  level?: number
}

export function CollapsibleNavItem({ item, level = 0 }: CollapsibleNavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(pathname.startsWith(item.href))

  const isActive = pathname === item.href

  if (!item.items || item.items.length === 0) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center py-2 text-sm rounded-md transition-colors",
          isActive
            ? "font-semibold text-blue-600 dark:text-blue-400"
            : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800",
        )}
        style={{ paddingLeft: `${0.75 + level * 1}rem` }}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full py-2 text-sm rounded-md transition-colors",
          "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800",
        )}
        style={{ paddingLeft: `${0.75 + level * 1}rem` }}
      >
        <span className={cn("font-medium", pathname.startsWith(item.href) && "text-blue-600 dark:text-blue-400")}>
          {item.title}
        </span>
        <ChevronRight className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "rotate-90")} />
      </button>
      {isOpen && (
        <div className="mt-1 space-y-1">
          {item.items.map((child) => (
            <CollapsibleNavItem key={child.href} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
