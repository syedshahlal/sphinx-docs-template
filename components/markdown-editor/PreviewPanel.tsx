"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Copy, Download, Eye } from "lucide-react"
import type { MarkdownComponent } from "./types"
import { Highlight } from "prism-react-renderer"

const draculaTheme = {
  plain: { backgroundColor: "transparent", color: "#f8f8f2" },
  styles: [
    { types: ["comment"], style: { color: "#6272a4" } },
    { types: ["punctuation"], style: { color: "#f8f8f2" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol"], style: { color: "#bd93f9" } },
    { types: ["string", "inserted"], style: { color: "#50fa7b" } },
    { types: ["operator"], style: { color: "#f8f8f2" } },
    { types: ["deleted"], style: { color: "#ff5555" } },
    { types: ["function"], style: { color: "#ffb86c" } },
    { types: ["keyword"], style: { color: "#8be9fd" } },
  ],
} as const

/* ------------------------------------------------------------------ */
/*  helpers reused by other modules                                   */
/* ------------------------------------------------------------------ */

/** Convert a Component list to Markdown */
export function generateMarkdown(blocks: MarkdownComponent[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading":
          return `${"#".repeat(b.content.level || 1)} ${b.content.text}\n\n`
        case "paragraph":
          return `${b.content.text}\n\n`
        case "image":
          return `![${b.content.alt}](${b.content.src})\n\n`
        case "code":
          return `\`\`\`${b.content.language || ""}\n${b.content.code}\n\`\`\`\n\n`
        case "htmlBlock":
          return `<!-- html block -->\n${b.content.html}\n\n`
        default:
          return ""
      }
    })
    .join("")
}

/** Convert a Component list to raw HTML */
export function generateHtml(blocks: MarkdownComponent[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading":
          return `<h${b.content.level || 1}>${b.content.text}</h${b.content.level || 1}>`
        case "paragraph":
          return `<p>${b.content.text}</p>`
        case "image":
          return `<img src="${b.content.src}" alt="${b.content.alt}" />`
        case "code":
          return `<pre><code class="language-${b.content.language || ""}">${b.content.code}</code></pre>`
        case "htmlBlock":
          return b.content.html
        default:
          return ""
      }
    })
    .join("")
}

function CodeHighlighter({
  code,
  language,
}: {
  code: string
  language: string
}) {
  return (
    <Highlight code={code} language={language as any} theme={draculaTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, margin: 0, padding: "1rem", borderRadius: 8 }}>
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
}

interface PreviewPanelProps {
  blocks: MarkdownComponent[]
  className?: string
}

export default function PreviewPanel({ blocks, className }: PreviewPanelProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const markdown = React.useMemo(() => generateMarkdown(blocks), [blocks])
  const html = React.useMemo(() => generateHtml(blocks), [blocks])

  return (
    <div className={`h-full bg-white ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-slate-800">Preview</h2>
        <p className="text-sm text-slate-600">Live preview of your content</p>
      </div>

      <Tabs defaultValue="preview" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Live Preview
          </TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-6 prose prose-slate max-w-none">
              {blocks.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No components added yet</p>
                  <p className="text-sm">Drag components from the palette to see them here</p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <div key={`${block.id}-${index}`} className="mb-6">
                    {block.type === "heading" &&
                      React.createElement(
                        `h${block.content.level || 1}`,
                        { className: "text-slate-900" },
                        block.content.text,
                      )}
                    {block.type === "paragraph" && <p className="text-slate-700">{block.content.text}</p>}
                    {block.type === "image" && (
                      <figure>
                        <img
                          src={block.content.src || "/placeholder.svg"}
                          alt={block.content.alt}
                          className="rounded-lg shadow-sm"
                        />
                        {block.content.caption && (
                          <figcaption className="text-sm text-slate-600 mt-2 text-center">
                            {block.content.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    {block.type === "code" && (
                      <CodeHighlighter code={block.content.code} language={block.content.language || "text"} />
                    )}
                    {block.type === "htmlBlock" && (
                      <div className="html-block" dangerouslySetInnerHTML={{ __html: block.content.html }} />
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="markdown" className="flex-1 m-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(markdown)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(markdown, "content.md")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <CodeHighlighter
                code={markdown || "# No content yet\n\nAdd components to see markdown output here."}
                language="markdown"
              />
            </ScrollArea>
          </div>
        </TabsContent>

        <TabsContent value="html" className="flex-1 m-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(html)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(html, "content.html")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <CodeHighlighter
                code={html || "<!-- No content yet -->\n<!-- Add components to see HTML output here -->"}
                language="html"
              />
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  re-export helpers for other modules                               */
/* ------------------------------------------------------------------ */
