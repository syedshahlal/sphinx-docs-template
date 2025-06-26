export interface MarkdownContent {
  frontmatter: {
    title?: string
    description?: string
    author?: string
    date?: string
    tags?: string[]
    order?: number
    [key: string]: any
  }
  content: string
  slug: string
  readingTime: number
}

export interface MarkdownPage {
  path: string
  content: MarkdownContent
}
