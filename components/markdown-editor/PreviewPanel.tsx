"use client"

import { useState } from "react"
import { useEditor } from "./EditorContext"
import { Button } from "@/components/core/ui/button"
import { Eye, Code, FileText, Copy } from "lucide-react"

export function PreviewPanel() {
  const { state, generateMarkdown, generateHTML } = useEditor()
  const [activeTab, setActiveTab] = useState<"preview" | "markdown" | "html">("preview")

  const markdown = generateMarkdown()
  const html = generateHTML()

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Preview Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
        <button
          onClick={() => setActiveTab("markdown")}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "markdown"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Markdown</span>
        </button>
        <button
          onClick={() => setActiveTab("html")}
          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "html"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Code className="w-4 h-4" />
          <span>HTML</span>
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "preview" && (
          <div className="p-6 prose prose-sm max-w-none dark:prose-invert">
            {state.components.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                <p>No content to preview yet.</p>
                <p className="text-sm">Add components to see the preview.</p>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </div>
        )}

        {activeTab === "markdown" && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(markdown)}
              className="absolute top-2 right-2 z-10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <pre className="p-6 text-sm bg-muted overflow-x-auto">
              <code>{markdown || "# Your markdown will appear here..."}</code>
            </pre>
          </div>
        )}

        {activeTab === "html" && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(html)}
              className="absolute top-2 right-2 z-10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <pre className="p-6 text-sm bg-muted overflow-x-auto">
              <code>{html || "<!-- Your HTML will appear here... -->"}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
