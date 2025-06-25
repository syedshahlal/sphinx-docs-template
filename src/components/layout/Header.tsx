"use client"

import { Moon, Sun, Menu, Search } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

interface HeaderProps {
  onMenuToggle: () => void
  isMobileMenuOpen: boolean
}

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <button
          onClick={onMenuToggle}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="mr-4 hidden lg:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">GRA Core Platform</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search documentation..."
                className="h-9 w-full rounded-md border border-input bg-background px-8 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:w-[300px]"
              />
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}
