"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Undo, Redo, Save, GitBranch, FileText, FolderOpen, Clock, User, MessageSquare } from "lucide-react"
import { useEditor } from "./EditorContext"
import { componentsToMarkdown } from "@/lib/markdown-converter"

export function EditorToolbar() {
  const { state, undo, redo, canUndo, canRedo, setFileName, setFilePath } = useEditor()
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [saveLocation, setSaveLocation] = useState("docs/")
  const [commitMessage, setCommitMessage] = useState("")

  const handleSave = () => {
    // Here you would implement the actual save logic
    console.log("Saving to:", saveLocation + state.fileName)
    setIsSaveDialogOpen(false)
  }

  const handlePublish = () => {
    // Here you would implement the actual publish/commit logic
    console.log("Publishing with message:", commitMessage)
    setIsPublishDialogOpen(false)
  }

  const getMarkdownContent = () => {
    return componentsToMarkdown(state.components)
  }

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      {/* Left Section: File Operations */}
      <div className="flex items-center gap-4">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} className="h-8 w-8 p-0">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} className="h-8 w-8 p-0">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* File Name */}
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <Input
            value={state.fileName || "untitled.md"}
            onChange={(e) => setFileName(e.target.value)}
            className="h-8 w-48 text-sm"
            placeholder="Document name"
          />
          <Badge variant="secondary" className="text-xs">
            {state.components.length} components
          </Badge>
        </div>
      </div>

      {/* Center Section: Document Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Last saved: Never</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>Draft</span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-2">
        {/* Save Dialog */}
        <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 bg-transparent">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Save Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="save-location">Repository Location</Label>
                <Select value={saveLocation} onValueChange={setSaveLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docs/">docs/</SelectItem>
                    <SelectItem value="docs/api/">docs/api/</SelectItem>
                    <SelectItem value="docs/guides/">docs/guides/</SelectItem>
                    <SelectItem value="docs/tutorials/">docs/tutorials/</SelectItem>
                    <SelectItem value="docs/reference/">docs/reference/</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file-name">File Name</Label>
                <Input
                  id="file-name"
                  value={state.fileName || "untitled.md"}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="document-name.md"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <FolderOpen className="h-4 w-4 inline mr-1" />
                Full path: {saveLocation}
                {state.fileName || "untitled.md"}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Document</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Publish Dialog */}
        <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8">
              <GitBranch className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Publish to Bitbucket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="commit-message">Commit Message</Label>
                <Input
                  id="commit-message"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Add new documentation page"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <FileText className="h-3 w-3" />
                  <span>
                    File: {saveLocation}
                    {state.fileName || "untitled.md"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>Changes: {state.components.length} components added</span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePublish} disabled={!commitMessage.trim()}>
                  Commit & Push
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
