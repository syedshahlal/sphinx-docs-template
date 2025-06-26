"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Copy, Download, Eye } from "lucide-react"
import type { ComponentItem } from "./types"
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
  components: ComponentItem[]
  className?: string
}

export default function PreviewPanel({ components, className }: PreviewPanelProps) {
  const generateMarkdown = () => {
    return components
      .map((component) => {
        switch (component.type) {
          case "heading":
            const level = "#".repeat(component.content.level || 1)
            return `${level} ${component.content.text}\n\n`

          case "paragraph":
            return `${component.content.text}\n\n`

          case "image":
            const caption = component.content.caption ? `\n*${component.content.caption}*` : ""
            return `![${component.content.alt}](${component.content.url})${caption}\n\n`

          case "button":
            return `[${component.content.text}](${component.content.link || "#"})\n\n`

          case "card":
            return `## ${component.content.title}\n\n${component.content.description}\n\n${component.content.imageUrl ? `![Card Image](${component.content.imageUrl})\n\n` : ""}`

          case "list":
            const listItems = component.content.items
              .map((item) => (component.content.type === "ordered" ? `1. ${item}` : `- ${item}`))
              .join("\n")
            return `${listItems}\n\n`

          case "table":
            const headers = `| ${component.content.headers.join(" | ")} |`
            const separator = `| ${component.content.headers.map(() => "---").join(" | ")} |`
            const rows = component.content.rows.map((row) => `| ${row.join(" | ")} |`).join("\n")
            return `${headers}\n${separator}\n${rows}\n\n`

          case "code":
            return `\`\`\`${component.content.language || ""}\n${component.content.code}\n\`\`\`\n\n`

          case "quote":
            return `> ${component.content.text}\n${component.content.author ? `> \n> — ${component.content.author}` : ""}\n\n`

          case "link":
            return `[${component.content.text}](${component.content.url})\n\n`

          case "htmlBlock":
            return `\`\`\`html\n${component.content.html}\n\`\`\`\n\n`

          default:
            return ""
        }
      })
      .join("")
  }

  const generateHTML = () => {
    return components
      .map((component) => {
        switch (component.type) {
          case "heading":
            const tag = `h${component.content.level || 1}`
            return `<${tag}>${component.content.text}</${tag}>`

          case "paragraph":
            return `<p>${component.content.text}</p>`

          case "image":
            const caption = component.content.caption ? `<figcaption>${component.content.caption}</figcaption>` : ""
            return `<figure><img src="${component.content.url}" alt="${component.content.alt}" />${caption}</figure>`

          case "button":
            return `<a href="${component.content.link || "#"}" class="btn btn-${component.content.variant || "default"}">${component.content.text}</a>`

          case "card":
            return `<div class="card">
            ${component.content.imageUrl ? `<img src="${component.content.imageUrl}" alt="Card image" />` : ""}
            <div class="card-content">
              <h3>${component.content.title}</h3>
              <p>${component.content.description}</p>
            </div>
          </div>`

          case "list":
            const listTag = component.content.type === "ordered" ? "ol" : "ul"
            const listItems = component.content.items.map((item) => `<li>${item}</li>`).join("")
            return `<${listTag}>${listItems}</${listTag}>`

          case "table":
            const headerRow = `<tr>${component.content.headers.map((h) => `<th>${h}</th>`).join("")}</tr>`
            const bodyRows = component.content.rows
              .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
              .join("")
            return `<table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`

          case "code":
            return `<pre><code class="language-${component.content.language || ""}">${component.content.code}</code></pre>`

          case "quote":
            return `<blockquote>
            <p>${component.content.text}</p>
            ${component.content.author ? `<cite>— ${component.content.author}</cite>` : ""}
          </blockquote>`

          case "link":
            return `<a href="${component.content.url}"${component.content.external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${component.content.text}</a>`

          case "htmlBlock":
            return component.content.html

          default:
            return ""
        }
      })
      .join("\n")
  }

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

  const markdown = generateMarkdown()
  const html = generateHTML()

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
              {components.length === 0 ? (
                <div className="text-center text-slate-500 py-12">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No components added yet</p>
                  <p className="text-sm">Drag components from the palette to see them here</p>
                </div>
              ) : (
                components.map((component, index) => (
                  <div key={`${component.id}-${index}`} className="mb-6">
                    {component.type === "heading" &&
                      React.createElement(
                        `h${component.content.level || 1}`,
                        { className: "text-slate-900" },
                        component.content.text,
                      )}
                    {component.type === "paragraph" && <p className="text-slate-700">{component.content.text}</p>}
                    {component.type === "image" && (
                      <figure>
                        <img
                          src={component.content.url || "/placeholder.svg"}
                          alt={component.content.alt}
                          className="rounded-lg shadow-sm"
                        />
                        {component.content.caption && (
                          <figcaption className="text-sm text-slate-600 mt-2 text-center">
                            {component.content.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                    {component.type === "button" && (
                      <Button variant={component.content.variant as any} size={component.content.size as any} asChild>
                        <a href={component.content.link || "#"}>{component.content.text}</a>
                      </Button>
                    )}
                    {component.type === "card" && (
                      <div className="border rounded-lg p-6 bg-white shadow-sm">
                        {component.content.imageUrl && (
                          <img
                            src={component.content.imageUrl || "/placeholder.svg"}
                            alt="Card image"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        <h3 className="text-xl font-semibold mb-2">{component.content.title}</h3>
                        <p className="text-slate-600">{component.content.description}</p>
                      </div>
                    )}
                    {component.type === "list" &&
                      (component.content.type === "ordered" ? (
                        <ol className="list-decimal list-inside">
                          {component.content.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ol>
                      ) : (
                        <ul className="list-disc list-inside">
                          {component.content.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ))}
                    {component.type === "table" && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-slate-300">
                          <thead>
                            <tr className="bg-slate-50">
                              {component.content.headers.map((header, i) => (
                                <th key={i} className="border border-slate-300 px-4 py-2 text-left">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {component.content.rows.map((row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j} className="border border-slate-300 px-4 py-2">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {component.type === "code" && (
                      <CodeHighlighter code={component.content.code} language={component.content.language || "text"} />
                    )}
                    {component.type === "quote" && (
                      <blockquote className="border-l-4 border-slate-300 pl-4 italic">
                        <p>"{component.content.text}"</p>
                        {component.content.author && (
                          <cite className="text-slate-600">— {component.content.author}</cite>
                        )}
                      </blockquote>
                    )}
                    {component.type === "link" && (
                      <a
                        href={component.content.url}
                        target={component.content.external ? "_blank" : undefined}
                        rel={component.content.external ? "noopener noreferrer" : undefined}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {component.content.text}
                      </a>
                    )}
                    {component.type === "htmlBlock" && (
                      <div className="html-block" dangerouslySetInnerHTML={{ __html: component.content.html }} />
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
