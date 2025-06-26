"use client"

import { useEditor } from "./EditorContext"
import { Button } from "@/components/core/ui/button"
import { Input } from "@/components/core/ui/input"
import { Save, FolderOpen, FileText, Settings, Download, Undo, Redo } from "lucide-react"

interface EditorToolbarProps {
  onToggleFileManager: () => void
  showFileManager: boolean
  onToggleProperties: () => void
  showProperties: boolean
}

export function EditorToolbar({
  onToggleFileManager,
  showFileManager,
  onToggleProperties,
  showProperties,
}: EditorToolbarProps) {
  const { state, saveFile, newFile, setFileName, setFilePath, generateMarkdown, generateHTML } = useEditor()

  const handleExport = (format: "md" | "html") => {
    const content = format === "md" ? generateMarkdown() : generateHTML()
    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${state.fileName.replace(".md", "")}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Left Section - File Operations */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={newFile}>
          <FileText className="w-4 h-4 mr-2" />
          New
        </Button>

        <Button variant="ghost" size="sm" onClick={onToggleFileManager} className={showFileManager ? "bg-accent" : ""}>
          <FolderOpen className="w-4 h-4 mr-2" />
          Files
        </Button>

        <Button variant="ghost" size="sm" onClick={saveFile} disabled={!state.isDirty}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>

        <div className="h-6 w-px bg-border mx-2" />

        <Button variant="ghost" size="sm">
          <Undo className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <Redo className="w-4 h-4" />
        </Button>
      </div>

      {/* Center Section - File Info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Input
            value={state.fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-48 h-8 text-sm"
            placeholder="filename.md"
          />
          <span className="text-muted-foreground text-sm">in</span>
          <Input
            value={state.filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-64 h-8 text-sm"
            placeholder="content/docs/"
          />
        </div>

        {state.isDirty && <span className="text-xs text-orange-500 font-medium">Unsaved</span>}
      </div>

      {/* Right Section - View & Export */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => handleExport("md")}>
          <Download className="w-4 h-4 mr-2" />
          Export MD
        </Button>

        <Button variant="ghost" size="sm" onClick={() => handleExport("html")}>
          <Download className="w-4 h-4 mr-2" />
          Export HTML
        </Button>

        <div className="h-6 w-px bg-border mx-2" />

        <Button variant="ghost" size="sm" onClick={onToggleProperties} className={showProperties ? "bg-accent" : ""}>
          <Settings className="w-4 h-4 mr-2" />
          Properties
        </Button>
      </div>
    </div>
  )
}
