"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Download,
  Upload,
  Share2,
  Settings,
  Undo,
  Redo,
  Eye,
  GitBranch,
  FileText,
  MoreHorizontal,
  Zap,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react"
import { useEditor } from "./EditorContext"

interface EditorToolbarProps {
  onToggleFileManager?: () => void
}

export function EditorToolbar({ onToggleFileManager }: EditorToolbarProps) {
  const { state, dispatch } = useEditor()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [publishSettings, setPublishSettings] = useState({
    repository: "",
    branch: "main",
    path: "docs/",
    filename: "document.md",
    commitMessage: "Update documentation",
    createPR: true,
    prTitle: "Documentation Update",
    prDescription: "Automated documentation update from markdown editor",
  })

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  const handleExport = (format: "markdown" | "html" | "json") => {
    // Export logic would go here
    console.log(`Exporting as ${format}`)
  }

  const handleImport = () => {
    // Import logic here
    console.log("Importing document...")
  }

  const handlePublish = async () => {
    try {
      // Generate markdown content
      const markdownContent = generateMarkdownFromComponents(state.components)

      // Publish to Bitbucket
      await publishToBitbucket({
        ...publishSettings,
        content: markdownContent,
      })

      setIsPublishDialogOpen(false)
    } catch (error) {
      console.error("Failed to publish:", error)
    }
  }

  const generateMarkdownFromComponents = (components: any[]) => {
    // Convert components to markdown
    let markdown = ""
    components.forEach((component) => {
      // Add component conversion logic here
      switch (component.type) {
        case "heading":
          markdown += `${"#".repeat(component.content.level || 2)} ${component.content.text || "Heading"}\n\n`
          break
        case "paragraph":
          markdown += `${component.content.text || "Paragraph text"}\n\n`
          break
        // Add more component types...
        default:
          markdown += `<!-- ${component.type} component -->\n\n`
      }
    })
    return markdown
  }

  const publishToBitbucket = async (settings: any) => {
    // Bitbucket API integration
    const response = await fetch("/api/publish-bitbucket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      throw new Error("Failed to publish to Bitbucket")
    }

    return response.json()
  }

  const handleUndo = () => {
    dispatch({ type: "UNDO" })
  }

  const handleRedo = () => {
    dispatch({ type: "REDO" })
  }

  const handleNewFile = () => {
    dispatch({
      type: "LOAD_COMPONENTS",
      payload: { components: [], fileName: "", filePath: "", fileVersion: "" },
    })
  }

  const handlePreviewModeChange = (mode: "edit" | "preview" | "mobile" | "tablet") => {
    dispatch({ type: "SET_PREVIEW_MODE", payload: { mode } })
  }

  const getPreviewIcon = (mode: string) => {
    switch (mode) {
      case "mobile":
        return Smartphone
      case "tablet":
        return Tablet
      default:
        return Monitor
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      {/* Left Section - File Operations */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Markdown Editor</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{state.fileName || "Untitled Document"}</span>
              {state.isDirty && (
                <Badge variant="secondary" className="text-xs">
                  Unsaved
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleUndo} disabled={state.history.past.length === 0}>
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRedo} disabled={state.history.future.length === 0}>
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Center Section - Document Info */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={state.previewMode === "edit" ? "default" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => handlePreviewModeChange("edit")}
          >
            <Monitor className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant={state.previewMode === "preview" ? "default" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => handlePreviewModeChange("preview")}
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
        </div>

        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button variant="ghost" size="sm" className="h-8" onClick={() => handlePreviewModeChange("edit")}>
            <Monitor className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8" onClick={() => handlePreviewModeChange("tablet")}>
            <Tablet className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8" onClick={() => handlePreviewModeChange("mobile")}>
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Right Section - Editor Controls */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUndo}
          disabled={state.history.past.length === 0}
          className="flex items-center gap-2"
        >
          <Undo className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRedo}
          disabled={state.history.future.length === 0}
          className="flex items-center gap-2"
        >
          <Redo className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Preview Mode Controls */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {(["edit", "tablet", "mobile"] as const).map((mode) => {
            const Icon = mode === "edit" ? Monitor : getPreviewIcon(mode)
            return (
              <Button
                key={mode}
                variant={state.previewMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePreviewModeChange(mode)}
                className="h-8 px-3"
              >
                <Icon className="w-4 h-4" />
              </Button>
            )
          })}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Share Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("markdown")}>
              <Download className="w-4 h-4 mr-2" />
              Export Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleImport}>
              <Upload className="w-4 h-4 mr-2" />
              Import File
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsPublishDialogOpen(true)}>
              <GitBranch className="w-4 h-4 mr-2" />
              Publish to Bitbucket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Palette className="w-4 h-4 mr-2" />
              Theme
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Zap className="w-4 h-4 mr-2" />
              Keyboard Shortcuts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Publish Dialog */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Publish to Bitbucket</DialogTitle>
            <DialogDescription>
              Configure the settings to publish your document to a Bitbucket repository.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repository">Repository</Label>
                <Input
                  id="repository"
                  value={publishSettings.repository}
                  onChange={(e) => setPublishSettings((prev) => ({ ...prev, repository: e.target.value }))}
                  placeholder="username/repository-name"
                />
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  value={publishSettings.branch}
                  onChange={(e) => setPublishSettings((prev) => ({ ...prev, branch: e.target.value }))}
                  placeholder="main"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="path">Path</Label>
                <Input
                  id="path"
                  value={publishSettings.path}
                  onChange={(e) => setPublishSettings((prev) => ({ ...prev, path: e.target.value }))}
                  placeholder="docs/"
                />
              </div>
              <div>
                <Label htmlFor="filename">Filename</Label>
                <Input
                  id="filename"
                  value={publishSettings.filename}
                  onChange={(e) => setPublishSettings((prev) => ({ ...prev, filename: e.target.value }))}
                  placeholder="document.md"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="commit-message">Commit Message</Label>
              <Input
                id="commit-message"
                value={publishSettings.commitMessage}
                onChange={(e) => setPublishSettings((prev) => ({ ...prev, commitMessage: e.target.value }))}
                placeholder="Update documentation"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="create-pr"
                checked={publishSettings.createPR}
                onChange={(e) => setPublishSettings((prev) => ({ ...prev, createPR: e.target.checked }))}
              />
              <Label htmlFor="create-pr">Create Pull Request</Label>
            </div>

            {publishSettings.createPR && (
              <>
                <div>
                  <Label htmlFor="pr-title">PR Title</Label>
                  <Input
                    id="pr-title"
                    value={publishSettings.prTitle}
                    onChange={(e) => setPublishSettings((prev) => ({ ...prev, prTitle: e.target.value }))}
                    placeholder="Documentation Update"
                  />
                </div>
                <div>
                  <Label htmlFor="pr-description">PR Description</Label>
                  <Textarea
                    id="pr-description"
                    value={publishSettings.prDescription}
                    onChange={(e) => setPublishSettings((prev) => ({ ...prev, prDescription: e.target.value }))}
                    placeholder="Automated documentation update from markdown editor"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish}>
              <GitBranch className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
