"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { TableOfContents } from "./TableOfContents"
import { ContentRenderer } from "../content/ContentRenderer"
import type { SphinxContent } from "../../types"

interface LayoutProps {
  content: SphinxContent
  currentPath: string
  onNavigate: (path: string) => void
}

export const Layout: React.FC<LayoutProps> = ({ content, currentPath, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} title={content.title} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />

        {/* Main content area */}
        <div className="flex-1 lg:ml-80">
          <div className="flex">
            {/* Content */}
            <main className="flex-1 px-4 py-8 lg:px-8 max-w-4xl">
              <ContentRenderer content={content} />
            </main>

            {/* Table of Contents */}
            <aside className="hidden xl:block w-64 px-4 py-8">
              <TableOfContents items={content.toc} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
