"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Smartphone, Tablet, Laptop, Undo, Redo, Save, UploadCloud } from "lucide-react"
import { useEditor } from "./EditorContext"
import { PublishDialog } from "./PublishDialog"
import { componentsToMarkdown } from "@/lib/markdown-converter"

interface EditorToolbarProps {
  onToggleFileManager?: () => void
}

export function EditorToolbar({ onToggleFileManager }: EditorToolbarProps) {
  const { state, setPreviewMode, undo, redo, canUndo, canRedo } = useEditor()
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)

  const handlePublish = () => {
    setIsPublishDialogOpen(true)
  }

  const getMarkdownContent = () => {
    return componentsToMarkdown(state.components)
  }

  return (
    <>
      <div className="p-2 border-b bg-card flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground mr-2">Preview:</span>
          <Button
            variant={state.previewMode === "edit" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("edit")}
          >
            <Eye className="w-4 h-4 mr-2" />
            Editor
          </Button>
          <Button
            variant={state.previewMode === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
          <Button
            variant={state.previewMode === "tablet" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("tablet")}
          >
            <Tablet className="w-4 h-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={state.previewMode === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("preview")}
          >
            <Laptop className="w-4 h-4 mr-2" />
            Desktop
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo}>
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo}>
            <Redo className="w-4 h-4 mr-2" />
            Redo
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button size="sm" onClick={handlePublish}>
            <UploadCloud className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
      <PublishDialog
        isOpen={isPublishDialogOpen}
        onOpenChange={setIsPublishDialogOpen}
        markdownContent={getMarkdownContent()}
        fileName={state.fileName || "new-document.md"}
        filePath={state.filePath || "docs/"}
      />
    </>
  )
}
