"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder, File, Plus, Search, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  children?: FileItem[]
  modified?: string
  size?: string
}

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
    name: "examples",
    type: "folder",
    path: "/examples",
    children: [
      {
        id: "5",
        name: "basic-usage.md",
        type: "file",
        path: "/examples/basic-usage.md",
        modified: "3 days ago",
        size: "1.8 KB",
      },
    ],
  },
]

export default function FileManager() {
  const [files] = useState<FileItem[]>(mockFiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["1", "4"]))

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isExpanded = expandedFolders.has(item.id)

    return (
      <div key={item.id}>
        <div
          className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => item.type === "folder" && toggleFolder(item.id)}
        >
          {item.type === "folder" ? (
            <Folder className="h-4 w-4 text-blue-500" />
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}

          <span className="flex-1 text-sm">{item.name}</span>

          {item.type === "file" && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {item.size}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.modified}</span>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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

        {item.type === "folder" && isExpanded && item.children && (
          <div>{item.children.map((child) => renderFileItem(child, depth + 1))}</div>
        )}
      </div>
    )
  }

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Files</CardTitle>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">{filteredFiles.map((file) => renderFileItem(file))}</div>
      </CardContent>
    </Card>
  )
}

/* Named export required by build */
export { FileManager }
