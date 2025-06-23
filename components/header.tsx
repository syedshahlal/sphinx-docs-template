"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState, useEffect } from "react"

const Header = () => {
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false)
  const [currentVersion, setCurrentVersion] = useState("v5.7.0")

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

  const handleVersionChange = (version: string) => {
    setCurrentVersion(version)
    setIsVersionDropdownOpen(false)
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

  const theme = "dark" // Example theme, replace with actual theme logic

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-gray-800">
          My Documentation
        </a>

        {/* Version Dropdown */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="relative">
            <button
              className={`flex items-center space-x-1 px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-medium transition-all duration-200 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-800 to-indigo-800 text-blue-200 border border-blue-700/50 hover:from-blue-700 hover:to-indigo-700"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100"
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setIsVersionDropdownOpen(!isVersionDropdownOpen)
              }}
              aria-expanded={isVersionDropdownOpen}
              aria-haspopup="true"
            >
              <span className="hidden sm:inline">{currentVersion} (stable)</span>
              <span className="sm:hidden">{currentVersion}</span>
              <ChevronDownIcon
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

          <span
            className={`px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-medium ${
              theme === "dark" ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
            }`}
          >
            <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full mr-1 animate-pulse" />
            Live
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
export { Header }
