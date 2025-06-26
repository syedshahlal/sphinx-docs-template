export interface ComponentStyle {
  // Text styles
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string | number
  fontStyle?: "normal" | "italic" | "oblique"
  textDecoration?: string
  textAlign?: "left" | "center" | "right" | "justify"

  // Layout styles
  width?: string
  height?: string
  padding?: string
  margin?: string

  // Border and visual styles
  border?: string
  borderRadius?: string
  boxShadow?: string
  opacity?: number

  // Hover effects
  hover?: {
    color?: string
    backgroundColor?: string
    boxShadow?: string
    transform?: string
  }
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
    | "divider"
    | "list"
    | "orderedList"
    | "taskList"
    | "blockquote"
    | "alert"
    | "spacer"
    | "columns"
    | "table"
    | "mermaid"
    | "htmlBlock"
  content: any
  style?: ComponentStyle
  position: { x: number; y: number }
  size?: { width: number; height: number }
}

export interface EditorState {
  components: MarkdownComponent[]
  selectedComponentId: string | null
  canvasSize: { width: number; height: number }
  zoom: number
}

export interface FileState {
  currentFile: string | null
  files: Record<string, EditorState>
  unsavedChanges: boolean
}

// Action types for useReducer
export type EditorAction =
  | {
      type: "ADD_COMPONENT"
      payload: { component: Omit<MarkdownComponent, "id">; index?: number }
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
