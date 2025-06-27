"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorAction, MarkdownComponent } from "./types"

const EditorContext = createContext<{
  state: EditorState
  addComponent: (
    component: Omit<MarkdownComponent, "id" | "order">,
    index?: number,
    returnId?: (id: string) => void,
  ) => void
  deleteComponent: (id: string) => void
  updateComponentContent: (id: string, contentUpdates: Partial<any>) => void
  updateComponentStyle: (id: string, styleUpdates: Partial<any>) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  selectComponent: (id: string | null) => void
  setPreviewMode: (mode: "edit" | "preview") => void
  loadComponents: (components: MarkdownComponent[], fileName?: string, filePath?: string) => void
  duplicateComponent: (id: string) => void
  undo: () => void
  redo: () => void
  updateFileName: (fileName: string) => void
} | null>(null)

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  const saveToHistory = (newState: Omit<EditorState, "history">) => ({
    ...newState,
    history: {
      past: [...state.history.past, { ...state, history: { past: [], future: [] } }],
      future: [],
    },
  })

  switch (action.type) {
    case "ADD_COMPONENT": {
      const id = generateId()
      const newComponent: MarkdownComponent = {
        ...action.payload.component,
        id,
        order: action.payload.index ?? state.components.length,
      }

      const newComponents = [...state.components]
      if (action.payload.index !== undefined) {
        newComponents.splice(action.payload.index, 0, newComponent)
      } else {
        newComponents.push(newComponent)
      }

      // Update order for all components
      const reorderedComponents = newComponents.map((comp, index) => ({ ...comp, order: index }))

      action.returnId?.(id)

      return saveToHistory({
        ...state,
        components: reorderedComponents,
        isDirty: true,
      })
    }

    case "DELETE_COMPONENT": {
      const newComponents = state.components.filter((c) => c.id !== action.payload.id)
      const reorderedComponents = newComponents.map((comp, index) => ({ ...comp, order: index }))

      return saveToHistory({
        ...state,
        components: reorderedComponents,
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
        isDirty: true,
      })
    }

    case "UPDATE_COMPONENT_CONTENT": {
      const newComponents = state.components.map((comp) =>
        comp.id === action.payload.id
          ? { ...comp, content: { ...comp.content, ...action.payload.contentUpdates } }
          : comp,
      )

      return saveToHistory({
        ...state,
        components: newComponents,
        isDirty: true,
      })
    }

    case "UPDATE_COMPONENT_STYLE": {
      const newComponents = state.components.map((comp) =>
        comp.id === action.payload.id ? { ...comp, style: { ...comp.style, ...action.payload.styleUpdates } } : comp,
      )

      return saveToHistory({
        ...state,
        components: newComponents,
        isDirty: true,
      })
    }

    case "REORDER_COMPONENTS": {
      const reorderedComponents = action.payload.components.map((comp, index) => ({ ...comp, order: index }))

      return saveToHistory({
        ...state,
        components: reorderedComponents,
        isDirty: true,
      })
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
        selectedComponent: null,
        history: { past: [], future: [] },
      }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((c) => c.id === action.payload.id)
      if (!componentToDuplicate) return state

      const id = generateId()
      const duplicatedComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id,
        order: componentToDuplicate.order + 1,
      }

      const newComponents = [...state.components]
      newComponents.splice(componentToDuplicate.order + 1, 0, duplicatedComponent)
      const reorderedComponents = newComponents.map((comp, index) => ({ ...comp, order: index }))

      return saveToHistory({
        ...state,
        components: reorderedComponents,
        selectedComponent: id,
        isDirty: true,
      })
    }

    case "UNDO": {
      const { past, future } = state.history
      if (past.length === 0) return state

      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        ...previous,
        history: {
          past: newPast,
          future: [{ ...state, history: { past: [], future: [] } }, ...future],
        },
      }
    }

    case "REDO": {
      const { past, future } = state.history
      if (future.length === 0) return state

      const next = future[0]
      const newFuture = future.slice(1)

      return {
        ...next,
        history: {
          past: [...past, { ...state, history: { past: [], future: [] } }],
          future: newFuture,
        },
      }
    }

    default:
      return state
  }
}

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  previewMode: "edit",
  isDirty: false,
  fileName: "Untitled Page",
  filePath: undefined,
  history: {
    past: [],
    future: [],
  },
}

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

  const updateComponentStyle = useCallback((id: string, styleUpdates: Partial<any>) => {
    dispatch({ type: "UPDATE_COMPONENT_STYLE", payload: { id, styleUpdates } })
  }, [])

  const reorderComponents = useCallback((components: MarkdownComponent[]) => {
    dispatch({ type: "REORDER_COMPONENTS", payload: { components } })
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", payload: { id } })
  }, [])

  const setPreviewMode = useCallback((mode: "edit" | "preview") => {
    dispatch({ type: "SET_PREVIEW_MODE", payload: { mode } })
  }, [])

  const loadComponents = useCallback((components: MarkdownComponent[], fileName?: string, filePath?: string) => {
    dispatch({ type: "LOAD_COMPONENTS", payload: { components, fileName, filePath } })
  }, [])

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_COMPONENT", payload: { id } })
  }, [])

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: "REDO" })
  }, [])

  const updateFileName = useCallback((fileName: string) => {
    dispatch({ type: "UPDATE_COMPONENT_CONTENT", payload: { id: "filename", contentUpdates: { fileName } } })
  }, [])

  const value = {
    state,
    addComponent,
    deleteComponent,
    updateComponentContent,
    updateComponentStyle,
    reorderComponents,
    selectComponent,
    setPreviewMode,
    loadComponents,
    duplicateComponent,
    undo,
    redo,
    updateFileName,
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
