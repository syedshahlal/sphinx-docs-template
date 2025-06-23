"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, Github, Twitter, ChevronDown, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gra-docs-theme")
      if (stored) return stored
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("gra-docs-theme", newTheme)

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", newTheme)
    document.body.setAttribute("data-theme", newTheme)
    document.documentElement.style.colorScheme = newTheme
  }

  useEffect(() => {
    // Apply theme on mount and when theme changes
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)
    document.documentElement.style.colorScheme = theme

    // Listen for system theme changes
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark"
              ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/10"
              : "bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
            : theme === "dark"
              ? "bg-gradient-to-r from-slate-900 via-blue-900/50 to-slate-900 backdrop-blur-sm border-b border-slate-700/30"
              : "bg-white/80 backdrop-blur-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-xl blur-sm transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-75"
                      : "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-50"
                  }`}
                />
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">G</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div>
                  <h1 className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    GRA Core Platform
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-blue-800 to-indigo-800 text-blue-200 border border-blue-700/50"
                          : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      v5.7.0 (stable)
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        theme === "dark" ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                      }`}
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative group">
                  <button
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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

                  {/* Enhanced Dropdown Menu */}
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

            {/* Enhanced Right Section */}
            <div className="flex items-center space-x-3">
              {/* Enhanced Search */}
              <div className="relative hidden md:block group">
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                      : "bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    type="search"
                    placeholder="Search docs..."
                    className={`pl-10 pr-16 py-2 w-60 text-sm transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:bg-slate-800/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                        : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
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

                {/* Enhanced Theme Toggle */}
                <div
                  className="theme-toggle-pill"
                  onClick={toggleTheme}
                  role="switch"
                  aria-checked={theme === "dark"}
                  aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleTheme()
                    }
                  }}
                >
                  <div className="theme-toggle-track">
                    <div className="theme-toggle-thumb">
                      <i className={`theme-icon fas ${theme === "dark" ? "fa-moon" : "fa-sun"}`} />
                    </div>
                    <div className="theme-toggle-labels">
                      <span className="theme-label light-label">Light</span>
                      <span className="theme-label dark-label">Dark</span>
                    </div>
                  </div>
                </div>

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

                {/* User Menu */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${theme === "dark" ? "hover:bg-slate-800/50" : "hover:bg-gray-100/50"}`}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced Mobile Menu Button */}
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

          {/* Enhanced Mobile Navigation */}
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
                    {item.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                              theme === "dark"
                                ? "text-gray-300 hover:text-white hover:bg-slate-800/30"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-sm">{dropdownItem.icon}</span>
                            <div>
                              <div className="text-sm font-medium">{dropdownItem.label}</div>
                              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                {dropdownItem.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200/50 dark:border-slate-700/50 mt-4">
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Theme Toggle Styles */}
      <style jsx>{`
        .theme-toggle-pill {
          position: relative;
          width: 80px;
          height: 40px;
          background: ${
            theme === "dark"
              ? "linear-gradient(135deg, #374151 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)"
          };
          border: 2px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"};
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          overflow: hidden;
          box-shadow: ${
            theme === "dark"
              ? "0 4px 14px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 4px 14px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)"
          };
        }

        .theme-toggle-pill:hover {
          transform: translateY(-1px);
          box-shadow: ${
            theme === "dark"
              ? "0 6px 20px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
              : "0 6px 20px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
          };
        }

        .theme-toggle-pill:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .theme-toggle-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          border-radius: 23px;
          overflow: hidden;
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 3px;
          left: ${theme === "dark" ? "41px" : "3px"};
          width: 34px;
          height: 34px;
          background: ${
            theme === "dark"
              ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
          };
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          box-shadow: ${
            theme === "dark"
              ? "0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)"
              : "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)"
          };
          border: 1px solid ${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
        }

        .theme-toggle-thumb .theme-icon {
          font-size: 16px;
          color: ${theme === "dark" ? "#fbbf24" : "#f59e0b"};
          transition: all 0.3s ease;
          filter: ${
            theme === "dark"
              ? "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))"
              : "drop-shadow(0 0 2px rgba(245, 158, 11, 0.3))"
          };
        }

        .theme-toggle-labels {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          pointer-events: none;
          z-index: 1;
        }

        .theme-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          opacity: ${theme === "dark" ? "0.6" : "0.7"};
          color: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }

        .light-label {
          opacity: ${theme === "dark" ? "0.4" : "0.8"};
          color: ${theme === "dark" ? "#6b7280" : "#374151"};
        }

        .dark-label {
          opacity: ${theme === "dark" ? "0.8" : "0.4"};
          color: ${theme === "dark" ? "#d1d5db" : "#6b7280"};
        }

        /* Hover effects */
        .theme-toggle-pill:hover .theme-toggle-thumb {
          transform: scale(1.05);
          box-shadow: ${
            theme === "dark"
              ? "0 4px 12px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)"
              : "0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.15)"
          };
        }

        .theme-toggle-pill:hover .theme-icon {
          transform: ${theme === "dark" ? "rotate(15deg)" : "rotate(-15deg)"};
          filter: ${
            theme === "dark"
              ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.7))"
              : "drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))"
          };
        }

        /* Active state */
        .theme-toggle-pill:active .theme-toggle-thumb {
          transform: scale(0.95);
        }

        /* Mobile responsive */
        @media (max-width: 576px) {
          .theme-toggle-pill {
            width: 70px;
            height: 36px;
          }

          .theme-toggle-thumb {
            width: 30px;
            height: 30px;
            left: ${theme === "dark" ? "37px" : "3px"};
          }

          .theme-icon {
            font-size: 14px;
          }

          .theme-label {
            font-size: 9px;
          }
        }
      `}</style>
    </>
  )
}

export default Header
