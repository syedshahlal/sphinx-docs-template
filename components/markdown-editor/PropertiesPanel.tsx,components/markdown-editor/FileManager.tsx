"use client"

\`\`\`typescript
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PropertiesPanelProps {
  title: string
  onTitleChange: (newTitle: string) => void
  onSave: () => void
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ title, onTitleChange, onSave }) => {
  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <Button
          onClick={onSave}
          className="bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default PropertiesPanel
\`\`\`

\`\`\`typescript
// components/markdown-editor/FileManager.tsx
import type React from "react"
import { Input } from "@/components/ui/input"

interface FileManagerProps {
  onFileSelect: (file: File) => void
}

const FileManager: React.FC<FileManagerProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-4">File Manager</h2>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Select File
        </label>
        <Input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  )
}

export default FileManager;
\`\`\`
