import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps {
  path: string[]
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400">
      <Link href="/docs" className="hover:text-slate-700 dark:hover:text-slate-300">
        Docs
      </Link>
      {path.map((segment, index) => {
        const href = `/docs/${path.slice(0, index + 1).join("/")}`
        const isLast = index === path.length - 1
        return (
          <span key={segment} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1" />
            {isLast ? (
              <span className="font-medium text-slate-700 dark:text-slate-300">{segment.replace(/-/g, " ")}</span>
            ) : (
              <Link href={href} className="hover:text-slate-700 dark:hover:text-slate-300 capitalize">
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
