"use client"

import { useState } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ComponentPalette } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { EditorToolbar } from "./EditorToolbar"
import { useEditor } from "./EditorContext"

interface MarkdownEditorProps {
  onToggleFileManager: () => void
  showFileManager: boolean
}

export function MarkdownEditor({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const { state, reorderComponents, selectComponent } = useEditor()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showProperties, setShowProperties] = useState(true)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = state.components.findIndex((item) => item.id === active.id)
      const newIndex = state.components.findIndex((item) => item.id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponents = [...state.components]
        const [reorderedItem] = newComponents.splice(oldIndex, 1)
        newComponents.splice(newIndex, 0, reorderedItem)
        reorderComponents(newComponents)
      }
    }

    setActiveId(null)
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
            {activeId ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-lg">Dragging component...</div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
