import type React from "react"
import { AlertTriangle } from "lucide-react"

interface WarningPanelProps {
  title: string
  children: React.ReactNode
}

export function WarningPanel({ title, children }: WarningPanelProps) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-r-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">{title}</p>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">{children}</div>
        </div>
      </div>
    </div>
  )
}
