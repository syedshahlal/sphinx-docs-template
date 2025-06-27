"use client"

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
import { FolderOpen, Plus, Search, MoreHorizontal, Trash2, Edit3, Copy, Download, Upload, Star, Clock, Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

/* ---------- mock data & types ---------- */

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
    id: "3",
    name: "README.md",
    type: "file",
    path: "/README.md",
    size: "956 B",
    modified: "2024-01-16",
  },
]

/* ---------- tree item ---------- */

interface FileTreeItemProps {
  item: FileItem
  level: number
  onSelect: (i: FileItem) => void
  onAction: (action: string, i: FileItem) => void
  selectedId?: string
}

function FileTreeItem({ item, level, onSelect, onAction, selectedId }: FileTreeItemProps) {
  const [open, setOpen] = useState(level === 0)
  const isSelected = selectedId === item.id

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted/50",
          isSelected && "bg-primary/10 text-primary",
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(item)}
      >
        {item.type === "folder" && (
          <button onClick={() => setOpen(!open)} className="p-0.5 hover:bg-muted rounded">
            {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        )}
        <Folder className="w-4 h-4 text-blue-500" />
        <span className="flex-1 truncate">{item.name}</span>
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
            <DropdownMenuItem onClick={() => onAction("duplicate", item)}>
              <Copy className="w-4 h-4 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("download", item)}>
              <Download className="w-4 h-4 mr-2" /> Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("delete", item)} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {item.type === "folder" && open && item.children?.length
        ? item.children.map((c) => (
            <FileTreeItem
              key={c.id}
              item={c}
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

/* ---------- FileManager main ---------- */

export interface FileManagerProps {
  onSelect: (file: File) => void
}

export function FileManager({ onSelect }: FileManagerProps) {
  const [files] = useState<FileItem[]>(mockFiles)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<FileItem | null>(null)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onSelect(f)
  }

  const visible = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="h-full flex flex-col bg-card">
      {/* toolbar */}
      <div className="p-4 border-b border-border bg-muted/50 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
          <Input type="file" onChange={handleUpload} className="ml-auto h-8" />
        </div>
      </div>

      {/* file tree */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {visible.map((f) => (
            <FileTreeItem
              key={f.id}
              item={f}
              level={0}
              onSelect={setSelected}
              onAction={() => {}}
              selectedId={selected?.id}
            />
          ))}
        </div>
      </ScrollArea>

      {/* footer */}
      {selected && (
        <div className="p-3 border-t border-border text-xs flex justify-between bg-muted/50">
          <span>{selected.path}</span> <Badge>{selected.type}</Badge>
        </div>
      )}
    </div>
  )
}

export default FileManager
