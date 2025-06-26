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

const componentCategories = [
  {
    name: "Text Elements",
    components: [
      { type: "heading", icon: Type, label: "Heading", color: "text-blue-500" },
      // Sub-options for headings can be handled in PropertiesPanel or via toolbar
      // { type: "heading1", icon: Heading1, label: "Heading 1", color: "text-blue-500" },
      // { type: "heading2", icon: Heading2, label: "Heading 2", color: "text-blue-500" },
      // { type: "heading3", icon: Heading3, label: "Heading 3", color: "text-blue-500" },
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
      { type: "video", icon: Youtube, label: "Video", color: "text-red-500" }, // Placeholder, needs Tiptap node
      { type: "mermaid", icon: Share2, label: "Mermaid Diagram", color: "text-sky-500" },
    ],
  },
  {
    name: "Interactive & UI",
    components: [
      { type: "button", icon: MousePointer, label: "Button", color: "text-orange-500" },
      { type: "card", icon: CreditCard, label: "Card", color: "text-pink-500" }, // Simple card
      { type: "alert", icon: AlertTriangle, label: "Alert/Callout", color: "text-yellow-700" },
    ],
  },
  {
    name: "Layout Elements",
    components: [
      { type: "grid", icon: Grid3X3, label: "Simple Grid", color: "text-indigo-500" }, // Simple grid
      // More complex layouts like columns, tabs, accordions would require dedicated Tiptap nodes & UI
      // { type: "columnsTwo", icon: Columns, label: "2 Columns", color: "text-teal-500" },
      // { type: "tabs", icon: FolderTabs, label: "Tabs", color: "text-lime-500" },
      // { type: "accordion", icon: ChevronDownSquare, label: "Accordion", color: "text-emerald-500" },
    ],
  },
  {
    name: "Data",
    components: [{ type: "table", icon: Table, label: "Table", color: "text-red-600" }],
  },
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
    // This function is called on click, effectively allowing "click to add"
    const defaultContent = getDefaultContent(type)
    addComponent({ type, content: defaultContent })
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners} // For drag
      {...attributes} // For drag
      onClick={handleClick} // For click/double-click to add
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
      }} // Accessibility for keyboard
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function getDefaultContent(type: string) {
  switch (type) {
    case "heading":
      return { level: 1, text: "New Heading" }
    // case "heading1": return { level: 1, text: "Heading 1" };
    // case "heading2": return { level: 2, text: "Heading 2" };
    // case "heading3": return { level: 3, text: "Heading 3" };
    case "paragraph":
      return { text: "Enter your text here..." }
    case "image":
      return { src: "/placeholder.svg?height=200&width=400", alt: "Image description" }
    case "code":
      return { language: "javascript", code: 'console.log("Hello, World!");' }
    case "button":
      return { text: "Click me", link: "#" }
    case "card": // Simple card
      return { title: "Card Title", description: "Card description..." }
    case "grid": // Simple grid
      return { items: [{ text: "Grid item 1" }, { text: "Grid item 2" }] }
    case "horizontalRule":
      return {}
    case "list": // Bullet list
      return { items: ["List item 1", "List item 2"] } // Simpler structure for Tiptap StarterKit List
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
    case "video": // Placeholder
      return { src: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Video Placeholder" }
    case "alert":
      return { type: "info", text: "This is an informational alert." }
    case "mermaid":
      return { code: "graph TD;\n  A-->B;\n  B-->C;\n  C-->D;" }
    // Add defaults for columns, tabs, accordion if you implement custom Tiptap nodes for them
    default:
      return {}
  }
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
