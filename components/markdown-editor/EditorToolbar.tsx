"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { FileText, Github, Download, LayoutGrid, Rows, EyeIcon } from "lucide-react"
import { useEditor } from "./EditorContext"
import { generateMarkdown, generateHtml } from "./PreviewPanel" // Assuming these are exportable
import { publishToGitHub } from "@/lib/github" // Assuming your GitHub lib path
import { useState } from "react"

// GitHub Config – read from NEXT_PUBLIC_-prefixed env vars so they’re set
const GITHUB_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER ?? ""
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO ?? ""
const DEFAULT_BRANCH = process.env.NEXT_PUBLIC_GITHUB_DEFAULT_BRANCH ?? "main"
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ""

interface EditorToolbarProps {
  onToggleFileManager: () => void
}

export function EditorToolbar({ onToggleFileManager }: EditorToolbarProps) {
  const { state, setFileDetails, setLayoutMode } = useEditor()
  const { toast } = useToast()
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishPopoverOpen, setPublishPopoverOpen] = useState(false)

  const handleSave = async () => {
    setIsPublishing(true)

    // --- NEW GUARD --------------------------------------------------
    if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
      toast({
        title: "GitHub not configured",
        description:
          "Set NEXT_PUBLIC_GITHUB_OWNER, NEXT_PUBLIC_GITHUB_REPO, " +
          "and NEXT_PUBLIC_GITHUB_TOKEN in your environment variables.",
        variant: "destructive",
      })
      setIsPublishing(false)
      return
    }
    // ---------------------------------------------------------------

    try {
      const markdownContent = generateMarkdown(state.components) // Use the actual generation logic

      // Basic validation
      if (!state.filePath || !state.fileName) {
        toast({ title: "Error", description: "File path and name are required.", variant: "destructive" })
        setIsPublishing(false)
        return
      }
      if (!state.fileVersion) {
        toast({ title: "Error", description: "Document version is required.", variant: "destructive" })
        setIsPublishing(false)
        return
      }

      // Construct full path with version if needed (example logic)
      // This logic might need to be more sophisticated based on your versioning strategy
      const pathParts = state.filePath.split("/")
      const fileNameWithExt = state.fileName.endsWith(".md") ? state.fileName : `${state.fileName}.md`

      let finalPath = ""
      if (pathParts.length > 1) {
        // Assuming path is like 'docs/section/filename.md' and version goes before filename or section
        // Example: 'docs/v1.0.0/section/filename.md'
        // This is a simple example, adjust to your needs
        const baseDir = pathParts.slice(0, pathParts.length - 1).join("/") // e.g. docs/section
        finalPath = `${baseDir}/v${state.fileVersion}/${fileNameWithExt}`
      } else {
        finalPath = `docs/v${state.fileVersion}/${fileNameWithExt}` // Default to docs/vX.X.X/filename.md
      }

      const result = await publishToGitHub({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        branch: `docs/${state.fileName.replace(".md", "")}-${state.fileVersion}`, // Create a feature branch
        filepath: finalPath,
        markdownContent,
        token: GITHUB_TOKEN,
        defaultBranch: DEFAULT_BRANCH,
        commitMessage: `docs: update ${state.fileName} (v${state.fileVersion})`,
      })

      toast({
        title: "Published to GitHub!",
        description: result.prUrl
          ? `PR created: ${result.prUrl}`
          : `Changes pushed to ${result.branch}. ${result.message || ""}`,
        action: result.prUrl ? (
          <a href={result.prUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              View PR
            </Button>
          </a>
        ) : undefined,
      })
      setPublishPopoverOpen(false)
    } catch (error: any) {
      console.error("Failed to publish:", error)
      toast({
        title: "Publishing Failed",
        description: error.message || "Could not save to GitHub.",
        variant: "destructive",
      })
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDownload = (format: "md" | "html") => {
    const content = format === "md" ? generateMarkdown(state.components) : generateHtml(state.components)
    const filename = `${state.fileName || "document"}.${format}`
    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/html" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    toast({ title: "Download Started", description: `${filename} is downloading.` })
  }

  return (
    <div className="p-2 border-b border-border bg-card flex items-center justify-between space-x-2 h-14">
      <div className="flex items-center space-x-2">
        {/* Placeholder for a logo or app name */}
        <Button variant="ghost" size="icon" onClick={onToggleFileManager} title="Open File Manager (placeholder)">
          <FileText className="w-5 h-5" />
        </Button>
        <div className="w-px h-6 bg-border mx-1"></div>
        <Input
          type="text"
          placeholder="File Name (e.g., feature-overview.md)"
          value={state.fileName}
          onChange={(e) => setFileDetails({ fileName: e.target.value })}
          className="h-9 text-sm w-48"
        />
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant={state.layoutMode === "default" ? "secondary" : "ghost"}
          size="sm_icon"
          onClick={() => setLayoutMode("default")}
          title="Default Layout"
        >
          <LayoutGrid className="w-4 h-4" />
        </Button>
        <Button
          variant={state.layoutMode === "focus-canvas" ? "secondary" : "ghost"}
          size="sm_icon"
          onClick={() => setLayoutMode("focus-canvas")}
          title="Focus Canvas"
        >
          <Rows className="w-4 h-4" />
        </Button>
        <Button
          variant={state.layoutMode === "focus-preview" ? "secondary" : "ghost"}
          size="sm_icon"
          onClick={() => setLayoutMode("focus-preview")}
          title="Focus Preview"
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => handleDownload("md")} title="Download Markdown">
          <Download className="w-4 h-4 mr-1.5" /> MD
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDownload("html")} title="Download HTML">
          <Download className="w-4 h-4 mr-1.5" /> HTML
        </Button>

        <Popover open={publishPopoverOpen} onOpenChange={setPublishPopoverOpen}>
          <PopoverTrigger asChild>
            <Button size="sm" disabled={isPublishing}>
              <Github className="w-4 h-4 mr-1.5" />
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Publish to GitHub</h4>
              <p className="text-sm text-muted-foreground">
                This will commit changes to a new branch and open a Pull Request.
              </p>
              <div>
                <Label htmlFor="file-path" className="text-xs">
                  File Path in Repo
                </Label>
                <Input
                  id="file-path"
                  placeholder="e.g., docs/section/filename.md"
                  value={state.filePath}
                  onChange={(e) => setFileDetails({ filePath: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label htmlFor="file-version" className="text-xs">
                  Document Version
                </Label>
                <Input
                  id="file-version"
                  placeholder="e.g., 1.0.0"
                  value={state.fileVersion}
                  onChange={(e) => setFileDetails({ fileVersion: e.target.value })}
                  className="h-9 text-sm"
                />
              </div>
              <Button onClick={handleSave} className="w-full" disabled={isPublishing}>
                {isPublishing ? "Processing..." : "Confirm & Publish"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
