"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Highlight, { defaultProps, type Language } from "prism-react-renderer"
import dracula from "prism-react-renderer/themes/dracula"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-markdown"
import rehypeRaw from "rehype-raw"

interface PreviewPanelProps {
  markdown: string
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ markdown }) => {
  const [renderedMarkdown, setRenderedMarkdown] = useState<string>(markdown)
  const previewPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRenderedMarkdown(markdown)
  }, [markdown])

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const broken = event.target as HTMLImageElement
    if (!broken || typeof window === "undefined") return
    const retry = new Image()
    retry.crossOrigin = "anonymous"
    retry.onload = () => {
      broken.src = retry.src
    }
    retry.onerror = () => {
      /* give up silently */
    }
    retry.src = broken.src
  }

  return (
    <div ref={previewPanelRef} className="preview-panel prose dark:prose-invert max-w-none">
      <ReactMarkdown
        children={renderedMarkdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const language = (match?.[1] as Language) || "tsx"

            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            const codeString = String(children).replace(/\n$/, "")

            return (
              <Highlight {...defaultProps} code={codeString} language={language} theme={dracula}>
                {({ className: c, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={c} style={{ ...style, margin: 0 }} {...props}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            )
          },
          img: ({ node, ...props }) => <img onError={handleImageError} {...props} />,
        }}
      />
    </div>
  )
}

export default PreviewPanel
