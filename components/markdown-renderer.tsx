"use client"

import { useEffect, useState } from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Simple markdown to HTML conversion
    // In a real app, you'd use a proper markdown parser like remark or marked
    const convertMarkdown = (markdown: string) => {
      return markdown
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
        .replace(/\*(.*)\*/gim, "<em>$1</em>")
        .replace(/`([^`]+)`/gim, "<code>$1</code>")
        .replace(/\n\n/gim, "</p><p>")
        .replace(/\n/gim, "<br>")
    }

    setHtml(`<p>${convertMarkdown(content)}</p>`)
  }, [content])

  return <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}
