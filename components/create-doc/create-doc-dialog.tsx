"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TiptapEditor } from "./tiptap-editor"
import type { Editor } from "@tiptap/react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Loader2, AlertTriangle, X } from "lucide-react"
import { publishToGitHub, getBranches } from "@/lib/github"
import { useToast } from "@/components/ui/use-toast"
import { Combobox } from "@/components/ui/combobox"

interface CreateDocDialogProps {
  isOpen: boolean
  onClose: () => void
  githubConfig: {
    owner: string
    repo: string
    defaultBranch: string
  }
}

interface Branch {
  name: string
  value: string // for Combobox
  label: string // for Combobox
}

export function CreateDocDialog({ isOpen, onClose, githubConfig }: CreateDocDialogProps) {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [filePath, setFilePath] = useState("docs/new-document.md") // Default to a more generic name
  const [selectedBranch, setSelectedBranch] = useState(githubConfig.defaultBranch)
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoadingBranches, setIsLoadingBranches] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const { toast } = useToast()

  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  useEffect(() => {
    if (isOpen && GITHUB_TOKEN) {
      setIsLoadingBranches(true)
      getBranches({ owner: githubConfig.owner, repo: githubConfig.repo, token: GITHUB_TOKEN })
        .then((fetchedBranches) => {
          const formattedBranches = fetchedBranches.map((branch) => ({
            name: branch.name,
            value: branch.name,
            label: branch.name,
          }))
          setBranches(formattedBranches)
          if (!fetchedBranches.some((b) => b.name === githubConfig.defaultBranch)) {
            setBranches((prev) => [
              {
                name: githubConfig.defaultBranch,
                value: githubConfig.defaultBranch,
                label: githubConfig.defaultBranch,
              },
              ...prev,
            ])
          }
          setSelectedBranch(githubConfig.defaultBranch)
        })
        .catch((err) => {
          console.error("Failed to fetch branches:", err)
          toast({
            variant: "destructive",
            title: "Error fetching branches",
            description: err.message || "Could not retrieve branch list from GitHub.",
          })
          setBranches([
            { name: githubConfig.defaultBranch, value: githubConfig.defaultBranch, label: githubConfig.defaultBranch },
            { name: "docs/new-feature", value: "docs/new-feature", label: "docs/new-feature" },
          ])
        })
        .finally(() => setIsLoadingBranches(false))
    } else if (isOpen && !GITHUB_TOKEN) {
      setBranches([
        { name: githubConfig.defaultBranch, value: githubConfig.defaultBranch, label: githubConfig.defaultBranch },
        { name: "docs/new-feature", value: "docs/new-feature", label: "docs/new-feature" },
      ])
    }
  }, [isOpen, githubConfig, GITHUB_TOKEN, toast])

  const handlePublish = async () => {
    if (!editor) {
      toast({
        title: "Editor not ready",
        description: "The document editor is not initialized.",
        variant: "destructive",
      })
      return
    }
    if (!GITHUB_TOKEN) {
      toast({
        title: "GitHub Token Missing",
        description: "NEXT_PUBLIC_GITHUB_TOKEN is not set. Publishing is disabled.",
        variant: "destructive",
      })
      setPublishError("GitHub token is missing. Cannot publish.")
      return
    }

    const markdown = editor.storage.markdown.getMarkdown()
    if (!markdown.trim()) {
      toast({ title: "Content is empty", description: "Please add content before publishing.", variant: "destructive" })
      return
    }
    if (!filePath.trim() || !filePath.endsWith(".md")) {
      toast({
        title: "Invalid File Path",
        description: "Please provide a valid Markdown file path (e.g., docs/topic/file.md).",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
    setPublishError(null)

    try {
      const result = await publishToGitHub({
        owner: githubConfig.owner,
        repo: githubConfig.repo,
        branch: selectedBranch,
        filepath: filePath,
        markdownContent: markdown,
        token: GITHUB_TOKEN,
        defaultBranch: githubConfig.defaultBranch,
        commitMessage: `docs: add/update ${filePath}`,
      })

      toast({
        title: "Successfully published to GitHub!",
        description: result.prUrl
          ? `Pull request created: ${result.prUrl}`
          : `Content published to branch: ${selectedBranch}. Path: ${filePath}`,
      })
      onClose()
    } catch (error: any) {
      console.error("Failed to publish to GitHub:", error)
      const errorMessage = error.message || "An unknown error occurred during publishing."
      setPublishError(errorMessage)
      toast({
        variant: "destructive",
        title: "Publishing Failed",
        description: errorMessage,
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const branchOptions =
    branches.length > 0
      ? branches
      : [{ name: githubConfig.defaultBranch, value: githubConfig.defaultBranch, label: githubConfig.defaultBranch }]

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent
            className="p-0 border-0 max-w-4xl w-[90vw] h-[90vh] flex flex-col bg-card shadow-2xl rounded-lg"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="text-lg font-semibold">Create New Document</DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="absolute right-4 top-3">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-1 md:p-2 bg-background">
                <TiptapEditor onEditorChange={setEditor} />
              </div>

              <DialogFooter className="p-4 border-t bg-muted/30 space-y-4 md:space-y-0 md:flex md:justify-between md:items-end">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 flex-grow mr-4">
                  <div>
                    <Label htmlFor="filePath" className="text-xs font-medium text-muted-foreground mb-1 block">
                      File Path (e.g., docs/topic/file.md)
                    </Label>
                    <Input
                      id="filePath"
                      value={filePath}
                      onChange={(e) => setFilePath(e.target.value)}
                      placeholder="docs/my-new-feature.md"
                      className="bg-background border-border h-9"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branch" className="text-xs font-medium text-muted-foreground mb-1 block">
                      Target Branch
                    </Label>
                    <Combobox
                      options={branchOptions}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                      placeholder="Select or create branch..."
                      loading={isLoadingBranches}
                      className="bg-background border-border [&>button]:h-9"
                      inputClassName="h-9"
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePublish}
                  disabled={isPublishing || !GITHUB_TOKEN}
                  className="w-full md:w-auto h-9"
                  size="sm"
                >
                  {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Publish
                </Button>
              </DialogFooter>
              {(!GITHUB_TOKEN || publishError) && (
                <div className="px-4 pb-2 text-xs">
                  {!GITHUB_TOKEN && (
                    <p className="text-destructive flex items-center">
                      <AlertTriangle className="mr-1 h-3 w-3 flex-shrink-0" />
                      NEXT_PUBLIC_GITHUB_TOKEN is not set. Publishing is disabled.
                    </p>
                  )}
                  {publishError && <p className="text-destructive mt-1">Error: {publishError}</p>}
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
