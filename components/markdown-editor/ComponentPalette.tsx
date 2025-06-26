"use client"

import * as React from "react"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Type, ImageIcon, Plus, AlertCircle, CheckCircle, Menu, Home, ShoppingCart } from "lucide-react"

import type { MarkdownComponent, HtmlBlockContent, ComponentItem } from "./types"

/* ------------------------------------------------------------------------- */
/* TailGrids snippets                                                        */
/* ------------------------------------------------------------------------- */
const tgSnippets = {
  primaryButton: `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
      Primary Button
    </button>`,

  successAlert: `<div class="rounded-md bg-green-50 p-4 border border-green-200">
       <p class="text-sm text-green-800">Success! Your action was completed.</p>
     </div>`,

  productCard: `<div class="bg-white rounded-lg shadow-md overflow-hidden">
       <img class="w-full h-48 object-cover" src="/placeholder.svg?height=200&width=300" alt="">
       <div class="p-4">
         <h3 class="text-lg font-semibold">Product Name</h3>
         <p class="text-gray-600 text-sm mt-1">Product description</p>
         <div class="mt-4 flex items-center justify-between">
           <span class="text-xl font-bold">$99.99</span>
           <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add to Cart</button>
         </div>
       </div>
     </div>`,

  navbar: `<nav class="bg-white shadow">
       <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
         <span class="font-bold text-gray-800">Brand</span>
         <div class="space-x-6 hidden md:block">
           <a class="text-gray-700 hover:text-blue-600" href="#">Home</a>
           <a class="text-gray-700 hover:text-blue-600" href="#">About</a>
           <a class="text-gray-700 hover:text-blue-600" href="#">Services</a>
           <a class="text-gray-700 hover:text-blue-600" href="#">Contact</a>
         </div>
       </div>
     </nav>`,
} as const

/* ------------------------------------------------------------------------- */
/* Helpers – getDefaultContent                                               */
/* ------------------------------------------------------------------------- */
export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: keyof typeof tgSnippets): unknown {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: 2 }
    case "paragraph":
      return { text: "This is a new paragraph." }
    case "image":
      return { src: "/placeholder.svg?height=200&width=400", alt: "placeholder", caption: "" }
    case "button":
      return { text: "Click me", variant: "default", size: "default", link: "#" }
    case "card":
      return { title: "Card title", description: "Card description", imageUrl: "" }
    case "list":
      return { items: ["First", "Second", "Third"] }
    case "table":
      return {
        headers: ["H1", "H2", "H3"],
        rows: [
          ["1 × 1", "1 × 2", "1 × 3"],
          ["2 × 1", "2 × 2", "2 × 3"],
        ],
      }
    case "code":
      return { code: "console.log('hello');", language: "javascript" }
    case "blockquote":
      return { text: "A famous quote.", author: "" }
    case "htmlBlock":
      return {
        html: tgSnippets[htmlBlockKey ?? "primaryButton"] ?? "<div>Custom HTML</div>",
        category: "custom",
      } as HtmlBlockContent
    default:
      return {}
  }
}

/* ------------------------------------------------------------------------- */
/* Component catalogue                                                       */
/* ------------------------------------------------------------------------- */
export const componentCategories = [
  {
    name: "Basic Components",
    icon: Type,
    components: [
      { id: "heading", name: "Heading", icon: Type, type: "heading" as const, content: getDefaultContent("heading") },
      {
        id: "paragraph",
        name: "Paragraph",
        icon: Type,
        type: "paragraph" as const,
        content: getDefaultContent("paragraph"),
      },
      {
        id: "image",
        name: "Image",
        icon: ImageIcon,
        type: "image" as const,
        content: getDefaultContent("image"),
      },
      {
        id: "button",
        name: "Button",
        icon: Plus,
        type: "button" as const,
        content: getDefaultContent("button"),
      },
    ],
  },
  {
    name: "TG - Buttons",
    icon: Plus,
    components: [
      {
        id: "tg-primary",
        name: "Primary Button",
        icon: Plus,
        type: "htmlBlock" as const,
        content: getDefaultContent("htmlBlock", "primaryButton"),
      },
    ],
  },
  {
    name: "TG - Alerts",
    icon: AlertCircle,
    components: [
      {
        id: "tg-success-alert",
        name: "Success Alert",
        icon: CheckCircle,
        type: "htmlBlock" as const,
        content: getDefaultContent("htmlBlock", "successAlert"),
      },
    ],
  },
  {
    name: "TG - Cards",
    icon: ShoppingCart,
    components: [
      {
        id: "tg-product-card",
        name: "Product Card",
        icon: ShoppingCart,
        type: "htmlBlock" as const,
        content: getDefaultContent("htmlBlock", "productCard"),
      },
    ],
  },
  {
    name: "TG - Navigation",
    icon: Menu,
    components: [
      {
        id: "tg-navbar",
        name: "Navbar",
        icon: Home,
        type: "htmlBlock" as const,
        content: getDefaultContent("htmlBlock", "navbar"),
      },
    ],
  },
] satisfies {
  name: string
  icon: React.ComponentType<{ className?: string }>
  components: ComponentItem[]
}[]

/* ------------------------------------------------------------------------- */
/* Draggable palette item                                                    */
/* ------------------------------------------------------------------------- */
function PaletteItem({ item }: { item: ComponentItem }) {
  return (
    <Button
      variant="ghost"
      className="h-auto w-full justify-start gap-2 border border-slate-200 p-3 hover:bg-slate-100"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("application/json", JSON.stringify(item))}
    >
      <item.icon className="h-4 w-4 text-slate-600" />
      <span className="text-sm">{item.name}</span>
    </Button>
  )
}

/* ------------------------------------------------------------------------- */
/* Main palette component                                                    */
/* ------------------------------------------------------------------------- */
interface Props {
  onComponentSelect?: (c: ComponentItem) => void
}

export default function ComponentPalette({ onComponentSelect }: Props) {
  const [open, setOpen] = React.useState<string[]>(["Basic Components"])

  const toggle = (cat: string) =>
    setOpen((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))

  return (
    <div className="h-full bg-sky-50">
      <div className="border-b bg-white px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-800">Components</h2>
        <p className="text-sm text-slate-600">Drag items onto the canvas</p>
      </div>

      <ScrollArea className="h-[calc(100%-64px)] p-4 space-y-4">
        {componentCategories.map((cat) => (
          <Card key={cat.name} className="border-slate-200">
            <CardHeader
              className="flex cursor-pointer items-center justify-between p-3 hover:bg-slate-50"
              onClick={() => toggle(cat.name)}
            >
              <CardTitle className="flex items-center gap-2 text-sm text-slate-700">
                <cat.icon className="h-4 w-4" /> {cat.name}
                <Badge variant="secondary" className="text-xs">
                  {cat.components.length}
                </Badge>
              </CardTitle>
              <span className="text-xs">{open.includes(cat.name) ? "−" : "+"}</span>
            </CardHeader>

            {open.includes(cat.name) && (
              <CardContent className="grid gap-2 p-3 pt-0">
                {cat.components.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onComponentSelect?.(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onComponentSelect?.(item)}
                  >
                    <PaletteItem item={item} />
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}

/** Named export so other modules can do
 *   import { ComponentPalette } from "@/components/markdown-editor/ComponentPalette"
 */
export { ComponentPalette }
