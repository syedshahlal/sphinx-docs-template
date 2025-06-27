"use client"

import type { ChangeEvent } from "react"
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
import { Folder, Search, MoreHorizontal, Trash2, Edit3, Copy, Upload, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               MOCK FILE DATA                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               FILE-TREE ITEM                               */
/* -------------------------------------------------------------------------- */

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

  const Icon = item.type === "folder" ? Folder : Edit3 // placeholder icon for files

  return (
    <div className="group text-sm">
      <div
        onClick={() => onSelect(item)}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors",
          isSelected && "bg-primary/10 text-primary",
        )}
      >
        {item.type === "folder" && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="p-0.5 hover:bg-muted-foreground/20 rounded"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}

        <Icon
          className={cn("w-4 h-4", item.type === "folder" ? "text-blue-500" : "text-muted-foreground")}
          style={{ marginLeft: item.type === "file" ? "24px" : 0 }}
        />

        <span className="flex-1 truncate">{item.name}</span>

        {/* Action menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
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
            <DropdownMenuItem onClick={() => onAction("duplicate", item)}>
              <Copy className="w-4 h-4 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("delete", item)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.type === "folder" && isExpanded && item.children?.length
        ? item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              onAction={onAction}
              selectedId={selectedId}
            />
          ))
        : null}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                FILE MANAGER                                */
/* -------------------------------------------------------------------------- */

export function FileManager() {
  const [files] = useState<FileItem[]>(mockFiles)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<FileItem | null>(null)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded) {
      console.log("Uploaded:", uploaded.name)
      // Upload logic goes here
    }
  }

  const handleAction = (action: string, item: FileItem) => {
    console.log(action, item)
    // Real actions would be implemented here
  }

  const visibleFiles = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full flex flex-col bg-card border rounded-lg">
      {/* Search / upload */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files…"
            className="pl-10 h-9"
          />
        </div>
        <input id="file-upload-input" type="file" onChange={handleFileUpload} className="hidden" />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload-input")?.click()}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload file
        </Button>
      </div>

      {/* File tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {visibleFiles.map((item) => (
            <FileTreeItem
              key={item.id}
              item={item}
              level={0}
              onSelect={setSelected}
              onAction={handleAction}
              selectedId={selected?.id}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      {selected && (
        <div className="p-3 border-t border-border flex items-center justify-between text-xs bg-muted/50 text-muted-foreground">
          <span className="truncate">{selected.path}</span>
          <Badge>{selected.type}</Badge>
        </div>
      )}
    </div>
  )
}

export default FileManager
