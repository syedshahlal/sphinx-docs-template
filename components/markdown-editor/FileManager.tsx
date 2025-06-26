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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  FolderPlus,
  FilePlus,
  MoreHorizontal,
  Download,
  Upload,
  Star,
  Clock,
  Search,
  Filter,
  Folder,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  starred?: boolean
  components?: number
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Welcome Page",
    type: "file",
    size: "2.3 KB",
    modified: "2 hours ago",
    starred: true,
    components: 8,
  },
  {
    id: "2",
    name: "Product Documentation",
    type: "file",
    size: "5.7 KB",
    modified: "1 day ago",
    components: 15,
  },
  {
    id: "3",
    name: "Marketing Pages",
    type: "folder",
    modified: "3 days ago",
  },
  {
    id: "4",
    name: "API Reference",
    type: "file",
    size: "12.1 KB",
    modified: "1 week ago",
    components: 23,
  },
  {
    id: "5",
    name: "User Guide",
    type: "file",
    size: "8.4 KB",
    modified: "2 weeks ago",
    starred: true,
    components: 18,
  },
]

export function FileManager() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: newFileName.trim(),
        type: "file",
        size: "0 KB",
        modified: "Just now",
        components: 0,
      }
      setFiles([newFile, ...files])
      setNewFileName("")
      setIsNewFileDialogOpen(false)
      setSelectedFile(newFile.id)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter((file) => file.id !== fileId))
    if (selectedFile === fileId) {
      setSelectedFile(null)
    }
  }

  const handleToggleStar = (fileId: string) => {
    setFiles(files.map((file) => (file.id === fileId ? { ...file, starred: !file.starred } : file)))
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Files</h2>
              <p className="text-sm text-muted-foreground">Manage your documents</p>
            </div>
          </div>
          <Badge variant="secondary">{files.length} files</Badge>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <FilePlus className="w-4 h-4" />
                New File
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New File</DialogTitle>
                <DialogDescription>Enter a name for your new document.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <Input
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Enter file name..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateFile()
                    }
                  }}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewFileDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFile} disabled={!newFileName.trim()}>
                  Create File
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Upload className="w-4 h-4 mr-2" />
                Import Files
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Filter className="w-4 h-4 mr-2" />
                Filter Options
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No files found" : "No files yet"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                {searchQuery ? "Try adjusting your search terms." : "Create your first document to get started."}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsNewFileDialogOpen(true)}>
                  <FilePlus className="w-4 h-4 mr-2" />
                  Create File
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    "group flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md",
                    selectedFile === file.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-border/80 bg-card",
                  )}
                  onClick={() => setSelectedFile(file.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        file.type === "folder"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                      )}
                    >
                      {file.type === "folder" ? <Folder className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground truncate">{file.name}</h4>
                        {file.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {file.modified}
                        </span>
                        {file.size && <span>{file.size}</span>}
                        {file.components !== undefined && <span>{file.components} components</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleStar(file.id)
                      }}
                      className="h-8 w-8 p-0"
                    >
                      <Star
                        className={cn(
                          "w-4 h-4",
                          file.starred ? "text-yellow-500 fill-current" : "text-muted-foreground",
                        )}
                      />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteFile(file.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground">{filteredFiles.length} items</div>
    </div>
  )
}
