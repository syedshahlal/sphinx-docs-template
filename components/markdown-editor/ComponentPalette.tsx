"use client"

import { useDraggable } from "@dnd-kit/core"
import { useEditor } from "./EditorContext"
import {
  Type,
  AlignLeft,
  ImageIcon,
  Code,
  MousePointer,
  CreditCard,
  Grid3X3,
  Minus,
  List,
  Quote,
  Table,
  Youtube,
  AlertTriangle,
  Share2,
  ListOrdered,
  CheckSquare,
} from "lucide-react"
import type { MarkdownComponent } from "./types"

const componentCategories = [
  {
    name: "Text Elements",
    components: [
      { type: "heading", icon: Type, label: "Heading", color: "text-blue-500" },
      { type: "paragraph", icon: AlignLeft, label: "Paragraph", color: "text-gray-500" },
      { type: "blockquote", icon: Quote, label: "Blockquote", color: "text-cyan-500" },
      { type: "list", icon: List, label: "Bullet List", color: "text-yellow-500" },
      { type: "orderedList", icon: ListOrdered, label: "Ordered List", color: "text-yellow-600" },
      { type: "taskList", icon: CheckSquare, label: "Task List", color: "text-green-600" },
      { type: "code", icon: Code, label: "Code Block", color: "text-purple-500" },
      { type: "horizontalRule", icon: Minus, label: "Divider", color: "text-gray-400" },
    ],
  },
  {
    name: "Media & Embeds",
    components: [
      { type: "image", icon: ImageIcon, label: "Image", color: "text-green-500" },
      { type: "video", icon: Youtube, label: "Video", color: "text-red-500" },
      { type: "mermaid", icon: Share2, label: "Mermaid Diagram", color: "text-sky-500" },
    ],
  },
  {
    name: "Interactive & UI",
    components: [
      { type: "button", icon: MousePointer, label: "Button", color: "text-orange-500" },
      { type: "card", icon: CreditCard, label: "Card", color: "text-pink-500" },
      { type: "alert", icon: AlertTriangle, label: "Alert/Callout", color: "text-yellow-700" },
    ],
  },
  {
    name: "Layout Elements",
    components: [{ type: "grid", icon: Grid3X3, label: "Simple Grid", color: "text-indigo-500" }],
  },
  {
    name: "Data",
    components: [{ type: "table", icon: Table, label: "Table", color: "text-red-600" }],
  },
]

export function getDefaultContent(type: MarkdownComponent["type"]) {
  switch (type) {
    case "heading":
      return { level: 1, text: "New Heading" }
    case "paragraph":
      return { text: "Enter your text here..." }
    case "image":
      return { src: "/placeholder.svg?height=200&width=400", alt: "Image description" }
    case "code":
      return { language: "javascript", code: 'console.log("Hello, World!");' }
    case "button":
      return { text: "Click me", link: "#" }
    case "card":
      return { title: "Card Title", description: "Card description..." }
    case "grid":
      return { items: [{ text: "Grid item 1" }, { text: "Grid item 2" }] }
    case "horizontalRule":
      return {}
    case "list":
      return { items: ["List item 1", "List item 2"] }
    case "orderedList":
      return { items: ["First item", "Second item"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Task 1", checked: false },
          { text: "Task 2", checked: true },
        ],
      }
    case "blockquote":
      return { text: "This is a blockquote." }
    case "table":
      return {
        headers: ["Header 1", "Header 2"],
        rows: [
          ["Cell 1-1", "Cell 1-2"],
          ["Cell 2-1", "Cell 2-2"],
        ],
      }
    case "video":
      return { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Video Placeholder" }
    case "alert":
      return { type: "info", text: "This is an informational alert." }
    case "mermaid":
      return { code: "graph TD;\n  A-->B;\n  B-->C;\n  C-->D;" }
    default:
      return {}
  }
}

function DraggableComponent({ type, icon: Icon, label, color }: any) {
  const { addComponent } = useEditor()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
  })

  const handleClick = () => {
    const content = getDefaultContent(type)
    addComponent({ type, content })
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
      flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
      hover:bg-accent hover:text-accent-foreground
      ${isDragging ? "opacity-50 shadow-lg" : ""}
      border border-transparent hover:border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick()
      }}
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export function ComponentPalette() {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <h3 className="text-xl font-semibold mb-6 sticky top-0 bg-card pt-2 pb-3 z-10">Add Element</h3>
      <div className="space-y-6">
        {componentCategories.map((category) => (
          <div key={category.name}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 px-1">{category.name}</h4>
            <div className="space-y-1">
              {category.components.map((component) => (
                <DraggableComponent key={component.type} {...component} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
