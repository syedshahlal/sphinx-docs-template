"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BankChip } from "@/components/ui/bank-chip"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Search, Menu, Sun, Moon, BookOpen, Code, Zap, Users, Bell, GitBranch, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const theme = isDarkMode ? "dark" : "light"

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const navigationItems = [
    {
      title: "User Guide",
      href: "/user-guide",
      description: "Complete guide to using the GRA Core Platform",
      icon: BookOpen,
      items: [
        { title: "Getting Started", href: "/user-guide/getting-started" },
        { title: "Installation", href: "/user-guide/installation" },
        { title: "Configuration", href: "/user-guide/configuration" },
        { title: "Best Practices", href: "/user-guide/best-practices" },
      ],
    },
    {
      title: "API Reference",
      href: "/api-reference",
      description: "Comprehensive API documentation and examples",
      icon: Code,
      items: [
        { title: "Authentication", href: "/api-reference/auth" },
        { title: "Endpoints", href: "/api-reference/endpoints" },
        { title: "SDKs", href: "/api-reference/sdks" },
        { title: "Rate Limits", href: "/api-reference/rate-limits" },
      ],
    },
    {
      title: "Examples",
      href: "/examples",
      description: "Code examples and tutorials",
      icon: Zap,
      items: [
        { title: "Quick Start", href: "/examples/quickstart" },
        { title: "Integration Examples", href: "/examples/integrations" },
        { title: "Use Cases", href: "/examples/use-cases" },
        { title: "Sample Projects", href: "/examples/projects" },
      ],
    },
    {
      title: "Community",
      href: "/community",
      description: "Connect with other developers",
      icon: Users,
      items: [
        { title: "Discord", href: "/community/discord" },
        { title: "GitHub", href: "/community/github" },
        { title: "Forums", href: "/community/forums" },
        { title: "Events", href: "/community/events" },
      ],
    },
  ]

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-900/5 dark:bg-slate-900/85 dark:border-slate-700/60 dark:shadow-slate-900/20"
          : "bg-white/95 border-b border-slate-200/40 dark:bg-slate-900/95 dark:border-slate-700/40"
      }`}
    >
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center h-16 w-full">
          {/* Logo and Title - Extreme Left */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <BankChip className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-gray-900 dark:text-white leading-tight">GRA Core Platform</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Documentation</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger
                      className={`h-9 px-3 ${
                        isActiveLink(item.href)
                          ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4">
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                        <div className="grid gap-1">
                          {item.items.map((subItem) => (
                            <NavigationMenuLink key={subItem.href} asChild>
                              <Link
                                href={subItem.href}
                                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                  isActiveLink(subItem.href)
                                    ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                type="search"
                placeholder="Search docs..."
                className={`pl-10 pr-12 w-72 h-10 text-sm transition-all duration-300 rounded-lg border-2 ${
                  theme === "dark"
                    ? "bg-slate-900/80 border-slate-600 text-slate-100 placeholder-slate-400 focus:bg-slate-800 focus:border-blue-400 hover:border-slate-500 focus:ring-2 focus:ring-blue-400/20"
                    : "bg-white/90 border-slate-200 text-slate-900 placeholder-slate-500 focus:bg-white focus:border-blue-500 hover:border-slate-300 focus:ring-2 focus:ring-blue-500/20"
                } backdrop-blur-sm shadow-sm focus:shadow-lg`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <kbd
                  className={`px-2 py-1 text-xs font-medium rounded border transition-colors ${
                    theme === "dark"
                      ? "text-slate-300 bg-slate-700/90 border-slate-500 shadow-sm"
                      : "text-slate-600 bg-slate-50 border-slate-300 shadow-sm"
                  }`}
                >
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className={`relative h-10 w-10 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100 hover:shadow-lg hover:shadow-slate-900/20 active:bg-slate-600"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:shadow-md hover:shadow-slate-200/50 active:bg-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse border-none border-nonepx] border-none border-none" />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`relative h-10 w-10 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100 hover:shadow-lg hover:shadow-slate-900/20 active:bg-slate-600"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:shadow-md hover:shadow-slate-200/50 active:bg-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
                  ) : (
                    <Moon className="h-5 w-5 rotate-0 scale-100 transition-all" />
                  )}
                </div>
              </Button>

              {/* GitHub/Repository Link */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className={`relative h-10 w-10 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100 hover:shadow-lg hover:shadow-slate-900/20 active:bg-slate-600"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:shadow-md hover:shadow-slate-200/50 active:bg-slate-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                aria-label="Repository"
              >
                <Link href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                  <GitBranch className="h-5 w-5" />
                </Link>
              </Button>

              {/* Divider */}
              <div className={`w-px h-6 mx-1 ${theme === "dark" ? "bg-slate-600/60" : "bg-slate-300/60"}`} />

              {/* User Avatar/Profile */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-10 px-3 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100 hover:shadow-lg hover:shadow-slate-900/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 hover:shadow-md hover:shadow-slate-200/50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">U</span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">User</span>
                </div>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden h-10 w-10 rounded-lg transition-all duration-200 ${
                theme === "dark"
                  ? "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-lg"
                  : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 hover:shadow-md"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
