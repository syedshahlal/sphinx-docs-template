"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Github, FileText, Eye, Settings } from "lucide-react"
import { fetchBranches, publishToGitHub } from "@/lib/github" // Assuming this is correctly set up
import { PreviewPanel } from "../markdown-editor/PreviewPanel" // We'll adapt this
import { useTheme } from "next-themes"

// BlockNote imports
import { BlockNoteView, useBlockNote } from "@blocknote/react"
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import "@blocknote/core/style.css" // Basic BlockNote styling
import "@/styles/blocknote-custom.css" // Your custom styles for BlockNote

interface CreateDocDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onPublishSuccess?: (filePath: string) => void
}

interface GitHubFile {
  name: string
  path: string
  sha: string
  content?: string // Base64 encoded
}

const initialContent: PartialBlock[] = [
  {
    type: "heading",
    content: "Untitled Document",
  },
  {
    type: "paragraph",
    content: "Start writing your amazing documentation here!",
  },
]

export function CreateDocDialog({ isOpen, onOpenChange, onPublishSuccess }: CreateDocDialogProps) {
  const [step, setStep] = useState(1) // 1: Editor, 2: Metadata, 3: Publish
  const [title, setTitle] = useState("New Document")
  const [description, setDescription] = useState("")
  const [filePath, setFilePath] = useState("docs/new-document.md")
  const [commitMessage, setCommitMessage] = useState("docs: create new document")
  const [branches, setBranches] = useState<string[]>([])
  const [selectedBranch, setSelectedBranch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [baseSha, setBaseSha] = useState<string | undefined>(undefined)
  const [markdownContent, setMarkdownContent] = useState<string>("")

  const { theme } = useTheme()

  // BlockNote Editor instance
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: initialContent,
    onEditorContentChange: async (currentEditor) => {
      const md = await currentEditor.blocksToMarkdown(currentEditor.topLevelBlocks)
      setMarkdownContent(md)
      // Try to extract title from H1
      const firstBlock = currentEditor.topLevelBlocks[0]
      if (firstBlock && firstBlock.type === "heading" && firstBlock.props.level === "1") {
        const h1Text = (firstBlock.content as any[]).map((c) => c.text).join("")
        if (h1Text) {
          setTitle(h1Text)
          setFilePath(`docs/${h1Text.toLowerCase().replace(/\s+/g, "-")}.md`)
        }
      }
    },
    // You can add more configurations here, like custom block types, slashMenuItems etc.
    // For example, to add custom slash menu items:
    // slashMenuItems: (editor) => [
    //   ...getDefaultSlashMenuItems(editor),
    //   { name: "Insert Mermaid", keywords: ["mermaid", "diagram"], icon: <Share2/>, execute: () => {/*...*/} }
    // ]
  })

  useEffect(() => {
    if (isOpen && step === 2) {
      // Fetch branches when moving to metadata step
      const loadBranches = async () => {
        setIsLoading(true)
        try {
          const fetchedBranches = await fetchBranches()
          setBranches(fetchedBranches)
          const defaultBranch = process.env.NEXT_PUBLIC_GITHUB_DEFAULT_BRANCH || "main"
          setSelectedBranch(fetchedBranches.includes(defaultBranch) ? defaultBranch : fetchedBranches[0] || "")
        } catch (error) {
          console.error("Failed to fetch branches:", error)
          toast({
            title: "Error",
            description: "Could not fetch branches from GitHub. Please check your token and repository settings.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
      loadBranches()
    }
  }, [isOpen, step])

  const resetForm = useCallback(() => {
    setStep(1)
    setTitle("New Document")
    setDescription("")
    setFilePath("docs/new-document.md")
    setCommitMessage("docs: create new document")
    setBaseSha(undefined)
    setMarkdownContent("")
    editor?.removeBlocks(editor.topLevelBlocks)
    editor?.insertBlocks(initialContent, editor.topLevelBlocks[0]?.id || "root", "before")
  }, [editor])

  const handleClose = (openState: boolean) => {
    if (!openState) {
      resetForm()
    }
    onOpenChange(openState)
  }

  const handlePublish = async () => {
    if (!editor) {
      toast({ title: "Error", description: "Editor not initialized.", variant: "destructive" })
      return
    }
    setIsLoading(true)
    try {
      const finalMarkdown = await editor.blocksToMarkdown(editor.topLevelBlocks)
      const result = await publishToGitHub(filePath, finalMarkdown, commitMessage, selectedBranch, baseSha)
      toast({
        title: "Success!",
        description: `Document published to ${result.commit.html_url}`,
      })
      onPublishSuccess?.(filePath)
      handleClose(false)
    } catch (error: any) {
      console.error("Publishing error:", error)
      toast({
        title: "Publishing Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1: // Editor
        return (
          <div className="min-h-[500px] max-h-[70vh] flex flex-col py-4">
            {editor ? (
              <div className="flex-grow overflow-y-auto rounded-md border dark:border-neutral-700 blocknote-container">
                <BlockNoteView editor={editor} theme={theme === "dark" ? "dark" : "light"} className="flex-grow" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <p className="ml-2">Loading Editor...</p>
              </div>
            )}
          </div>
        )
      case 2: // Metadata & Preview
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[70vh]">
            <div className="space-y-4 overflow-y-auto pr-2">
              <div>
                <Label htmlFor="doc-title">Document Title</Label>
                <Input
                  id="doc-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Document"
                />
              </div>
              <div>
                <Label htmlFor="doc-description">Description (Optional)</Label>
                <Textarea
                  id="doc-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief summary of this document."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="doc-filepath">File Path</Label>
                <Input
                  id="doc-filepath"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="docs/category/filename.md"
                />
                <p className="text-xs text-muted-foreground mt-1">Example: `docs/user-guide/new-feature.md`</p>
              </div>
              <div>
                <Label htmlFor="doc-branch">Branch</Label>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div>
                <Label htmlFor="doc-commit">Commit Message</Label>
                <Input id="doc-commit" value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)} />
              </div>
            </div>
            <div className="overflow-y-auto border rounded-md p-1 dark:border-neutral-700">
              <h3 className="text-lg font-semibold p-3 border-b dark:border-neutral-700">Preview</h3>
              {/* Pass markdownContent to PreviewPanel */}
              <PreviewPanel markdown={markdownContent} initialPreviewMode="preview" />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl data-[state=open]:h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            {step === 1 && <FileText className="w-5 h-5 mr-2" />}
            {step === 2 && <Settings className="w-5 h-5 mr-2" />}
            Create New Document
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              "Use the rich text editor to create your content. Format text, add images, tables, and more."}
            {step === 2 && "Review metadata, preview your document, and choose publishing options."}
          </DialogDescription>
        </DialogHeader>

        {renderStepContent()}

        <DialogFooter className="mt-auto pt-4 border-t dark:border-neutral-700">
          {step === 1 && (
            <Button onClick={() => setStep(2)} disabled={!editor || markdownContent.trim().length === 0}>
              Next: Configure & Preview <Eye className="w-4 h-4 ml-2" />
            </Button>
          )}
          {step === 2 && (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to Editor
              </Button>
              <Button onClick={handlePublish} disabled={isLoading || !filePath || !commitMessage || !selectedBranch}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Github className="w-4 h-4 mr-2" />}
                Publish to GitHub
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
