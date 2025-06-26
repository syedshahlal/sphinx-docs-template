import type React from "react"

interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title = "Documentation" }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>
    </header>
  )
}

export default Header
