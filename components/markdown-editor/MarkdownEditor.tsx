"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { ComponentPalette } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { EditorToolbar } from "./EditorToolbar"
import { PreviewPanel } from "./PreviewPanel"
import { FileManager } from "./FileManager"
import { useEditor } from "./EditorContext"
import { getDefaultContent } from "./ComponentPalette"
import type { MarkdownComponent } from "./types"

export function MarkdownEditor() {
  const { state, addComponent, selectComponent } = useEditor()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showFileManager, setShowFileManager] = useState(false)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (over.id === "canvas-drop-zone") {
      const dragData = active.data.current
      if (dragData?.type) {
        const newComponent: Omit<MarkdownComponent, "id" | "order"> = {
          type: dragData.type,
          content: getDefaultContent(dragData.type, dragData.htmlBlockKey),
          style: {},
        }

        addComponent(newComponent, undefined, (id) => {
          selectComponent(id)
        })
      }
    }
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-background">
        <EditorToolbar
          onTogglePreview={() => setShowPreview(!showPreview)}
          onToggleFileManager={() => setShowFileManager(!showFileManager)}
          showPreview={showPreview}
          showFileManager={showFileManager}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Component Palette */}
          <div className="w-80 border-r border-border bg-card">
            <ComponentPalette />
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex">
            {showFileManager && (
              <div className="w-80 border-r border-border bg-card">
                <FileManager />
              </div>
            )}

            <div className="flex-1 relative">{showPreview ? <PreviewPanel /> : <EditorCanvas />}</div>
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l border-border bg-card">
            <PropertiesPanel />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="bg-primary/10 border-2 border-primary border-dashed rounded-lg p-4">
            <div className="text-sm font-medium">{activeId.replace("palette-", "").replace(/-/g, " ")}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
