"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Save,
  FileText,
  Download,
  Undo,
  Redo,
  Settings,
  Share,
  Plus,
  FolderOpen,
  ChevronDown,
  Smartphone,
  Tablet,
  Monitor,
  Grid,
  Layers,
  FileCode,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEditor } from "./EditorContext"

interface EditorToolbarProps {
  onToggleFileManager?: () => void
}

export function EditorToolbar({ onToggleFileManager }: EditorToolbarProps) {
  const { state, dispatch } = useEditor()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

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
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handleNewFile} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New
        </Button>

        <Button variant="ghost" size="sm" onClick={onToggleFileManager} className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          Files
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={cn(
            "flex items-center gap-2 transition-all duration-200",
            saveStatus === "saved" && "text-green-600",
            state.isDirty && "text-orange-600",
          )}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {saveStatus === "saved" ? "Saved" : state.isDirty ? "Save*" : "Save"}
            </>
          )}
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Export Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleExport("markdown")}>
              <FileText className="w-4 h-4 mr-2" />
              Export as Markdown
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("html")}>
              <Globe className="w-4 h-4 mr-2" />
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("json")}>
              <FileCode className="w-4 h-4 mr-2" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Share className="w-4 h-4 mr-2" />
              Share Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center Section - Document Info */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-sm font-medium text-foreground">{state.fileName || "Untitled Document"}</div>
          <div className="text-xs text-muted-foreground">
            {state.components.length} component{state.components.length !== 1 ? "s" : ""}
          </div>
        </div>

        {state.isDirty && (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            Unsaved
          </Badge>
        )}
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

        {/* Layout Mode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Grid className="w-4 h-4" />
              Layout
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => dispatch({ type: "SET_LAYOUT_MODE", payload: { mode: "freeform" } })}>
              <Layers className="w-4 h-4 mr-2" />
              Freeform
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch({ type: "SET_LAYOUT_MODE", payload: { mode: "grid" } })}>
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => dispatch({ type: "SET_LAYOUT_MODE", payload: { mode: "flex" } })}>
              <Layers className="w-4 h-4 mr-2" />
              Flex
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
