"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { TocItem } from "../../types"

interface TableOfContentsProps {
  items: TocItem[]
  activeId?: string
}

const TocItemComponent: React.FC<{
  item: TocItem
  activeId?: string
  onItemClick: (id: string) => void
}> = ({ item, activeId, onItemClick }) => {
  const isActive = activeId === item.id
  const hasChildren = item.children && item.children.length > 0

  return (
    <div className="toc-item">
      <a
        href={`#${item.id}`}
        onClick={(e) => {
          e.preventDefault()
          onItemClick(item.id)
        }}
        className={`
          block py-1 px-2 text-sm rounded transition-colors
          hover:bg-gray-100 dark:hover:bg-gray-800
          ${
            isActive
              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium"
              : "text-gray-600 dark:text-gray-400"
          }
        `}
        style={{ paddingLeft: `${item.level * 12 + 8}px` }}
      >
        {item.title}
      </a>

      {hasChildren && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <TocItemComponent key={child.id} item={child} activeId={activeId} onItemClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, activeId }) => {
  const [currentActiveId, setCurrentActiveId] = useState(activeId)

  const handleItemClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setCurrentActiveId(id)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)

      if (item.children) {
        item.children.forEach((child) => {
          const childElement = document.getElementById(child.id)
          if (childElement) observer.observe(childElement)
        })
      }
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="pb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">On this page</h3>
        <nav className="space-y-1">
          {items.map((item) => (
            <TocItemComponent key={item.id} item={item} activeId={currentActiveId} onItemClick={handleItemClick} />
          ))}
        </nav>
      </div>
    </div>
  )
}
