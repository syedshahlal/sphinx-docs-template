"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import type { SphinxContent } from "../../types"
import { useComponentMount } from "../../hooks/useComponentMount"

interface ContentRendererProps {
  content: SphinxContent
  className?: string
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className = "" }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { scanAndMountComponents } = useComponentMount()

  useEffect(() => {
    if (contentRef.current) {
      // Set the HTML content
      contentRef.current.innerHTML = content.content

      // Scan for and mount React components
      setTimeout(() => {
        scanAndMountComponents()
      }, 100)
    }
  }, [content.content, scanAndMountComponents])

  return (
    <div className={`sphinx-content ${className}`}>
      {/* Content title */}
      {content.title && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{content.title}</h1>
          {content.metadata.description && (
            <p className="text-lg text-gray-600 dark:text-gray-400">{content.metadata.description}</p>
          )}
        </header>
      )}

      {/* Rendered content */}
      <div
        ref={contentRef}
        className="
          prose prose-gray dark:prose-invert max-w-none
          prose-headings:scroll-mt-24
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800
          prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900
          prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
        "
      />
    </div>
  )
}
