"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState, useEffect } from "react"

const Header = () => {
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
  const [currentVersion, setCurrentVersion] = useState("v5.7.0")

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version)
    setIsVersionDropdownOpen(false)
    // Here you would typically navigate to the version-specific documentation
    // For now, we'll just update the display
    console.log(`Switching to version: ${version}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isVersionDropdownOpen) {
        setIsVersionDropdownOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isVersionDropdownOpen])

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-800">
          My Documentation
        </a>

        {/* Version Dropdown */}
        <div className="flex items-center">
          <div className="relative">
            <button
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
              aria-expanded={isVersionDropdownOpen}
              aria-haspopup="true"
            >
              <span>{currentVersion} (stable)</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${isVersionDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isVersionDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-1">
                  {/* Current/Stable Version */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                    Current
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-700 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.7.0")}
                  >
                    <span>v5.7.0</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">stable</span>
                  </button>

                  {/* Previous Versions */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 border-t border-gray-100 mt-1">
                    Previous Versions
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.6.2")}
                  >
                    <span>v5.6.2</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.5.4")}
                  >
                    <span>v5.5.4</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.4.8")}
                  >
                    <span>v5.4.8</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.3.6")}
                  >
                    <span>v5.3.6</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.2.3")}
                  >
                    <span>v5.2.3</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.1.9")}
                  >
                    <span>v5.1.9</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">legacy</span>
                  </button>

                  {/* Beta/Development Versions */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 border-t border-gray-100 mt-1">
                    Development
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v5.8.0-beta")}
                  >
                    <span>v5.8.0-beta</span>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">beta</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    onClick={() => handleVersionChange("v6.0.0-alpha")}
                  >
                    <span>v6.0.0-alpha</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">alpha</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
