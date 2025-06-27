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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  BookOpen,
  Code,
  Zap,
  Users,
  FileText,
  HelpCircle,
} from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

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
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-slate-900/80 dark:border-slate-700"
          : "bg-white border-b border-gray-100 dark:border-slate-800"
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
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-64 h-9 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
              />
            </div>

            {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-9 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Link href="/create-doc">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Doc
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-9 px-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Link href="/markdown-editor">
                  <Code className="w-4 h-4 mr-2" />
                  Editor
                </Link>
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 p-0 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-4 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search docs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <div key={item.href} className="space-y-2">
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActiveLink(item.href)
                              ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.title}
                        </Link>
                        <div className="ml-7 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                                isActiveLink(subItem.href)
                                  ? "bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white"
                              }`}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Quick Actions */}
                  <div className="border-t pt-4 space-y-2">
                    <Link
                      href="/create-doc"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Create Document
                    </Link>
                    <Link
                      href="/markdown-editor"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Code className="w-4 h-4" />
                      Markdown Editor
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
