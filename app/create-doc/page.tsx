"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateDocDialog } from "@/components/create-doc/create-doc-dialog"
import { BadgePlus } from "lucide-react"

// Configuration for GitHub - replace with your actual repo details
const GITHUB_OWNER = "your-github-username" // Or your organization
const GITHUB_REPO = "your-repo-name"
const DEFAULT_BRANCH = "main" // Or your repo's default branch

export default function CreateDocPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">My Docs Site</h1>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            <BadgePlus className="mr-2 h-4 w-4" />
            Create Doc
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <p className="text-muted-foreground">Click the "Create Doc" button to start drafting new documentation.</p>
      </main>

      <CreateDocDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        githubConfig={{ owner: GITHUB_OWNER, repo: GITHUB_REPO, defaultBranch: DEFAULT_BRANCH }}
      />
    </div>
  )
}
