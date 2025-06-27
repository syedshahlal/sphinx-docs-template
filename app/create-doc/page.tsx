"use client"

import { MarkdownEditor } from "@/components/markdown-editor/MarkdownEditor"
import { EditorProvider } from "@/components/markdown-editor/EditorContext"
import { EditorToolbar } from "@/components/markdown-editor/EditorToolbar"

export default function CreateDocPage() {
  return (
    <EditorProvider>
      <div className="h-screen bg-background flex flex-col">
        {/* Header with Toolbar */}
        <EditorToolbar />

        {/* Main Editor */}
        <div className="flex-1 overflow-hidden">
          <MarkdownEditor />
        </div>
      </div>
    </EditorProvider>
  )
}
