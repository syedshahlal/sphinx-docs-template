import Link from "next/link"
import { Home, BookText, Code2, LayoutGrid, FileText, PenSquare } from "lucide-react"

export function Sidebar() {
  const mainNavigation = [
    { name: "User Guide", href: "/user-guide", icon: BookText },
    { name: "API Reference", href: "/api-reference", icon: Code2 },
    { name: "Examples", href: "/examples", icon: LayoutGrid },
    { name: "Create Doc", href: "/markdown-editor", icon: PenSquare },
    { name: "Changelog", href: "/changelog", icon: FileText },
  ]

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
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-slate-500" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
