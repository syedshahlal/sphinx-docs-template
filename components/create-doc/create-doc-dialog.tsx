"use client"

/* 1. --------------  IMPORTS -------------- */
import { useEffect, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Combobox } from "@/components/ui/combobox"
import { TiptapEditor } from "./tiptap-editor"
import type { Editor } from "@tiptap/react"
import { Loader2, Save, X } from "lucide-react"
import { publishDoc } from "@/lib/server/github-actions" // <- server action
import { useToast } from "@/components/ui/use-toast"

/* 2. --------------  TYPES -------------- */
interface BranchOption {
  value: string
  label: string
}
interface CreateDocDialogProps {
  isOpen: boolean
  onClose: () => void
  githubConfig: {
    owner: string
    repo: string
    defaultBranch: string
  }
}

/* 3. --------------  COMPONENT -------------- */
export function CreateDocDialog({ isOpen, onClose, githubConfig }: CreateDocDialogProps) {
  /* editor / UI state */
  const [editor, setEditor] = useState<Editor | null>(null)
  const [filePath, setFilePath] = useState("docs/new-document.md")
  const [selectedBranch, setSelectedBranch] = useState(githubConfig.defaultBranch)
  const [branches, setBranches] = useState<BranchOption[]>([])
  const [isLoadingBranches, setIsLoadingBranches] = useState(false)
  const [isPublishing, startPublish] = useTransition()
  const { toast } = useToast()

  /* 4. --------------  FETCH BRANCHES (SERVER ROUTE) -------------- */
  useEffect(() => {
    if (!isOpen) return
    async function fetchBranches() {
      setIsLoadingBranches(true)
      try {
        const res = await fetch(`/api/github/branches?owner=${githubConfig.owner}&repo=${githubConfig.repo}`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data: string[] = await res.json()
        setBranches(data.map((name) => ({ value: name, label: name })))
        setSelectedBranch(
          data.includes(githubConfig.defaultBranch)
            ? githubConfig.defaultBranch
            : (data[0] ?? githubConfig.defaultBranch),
        )
      } catch (err) {
        toast({ variant: "destructive", title: "Error fetching branches", description: String(err) })
        setBranches([{ value: githubConfig.defaultBranch, label: githubConfig.defaultBranch }])
      } finally {
        setIsLoadingBranches(false)
      }
    }
    fetchBranches()
  }, [isOpen, githubConfig, toast])

  /* 5. --------------  PUBLISH HANDLER (SERVER ACTION) -------------- */
  const handlePublish = () => {
    if (!editor) {
      toast({ variant: "destructive", title: "Editor not ready" })
      return
    }
    const markdown = editor.storage.markdown.getMarkdown()
    if (!markdown.trim()) {
      toast({ variant: "destructive", title: "Content is empty" })
      return
    }
    if (!filePath.endsWith(".md")) {
      toast({ variant: "destructive", title: "Invalid file path" })
      return
    }

    startPublish(async () => {
      try {
        const result = await publishDoc({
          owner: githubConfig.owner,
          repo: githubConfig.repo,
          branch: selectedBranch,
          filepath: filePath,
          markdown,
          defaultBranch: githubConfig.defaultBranch,
        })
        toast({ title: "Published!", description: result.message })
        onClose()
      } catch (err) {
        toast({ variant: "destructive", title: "Publishing failed", description: String(err) })
      }
    })
  }

  /* 6. --------------  RENDER -------------- */
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 border-0 max-w-4xl w-[90vw] h-[90vh] flex flex-col bg-card shadow-2xl rounded-lg">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg font-semibold">Create New Document</DialogTitle>
          <DialogClose asChild>
            <Button size="icon" variant="ghost" className="absolute right-4 top-3">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-1 md:p-2 bg-background">
          <TiptapEditor onEditorChange={setEditor} />
        </div>

        <DialogFooter className="p-4 border-t bg-muted/30 space-y-4 md:space-y-0 md:flex md:justify-between">
          <div className="grid sm:grid-cols-2 gap-4 flex-grow mr-4">
            <div>
              <Label htmlFor="filePath" className="text-xs font-medium text-muted-foreground mb-1 block">
                File Path
              </Label>
              <Input id="filePath" value={filePath} onChange={(e) => setFilePath(e.target.value)} className="h-9" />
            </div>
            <div>
              <Label htmlFor="branch" className="text-xs font-medium text-muted-foreground mb-1 block">
                Target Branch
              </Label>
              <Combobox
                options={branches}
                value={selectedBranch}
                onChange={setSelectedBranch}
                placeholder="Select branch..."
                loading={isLoadingBranches}
                className="h-9"
              />
            </div>
          </div>
          <Button onClick={handlePublish} disabled={isPublishing} className="h-9">
            {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Publish
          </Button>
        </DialogFooter>
        {/* No token messages needed; token never reaches the client */}
      </DialogContent>
    </Dialog>
  )
}
