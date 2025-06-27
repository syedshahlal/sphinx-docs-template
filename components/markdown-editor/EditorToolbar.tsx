"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEditor } from "./EditorContext"
import {
  Undo2,
  Redo2,
  Save,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Monitor,
  Smartphone,
  Tablet,
  Palette,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function EditorToolbar() {
  const { state, undo, redo, updateFileName, setPreviewMode } = useEditor()
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("docs/")
  const [commitMessage, setCommitMessage] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const canUndo = state.history.past.length > 0
  const canRedo = state.history.future.length > 0
  const isDirty = state.isDirty

  const handleSave = async () => {
    // Simulate save operation
    setLastSaved(new Date())
    setSaveDialogOpen(false)
  }

  const handlePublish = async () => {
    // Simulate publish operation
    setPublishDialogOpen(false)
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting document...")
  }

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log("Importing document...")
  }

  const getStatusIcon = () => {
    if (isDirty) {
      return <AlertCircle className="h-4 w-4 text-[#ff8b00]" />
    }
    if (lastSaved) {
      return <CheckCircle className="h-4 w-4 text-[#00875a]" />
    }
    return <Clock className="h-4 w-4 text-[#6b778c]" />
  }

  const getStatusText = () => {
    if (isDirty) return "Unsaved changes"
    if (lastSaved) return `Saved ${lastSaved.toLocaleTimeString()}`
    return "Draft"
  }

  return (
    <div className="bg-white border-b border-[#dfe1e6] px-6 py-2">
      <div className="flex items-center justify-between">
        {/* Left side - File operations */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 mr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              className="h-8 px-2 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7] disabled:opacity-50"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              className="h-8 px-2 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7] disabled:opacity-50"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <FileText className="h-4 w-4 text-[#6b778c]" />
            <Input
              value={state.fileName || "Untitled Page"}
              onChange={(e) => updateFileName(e.target.value)}
              className="h-8 border-none bg-transparent text-[#172b4d] font-medium focus:bg-white focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] min-w-[200px]"
              placeholder="Page title"
            />
          </div>
        </div>

        {/* Center - Status */}
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm text-[#6b778c]">{getStatusText()}</span>
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              isDirty ? "bg-[#fff4e6] text-[#ff8b00] border-[#ffab00]" : "bg-[#e3fcef] text-[#00875a] border-[#00875a]",
            )}
          >
            {state.components.length} components
          </Badge>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#172b4d]">Save Page</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-[#172b4d]">
                    Save Location
                  </Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="docs/">📁 docs/</SelectItem>
                      <SelectItem value="docs/api/">📁 docs/api/</SelectItem>
                      <SelectItem value="docs/guides/">📁 docs/guides/</SelectItem>
                      <SelectItem value="docs/tutorials/">📁 docs/tutorials/</SelectItem>
                      <SelectItem value="docs/reference/">📁 docs/reference/</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSaveDialogOpen(false)}
                    className="border-[#dfe1e6] text-[#6b778c] hover:bg-[#f4f5f7]"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="bg-[#0052cc] hover:bg-[#0747a6] text-white">
                    Save Page
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 px-3 bg-[#0052cc] hover:bg-[#0747a6] text-white">
                <Upload className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#172b4d]">Publish to Bitbucket</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="commit-message" className="text-[#172b4d]">
                    Commit Message
                  </Label>
                  <Textarea
                    id="commit-message"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Describe your changes..."
                    className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
                    rows={3}
                  />
                </div>
                <div className="bg-[#f4f5f7] p-3 rounded border border-[#dfe1e6]">
                  <div className="text-sm text-[#6b778c]">
                    <div className="flex justify-between">
                      <span>Repository:</span>
                      <span className="font-mono">gra-core-docs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Branch:</span>
                      <span className="font-mono">main</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Path:</span>
                      <span className="font-mono">
                        {selectedLocation}
                        {state.fileName || "untitled"}.md
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPublishDialogOpen(false)}
                    className="border-[#dfe1e6] text-[#6b778c] hover:bg-[#f4f5f7]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePublish}
                    disabled={!commitMessage.trim()}
                    className="bg-[#0052cc] hover:bg-[#0747a6] text-white disabled:opacity-50"
                  >
                    Publish Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="h-8 px-2 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]"
          >
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleImport}
            className="h-8 px-2 text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7]"
          >
            <Upload className="h-4 w-4 mr-1.5" />
            Import
          </Button>

          <Separator orientation="vertical" className="h-6" />

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#f4f5f7] rounded-md p-1">
            <Button
              variant={state.previewMode === "edit" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("edit")}
              className="h-7 px-3"
            >
              <Eye className="h-3 w-3 mr-1.5" />
              Edit
            </Button>
            <Button
              variant={state.previewMode === "preview" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewMode("preview")}
              className="h-7 px-3"
            >
              <Eye className="h-3 w-3 mr-1.5" />
              Preview
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Viewport Size Controls */}
          <div className="flex items-center gap-1 bg-[#f4f5f7] rounded-md p-1">
            <Button
              variant={viewportSize === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("desktop")}
              className="h-7 px-2"
              title="Desktop View"
            >
              <Monitor className="h-3 w-3" />
            </Button>
            <Button
              variant={viewportSize === "tablet" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("tablet")}
              className="h-7 px-2"
              title="Tablet View"
            >
              <Tablet className="h-3 w-3" />
            </Button>
            <Button
              variant={viewportSize === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewportSize("mobile")}
              className="h-7 px-2"
              title="Mobile View"
            >
              <Smartphone className="h-3 w-3" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="ghost" size="sm">
            <Palette className="h-4 w-4 mr-1.5" />
            Theme
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-1.5" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
