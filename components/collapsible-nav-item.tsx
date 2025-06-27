"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"
import { cn } from "@/lib/utils"

interface CollapsibleNavItemProps {
  item: NavItem
}

export function CollapsibleNavItem({ item }: CollapsibleNavItemProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const isActive = item.href === pathname || (item.children && item.children.some((child) => child.href === pathname))

  useEffect(() => {
    if (isActive) {
      setIsCollapsed(false)
    }
  }, [isActive])

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center w-full text-sm font-medium rounded-md px-3 py-2 transition-colors duration-150",
          pathname === item.href
            ? "bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            : "text-slate-700 dark:text-slate-300 hover:bg-gray-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        )}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "flex items-center justify-between w-full text-sm font-medium rounded-md px-3 py-2 transition-colors duration-150",
          isActive
            ? "bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            : "text-slate-700 dark:text-slate-300 hover:bg-gray-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        )}
      >
        <span>{item.title}</span>
        <ChevronRight
          className={cn("h-4 w-4 transition-transform duration-200", {
            "rotate-90": !isCollapsed,
          })}
        />
      </button>
      {!isCollapsed && (
        <div className="pl-4 mt-1 space-y-1 border-l border-gray-200 dark:border-slate-700 ml-3">
          {item.children.map((child) => (
            <CollapsibleNavItem key={child.href} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}
