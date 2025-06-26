export interface DocSection {
  id: string
  title: string
  path: string
  children?: DocSection[]
  icon?: string
  badge?: string
}

export interface ComponentMount {
  id: string
  component: string
  props?: Record<string, any>
  container: HTMLElement
}

export interface ThemeConfig {
  mode: "light" | "dark"
  primaryColor: string
  accentColor: string
}

export interface SphinxContent {
  title: string
  content: string
  toc: TocItem[]
  metadata: Record<string, any>
}

export interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

export interface SearchResult {
  title: string
  excerpt: string
  url: string
  section: string
}
