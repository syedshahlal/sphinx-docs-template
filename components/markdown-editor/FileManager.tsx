"use client"

import type React from "react"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Trash2, Edit3, Folder, ChevronRight, ChevronDown, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  size?: string
  modified: string
  starred?: boolean
  children?: FileItem[]
}

// Mock Data
const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documentation",
    type: "folder",
    path: "/docs",
    modified: "2024-01-15",
    children: [
      {
        id: "2",
        name: "Getting Started.md",
        type: "file",
        path: "/docs/getting-started.md",
        size: "2.4 KB",
        modified: "2024-01-15",
        starred: true,
      },
    ],
  },
  {
    id: "9",
    name: "README.md",
    type: "file",
    path: "/README.md",
    size: "956 B",
    modified: "2024-01-16",
    starred: true,
  },
]

// Helper Component
interface FileTreeItemProps {
  item: FileItem
  level: number
  onSelect: (item: FileItem) => void
  onAction: (action: string, item: FileItem) => void
  selectedId?: string
}

function FileTreeItem({ item, level, onSelect, onAction, selectedId }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0)
  const isSelected = selectedId === item.id

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (item.type === "folder") {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className="group">
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
          isSelected && "bg-primary/10 text-primary",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(item)}
      >
        {item.type === "folder" ? (
          <>
            <button onClick={handleToggle} className="p-0.5 hover:bg-muted rounded">
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            <Folder className="w-4 h-4 text-blue-500" />
          </>
        ) : (
          // Using a div as a spacer for file items to align them with folders
          <div className="w-4 h-4 ml-4" />
        )}
        <span className="flex-1 text-sm truncate">{item.name}</span>
        {item.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("rename", item)}>
              <Edit3 className="w-4 h-4 mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("delete", item)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {item.type === "folder" && isExpanded && item.children && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              onAction={onAction}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Main Component
export function FileManager() {
  const [files] = useState<FileItem[]>(mockFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleFileAction = (action: string, file: FileItem) => {
    console.log(action, file.name)
    // Placeholder for actions like rename, delete, etc.
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Files</h2>
        <p className="text-sm text-muted-foreground">Manage your documents</p>
      </div>
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFiles.map((file) => (
            <FileTreeItem
              key={file.id}
              item={file}
              level={0}
              onSelect={setSelectedFile}
              onAction={handleFileAction}
              selectedId={selectedFile?.id}
            />
          ))}
        </div>
      </ScrollArea>
      {selectedFile && (
        <div className="p-3 border-t border-border bg-muted/50 text-sm text-muted-foreground">
          Selected: <span className="font-medium text-foreground">{selectedFile.name}</span>
        </div>
      )}
    </div>
  )
}

export default FileManager
