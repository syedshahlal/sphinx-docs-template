export interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

export interface SphinxContent {
  title: string
  content: string
  toc: TocItem[]
  metadata: {
    description?: string
    author?: string
    lastModified?: string
    version?: string
  }
}

export interface NavigationItem {
  id: string
  title: string
  path: string
  children?: NavigationItem[]
  icon?: string
}

export interface ThemeConfig {
  mode: "light" | "dark" | "system"
  primaryColor: string
  accentColor: string
}
