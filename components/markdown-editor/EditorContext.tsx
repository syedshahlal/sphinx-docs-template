"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface MarkdownComponent {
  id: string
  type: "heading" | "paragraph" | "image" | "code" | "button" | "card" | "grid" | "divider" | "list" | "quote" | "table"
  content: any
  style?: any
  order: number
}

export interface EditorState {
  components: MarkdownComponent[]
  selectedComponent: string | null
  theme: "light" | "dark"
  previewMode: "split" | "markdown" | "html" | "preview"
  fileName: string
  filePath: string
  isDirty: boolean
}

interface EditorContextType {
  state: EditorState
  addComponent: (component: Omit<MarkdownComponent, "id" | "order">) => void
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
    (component: Omit<MarkdownComponent, "id" | "order">) => {
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
    },
    [state.components.length],
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

    return sortedComponents
      .map((component) => {
        switch (component.type) {
          case "heading":
            return `${"#".repeat(component.content.level)} ${component.content.text}\n`
          case "paragraph":
            return `${component.content.text}\n`
          case "image":
            return `![${component.content.alt}](${component.content.src})\n`
          case "code":
            return `\`\`\`${component.content.language}\n${component.content.code}\n\`\`\`\n`
          case "button":
            return `[${component.content.text}](${component.content.link})\n`
          case "card":
            return `### ${component.content.title}\n\n${component.content.description}\n`
          case "grid":
            return component.content.items.map((item: any) => `- ${item.text}`).join("\n") + "\n"
          case "divider":
            return `---\n`
          case "list":
            return (
              component.content.items
                .map((item: any, index: number) =>
                  component.content.ordered ? `${index + 1}. ${item.text}` : `- ${item.text}`,
                )
                .join("\n") + "\n"
            )
          case "quote":
            return `> ${component.content.text}\n`
          case "table":
            const headers = component.content.headers.join(" | ")
            const separator = component.content.headers.map(() => "---").join(" | ")
            const rows = component.content.rows.map((row: string[]) => row.join(" | ")).join("\n")
            return `${headers}\n${separator}\n${rows}\n`
          default:
            return ""
        }
      })
      .join("\n")
  }, [state.components])

  const generateHTML = useCallback(() => {
    const markdown = generateMarkdown()
    // This would typically use a markdown parser like marked or remark
    // For now, we'll do basic conversion
    return markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/!\[([^\]]*)\]$$([^$$]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]$$([^$$]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n/gim, "<br>")
  }, [generateMarkdown])

  const saveFile = useCallback(async () => {
    const markdown = generateMarkdown()
    const html = generateHTML()

    // Here you would implement the actual file saving logic
    // This could involve API calls to save to the repository
    console.log("Saving file:", {
      fileName: state.fileName,
      filePath: state.filePath,
      markdown,
      html,
    })

    setState((prev) => ({ ...prev, isDirty: false }))
  }, [state.fileName, state.filePath, generateMarkdown, generateHTML])

  const loadFile = useCallback((content: string, fileName: string, filePath: string) => {
    // Parse markdown content back to components (simplified)
    setState((prev) => ({
      ...prev,
      fileName,
      filePath,
      components: [], // Would parse markdown to components
      isDirty: false,
    }))
  }, [])

  const newFile = useCallback(() => {
    setState({
      components: [],
      selectedComponent: null,
      theme: "light",
      previewMode: "split",
      fileName: "untitled.md",
      filePath: "content/docs/",
      isDirty: false,
    })
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
