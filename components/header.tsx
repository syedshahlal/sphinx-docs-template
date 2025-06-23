"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, Github, Twitter, ChevronDown, Bell, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
  const [currentVersion, setCurrentVersion] = useState("v5.7.0")

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gra-docs-theme")
      if (stored) return stored
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  const versions = {
    current: [{ version: "v5.7.0", label: "v5.7.0", status: "stable", statusColor: "bg-green-100 text-green-800" }],
    previous: [
      { version: "v5.6.2", label: "v5.6.2", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
      { version: "v5.5.4", label: "v5.5.4", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
      { version: "v5.4.8", label: "v5.4.8", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
      { version: "v5.3.6", label: "v5.3.6", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
      { version: "v5.2.3", label: "v5.2.3", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
      { version: "v5.1.9", label: "v5.1.9", status: "legacy", statusColor: "bg-gray-100 text-gray-600" },
    ],
    development: [
      { version: "v5.8.0-beta", label: "v5.8.0-beta", status: "beta", statusColor: "bg-orange-100 text-orange-800" },
      { version: "v6.0.0-alpha", label: "v6.0.0-alpha", status: "alpha", statusColor: "bg-purple-100 text-purple-800" },
    ],
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("gra-docs-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    document.body.setAttribute("data-theme", newTheme)
    document.documentElement.style.colorScheme = newTheme
  }

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version)
    setIsVersionDropdownOpen(false)
    console.log(`Switching to version: ${version}`)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)
    document.documentElement.style.colorScheme = theme

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("gra-docs-theme")) {
        const systemTheme = e.matches ? "dark" : "light"
        setTheme(systemTheme)
        document.documentElement.setAttribute("data-theme", systemTheme)
        document.body.setAttribute("data-theme", systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isVersionDropdownOpen || activeDropdown) {
        setIsVersionDropdownOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isVersionDropdownOpen, activeDropdown])

  const navigationItems = [
    {
      label: "User Guide",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Getting Started", href: "#", icon: "🚀", description: "Quick setup and installation" },
        { label: "Configuration", href: "#", icon: "⚙️", description: "Customize your setup" },
        { label: "Best Practices", href: "#", icon: "⭐", description: "Tips and recommendations" },
        { label: "Troubleshooting", href: "#", icon: "🔧", description: "Common issues and solutions" },
      ],
    },
    {
      label: "API Reference",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Core API", href: "#", icon: "🔌", description: "Essential API endpoints" },
        { label: "Authentication", href: "#", icon: "🔐", description: "Auth and security" },
        { label: "Data Models", href: "#", icon: "📊", description: "Schema and types" },
        { label: "SDKs", href: "#", icon: "📦", description: "Client libraries" },
      ],
    },
    {
      label: "Examples",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Quick Start", href: "#", icon: "⚡", description: "Get running in 5 minutes" },
        { label: "Tutorials", href: "#", icon: "📚", description: "Step-by-step guides" },
        { label: "Code Samples", href: "#", icon: "💻", description: "Ready-to-use snippets" },
        { label: "Templates", href: "#", icon: "🎨", description: "Project starters" },
      ],
    },
    { label: "Changelog", href: "#", hasDropdown: false },
  ]

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/10"
              : "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
            : theme === "dark"
              ? "bg-slate-900 border-b border-slate-700/30"
              : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">GRA</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <h1 className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    GRA Core Platform Docs
                  </h1>

                  {/* Version Dropdown */}
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-blue-900/50 text-blue-200 border border-blue-700/50 hover:bg-blue-800/50"
                          : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsVersionDropdownOpen(!isVersionDropdownOpen)
                      }}
                      aria-expanded={isVersionDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{currentVersion} (stable)</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${isVersionDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Version Dropdown Menu */}
                    {isVersionDropdownOpen && (
                      <div
                        className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl border transition-all duration-200 z-50 ${
                          theme === "dark"
                            ? "bg-slate-800/95 backdrop-blur-xl border-slate-700/50"
                            : "bg-white/95 backdrop-blur-xl border-gray-200/50"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-2">
                          {/* Current Version */}
                          <div
                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b ${
                              theme === "dark" ? "text-gray-400 border-slate-700/50" : "text-gray-500 border-gray-100"
                            }`}
                          >
                            Current
                          </div>
                          {versions.current.map((ver) => (
                            <button
                              key={ver.version}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                                currentVersion === ver.version
                                  ? theme === "dark"
                                    ? "bg-blue-900/50 text-blue-200"
                                    : "bg-blue-50 text-blue-700"
                                  : theme === "dark"
                                    ? "text-gray-200 hover:bg-slate-700/50 hover:text-white"
                                    : "text-gray-900 hover:bg-gray-50"
                              }`}
                              onClick={() => handleVersionChange(ver.version)}
                            >
                              <span className="font-medium">{ver.label}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${ver.statusColor}`}>{ver.status}</span>
                            </button>
                          ))}

                          {/* Previous Versions */}
                          <div
                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b border-t mt-2 ${
                              theme === "dark" ? "text-gray-400 border-slate-700/50" : "text-gray-500 border-gray-100"
                            }`}
                          >
                            Previous Versions
                          </div>
                          {versions.previous.map((ver) => (
                            <button
                              key={ver.version}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                                currentVersion === ver.version
                                  ? theme === "dark"
                                    ? "bg-slate-700/50 text-gray-200"
                                    : "bg-gray-50 text-gray-900"
                                  : theme === "dark"
                                    ? "text-gray-300 hover:bg-slate-700/30 hover:text-gray-200"
                                    : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => handleVersionChange(ver.version)}
                            >
                              <span>{ver.label}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${ver.statusColor}`}>{ver.status}</span>
                            </button>
                          ))}

                          {/* Development Versions */}
                          <div
                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b border-t mt-2 ${
                              theme === "dark" ? "text-gray-400 border-slate-700/50" : "text-gray-500 border-gray-100"
                            }`}
                          >
                            Development
                          </div>
                          {versions.development.map((ver) => (
                            <button
                              key={ver.version}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                                currentVersion === ver.version
                                  ? theme === "dark"
                                    ? "bg-slate-700/50 text-gray-200"
                                    : "bg-gray-50 text-gray-900"
                                  : theme === "dark"
                                    ? "text-gray-300 hover:bg-slate-700/30 hover:text-gray-200"
                                    : "text-gray-700 hover:bg-gray-50"
                              }`}
                              onClick={() => handleVersionChange(ver.version)}
                            >
                              <span>{ver.label}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${ver.statusColor}`}>{ver.status}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Live Badge */}
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      theme === "dark" ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                    }`}
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      theme === "dark"
                        ? "text-gray-200 hover:text-white hover:bg-slate-800/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                    } ${activeDropdown === item.label ? (theme === "dark" ? "bg-slate-800/50 text-white" : "bg-gray-100/50 text-gray-900") : ""}`}
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div
                      className={`absolute top-full left-0 mt-2 w-80 rounded-xl shadow-2xl border transition-all duration-200 ${
                        theme === "dark"
                          ? "bg-slate-800/95 backdrop-blur-xl border-slate-700/50"
                          : "bg-white/95 backdrop-blur-xl border-gray-200/50"
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="p-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                              theme === "dark"
                                ? "hover:bg-slate-700/50 text-gray-200 hover:text-white"
                                : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                            }`}
                          >
                            <span className="text-xl">{dropdownItem.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium">{dropdownItem.label}</div>
                              <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                {dropdownItem.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <Input
                  type="search"
                  placeholder="Search docs..."
                  className={`pl-10 pr-16 py-2 w-64 text-sm transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:bg-slate-800/70 focus:border-blue-400"
                      : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd
                    className={`px-2 py-1 text-xs rounded ${
                      theme === "dark"
                        ? "text-gray-400 bg-slate-700/50 border border-slate-600/50"
                        : "text-gray-500 bg-gray-100/50 border border-gray-300/50"
                    }`}
                  >
                    ⌘K
                  </kbd>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}`}
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {/* Social Links */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}
                >
                  <Github className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className={theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`lg:hidden ${theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              className={`lg:hidden border-t py-4 ${
                theme === "dark"
                  ? "border-slate-700/50 bg-slate-900/95 backdrop-blur-xl"
                  : "border-gray-200/50 bg-white/95 backdrop-blur-xl"
              }`}
            >
              {/* Mobile Search */}
              <div className="px-2 py-3">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    type="search"
                    placeholder="Search docs..."
                    className={`pl-10 w-full ${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400"
                        : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex flex-col space-y-1 px-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "text-gray-200 hover:text-white hover:bg-slate-800/50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}

export default Header
