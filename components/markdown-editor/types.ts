export interface ComponentStyle {
  // Text styles
  color?: string
  backgroundColor?: string
  textColor?: string
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
  maxWidth?: string

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
  [key: string]: any
}

export interface HeadingContent {
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export interface ParagraphContent {
  text: string
}

export interface ImageContent {
  src: string
  alt: string
  caption?: string
  width?: string
  height?: string
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none"
  borderRadius?: string
}

export interface ButtonContent {
  text: string
  variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size: "default" | "sm" | "lg" | "icon"
  link?: string
  icon?: string
}

export interface CardContent {
  title: string
  description: string
  imageUrl?: string
  imagePosition?: "top" | "left" | "right" | "background"
  buttons?: Array<{
    text: string
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    link?: string
    icon?: string
  }>
  layout?: "default" | "horizontal" | "minimal" | "feature" | "pricing"
}

export interface GridContent {
  columns: number
  gap: string
  items: Array<{
    id: string
    type: "card" | "image" | "text" | "chart"
    content: any
  }>
}

export interface TableContent {
  headers: string[]
  rows: string[][]
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

export interface HtmlBlockContent {
  htmlContent: string
  name: string
  category: string
  editable: boolean
  responsive: boolean
}

export interface ListContent {
  items: string[]
}

export interface OrderedListContent extends ListContent {
  start: number
}

export interface TaskListContent {
  items: { text: string; checked: boolean }[]
}

export interface BlockquoteContent {
  text: string
  author?: string
}

export interface AlertContent {
  type: "info" | "warning"
  title: string
  text: string
}

export interface CodeContent {
  code: string
  language: string
  showLineNumbers: boolean
  theme: "light" | "dark"
}

export interface DividerContent {
  style: "solid" | "dashed" | "dotted"
  color: string
  thickness: string
  margin: string
}

export interface SpacerContent {
  height: string
}

export interface ColumnsContent {
  column1Text: string
  column2Text: string
  columnRatio: "1:1" | "1:2" | "2:1"
  gap: string
}

export interface MermaidContent {
  code: string
  theme: "default" | "dark" | "forest"
}

export interface BannerContent {
  title: string
  subtitle?: string
  description: string
  backgroundImage?: string
  backgroundColor?: string
  textColor?: string
  buttons?: ButtonContent[]
}

export interface HeroContent extends BannerContent {
  textAlign: "left" | "center" | "right"
}

export interface GalleryContent {
  images: { src: string; alt: string; caption?: string }[]
}

export interface TestimonialContent {
  quote: string
  author: string
  title: string
  avatarUrl?: string
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export interface PricingContent {
  plans: PricingPlan[]
}

export interface MarkdownComponent {
  id: string
  type:
    | "heading"
    | "paragraph"
    | "image"
    | "button"
    | "card"
    | "grid"
    | "banner"
    | "hero"
    | "table"
    | "divider"
    | "list"
    | "orderedList"
    | "taskList"
    | "blockquote"
    | "alert"
    | "code"
    | "spacer"
    | "columns"
    | "mermaid"
    | "chart"
    | "gallery"
    | "testimonial"
    | "pricing"
    | "htmlBlock"
  content: any
  style: ComponentStyle
  order: number
}

export interface EditorState {
  components: MarkdownComponent[]
  selectedComponent: string | null
  previewMode: "edit" | "preview"
  isDirty: boolean
  fileName?: string
  filePath?: string
  history: {
    past: EditorState[]
    future: EditorState[]
  }
}

// Action types for useReducer
export type EditorAction =
  | {
      type: "ADD_COMPONENT"
      payload: { component: Omit<MarkdownComponent, "id" | "order">; index?: number }
      returnId?: (id: string) => void
    }
  | { type: "DELETE_COMPONENT"; payload: { id: string } }
  | { type: "UPDATE_COMPONENT_CONTENT"; payload: { id: string; contentUpdates: Partial<any> } }
  | { type: "UPDATE_COMPONENT_STYLE"; payload: { id: string; styleUpdates: Partial<ComponentStyle> } }
  | { type: "REORDER_COMPONENTS"; payload: { components: MarkdownComponent[] } }
  | { type: "SELECT_COMPONENT"; payload: { id: string | null } }
  | { type: "SET_PREVIEW_MODE"; payload: { mode: "edit" | "preview" } }
  | { type: "LOAD_COMPONENTS"; payload: { components: MarkdownComponent[]; fileName?: string; filePath?: string } }
  | { type: "DUPLICATE_COMPONENT"; payload: { id: string } }
  | { type: "UNDO" }
  | { type: "REDO" }
