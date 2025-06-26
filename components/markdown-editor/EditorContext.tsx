"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { EditorState, EditorAction, MarkdownComponent, ComponentStyle } from "./types"

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

    case "SET_FILE_DETAILS":
      return {
        ...state,
        fileName: action.payload.fileName || state.fileName,
        filePath: action.payload.filePath || state.filePath,
        fileVersion: action.payload.fileVersion || state.fileVersion,
        isDirty: true,
      }

    case "LOAD_COMPONENTS":
      return {
        ...state,
        components: action.payload.components,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        fileVersion: action.payload.fileVersion,
        isDirty: false,
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

// Context type
interface EditorContextType {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  addComponent: (component: Omit<MarkdownComponent, "id" | "order">, selectAfterAdd?: boolean, index?: number) => void
  updateComponent: (id: string, updates: Partial<MarkdownComponent>) => void
  updateComponentContent: (id: string, contentUpdates: any) => void
  updateComponentStyle: (id: string, styleUpdates: Partial<ComponentStyle>) => void
  deleteComponent: (id: string) => void
  selectComponent: (id: string | null) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  duplicateComponent: (id: string) => void
  setFileDetails: (details: { fileName?: string; filePath?: string; fileVersion?: string }) => void
  loadFile: (content: string, fileName: string, filePath: string) => void
  newFile: () => void
  setLayoutMode: (mode: EditorState["layoutMode"]) => void
}

// Create context
const EditorContext = createContext<EditorContextType | undefined>(undefined)

// Provider component
interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider({ children }: EditorProviderProps) {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  // Helper functions
  const addComponent = (component: Omit<MarkdownComponent, "id" | "order">, selectAfterAdd = true, index?: number) => {
    dispatch({
      type: "ADD_COMPONENT",
      payload: { component, index },
    })
  }

  const updateComponent = (id: string, updates: Partial<MarkdownComponent>) => {
    dispatch({
      type: "UPDATE_COMPONENT",
      payload: { id, updates },
    })
  }

  const updateComponentContent = (id: string, contentUpdates: any) => {
    dispatch({
      type: "UPDATE_COMPONENT_CONTENT",
      payload: { id, contentUpdates },
    })
  }

  const updateComponentStyle = (id: string, styleUpdates: Partial<ComponentStyle>) => {
    dispatch({
      type: "UPDATE_COMPONENT_STYLE",
      payload: { id, styleUpdates },
    })
  }

  const deleteComponent = (id: string) => {
    dispatch({
      type: "DELETE_COMPONENT",
      payload: { id },
    })
  }

  const selectComponent = (id: string | null) => {
    dispatch({
      type: "SELECT_COMPONENT",
      payload: { id },
    })
  }

  const reorderComponents = (components: MarkdownComponent[]) => {
    dispatch({
      type: "REORDER_COMPONENTS",
      payload: { components },
    })
  }

  const duplicateComponent = (id: string) => {
    dispatch({
      type: "DUPLICATE_COMPONENT",
      payload: { id },
    })
  }

  const setFileDetails = (details: { fileName?: string; filePath?: string; fileVersion?: string }) => {
    dispatch({
      type: "SET_FILE_DETAILS",
      payload: details,
    })
  }

  const loadFile = (content: string, fileName: string, filePath: string) => {
    // Parse content and create components
    // This is a simplified implementation
    const components: MarkdownComponent[] = []
    dispatch({
      type: "LOAD_COMPONENTS",
      payload: { components, fileName, filePath, fileVersion: "1.0.0" },
    })
  }

  const newFile = () => {
    dispatch({
      type: "LOAD_COMPONENTS",
      payload: { components: [], fileName: "", filePath: "", fileVersion: "" },
    })
  }

  const setLayoutMode = (mode: EditorState["layoutMode"]) => {
    dispatch({
      type: "SET_LAYOUT_MODE",
      payload: { mode },
    })
  }

  const value: EditorContextType = {
    state,
    dispatch,
    addComponent,
    updateComponent,
    updateComponentContent,
    updateComponentStyle,
    deleteComponent,
    selectComponent,
    reorderComponents,
    duplicateComponent,
    setFileDetails,
    loadFile,
    newFile,
    setLayoutMode,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

// Hook to use the context
export function useEditor() {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider")
  }
  return context
}

// Export the context for direct usage
export { EditorContext }
