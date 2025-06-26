"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TiptapEditor } from "./tiptap-editor"
import type { Editor } from "@tiptap/react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Loader2, AlertTriangle } from "lucide-react"
import { publishToGitHub, getBranches } from "@/lib/github"
import { useToast } from "@/components/ui/use-toast"
import { Combobox } from "@/components/ui/combobox" // Assuming you have a combobox for branch creation

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
}

export function CreateDocDialog({ isOpen, onClose, githubConfig }: CreateDocDialogProps) {
  const [editor, setEditor] = useState<Editor | null>(null)
  const [filePath, setFilePath] = useState("docs/getting-started.md")
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
          setBranches(fetchedBranches.map((branch) => ({ name: branch.name })))
          // Ensure defaultBranch is an option if it exists, or add it
          if (!fetchedBranches.some((b) => b.name === githubConfig.defaultBranch)) {
            setBranches((prev) => [{ name: githubConfig.defaultBranch }, ...prev])
          }
          setSelectedBranch(githubConfig.defaultBranch)
        })
        .catch((err) => {
          console.error("Failed to fetch branches:", err)
          toast({
            variant: "destructive",
            title: "Error fetching branches",
            description: err.message,
          })
          // Provide default branches if fetch fails
          setBranches([{ name: githubConfig.defaultBranch }, { name: "docs/new-feature" }])
        })
        .finally(() => setIsLoadingBranches(false))
    }
  }, [isOpen, githubConfig, GITHUB_TOKEN, toast])

  const handlePublish = async () => {
    if (!editor || !GITHUB_TOKEN) {
      setPublishError("Editor not initialized or GitHub token missing.")
      return
    }
    const markdown = editor.storage.markdown.getMarkdown()
    if (!markdown.trim()) {
      toast({ title: "Content is empty", description: "Please add content before publishing.", variant: "destructive" })
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
          : `Content published to branch: ${selectedBranch}`,
      })
      onClose() // Close dialog on success
    } catch (error: any) {
      console.error("Failed to publish to GitHub:", error)
      setPublishError(error.message || "An unknown error occurred during publishing.")
      toast({
        variant: "destructive",
        title: "Publishing Failed",
        description: error.message,
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const branchOptions = branches.map((branch) => ({ value: branch.name, label: branch.name }))
  if (!branchOptions.find((b) => b.value === githubConfig.defaultBranch)) {
    branchOptions.unshift({ value: githubConfig.defaultBranch, label: githubConfig.defaultBranch })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent
            asChild
            className="p-0 border-0 max-w-none w-full h-full flex flex-col"
            style={{ height: "90vh", maxHeight: "90vh" }}
            onOpenAutoFocus={(e) => e.preventDefault()} // Prevents auto-focus on first element
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-lg shadow-2xl flex flex-col h-full"
            >
              <div className="flex-1 overflow-y-auto p-2 md:p-4">
                <TiptapEditor onEditorChange={setEditor} />
              </div>

              <div className="border-t p-4 bg-muted/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label htmlFor="filePath" className="text-sm font-medium mb-1 block">
                      File Path
                    </label>
                    <Input
                      id="filePath"
                      value={filePath}
                      onChange={(e) => setFilePath(e.target.value)}
                      placeholder="e.g., docs/new-feature.md"
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label htmlFor="branch" className="text-sm font-medium mb-1 block">
                      Branch
                    </label>
                    <Combobox
                      options={branchOptions}
                      value={selectedBranch}
                      onChange={setSelectedBranch}
                      placeholder="Select or create branch..."
                      loading={isLoadingBranches}
                      className="bg-background"
                    />
                  </div>
                  <Button
                    onClick={handlePublish}
                    disabled={isPublishing || !GITHUB_TOKEN}
                    className="w-full md:w-auto md:self-end"
                  >
                    {isPublishing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Publish to GitHub
                  </Button>
                </div>
                {!GITHUB_TOKEN && (
                  <p className="mt-2 text-sm text-destructive flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    NEXT_PUBLIC_GITHUB_TOKEN is not set. Publishing is disabled.
                  </p>
                )}
                {publishError && <p className="mt-2 text-sm text-destructive">Error: {publishError}</p>}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
