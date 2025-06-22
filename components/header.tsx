"use client"

import { useState } from "react"
import { Search, Menu, X, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
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
  )
}
