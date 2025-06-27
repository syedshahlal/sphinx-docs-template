"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useEditor } from "./EditorContext"
import { ComponentRenderer } from "./ComponentRenderer"
import { Eye, Code, Copy, Download, FileText } from "lucide-react"

export function PreviewPanel() {
  const { state, updateComponentContent } = useEditor()
  const [previewMode, setPreviewMode] = useState<"visual" | "markdown" | "html">("visual")

  const generateMarkdown = () => {
    let markdown = ""

    state.components.forEach((component) => {
      switch (component.type) {
        case "heading":
          const level = "#".repeat(component.content.level || 2)
          markdown += `${level} ${component.content.text || "Heading"}\n\n`
          break
        case "paragraph":
          markdown += `${component.content.text || "Paragraph text"}\n\n`
          break
        case "image":
          markdown += `![${component.content.alt || "Image"}](${component.content.src || "/placeholder.svg"})\n`
          if (component.content.caption) {
            markdown += `*${component.content.caption}*\n`
          }
          markdown += "\n"
          break
        case "button":
          markdown += `[${component.content.text || "Button"}](${component.content.link || "#"})\n\n`
          break
        case "list":
          component.content.items?.forEach((item: string) => {
            markdown += `- ${item}\n`
          })
          markdown += "\n"
          break
        case "orderedList":
          component.content.items?.forEach((item: string, index: number) => {
            markdown += `${(component.content.start || 1) + index}. ${item}\n`
          })
          markdown += "\n"
          break
        case "taskList":
          component.content.items?.forEach((item: any) => {
            markdown += `- [${item.checked ? "x" : " "}] ${item.text}\n`
          })
          markdown += "\n"
          break
        case "blockquote":
          markdown += `> ${component.content.text}\n`
          if (component.content.author) {
            markdown += `> \n> — ${component.content.author}\n`
          }
          markdown += "\n"
          break
        case "code":
          markdown += `\`\`\`${component.content.language || ""}\n${component.content.code || ""}\n\`\`\`\n\n`
          break
        case "divider":
          markdown += "---\n\n"
          break
        case "table":
          if (component.content.headers?.length) {
            markdown += `| ${component.content.headers.join(" | ")} |\n`
            markdown += `| ${component.content.headers.map(() => "---").join(" | ")} |\n`
          }
          component.content.rows?.forEach((row: string[]) => {
            markdown += `| ${row.join(" | ")} |\n`
          })
          markdown += "\n"
          break
        case "htmlBlock":
          markdown += `${component.content.htmlContent || ""}\n\n`
          break
        default:
          markdown += `<!-- ${component.type} component -->\n\n`
      }
    })

    return markdown.trim()
  }

  const generateHTML = () => {
    let html = ""

    state.components.forEach((component) => {
      switch (component.type) {
        case "heading":
          const level = component.content.level || 2
          html += `<h${level}>${component.content.text || "Heading"}</h${level}>\n`
          break
        case "paragraph":
          html += `<p>${component.content.text || "Paragraph text"}</p>\n`
          break
        case "image":
          html += `<img src="${component.content.src || "/placeholder.svg"}" alt="${component.content.alt || "Image"}">\n`
          if (component.content.caption) {
            html += `<p><em>${component.content.caption}</em></p>\n`
          }
          break
        case "button":
          html += `<a href="${component.content.link || "#"}" class="button">${component.content.text || "Button"}</a>\n`
          break
        case "list":
          html += "<ul>\n"
          component.content.items?.forEach((item: string) => {
            html += `  <li>${item}</li>\n`
          })
          html += "</ul>\n"
          break
        case "orderedList":
          html += `<ol start="${component.content.start || 1}">\n`
          component.content.items?.forEach((item: string) => {
            html += `  <li>${item}</li>\n`
          })
          html += "</ol>\n"
          break
        case "blockquote":
          html += `<blockquote>\n  <p>${component.content.text}</p>\n`
          if (component.content.author) {
            html += `  <cite>— ${component.content.author}</cite>\n`
          }
          html += "</blockquote>\n"
          break
        case "code":
          html += `<pre><code class="language-${component.content.language || ""}">${component.content.code || ""}</code></pre>\n`
          break
        case "divider":
          html += "<hr>\n"
          break
        case "htmlBlock":
          html += `${component.content.htmlContent || ""}\n`
          break
        default:
          html += `<!-- ${component.type} component -->\n`
      }
    })

    return html.trim()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // TODO: Show toast notification
      console.log("Copied to clipboard")
    })
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderPreview = () => {
    if (previewMode === "visual") {
      return (
        <div className="max-w-4xl mx-auto p-6">
          {state.components.length === 0 ? (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 mx-auto mb-4 text-[#6b778c] opacity-50" />
              <p className="text-[#6b778c]">No components to preview</p>
              <p className="text-sm text-[#6b778c] mt-1">Add components to see the preview</p>
            </div>
          ) : (
            <div className="space-y-6">
              {state.components.map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isSelected={false}
                  updateComponentContent={updateComponentContent}
                />
              ))}
            </div>
          )}
        </div>
      )
    }

    if (previewMode === "markdown") {
      const markdown = generateMarkdown()
      return (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#172b4d]">Markdown Output</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(markdown)}>
                <Copy className="h-3 w-3 mr-1.5" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={() => downloadFile(markdown, "document.md", "text/markdown")}>
                <Download className="h-3 w-3 mr-1.5" />
                Download
              </Button>
            </div>
          </div>
          <pre className="text-xs bg-[#f4f5f7] p-4 rounded-lg border overflow-auto max-h-96 font-mono">
            {markdown || "No content to display"}
          </pre>
        </div>
      )
    }

    if (previewMode === "html") {
      const html = generateHTML()
      return (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#172b4d]">HTML Output</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(html)}>
                <Copy className="h-3 w-3 mr-1.5" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={() => downloadFile(html, "document.html", "text/html")}>
                <Download className="h-3 w-3 mr-1.5" />
                Download
              </Button>
            </div>
          </div>
          <pre className="text-xs bg-[#f4f5f7] p-4 rounded-lg border overflow-auto max-h-96 font-mono">
            {html || "No content to display"}
          </pre>
        </div>
      )
    }
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#dfe1e6]">
      {/* Preview Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#0052cc] text-white">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#172b4d]">Preview</h2>
            <p className="text-sm text-[#6b778c]">See how your content looks</p>
          </div>
        </div>

        {/* Preview Mode Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-md p-1 border border-[#dfe1e6]">
          <Button
            variant={previewMode === "visual" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("visual")}
            className="h-7 px-3"
          >
            <Eye className="h-3 w-3 mr-1.5" />
            Visual
          </Button>
          <Button
            variant={previewMode === "markdown" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("markdown")}
            className="h-7 px-3"
          >
            <FileText className="h-3 w-3 mr-1.5" />
            Markdown
          </Button>
          <Button
            variant={previewMode === "html" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("html")}
            className="h-7 px-3"
          >
            <Code className="h-3 w-3 mr-1.5" />
            HTML
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">{renderPreview()}</ScrollArea>
    </div>
  )
}
