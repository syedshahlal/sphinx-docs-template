"use client"

import type { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ImageIcon,
  Table2,
  SigmaSquare,
  Minus,
  FileCode,
  Quote,
  Undo,
  Redo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TiptapToolbarProps {
  editor: Editor
}

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addMermaidDiagram = () => {
    const code = window.prompt("Enter Mermaid diagram code:", "graph TD;\nA-->B;")
    if (code) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "mermaidDiagram",
          attrs: { code },
        })
        .run()
    }
  }

  const isActive = (name: string, attributes?: Record<string, any>) =>
    editor.isActive(name, attributes) ? "bg-muted border-primary text-primary" : "border-border"

  return (
    <div className="p-2 border-b bg-background flex flex-wrap gap-1 items-center sticky top-0 z-10">
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().toggleBold()}
        className={cn("h-8 w-8", isActive("bold"))}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().toggleItalic()}
        className={cn("h-8 w-8", isActive("italic"))}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().toggleStrike()}
        className={cn("h-8 w-8", isActive("strike"))}
        aria-label="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().toggleCode()}
        className={cn("h-8 w-8", isActive("code"))}
        aria-label="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l border-border mx-1"></div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn("h-8 w-8", isActive("paragraph"))}
        aria-label="Paragraph"
      >
        <Pilcrow className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn("h-8 w-8", isActive("heading", { level: 1 }))}
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn("h-8 w-8", isActive("heading", { level: 2 }))}
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn("h-8 w-8", isActive("heading", { level: 3 }))}
        aria-label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l border-border mx-1"></div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn("h-8 w-8", isActive("bulletList"))}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn("h-8 w-8", isActive("orderedList"))}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn("h-8 w-8", isActive("blockquote"))}
        aria-label="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn("h-8 w-8", isActive("codeBlock"))}
        aria-label="Code Block"
      >
        <FileCode className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l border-border mx-1"></div>

      <Button variant="outline" size="icon" onClick={addImage} className="h-8 w-8 border-border" aria-label="Add Image">
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="h-8 w-8 border-border"
        aria-label="Insert Table"
      >
        <Table2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={addMermaidDiagram}
        className="h-8 w-8 border-border"
        aria-label="Add Mermaid Diagram"
      >
        <SigmaSquare className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="h-8 w-8 border-border"
        aria-label="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l border-border mx-1"></div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="h-8 w-8 border-border"
        aria-label="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="h-8 w-8 border-border"
        aria-label="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}
