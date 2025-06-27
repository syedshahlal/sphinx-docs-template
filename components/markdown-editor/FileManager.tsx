"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  FileIcon,
  FolderIcon,
  Search,
  Plus,
  MoreVertical,
  Download,
  Upload,
  Trash2,
  Edit,
  Copy,
  Star,
  Clock,
  FileText,
  ImageIcon,
  Code,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  starred?: boolean
  extension?: string
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Getting Started Guide",
    type: "file",
    size: "2.4 KB",
    modified: "2 hours ago",
    starred: true,
    extension: "md",
  },
  {
    id: "2",
    name: "API Documentation",
    type: "folder",
    modified: "1 day ago",
  },
  {
    id: "3",
    name: "User Manual",
    type: "file",
    size: "5.1 KB",
    modified: "3 days ago",
    extension: "md",
  },
  {
    id: "4",
    name: "Architecture Overview",
    type: "file",
    size: "1.8 KB",
    modified: "1 week ago",
    extension: "md",
  },
  {
    id: "5",
    name: "Images",
    type: "folder",
    modified: "2 weeks ago",
  },
]

const getFileIcon = (file: FileItem) => {
  if (file.type === "folder") {
    return <FolderIcon className="h-4 w-4 text-blue-500" />
  }

  switch (file.extension) {
    case "md":
      return <FileText className="h-4 w-4 text-green-500" />
    case "jpg":
    case "png":
    case "gif":
      return <ImageIcon className="h-4 w-4 text-purple-500" />
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
      return <Code className="h-4 w-4 text-yellow-500" />
    case "json":
    case "xml":
      return <Database className="h-4 w-4 text-orange-500" />
    default:
      return <FileIcon className="h-4 w-4 text-gray-500" />
  }
}

export function FileManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const toggleStar = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)))
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            <FileIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Files</h2>
            <p className="text-sm text-muted-foreground">Manage your documents</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="shrink-0">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Document name" />
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Markdown
                  </Button>
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Template
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FileIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {searchQuery ? "Try adjusting your search terms" : "Create your first document to get started"}
              </p>
            </div>
          ) : (
            filteredFiles.map((file) => (
              <Card
                key={file.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  selectedFiles.includes(file.id) && "ring-2 ring-primary ring-offset-2",
                )}
                onClick={() => toggleFileSelection(file.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getFileIcon(file)}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">{file.name}</p>
                          {file.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{file.modified}</span>
                          {file.size && (
                            <>
                              <Separator orientation="vertical" className="h-3" />
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleStar(file.id)}>
                          <Star className="h-4 w-4 mr-2" />
                          {file.starred ? "Unstar" : "Star"}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {selectedFiles.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
