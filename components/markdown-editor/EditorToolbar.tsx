"use client"
import { useContext } from "react"
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
  Undo,
  Redo,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Image,
  Code,
  Palette,
  Zap,
  FileText,
  Lock,
  Trash2,
} from "lucide-react"
import { EditorContext } from "./EditorContext"
import { cn } from "@/lib/utils"

export function EditorToolbar() {
  const { state, dispatch } = useContext(EditorContext)

  const selectedComponent = state.selectedComponent
    ? state.components.find((comp) => comp.id === state.selectedComponent)
    : null

  const canUndo = state.history.past.length > 0
  const canRedo = state.history.future.length > 0

  const handleSave = () => {
    // Implement save functionality
    console.log("Saving document...")
    dispatch({ type: "SET_DIRTY", payload: { isDirty: false } })
  }

  const handleExport = (format: string) => {
    // Implement export functionality
    console.log(`Exporting as ${format}...`)
  }

  const handleImport = () => {
    // Implement import functionality
    console.log("Importing document...")
  }

  const handleDeleteSelected = () => {
    if (selectedComponent) {
      dispatch({ type: "DELETE_COMPONENT", payload: { id: selectedComponent.id } })
    }
  }

  const handleDuplicateSelected = () => {
    if (selectedComponent) {
      dispatch({ type: "DUPLICATE_COMPONENT", payload: { id: selectedComponent.id } })
    }
  }

  const handleCopySelected = () => {
    if (selectedComponent) {
      dispatch({ type: "COPY_COMPONENT", payload: { id: selectedComponent.id } })
    }
  }

  const handlePaste = () => {
    if (state.clipboard) {
      dispatch({ type: "PASTE_COMPONENT", payload: {} })
    }
  }

  const handleToggleLock = () => {
    if (selectedComponent) {
      dispatch({
        type: "LOCK_COMPONENT",
        payload: { id: selectedComponent.id, locked: !selectedComponent.locked },
      })
    }
  }

  const handleToggleVisibility = () => {
    if (selectedComponent) {
      dispatch({
        type: "HIDE_COMPONENT",
        payload: { id: selectedComponent.id, hidden: !selectedComponent.hidden },
      })
    }
  }

  return (
    <div className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section - File Operations */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className={cn("flex items-center gap-2", state.isDirty && "border-orange-300 bg-orange-50")}
          >
            <Save className="w-4 h-4" />
            Save
            {state.isDirty && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={!canUndo}
            className="flex items-center gap-2"
          >
            <Undo className="w-4 h-4" />
            Undo
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: "REDO" })}
            disabled={!canRedo}
            className="flex items-center gap-2"
          >
            <Redo className="w-4 h-4" />
            Redo
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleExport("markdown")}>
                <FileText className="w-4 h-4 mr-2" />
                Markdown (.md)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("html")}>
                <Code className="w-4 h-4 mr-2" />
                HTML (.html)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                <FileText className="w-4 h-4 mr-2" />
                PDF (.pdf)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleExport("json")}>
                <Code className="w-4 h-4 mr-2" />
                JSON (.json)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={handleImport} className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
        </div>

        {/* Center Section - Component Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Components:</span>
            <Badge variant="secondary">{state.components.length}</Badge>
          </div>

          {selectedComponent && (
            <>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Selected:</span>
                <Badge variant="outline" className="capitalize">
                  {selectedComponent.type}
                </Badge>
                {selectedComponent.locked && <Lock className="w-4 h-4 text-gray-500" />}
                {selectedComponent.hidden && <EyeOff className="w-4 h-4 text-gray-500" />}
              </div>
            </>
          )}
        </div>

        {/* Right Section - Component Actions */}
        <div className="flex items-center gap-2">
          {selectedComponent && (
            <>
              <Button variant="ghost" size="sm" onClick={handleCopySelected} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePaste}
                disabled={!state.clipboard}
                className="flex items-center gap-2"
              >
                <Image className="w-4 h-4" />
                Paste
              </Button>

              <Button variant="ghost" size="sm" onClick={handleDuplicateSelected} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Duplicate
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleLock}
                className={cn("flex items-center gap-2", selectedComponent.locked && "bg-gray-100")}
              >
                {selectedComponent.locked ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {selectedComponent.locked ? "Unlock" : "Lock"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleVisibility}
                className={cn("flex items-center gap-2", selectedComponent.hidden && "bg-gray-100")}
              >
                {selectedComponent.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {selectedComponent.hidden ? "Show" : "Hide"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>

              <Separator orientation="vertical" className="h-6" />
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Palette className="w-4 h-4 mr-2" />
                Canvas Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Zap className="w-4 h-4 mr-2" />
                Global Styles
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
