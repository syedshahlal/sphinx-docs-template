"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEditor } from "./EditorContext"
import { cn } from "@/lib/utils"
import {
  FolderOpen,
  File,
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  Copy,
  Clock,
  User,
  Save,
  FileCode,
  ImageIcon,
  Video,
  Music,
  Archive,
} from "lucide-react"

// Mock file data - in a real app, this would come from an API
const mockFiles = [
  {
    id: "1",
    name: "Getting Started Guide",
    type: "document",
    extension: "mdx",
    size: "2.4 KB",
    lastModified: "2024-01-15T10:30:00Z",
    author: "John Doe",
    components: 8,
    status: "published",
  },
  {
    id: "2",
    name: "API Documentation",
    type: "document",
    extension: "mdx",
    size: "15.2 KB",
    lastModified: "2024-01-14T15:45:00Z",
    author: "Jane Smith",
    components: 23,
    status: "draft",
  },
  {
    id: "3",
    name: "Hero Banner Template",
    type: "template",
    extension: "mdx",
    size: "1.8 KB",
    lastModified: "2024-01-13T09:15:00Z",
    author: "Mike Johnson",
    components: 3,
    status: "template",
  },
  {
    id: "4",
    name: "Product Screenshots",
    type: "folder",
    extension: "",
    size: "45.6 MB",
    lastModified: "2024-01-12T14:20:00Z",
    author: "Sarah Wilson",
    components: 0,
    status: "folder",
  },
]

const getFileIcon = (type: string, extension: string) => {
  if (type === "folder") return FolderOpen
  if (extension === "mdx" || extension === "md") return FileText
  if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)) return ImageIcon
  if (["mp4", "avi", "mov", "wmv"].includes(extension)) return Video
  if (["mp3", "wav", "flac", "aac"].includes(extension)) return Music
  if (["zip", "rar", "7z", "tar"].includes(extension)) return Archive
  return FileCode
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
    case "draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
    case "template":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    case "folder":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }
}

export function FileManager() {
  const { state, loadComponents } = useEditor()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [showNewFileDialog, setShowNewFileDialog] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleFileOpen = (file: any) => {
    if (file.type === "document" || file.type === "template") {
      // In a real app, this would load the file content
      console.log("Opening file:", file.name)
      // Mock loading components
      loadComponents([], file.name, `/documents/${file.name}`)
    }
  }

  const handleNewFile = () => {
    if (newFileName.trim()) {
      console.log("Creating new file:", newFileName)
      setNewFileName("")
      setShowNewFileDialog(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            <FolderOpen className="h-5 w-5 text-primary-foreground" />
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
          <Dialog open={showNewFileDialog} onOpenChange={setShowNewFileDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="file-name">File Name</Label>
                  <Input
                    id="file-name"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="Enter file name"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewFileDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewFile}>
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* File Actions */}
        {selectedFiles.length > 0 && (
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export ({selectedFiles.length})
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Current Document Info */}
          {state.fileName && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Current Document</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {state.isDirty ? "Unsaved" : "Saved"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-sm">{state.fileName}</p>
                  <p className="text-xs text-muted-foreground">{state.components.length} components</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator className="mb-4" />

          {/* Files List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Recent Files</h3>
              <Badge variant="secondary" className="text-xs">
                {filteredFiles.length} files
              </Badge>
            </div>

            {filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {searchQuery ? "Try adjusting your search terms" : "Create your first document to get started"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => {
                  const IconComponent = getFileIcon(file.type, file.extension)
                  const isSelected = selectedFiles.includes(file.id)
                  
                  return (
                    <Card 
                      key={file.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 hover:shadow-md",
                        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      )}
                      onClick={() => handleFileSelect(file.id)}
                      onDoubleClick={() => handleFileOpen(file)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <IconComponent className="h-4 w-4 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {file.name}
                              </h4>
                              <Badge 
                                variant="secondary" 
                                className={cn("text-xs", getStatusColor(file.status))}
                              >
                                {file.status}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {file.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(file.lastModified)}
                              </div>
                              <div className="flex items-center gap-1">
                                <File className="h-3 w-3" />
                                {file.\
