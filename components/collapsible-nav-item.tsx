"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/lib/docs-navigation"

interface CollapsibleNavItemProps {
  item: NavItem
}

export function CollapsibleNavItem({ item }: CollapsibleNavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(pathname.startsWith(item.href))

  if (!item.items) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md",
          pathname === item.href
            ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-50"
            : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800",
        )}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800">
          <span className="text-left">{item.title}</span>
          <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 mt-1 space-y-1">
        {item.items.map((child) => (
          <CollapsibleNavItem key={child.href} item={child} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
