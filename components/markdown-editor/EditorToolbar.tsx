"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Github, Download, LayoutGrid, Rows, EyeIcon } from "lucide-react"
import { useEditor } from "./EditorContext"
import { useState } from "react"

interface EditorToolbarProps {
  onToggleFileManager?: () => void
}

export function EditorToolbar({ onToggleFileManager }: EditorToolbarProps) {
  const { state, setFileDetails, setLayoutMode } = useEditor()
  const { toast } = useToast()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishPopoverOpen, setPublishPopoverOpen] = useState(false)

  const handleSave = async () => {
    setIsPublishing(true)

    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Document Saved",
        description: "Your document has been saved successfully.",
      })
    } catch (error: any) {
      console.error("Failed to save:", error)
      toast({
        title: "Save Failed",
        description: error.message || "Could not save document.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDownload = (format: "md" | "html") => {
    // Generate content based on format
    const content = format === "md" ? "# Sample Markdown" : "<h1>Sample HTML</h1>"
    const filename = `${state.fileName || "document"}.${format}`
    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/html" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    toast({ title: "Download Started", description: `${filename} is downloading.` })
  }

  return (
    <div className="p-2 border-b border-border bg-card flex items-center justify-between space-x-2 h-14">
      <div className="flex items-center space-x-2">
        {onToggleFileManager && (
          <Button variant="ghost" size="icon" onClick={onToggleFileManager} title="Toggle File Manager">
            <FileText className="w-5 h-5" />
          </Button>
        )}
        <div className="w-px h-6 bg-border mx-1"></div>
        <Input
          type="text"
          placeholder="File Name (e.g., feature-overview.md)"
          value={state.fileName || ""}
          onChange={(e) => setFileDetails({ fileName: e.target.value })}
          className="h-9 text-sm w-48"
        />
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant={state.layoutMode === "freeform" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setLayoutMode("freeform")}
          title="Freeform Layout"
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant={state.layoutMode === "grid" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setLayoutMode("grid")}
          title="Grid Layout"
        >
          <Rows className="w-4 h-4" />
        </Button>
        <Button
          variant={state.layoutMode === "flex" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setLayoutMode("flex")}
          title="Flex Layout"
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => handleDownload("md")} title="Download Markdown">
          <Download className="w-4 h-4 mr-1.5" /> MD
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDownload("html")} title="Download HTML">
          <Download className="w-4 h-4 mr-1.5" /> HTML
        </Button>

        <Popover open={publishPopoverOpen} onOpenChange={setPublishPopoverOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" disabled={isPublishing}>
              <Github className="w-4 h-4 mr-1.5" />
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Publish to GitHub</h4>
              <p className="text-sm text-muted-foreground">
                This will commit changes to a new branch and open a Pull Request.
              </p>
              <div>
                <Label htmlFor="file-path" className="text-xs">
                  File Path in Repo
                </Label>
                <Input
                  id="file-path"
                  placeholder="e.g., docs/section/filename.md"
                  value={state.filePath || ""}
                  onChange={(e) => setFileDetails({ filePath: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="file-version" className="text-xs">
                  Document Version
                </Label>
                <Input
                  id="file-version"
                  placeholder="e.g., 1.0.0"
                  value={state.fileVersion || ""}
                  onChange={(e) => setFileDetails({ fileVersion: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isPublishing}>
                {isPublishing ? "Processing..." : "Confirm & Publish"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
