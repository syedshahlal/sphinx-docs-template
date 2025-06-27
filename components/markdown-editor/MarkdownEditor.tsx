"use client"

import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, closestCenter } from "@dnd-kit/core"
import { useState } from "react"
import { ComponentPalette } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { useEditor } from "./EditorContext"
import { getDefaultContent } from "./ComponentPalette"
import type { MarkdownComponent } from "./types"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export function MarkdownEditor() {
  const { addComponent, selectComponent } = useEditor()
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
          <ComponentPalette />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={37} minSize={30}>
          <EditorCanvas />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={27} minSize={20}>
          <PreviewPanel />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
          <PropertiesPanel />
        </ResizablePanel>
      </ResizablePanelGroup>

      <DragOverlay>
        {activeId ? (
          <div className="bg-primary/10 border-2 border-primary border-dashed rounded-lg p-4 shadow-lg">
            <div className="text-sm font-medium text-primary">
              {activeId.replace("palette-", "").replace(/-/g, " ")}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
