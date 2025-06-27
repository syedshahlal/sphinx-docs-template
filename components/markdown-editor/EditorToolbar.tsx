"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Undo, Redo, Save, GitBranch, FileText, FolderOpen, Clock, User, MessageSquare } from "lucide-react"
import { useEditor } from "./EditorContext"
import { toast } from "@/components/ui/use-toast"

export function EditorToolbar() {
  const { state, undo, redo, canUndo, canRedo, setFileName } = useEditor()
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false)
  const [saveLocation, setSaveLocation] = useState("docs/")
  const [commitMessage, setCommitMessage] = useState("")

  const handleSave = () => {
    toast({
      title: "Document Saved",
      description: `Your document has been saved to ${saveLocation}${state.fileName}`,
    })
    setIsSaveDialogOpen(false)
  }

  const handlePublish = async () => {
    toast({
      title: "Publishing Document...",
      description: "Committing changes to Bitbucket.",
    })

    // In a real app, you would make an API call here.
    // Example:
    // const response = await fetch('/api/publish-bitbucket', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     filePath: `${saveLocation}${state.fileName}`,
    //     content: componentsToMarkdown(state.components),
    //     commitMessage: commitMessage,
    //   }),
    // });
    // if (response.ok) {
    //   toast({ title: "Success", description: "Document published to Bitbucket." });
    // } else {
    //   toast({ title: "Error", description: "Failed to publish document.", variant: "destructive" });
    // }

    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Document published to Bitbucket.",
      })
      setIsPublishDialogOpen(false)
      setCommitMessage("")
    }, 1500)
  }

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={undo} disabled={!canUndo} className="h-8 w-8" aria-label="Undo">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo} disabled={!canRedo} className="h-8 w-8" aria-label="Redo">
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <Input
            value={state.fileName || "untitled.md"}
            onChange={(e) => setFileName(e.target.value)}
            className="h-8 w-48 text-sm font-medium"
            placeholder="Document name"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          <span>Last saved: 5 min ago</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          <span>Draft</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
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
              <DialogDescription>Choose a location in the repository to save your file.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="save-location">Repository Location</Label>
                <Select value={saveLocation} onValueChange={setSaveLocation}>
                  <SelectTrigger id="save-location">
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
              <div className="text-sm text-muted-foreground flex items-center gap-2 rounded-md bg-muted p-2">
                <FolderOpen className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  Full path: {saveLocation}
                  {state.fileName || "untitled.md"}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
              <DialogDescription>Commit and push your changes to the repository.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="commit-message">Commit Message</Label>
                <Input
                  id="commit-message"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="feat: Add new documentation page"
                />
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>
                    File: {saveLocation}
                    {state.fileName || "untitled.md"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{state.components.length} components will be committed.</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePublish} disabled={!commitMessage.trim()}>
                Commit & Push
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
