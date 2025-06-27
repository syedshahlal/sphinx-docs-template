"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorAction, MarkdownComponent } from "./types"

const EditorContext = createContext<
  | {
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
      canUndo: boolean
      canRedo: boolean
    }
  | undefined
>(undefined)

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newComponent: MarkdownComponent = {
        ...action.payload.component,
        id: newId,
        order: action.payload.index ?? state.components.length,
      }

      // Insert at specific index or append
      const newComponents = [...state.components]
      if (action.payload.index !== undefined) {
        newComponents.splice(action.payload.index, 0, newComponent)
        // Update order for subsequent components
        newComponents.forEach((comp, idx) => {
          comp.order = idx
        })
      } else {
        newComponents.push(newComponent)
      }

      // Call the callback with the new component ID if provided
      if (action.returnId) {
        action.returnId(newId)
      }

      return {
        ...state,
        components: newComponents,
        isDirty: true,
        history: {
          past: [...state.history.past, state],
          future: [],
        },
      }
    }

    case "DELETE_COMPONENT": {
      const newComponents = state.components
        .filter((comp) => comp.id !== action.payload.id)
        .map((comp, idx) => ({ ...comp, order: idx }))

      return {
        ...state,
        components: newComponents,
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
        isDirty: true,
        history: {
          past: [...state.history.past, state],
          future: [],
        },
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
        history: {
          past: [...state.history.past, state],
          future: [],
        },
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
        history: {
          past: [...state.history.past, state],
          future: [],
        },
      }
    }

    case "REORDER_COMPONENTS": {
      const newComponents = action.payload.components.map((comp, idx) => ({ ...comp, order: idx }))

      return {
        ...state,
        components: newComponents,
        isDirty: true,
        history: {
          past: [...state.history.past, state],
          future: [],
        },
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

    case "LOAD_COMPONENTS": {
      return {
        ...state,
        components: action.payload.components,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        isDirty: false,
        selectedComponent: null,
        history: {
          past: [],
          future: [],
        },
      }
    }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((comp) => comp.id === action.payload.id)
      if (!componentToDuplicate) return state

      const newId = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const duplicatedComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id: newId,
        order: componentToDuplicate.order + 1,
      }

      const newComponents = [...state.components]
      const insertIndex = componentToDuplicate.order + 1
      newComponents.splice(insertIndex, 0, duplicatedComponent)

      // Update order for subsequent components
      newComponents.forEach((comp, idx) => {
        comp.order = idx
      })

      return {
        ...state,
        components: newComponents,
        selectedComponent: newId,
        isDirty: true,
        history: {
          past: [...state.history.past, state],
          future: [],
        },
      }
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

    default:
      return state
  }
}

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  previewMode: "edit",
  isDirty: false,
  fileName: undefined,
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

  const canUndo = state.history.past.length > 0
  const canRedo = state.history.future.length > 0

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
    canUndo,
    canRedo,
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
