"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorAction, MarkdownComponent, ComponentStyle } from "./types"

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  previewMode: "edit",
  isDirty: false,
  history: {
    past: [],
    future: [],
  },
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const id = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newComponent: MarkdownComponent = {
        ...action.payload.component,
        id,
        order: state.components.length,
      }

      // Call the returnId callback if provided
      if (action.returnId) {
        action.returnId(id)
      }

      return {
        ...state,
        components: [...state.components, newComponent],
        isDirty: true,
      }
    }

    case "DELETE_COMPONENT":
      return {
        ...state,
        components: state.components.filter((c) => c.id !== action.payload.id),
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
        isDirty: true,
      }

    case "UPDATE_COMPONENT_CONTENT":
      return {
        ...state,
        components: state.components.map((c) =>
          c.id === action.payload.id ? { ...c, content: action.payload.contentUpdates } : c,
        ),
        isDirty: true,
      }

    case "UPDATE_COMPONENT_STYLE":
      return {
        ...state,
        components: state.components.map((c) =>
          c.id === action.payload.id ? { ...c, style: { ...c.style, ...action.payload.styleUpdates } } : c,
        ),
        isDirty: true,
      }

    case "REORDER_COMPONENTS":
      return {
        ...state,
        components: action.payload.components,
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

    case "LOAD_COMPONENTS":
      return {
        ...state,
        components: action.payload.components,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        isDirty: false,
      }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((c) => c.id === action.payload.id)
      if (!componentToDuplicate) return state

      const id = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const duplicatedComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id,
        order: state.components.length,
      }

      return {
        ...state,
        components: [...state.components, duplicatedComponent],
        isDirty: true,
      }
    }

    case "UNDO":
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

    case "REDO":
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

    default:
      return state
  }
}

interface EditorContextType {
  state: EditorState
  addComponent: (
    component: Omit<MarkdownComponent, "id" | "order">,
    index?: number,
    returnId?: (id: string) => void,
  ) => void
  deleteComponent: (id: string) => void
  updateComponentContent: (id: string, contentUpdates: Partial<any>) => void
  updateComponentStyle: (id: string, styleUpdates: Partial<ComponentStyle>) => void
  selectComponent: (id: string | null) => void
  duplicateComponent: (id: string) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  setPreviewMode: (mode: "edit" | "preview") => void
  loadComponents: (components: MarkdownComponent[], fileName?: string, filePath?: string) => void
  undo: () => void
  redo: () => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback(
    (component: Omit<MarkdownComponent, "id" | "order">, index?: number, returnId?: (id: string) => void) => {
      dispatch({ type: "ADD_COMPONENT", payload: { component, index }, returnId })
    },
    [],
  )

  const deleteComponent = useCallback((id: string) => {
    dispatch({ type: "DELETE_COMPONENT", payload: { id } })
  }, [])

  const updateComponentContent = useCallback((id: string, contentUpdates: Partial<any>) => {
    dispatch({ type: "UPDATE_COMPONENT_CONTENT", payload: { id, contentUpdates } })
  }, [])

  const updateComponentStyle = useCallback((id: string, styleUpdates: Partial<ComponentStyle>) => {
    dispatch({ type: "UPDATE_COMPONENT_STYLE", payload: { id, styleUpdates } })
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", payload: { id } })
  }, [])

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_COMPONENT", payload: { id } })
  }, [])

  const reorderComponents = useCallback((components: MarkdownComponent[]) => {
    dispatch({ type: "REORDER_COMPONENTS", payload: { components } })
  }, [])

  const setPreviewMode = useCallback((mode: "edit" | "preview") => {
    dispatch({ type: "SET_PREVIEW_MODE", payload: { mode } })
  }, [])

  const loadComponents = useCallback((components: MarkdownComponent[], fileName?: string, filePath?: string) => {
    dispatch({ type: "LOAD_COMPONENTS", payload: { components, fileName, filePath } })
  }, [])

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: "REDO" })
  }, [])

  const value: EditorContextType = {
    state,
    addComponent,
    deleteComponent,
    updateComponentContent,
    updateComponentStyle,
    selectComponent,
    duplicateComponent,
    reorderComponents,
    setPreviewMode,
    loadComponents,
    undo,
    redo,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}
