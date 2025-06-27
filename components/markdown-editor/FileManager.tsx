"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Folder, FileIcon, Search, MoreVertical } from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  modified?: string
  size?: string
  children?: FileItem[]
}

/* -------------------------------------------------------------------------- */
/*                              MOCK FILE SYSTEM                              */
/* -------------------------------------------------------------------------- */

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "docs",
    type: "folder",
    path: "/docs",
    children: [
      {
        id: "2",
        name: "getting-started.md",
        type: "file",
        path: "/docs/getting-started.md",
        modified: "2 hours ago",
        size: "2.1 KB",
      },
      {
        id: "3",
        name: "api-reference.md",
        type: "file",
        path: "/docs/api-reference.md",
        modified: "1 day ago",
        size: "5.3 KB",
      },
    ],
  },
  {
    id: "4",
    name: "README.md",
    type: "file",
    path: "/README.md",
    modified: "3 days ago",
    size: "1 KB",
  },
]

/* -------------------------------------------------------------------------- */
/*                           FILE TREE ITEM (RECURSIVE)                       */
/* -------------------------------------------------------------------------- */

interface FileTreeItemProps {
  item: FileItem
  depth: number
  expanded: Set<string>
  toggle: (id: string) => void
}

function FileTreeItem({ item, depth, expanded, toggle }: FileTreeItemProps) {
  const isFolder = item.type === "folder"
  const isOpen = expanded.has(item.id)

  return (
    <>
      <div
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        className="group flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-muted/50 text-sm"
        onClick={() => isFolder && toggle(item.id)}
      >
        {isFolder ? (
          <Folder className="h-4 w-4 text-blue-600 shrink-0" />
        ) : (
          <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
        )}

        <span className="flex-1 truncate">{item.name}</span>

        {/* File meta */}
        {item.type === "file" && <span className="text-xs text-muted-foreground">{item.modified}</span>}

        {/* Row actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isFolder && isOpen && item.children?.length
        ? item.children.map((child) => (
            <FileTreeItem key={child.id} item={child} depth={depth + 1} expanded={expanded} toggle={toggle} />
          ))
        : null}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                               FILE MANAGER                                 */
/* -------------------------------------------------------------------------- */

function FileManagerInner() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1"]))
  const [search, setSearch] = useState("")

  const toggleFolder = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const visible = mockFiles.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Files</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="pb-2">
            {visible.map((item) => (
              <FileTreeItem key={item.id} item={item} depth={0} expanded={expanded} toggle={toggleFolder} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                     DEFAULT + NAMED EXPORT (REQUIRED)                      */
/* -------------------------------------------------------------------------- */

export default FileManagerInner
export { FileManagerInner as FileManager }
