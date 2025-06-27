"use client"

import type React from "react"
import { useState, type ChangeEvent } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Folder, Search, MoreHorizontal, Trash2, Edit3, Copy, Upload, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Mock Data & Types ---

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

const mockFiles: FileItem[] = [
  {
    id: "folder-1",
    name: "Documentation",
    type: "folder",
    path: "/docs",
    modified: "2024-01-15",
    children: [
      {
        id: "file-1",
        name: "Getting Started.md",
        type: "file",
        path: "/docs/getting-started.md",
        size: "2.4 KB",
        modified: "2024-01-15",
        starred: true,
      },
      {
        id: "file-2",
        name: "API Reference.md",
        type: "file",
        path: "/docs/api-reference.md",
        size: "12.1 KB",
        modified: "2024-01-14",
      },
    ],
  },
  {
    id: "file-3",
    name: "README.md",
    type: "file",
    path: "/README.md",
    size: "956 B",
    modified: "2024-01-16",
  },
]

// --- File Tree Item Component ---

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

  const Icon = item.type === "folder" ? Folder : Edit3 // Using Edit3 for file icon as placeholder

  return (
    <div className="group text-sm">
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors",
          isSelected && "bg-primary/10 text-primary",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(item)}
      >
        {item.type === "folder" && (
          <button onClick={handleToggle} className="p-0.5 hover:bg-muted-foreground/20 rounded">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
        <Icon
          className={cn("w-4 h-4", item.type === "folder" ? "text-blue-500" : "text-muted-foreground")}
          style={{ marginLeft: item.type === "file" ? "24px" : "0" }}
        />
        <span className="flex-1 truncate">{item.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("rename", item)}>
              <Edit3 className="w-4 h-4 mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("duplicate", item)}>
              <Copy className="w-4 h-4 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("delete", item)} className="text-red-500 focus:text-red-500">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.type === "folder" && isExpanded && item.children?.length && (
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

// --- Main FileManager Component ---

export function FileManager() {
  const [files] = useState<FileItem[]>(mockFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)

  const handleAction = (action: string, item: FileItem) => {
    // Placeholder for actual file operations
    console.log(`Action: ${action} on ${item.path}`)
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      console.log("Uploaded file:", file.name)
      // Here you would handle the file upload logic
    }
  }

  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="h-full flex flex-col bg-card border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredFiles.map((item) => (
            <FileTreeItem
              key={item.id}
              item={item}
              level={0}
              onSelect={setSelectedItem}
              onAction={handleAction}
              selectedId={selectedItem?.id}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t">
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => document.getElementById("file-upload-input")?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
        <input type="file" id="file-upload-input" className="hidden" onChange={handleFileUpload} />
      </div>

      {selectedItem && (
        <div className="p-3 border-t bg-muted/50 text-xs text-muted-foreground flex justify-between items-center">
          <span className="truncate">Path: {selectedItem.path}</span>
          <Badge variant="secondary">{selectedItem.type}</Badge>
        </div>
      )}
    </div>
  )
}

export default FileManager
