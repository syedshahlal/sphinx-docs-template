"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ComponentPalette, getDefaultContent } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { EditorToolbar } from "./EditorToolbar"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"

interface MarkdownEditorProps {
  onToggleFileManager: () => void
  showFileManager: boolean
}

export function MarkdownEditor({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const { state, addComponent, reorderComponents, selectComponent } = useEditor()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showProperties, setShowProperties] = useState(true)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Case 1: Dragging from Palette to Canvas
    if (activeId.startsWith("palette-")) {
      const componentType = activeId.replace("palette-", "") as MarkdownComponent["type"]
      const newComponentContent = getDefaultContent(componentType)

      const newComponent: Omit<MarkdownComponent, "id" | "order"> = {
        type: componentType,
        content: newComponentContent,
      }

      // Add component and get its new ID
      const newId = addComponent(newComponent, true)
      if (!newId) return

      // Now, correctly position the newly added component
      const newComponents = [...state.components]
      const addedComponent = newComponents.pop() // The new component was appended
      if (!addedComponent || addedComponent.id !== newId) {
        // Fallback or error handling
        return
      }

      const overIndex = newComponents.findIndex((item) => item.id === overId)

      if (overIndex !== -1) {
        newComponents.splice(overIndex, 0, addedComponent)
      } else {
        // If dropped on the canvas but not on a specific item, append it
        newComponents.push(addedComponent)
      }

      reorderComponents(newComponents)
      selectComponent(newId)
      return
    }

    // Case 2: Reordering existing components on the Canvas
    if (activeId !== overId) {
      const oldIndex = state.components.findIndex((item) => item.id === activeId)
      const newIndex = state.components.findIndex((item) => item.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponentsOrder = [...state.components]
        const [reorderedItem] = newComponentsOrder.splice(oldIndex, 1)
        newComponentsOrder.splice(newIndex, 0, reorderedItem)
        reorderComponents(newComponentsOrder)
        selectComponent(activeId)
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <EditorToolbar
        onToggleFileManager={onToggleFileManager}
        showFileManager={showFileManager}
        onToggleProperties={() => setShowProperties(!showProperties)}
        showProperties={showProperties}
      />

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Component Palette */}
          <div className="w-64 border-r border-border bg-card overflow-y-auto">
            <ComponentPalette />
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 flex">
            <div className="flex-1 overflow-y-auto">
              <SortableContext items={state.components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <EditorCanvas />
              </SortableContext>
            </div>

            {/* Preview Panel */}
            <div className="w-1/2 border-l border-border">
              <PreviewPanel />
            </div>
          </div>

          {/* Properties Panel */}
          {showProperties && (
            <div className="w-80 border-l border-border bg-card overflow-y-auto">
              <PropertiesPanel />
            </div>
          )}

          <DragOverlay>
            {activeId && !activeId.startsWith("palette-") ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-lg">Moving component...</div>
            ) : null}
            {activeId && activeId.startsWith("palette-") ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                Adding {activeId.replace("palette-", "")}...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
