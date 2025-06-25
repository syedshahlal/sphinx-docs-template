"use client"

import { ChevronDown, ChevronRight, FileText, Folder } from "lucide-react"
import { useState } from "react"
import type { NavigationItem } from "../../types"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems: NavigationItem[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    icon: "FileText",
    children: [
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Quick Start", href: "/getting-started/quickstart" },
    ],
  },
  {
    title: "User Guide",
    href: "/user-guide",
    icon: "Folder",
    children: [
      { title: "Configuration", href: "/user-guide/configuration" },
      { title: "Advanced Usage", href: "/user-guide/advanced" },
    ],
  },
  {
    title: "API Reference",
    href: "/api-reference",
    icon: "FileText",
    children: [
      { title: "Authentication", href: "/api-reference/auth" },
      { title: "Endpoints", href: "/api-reference/endpoints" },
    ],
  },
  {
    title: "Examples",
    href: "/examples",
    icon: "Folder",
    children: [
      { title: "Basic Usage", href: "/examples/basic" },
      { title: "Advanced Examples", href: "/examples/advanced" },
    ],
  },
]

function NavItem({ item, level = 0 }: { item: NavigationItem; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const IconComponent = item.icon === "Folder" ? Folder : FileText

  return (
    <div>
      <a
        href={item.href}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
          level > 0 ? "ml-4" : ""
        }`}
        onClick={(e) => {
          if (hasChildren) {
            e.preventDefault()
            setIsExpanded(!isExpanded)
          }
        }}
      >
        <IconComponent className="h-4 w-4" />
        <span className="flex-1">{item.title}</span>
        {hasChildren && (
          <button className="p-0.5">
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
        )}
      </a>

      {hasChildren && isExpanded && (
        <div className="mt-1">
          {item.children!.map((child, index) => (
            <NavItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-14 z-40 h-[calc(100vh-3.5rem)] w-64 shrink-0 transform border-r bg-background transition-transform duration-200 ease-in-out lg:sticky lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
