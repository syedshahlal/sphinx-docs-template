"use client"
import { useState, useReducer, useCallback } from "react"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ComponentPalette } from "./ComponentPalette"
import { ComponentRenderer } from "./ComponentRenderer"
import { PreviewPanel } from "./PreviewPanel"
import { EditorToolbar } from "./EditorToolbar"
import { PropertiesPanel } from "./PropertiesPanel"
import { FileManager } from "./FileManager"
import { EditorContext } from "./EditorContext"
import { getDefaultContent } from "./ComponentPalette"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, EditorState, EditorAction } from "./types"
import { Plus, Grip } from "lucide-react"

// Initial editor state
const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  previewMode: "edit",
  layoutMode: "freeform",
  canvasSettings: {
    width: "100%",
    height: "auto",
    backgroundColor: "#ffffff",
    padding: "2rem",
    maxWidth: "1200px",
  },
  globalStyles: {
    fontFamily: "Inter, sans-serif",
    primaryColor: "#3b82f6",
    secondaryColor: "#6b7280",
    accentColor: "#10b981",
    borderRadius: "0.5rem",
    spacing: "1rem",
  },
  isDirty: false,
  history: {
    past: [],
    future: [],
  },
}

// Editor reducer
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newComponent: MarkdownComponent = {
        ...action.payload.component,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: action.payload.index !== undefined ? action.payload.index : state.components.length,
      }

      // Adjust order of existing components if inserting at specific index
      let updatedComponents = [...state.components]
      if (action.payload.index !== undefined) {
        updatedComponents = updatedComponents.map((comp) =>
          comp.order >= action.payload.index! ? { ...comp, order: comp.order + 1 } : comp,
        )
      }

      const newState = {
        ...state,
        components: [...updatedComponents, newComponent],
        selectedComponent: newComponent.id,
        isDirty: true,
      }

      if (action.returnId) {
        action.returnId(newComponent.id)
      }

      return newState
    }

    case "DELETE_COMPONENT":
      return {
        ...state,
        components: state.components.filter((comp) => comp.id !== action.payload.id),
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
        isDirty: true,
      }

    case "UPDATE_COMPONENT":
      return {
        ...state,
        components: state.components.map((comp) =>
          comp.id === action.payload.id ? { ...comp, ...action.payload.updates } : comp,
        ),
        isDirty: true,
      }

    case "UPDATE_COMPONENT_CONTENT":
      return {
        ...state,
        components: state.components.map((comp) =>
          comp.id === action.payload.id
            ? { ...comp, content: { ...comp.content, ...action.payload.contentUpdates } }
            : comp,
        ),
        isDirty: true,
      }

    case "UPDATE_COMPONENT_STYLE":
      return {
        ...state,
        components: state.components.map((comp) =>
          comp.id === action.payload.id ? { ...comp, style: { ...comp.style, ...action.payload.styleUpdates } } : comp,
        ),
        isDirty: true,
      }

    case "REORDER_COMPONENTS":
      return {
        ...state,
        components: action.payload.components.map((comp, index) => ({ ...comp, order: index })),
        isDirty: true,
      }

    case "SELECT_COMPONENT":
      return {
        ...state,
        selectedComponent: action.payload.id,
      }

    case "SET_PREVIEW_MODE":
      return {
        ...state,
        previewMode: action.payload.mode,
      }

    case "SET_LAYOUT_MODE":
      return {
        ...state,
        layoutMode: action.payload.mode,
      }

    case "SET_CANVAS_SETTINGS":
      return {
        ...state,
        canvasSettings: { ...state.canvasSettings, ...action.payload.settings },
        isDirty: true,
      }

    case "SET_GLOBAL_STYLES":
      return {
        ...state,
        globalStyles: { ...state.globalStyles, ...action.payload.styles },
        isDirty: true,
      }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((comp) => comp.id === action.payload.id)
      if (!componentToDuplicate) return state

      const duplicatedComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: componentToDuplicate.order + 1,
      }

      const updatedComponents = state.components.map((comp) =>
        comp.order > componentToDuplicate.order ? { ...comp, order: comp.order + 1 } : comp,
      )

      return {
        ...state,
        components: [...updatedComponents, duplicatedComponent],
        selectedComponent: duplicatedComponent.id,
        isDirty: true,
      }
    }

    case "COPY_COMPONENT": {
      const componentToCopy = state.components.find((comp) => comp.id === action.payload.id)
      if (!componentToCopy) return state

      return {
        ...state,
        clipboard: componentToCopy,
      }
    }

    case "PASTE_COMPONENT": {
      if (!state.clipboard) return state

      const pastedComponent: MarkdownComponent = {
        ...state.clipboard,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: action.payload.index !== undefined ? action.payload.index : state.components.length,
      }

      let updatedComponents = [...state.components]
      if (action.payload.index !== undefined) {
        updatedComponents = updatedComponents.map((comp) =>
          comp.order >= action.payload.index! ? { ...comp, order: comp.order + 1 } : comp,
        )
      }

      return {
        ...state,
        components: [...updatedComponents, pastedComponent],
        selectedComponent: pastedComponent.id,
        isDirty: true,
      }
    }

    case "LOCK_COMPONENT":
      return {
        ...state,
        components: state.components.map((comp) =>
          comp.id === action.payload.id ? { ...comp, locked: action.payload.locked } : comp,
        ),
        isDirty: true,
      }

    case "HIDE_COMPONENT":
      return {
        ...state,
        components: state.components.map((comp) =>
          comp.id === action.payload.id ? { ...comp, hidden: action.payload.hidden } : comp,
        ),
        isDirty: true,
      }

    case "SET_DIRTY":
      return {
        ...state,
        isDirty: action.payload.isDirty,
      }

    case "UNDO": {
      if (state.history.past.length === 0) return state

      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, state.history.past.length - 1)

      return {
        ...previous,
        history: {
          past: newPast,
          future: [state, ...state.history.future],
        },
      }
    }

    case "REDO": {
      if (state.history.future.length === 0) return state

      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)

      return {
        ...next,
        history: {
          past: [...state.history.past, state],
          future: newFuture,
        },
      }
    }

    case "CLEAR_HISTORY":
      return {
        ...state,
        history: {
          past: [],
          future: [],
        },
      }

    default:
      return state
  }
}

export function MarkdownEditor() {
  const [state, dispatch] = useReducer(editorReducer, initialState)
  const [activeTab, setActiveTab] = useState("editor")
  const [draggedComponent, setDraggedComponent] = useState<MarkdownComponent | null>(null)

  // Handle component content updates
  const updateComponentContent = useCallback((id: string, contentUpdates: any) => {
    dispatch({
      type: "UPDATE_COMPONENT_CONTENT",
      payload: { id, contentUpdates },
    })
  }, [])

  // Handle component style updates
  const updateComponentStyle = useCallback((id: string, styleUpdates: any) => {
    dispatch({
      type: "UPDATE_COMPONENT_STYLE",
      payload: { id, styleUpdates },
    })
  }, [])

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const draggedId = active.id as string

    if (draggedId.startsWith("palette-")) {
      // Dragging from palette - create preview component
      const componentType = active.data.current?.type
      const htmlBlockKey = active.data.current?.htmlBlockKey

      if (componentType) {
        const previewComponent: MarkdownComponent = {
          id: "preview",
          type: componentType,
          content: getDefaultContent(componentType, htmlBlockKey),
          order: 0,
        }
        setDraggedComponent(previewComponent)
      }
    } else {
      // Dragging existing component
      const component = state.components.find((comp) => comp.id === draggedId)
      if (component) {
        setDraggedComponent(component)
      }
    }
  }

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDraggedComponent(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId.startsWith("palette-")) {
      // Adding new component from palette
      const componentType = active.data.current?.type
      const htmlBlockKey = active.data.current?.htmlBlockKey

      if (componentType) {
        let insertIndex = state.components.length

        if (overId.startsWith("component-")) {
          const overComponent = state.components.find((comp) => comp.id === overId)
          if (overComponent) {
            insertIndex = overComponent.order + 1
          }
        }

        dispatch({
          type: "ADD_COMPONENT",
          payload: {
            component: {
              type: componentType,
              content: getDefaultContent(componentType, htmlBlockKey),
            },
            index: insertIndex,
          },
        })
      }
    } else if (activeId !== overId && overId.startsWith("component-")) {
      // Reordering existing components
      const activeComponent = state.components.find((comp) => comp.id === activeId)
      const overComponent = state.components.find((comp) => comp.id === overId)

      if (activeComponent && overComponent) {
        const sortedComponents = [...state.components].sort((a, b) => a.order - b.order)
        const activeIndex = sortedComponents.findIndex((comp) => comp.id === activeId)
        const overIndex = sortedComponents.findIndex((comp) => comp.id === overId)

        if (activeIndex !== overIndex) {
          const reorderedComponents = [...sortedComponents]
          const [removed] = reorderedComponents.splice(activeIndex, 1)
          reorderedComponents.splice(overIndex, 0, removed)

          dispatch({
            type: "REORDER_COMPONENTS",
            payload: { components: reorderedComponents },
          })
        }
      }
    }
  }

  // Add empty component
  const addEmptyComponent = (type: MarkdownComponent["type"]) => {
    dispatch({
      type: "ADD_COMPONENT",
      payload: {
        component: {
          type,
          content: getDefaultContent(type),
        },
      },
    })
  }

  const sortedComponents = [...state.components].sort((a, b) => a.order - b.order)

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Toolbar */}
        <EditorToolbar />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="mx-4 mt-2 grid w-auto grid-cols-2 bg-white shadow-sm">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="h-full mt-2">
              <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  {/* Component Palette */}
                  <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                    <ComponentPalette />
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Main Editor Canvas */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full flex flex-col bg-white">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Canvas</h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addEmptyComponent("paragraph")}
                              className="flex items-center gap-2"
                            >
                              <Plus className="w-4 h-4" />
                              Add Text
                            </Button>
                          </div>
                        </div>
                      </div>

                      <ScrollArea className="flex-1">
                        <div
                          className="p-6 min-h-full"
                          style={{
                            backgroundColor: state.canvasSettings.backgroundColor,
                            maxWidth: state.canvasSettings.maxWidth,
                            margin: "0 auto",
                            padding: state.canvasSettings.padding,
                          }}
                        >
                          {sortedComponents.length === 0 ? (
                            <div className="text-center py-16">
                              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <Plus className="h-8 w-8 text-gray-400" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building</h3>
                              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                Drag components from the palette or click the button below to add your first component.
                              </p>
                              <div className="flex gap-2 justify-center">
                                <Button onClick={() => addEmptyComponent("heading")}>Add Heading</Button>
                                <Button variant="outline" onClick={() => addEmptyComponent("paragraph")}>
                                  Add Paragraph
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <SortableContext
                              items={sortedComponents.map((comp) => comp.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="space-y-6">
                                {sortedComponents.map((component) => (
                                  <div
                                    key={component.id}
                                    id={component.id}
                                    className={cn(
                                      "group relative",
                                      component.hidden && "opacity-50",
                                      component.locked && "pointer-events-none",
                                    )}
                                    onClick={() =>
                                      dispatch({ type: "SELECT_COMPONENT", payload: { id: component.id } })
                                    }
                                  >
                                    {/* Drag Handle */}
                                    <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="p-1 bg-gray-200 rounded cursor-grab hover:bg-gray-300">
                                        <Grip className="w-4 h-4 text-gray-600" />
                                      </div>
                                    </div>

                                    <ComponentRenderer
                                      component={component}
                                      isSelected={state.selectedComponent === component.id}
                                      updateComponentContent={updateComponentContent}
                                    />
                                  </div>
                                ))}
                              </div>
                            </SortableContext>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Properties Panel */}
                  <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
                    <div className="h-full flex flex-col">
                      <Tabs defaultValue="properties" className="h-full flex flex-col">
                        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2 bg-gray-100">
                          <TabsTrigger value="properties">Properties</TabsTrigger>
                          <TabsTrigger value="files">Files</TabsTrigger>
                        </TabsList>

                        <TabsContent value="properties" className="flex-1">
                          <PropertiesPanel
                            selectedComponent={
                              state.selectedComponent
                                ? state.components.find((comp) => comp.id === state.selectedComponent) || null
                                : null
                            }
                            onUpdateComponent={(updates) => {
                              if (state.selectedComponent) {
                                dispatch({
                                  type: "UPDATE_COMPONENT",
                                  payload: { id: state.selectedComponent, updates },
                                })
                              }
                            }}
                            onUpdateStyle={(styleUpdates) => {
                              if (state.selectedComponent) {
                                updateComponentStyle(state.selectedComponent, styleUpdates)
                              }
                            }}
                          />
                        </TabsContent>

                        <TabsContent value="files" className="flex-1">
                          <FileManager />
                        </TabsContent>
                      </Tabs>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>

                {/* Drag Overlay */}
                <DragOverlay>
                  {draggedComponent && (
                    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 p-4 opacity-90">
                      <ComponentRenderer
                        component={draggedComponent}
                        isSelected={false}
                        updateComponentContent={() => {}}
                      />
                    </div>
                  )}
                </DragOverlay>
              </DndContext>
            </TabsContent>

            <TabsContent value="preview" className="h-full mt-2">
              <PreviewPanel
                components={state.components}
                previewMode={state.previewMode}
                onPreviewModeChange={(mode) => dispatch({ type: "SET_PREVIEW_MODE", payload: { mode } })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </EditorContext.Provider>
  )
}
