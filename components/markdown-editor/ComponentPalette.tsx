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
} from "lucide-react"

const componentTypes = [
  { type: "heading", icon: Type, label: "Heading", color: "text-blue-500" },
  { type: "paragraph", icon: AlignLeft, label: "Paragraph", color: "text-gray-500" },
  { type: "image", icon: ImageIcon, label: "Image", color: "text-green-500" },
  { type: "code", icon: Code, label: "Code Block", color: "text-purple-500" },
  { type: "button", icon: MousePointer, label: "Button", color: "text-orange-500" },
  { type: "card", icon: CreditCard, label: "Card", color: "text-pink-500" },
  { type: "grid", icon: Grid3X3, label: "Grid", color: "text-indigo-500" },
  { type: "divider", icon: Minus, label: "Divider", color: "text-gray-400" },
  { type: "list", icon: List, label: "List", color: "text-yellow-500" },
  { type: "quote", icon: Quote, label: "Quote", color: "text-teal-500" },
  { type: "table", icon: Table, label: "Table", color: "text-red-500" },
]

function DraggableComponent({ type, icon: Icon, label, color }: any) {
  const { addComponent } = useEditor()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${type}`,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const handleClick = () => {
    const defaultContent = getDefaultContent(type)
    addComponent({ type, content: defaultContent })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
        hover:bg-accent hover:text-accent-foreground
        ${isDragging ? "opacity-50" : ""}
        border border-transparent hover:border-border
      `}
    >
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function getDefaultContent(type: string) {
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
      return { title: "Card Title", description: "Card description goes here..." }
    case "grid":
      return { items: [{ text: "Grid item 1" }, { text: "Grid item 2" }] }
    case "divider":
      return {}
    case "list":
      return { ordered: false, items: [{ text: "List item 1" }, { text: "List item 2" }] }
    case "quote":
      return { text: "This is a quote..." }
    case "table":
      return {
        headers: ["Column 1", "Column 2"],
        rows: [
          ["Row 1 Col 1", "Row 1 Col 2"],
          ["Row 2 Col 1", "Row 2 Col 2"],
        ],
      }
    default:
      return {}
  }
}

export function ComponentPalette() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      <div className="space-y-2">
        {componentTypes.map((component) => (
          <DraggableComponent key={component.type} {...component} />
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Layouts</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 border border-border rounded hover:bg-accent text-xs">2 Column</button>
          <button className="p-2 border border-border rounded hover:bg-accent text-xs">3 Column</button>
          <button className="p-2 border border-border rounded hover:bg-accent text-xs">Hero</button>
          <button className="p-2 border border-border rounded hover:bg-accent text-xs">CTA</button>
        </div>
      </div>
    </div>
  )
}
