"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentRenderer } from "./ComponentRenderer"
import { Eye, Code, Globe, Monitor, Tablet, Smartphone, Download } from "lucide-react"
import { useEditor } from "./EditorContext"
import { componentsToMarkdown } from "@/lib/markdown-converter"
import { Remarkable } from "remarkable"

export function PreviewPanel() {
  const { state } = useEditor()
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const md = new Remarkable()

  const markdownContent = componentsToMarkdown(state.components)
  const htmlContent = md.render(markdownContent)

  const handleExport = (format: "md" | "html") => {
    const content = format === "md" ? markdownContent : htmlContent
    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${state.fileName || "document"}.${format}`
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
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Preview</h2>
              <p className="text-sm text-muted-foreground">Live document preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("md")} className="h-8 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              MD
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("html")} className="h-8 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              HTML
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={previewMode === "desktop" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("desktop")}
          >
            <Monitor className="w-4 h-4 mr-2" /> Desktop
          </Button>
          <Button
            variant={previewMode === "tablet" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("tablet")}
          >
            <Tablet className="w-4 h-4 mr-2" /> Tablet
          </Button>
          <Button
            variant={previewMode === "mobile" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
          >
            <Smartphone className="w-4 h-4 mr-2" /> Mobile
          </Button>
        </div>
      </div>

      <Tabs defaultValue="live" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-full grid-cols-3">
          <TabsTrigger value="live">
            <Eye className="h-4 w-4 mr-2" />
            Live
          </TabsTrigger>
          <TabsTrigger value="markdown">
            <Code className="h-4 w-4 mr-2" />
            Markdown
          </TabsTrigger>
          <TabsTrigger value="html">
            <Globe className="h-4 w-4 mr-2" />
            HTML
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-4 flex justify-center bg-muted/30">
              <div
                className="transition-all duration-300 bg-background border border-border rounded-lg shadow-sm overflow-hidden"
                style={{ width: getPreviewWidth(), minHeight: "calc(100vh - 250px)" }}
              >
                <div className="p-6">
                  {state.components.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">No Content Yet</h3>
                      <p>Add components to see a preview.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {state.components.map((c) => (
                        <ComponentRenderer
                          key={c.id}
                          component={c}
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

        <TabsContent value="markdown" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg overflow-auto">
                {markdownContent || "No content to preview."}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="html" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-lg overflow-auto">
                {htmlContent || "No content to preview."}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
