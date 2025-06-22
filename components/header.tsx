"use client"

import { useState, useEffect } from "react"
import { Search, Menu, X, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <>
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GRA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">GRA Core Platform</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">v1.0.0 (stable)</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-mono font-light">
                User Guide
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                API Reference
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Examples
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Changelog
              </a>
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 flex items-center">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="search" placeholder="Search" className="pl-10 pr-4 py-2 w-64 text-sm" />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
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
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                  User Guide
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                  API Reference
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                  Examples
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-2 py-1">
                  Changelog
                </a>
                <div className="px-2 py-2">
                  <Input type="search" placeholder="Search" className="w-full" />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* --- pill-toggle styles (styled-jsx) --- */}
      <style jsx>{`
        .theme-toggle-pill {
          position: relative;
          width: 80px;
          height: 36px;
          background: #f5f5f5;
          border: 2px solid #e0e0e0;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          overflow: hidden;
        }
        .theme-toggle-pill:hover {
          border-color: #e31837;
          box-shadow: 0 0 0 3px rgba(227, 24, 55, 0.1);
        }
        .theme-toggle-pill:focus {
          outline: none;
          border-color: #e31837;
          box-shadow: 0 0 0 3px rgba(227, 24, 55, 0.2);
        }
        .theme-toggle-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
        }
        .theme-toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 28px;
          height: 28px;
          background: #e31837;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .theme-toggle-thumb .theme-icon {
          color: white;
          font-size: 0.75rem;
          transition: all 0.3s ease;
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
          padding: 0 8px;
          pointer-events: none;
        }
        .theme-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          opacity: 0.7;
        }
        .light-label {
          color: #333333;
          margin-left: 32px;
        }
        .dark-label {
          color: #666666;
          margin-right: 32px;
        }
        /* Dark theme active state */
        .theme-toggle-pill[aria-checked='true'] {
          background: #2d2d2d;
          border-color: #0066cc;
        }
        .theme-toggle-pill[aria-checked='true'] .theme-toggle-thumb {
          transform: translateX(44px);
          background: #0066cc;
        }
        .theme-toggle-pill[aria-checked='true'] .theme-icon {
          transform: rotate(180deg);
        }
        .theme-toggle-pill[aria-checked='true'] .light-label {
          opacity: 0.4;
          color: #a4a4a4;
        }
        .theme-toggle-pill[aria-checked='true'] .dark-label {
          opacity: 1;
          color: #ffffff;
        }
        /* Hover effects */
        .theme-toggle-pill:hover .theme-toggle-thumb {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .theme-toggle-pill[aria-checked='true']:hover .theme-toggle-thumb {
          transform: translateX(44px) scale(1.1);
        }
      `}</style>
    </>
  )
}

export default Header
