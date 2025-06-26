"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MarkdownRenderer from "../shared/MarkdownRenderer"
import type { MarkdownContent } from "../../types/markdown"

const MarkdownPage: React.FC = () => {
  const [content, setContent] = useState<MarkdownContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Map routes to markdown files
        const routeToFile: Record<string, string> = {
          "/platform-introduction": "platform-introduction.md",
          "/getting-started": "getting-started.md",
          "/api-reference": "api-reference.md",
        }

        const filename = routeToFile[location.pathname]
        if (!filename) {
          throw new Error("Page not found")
        }

        // Import the markdown file
        const module = await import(`../../pages/${filename}?raw`)
        const rawContent = module.default

        // Parse frontmatter and content
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        const match = rawContent.match(frontmatterRegex)

        if (match) {
          const frontmatterText = match[1]
          const contentText = match[2]

          // Parse YAML frontmatter (simple parsing)
          const frontmatter: Record<string, any> = {}
          frontmatterText.split("\n").forEach((line) => {
            const [key, ...valueParts] = line.split(":")
            if (key && valueParts.length > 0) {
              const value = valueParts
                .join(":")
                .trim()
                .replace(/^["']|["']$/g, "")
              frontmatter[key.trim()] = value
            }
          })

          setContent({
            frontmatter,
            content: contentText,
            slug: filename.replace(".md", ""),
            readingTime: Math.ceil(contentText.split(" ").length / 200),
          })
        } else {
          setContent({
            frontmatter: {},
            content: rawContent,
            slug: filename.replace(".md", ""),
            readingTime: Math.ceil(rawContent.split(" ").length / 200),
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content")
      } finally {
        setLoading(false)
      }
    }

    loadMarkdownContent()
  }, [location.pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Page Not Found</h1>
          <p className="text-gray-500">The requested page could not be found.</p>
        </div>
      </div>
    )
  }

  return <MarkdownRenderer content={content} />
}

export default MarkdownPage
