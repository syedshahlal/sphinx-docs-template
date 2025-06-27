"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface PropertiesPanelProps {
  title: string
  content: string
  category: string
  onTitleChange: (newTitle: string) => void
  onContentChange: (newContent: string) => void
  onCategoryChange: (newCategory: string) => void
  categories: string[]
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  title,
  content,
  category,
  onTitleChange,
  onContentChange,
  onCategoryChange,
  categories,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={onCategoryChange} defaultValue={category}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

interface FileManagerProps {
  onSave: () => void
  onLoad: () => void
}

const FileManager: React.FC<FileManagerProps> = ({ onSave, onLoad }) => {
  return (
    <div className="space-x-2">
      <Button onClick={onSave}>Save</Button>
      <Button onClick={onLoad}>Load</Button>
    </div>
  )
}

export default PropertiesPanel
export { FileManager }
