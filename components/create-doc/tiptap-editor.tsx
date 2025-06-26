"use client"

import { useEffect } from "react"

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import ImageExtension from "@tiptap/extension-image"
import TableExtension from "@tiptap/extension-table"
import TableRowExtension from "@tiptap/extension-table-row"
import TableCellExtension from "@tiptap/extension-table-cell"
import TableHeaderExtension from "@tiptap/extension-table-header"
import Placeholder from "@tiptap/extension-placeholder"
import { lowlight } from "lowlight/lib/common" // Or import specific languages
import { TiptapToolbar } from "./tiptap-toolbar"
import { MermaidDiagram } from "@/lib/tiptap-extensions/mermaid-node" // Custom node
import "@/styles/tiptap.css" // Styles for Tiptap editor

// Register specific languages for lowlight if not using common
// import css from 'highlight.js/lib/languages/css'
// import javascript from 'highlight.js/lib/languages/javascript'
// lowlight.registerLanguage('css', css)
// lowlight.registerLanguage('javascript', javascript)

interface TiptapEditorProps {
  onEditorChange: (editor: Editor | null) => void
  initialContent?: string
}

export function TiptapEditor({ onEditorChange, initialContent = "" }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false, // We use CodeBlockLowlight instead
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true, // Be cautious with base64 if content size is a concern
      }),
      TableExtension.configure({
        resizable: true,
      }),
      TableRowExtension,
      TableCellExtension,
      TableHeaderExtension,
      MermaidDiagram, // Custom Mermaid node
      Placeholder.configure({
        placeholder: "Start writing your documentation here...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      // You can get HTML or JSON here if needed
      // For Markdown, we'll use a custom solution or a Tiptap Markdown extension
    },
    // Storing markdown directly in editor's storage
    onCreate: ({ editor }) => {
      editor.storage.markdown = {
        getMarkdown: () => {
          // This is a simplified Markdown generator. For robust conversion,
          // consider tiptap-markdown or a similar library.
          let md = ""
          editor.state.doc.forEach((node) => {
            if (node.type.name === "heading") {
              md += `${"#".repeat(node.attrs.level)} ${node.textContent}\n\n`
            } else if (node.type.name === "paragraph") {
              let content = ""
              node.forEach((childNode) => {
                if (childNode.type.name === "text") {
                  let text = childNode.text || ""
                  if (childNode.marks.some((mark) => mark.type.name === "bold")) text = `**${text}**`
                  if (childNode.marks.some((mark) => mark.type.name === "italic")) text = `*${text}*`
                  if (childNode.marks.some((mark) => mark.type.name === "code")) text = `\`${text}\``
                  // Handle images within paragraphs (if inline)
                  content += text
                } else if (childNode.type.name === "image") {
                  content += `![${childNode.attrs.alt || ""}](${childNode.attrs.src || ""})\n`
                }
              })
              if (content.trim()) md += content + "\n\n"
            } else if (node.type.name === "codeBlock") {
              md += "```" + (node.attrs.language || "") + "\n"
              md += node.textContent + "\n"
              md += "```\n\n"
            } else if (node.type.name === "image") {
              md += `![${node.attrs.alt || ""}](${node.attrs.src || ""})\n\n`
            } else if (node.type.name === "mermaidDiagram") {
              md += "```mermaid\n"
              md += node.attrs.code || ""
              md += "\n```\n\n"
            } else if (node.type.name === "table") {
              // Basic table to markdown
              node.content.forEach((row, rowIndex) => {
                let rowMd = "|"
                row.content.forEach((cell) => {
                  rowMd += ` ${cell.textContent.replace(/\|/g, "\\|")} |`
                })
                md += rowMd + "\n"
                if (rowIndex === 0 && node.content.content[0]?.content.content[0]?.type.name === "tableHeader") {
                  // Check if first cell of first row is header
                  md += "|" + " --- |".repeat(row.childCount) + "\n"
                }
              })
              md += "\n"
            }
            // Add more node types: lists, blockquotes etc.
          })
          return md.trim()
        },
      }
    },
  })

  useEffect(() => {
    onEditorChange(editor)
    return () => {
      editor?.destroy()
    }
  }, [editor, onEditorChange])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md relative bg-card">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} className="p-2.5" />
      {/* Example BubbleMenu */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-primary text-primary-foreground p-1 rounded-md shadow-lg flex gap-1"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active p-1" : "p-1"}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active p-1" : "p-1"}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active p-1" : "p-1"}
        >
          Strike
        </button>
      </BubbleMenu>
    </div>
  )
}
