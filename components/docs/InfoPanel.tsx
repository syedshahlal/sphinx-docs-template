import type React from "react"
import { Info } from "lucide-react"

interface InfoPanelProps {
  title: string
  children: React.ReactNode
}

export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-blue-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{title}</p>
          <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">{children}</div>
        </div>
      </div>
    </div>
  )
}
