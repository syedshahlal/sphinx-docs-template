"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"

interface PreviewPanelProps {
  markdown: string
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ markdown }) => {
  const [renderedMarkdown, setRenderedMarkdown] = useState<string>(markdown)
  const previewPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRenderedMarkdown(markdown)
  }, [markdown])

  // Function to handle image loading errors and retry with CORS
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.target as HTMLImageElement
    if (img) {
      if (typeof window !== "undefined") {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = img.src // Reload the image with CORS enabled
      }
    }
  }

  return (
    <div ref={previewPanelRef} className="preview-panel prose dark:prose-invert max-w-none">
      <ReactMarkdown
        children={renderedMarkdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = (className || "").match(/language-(\w+)/)
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={dracula}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img: ({ node, ...props }) => <img onError={handleImageError} {...props} />,
        }}
      />
    </div>
  )
}

export default PreviewPanel
