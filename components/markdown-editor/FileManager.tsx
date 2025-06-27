"use client"

import { useState } from "react"
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
import {
  FolderOpen,
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Edit3,
  Copy,
  Download,
  Upload,
  Star,
  Clock,
  Folder,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChangeEvent } from "react"

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

// Mock file data
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
      {
        id: "3",
        name: "API Reference.md",
        type: "file",
        path: "/docs/api-reference.md",
        size: "8.1 KB",
        modified: "2024-01-14",
      },
      {
        id: "4",
        name: "Examples",
        type: "folder",
        path: "/docs/examples",
        modified: "2024-01-13",
        children: [
          {
            id: "5",
            name: "Basic Usage.md",
            type: "file",
            path: "/docs/examples/basic-usage.md",
            size: "1.2 KB",
            modified: "2024-01-13",
          },
          {
            id: "6",
            name: "Advanced Features.md",
            type: "file",
            path: "/docs/examples/advanced-features.md",
            size: "3.7 KB",
            modified: "2024-01-12",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Blog Posts",
    type: "folder",
    path: "/blog",
    modified: "2024-01-10",
    children: [
      {
        id: "8",
        name: "Welcome Post.md",
        type: "file",
        path: "/blog/welcome-post.md",
        size: "1.8 KB",
        modified: "2024-01-10",
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

  const handleToggle = () => {
    if (item.type === "folder") {
      setIsExpanded(!isExpanded)
    }
  }

  const handleSelect = () => {
    onSelect(item)
  }

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
          isSelected && "bg-primary/10 text-primary",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleSelect}
      >
        {item.type === "folder" && (
          <button onClick={handleToggle} className="p-0.5 hover:bg-muted rounded">
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        )}
        {item.type === "folder" ? (
          <Folder className="w-4 h-4 text-blue-500" />
        ) : (
          <Folder className="w-4 h-4 text-muted-foreground" />
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
              <Edit3 className="w-4 h-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("duplicate", item)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("download", item)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("star", item)} className="text-yellow-600">
              <Star className="w-4 h-4 mr-2" />
              {item.starred ? "Unstar" : "Star"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("delete", item)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
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

export interface FileManagerProps {
  onSelect: (file: File) => void
}

export function FileManager({ onSelect }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [view, setView] = useState<"tree" | "list" | "starred">("tree")
  const [fileName, setFileName] = useState<string>("")

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file)
    // Load file content logic would go here
  }

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case "rename":
        // Rename logic
        break
      case "duplicate":
        // Duplicate logic
        break
      case "download":
        // Download logic
        break
      case "star":
        // Toggle star logic
        break
      case "delete":
        // Delete logic
        break
    }
  }

  const handleNewFile = () => {
    // New file logic
  }

  const handleNewFolder = () => {
    // New folder logic
  }

  const handleUpload = () => {
    // Upload logic
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onSelect(file as any)
    }
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const starredFiles = files.flatMap((file) => {
    const starred = []
    if (file.starred) starred.push(file)
    if (file.children) {
      starred.push(...file.children.filter((child) => child.starred))
    }
    return starred
  })

  const recentFiles = files
    .flatMap((file) => {
      const all = [file]
      if (file.children) all.push(...file.children)
      return all
    })
    .filter((file) => file.type === "file")
    .sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
    .slice(0, 5)

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <FolderOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Files</h2>
              <p className="text-sm text-muted-foreground">Manage your documents</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button onClick={handleNewFile} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New File
          </Button>
          <Button
            onClick={handleNewFolder}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-transparent"
          >
            <Folder className="w-4 h-4" />
            New Folder
          </Button>
          <Button onClick={handleUpload} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Input type="file" onChange={handleChange} />
          {fileName && (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Selected: <span className="font-medium">{fileName}</span>
            </p>
          )}
          <Button variant="secondary" onClick={() => setFileName("")}>
            Clear
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-border">
        {[
          { key: "tree", label: "Files", icon: FolderOpen },
          { key: "starred", label: "Starred", icon: Star },
          { key: "recent", label: "Recent", icon: Clock },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key as any)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              view === key
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {view === "tree" && (
            <div className="space-y-1">
              {filteredFiles.map((file) => (
                <FileTreeItem
                  key={file.id}
                  item={file}
                  level={0}
                  onSelect={handleFileSelect}
                  onAction={handleFileAction}
                  selectedId={selectedFile?.id}
                />
              ))}
            </div>
          )}

          {view === "starred" && (
            <div className="space-y-2">
              {starredFiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No starred files yet</p>
                  <p className="text-xs">Star files to access them quickly</p>
                </div>
              ) : (
                starredFiles.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                      selectedFile?.id === file.id && "bg-primary/10 border-primary",
                    )}
                    onClick={() => handleFileSelect(file)}
                  >
                    <Folder className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.path}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{file.size}</div>
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                ))
              )}
            </div>
          )}

          {view === "recent" && (
            <div className="space-y-2">
              {recentFiles.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors",
                    selectedFile?.id === file.id && "bg-primary/10 border-primary",
                  )}
                  onClick={() => handleFileSelect(file)}
                >
                  <Folder className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.path}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{file.modified}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      {selectedFile && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">{selectedFile.name}</div>
              <div className="text-xs text-muted-foreground">
                {selectedFile.size} • Modified {selectedFile.modified}
              </div>
            </div>
            <Badge variant="outline">{selectedFile.type}</Badge>
          </div>
        </div>
      )}
    </div>
  )
}
