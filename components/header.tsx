"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, Github, Twitter, ChevronDown, Bell, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
// Removed direct import of next/image as it's now encapsulated in BankChip
import { BankChip } from "@/components/ui/bank-chip" // Import the new component

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
  const [currentVersion, setCurrentVersion] = useState("v5.7")

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gra-docs-theme")
      if (stored) return stored
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  const [availableVersions, setAvailableVersions] = useState<{
    current: Array<{ version: string; label: string; status: string; statusColor: string }>
    previous: Array<{ version: string; label: string; status: string; statusColor: string }>
  }>({
    current: [],
    previous: [],
  })

  useEffect(() => {
    const detectVersions = async () => {
      try {
        const existingVersions = ["5.7"]

        const latestVersion = "5.7"
        const currentVersionData = [
          {
            version: `v${latestVersion}`,
            label: `v${latestVersion}`,
            status: "stable",
            statusColor: "bg-green-100 text-green-800 dark:bg-green-700/30 dark:text-green-300",
          },
        ]

        const previousVersionsData = existingVersions
          .filter((v) => v !== latestVersion)
          .sort((a, b) => Number.parseFloat(b) - Number.parseFloat(a))
          .map((v) => ({
            version: `v${v}`,
            label: `v${v}`,
            status: "legacy",
            statusColor: "bg-gray-100 text-gray-600 dark:bg-gray-700/30 dark:text-gray-400",
          }))

        setAvailableVersions({
          current: currentVersionData,
          previous: previousVersionsData,
        })
        setCurrentVersion(`v${latestVersion}`)
      } catch (error) {
        console.error("Error detecting versions:", error)
      }
    }
    detectVersions()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("gra-docs-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    document.body.setAttribute("data-theme", newTheme) // Ensure body also gets the attribute for broader compatibility
    document.documentElement.style.colorScheme = newTheme
  }

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version)
    setIsVersionDropdownOpen(false)
    // Potentially navigate to the new version's URL
    // window.location.href = `/docs/${version.substring(1)}/...`;
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
        document.documentElement.style.colorScheme = systemTheme
      }
    }
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if the click is outside the version dropdown button and its menu
      if (
        isVersionDropdownOpen &&
        !target.closest(".version-dropdown-button") &&
        !target.closest(".version-dropdown-menu")
      ) {
        setIsVersionDropdownOpen(false)
      }
      // Check if the click is outside a nav dropdown and its menu
      if (activeDropdown && !target.closest(".nav-dropdown-button") && !target.closest(".nav-dropdown-menu")) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside) // Use mousedown to catch click before it might be stopped
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isVersionDropdownOpen, activeDropdown])

  const navigationItems = [
    {
      label: "User Guide",
      href: "/user-guide",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Getting Started",
          href: "/user-guide/getting-started",
          icon: "🚀",
          description: "Quick setup and installation",
        },
        { label: "Configuration", href: "/user-guide/configuration", icon: "⚙️", description: "Customize your setup" },
        {
          label: "Best Practices",
          href: "/user-guide/best-practices",
          icon: "⭐",
          description: "Tips and recommendations",
        },
        {
          label: "Troubleshooting",
          href: "/user-guide/troubleshooting",
          icon: "🔧",
          description: "Common issues and solutions",
        },
      ],
    },
    {
      label: "API Reference",
      href: "/api-reference",
      hasDropdown: true,
      dropdownItems: [
        { label: "Core API", href: "/api-reference/core", icon: "🔌", description: "Essential API endpoints" },
        {
          label: "Authentication",
          href: "/api-reference/authentication",
          icon: "🔐",
          description: "Auth and security",
        },
        { label: "Data Models", href: "/api-reference/data-models", icon: "📊", description: "Schema and types" },
        { label: "SDKs", href: "/api-reference/sdks", icon: "📦", description: "Client libraries" },
      ],
    },
    {
      label: "Examples",
      href: "/examples",
      hasDropdown: true,
      dropdownItems: [
        { label: "Quick Start", href: "/examples/quick-start", icon: "⚡", description: "Get running in 5 minutes" },
        { label: "Tutorials", href: "/examples/tutorials", icon: "📚", description: "Step-by-step guides" },
        { label: "Code Samples", href: "/examples/code-samples", icon: "💻", description: "Ready-to-use snippets" },
        { label: "Templates", href: "/examples/templates", icon: "🎨", description: "Project starters" },
      ],
    },
    {
      label: "Create Doc",
      href: "/markdown-editor",
      hasDropdown: true,
      dropdownItems: [
        { label: "Visual Editor", href: "/markdown-editor", icon: "✏️", description: "Drag & drop markdown creator" },
        {
          label: "Templates",
          href: "/markdown-editor/templates",
          icon: "📄",
          description: "Pre-built document templates",
        },
        { label: "My Documents", href: "/markdown-editor/files", icon: "📁", description: "Manage saved files" },
        {
          label: "Export Tools",
          href: "/markdown-editor/export",
          icon: "📤",
          description: "Download and share options",
        },
      ],
    },
    { label: "Changelog", href: "/changelog", hasDropdown: false },
  ]

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/10"
              : "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg dark:shadow-slate-700/50"
            : theme === "dark"
              ? "bg-slate-900 border-b border-slate-700/30"
              : "bg-white border-b border-gray-100 dark:border-slate-800"
        }`}
      >
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {" "}
          {/* Changed max-w-7xl to screen-xl for wider layout */}
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="relative group flex items-center space-x-3">
                <BankChip /> {/* Use the BankChip component here */}
                <h1
                  className={`font-semibold text-lg whitespace-nowrap transition-colors duration-200 ${
                    theme === "dark"
                      ? "text-white group-hover:text-blue-300"
                      : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  GRA Core Platform Docs
                </h1>
              </Link>

              {/* Version Dropdown */}
              <div className="relative ml-4">
                {" "}
                {/* Added ml-4 for spacing */}
                <button
                  className={`version-dropdown-button flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
                      : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsVersionDropdownOpen(!isVersionDropdownOpen)
                    setActiveDropdown(null) // Close other dropdowns
                  }}
                  aria-expanded={isVersionDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{currentVersion}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ml-1 ${availableVersions.current.find((v) => v.version === currentVersion)?.statusColor || ""}`}
                  >
                    {availableVersions.current.find((v) => v.version === currentVersion)?.status || "stable"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${isVersionDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isVersionDropdownOpen && (
                  <div
                    className={`version-dropdown-menu absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl border transition-all duration-200 z-50 ${
                      theme === "dark"
                        ? "bg-slate-800/95 backdrop-blur-xl border-slate-700/50"
                        : "bg-white/95 backdrop-blur-xl border-gray-200/50"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2">
                      <div
                        className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b ${
                          theme === "dark" ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-200"
                        }`}
                      >
                        Current
                      </div>
                      {availableVersions.current.map((ver) => (
                        <button
                          key={ver.version}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                            currentVersion === ver.version
                              ? theme === "dark"
                                ? "bg-blue-600/30 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                              : theme === "dark"
                                ? "text-slate-200 hover:bg-slate-700 hover:text-white"
                                : "text-slate-900 hover:bg-slate-50"
                          }`}
                          onClick={() => handleVersionChange(ver.version)}
                        >
                          <span className="font-medium">{ver.label}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${ver.statusColor}`}>{ver.status}</span>
                        </button>
                      ))}

                      {availableVersions.previous.length > 0 && (
                        <>
                          <div
                            className={`px-3 py-2 text-xs font-semibold uppercase tracking-wide border-b border-t mt-2 ${
                              theme === "dark" ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-200"
                            }`}
                          >
                            Previous Versions
                          </div>
                          {availableVersions.previous.map((ver) => (
                            <button
                              key={ver.version}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                                currentVersion === ver.version
                                  ? theme === "dark"
                                    ? "bg-slate-700 text-slate-300"
                                    : "bg-slate-100 text-slate-800"
                                  : theme === "dark"
                                    ? "text-slate-300 hover:bg-slate-700/70 hover:text-slate-100"
                                    : "text-slate-700 hover:bg-slate-50"
                              }`}
                              onClick={() => handleVersionChange(ver.version)}
                            >
                              <span>{ver.label}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${ver.statusColor}`}>{ver.status}</span>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {" "}
              {/* Reduced space-x for tighter nav */}
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`nav-dropdown-button flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      theme === "dark"
                        ? "text-slate-200 hover:text-white hover:bg-slate-700/50"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
                    } ${activeDropdown === item.label ? (theme === "dark" ? "bg-slate-700/50 text-white" : "bg-slate-100/50 text-slate-900") : ""}`}
                    onMouseEnter={() => {
                      item.hasDropdown && setActiveDropdown(item.label)
                      item.hasDropdown && setIsVersionDropdownOpen(false)
                    }}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault() // Prevent navigation for dropdown parent
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                        setIsVersionDropdownOpen(false) // Close version dropdown
                      }
                    }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {item.hasDropdown && activeDropdown === item.label && (
                    <div
                      className={`nav-dropdown-menu absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl shadow-2xl border transition-all duration-200 origin-top ${
                        theme === "dark"
                          ? "bg-slate-800/95 backdrop-blur-xl border-slate-700/50"
                          : "bg-white/95 backdrop-blur-xl border-gray-200/50"
                      }`}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="p-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            onClick={() => setActiveDropdown(null)} // Close dropdown on item click
                            className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                              theme === "dark"
                                ? "hover:bg-slate-700 text-slate-200 hover:text-white"
                                : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                            }`}
                          >
                            <span className="text-xl mt-0.5">{dropdownItem.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium">{dropdownItem.label}</div>
                              <div className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                {dropdownItem.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {" "}
              {/* Reduced space-x */}
              {/* Search */}
              <div className="relative hidden md:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                />
                <Input
                  type="search"
                  placeholder="Search docs..."
                  className={`pl-10 pr-16 py-2 w-56 text-sm transition-all duration-300 rounded-lg ${
                    /* Reduced width */
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:bg-slate-700 focus:border-blue-400"
                      : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500 focus:bg-white focus:border-blue-400"
                  }`}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <kbd
                    className={`px-1.5 py-0.5 text-xs rounded ${
                      theme === "dark"
                        ? "text-slate-400 bg-slate-700 border border-slate-600"
                        : "text-slate-500 bg-slate-200 border border-slate-300"
                    }`}
                  >
                    ⌘K
                  </kbd>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                {" "}
                {/* Reduced space-x */}
                <Button
                  variant="ghost"
                  size="icon" // Changed to icon size
                  className={`relative rounded-lg ${theme === "dark" ? "text-slate-300 hover:bg-slate-700/50 hover:text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800"}`}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" /> {/* Increased icon size slightly */}
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />{" "}
                  {/* Adjusted notification dot */}
                </Button>
                <Button
                  variant="ghost"
                  size="icon" // Changed to icon size
                  onClick={toggleTheme}
                  className={`rounded-lg ${theme === "dark" ? "text-slate-300 hover:bg-slate-700/50 hover:text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800"}`}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon" // Changed to icon size
                  asChild
                  className={`rounded-lg ${theme === "dark" ? "text-slate-300 hover:bg-slate-700/50 hover:text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800"}`}
                  aria-label="GitHub Repository"
                >
                  <Link href="https://github.com/your-repo" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon" // Changed to icon size
                  asChild
                  className={`rounded-lg ${theme === "dark" ? "text-slate-300 hover:bg-slate-700/50 hover:text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800"}`}
                  aria-label="Twitter Profile"
                >
                  <Link href="https://twitter.com/your-profile" target="_blank">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon" // Changed to icon size
                className={`lg:hidden rounded-lg ${theme === "dark" ? "text-slate-300 hover:bg-slate-700/50 hover:text-white" : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-800"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle mobile menu"
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
              <div className="px-2 py-3">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                  <Input
                    type="search"
                    placeholder="Search docs..."
                    className={`pl-10 w-full rounded-lg ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                        : "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
              </div>
              <nav className="flex flex-col space-y-1 px-2">
                {navigationItems.map((item) => (
                  // Basic mobile nav, can be enhanced with collapsible sections
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg transition-colors text-base font-medium ${
                      // Increased text size
                      theme === "dark"
                        ? "text-slate-200 hover:text-white hover:bg-slate-700/50"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                  </Link>
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
