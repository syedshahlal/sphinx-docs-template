"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronRight, Search, X } from "lucide-react"
import { navigationConfig } from "../../config/navigation"
import type { DocSection } from "../../types"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentPath: string
  onNavigate: (path: string) => void
}

const SidebarItem: React.FC<{
  section: DocSection
  currentPath: string
  onNavigate: (path: string) => void
  level: number
}> = ({ section, currentPath, onNavigate, level }) => {
  const [isExpanded, setIsExpanded] = useState(currentPath.startsWith(section.path) || level === 0)

  const hasChildren = section.children && section.children.length > 0
  const isActive = currentPath === section.path
  const isParentActive = currentPath.startsWith(section.path + "/")

  return (
    <div className="sidebar-item">
      <div
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${isActive ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium" : ""}
          ${isParentActive && !isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}
        `}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded)
          }
          onNavigate(section.path)
        }}
      >
        {section.icon && <span className="text-sm">{section.icon}</span>}

        <span className="flex-1 text-sm">{section.title}</span>

        {section.badge && (
          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
            {section.badge}
          </span>
        )}

        {hasChildren && (
          <button
            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {section.children!.map((child) => (
            <SidebarItem
              key={child.id}
              section={child}
              currentPath={currentPath}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentPath, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSections = navigationConfig.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.children?.some((child) => child.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out z-50
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📚</span>
            </div>
            <h1 className="font-semibold text-gray-900 dark:text-white">Documentation</h1>
          </div>

          <button onClick={onToggle} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2 text-sm
                bg-gray-50 dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
              "
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-1">
            {filteredSections.map((section) => (
              <SidebarItem
                key={section.id}
                section={section}
                currentPath={currentPath}
                onNavigate={onNavigate}
                level={0}
              />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">Built with Sphinx + React</div>
        </div>
      </aside>
    </>
  )
}
