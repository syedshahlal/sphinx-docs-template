"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Search,
  Menu,
  Sun,
  Moon,
  BookOpen,
  Code,
  Zap,
  Users,
  Bell,
  GitBranch,
  X,
  ExternalLink,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const theme = isDarkMode ? "dark" : "light"

  // Available versions matching the image structure
  const [availableVersions] = useState([
    // Current stable version
    { version: "5.7.0", label: "v5.7.0", url: "/docs/gcp-5.7", category: "current", status: "stable" },

    // Previous versions
    { version: "5.6.2", label: "v5.6.2", url: "/docs/gcp-5.6.2", category: "previous", status: "legacy" },
    { version: "5.5.4", label: "v5.5.4", url: "/docs/gcp-5.5.4", category: "previous", status: "legacy" },
    { version: "5.4.8", label: "v5.4.8", url: "/docs/gcp-5.4.8", category: "previous", status: "legacy" },
    { version: "5.3.6", label: "v5.3.6", url: "/docs/gcp-5.3.6", category: "previous", status: "legacy" },
    { version: "5.2.3", label: "v5.2.3", url: "/docs/gcp-5.2.3", category: "previous", status: "legacy" },
    { version: "5.1.9", label: "v5.1.9", url: "/docs/gcp-5.1.9", category: "previous", status: "legacy" },

    // Development versions
    { version: "5.8.0-beta", label: "v5.8.0-beta", url: "/docs/gcp-5.8", category: "development", status: "beta" },
    { version: "6.0.0-alpha", label: "v6.0.0-alpha", url: "/docs/gcp-6.0", category: "development", status: "alpha" },
  ])

  // Default to stable version (5.7.0)
  const [currentVersion, setCurrentVersion] = useState(() => {
    return "5.7.0" // Default to stable version
  })

  // Extract version from URL path
  const extractVersionFromPath = (path: string): string => {
    const match = path.match(/\/docs\/gcp-(\d+\.\d+(?:-\w+)?|\d+\.\d+\.\d+(?:-\w+)?)/)
    if (match) {
      return match[1]
    }
    // If no version found in path, return stable version as default
    return "5.7.0"
  }

  // Update current version based on pathname
  useEffect(() => {
    const versionFromPath = extractVersionFromPath(pathname)
    setCurrentVersion(versionFromPath)
  }, [pathname])

  useEffect(() => {
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

  const switchVersion = (version: string) => {
    if (version === currentVersion) return

    // Get current page path without version
    const currentPath = pathname
    const pathWithoutVersion = currentPath.replace(/\/docs\/gcp-[\d.\-\w]+/, "")

    // Find the selected version URL
    const selectedVersion = availableVersions.find((v) => v.version === version)
    if (selectedVersion) {
      // Construct new URL: /docs/gcp-X.X + remaining path
      const newUrl = `${selectedVersion.url}${pathWithoutVersion}`
      window.location.href = newUrl
    }
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

  const getCurrentVersionInfo = () => {
    return availableVersions.find((v) => v.version === currentVersion)
  }

  const getVersionsByCategory = () => {
    const current = availableVersions.filter((v) => v.category === "current")
    const previous = availableVersions.filter((v) => v.category === "previous")
    const development = availableVersions.filter((v) => v.category === "development")

    return { current, previous, development }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
      case "beta":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
      case "alpha":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
      case "legacy":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
    }
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
              <img src="/placeholder.svg?height=32&width=32&text=BoA" alt="Bank of America" className="h-8 w-8" />
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Version Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-10 px-3 rounded-lg transition-all duration-200 border-2 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/70 hover:border-slate-500 hover:text-slate-100"
                      : "bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {getCurrentVersionInfo()?.label || `v${currentVersion}`}
                    </span>
                    {getCurrentVersionInfo()?.status && (
                      <span
                        className={`px-1.5 py-0.5 text-xs rounded ${getStatusBadgeColor(getCurrentVersionInfo()?.status || "")}`}
                      >
                        {getCurrentVersionInfo()?.status}
                      </span>
                    )}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-64 max-h-96 overflow-y-auto ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
              >
                {(() => {
                  const { current, previous, development } = getVersionsByCategory()

                  return (
                    <>
                      {/* Current Version */}
                      <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Current
                      </DropdownMenuLabel>
                      {current.map((version) => (
                        <DropdownMenuItem
                          key={version.version}
                          onClick={() => switchVersion(version.version)}
                          className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                            version.version === currentVersion
                              ? theme === "dark"
                                ? "bg-slate-700 text-slate-100"
                                : "bg-slate-100 text-slate-900"
                              : theme === "dark"
                                ? "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{version.label}</span>
                            <span className={`px-1.5 py-0.5 text-xs rounded ${getStatusBadgeColor(version.status)}`}>
                              {version.status}
                            </span>
                          </div>
                          {version.version === currentVersion && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </DropdownMenuItem>
                      ))}

                      {/* Previous Versions */}
                      {previous.length > 0 && (
                        <>
                          <DropdownMenuSeparator className={theme === "dark" ? "bg-slate-700" : "bg-slate-200"} />
                          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Previous Versions
                          </DropdownMenuLabel>
                          {previous.map((version) => (
                            <DropdownMenuItem
                              key={version.version}
                              onClick={() => switchVersion(version.version)}
                              className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                                version.version === currentVersion
                                  ? theme === "dark"
                                    ? "bg-slate-700 text-slate-100"
                                    : "bg-slate-100 text-slate-900"
                                  : theme === "dark"
                                    ? "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{version.label}</span>
                                <span
                                  className={`px-1.5 py-0.5 text-xs rounded ${getStatusBadgeColor(version.status)}`}
                                >
                                  {version.status}
                                </span>
                              </div>
                              {version.version === currentVersion && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}

                      {/* Development Versions */}
                      {development.length > 0 && (
                        <>
                          <DropdownMenuSeparator className={theme === "dark" ? "bg-slate-700" : "bg-slate-200"} />
                          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Development
                          </DropdownMenuLabel>
                          {development.map((version) => (
                            <DropdownMenuItem
                              key={version.version}
                              onClick={() => switchVersion(version.version)}
                              className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                                version.version === currentVersion
                                  ? theme === "dark"
                                    ? "bg-slate-700 text-slate-100"
                                    : "bg-slate-100 text-slate-900"
                                  : theme === "dark"
                                    ? "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{version.label}</span>
                                <span
                                  className={`px-1.5 py-0.5 text-xs rounded ${getStatusBadgeColor(version.status)}`}
                                >
                                  {version.status}
                                </span>
                              </div>
                              {version.version === currentVersion && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}

                      <DropdownMenuSeparator className={theme === "dark" ? "bg-slate-700" : "bg-slate-200"} />
                      <DropdownMenuItem
                        className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer ${
                          theme === "dark"
                            ? "text-slate-300 hover:bg-slate-700/50 hover:text-slate-100"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Compare Versions</span>
                      </DropdownMenuItem>
                    </>
                  )
                })()}
              </DropdownMenuContent>
            </DropdownMenu>

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
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
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
