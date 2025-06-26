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
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="p-2 border-b bg-muted/20 flex flex-wrap gap-1 items-center sticky top-0 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().toggleBold()}
        className={editor.isActive("bold") ? "bg-primary/20" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().toggleItalic()}
        className={editor.isActive("italic") ? "bg-primary/20" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().toggleStrike()}
        className={editor.isActive("strike") ? "bg-primary/20" : ""}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().toggleCode()}
        className={editor.isActive("code") ? "bg-primary/20" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l mx-1"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-primary/20" : ""}
      >
        <Pilcrow className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-primary/20" : ""}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-primary/20" : ""}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-primary/20" : ""}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l mx-1"></div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-primary/20" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-primary/20" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-primary/20" : ""}
      >
        <FileCode className="h-4 w-4" />
      </Button>

      <div className="h-6 border-l mx-1"></div>

      <Button variant="ghost" size="icon" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={addMermaidDiagram}>
        <SigmaSquare className="h-4 w-4" /> {/* Using SigmaSquare for Mermaid */}
      </Button>
      <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  )
}
