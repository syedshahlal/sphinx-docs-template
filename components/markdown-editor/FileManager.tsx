"use client"

import { useState } from "react"
import { useEditor } from "./EditorContext"
import { Button } from "@/components/core/ui/button"
import { Input } from "@/components/core/ui/input"
import { X, Search, FileText, Folder, Plus, MoreVertical } from "lucide-react"

interface FileManagerProps {
  onClose: () => void
}

// Mock file structure - in a real app, this would come from an API
const mockFiles = [
  { id: "1", name: "introduction.md", path: "content/docs/", type: "file", modified: "2024-01-15" },
  { id: "2", name: "api-reference.md", path: "content/docs/", type: "file", modified: "2024-01-14" },
  { id: "3", name: "user-guide", path: "content/docs/", type: "folder", modified: "2024-01-13" },
  { id: "4", name: "getting-started.md", path: "content/docs/user-guide/", type: "file", modified: "2024-01-12" },
  { id: "5", name: "advanced-features.md", path: "content/docs/user-guide/", type: "file", modified: "2024-01-11" },
]

export function FileManager({ onClose }: FileManagerProps) {
  const { loadFile, newFile } = useEditor()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPath, setSelectedPath] = useState("content/docs/")

  const filteredFiles = mockFiles.filter(
    (file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()) && file.path.startsWith(selectedPath),
  )

  const handleFileSelect = (file: any) => {
    if (file.type === "file") {
      // In a real app, you would fetch the file content
      loadFile("# Sample Content\n\nThis is sample content.", file.name, file.path)
      onClose()
    } else {
      setSelectedPath(file.path + file.name + "/")
    }
  }

  const handleNewFile = () => {
    newFile()
    onClose()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold">File Manager</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Current Path */}
      <div className="px-4 py-2 bg-muted text-sm">
        <span className="text-muted-foreground">Path: </span>
        <span className="font-mono">{selectedPath}</span>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-border">
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleNewFile}>
            <Plus className="w-4 h-4 mr-2" />
            New File
          </Button>
          <Button variant="outline" size="sm">
            <Folder className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {selectedPath !== "content/docs/" && (
          <div
            onClick={() => setSelectedPath(selectedPath.split("/").slice(0, -2).join("/") + "/")}
            className="flex items-center space-x-3 p-3 hover:bg-accent cursor-pointer border-b border-border"
          >
            <Folder className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">.. (Parent Directory)</span>
          </div>
        )}

        {filteredFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => handleFileSelect(file)}
            className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer border-b border-border group"
          >
            <div className="flex items-center space-x-3">
              {file.type === "folder" ? (
                <Folder className="w-4 h-4 text-blue-500" />
              ) : (
                <FileText className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">Modified {file.modified}</p>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No files found</p>
            <p className="text-sm">Try adjusting your search or create a new file</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        {filteredFiles.length} items in {selectedPath}
      </div>
    </div>
  )
}
