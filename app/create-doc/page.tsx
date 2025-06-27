"use client"

import { MarkdownEditor } from "@/components/markdown-editor/MarkdownEditor"
import { EditorProvider } from "@/components/markdown-editor/EditorContext"

export default function CreateDocPage() {
  return (
    <EditorProvider>
      <div className="h-screen bg-background">
        <MarkdownEditor />
      </div>
    </EditorProvider>
  )
}
