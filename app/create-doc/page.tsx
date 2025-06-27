"use client"

import { EditorProvider } from "@/components/markdown-editor/EditorContext"
import { MarkdownEditor } from "@/components/markdown-editor/MarkdownEditor"
import { EditorToolbar } from "@/components/markdown-editor/EditorToolbar"

export default function CreateDocPage() {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col bg-[#f7f8f9]">
        {/* Confluence-style Header */}
        <div className="bg-white border-b border-[#dfe1e6] shadow-sm">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#0052cc] rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GRA</span>
                  </div>
                  <span className="font-semibold text-[#172b4d]">GRA Core Documentation</span>
                </div>
                <div className="text-[#6b778c] text-sm">
                  <span>/</span>
                  <span className="mx-2">Documentation</span>
                  <span>/</span>
                  <span className="mx-2 text-[#0052cc]">Create New Page</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-[#6b778c] hover:text-[#172b4d] text-sm">Help</button>
                <div className="w-8 h-8 bg-[#dfe1e6] rounded-full flex items-center justify-center">
                  <span className="text-[#172b4d] text-sm font-medium">U</span>
                </div>
              </div>
            </div>
          </div>
          <EditorToolbar />
        </div>

        {/* Main Editor */}
        <div className="flex-1 overflow-hidden">
          <MarkdownEditor />
        </div>
      </div>
    </EditorProvider>
  )
}
