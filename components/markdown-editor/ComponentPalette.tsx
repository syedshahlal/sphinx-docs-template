"use client"

import type React from "react"

import { useDraggable } from "@dnd-kit/core"
import { useEditor } from "./EditorContext"
import {
  Type,
  AlignLeft,
  ImageIcon,
  Code,
  MousePointer,
  CreditCard,
  Minus,
  List,
  Quote,
  Table,
  AlertTriangle,
  Share2,
  ListOrdered,
  CheckSquare,
  Hourglass,
  Columns,
} from "lucide-react"
import type { MarkdownComponent } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"

const componentCategories = [
  {
    name: "Text Elements",
    components: [
      { type: "paragraph", icon: AlignLeft, label: "Paragraph", color: "text-gray-500" },
      { type: "heading", icon: Type, label: "Heading", color: "text-blue-500" },
      { type: "blockquote", icon: Quote, label: "Blockquote", color: "text-cyan-500" },
      { type: "list", icon: List, label: "Bullet List", color: "text-yellow-500" },
      { type: "orderedList", icon: ListOrdered, label: "Ordered List", color: "text-yellow-600" },
      { type: "taskList", icon: CheckSquare, label: "Task List", color: "text-green-600" },
      { type: "code", icon: Code, label: "Code Block", color: "text-purple-500" },
      { type: "divider", icon: Minus, label: "Divider", color: "text-gray-400" },
    ],
  },
  {
    name: "Media & Embeds",
    components: [
      { type: "image", icon: ImageIcon, label: "Image", color: "text-green-500" },
      // { type: "video", icon: Youtube, label: "Video", color: "text-red-500" }, // Needs custom Tiptap node
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
    components: [
      // { type: "grid", icon: Grid3X3, label: "Simple Grid", color: "text-indigo-500" }, // Grid is complex, use columns for now
      { type: "columns", icon: Columns, label: "2 Columns", color: "text-teal-500" },
      { type: "spacer", icon: Hourglass, label: "Spacer", color: "text-gray-600" },
    ],
  },
  {
    name: "Data",
    components: [{ type: "table", icon: Table, label: "Table", color: "text-red-600" }],
  },
]

export function getDefaultContent(type: MarkdownComponent["type"]): any {
  switch (type) {
    case "heading":
      return { level: 1, text: "New Heading" }
    case "paragraph":
      return { text: "Start writing your paragraph here..." }
    case "image":
      return { src: "/placeholder.svg?height=200&width=400", alt: "Placeholder image", caption: "" }
    case "code":
      return { language: "javascript", code: 'console.log("Hello World!");' }
    case "button":
      return { text: "Click Me", link: "#", variant: "default", size: "default" }
    case "card":
      return { title: "Card Title", description: "A brief description for the card.", imageUrl: "" }
    case "divider":
      return {}
    case "list":
      return { items: ["List item 1", "List item 2"] }
    case "orderedList":
      return { items: ["First item", "Second item"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "To-do item 1", checked: false },
          { text: "Completed item", checked: true },
        ],
      }
    case "blockquote":
      return { text: "A profound quote or important note." }
    case "alert":
      return { type: "info", text: "This is an informational message." }
    case "spacer":
      return { height: "20px" }
    case "columns":
      return { column1Text: "Content for column 1.", column2Text: "Content for column 2." }
    case "mermaid":
      return {
        code: "graph TD;\n  A[Start] --> B(Process);\n  B --> C{Decision};\n  C -->|Yes| D[End];\n  C -->|No| B;",
      }
    case "table":
      return {
        headers: ["Column A", "Column B"],
        rows: [
          ["Row 1 Cell 1", "Row 1 Cell 2"],
          ["Row 2 Cell 1", "Row 2 Cell 2"],
        ],
      }
    // case "video": return { src: "", caption: "" };
    default:
      return {}
  }
}

interface DraggablePaletteItemProps {
  type: MarkdownComponent["type"]
  icon: React.ElementType
  label: string
  color: string
}

function DraggablePaletteItem({ type, icon: Icon, label, color }: DraggablePaletteItemProps) {
  const { addComponent } = useEditor()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type }, // Pass type for dragEnd handler
  })

  const handleClick = () => {
    const content = getDefaultContent(type)
    addComponent({ type, content }) // Appends to the end by default
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={handleClick}
      className={`
        flex items-center space-x-3 p-2.5 rounded-md cursor-grab transition-all
        hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring
        ${isDragging ? "opacity-60 shadow-lg scale-105 bg-accent" : ""}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick()
      }}
      title={`Add ${label}`}
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export function ComponentPalette() {
  return (
    <div className="p-3 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 px-1 text-foreground">Elements</h3>
      <ScrollArea className="flex-1 -mr-2 pr-2">
        <div className="space-y-5">
          {componentCategories.map((category) => (
            <div key={category.name}>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 px-1 uppercase tracking-wider">
                {category.name}
              </h4>
              <div className="space-y-1.5">
                {category.components.map((component) => (
                  <DraggablePaletteItem key={component.type} {...component} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
