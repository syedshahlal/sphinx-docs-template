import type React from "react"
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
  display?: string
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  gap?: string

  // Grid styles
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridGap?: string
  gridColumn?: string
  gridRow?: string

  // Border and visual styles
  border?: string
  borderRadius?: string
  boxShadow?: string
  opacity?: number
  transform?: string
  transition?: string

  // Background styles
  backgroundImage?: string
  backgroundSize?: string
  backgroundPosition?: string
  backgroundRepeat?: string
  gradient?: string

  // Animation styles
  animation?: string
  animationDuration?: string
  animationDelay?: string

  // Hover effects
  hover?: {
    color?: string
    backgroundColor?: string
    boxShadow?: string
    transform?: string
    borderColor?: string
  }

  // Responsive breakpoints
  responsive?: {
    sm?: Partial<ComponentStyle>
    md?: Partial<ComponentStyle>
    lg?: Partial<ComponentStyle>
    xl?: Partial<ComponentStyle>
  }

  // Custom CSS class
  className?: string
}

export interface ImageContent {
  src: string
  alt: string
  caption?: string
  width?: string
  height?: string
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none"
  borderRadius?: string
  overlay?: {
    enabled: boolean
    color?: string
    opacity?: number
    text?: string
  }
}

export interface CardContent {
  title: string
  description: string
  imageUrl?: string
  imagePosition?: "top" | "left" | "right" | "background"
  buttons?: Array<{
    text: string
    variant: "primary" | "secondary" | "outline" | "ghost"
    link?: string
    icon?: string
  }>
  badge?: {
    text: string
    color: string
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  }
  stats?: Array<{
    label: string
    value: string
    icon?: string
  }>
  layout?: "default" | "horizontal" | "minimal" | "feature" | "pricing"
}

export interface GridContent {
  columns: number
  rows?: number
  gap: string
  items: Array<{
    id: string
    type: "card" | "image" | "text" | "chart"
    content: any
    span?: {
      columns?: number
      rows?: number
    }
  }>
  responsive?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export interface TableContent {
  headers: string[]
  rows: string[][]
  sortable?: boolean
  searchable?: boolean
  pagination?: {
    enabled: boolean
    pageSize: number
  }
  styling?: {
    headerStyle?: "default" | "dark" | "colored"
    striped?: boolean
    bordered?: boolean
    hover?: boolean
  }
  actions?: Array<{
    label: string
    icon?: string
    action: string
  }>
}

export interface ChartContent {
  type: "bar" | "line" | "pie" | "doughnut" | "area" | "scatter"
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string
      borderWidth?: number
    }>
  }
  options?: {
    responsive?: boolean
    maintainAspectRatio?: boolean
    plugins?: {
      legend?: {
        display: boolean
        position?: "top" | "bottom" | "left" | "right"
      }
      title?: {
        display: boolean
        text?: string
      }
    }
  }
}

export interface InfographicContent {
  type: "timeline" | "process" | "comparison" | "hierarchy" | "stats"
  title?: string
  items: Array<{
    id: string
    title: string
    description?: string
    value?: string | number
    icon?: string
    image?: string
    color?: string
    position?: { x: number; y: number }
  }>
  layout?: "horizontal" | "vertical" | "circular" | "grid"
  animations?: {
    enabled: boolean
    type: "fade" | "slide" | "bounce" | "zoom"
    duration: number
    delay: number
  }
}

export interface HtmlBlockContent {
  htmlContent: string
  name: string
  category?: "custom" | "tailgrids" | "component"
  editable?: boolean
  responsive?: boolean
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
    | "divider"
    | "list"
    | "orderedList"
    | "taskList"
    | "blockquote"
    | "alert"
    | "spacer"
    | "columns"
    | "table"
    | "chart"
    | "infographic"
    | "mermaid"
    | "htmlBlock"
    | "banner"
    | "hero"
    | "gallery"
    | "testimonial"
    | "pricing"
    | "contact"
    | "navigation"
    | "footer"
  content: any
  style?: ComponentStyle
  order: number
  locked?: boolean
  hidden?: boolean
  animations?: {
    entrance?: string
    hover?: string
    scroll?: string
  }
}

export interface EditorState {
  components: MarkdownComponent[]
  selectedComponent: string | null
  previewMode: "edit" | "preview" | "mobile" | "tablet"
  layoutMode: "freeform" | "grid" | "flex"
  canvasSettings: {
    width: string
    height: string
    backgroundColor: string
    backgroundImage?: string
    padding: string
    maxWidth?: string
  }
  globalStyles: {
    fontFamily: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    borderRadius: string
    spacing: string
  }
  isDirty: boolean
  fileName?: string
  filePath?: string
  fileVersion?: string
  history: {
    past: EditorState[]
    future: EditorState[]
  }
  clipboard?: MarkdownComponent
}

export interface FileState {
  currentFile: string | null
  files: Record<string, EditorState>
  unsavedChanges: boolean
  recentFiles: string[]
}

export interface ComponentItem {
  id: string
  type: MarkdownComponent["type"]
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: string
  htmlBlockKey?: string
  preview?: string
  tags?: string[]
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
  | { type: "SET_LAYOUT_MODE"; payload: { mode: EditorState["layoutMode"] } }
  | { type: "SET_CANVAS_SETTINGS"; payload: { settings: Partial<EditorState["canvasSettings"]> } }
  | { type: "SET_GLOBAL_STYLES"; payload: { styles: Partial<EditorState["globalStyles"]> } }
  | { type: "SET_FILE_DETAILS"; payload: { fileName?: string; filePath?: string; fileVersion?: string } }
  | {
      type: "LOAD_COMPONENTS"
      payload: { components: MarkdownComponent[]; fileName: string; filePath: string; fileVersion: string }
    }
  | { type: "SET_DIRTY"; payload: { isDirty: boolean } }
  | { type: "DUPLICATE_COMPONENT"; payload: { id: string } }
  | { type: "COPY_COMPONENT"; payload: { id: string } }
  | { type: "PASTE_COMPONENT"; payload: { index?: number } }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "CLEAR_HISTORY" }
  | { type: "LOCK_COMPONENT"; payload: { id: string; locked: boolean } }
  | { type: "HIDE_COMPONENT"; payload: { id: string; hidden: boolean } }
