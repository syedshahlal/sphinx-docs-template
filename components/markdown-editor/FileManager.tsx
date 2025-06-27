"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderOpen, File, Search, Plus, MoreHorizontal, Clock, User, Star, Trash2, Edit } from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  lastModified: string
  author: string
  size?: string
  starred?: boolean
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "getting-started.md",
    type: "file",
    path: "docs/",
    lastModified: "2 hours ago",
    author: "John Doe",
    size: "2.4 KB",
    starred: true,
  },
  {
    id: "2",
    name: "api-reference.md",
    type: "file",
    path: "docs/api/",
    lastModified: "1 day ago",
    author: "Jane Smith",
    size: "15.2 KB",
  },
  {
    id: "3",
    name: "tutorials",
    type: "folder",
    path: "docs/",
    lastModified: "3 days ago",
    author: "Team",
  },
  {
    id: "4",
    name: "installation-guide.md",
    type: "file",
    path: "docs/guides/",
    lastModified: "1 week ago",
    author: "Bob Wilson",
    size: "5.1 KB",
    starred: true,
  },
]

export function FileManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("recent")

  const filteredFiles = mockFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const recentFiles = filteredFiles.filter((file) => file.type === "file").slice(0, 5)
  const starredFiles = filteredFiles.filter((file) => file.starred)

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

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <Button className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Document
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3">
          <TabsTrigger value="recent" className="text-sm">
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="starred" className="text-sm">
            <Star className="h-4 w-4 mr-2" />
            Starred
          </TabsTrigger>
          <TabsTrigger value="all" className="text-sm">
            <File className="h-4 w-4 mr-2" />
            All Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {recentFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No recent files</p>
                </div>
              ) : (
                recentFiles.map((file) => (
                  <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-muted">
                            <File className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-medium text-foreground truncate">{file.name}</h3>
                              {file.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{file.path}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {file.author}
                              </span>
                              <span>{file.lastModified}</span>
                              {file.size && <span>{file.size}</span>}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="starred" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {starredFiles.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No starred files</p>
                </div>
              ) : (
                starredFiles.map((file) => (
                  <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-muted">
                            <File className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-medium text-foreground truncate">{file.name}</h3>
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{file.path}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {file.author}
                              </span>
                              <span>{file.lastModified}</span>
                              {file.size && <span>{file.size}</span>}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="all" className="flex-1 mt-4">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-muted">
                          {file.type === "folder" ? (
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <File className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-foreground truncate">{file.name}</h3>
                            {file.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                            {file.type === "folder" && (
                              <Badge variant="secondary" className="text-xs">
                                Folder
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{file.path}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {file.author}
                            </span>
                            <span>{file.lastModified}</span>
                            {file.size && <span>{file.size}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
