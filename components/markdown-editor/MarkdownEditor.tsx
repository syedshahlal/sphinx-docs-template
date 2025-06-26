"use client"

import { useState } from "react"
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
import { FileManager } from "./FileManager"
import { EditorProvider, useEditor } from "./EditorContext"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import type { MarkdownComponent } from "./types"

interface MarkdownEditorProps {
  onToggleFileManager?: () => void
  showFileManager?: boolean
}

function MarkdownEditorContent({ onToggleFileManager, showFileManager }: MarkdownEditorProps) {
  const {
    state,
    addComponent,
    reorderComponents,
    selectComponent,
    updateComponent,
    updateComponentContent,
    updateComponentStyle,
  } = useEditor()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [showFileManagerPanel, setShowFileManagerPanel] = useState(false)

  // Using PointerSensor to avoid issues with complex nested elements
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

      let targetIndex = state.components.length // Default to end of list

      if (over) {
        const overId = over.id as string
        // Check if 'over' is one of the sortable components
        const overComponentIndex = state.components.findIndex((c) => c.id === overId)

        if (overComponentIndex !== -1) {
          // Insert after the component dropped onto.
          targetIndex = overComponentIndex + 1
        }
      }

      addComponent(newComponentBase, true, targetIndex)
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

  const handleToggleFileManager = () => {
    setShowFileManagerPanel(!showFileManagerPanel)
    if (onToggleFileManager) {
      onToggleFileManager()
    }
  }

  const handleUpdateComponent = (updates: Partial<MarkdownComponent>) => {
    if (state.selectedComponent) {
      updateComponent(state.selectedComponent, updates)
    }
  }

  const handleUpdateStyle = (styleUpdates: any) => {
    if (state.selectedComponent) {
      updateComponentStyle(state.selectedComponent, styleUpdates)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <EditorToolbar onToggleFileManager={handleToggleFileManager} />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* Component Palette */}
          <div className="w-80 border-r border-border bg-card overflow-y-auto">
            <ComponentPalette />
          </div>

          {/* Main Editor and Preview Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              {/* Editor Canvas */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full overflow-y-auto bg-muted/20">
                  <SortableContext items={state.components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                    <EditorCanvas />
                  </SortableContext>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Preview Panel */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full border-l border-border bg-card overflow-y-auto">
                  <PreviewPanel
                    components={state.components}
                    previewMode={state.previewMode}
                    onPreviewModeChange={(mode) => {
                      // Handle preview mode change
                    }}
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l border-border bg-card overflow-y-auto">
            {showFileManagerPanel ? (
              <FileManager />
            ) : (
              <PropertiesPanel
                selectedComponent={
                  state.selectedComponent
                    ? state.components.find((comp) => comp.id === state.selectedComponent) || null
                    : null
                }
                onUpdateComponent={handleUpdateComponent}
                onUpdateStyle={handleUpdateStyle}
              />
            )}
          </div>

          <DragOverlay>
            {activeDragId ? (
              <div className="bg-primary text-primary-foreground border border-primary rounded-lg p-3 shadow-xl text-sm">
                {activeDragId.startsWith("palette-")
                  ? `Adding ${activeDragId.split("-")[1]}...`
                  : "Moving component..."}
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  return (
    <EditorProvider>
      <MarkdownEditorContent {...props} />
    </EditorProvider>
  )
}
