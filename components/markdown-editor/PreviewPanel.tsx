"use client"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  Code,
  Download,
  Copy,
  Smartphone,
  Tablet,
  Monitor,
  FileText,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent } from "./types"
import { ComponentRenderer } from "./ComponentRenderer"

interface PreviewPanelProps {
  components: MarkdownComponent[]
  previewMode: "edit" | "preview" | "mobile" | "tablet"
  onPreviewModeChange: (mode: "edit" | "preview" | "mobile" | "tablet") => void
}

export function PreviewPanel({ components, previewMode, onPreviewModeChange }: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied">("idle")

  // Generate markdown from components
  const generateMarkdown = (): string => {
    return components
      .sort((a, b) => a.order - b.order)
      .map((component) => {
        switch (component.type) {
          case "heading":
            const level = "#".repeat(component.content.level || 2)
            return `${level} ${component.content.text || "Heading"}\n`

          case "paragraph":
            return `${component.content.text || "Paragraph text"}\n`

          case "image":
            const alt = component.content.alt || "Image"
            const src = component.content.src || "/placeholder.svg"
            const caption = component.content.caption ? `\n*${component.content.caption}*` : ""
            return `![${alt}](${src})${caption}\n`

          case "button":
            const buttonText = component.content.text || "Button"
            const link = component.content.link || "#"
            return `[${buttonText}](${link})\n`

          case "card":
            const title = component.content.title || "Card Title"
            const description = component.content.description || "Card description"
            return `### ${title}\n\n${description}\n`

          case "list":
            const listItems = component.content.items || ["List item"]
            return listItems.map((item: string) => `- ${item}`).join("\n") + "\n"

          case "orderedList":
            const orderedItems = component.content.items || ["List item"]
            const start = component.content.start || 1
            return orderedItems.map((item: string, index: number) => `${start + index}. ${item}`).join("\n") + "\n"

          case "taskList":
            const tasks = component.content.items || [{ text: "Task", checked: false }]
            return tasks.map((task: any) => `- [${task.checked ? "x" : " "}] ${task.text}`).join("\n") + "\n"

          case "blockquote":
            const quote = component.content.text || "Quote text"
            const author = component.content.author ? `\n\n— ${component.content.author}` : ""
            return `> ${quote}${author}\n`

          case "code":
            const code = component.content.code || "// Code here"
            const language = component.content.language || ""
            return `\`\`\`${language}\n${code}\n\`\`\`\n`

          case "divider":
            return `---\n`

          case "table":
            const headers = component.content.headers || ["Header 1", "Header 2"]
            const rows = component.content.rows || [["Cell 1", "Cell 2"]]
            const headerRow = `| ${headers.join(" | ")} |`
            const separatorRow = `| ${headers.map(() => "---").join(" | ")} |`
            const dataRows = rows.map((row: string[]) => `| ${row.join(" | ")} |`).join("\n")
            return `${headerRow}\n${separatorRow}\n${dataRows}\n`

          case "alert":
            const alertText = component.content.text || "Alert message"
            const alertType = component.content.type || "info"
            return `> **${alertType.toUpperCase()}**: ${alertText}\n`

          case "htmlBlock":
            return `${component.content.htmlContent || "<!-- HTML content -->"}\n`

          default:
            return `<!-- ${component.type} component -->\n`
        }
      })
      .join("\n")
  }

  // Generate HTML from components
  const generateHTML = (): string => {
    const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .prose { max-width: none; }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { margin-top: 2rem; margin-bottom: 1rem; }
        .prose p { margin-bottom: 1rem; line-height: 1.7; }
        .prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1rem; margin: 1.5rem 0; font-style: italic; color: #6b7280; }
        .prose img { border-radius: 0.5rem; margin: 1.5rem 0; }
        .prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
        .prose th { background-color: #f9fafb; font-weight: 600; }
        .prose code { background-color: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875em; }
        .prose pre { background-color: #1f2937; color: #f9fafb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; }
        .prose pre code { background: none; padding: 0; color: inherit; }
    </style>
</head>
<body class="bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-8 prose prose-lg">`

    const body = components
      .sort((a, b) => a.order - b.order)
      .map((component) => {
        switch (component.type) {
          case "heading":
            const level = component.content.level || 2
            const headingText = component.content.text || "Heading"
            return `<h${level}>${headingText}</h${level}>`

          case "paragraph":
            return `<p>${component.content.text || "Paragraph text"}</p>`

          case "image":
            const imgSrc = component.content.src || "/placeholder.svg"
            const imgAlt = component.content.alt || "Image"
            const imgCaption = component.content.caption
              ? `<figcaption class="text-center text-sm text-gray-600 mt-2">${component.content.caption}</figcaption>`
              : ""
            return `<figure><img src="${imgSrc}" alt="${imgAlt}" class="w-full h-auto">${imgCaption}</figure>`

          case "htmlBlock":
            return component.content.htmlContent || "<!-- HTML content -->"

          default:
            return `<!-- ${component.type} component -->`
        }
      })
      .join("\n")

    const footer = `        </div>
    </div>
</body>
</html>`

    return head + body + footer
  }

  // Copy content to clipboard
  const copyToClipboard = async (content: string, type: string) => {
    setCopyStatus("copying")
    try {
      await navigator.clipboard.writeText(content)
      setCopyStatus("copied")
      setTimeout(() => setCopyStatus("idle"), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
      setCopyStatus("idle")
    }
  }

  // Download content as file
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

  // Get preview dimensions based on mode
  const getPreviewDimensions = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "max-w-full"
    }
  }

  // Get device icon
  const getDeviceIcon = (mode: string) => {
    switch (mode) {
      case "mobile":
        return Smartphone
      case "tablet":
        return Tablet
      default:
        return Monitor
    }
  }

  const markdown = generateMarkdown()
  const html = generateHTML()

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Preview</h2>
              <p className="text-sm text-muted-foreground">Live preview of your content</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {components.length} component{components.length !== 1 ? "s" : ""}
          </Badge>
        </div>

        {/* Device Preview Buttons */}
        <div className="flex items-center gap-2 mb-4">
          {(["preview", "tablet", "mobile"] as const).map((mode) => {
            const Icon = getDeviceIcon(mode)
            return (
              <Button
                key={mode}
                variant={previewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => onPreviewModeChange(mode)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {mode === "preview" ? "Desktop" : mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            )
          })}
        </div>

        {/* Export Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(markdown, "markdown")}
            disabled={copyStatus === "copying"}
            className="flex items-center gap-2"
          >
            {copyStatus === "copied" ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : copyStatus === "copying" ? (
              <AlertCircle className="w-4 h-4 animate-spin" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            Copy MD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(html, "html")}
            disabled={copyStatus === "copying"}
            className="flex items-center gap-2"
          >
            <Code className="w-4 h-4" />
            Copy HTML
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(markdown, "document.md", "text/markdown")}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download MD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadFile(html, "document.html", "text/html")}
            className="flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Download HTML
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="markdown" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              HTML
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className={cn("p-4", getPreviewDimensions())}>
                <div className="bg-background rounded-lg shadow-sm border border-border p-6">
                  {components.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Eye className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No content to preview</h3>
                      <p className="text-muted-foreground">Add some components to see the preview here.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {components
                        .sort((a, b) => a.order - b.order)
                        .map((component) => (
                          <div key={component.id} className="w-full">
                            <ComponentRenderer
                              component={component}
                              isSelected={false}
                              updateComponentContent={() => {}}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="markdown" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                    {markdown || "# No content\n\nAdd some components to generate markdown."}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="html" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                  <pre className="text-blue-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">{html}</pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Components: {components.length}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Words: {markdown.split(/\s+/).filter(Boolean).length}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Characters: {markdown.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live Preview</span>
          </div>
        </div>
      </div>
    </div>
  )
}
