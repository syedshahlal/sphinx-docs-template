"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import type { NavItem } from "@/lib/docs-navigation"
import { cn } from "@/lib/utils"

interface CollapsibleNavItemProps {
  item: NavItem
}

export default function CollapsibleNavItem({ item }: CollapsibleNavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(pathname.startsWith(item.href))

  const hasChildren = item.items && item.items.length > 0
  const isActive = pathname === item.href

  return (
    <div>
      <div className="flex items-center">
        {hasChildren && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 -ml-7 mr-1">
            <ChevronRight
              className={cn("h-4 w-4 text-gray-500 transition-transform duration-200", isOpen && "rotate-90")}
            />
          </button>
        )}
        <Link
          href={item.href}
          className={cn(
            "block w-full py-1 text-sm rounded-md",
            isActive
              ? "font-semibold text-sky-500"
              : "text-slate-900 dark:text-slate-50 hover:bg-gray-100 dark:hover:bg-slate-800",
            !hasChildren && "ml-0",
          )}
        >
          {item.title}
        </Link>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 dark:border-slate-800 pl-4">
          {item.items?.map((child) => (
            <CollapsibleNavItem key={child.href} item={child} />
          ))}
        </div>
      )}
    </div>
  )
}
