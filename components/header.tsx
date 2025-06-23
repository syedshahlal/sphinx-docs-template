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
      <header className="border-b sticky top-0 z-50 transition-all duration-300 bg-background border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GRA</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">GRA Core Platform</span>
                <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">v1.0.0 (stable)</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="font-mono font-light transition-colors text-muted-foreground hover:text-foreground"
              >
                User Guide
              </a>
              <a
                href="#"
                className="font-mono font-light transition-colors text-muted-foreground hover:text-foreground"
              >
                API Reference
              </a>
              <a
                href="#"
                className="font-mono font-light transition-colors text-muted-foreground hover:text-foreground"
              >
                Examples
              </a>
              <a
                href="#"
                className="font-mono font-light transition-colors text-muted-foreground hover:text-foreground"
              >
                Changelog
              </a>
              <div className="relative group">
                <button
                  className={`flex items-center transition-colors ${
                    theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search"
                  className={`pl-10 pr-4 py-2 w-64 text-sm transition-all ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
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
          width: 100px;
          height: 44px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
          border: 2px solid rgba(148, 163, 184, 0.2);
          border-radius: 26px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          user-select: none;
          overflow: hidden;
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.1),
            0 3px 10px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(10px);
        }

        .theme-toggle-pill:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 
            0 12px 35px rgba(0, 0, 0, 0.15),
            0 5px 15px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .theme-toggle-pill:focus {
          outline: none;
          box-shadow: 
            0 0 0 4px rgba(59, 130, 246, 0.2),
            0 8px 25px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .theme-toggle-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          border-radius: 24px;
          overflow: hidden;
        }

        .theme-toggle-thumb {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 3;
          box-shadow: 
            0 4px 12px rgba(59, 130, 246, 0.4),
            0 2px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .theme-toggle-thumb .theme-icon {
          color: white;
          font-size: 1rem;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));
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
          padding: 0 14px;
          pointer-events: none;
          z-index: 1;
        }

        .theme-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .label-icon {
          font-size: 0.7rem;
          transition: all 0.4s ease;
        }

        .light-label {
          color: #475569;
          opacity: 1;
          transform: translateX(0);
        }

        .dark-label {
          color: #64748b;
          opacity: 0.5;
          transform: translateX(0);
        }

        .theme-toggle-glow {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 2;
          opacity: 0;
        }

        /* Dark theme active state */
        .theme-toggle-pill[aria-checked='true'] {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%);
          border-color: rgba(148, 163, 184, 0.3);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.3),
            0 3px 10px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .theme-toggle-pill[aria-checked='true'] .theme-toggle-thumb {
          transform: translateX(56px);
          background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #4c1d95 100%);
          box-shadow: 
            0 4px 12px rgba(124, 58, 237, 0.4),
            0 2px 6px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .theme-toggle-pill[aria-checked='true'] .theme-toggle-glow {
          transform: translateX(56px);
          background: radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%);
        }

        .theme-toggle-pill[aria-checked='true'] .theme-icon {
          transform: rotate(180deg) scale(1.1);
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.5));
        }

        .theme-toggle-pill[aria-checked='true'] .light-label {
          opacity: 0.4;
          color: #64748b;
          transform: translateX(-4px);
        }

        .theme-toggle-pill[aria-checked='true'] .dark-label {
          opacity: 1;
          color: #e2e8f0;
          transform: translateX(4px);
        }

        /* Enhanced hover effects */
        .theme-toggle-pill:hover .theme-toggle-thumb {
          transform: scale(1.08);
          box-shadow: 
            0 6px 20px rgba(59, 130, 246, 0.5),
            0 3px 10px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .theme-toggle-pill[aria-checked='true']:hover .theme-toggle-thumb {
          transform: translateX(56px) scale(1.08);
          box-shadow: 
            0 6px 20px rgba(124, 58, 237, 0.5),
            0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .theme-toggle-pill:hover .theme-toggle-glow {
          opacity: 1;
          transform: scale(1.2);
        }

        .theme-toggle-pill[aria-checked='true']:hover .theme-toggle-glow {
          opacity: 1;
          transform: translateX(56px) scale(1.2);
        }

        /* Active state */
        .theme-toggle-pill:active .theme-toggle-thumb {
          transform: scale(0.95);
          transition: all 0.1s ease;
        }

        .theme-toggle-pill[aria-checked='true']:active .theme-toggle-thumb {
          transform: translateX(56px) scale(0.95);
        }

        /* Pulse animation on theme change */
        @keyframes pulse-glow {
          0% { 
            opacity: 0;
            transform: scale(0.8);
          }
          50% { 
            opacity: 1;
            transform: scale(1.3);
          }
          100% { 
            opacity: 0;
            transform: scale(1.6);
          }
        }

        .theme-toggle-pill.switching .theme-toggle-glow {
          animation: pulse-glow 0.6s ease-out;
        }

        /* Mobile responsive */
        @media (max-width: 576px) {
          .theme-toggle-pill {
            width: 88px;
            height: 40px;
          }
          
          .theme-toggle-thumb {
            width: 32px;
            height: 32px;
          }
          
          .theme-toggle-pill[aria-checked='true'] .theme-toggle-thumb {
            transform: translateX(48px);
          }
          
          .theme-toggle-pill[aria-checked='true'] .theme-toggle-glow {
            transform: translateX(48px);
          }
          
          .theme-toggle-pill[aria-checked='true']:hover .theme-toggle-thumb {
            transform: translateX(48px) scale(1.08);
          }
          
          .theme-label {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </>
  )
}

export default Header
