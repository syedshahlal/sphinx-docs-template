"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Tag, User, Clock, FileText } from "lucide-react"

interface DocumentMetadata {
  title: string
  description: string
  author: string
  tags: string[]
  category: string
  status: "draft" | "review" | "published"
  created: string
  modified: string
  wordCount: number
}

export default function PropertiesPanel() {
  const [metadata, setMetadata] = useState<DocumentMetadata>({
    title: "Getting Started Guide",
    description: "A comprehensive guide to help users get started with our platform",
    author: "John Doe",
    tags: ["guide", "beginner", "tutorial"],
    category: "Documentation",
    status: "draft",
    created: "2024-01-15",
    modified: "2024-01-20",
    wordCount: 1247,
  })

  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !metadata.tags.includes(newTag.trim())) {
      setMetadata((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setMetadata((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleInputChange = (field: keyof DocumentMetadata, value: string) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={metadata.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Document title"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={metadata.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the document"
              rows={3}
            />
          </div>
        </div>

        <Separator />

        {/* Metadata */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4" />
            Author & Category
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={metadata.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              placeholder="Author name"
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={metadata.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Documentation">Documentation</SelectItem>
                <SelectItem value="Tutorial">Tutorial</SelectItem>
                <SelectItem value="API Reference">API Reference</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
                <SelectItem value="FAQ">FAQ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={metadata.status}
              onValueChange={(value: "draft" | "review" | "published") =>
                handleInputChange("status", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Tags */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Tag className="h-4 w-4" />
            Tags
          </div>

          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              onKeyDown={(e) => e.key === "Enter" && addTag()}
            />
            <Button onClick={addTag} size="sm">
              Add
            </Button>
          </div>
        </div>

        <Separator />

        {/* Document Stats */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4" />
            Document Info
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-xs text-muted-foreground">Created</Label>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {metadata.created}
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Modified</Label>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {metadata.modified}
              </div>
            </div>

            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Word Count</Label>
              <div className="font-medium">{metadata.wordCount.toLocaleString()} words</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            Save Draft
          </Button>
          <Button size="sm" className="flex-1">
            Publish
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { PropertiesPanel }
