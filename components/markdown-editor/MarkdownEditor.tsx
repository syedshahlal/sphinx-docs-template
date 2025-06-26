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
import type { MarkdownComponent } from "./types"

interface MarkdownEditorProps {
  onToggleFileManager: () => void
  showFileManager: boolean
}

export function MarkdownEditor({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const editorContext = useEditor() // Get the whole context
  const { state, reorderComponents, selectComponent } = editorContext // Destructure for convenience
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showProperties, setShowProperties] = useState(true)

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)

    if (!over) return // Dropped outside a valid target

    const activeId = active.id as string
    const overId = over.id as string

    // Case 1: Dragging from Palette to Canvas
    if (activeId.startsWith("palette-")) {
      const componentType = activeId.replace("palette-", "")
      // Ensure getDefaultContent is accessible or defined here, or passed down
      // For this QuickEdit, assuming getDefaultContent is part of useEditor or can be imported
      // Let's assume getDefaultContent is available via useEditor or imported
      // This function is defined in ComponentPalette.tsx, we need access to it.
      // For simplicity in QuickEdit, we'll replicate a simplified version or call addComponent.
      // The addComponent in EditorContext already handles creating default content.

      // We need to get the default content logic here.
      // The simplest way is to call addComponent from useEditor,
      // but addComponent appends. We need to insert at a specific position if 'over' is a component.

      const type = componentType as MarkdownComponent["type"] // Cast to the correct type

      // Let's get default content (this function needs to be imported or accessible)
      // For now, we'll rely on addComponent to create it, then reorder.
      // This is a bit of a workaround for QuickEdit. A cleaner way would be to have
      // getDefaultContent accessible here.

      // Create a temporary new component ID for tracking
      const tempNewComponentId = `new-${Date.now()}`

      // Add the component (it will be appended by default by addComponent)
      // We need a way to get the actual component data from the palette.
      // The `active.data.current` can hold this if set up in DraggableComponent.

      // Let's refine: DraggableComponent in ComponentPalette should pass its data.
      // This requires a change in ComponentPalette.tsx as well.
      // For a QuickEdit focused on MarkdownEditor.tsx, let's assume addComponent is smart enough
      // or we just add and then immediately re-position if needed.

      // The `addComponent` in EditorContext.tsx already creates the component with a unique ID and default content.
      // It appends it to the list. If we want to insert it at a specific position based on `overId`,
      // we'd need to modify `addComponent` or do more complex state manipulation here.

      // Simplest approach for drag-to-add:
      // 1. Identify the type from `activeId`.
      // 2. Call `editorContext.addComponent` with that type. This adds it to the end.
      // 3. If `overId` is a component on the canvas and we want to place it *near* that,
      //    we then need to find the newly added component (last in the list) and move it.

      // Let's assume for now that addComponent is called by the palette's click,
      // and drag-and-drop from palette should also call addComponent.
      // The issue might be that DndContext is not correctly identifying the drop zone
      // or the `over` object when dragging from palette.

      // If `active.data.current.type` was set in the Draggable component:
      const newComponentType = active.data.current?.type as MarkdownComponent["type"]
      if (newComponentType) {
        const newComponentData = active.data.current?.componentData as Omit<MarkdownComponent, "id" | "order">
        if (newComponentData) {
          // Add the component (it will be appended)
          const newId = editorContext.addComponent(newComponentData, true) // Pass a flag to return ID

          // Now, if `overId` is an existing component, move the new component
          const newComponents = [...editorContext.state.components]
          const addedComponentIndex = newComponents.findIndex((c) => c.id === newId)
          if (addedComponentIndex === -1) return // Should not happen

          const [movedComponent] = newComponents.splice(addedComponentIndex, 1)

          const overIndex = newComponents.findIndex((item) => item.id === overId)

          if (overIndex !== -1) {
            // Insert before the 'over' component
            newComponents.splice(overIndex, 0, movedComponent)
          } else {
            // If 'over' is not a component (e.g., the canvas itself), append
            newComponents.push(movedComponent)
          }
          editorContext.reorderComponents(newComponents)
          editorContext.selectComponent(newId)
        }
      }
      return // Handled new component addition
    }

    // Case 2: Reordering existing components on the Canvas
    if (activeId !== overId) {
      const oldIndex = editorContext.state.components.findIndex((item) => item.id === activeId)
      const newIndex = editorContext.state.components.findIndex((item) => item.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponentsOrder = [...editorContext.state.components]
        const [reorderedItem] = newComponentsOrder.splice(oldIndex, 1)
        newComponentsOrder.splice(newIndex, 0, reorderedItem)
        editorContext.reorderComponents(newComponentsOrder)
        editorContext.selectComponent(activeId) // Keep selection on the moved item
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
            {activeId ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-lg">Dragging component...</div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
