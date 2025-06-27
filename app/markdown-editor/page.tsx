"use client"

import { EditorProvider } from "@/components/markdown-editor/EditorContext"
import { MarkdownEditor } from "@/components/markdown-editor/MarkdownEditor"
import { EditorToolbar } from "@/components/markdown-editor/EditorToolbar"

export default function MarkdownEditorPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col bg-[#f7f8f9]">
        <EditorToolbar />
        <div className="flex-1 overflow-hidden">
          <MarkdownEditor />
        </div>
      </div>
    </EditorProvider>
  )
}
