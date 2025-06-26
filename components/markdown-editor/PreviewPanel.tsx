"use client"

import { useState, useMemo } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEditor } from "./EditorContext"
import { ComponentRenderer } from "./ComponentRenderer"
import { Eye, Code, FileText, Monitor, Tablet, Smartphone, Zap } from "lucide-react"
import type { MarkdownComponent, ComponentStyle } from "./types"

// Generate clean markdown from components
export function generateMarkdown(components: MarkdownComponent[]): string {
  const sortedComponents = components.sort((a, b) => a.order - b.order)

  return sortedComponents
    .map((component) => {
      switch (component.type) {
        case "heading":
          return `${"#".repeat(component.content.level || 2)} ${component.content.text || "Heading"}\n`

        case "paragraph":
          return `${component.content.text || "Paragraph text"}\n`

        case "image":
          const caption = component.content.caption ? `\n*${component.content.caption}*` : ""
          return `![${component.content.alt || "Image"}](${component.content.src || "/placeholder.svg"})${caption}\n`

        case "code":
          return `\`\`\`${component.content.language || ""}\n${component.content.code || ""}\n\`\`\`\n`

        case "blockquote":
          return `> ${component.content.text || "Quote"}\n`

        case "list":
          return (component.content.items || []).map((item: string) => `- ${item}`).join("\n") + "\n"

        case "orderedList":
          const start = component.content.start || 1
          return (
            (component.content.items || [])
              .map((item: string, index: number) => `${start + index}. ${item}`)
              .join("\n") + "\n"
          )

        case "taskList":
          return (
            (component.content.items || [])
              .map((item: { text: string; checked: boolean }) => `- [${item.checked ? "x" : " "}] ${item.text}`)
              .join("\n") + "\n"
          )

        case "table":
          if (!component.content.headers || !component.content.rows) return ""
          const headers = `| ${component.content.headers.join(" | ")} |`
          const separator = `| ${component.content.headers.map(() => "---").join(" | ")} |`
          const rows = component.content.rows.map((row: string[]) => `| ${row.join(" | ")} |`).join("\n")
          return `${headers}\n${separator}\n${rows}\n`

        case "alert":
          return `> **${component.content.type?.toUpperCase() || "INFO"}**: ${component.content.text || "Alert message"}\n`

        case "divider":
          return "---\n"

        case "spacer":
          return "\n"

        case "mermaid":
          return `\`\`\`mermaid\n${component.content.code || ""}\n\`\`\`\n`

        case "htmlBlock":
          return `\`\`\`html\n${component.content.htmlContent || ""}\n\`\`\`\n`

        default:
          return `<!-- ${component.type} component -->\n`
      }
    })
    .join("\n")
}

// Generate clean HTML from components
export function generateHtml(components: MarkdownComponent[]): string {
  const sortedComponents = components.sort((a, b) => a.order - b.order)

  const htmlContent = sortedComponents
    .map((component) => {
      const styleAttr = component.style ? ` style="${generateInlineStyles(component.style)}"` : ""
      const classAttr = component.style?.className ? ` class="${component.style.className}"` : ""

      switch (component.type) {
        case "heading":
          const level = component.content.level || 2
          return `<h${level}${classAttr}${styleAttr}>${component.content.text || "Heading"}</h${level}>`

        case "paragraph":
          return `<p${classAttr}${styleAttr}>${component.content.text || "Paragraph text"}</p>`

        case "image":
          const caption = component.content.caption ? `<figcaption>${component.content.caption}</figcaption>` : ""
          return `<figure${classAttr}${styleAttr}>
          <img src="${component.content.src || "/placeholder.svg"}" alt="${component.content.alt || "Image"}" />
          ${caption}
        </figure>`

        case "code":
          return `<pre${classAttr}${styleAttr}><code class="language-${component.content.language || "text"}">${component.content.code || ""}</code></pre>`

        case "blockquote":
          return `<blockquote${classAttr}${styleAttr}>${component.content.text || "Quote"}</blockquote>`

        case "list":
          const listItems = (component.content.items || []).map((item: string) => `<li>${item}</li>`).join("")
          return `<ul${classAttr}${styleAttr}>${listItems}</ul>`

        case "orderedList":
          const orderedItems = (component.content.items || []).map((item: string) => `<li>${item}</li>`).join("")
          const startAttr =
            component.content.start && component.content.start !== 1 ? ` start="${component.content.start}"` : ""
          return `<ol${startAttr}${classAttr}${styleAttr}>${orderedItems}</ol>`

        case "table":
          if (!component.content.headers || !component.content.rows) return ""
          const headerCells = component.content.headers.map((header: string) => `<th>${header}</th>`).join("")
          const bodyRows = component.content.rows
            .map((row: string[]) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
            .join("")
          return `<table${classAttr}${styleAttr}>
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>`

        case "divider":
          return `<hr${classAttr}${styleAttr} />`

        case "spacer":
          const height = component.content.height || "40px"
          return `<div${classAttr} style="height: ${height}${styleAttr ? `;${styleAttr.slice(8, -1)}` : ""}"></div>`

        case "htmlBlock":
          return component.content.htmlContent || ""

        default:
          return `<!-- ${component.type} component -->`
      }
    })
    .join("\n")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Content</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white">
  <div class="max-w-4xl mx-auto p-8">
    ${htmlContent}
  </div>
</body>
</html>`
}

// Generate inline styles from ComponentStyle
function generateInlineStyles(style: ComponentStyle): string {
  const styles: string[] = []

  if (style.color) styles.push(`color: ${style.color}`)
  if (style.backgroundColor) styles.push(`background-color: ${style.backgroundColor}`)
  if (style.fontSize) styles.push(`font-size: ${style.fontSize}`)
  if (style.fontWeight) styles.push(`font-weight: ${style.fontWeight}`)
  if (style.fontStyle) styles.push(`font-style: ${style.fontStyle}`)
  if (style.textDecoration) styles.push(`text-decoration: ${style.textDecoration}`)
  if (style.textAlign) styles.push(`text-align: ${style.textAlign}`)
  if (style.width) styles.push(`width: ${style.width}`)
  if (style.height) styles.push(`height: ${style.height}`)
  if (style.padding) styles.push(`padding: ${style.padding}`)
  if (style.margin) styles.push(`margin: ${style.margin}`)
  if (style.border) styles.push(`border: ${style.border}`)
  if (style.borderRadius) styles.push(`border-radius: ${style.borderRadius}`)
  if (style.boxShadow) styles.push(`box-shadow: ${style.boxShadow}`)
  if (style.opacity !== undefined) styles.push(`opacity: ${style.opacity}`)
  if (style.transform) styles.push(`transform: ${style.transform}`)
  if (style.transition) styles.push(`transition: ${style.transition}`)
  if (style.backgroundImage) styles.push(`background-image: ${style.backgroundImage}`)
  if (style.backgroundSize) styles.push(`background-size: ${style.backgroundSize}`)
  if (style.backgroundPosition) styles.push(`background-position: ${style.backgroundPosition}`)
  if (style.backgroundRepeat) styles.push(`background-repeat: ${style.backgroundRepeat}`)
  if (style.gradient) styles.push(`background: ${style.gradient}`)

  return styles.join("; ")
}

// Copy to clipboard utility
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand("copy")
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// Download file utility
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function PreviewPanel() {
  const { state, updateComponentContent } = useEditor()
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({})
  const [activeTab, setActiveTab] = useState("preview")

  // Generate content
  const markdownContent = useMemo(() => generateMarkdown(state.components), [state.components])
  const htmlContent = useMemo(() => generateHtml(state.components), [state.components])

  // Handle copy operations
  const handleCopy = async (content: string, type: string) => {
    const success = await copyToClipboard(content)
    if (success) {
      setCopyStatus({ ...copyStatus, [type]: true })
      setTimeout(() => {
        setCopyStatus({ ...copyStatus, [type]: false })
      }, 2000)
    }
  }

  // Handle download operations
  const handleDownload = (content: string, filename: string, mimeType: string) => {
    downloadFile(content, filename, mimeType)
  }

  // Get preview container classes based on mode
  const getPreviewClasses = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-sm mx-auto border-2 border-gray-300 rounded-3xl p-4 bg-white shadow-xl"
      case "tablet":
        return "max-w-2xl mx-auto border-2 border-gray-300 rounded-2xl p-6 bg-white shadow-lg"
      default:
        return "w-full"
    }
  }

  const componentCount = state.components.length
  const wordCount = markdownContent.split(/\s+/).filter(word => word.length > 0).length
  const charCount = markdownContent.length

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-600">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Preview</h2>
              <p className="text-sm text-slate-600">Live preview and export</p>
            </div>
          </div>
          
          {/* Preview mode toggles */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
                className="h-8 px-3"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("tablet")}
                className="h-8 px-3"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
                className="h-8 px-3"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>{componentCount} components</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{wordCount} words</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>{charCount} characters</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3 bg-slate-100">
            <TabsTrigger value="preview" className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
            </TabsTrigger>
            <TabsTrigger value="markdown" className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="html" className="text-sm flex items-center gap-2">
              <Code className="h-4 w-4" />
              HTML
            </TabsTrigger>
          </TabsList>

          {/* Live Preview Tab */}
          <TabsContent value="preview" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className={getPreviewClasses()}>
                  {state.components.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">No Content Yet</h3>
                      <p className="text-slate-500 max-w-sm mx-auto">
                        Add components from the palette to see them rendered here in real-time.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {state.components
                        .sort((a, b) => a.order - b.order)
                        .map((component) => (
                          <div key={component.id} className="relative">
                            <ComponentRenderer
                              component={component}
                              isSelected={false}
                              updateComponentContent={updateComponentContent}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Markdown Tab */}
          <TabsContent value="markdown\
