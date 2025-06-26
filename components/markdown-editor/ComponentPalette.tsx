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
  LayoutGrid,
} from "lucide-react"
import type { MarkdownComponent, HtmlBlockContent } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"

// --- Sample TailGrids-inspired HTML Snippets ---
const sampleTailGridsSnippets: Record<string, { label: string; html: string }> = {
  tgButton: {
    label: "TG Primary Button",
    html: `<button class="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.1)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">TailGrids Style Button</button>`,
  },
  tgAlert: {
    label: "TG Info Alert",
    html: `<div class="mb-3 inline-flex w-full items-center rounded-lg bg-primary-100 px-6 py-5 text-base text-primary-700 dark:bg-blue-900 dark:text-primary-50" role="alert"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg></span>A TailGrids-inspired info alert!</div>`,
  },
  tgCard: {
    label: "TG Simple Card",
    html: `<div class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 max-w-sm"><h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Card title</h5><p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">Some quick example text to build on the card title and make up the bulk of the card's content.</p><button type="button" class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.1)]">Button</button></div>`,
  },
}
// --- End Sample Snippets ---

const componentCategories = [
  {
    name: "Text Elements",
    components: [
      { type: "paragraph", icon: AlignLeft, label: "Paragraph", color: "text-gray-500 dark:text-gray-400" },
      { type: "heading", icon: Type, label: "Heading", color: "text-blue-500 dark:text-blue-400" },
      { type: "blockquote", icon: Quote, label: "Blockquote", color: "text-cyan-500 dark:text-cyan-400" },
      { type: "list", icon: List, label: "Bullet List", color: "text-yellow-500 dark:text-yellow-400" },
      { type: "orderedList", icon: ListOrdered, label: "Ordered List", color: "text-yellow-600 dark:text-yellow-500" },
      { type: "taskList", icon: CheckSquare, label: "Task List", color: "text-green-600 dark:text-green-500" },
      { type: "code", icon: Code, label: "Code Block", color: "text-purple-500 dark:text-purple-400" },
      { type: "divider", icon: Minus, label: "Divider", color: "text-gray-400 dark:text-gray-500" },
    ],
  },
  {
    name: "Media & Embeds",
    components: [
      { type: "image", icon: ImageIcon, label: "Image", color: "text-green-500 dark:text-green-400" },
      { type: "mermaid", icon: Share2, label: "Mermaid Diagram", color: "text-sky-500 dark:text-sky-400" },
    ],
  },
  {
    name: "Interactive & UI",
    components: [
      { type: "button", icon: MousePointer, label: "Button", color: "text-orange-500 dark:text-orange-400" },
      { type: "card", icon: CreditCard, label: "Card", color: "text-pink-500 dark:text-pink-400" },
      { type: "alert", icon: AlertTriangle, label: "Alert/Callout", color: "text-yellow-700 dark:text-yellow-600" },
    ],
  },
  {
    name: "Layout Elements",
    components: [
      { type: "columns", icon: Columns, label: "2 Columns", color: "text-teal-500 dark:text-teal-400" },
      { type: "spacer", icon: Hourglass, label: "Spacer", color: "text-gray-600 dark:text-gray-500" },
    ],
  },
  {
    name: "Data",
    components: [{ type: "table", icon: Table, label: "Table", color: "text-red-600 dark:text-red-500" }],
  },
  {
    name: "HTML Blocks (TailGrids Inspired)",
    components: Object.entries(sampleTailGridsSnippets).map(([key, value]) => ({
      type: "htmlBlock" as MarkdownComponent["type"], // Cast to satisfy type, handled by getDefaultContent
      icon: LayoutGrid,
      label: value.label,
      color: "text-indigo-500 dark:text-indigo-400",
      htmlBlockKey: key, // Custom property to identify the HTML block
    })),
  },
]

export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: string): any {
  if (type === "htmlBlock" && htmlBlockKey && sampleTailGridsSnippets[htmlBlockKey]) {
    return {
      htmlContent: sampleTailGridsSnippets[htmlBlockKey].html,
      name: sampleTailGridsSnippets[htmlBlockKey].label,
    } as HtmlBlockContent
  }
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
    default:
      return {}
  }
}

interface DraggablePaletteItemProps {
  type: MarkdownComponent["type"]
  icon: React.ElementType
  label: string
  color: string
  htmlBlockKey?: string
}

function DraggablePaletteItem({ type, icon: Icon, label, color, htmlBlockKey }: DraggablePaletteItemProps) {
  const { addComponent } = useEditor()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}-${htmlBlockKey || label}`, // Ensure unique ID for HTML blocks
    data: { type, htmlBlockKey }, // Pass type and key for dragEnd handler
  })

  const handleClick = () => {
    const content = getDefaultContent(type, htmlBlockKey)
    addComponent({ type, content })
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
        dark:hover:bg-neutral-700
        ${isDragging ? "opacity-60 shadow-lg scale-105 bg-accent dark:bg-neutral-700" : ""}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick()
      }}
      title={`Add ${label}`}
    >
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <span className="text-sm font-medium text-foreground dark:text-neutral-300">{label}</span>
    </div>
  )
}

export function ComponentPalette() {
  return (
    <div className="p-3 h-full flex flex-col bg-background dark:bg-neutral-800 border-r border-border dark:border-neutral-700">
      <h3 className="text-lg font-semibold mb-4 px-1 text-foreground dark:text-neutral-100">Elements</h3>
      <ScrollArea className="flex-1 -mr-2 pr-2">
        <div className="space-y-5">
          {componentCategories.map((category) => (
            <div key={category.name}>
              <h4 className="text-xs font-semibold text-muted-foreground dark:text-neutral-400 mb-2 px-1 uppercase tracking-wider">
                {category.name}
              </h4>
              <div className="space-y-1.5">
                {category.components.map((component) => (
                  <DraggablePaletteItem key={`${component.type}-${component.label}`} {...component} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
