"use client"

import { useState } from "react"
import { Moon, Sun, Menu, X, ChevronDown, Search, Bell, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState("v5.7")

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const versions = [
    { value: "v5.7", label: "v5.7 (Stable)", isStable: true },
    { value: "v5.8", label: "v5.8 (Beta)", isStable: false },
    { value: "v5.6", label: "v5.6 (Legacy)", isStable: false },
  ]

  const navigationItems = [
    { name: "Getting Started", href: "/user-guide/getting-started" },
    { name: "User Guide", href: "/user-guide" },
    { name: "API Reference", href: "/api-reference" },
    { name: "Examples", href: "/examples" },
    { name: "Changelog", href: "/changelog" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo and Brand */}
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
              <span className="text-sm font-bold text-white">GRA</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-foreground">GRA Core Platform</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-foreground/60 hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Version Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  {selectedVersion}
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {versions.map((version) => (
                  <DropdownMenuItem
                    key={version.value}
                    onClick={() => setSelectedVersion(version.value)}
                    className="flex items-center justify-between"
                  >
                    <span>{version.label}</span>
                    {version.isStable ? (
                      <Badge
                        variant="default"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        Stable
                      </Badge>
                    ) : version.value === "v5.8" ? (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      >
                        Beta
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400"
                      >
                        Legacy
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-8 w-8 px-0 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Theme toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-8 w-8 px-0">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur md:hidden">
          <nav className="container py-4">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 text-foreground/60 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Beta Version Warning */}
      {selectedVersion === "v5.8" && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-b border-blue-200 dark:border-blue-800">
          <div className="container py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  You're viewing beta documentation for v5.8
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVersion("v5.7")}
                className="text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 h-6 px-2 text-xs"
              >
                Switch to stable →
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
