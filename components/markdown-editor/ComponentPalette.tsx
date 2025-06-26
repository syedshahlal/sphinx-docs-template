"use client"

import type React from "react"
import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Type,
  ImageIcon,
  Code,
  MousePointer,
  CreditCard,
  Minus,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  AlertTriangle,
  Space,
  Columns,
  Table,
  GitBranch,
  FileCode,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// Sample TailGrids HTML snippets
const sampleTailGridsSnippets = {
  // Buttons
  primaryButton: `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Primary Button</button>`,
  secondaryButton: `<button class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Secondary Button</button>`,
  outlineButton: `<button class="inline-flex items-center justify-center rounded-md border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Outline Button</button>`,

  // Alerts
  infoAlert: `<div class="rounded-md bg-blue-50 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-blue-800">Information</h3><div class="mt-2 text-sm text-blue-700"><p>This is an informational alert message.</p></div></div></div></div>`,
  warningAlert: `<div class="rounded-md bg-yellow-50 p-4"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-yellow-800">Warning</h3><div class="mt-2 text-sm text-yellow-700"><p>This is a warning alert message.</p></div></div></div></div>`,

  // Cards
  basicCard: `<div class="overflow-hidden rounded-lg bg-white shadow"><div class="px-4 py-5 sm:p-6"><h3 class="text-lg font-medium leading-6 text-gray-900">Card Title</h3><div class="mt-2 max-w-xl text-sm text-gray-500"><p>This is the card description that provides more details about the content.</p></div><div class="mt-3"><button class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700">Action</button></div></div></div>`,
  imageCard: `<div class="overflow-hidden rounded-lg bg-white shadow"><img class="h-48 w-full object-cover" src="/placeholder.svg?height=200&width=400" alt="Card image"><div class="px-4 py-5 sm:p-6"><h3 class="text-lg font-medium leading-6 text-gray-900">Image Card</h3><div class="mt-2 max-w-xl text-sm text-gray-500"><p>Card with image header and content below.</p></div></div></div>`,

  // Forms
  contactForm: `<form class="space-y-6"><div><label for="name" class="block text-sm font-medium text-gray-700">Name</label><input type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></div><div><label for="email" class="block text-sm font-medium text-gray-700">Email</label><input type="email" name="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></div><div><label for="message" class="block text-sm font-medium text-gray-700">Message</label><textarea name="message" id="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea></div><div><button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Send Message</button></div></form>`,

  // Navigation
  navbar: `<nav class="bg-white shadow"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex flex-shrink-0 items-center"><img class="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo"></div><div class="hidden sm:ml-6 sm:flex sm:space-x-8"><a href="#" class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</a><a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</a><a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Services</a><a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Contact</a></div></div></div></div></nav>`,

  // Marketing
  heroSection: `<div class="bg-white"><div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8"><div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0"><div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left"><h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Boost your productivity.<br>Start using our app today.</h2><p class="mt-6 text-lg leading-8 text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p><div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"><a href="#" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a><a href="#" class="text-sm font-semibold leading-6 text-white">Learn more →</a></div></div></div></div></div>`,

  // E-commerce
  productCard: `<div class="group relative"><div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"><img src="/placeholder.svg?height=320&width=320" alt="Product image" class="h-full w-full object-cover object-center lg:h-full lg:w-full"></div><div class="mt-4 flex justify-between"><div><h3 class="text-sm text-gray-700"><a href="#"><span aria-hidden="true" class="absolute inset-0"></span>Product Name</a></h3><p class="mt-1 text-sm text-gray-500">Color, Size</p></div><p class="text-sm font-medium text-gray-900">$99</p></div></div>`,

  // Dashboard
  statsCard: `<div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"><dt class="truncate text-sm font-medium text-gray-500">Total Revenue</dt><dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$405,091.00</dd></div>`,

  // Application UI
  userProfile: `<div class="flex items-center space-x-4"><img class="h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="User avatar"><div class="min-w-0 flex-1"><p class="truncate text-sm font-medium text-gray-900">John Doe</p><p class="truncate text-sm text-gray-500">john@example.com</p></div></div>`,
}

// Component categories with their respective components
export const componentCategories = [
  {
    name: "Basic Components",
    icon: Type,
    components: [
      { type: "heading", name: "Heading", icon: Type, description: "Add headings (H1-H6)" },
      { type: "paragraph", name: "Paragraph", icon: Type, description: "Add text paragraphs" },
      { type: "image", name: "Image", icon: ImageIcon, description: "Add images with captions" },
      { type: "button", name: "Button", icon: MousePointer, description: "Add interactive buttons" },
      { type: "divider", name: "Divider", icon: Minus, description: "Add horizontal dividers" },
      { type: "spacer", name: "Spacer", icon: Space, description: "Add vertical spacing" },
    ],
  },
  {
    name: "Content Components",
    icon: FileCode,
    components: [
      { type: "code", name: "Code Block", icon: Code, description: "Add syntax-highlighted code" },
      { type: "blockquote", name: "Quote", icon: Quote, description: "Add blockquotes" },
      { type: "list", name: "Bullet List", icon: List, description: "Add unordered lists" },
      { type: "orderedList", name: "Numbered List", icon: ListOrdered, description: "Add ordered lists" },
      { type: "taskList", name: "Task List", icon: CheckSquare, description: "Add task/todo lists" },
      { type: "table", name: "Table", icon: Table, description: "Add data tables" },
    ],
  },
  {
    name: "Layout Components",
    icon: Columns,
    components: [
      { type: "card", name: "Card", icon: CreditCard, description: "Add content cards" },
      { type: "columns", name: "Columns", icon: Columns, description: "Add multi-column layouts" },
      { type: "alert", name: "Alert", icon: AlertTriangle, description: "Add alert messages" },
    ],
  },
  {
    name: "Advanced Components",
    icon: GitBranch,
    components: [
      { type: "mermaid", name: "Mermaid Diagram", icon: GitBranch, description: "Add flowcharts and diagrams" },
      { type: "htmlBlock", name: "HTML Block", icon: FileCode, description: "Add custom HTML content" },
    ],
  },
  {
    name: "TG - Buttons",
    icon: MousePointer,
    components: [
      {
        type: "htmlBlock",
        name: "Primary Button",
        icon: MousePointer,
        description: "Blue primary button",
        htmlBlockKey: "primaryButton",
      },
      {
        type: "htmlBlock",
        name: "Secondary Button",
        icon: MousePointer,
        description: "Gray secondary button",
        htmlBlockKey: "secondaryButton",
      },
      {
        type: "htmlBlock",
        name: "Outline Button",
        icon: MousePointer,
        description: "Outlined button style",
        htmlBlockKey: "outlineButton",
      },
    ],
  },
  {
    name: "TG - Alerts",
    icon: AlertTriangle,
    components: [
      {
        type: "htmlBlock",
        name: "Info Alert",
        icon: AlertTriangle,
        description: "Blue informational alert",
        htmlBlockKey: "infoAlert",
      },
      {
        type: "htmlBlock",
        name: "Warning Alert",
        icon: AlertTriangle,
        description: "Yellow warning alert",
        htmlBlockKey: "warningAlert",
      },
    ],
  },
  {
    name: "TG - Cards",
    icon: CreditCard,
    components: [
      {
        type: "htmlBlock",
        name: "Basic Card",
        icon: CreditCard,
        description: "Simple content card",
        htmlBlockKey: "basicCard",
      },
      {
        type: "htmlBlock",
        name: "Image Card",
        icon: CreditCard,
        description: "Card with image header",
        htmlBlockKey: "imageCard",
      },
    ],
  },
  {
    name: "TG - Forms",
    icon: FileCode,
    components: [
      {
        type: "htmlBlock",
        name: "Contact Form",
        icon: FileCode,
        description: "Complete contact form",
        htmlBlockKey: "contactForm",
      },
    ],
  },
  {
    name: "TG - Navigation",
    icon: List,
    components: [
      {
        type: "htmlBlock",
        name: "Navigation Bar",
        icon: List,
        description: "Horizontal navigation menu",
        htmlBlockKey: "navbar",
      },
    ],
  },
  {
    name: "TG - Marketing",
    icon: Type,
    components: [
      {
        type: "htmlBlock",
        name: "Hero Section",
        icon: Type,
        description: "Marketing hero section",
        htmlBlockKey: "heroSection",
      },
    ],
  },
  {
    name: "TG - E-Commerce",
    icon: CreditCard,
    components: [
      {
        type: "htmlBlock",
        name: "Product Card",
        icon: CreditCard,
        description: "E-commerce product display",
        htmlBlockKey: "productCard",
      },
    ],
  },
  {
    name: "TG - Dashboard",
    icon: Table,
    components: [
      {
        type: "htmlBlock",
        name: "Stats Card",
        icon: Table,
        description: "Dashboard statistics card",
        htmlBlockKey: "statsCard",
      },
    ],
  },
  {
    name: "TG - Application UI",
    icon: FileCode,
    components: [
      {
        type: "htmlBlock",
        name: "User Profile",
        icon: FileCode,
        description: "User profile component",
        htmlBlockKey: "userProfile",
      },
    ],
  },
]

// Get default content for each component type
export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: string): any {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: 2 }
    case "paragraph":
      return { text: "This is a new paragraph. Click to edit this text." }
    case "image":
      return {
        src: "/placeholder.svg?height=200&width=400",
        alt: "Sample image",
        caption: "",
      }
    case "button":
      return {
        text: "Click me",
        variant: "default",
        size: "default",
        link: "",
      }
    case "card":
      return {
        title: "Card Title",
        description: "This is a card description that provides more details about the content.",
        imageUrl: "",
      }
    case "divider":
      return {}
    case "list":
      return { items: ["First item", "Second item", "Third item"] }
    case "orderedList":
      return { items: ["First item", "Second item", "Third item"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Complete this task", checked: false },
          { text: "This task is done", checked: true },
          { text: "Another pending task", checked: false },
        ],
      }
    case "blockquote":
      return { text: "This is a quote that provides insight or emphasis to your content." }
    case "alert":
      return { type: "info", text: "This is an informational alert message." }
    case "code":
      return {
        code: "// Your code here\nconsole.log('Hello, World!');",
        language: "javascript",
      }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "This is the content for the first column. You can add any text or information here.",
        column2Text: "This is the content for the second column. You can add different content here.",
      }
    case "table":
      return {
        headers: ["Header 1", "Header 2", "Header 3"],
        rows: [
          ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
          ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
        ],
      }
    case "mermaid":
      return {
        code: "graph TD;\n    A[Start] --> B[Process];\n    B --> C[Decision];\n    C -->|Yes| D[End];\n    C -->|No| B;",
      }
    case "htmlBlock":
      if (htmlBlockKey && sampleTailGridsSnippets[htmlBlockKey as keyof typeof sampleTailGridsSnippets]) {
        return {
          htmlContent: sampleTailGridsSnippets[htmlBlockKey as keyof typeof sampleTailGridsSnippets],
          name: htmlBlockKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
        } as HtmlBlockContent
      }
      return {
        htmlContent:
          "<div class='p-4 border border-dashed border-gray-300 rounded-md text-center'>Custom HTML content goes here</div>",
        name: "Custom HTML Block",
      } as HtmlBlockContent
    default:
      return {}
  }
}

// Draggable component item
interface DraggableComponentProps {
  component: {
    type: MarkdownComponent["type"]
    name: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    htmlBlockKey?: string
  }
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${component.name.toLowerCase().replace(/\s+/g, "-")}`,
    data: {
      type: component.type,
      htmlBlockKey: component.htmlBlockKey,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  const IconComponent = component.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center space-x-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-slate-300 hover:shadow-md cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 shadow-lg scale-105",
      )}
    >
      <div className="flex-shrink-0">
        <IconComponent className="h-5 w-5 text-slate-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{component.name}</p>
        <p className="text-xs text-slate-500 truncate">{component.description}</p>
      </div>
    </div>
  )
}

// Main component palette
export function ComponentPalette() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Basic Components"])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">Drag components to the canvas</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {componentCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.name)
            const IconComponent = category.icon

            return (
              <Collapsible key={category.name} open={isExpanded} onOpenChange={() => toggleCategory(category.name)}>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-muted/70 transition-colors bg-slate-100">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700">
                      {category.components.length}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 space-y-2">
                  {category.components.map((component) => (
                    <DraggableComponent key={`${category.name}-${component.name}`} component={component} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

// Named export for compatibility
export { ComponentPalette as default }
