"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { MarkdownComponent } from "./types"

interface EditorState {
  components: MarkdownComponent[]
  selectedComponent: string | null
  fileName: string | null
  filePath: string | null
  previewMode: "edit" | "preview" | "mobile" | "tablet"
  history: MarkdownComponent[][]
  historyIndex: number
}

type EditorAction =
  | { type: "ADD_COMPONENT"; component: Omit<MarkdownComponent, "id" | "order">; afterId?: string }
  | { type: "UPDATE_COMPONENT_CONTENT"; id: string; content: Partial<any> }
  | { type: "UPDATE_COMPONENT_STYLE"; id: string; style: Partial<any> }
  | { type: "DELETE_COMPONENT"; id: string }
  | { type: "DUPLICATE_COMPONENT"; id: string }
  | { type: "SELECT_COMPONENT"; id: string | null }
  | { type: "SET_PREVIEW_MODE"; mode: "edit" | "preview" | "mobile" | "tablet" }
  | { type: "SET_FILE_NAME"; fileName: string }
  | { type: "SET_FILE_PATH"; filePath: string }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SAVE_TO_HISTORY" }

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  fileName: null,
  filePath: null,
  previewMode: "edit",
  history: [[]],
  historyIndex: 0,
}

function generateId(): string {
  return `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const id = generateId()
      const order = action.afterId
        ? state.components.find((c) => c.id === action.afterId)?.order || 0
        : state.components.length

      const newComponent: MarkdownComponent = {
        ...action.component,
        id,
        order,
      }

      const newComponents = [...state.components, newComponent].sort((a, b) => a.order - b.order)

      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "UPDATE_COMPONENT_CONTENT": {
      const newComponents = state.components.map((component) =>
        component.id === action.id ? { ...component, content: { ...component.content, ...action.content } } : component,
      )

      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "UPDATE_COMPONENT_STYLE": {
      const newComponents = state.components.map((component) =>
        component.id === action.id ? { ...component, style: { ...component.style, ...action.style } } : component,
      )

      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "DELETE_COMPONENT": {
      const newComponents = state.components.filter((component) => component.id !== action.id)

      return {
        ...state,
        components: newComponents,
        selectedComponent: state.selectedComponent === action.id ? null : state.selectedComponent,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "DUPLICATE_COMPONENT": {
      const componentToDuplicate = state.components.find((c) => c.id === action.id)
      if (!componentToDuplicate) return state

      const id = generateId()
      const newComponent: MarkdownComponent = {
        ...componentToDuplicate,
        id,
        order: componentToDuplicate.order + 0.5,
      }

      const newComponents = [...state.components, newComponent].sort((a, b) => a.order - b.order)

      return {
        ...state,
        components: newComponents,
        history: [...state.history.slice(0, state.historyIndex + 1), newComponents],
        historyIndex: state.historyIndex + 1,
      }
    }

    case "SELECT_COMPONENT":
      return {
        ...state,
        selectedComponent: action.id,
      }

    case "SET_PREVIEW_MODE":
      return {
        ...state,
        previewMode: action.mode,
      }

    case "SET_FILE_NAME":
      return {
        ...state,
        fileName: action.fileName,
      }

    case "SET_FILE_PATH":
      return {
        ...state,
        filePath: action.filePath,
      }

    case "UNDO": {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1
        return {
          ...state,
          components: state.history[newIndex],
          historyIndex: newIndex,
        }
      }
      return state
    }

    case "REDO": {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1
        return {
          ...state,
          components: state.history[newIndex],
          historyIndex: newIndex,
        }
      }
      return state
    }

    case "SAVE_TO_HISTORY": {
      return {
        ...state,
        history: [...state.history.slice(0, state.historyIndex + 1), state.components],
        historyIndex: state.historyIndex + 1,
      }
    }

    default:
      return state
  }
}

interface EditorContextType {
  state: EditorState
  addComponent: (
    component: Omit<MarkdownComponent, "id" | "order">,
    afterId?: string,
    onAdd?: (id: string) => void,
  ) => void
  updateComponentContent: (id: string, content: Partial<any>) => void
  updateComponentStyle: (id: string, style: Partial<any>) => void
  deleteComponent: (id: string) => void
  duplicateComponent: (id: string) => void
  selectComponent: (id: string | null) => void
  setPreviewMode: (mode: "edit" | "preview" | "mobile" | "tablet") => void
  setFileName: (fileName: string) => void
  setFilePath: (filePath: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback(
    (component: Omit<MarkdownComponent, "id" | "order">, afterId?: string, onAdd?: (id: string) => void) => {
      dispatch({ type: "ADD_COMPONENT", component, afterId })
      // Note: In a real implementation, you'd need to get the actual ID from the action
      if (onAdd) {
        setTimeout(() => onAdd(generateId()), 0)
      }
    },
    [],
  )

  const updateComponentContent = useCallback((id: string, content: Partial<any>) => {
    dispatch({ type: "UPDATE_COMPONENT_CONTENT", id, content })
  }, [])

  const updateComponentStyle = useCallback((id: string, style: Partial<any>) => {
    dispatch({ type: "UPDATE_COMPONENT_STYLE", id, style })
  }, [])

  const deleteComponent = useCallback((id: string) => {
    dispatch({ type: "DELETE_COMPONENT", id })
  }, [])

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_COMPONENT", id })
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    dispatch({ type: "SELECT_COMPONENT", id })
  }, [])

  const setPreviewMode = useCallback((mode: "edit" | "preview" | "mobile" | "tablet") => {
    dispatch({ type: "SET_PREVIEW_MODE", mode })
  }, [])

  const setFileName = useCallback((fileName: string) => {
    dispatch({ type: "SET_FILE_NAME", fileName })
  }, [])

  const setFilePath = useCallback((filePath: string) => {
    dispatch({ type: "SET_FILE_PATH", filePath })
  }, [])

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" })
  }, [])

  const redo = useCallback(() => {
    dispatch({ type: "REDO" })
  }, [])

  const canUndo = state.historyIndex > 0
  const canRedo = state.historyIndex < state.history.length - 1

  const value: EditorContextType = {
    state,
    addComponent,
    updateComponentContent,
    updateComponentStyle,
    deleteComponent,
    duplicateComponent,
    selectComponent,
    setPreviewMode,
    setFileName,
    setFilePath,
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
