export interface ComponentStyle {
  // Text
  color?: string
  backgroundColor?: string
  fontSize?: string // e.g., '16px', '1.2em'
  fontWeight?: "normal" | "bold"
  fontStyle?: "normal" | "italic"
  textDecoration?: "none" | "underline" | "line-through"
  textAlign?: "left" | "center" | "right" | "justify"

  // Box model
  width?: string
  height?: string
  padding?: string // shorthand: "10px", "10px 20px"
  margin?: string
  border?: string // shorthand: "1px solid #000"
  borderRadius?: string

  // Effects
  boxShadow?: string
  opacity?: number

  // Hover effects (applied via CSS classes or simple style changes)
  hover?: {
    backgroundColor?: string
    color?: string
    boxShadow?: string
    transform?: string // e.g., "scale(1.05)"
  }

  // Custom CSS classes
  className?: string
}

export interface HtmlBlockContent {
  htmlContent: string
  name: string
}

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
    | "divider" // Replaces horizontalRule for clarity
    | "list" // Unordered list
    | "orderedList"
    | "taskList"
    | "blockquote"
    | "video" // Placeholder, needs custom Tiptap node
    | "alert"
    | "mermaid"
    | "spacer" // New: for adding vertical space
    | "columns" // New: for basic two/three column layouts (simplified)
  content: any
  style?: ComponentStyle // Enhanced styling options
  order: number
}

export interface EditorState {
  components: MarkdownComponent[]
  selectedComponent: string | null
  theme: "light" | "dark" // Assuming this comes from a theme provider
  previewMode: "split" | "markdown" | "html" | "preview" // 'split' is canvas + preview
  fileName: string
  filePath: string
  fileVersion: string // New: for document versioning
  isDirty: boolean
  layoutMode: "default" | "focus-canvas" | "focus-preview" // New: for adaptable layout
}

// Action types for useReducer
export type EditorAction =
  | {
      type: "ADD_COMPONENT"
      payload: { component: Omit<MarkdownComponent, "id" | "order">; index?: number }
      returnId?: (id: string) => void
    }
  | { type: "DELETE_COMPONENT"; payload: { id: string } }
  | { type: "UPDATE_COMPONENT"; payload: { id: string; updates: Partial<MarkdownComponent> } }
  | { type: "UPDATE_COMPONENT_CONTENT"; payload: { id: string; contentUpdates: any } }
  | { type: "UPDATE_COMPONENT_STYLE"; payload: { id: string; styleUpdates: Partial<ComponentStyle> } }
  | { type: "REORDER_COMPONENTS"; payload: { components: MarkdownComponent[] } }
  | { type: "SELECT_COMPONENT"; payload: { id: string | null } }
  | { type: "SET_PREVIEW_MODE"; payload: { mode: EditorState["previewMode"] } }
  | { type: "SET_FILE_DETAILS"; payload: { fileName?: string; filePath?: string; fileVersion?: string } }
  | {
      type: "LOAD_COMPONENTS"
      payload: { components: MarkdownComponent[]; fileName: string; filePath: string; fileVersion: string }
    }
  | { type: "SET_DIRTY"; payload: { isDirty: boolean } }
  | { type: "SET_LAYOUT_MODE"; payload: { mode: EditorState["layoutMode"] } }
