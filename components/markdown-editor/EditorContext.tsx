"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { EditorState, MarkdownComponent } from "./types"

interface EditorContextType {
  state: EditorState
  addComponent: (component: Omit<MarkdownComponent, "id" | "order">, returnId?: boolean) => string | void
  updateComponent: (id: string, updates: Partial<MarkdownComponent>) => void
  deleteComponent: (id: string) => void
  reorderComponents: (components: MarkdownComponent[]) => void
  selectComponent: (id: string | null) => void
  setPreviewMode: (mode: EditorState["previewMode"]) => void
  setFileName: (name: string) => void
  setFilePath: (path: string) => void
  generateMarkdown: () => string
  generateHTML: () => string
  saveFile: () => Promise<void>
  loadFile: (content: string, fileName: string, filePath: string) => void
  newFile: () => void
}

const EditorContext = createContext<EditorContextType | null>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EditorState>({
    components: [],
    selectedComponent: null,
    theme: "light",
    previewMode: "split",
    fileName: "untitled.md",
    filePath: "content/docs/",
    isDirty: false,
  })

  const addComponent = useCallback(
    (component: Omit<MarkdownComponent, "id" | "order">, returnId = false): string | void => {
      const id = `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newComponent: MarkdownComponent = {
        ...component,
        id,
        order: state.components.length,
      }

      setState((prev) => ({
        ...prev,
        components: [...prev.components, newComponent],
        selectedComponent: id,
        isDirty: true,
      }))

      if (returnId) {
        return id
      }
    },
    [state.components],
  )

  const updateComponent = useCallback((id: string, updates: Partial<MarkdownComponent>) => {
    setState((prev) => ({
      ...prev,
      components: prev.components.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp)),
      isDirty: true,
    }))
  }, [])

  const deleteComponent = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      components: prev.components.filter((comp) => comp.id !== id),
      selectedComponent: prev.selectedComponent === id ? null : prev.selectedComponent,
      isDirty: true,
    }))
  }, [])

  const reorderComponents = useCallback((components: MarkdownComponent[]) => {
    setState((prev) => ({
      ...prev,
      components: components.map((comp, index) => ({ ...comp, order: index })),
      isDirty: true,
    }))
  }, [])

  const selectComponent = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, selectedComponent: id }))
  }, [])

  const setPreviewMode = useCallback((mode: EditorState["previewMode"]) => {
    setState((prev) => ({ ...prev, previewMode: mode }))
  }, [])

  const setFileName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, fileName: name, isDirty: true }))
  }, [])

  const setFilePath = useCallback((path: string) => {
    setState((prev) => ({ ...prev, filePath: path, isDirty: true }))
  }, [])

  const generateMarkdown = useCallback(() => {
    const sortedComponents = [...state.components].sort((a, b) => a.order - b.order)
    // ... (rest of the function is unchanged)
    return sortedComponents.map(() => "/* markdown generation */").join("\n")
  }, [state.components])

  const generateHTML = useCallback(() => {
    // ... (rest of the function is unchanged)
    return "<!-- html generation -->"
  }, [generateMarkdown])

  const saveFile = useCallback(async () => {
    // ... (rest of the function is unchanged)
  }, [state.fileName, state.filePath, generateMarkdown, generateHTML])

  const loadFile = useCallback((content: string, fileName: string, filePath: string) => {
    // ... (rest of the function is unchanged)
  }, [])

  const newFile = useCallback(() => {
    // ... (rest of the function is unchanged)
  }, [])

  const value: EditorContextType = {
    state,
    addComponent,
    updateComponent,
    deleteComponent,
    reorderComponents,
    selectComponent,
    setPreviewMode,
    setFileName,
    setFilePath,
    generateMarkdown,
    generateHTML,
    saveFile,
    loadFile,
    newFile,
  }

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error("useEditor must be used within EditorProvider")
  }
  return context
}
