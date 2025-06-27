"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface PublishDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  markdownContent: string
  fileName: string
  filePath: string
}

export function PublishDialog({ isOpen, onOpenChange, markdownContent, fileName, filePath }: PublishDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [branch, setBranch] = useState(`update-docs-${Date.now()}`)
  const [commitMessage, setCommitMessage] = useState(`docs: update ${fileName}`)
  const [createPR, setCreatePR] = useState(true)
  const [prTitle, setPrTitle] = useState(`Update documentation: ${fileName}`)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/publish-bitbucket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repository: "gcp-docs/gcp-docs", // This should be dynamic in a real app
          branch,
          path: filePath,
          filename: fileName,
          content: markdownContent,
          commitMessage,
          createPR,
          prTitle,
          prDescription: `Pull request for changes to ${fileName}`,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to publish to Bitbucket.")
      }

      toast({
        title: "Successfully Published!",
        description: (
          <div>
            <p>Your changes have been committed.</p>
            {result.pullRequest && (
              <a
                href={result.pullRequest.links.html.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Pull Request
              </a>
            )}
          </div>
        ),
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Publishing Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish to Bitbucket</DialogTitle>
          <DialogDescription>Commit your changes to a branch and create a pull request.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="branch">Branch Name</Label>
            <Input id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commit-message">Commit Message</Label>
            <Input id="commit-message" value={commitMessage} onChange={(e) => setCommitMessage(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="create-pr" checked={createPR} onCheckedChange={(checked) => setCreatePR(!!checked)} />
            <Label htmlFor="create-pr">Create a new pull request for these changes</Label>
          </div>
          {createPR && (
            <div className="space-y-2">
              <Label htmlFor="pr-title">Pull Request Title</Label>
              <Input id="pr-title" value={prTitle} onChange={(e) => setPrTitle(e.target.value)} />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
