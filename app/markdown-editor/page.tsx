"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Banner } from "@/components/banner"
import { MarkdownEditor } from "@/components/markdown-editor/MarkdownEditor"
import { FileManager } from "@/components/markdown-editor/FileManager"
import { EditorProvider } from "@/components/markdown-editor/EditorContext"

export default function MarkdownEditorPage() {
  const [showFileManager, setShowFileManager] = useState(false)

  return (
    <div className="min-h-screen w-full bg-background">
      <Banner />
      <Header />
      <EditorProvider>
        <div className="flex h-[calc(100vh-120px)]">
          {/* File Manager Sidebar */}
          {showFileManager && (
            <div className="w-80 border-r border-border bg-card">
              <FileManager onClose={() => setShowFileManager(false)} />
            </div>
          )}

          {/* Main Editor */}
          <div className="flex-1">
            <MarkdownEditor
              onToggleFileManager={() => setShowFileManager(!showFileManager)}
              showFileManager={showFileManager}
            />
          </div>
        </div>
      </EditorProvider>
    </div>
  )
}
