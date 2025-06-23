"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

    // Force immediate visual update
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

  return (
    <>
      <header
        className={`border-b sticky top-0 z-50 transition-all duration-300 border-border ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-sm text-white shadow-lg shadow-blue-900/20"
            : "bg-white backdrop-blur-sm text-gray-900 shadow-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GRA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  GRA Core Platform
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-800 to-indigo-800 text-blue-200 border border-blue-700/50"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  v1.0.0 (stable)
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className={`font-mono font-light transition-colors ${
                  theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                User Guide
              </a>
              <a
                href="#"
                className={`font-mono font-light transition-colors ${
                  theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                API Reference
              </a>
              <a
                href="#"
                className={`font-mono font-light transition-colors ${
                  theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Examples
              </a>
              <a
                href="#"
                className={`font-mono font-light transition-colors ${
                  theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Changelog
              </a>
              <div className="relative group">
                <button
                  className={`flex items-center transition-colors ${
                    theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  More
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-400"
                  }`}
                />
                <Input
                  type="search"
                  placeholder="Search"
                  className={`pl-10 pr-4 py-2 w-64 text-sm transition-all ${
                    theme === "dark"
                      ? "bg-slate-800/50 border-slate-600 text-white placeholder-slate-300 focus:bg-slate-800/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
                <kbd
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs px-1.5 py-0.5 rounded ${
                    theme === "dark" ? "text-gray-300 bg-blue-800" : "text-gray-400 bg-gray-100"
                  }`}
                >
                  Ctrl K
                </kbd>
              </div>

              <div className="flex items-center space-x-2">
                {/* Theme Toggle Pill */}
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
                <Button variant="ghost" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              className={`md:hidden border-t py-4 ${
                theme === "dark"
                  ? "border-slate-700 bg-gradient-to-b from-slate-800/50 to-slate-900/50"
                  : "border-gray-200"
              }`}
            >
              <nav className="flex flex-col space-y-3">
                <a
                  href="#"
                  className={`px-2 py-1 transition-colors ${
                    theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  User Guide
                </a>
                <a
                  href="#"
                  className={`px-2 py-1 transition-colors ${
                    theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  API Reference
                </a>
                <a
                  href="#"
                  className={`px-2 py-1 transition-colors ${
                    theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Examples
                </a>
                <a
                  href="#"
                  className={`px-2 py-1 transition-colors ${
                    theme === "dark" ? "text-gray-200 hover:text-white" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Changelog
                </a>
                <div className="px-2 py-2">
                  <Input
                    type="search"
                    placeholder="Search"
                    className={`w-full ${
                      theme === "dark"
                        ? "bg-blue-900/50 border-blue-700 text-white placeholder-gray-300"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* --- Enhanced pill-toggle styles matching the reference design --- */}
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
