"use client"

import { useState, useMemo } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ComponentPalette, getDefaultContent } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { EditorToolbar } from "./EditorToolbar"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"
import { cn } from "@/lib/utils" // Assuming you have a cn utility

interface MarkdownEditorProps {
  onToggleFileManager: () => void // Assuming this is for a separate file manager UI
  showFileManager: boolean
}

export function MarkdownEditor({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const { state, addComponent, reorderComponents, selectComponent } = useEditor()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
    // If dragging from palette, don't select a component on canvas yet
    if (!(event.active.id as string).startsWith("palette-")) {
      selectComponent(event.active.id as string)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Case 1: Dragging from Palette to Canvas
    if (activeId.startsWith("palette-")) {
      const componentType = activeId.replace("palette-", "") as MarkdownComponent["type"]
      const newComponentContent = getDefaultContent(componentType)
      const newComponentBase: Omit<MarkdownComponent, "id" | "order"> = {
        type: componentType,
        content: newComponentContent,
      }

      let targetIndex = state.components.length
      const overComponentIndex = state.components.findIndex((c) => c.id === overId)
      if (overComponentIndex !== -1) {
        // Determine if dropping above or below the 'over' component based on mouse position relative to midpoint
        // This is a simplification; dnd-kit provides more robust ways if needed
        targetIndex = overComponentIndex // Default to inserting before
        // A more precise calculation would involve `event.delta.y` or `over.rect`
      }

      addComponent(newComponentBase, false, targetIndex)
      // The new component ID is generated inside addComponent, selection happens there
      return
    }

    // Case 2: Reordering existing components on the Canvas
    if (activeId !== overId) {
      const oldIndex = state.components.findIndex((item) => item.id === activeId)
      const newIndex = state.components.findIndex((item) => item.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComponentsOrder = Array.from(state.components)
        const [reorderedItem] = newComponentsOrder.splice(oldIndex, 1)
        newComponentsOrder.splice(newIndex, 0, reorderedItem)
        reorderComponents(newComponentsOrder)
        selectComponent(activeId)
      }
    }
  }

  const editorLayoutClasses = useMemo(() => {
    switch (state.layoutMode) {
      case "focus-canvas":
        return {
          palette: "w-64",
          mainArea: "flex-1",
          canvasContainer: "flex-1",
          previewPanel: "hidden",
          propertiesPanel: "hidden",
        }
      case "focus-preview":
        return {
          palette: "hidden",
          mainArea: "flex-1",
          canvasContainer: "hidden",
          previewPanel: "flex-1",
          propertiesPanel: "w-80", // Or hidden, depending on desired focus
        }
      case "default":
      default:
        return {
          palette: "w-64",
          mainArea: "flex-1 flex",
          canvasContainer: "flex-1", // Takes up remaining space next to preview
          previewPanel: "w-1/2 border-l", // Split view
          propertiesPanel: "w-80 border-l",
        }
    }
  }, [state.layoutMode])

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <EditorToolbar
        onToggleFileManager={onToggleFileManager} // This might be for a different file manager
      />
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className="flex flex-1 overflow-hidden">
          {/* Component Palette */}
          <div
            className={cn(
              "border-r border-border bg-card overflow-y-auto transition-all duration-300",
              editorLayoutClasses.palette,
              state.layoutMode === "focus-preview" ? "hidden" : "block",
            )}
          >
            <ComponentPalette />
          </div>

          {/* Main Editor and Preview Area */}
          <div className={cn("flex flex-col flex-1 overflow-hidden", editorLayoutClasses.mainArea)}>
            <div className={cn("flex flex-1 overflow-hidden")}>
              {/* Editor Canvas */}
              <div
                className={cn(
                  "overflow-y-auto bg-muted/20 transition-all duration-300",
                  editorLayoutClasses.canvasContainer,
                  state.layoutMode === "focus-preview" ? "hidden" : "block",
                )}
              >
                <SortableContext items={state.components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                  <EditorCanvas />
                </SortableContext>
              </div>

              {/* Preview Panel */}
              <div
                className={cn(
                  "border-border bg-card overflow-y-auto transition-all duration-300",
                  editorLayoutClasses.previewPanel,
                  state.layoutMode === "focus-canvas" ? "hidden" : "block",
                )}
              >
                <PreviewPanel />
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div
            className={cn(
              "border-l border-border bg-card overflow-y-auto transition-all duration-300",
              editorLayoutClasses.propertiesPanel,
              state.layoutMode === "focus-canvas" || state.layoutMode === "focus-preview" || !state.selectedComponent
                ? "hidden"
                : "block",
            )}
          >
            <PropertiesPanel />
          </div>

          <DragOverlay>
            {activeDragId ? (
              <div className="bg-primary text-primary-foreground border border-primary-focus rounded-lg p-3 shadow-xl text-sm">
                {activeDragId.startsWith("palette-")
                  ? `Adding ${activeDragId.replace("palette-", "")}...`
                  : "Moving component..."}
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}
