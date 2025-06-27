"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { ComponentPalette } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { useEditor } from "./EditorContext"
import { getDefaultContent } from "./ComponentPalette"
import type { MarkdownComponent } from "./types"

export function MarkdownEditor() {
  const { state, addComponent, selectComponent } = useEditor()
  const [activeId, setActiveId] = useState<string | null>(null)

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
        {/* Main Content - 4 Section Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Section 1: Elements/Components Palette */}
          <div className="w-80 border-r border-border bg-card flex-shrink-0">
            <ComponentPalette />
          </div>

          {/* Section 2: Editor Canvas */}
          <div className="flex-1 min-w-0">
            <EditorCanvas />
          </div>

          {/* Section 3: Preview Panel */}
          <div className="w-96 border-l border-border bg-card flex-shrink-0">
            <PreviewPanel />
          </div>

          {/* Section 4: Properties Panel */}
          <div className="w-80 border-l border-border bg-card flex-shrink-0">
            <PropertiesPanel />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="bg-primary/10 border-2 border-primary border-dashed rounded-lg p-4 shadow-lg">
            <div className="text-sm font-medium">{activeId.replace("palette-", "").replace(/-/g, " ")}</div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
