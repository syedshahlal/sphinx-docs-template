"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentRenderer } from "./ComponentRenderer"
import { Eye, Code, Globe, Monitor, Tablet, Smartphone, Download, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEditor } from "./EditorContext"

export function PreviewPanel() {
  const { state } = useEditor()
  const [previewMode, setPreviewMode] = useState<"mobile" | "tablet" | "desktop">("desktop")

  const generateMarkdown = () => {
    let markdown = ""

    state.components.forEach((component) => {
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

  const generateHTML = () => {
    const markdown = generateMarkdown()
    // This is a simplified HTML conversion - in a real app you'd use a proper markdown parser
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.fileName || "Document"}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
        h1, h2, h3, h4, h5, h6 { margin-top: 2rem; margin-bottom: 1rem; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1rem; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
        th { background: #f4f4f4; }
    </style>
</head>
<body>
    ${markdown.replace(/\n/g, "<br>")}
</body>
</html>`
  }

  const handleExport = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = state.fileName || "document.md"
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
          <Badge variant="secondary">{state.components.length} components</Badge>
        </div>

        {/* Preview Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("desktop")}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("tablet")}
            >
              <Tablet className="w-4 h-4 mr-2" />
              Tablet
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode("mobile")}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1">
        <Tabs defaultValue="live" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3">
            <TabsTrigger value="live" className="text-sm">
              <Eye className="h-4 w-4 mr-2" />
              Live
            </TabsTrigger>
            <TabsTrigger value="markdown" className="text-sm">
              <Code className="h-4 w-4 mr-2" />
              Markdown
            </TabsTrigger>
            <TabsTrigger value="html" className="text-sm">
              <Globe className="h-4 w-4 mr-2" />
              HTML
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4 flex justify-center">
                <div
                  className={cn(
                    "transition-all duration-300 bg-background border border-border rounded-lg shadow-sm",
                    previewMode !== "desktop" && "mx-auto",
                  )}
                  style={{
                    width: getPreviewWidth(),
                    minHeight: "600px",
                  }}
                >
                  <div className="p-6">
                    {state.components.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground">
                        <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No Content Yet</h3>
                        <p>Add components from the palette to see your document preview here.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {state.components.map((component) => (
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
          </TabsContent>

          <TabsContent value="markdown" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg overflow-auto">
                  {generateMarkdown() || "No content to preview"}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="html" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="p-4">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg overflow-auto">
                  {generateHTML()}
                </pre>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
