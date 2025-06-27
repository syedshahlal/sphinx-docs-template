"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { NavItem } from "@/lib/docs-navigation"

interface Props {
  item: NavItem
  depth?: number
}
export function CollapsibleNavItem({ item, depth = 0 }: Props) {
  const [open, setOpen] = useState(depth < 1) // top-level open by default
  const hasChildren = !!item.items?.length

  return (
    <div>
      <div
        className="flex items-center cursor-pointer select-none px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="mr-2 h-4 w-4 text-gray-400" />
          ) : (
            <ChevronRight className="mr-2 h-4 w-4 text-gray-400" />
          )
        ) : (
          <span className="mr-2 w-4" /> /* space align */
        )}
        <Link href={item.href} className="flex-1 text-sm text-gray-700 dark:text-slate-300">
          {item.title}
        </Link>
      </div>

      {hasChildren && open && (
        <div className="ml-5 space-y-1">
          {item.items!.map((c) => (
            <CollapsibleNavItem key={c.href} item={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
