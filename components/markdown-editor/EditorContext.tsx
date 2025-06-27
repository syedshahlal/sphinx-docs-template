"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorAction, MarkdownComponent } from "./types"

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
    accentColor: "#f59e0b",
    borderRadius: "0.5rem",
    spacing: "1rem",
  },
  isDirty: false,
  history: {
    past: [],
    future: [],
  },
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newComponent: MarkdownComponent = {
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...action.payload.component,
        order: action.payload.index ?? state.components.length,
      }

      const newComponents = [...state.components]
      if (action.payload.index !== undefined) {
        newComponents.splice(action.payload.index, 0, newComponent)
      } else {
        newComponents.push(newComponent)
      }

      // Update order for all components
      const orderedComponents = newComponents.map((comp, index) => ({
        ...comp,
        order: index,
      }))

      if (action.returnId) {
        action.returnId(newComponent.id)
      }

      return {
        ...state,
        components: orderedComponents,
        selectedComponent: newComponent.id,
        isDirty: true,
      }
    }

    case "DELETE_COMPONENT": {
      const newComponents = state.components.filter((comp) => comp.id !== action.payload.id)
      return {
        ...state,
        components: newComponents.map((comp, index) => ({ ...comp, order: index })),
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
        isDirty: true,
      }
    }

    case "UPDATE_COMPONENT": {
      const newComponents = state.components.map((comp) =>
        comp.id === action.payload.id ? { ...comp, ...action.payload.updates } : comp,
      )
      return {
        ...state,
        components: newComponents,
        isDirty: true,
      }
    }

    case "UPDATE_COMPONENT_CONTENT": {
      const newComponents = state.components.map((comp) =>
        comp.id === action.payload.id
          ? { ...comp, content: { ...comp.content, ...action.payload.contentUpdates } }
          : comp,
      )
      return {
        ...state,
        components: newComponents,
        isDirty: true,
      }
    }

    case "UPDATE_COMPONENT_STYLE": {
      const newComponents = state.components.map((comp) =>
        comp.id === action.payload.id ? { ...comp, style: { ...comp.style, ...action.payload.styleUpdates } } : comp,
      )
      return {
        ...state,
        components: newComponents,
        isDirty: true,
      }
    }

    case "REORDER_COMPONENTS": {
      const orderedComponents = action.payload.components.map((comp, index) => ({
        ...comp,
        order: index,
      }))
      return {
        ...state,
        components: orderedComponents,
        isDirty: true,
      }
    }

    case "SELECT_COMPONENT": {
      return {
        ...state,
        selectedComponent: action.payload.id,
      }
    }

    case "SET_PREVIEW_MODE": {
      return {
        ...state,
        previewMode: action.payload.mode,
      }
    }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((comp) => comp.id === action.payload.id)
      if (!componentToDuplicate) return state

      const duplicatedComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        order: componentToDuplicate.order + 1,
      }

      const newComponents = [...state.components]
      const insertIndex = componentToDuplicate.order + 1
      newComponents.splice(insertIndex, 0, duplicatedComponent)

      return {
        ...state,
        components: newComponents.map((comp, index) => ({ ...comp, order: index })),
        selectedComponent: duplicatedComponent.id,
        isDirty: true,
      }
    }

    default:
      return state
  }
}

interface EditorContextType {
  state: EditorState
  addComponent: (component: Omit<MarkdownComponent, "id" | "order">, select?: boolean, index?: number) => string
  deleteComponent: (id: string) => void
  updateComponent: (id: string, updates: Partial<MarkdownComponent>) => void
  updateComponentContent: (id: string, contentUpdates: any) => void
  updateComponentStyle: (id: string, styleUpdates: any) => void
  selectComponent: (id: string | null) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  duplicateComponent: (id: string) => void
  moveComponent: (id: string, newIndex: number) => void
}

const EditorContext = createContext<EditorContextType | null>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback(
    (component: Omit<MarkdownComponent, "id" | "order">, select = true, index?: number): string => {
      let componentId = ""
      dispatch({
        type: "ADD_COMPONENT",
        payload: { component, index },
        returnId: (id) => {
          componentId = id
        },
      })
      return componentId
    },
    [],
  )

  const deleteComponent = useCallback((id: string) => {
    dispatch({ type: "DELETE_COMPONENT", payload: { id } })
  }, [])

  const updateComponent = useCallback((id: string, updates: Partial<MarkdownComponent>) => {
    dispatch({ type: "UPDATE_COMPONENT", payload: { id, updates } })
  }, [])

  const updateComponentContent = useCallback((id: string, contentUpdates: any) => {
    dispatch({ type: "UPDATE_COMPONENT_CONTENT", payload: { id, contentUpdates } })
  }, [])

  const updateComponentStyle = useCallback((id: string, styleUpdates: any) => {
    dispatch({ type: "UPDATE_COMPONENT_STYLE", payload: { id, styleUpdates } })
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", payload: { id } })
  }, [])

  const reorderComponents = useCallback((components: MarkdownComponent[]) => {
    dispatch({ type: "REORDER_COMPONENTS", payload: { components } })
  }, [])

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_COMPONENT", payload: { id } })
  }, [])

  const moveComponent = useCallback(
    (id: string, newIndex: number) => {
      const component = state.components.find((comp) => comp.id === id)
      if (!component) return

      const newComponents = state.components.filter((comp) => comp.id !== id)
      newComponents.splice(newIndex, 0, component)
      reorderComponents(newComponents)
    },
    [state.components, reorderComponents],
  )

  const value: EditorContextType = {
    state,
    addComponent,
    deleteComponent,
    updateComponent,
    updateComponentContent,
    updateComponentStyle,
    selectComponent,
    reorderComponents,
    duplicateComponent,
    moveComponent,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}
