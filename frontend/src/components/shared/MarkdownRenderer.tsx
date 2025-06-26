"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { MarkdownContent } from "../../types/markdown"
import TableOfContents from "./TableOfContents"

interface MarkdownRendererProps {
  content: MarkdownContent
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>("")
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([])

  useEffect(() => {
    const processMarkdown = async () => {
      // Import markdown processing libraries dynamically
      const { unified } = await import("unified")
      const { default: remarkParse } = await import("remark-parse")
      const { default: remarkGfm } = await import("remark-gfm")
      const { default: remarkRehype } = await import("remark-rehype")
      const { default: rehypeHighlight } = await import("rehype-highlight")
      const { default: rehypeStringify } = await import("rehype-stringify")
      const { default: rehypeSlug } = await import("rehype-slug")
      const { default: rehypeAutolinkHeadings } = await import("rehype-autolink-headings")

      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
          behavior: "wrap",
          properties: {
            className: ["heading-link"],
          },
        })
        .use(rehypeHighlight)
        .use(rehypeStringify, { allowDangerousHtml: true })

      const result = await processor.process(content.content)
      const html = String(result)
      setHtmlContent(html)

      // Extract headings for TOC
      const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/g
      const extractedHeadings: Array<{ id: string; text: string; level: number }> = []
      let match

      while ((match = headingRegex.exec(html)) !== null) {
        extractedHeadings.push({
          level: Number.parseInt(match[1]),
          id: match[2],
          text: match[3].replace(/<[^>]*>/g, ""), // Remove HTML tags
        })
      }

      setHeadings(extractedHeadings)
    }

    processMarkdown()
  }, [content.content])

  // Set page title from frontmatter
  useEffect(() => {
    if (content.frontmatter.title) {
      document.title = `${content.frontmatter.title} - GRA Core Platform`
    }
  }, [content.frontmatter.title])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Article Header */}
              <header className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                {content.frontmatter.title && (
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.frontmatter.title}</h1>
                )}
                {content.frontmatter.description && (
                  <p className="text-lg text-gray-600 mb-4">{content.frontmatter.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {content.frontmatter.author && <span>By {content.frontmatter.author}</span>}
                  {content.frontmatter.date && <span>{new Date(content.frontmatter.date).toLocaleDateString()}</span>}
                  <span>{content.readingTime} min read</span>
                </div>
                {content.frontmatter.tags && (
                  <div className="flex gap-2 mt-3">
                    {content.frontmatter.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="px-8 py-6">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </article>
          </main>

          {/* Table of Contents Sidebar */}
          {headings.length > 0 && (
            <aside className="w-64 flex-shrink-0">
              <div className="sticky top-8">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownRenderer
