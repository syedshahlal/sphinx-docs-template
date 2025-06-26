export interface MarkdownComponent {
  id: string
  type:
    | "heading"
    | "paragraph"
    | "image"
    | "code"
    | "button"
    | "card"
    | "grid"
    | "divider"
    | "list"
    | "quote"
    | "table"
    | "horizontalRule"
    | "orderedList"
    | "taskList"
    | "blockquote"
    | "video"
    | "alert"
    | "mermaid"
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
