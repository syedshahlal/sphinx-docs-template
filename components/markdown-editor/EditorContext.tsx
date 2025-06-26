"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { EditorState, EditorAction, MarkdownComponent, ComponentStyle } from "./types"
import { v4 as uuidv4 } from "uuid"

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  theme: "light", // Default, should be synced with actual theme provider
  previewMode: "split",
  fileName: "untitled.md",
  filePath: "docs/untitled.md",
  fileVersion: "1.0.0",
  isDirty: false,
  layoutMode: "default",
}

export const EditorContext = createContext<{
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
  // Convenience functions (wrappers around dispatch)
  addComponent: (
    component: Omit<MarkdownComponent, "id" | "order">,
    returnId?: boolean,
    index?: number,
  ) => string | void
  deleteComponent: (id: string) => void
  updateComponentContent: (id: string, contentUpdates: any) => void
  updateComponentStyle: (id: string, styleUpdates: Partial<ComponentStyle>) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  selectComponent: (id: string | null) => void
  setFileDetails: (details: { fileName?: string; filePath?: string; fileVersion?: string }) => void
  loadDocument: (document: {
    components: MarkdownComponent[]
    fileName: string
    filePath: string
    fileVersion: string
  }) => void
  setLayoutMode: (mode: EditorState["layoutMode"]) => void
}>({
  state: initialState,
  dispatch: () => null,
  addComponent: () => {},
  deleteComponent: () => {},
  updateComponentContent: () => {},
  updateComponentStyle: () => {},
  reorderComponents: () => {},
  selectComponent: () => {},
  setFileDetails: () => {},
  loadDocument: () => {},
  setLayoutMode: () => {},
})

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_COMPONENT": {
      const newId = uuidv4()
      const newComponent: MarkdownComponent = {
        ...action.payload.component,
        id: newId,
        order: 0, // Order will be set when reordering
      }
      let newComponents = [...state.components]
      if (
        action.payload.index !== undefined &&
        action.payload.index >= 0 &&
        action.payload.index <= newComponents.length
      ) {
        newComponents.splice(action.payload.index, 0, newComponent)
      } else {
        newComponents.push(newComponent)
      }
      // Re-assign order
      newComponents = newComponents.map((comp, idx) => ({ ...comp, order: idx }))
      if (action.returnId) action.returnId(newId)
      return { ...state, components: newComponents, isDirty: true, selectedComponent: newId }
    }
    case "DELETE_COMPONENT": {
      const updatedComponents = state.components
        .filter((comp) => comp.id !== action.payload.id)
        .map((comp, idx) => ({ ...comp, order: idx }))
      return {
        ...state,
        components: updatedComponents,
        isDirty: true,
        selectedComponent: state.selectedComponent === action.payload.id ? null : state.selectedComponent,
      }
    }
    case "UPDATE_COMPONENT": // Generic update, can update content, style, etc.
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
          comp.id === action.payload.id
            ? { ...comp, style: { ...(comp.style || {}), ...action.payload.styleUpdates } }
            : comp,
        ),
        isDirty: true,
      }
    case "REORDER_COMPONENTS": {
      const reordered = action.payload.components.map((comp, idx) => ({ ...comp, order: idx }))
      return { ...state, components: reordered, isDirty: true }
    }
    case "SELECT_COMPONENT":
      return { ...state, selectedComponent: action.payload.id }
    case "SET_PREVIEW_MODE":
      return { ...state, previewMode: action.payload.mode }
    case "SET_FILE_DETAILS":
      return { ...state, ...action.payload, isDirty: true } // Setting details implies change
    case "LOAD_COMPONENTS":
      return {
        ...state,
        components: action.payload.components.map((comp, idx) => ({ ...comp, order: idx })),
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        fileVersion: action.payload.fileVersion,
        isDirty: false,
        selectedComponent: null,
      }
    case "SET_DIRTY":
      return { ...state, isDirty: action.payload.isDirty }
    case "SET_LAYOUT_MODE":
      return { ...state, layoutMode: action.payload.mode }
    default:
      return state
  }
}

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  const addComponent = useCallback(
    (component: Omit<MarkdownComponent, "id" | "order">, returnId?: boolean, index?: number): string | void => {
      if (returnId) {
        let newId = ""
        dispatch({ type: "ADD_COMPONENT", payload: { component, index }, returnId: (id) => (newId = id) })
        return newId
      }
      dispatch({ type: "ADD_COMPONENT", payload: { component, index } })
    },
    [dispatch],
  )

  const deleteComponent = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_COMPONENT", payload: { id } })
    },
    [dispatch],
  )

  const updateComponentContent = useCallback(
    (id: string, contentUpdates: any) => {
      dispatch({ type: "UPDATE_COMPONENT_CONTENT", payload: { id, contentUpdates } })
    },
    [dispatch],
  )

  const updateComponentStyle = useCallback(
    (id: string, styleUpdates: Partial<ComponentStyle>) => {
      dispatch({ type: "UPDATE_COMPONENT_STYLE", payload: { id, styleUpdates } })
    },
    [dispatch],
  )

  const reorderComponents = useCallback(
    (components: MarkdownComponent[]) => {
      dispatch({ type: "REORDER_COMPONENTS", payload: { components } })
    },
    [dispatch],
  )

  const selectComponent = useCallback(
    (id: string | null) => {
      dispatch({ type: "SELECT_COMPONENT", payload: { id } })
    },
    [dispatch],
  )

  const setFileDetails = useCallback(
    (details: { fileName?: string; filePath?: string; fileVersion?: string }) => {
      dispatch({ type: "SET_FILE_DETAILS", payload: details })
    },
    [dispatch],
  )

  const loadDocument = useCallback(
    (document: { components: MarkdownComponent[]; fileName: string; filePath: string; fileVersion: string }) => {
      dispatch({ type: "LOAD_COMPONENTS", payload: document })
    },
    [dispatch],
  )
  const setLayoutMode = useCallback(
    (mode: EditorState["layoutMode"]) => {
      dispatch({ type: "SET_LAYOUT_MODE", payload: { mode } })
    },
    [dispatch],
  )

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        addComponent,
        deleteComponent,
        updateComponentContent,
        updateComponentStyle,
        reorderComponents,
        selectComponent,
        setFileDetails,
        loadDocument,
        setLayoutMode,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
