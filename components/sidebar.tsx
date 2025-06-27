import Link from "next/link"
import { Home } from 'lucide-react'
import { generateNavFromFileSystem } from "@/lib/docs-utils"
import { CollapsibleNavItem } from "./collapsible-nav-item"

interface SidebarProps {
  version?: string
}

export async function Sidebar({ version = "v5.7" }: SidebarProps) {
  const navigation = await generateNavFromFileSystem(version)

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-slate-800 hidden lg:block">
      <div className="h-full py-6 px-4">
        <div className="mb-6">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-semibold rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
          >
            <Home className="mr-3 h-5 w-5" aria-hidden="true" />
            Home
          </Link>
        </div>
        <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Documentation
        </h3>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <CollapsibleNavItem key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}
