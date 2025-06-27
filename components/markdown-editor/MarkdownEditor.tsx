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
    <div className="h-full bg-[#f7f8f9]">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          {/* Confluence-style Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentPalette />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-[#dfe1e6] hover:bg-[#b3bac5] w-1" />

          {/* Main Editor Canvas */}
          <ResizablePanel defaultSize={45} minSize={35}>
            <EditorCanvas />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-[#dfe1e6] hover:bg-[#b3bac5] w-1" />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <PreviewPanel />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-[#dfe1e6] hover:bg-[#b3bac5] w-1" />

          {/* Properties Panel */}
          <ResizablePanel defaultSize={10} minSize={15} maxSize={25}>
            <PropertiesPanel />
          </ResizablePanel>
        </ResizablePanelGroup>

        <DragOverlay>
          {activeId ? (
            <div className="bg-[#0052cc]/10 border-2 border-[#0052cc] border-dashed rounded-lg p-4 shadow-lg">
              <div className="text-sm font-medium text-[#0052cc]">
                {activeId.replace("palette-", "").replace(/-/g, " ")}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
