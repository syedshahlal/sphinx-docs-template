"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentRenderer } from "./ComponentRenderer"
import { Eye, Code, Globe, Monitor, Tablet, Smartphone, Download, Share } from "lucide-react"
import { useEditor } from "./EditorContext"
import { componentsToMarkdown } from "@/lib/markdown-converter"

export function PreviewPanel() {
  const { state } = useEditor()
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const markdownContent = componentsToMarkdown(state.components)

  const handleExport = (format: "md" | "html") => {
    const content =
      format === "md"
        ? markdownContent
        : `<!DOCTYPE html>
<html>
<head>
  <title>${state.fileName || "Document"}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1, h2, h3, h4, h5, h6 { color: #172b4d; margin-top: 2rem; margin-bottom: 1rem; }
    code { background: #f4f5f7; padding: 0.2rem 0.4rem; border-radius: 3px; color: #172b4d; }
    pre { background: #f4f5f7; padding: 1rem; border-radius: 5px; overflow-x: auto; border: 1px solid #dfe1e6; }
    blockquote { border-left: 4px solid #0052cc; margin: 0; padding-left: 1rem; color: #6b778c; }
  </style>
</head>
<body>
  ${markdownContent.replace(/\n/g, "<br>")}
</body>
</html>`

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
    <div className="h-full flex flex-col bg-white border-r border-[#dfe1e6]">
      {/* Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0052cc] text-white">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#172b4d]">Preview</h2>
              <p className="text-sm text-[#6b778c]">Live page preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleExport("md")}
              className="h-8 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]"
            >
              <Download className="w-4 h-4 mr-2" />
              MD
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleExport("html")}
              className="h-8 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]"
            >
              <Download className="w-4 h-4 mr-2" />
              HTML
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Device Preview Controls */}
        <div className="flex items-center justify-center gap-1 bg-white border border-[#dfe1e6] rounded-lg p-1">
          <Button
            variant={previewMode === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("desktop")}
            className={previewMode === "desktop" ? "bg-[#0052cc] text-white" : "text-[#6b778c] hover:text-[#172b4d]"}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={previewMode === "tablet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("tablet")}
            className={previewMode === "tablet" ? "bg-[#0052cc] text-white" : "text-[#6b778c] hover:text-[#172b4d]"}
          >
            <Tablet className="w-4 h-4 mr-2" />
            Tablet
          </Button>
          <Button
            variant={previewMode === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setPreviewMode("mobile")}
            className={previewMode === "mobile" ? "bg-[#0052cc] text-white" : "text-[#6b778c] hover:text-[#172b4d]"}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Tabs */}
      <Tabs defaultValue="live" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-full grid-cols-3 bg-[#f4f5f7] border border-[#dfe1e6]">
          <TabsTrigger value="live" className="data-[state=active]:bg-white data-[state=active]:text-[#0052cc]">
            <Eye className="h-4 w-4 mr-2" />
            Live
          </TabsTrigger>
          <TabsTrigger value="markdown" className="data-[state=active]:bg-white data-[state=active]:text-[#0052cc]">
            <Code className="h-4 w-4 mr-2" />
            Markdown
          </TabsTrigger>
          <TabsTrigger value="html" className="data-[state=active]:bg-white data-[state=active]:text-[#0052cc]">
            <Globe className="h-4 w-4 mr-2" />
            HTML
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-4 flex justify-center bg-[#f7f8f9]">
              <div
                className="transition-all duration-300 bg-white border border-[#dfe1e6] rounded-lg shadow-sm overflow-hidden"
                style={{ width: getPreviewWidth(), minHeight: "calc(100vh - 300px)" }}
              >
                <div className="p-6">
                  {state.components.length === 0 ? (
                    <div className="text-center py-16 text-[#6b778c]">
                      <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2 text-[#172b4d]">No Content Yet</h3>
                      <p className="text-sm">Add components to see a preview of your page.</p>
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
              <pre className="text-sm whitespace-pre-wrap font-mono bg-[#f4f5f7] border border-[#dfe1e6] p-4 rounded-lg overflow-auto text-[#172b4d]">
                {markdownContent || "No content to preview."}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="html" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono bg-[#f4f5f7] border border-[#dfe1e6] p-4 rounded-lg overflow-auto text-[#172b4d]">
                {`<!DOCTYPE html>
<html>
<head>
  <title>${state.fileName || "Document"}</title>
</head>
<body>
  ${markdownContent.replace(/\n/g, "<br>")}
</body>
</html>`}
              </pre>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
