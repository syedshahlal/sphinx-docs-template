"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComponentRenderer } from "./ComponentRenderer"
import { Monitor, Tablet, Smartphone, Eye, Code, Download, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent } from "./types"

interface PreviewPanelProps {
  components: MarkdownComponent[]
  previewMode: "edit" | "preview" | "mobile" | "tablet"
  onPreviewModeChange: (mode: "edit" | "preview" | "mobile" | "tablet") => void
}

export function PreviewPanel({ components, previewMode, onPreviewModeChange }: PreviewPanelProps) {
  const [showCode, setShowCode] = useState(false)

  const generateMarkdown = () => {
    let markdown = ""

    components.forEach((component) => {
      switch (component.type) {
        case "heading":
          markdown += `${"#".repeat(component.content.level || 2)} ${component.content.text || "Heading"}\n\n`
          break
        case "paragraph":
          markdown += `${component.content.text || "Paragraph text"}\n\n`
          break
        case "image":
          markdown += `![${component.content.alt || ""}](${component.content.src || ""})\n`
          if (component.content.caption) {
            markdown += `*${component.content.caption}*\n`
          }
          markdown += "\n"
          break
        case "button":
          if (component.content.link) {
            markdown += `[${component.content.text || "Button"}](${component.content.link})\n\n`
          } else {
            markdown += `**${component.content.text || "Button"}**\n\n`
          }
          break
        case "code":
          markdown += "```" + (component.content.language || "") + "\n"
          markdown += (component.content.code || "// Your code here") + "\n"
          markdown += "```\n\n"
          break
        case "blockquote":
          markdown += `> ${component.content.text || "Quote text"}\n`
          if (component.content.author) {
            markdown += `> \n> — ${component.content.author}\n`
          }
          markdown += "\n"
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
        case "table":
          if (component.content.headers?.length > 0) {
            markdown += "| " + component.content.headers.join(" | ") + " |\n"
            markdown += "| " + component.content.headers.map(() => "---").join(" | ") + " |\n"
            component.content.rows?.forEach((row: string[]) => {
              markdown += "| " + row.join(" | ") + " |\n"
            })
            markdown += "\n"
          }
          break
        case "divider":
          markdown += "---\n\n"
          break
        default:
          markdown += `<!-- ${component.type} component -->\n\n`
      }
    })

    return markdown
  }

  const handleExport = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "document.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      default:
        return "100%"
    }
  }

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
              <p className="text-sm text-muted-foreground">Live document preview</p>
            </div>
          </div>
          <Badge variant="secondary">{components.length} components</Badge>
        </div>

        {/* Preview Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => onPreviewModeChange("preview")}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => onPreviewModeChange("tablet")}
            >
              <Tablet className="w-4 h-4 mr-2" />
              Tablet
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => onPreviewModeChange("mobile")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={showCode ? "default" : "outline"} size="sm" onClick={() => setShowCode(!showCode)}>
              <Code className="w-4 h-4 mr-2" />
              {showCode ? "Preview" : "Code"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <GitBranch className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 flex justify-center">
          <div
            className={cn(
              "transition-all duration-300 bg-background border border-border rounded-lg shadow-sm",
              previewMode !== "preview" && "mx-auto",
            )}
            style={{
              width: getPreviewWidth(),
              minHeight: "600px",
            }}
          >
            <div className="p-6">
              {showCode ? (
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg overflow-auto">
                  {generateMarkdown()}
                </pre>
              ) : components.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No Content Yet</h3>
                  <p>Add components from the palette to see your document preview here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {components.map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      isSelected={false}
                      updateComponentContent={() => {}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
