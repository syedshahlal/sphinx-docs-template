import type React from "react"

type Props = {
  children: React.ReactNode
  title: string
  date?: string
}

export default function PageLayout({ children, title, date }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        {date && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Published on <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
          </p>
        )}
      </header>
      {children}
    </div>
  )
}
