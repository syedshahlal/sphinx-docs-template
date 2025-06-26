"use client"

import { useState, useMemo } from "react"
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ComponentPalette, getDefaultContent } from "./ComponentPalette"
import { EditorCanvas } from "./EditorCanvas"
import { PropertiesPanel } from "./PropertiesPanel"
import { PreviewPanel } from "./PreviewPanel"
import { EditorToolbar } from "./EditorToolbar"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"
import { cn } from "@/lib/utils"

interface MarkdownEditorProps {
  onToggleFileManager: () => void
  showFileManager: boolean
}

export function MarkdownEditor({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const { state, addComponent, reorderComponents, selectComponent } = useEditor()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  // Using PointerSensor to potentially avoid issues with complex nested elements
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Drag starts after 8px of movement
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string)
    if (!(event.active.id as string).startsWith("palette-")) {
      selectComponent(event.active.id as string)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null)
    const { active, over } = event

    if (!active) return

    const activeId = active.id as string

    // Case 1: Dragging from Palette to Canvas
    if (activeId.startsWith("palette-")) {
      const componentTypeFromPalette = active.data.current?.type as MarkdownComponent["type"]
      const htmlBlockKeyFromPalette = active.data.current?.htmlBlockKey as string | undefined

      if (!componentTypeFromPalette) {
        console.error(
          "DragEnd Error: Component type missing from palette item data for ID:",
          activeId,
          active.data.current,
        )
        return
      }

      const newComponentContent = getDefaultContent(componentTypeFromPalette, htmlBlockKeyFromPalette)
      if (newComponentContent === undefined) {
        console.error(
          `DragEnd Error: getDefaultContent returned undefined for type "${componentTypeFromPalette}". Aborting add.`,
        )
        return
      }
      const newComponentBase: Omit<MarkdownComponent, "id" | "order"> = {
        type: componentTypeFromPalette,
        content: newComponentContent,
      }

      // Always add to the end of the list for chronological order when dragging from palette
      const targetIndex = state.components.length
      addComponent(newComponentBase, false, targetIndex)
      // addComponent in context handles selection of the new component.
      return
    }

    // Case 2: Reordering existing components on the Canvas
    if (!over) return // No drop target for reordering
    const overId = over.id as string

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
    // ... (rest of the layout logic remains the same)
    switch (state.layoutMode) {
      case "focus-canvas":
        return {
          palette: "w-64 md:w-72 lg:w-80", // Responsive palette width
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
          propertiesPanel: "w-80 md:w-96", // Responsive properties panel
        }
      case "default":
      default:
        return {
          palette: "w-64 md:w-72 lg:w-80",
          mainArea: "flex-1 flex",
          canvasContainer: "flex-1",
          previewPanel: "w-1/2 border-l dark:border-neutral-700",
          propertiesPanel: "w-80 md:w-96 border-l dark:border-neutral-700",
        }
    }
  }, [state.layoutMode])

  return (
    <div className="flex flex-col h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-neutral-100">
      <EditorToolbar onToggleFileManager={onToggleFileManager} />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Component Palette */}
          <div
            className={cn(
              "border-r border-border dark:border-neutral-700 bg-card dark:bg-neutral-800 overflow-y-auto transition-all duration-300",
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
                  "overflow-y-auto bg-muted/20 dark:bg-neutral-800/30 transition-all duration-300",
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
                  "border-border bg-card dark:bg-neutral-800 overflow-y-auto transition-all duration-300",
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
              "border-l border-border dark:border-neutral-700 bg-card dark:bg-neutral-800 overflow-y-auto transition-all duration-300",
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
                  ? `Adding ${activeDragId.split("-")[1]}...` // Simpler label for overlay
                  : "Moving component..."}
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}
