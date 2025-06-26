"use client"

import type React from "react"
import {
  HeadingIcon,
  PenLineIcon as ParagraphIcon,
  ImageIcon,
  ListIcon,
  ListOrderedIcon as OrderedListIcon,
  BoldIcon,
  ItalicIcon,
  CodeIcon as CodeIconLucide,
  CodeIcon as CodeBlockIcon,
  QuoteIcon,
  RectangleHorizontalIcon as HorizontalRuleIcon,
  TableIcon,
  LayoutGrid,
  MousePointer,
  CreditCard,
  AlertTriangle,
  Share2,
  CheckSquare,
  Hourglass,
  Columns,
  ChevronDownSquare,
  LogIn,
  BarChart3,
  ShoppingCart,
  Star,
  ImagePlay,
  FileWarning,
} from "lucide-react"

import { useDraggable } from "@dnd-kit/core"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent, HtmlBlockContent } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"

// --- Sample TailGrids-inspired HTML Snippets ---
// These are placeholders. In a real scenario, these would be the actual TailGrids HTML.
const sampleTailGridsSnippets: Record<string, { label: string; html: string }> = {
  // Existing examples (can be kept or moved into new categories)
  tgButtonPrimary: {
    label: "TG Primary Button",
    html: `<button class="inline-block rounded bg-blue-600 px-7 py-3 text-sm font-medium text-white hover:bg-blue-700">Primary Button</button>`,
  },
  tgAlertInfo: {
    label: "TG Info Alert",
    html: `<div class="mb-3 inline-flex w-full items-center rounded-lg bg-blue-100 px-6 py-5 text-base text-blue-700 dark:bg-blue-900 dark:text-blue-50" role="alert"><span class="mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg></span>A TailGrids-inspired info alert!</div>`,
  },
  tgCardSimple: {
    label: "TG Simple Card",
    html: `<div class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 max-w-sm"><h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Card title</h5><p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">Some quick example text.</p><button type="button" class="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium text-white hover:bg-blue-700">Button</button></div>`,
  },

  // New TailGrids Examples
  tgAccordion1: {
    label: "TG Accordion Item",
    html: `<div class="border border-gray-200 rounded-md mb-2 dark:border-neutral-700"><h2 class="mb-0"><button class="group relative flex w-full items-center rounded-md border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white" type="button">Accordion Title<span class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"></span></button></h2><div class="px-5 py-4 text-neutral-600 dark:text-neutral-300">Accordion content placeholder.</div></div>`,
  },
  tg404Page: {
    label: "TG 404 Error Page",
    html: `<div class="bg-blue-600 text-white p-10 rounded-lg shadow-xl text-center max-w-lg mx-auto my-10 relative overflow-hidden">
       <div class="absolute top-5 left-5 grid grid-cols-3 gap-1 opacity-30">
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
       </div>
       <div class="absolute bottom-5 right-5 grid grid-cols-3 gap-1 opacity-30">
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
         <span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-1.5 h-1.5 bg-white rounded-full"></span>
       </div>
       <h1 class="text-7xl md:text-8xl font-bold mb-4">404</h1>
       <p class="text-xl md:text-2xl font-semibold mb-2">Here Is Some Problem</p>
       <p class="text-md md:text-lg mb-8">The page you are looking for it maybe deleted</p>
       <a href="#" class="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
         Go To Home
       </a>
     </div>`,
  },
  tgSignInForm: {
    label: "TG Sign In Form",
    html: `<div class="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-neutral-800"><h1 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">Sign In</h1><form class="mt-6"><div><label for="username" class="block text-sm text-gray-800 dark:text-gray-200">Username</label><input type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" /></div><div class="mt-4"><div class="flex items-center justify-between"><label for="password" class="block text-sm text-gray-800 dark:text-gray-200">Password</label><a href="#" class="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</a></div><input type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-neutral-800 dark:text-gray-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" /></div><div class="mt-6"><button class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Sign In</button></div></form></div>`,
  },
  tgHero1: {
    label: "TG Hero Section",
    html: `<div class="bg-gray-100 dark:bg-neutral-800 py-20 px-6 text-center"><h1 class="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">Build Your Next Idea Faster</h1><p class="text-lg text-gray-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">Beautifully designed, expertly crafted components and templates, built by Tailwind CSS.</p><div><a href="#" class="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition mr-2 mb-2 md:mb-0">Get Started</a><a href="#" class="bg-transparent text-blue-600 font-semibold px-8 py-3 rounded-md border border-blue-600 hover:bg-blue-50 dark:hover:bg-neutral-700 transition">Learn More</a></div></div>`,
  },
  tgProductGridItem: {
    label: "TG Product Grid Item",
    html: `<div class="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden"><img src="/placeholder.svg?height=200&width=300" alt="Product Image" class="w-full h-48 object-cover"><div class="p-4"><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Product Name</h3><p class="text-gray-600 dark:text-neutral-300 text-sm mb-3">Short product description goes here.</p><div class="flex items-center justify-between"><span class="font-bold text-gray-800 dark:text-white">$29.99</span><button class="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">Add to Cart</button></div></div></div>`,
  },
  tgDashboardChartPlaceholder: {
    label: "TG Dashboard Chart",
    html: `<div class="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"><h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-4">Sales Over Time</h3><div class="bg-gray-200 dark:bg-neutral-700 h-64 flex items-center justify-center rounded"><span class="text-gray-500 dark:text-neutral-400">Chart Placeholder</span></div></div>`,
  },
}
// --- End Sample Snippets ---

const iconMap: { [key: string]: React.ElementType } = {
  Heading: HeadingIcon,
  Paragraph: ParagraphIcon,
  Image: ImageIcon,
  List: ListIcon,
  OrderedList: OrderedListIcon,
  Bold: BoldIcon,
  Italic: ItalicIcon,
  Code: CodeIconLucide, // For inline code, if needed as a block
  CodeBlock: CodeBlockIcon,
  Quote: QuoteIcon,
  HorizontalRule: HorizontalRuleIcon,
  Table: TableIcon,
  LayoutGrid: LayoutGrid,
  MousePointer: MousePointer,
  CreditCard: CreditCard,
  AlertTriangle: AlertTriangle,
  Share2: Share2, // Mermaid
  CheckSquare: CheckSquare, // TaskList
  Hourglass: Hourglass, // Spacer
  Columns: Columns,
  Accordion: ChevronDownSquare,
  SignIn: LogIn,
  Chart: BarChart3,
  ShoppingCart: ShoppingCart,
  Testimonial: Star,
  Hero: ImagePlay,
  ErrorPage: FileWarning,
}

export const componentCategories = [
  {
    name: "Text Elements",
    components: [
      {
        type: "paragraph" as MarkdownComponent["type"],
        icon: "Paragraph",
        label: "Paragraph",
        color: "text-gray-500 dark:text-gray-400",
      },
      {
        type: "heading" as MarkdownComponent["type"],
        icon: "Heading",
        label: "Heading",
        color: "text-blue-500 dark:text-blue-400",
      },
      {
        type: "blockquote" as MarkdownComponent["type"],
        icon: "Quote",
        label: "Blockquote",
        color: "text-cyan-500 dark:text-cyan-400",
      },
      {
        type: "list" as MarkdownComponent["type"],
        icon: "List",
        label: "Bullet List",
        color: "text-yellow-500 dark:text-yellow-400",
      },
      {
        type: "orderedList" as MarkdownComponent["type"],
        icon: "OrderedList",
        label: "Ordered List",
        color: "text-yellow-600 dark:text-yellow-500",
      },
      {
        type: "taskList" as MarkdownComponent["type"],
        icon: "CheckSquare",
        label: "Task List",
        color: "text-green-600 dark:text-green-500",
      },
      {
        type: "code" as MarkdownComponent["type"],
        icon: "CodeBlock",
        label: "Code Block",
        color: "text-purple-500 dark:text-purple-400",
      },
      {
        type: "divider" as MarkdownComponent["type"],
        icon: "HorizontalRule",
        label: "Divider",
        color: "text-gray-400 dark:text-gray-500",
      },
    ],
  },
  {
    name: "Media & Embeds",
    components: [
      {
        type: "image" as MarkdownComponent["type"],
        icon: "Image",
        label: "Image",
        color: "text-green-500 dark:text-green-400",
      },
      {
        type: "mermaid" as MarkdownComponent["type"],
        icon: "Share2",
        label: "Mermaid Diagram",
        color: "text-sky-500 dark:text-sky-400",
      },
    ],
  },
  {
    name: "Interactive & UI",
    components: [
      {
        type: "button" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Button (Basic)",
        color: "text-orange-500 dark:text-orange-400",
      },
      {
        type: "card" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Card (Basic)",
        color: "text-pink-500 dark:text-pink-400",
      },
      {
        type: "alert" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Alert/Callout (Basic)",
        color: "text-yellow-700 dark:text-yellow-600",
      },
    ],
  },
  {
    name: "Layout Elements",
    components: [
      {
        type: "columns" as MarkdownComponent["type"],
        icon: "Columns",
        label: "2 Columns",
        color: "text-teal-500 dark:text-teal-400",
      },
      {
        type: "spacer" as MarkdownComponent["type"],
        icon: "Hourglass",
        label: "Spacer",
        color: "text-gray-600 dark:text-gray-500",
      },
    ],
  },
  {
    name: "Data",
    components: [
      {
        type: "table" as MarkdownComponent["type"],
        icon: "Table",
        label: "Table",
        color: "text-red-600 dark:text-red-500",
      },
    ],
  },
  // --- TailGrids Categories Start ---
  {
    name: "TG - Core Components",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Accordion",
        label: "Accordion (TG)",
        color: "text-indigo-500",
        htmlBlockKey: "tgAccordion1",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Primary Button (TG)",
        color: "text-indigo-500",
        htmlBlockKey: "tgButtonPrimary",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Info Alert (TG)",
        color: "text-indigo-500",
        htmlBlockKey: "tgAlertInfo",
      },
      // Add more TG Core Component examples here...
    ],
  },
  {
    name: "TG - Application UI",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "ErrorPage",
        label: "404 Error Page (TG)",
        color: "text-rose-500",
        htmlBlockKey: "tg404Page",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "SignIn",
        label: "Sign In Form (TG)",
        color: "text-rose-500",
        htmlBlockKey: "tgSignInForm",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Simple Card (TG)",
        color: "text-rose-500",
        htmlBlockKey: "tgCardSimple",
      },
      // Add more TG Application UI examples here...
    ],
  },
  {
    name: "TG - Marketing UI",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Hero",
        label: "Hero Section (TG)",
        color: "text-lime-500",
        htmlBlockKey: "tgHero1",
      },
      // Add more TG Marketing UI examples here...
    ],
  },
  {
    name: "TG - E-Commerce",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Product Grid Item (TG)",
        color: "text-amber-500",
        htmlBlockKey: "tgProductGridItem",
      },
      // Add more TG E-Commerce examples here...
    ],
  },
  {
    name: "TG - Dashboard",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Chart",
        label: "Dashboard Chart (TG)",
        color: "text-cyan-500",
        htmlBlockKey: "tgDashboardChartPlaceholder",
      },
      // Add more TG Dashboard examples here...
    ],
  },
  // --- TailGrids Categories End ---
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
      console.warn(`getDefaultContent: Unknown component type "${type}" or missing htmlBlockKey for htmlBlock.`)
      return {}
  }
}

interface DraggablePaletteItemProps {
  type: MarkdownComponent["type"]
  icon: string // Icon name from iconMap
  label: string
  color: string
  htmlBlockKey?: string
}

function DraggablePaletteItem({ type, icon: iconName, label, color, htmlBlockKey }: DraggablePaletteItemProps) {
  const { addComponent } = useEditor()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}-${htmlBlockKey || label.replace(/\s+/g, "-")}`, // Ensure unique ID
    data: { type, htmlBlockKey },
  })

  const IconComponent = iconMap[iconName] || LayoutGrid // Fallback icon

  const handleClick = () => {
    const content = getDefaultContent(type, htmlBlockKey)
    // Ensure content is not undefined or empty for non-special types
    if (
      type === "divider" ||
      type === "spacer" ||
      (type === "htmlBlock" && htmlBlockKey) ||
      Object.keys(content).length > 0
    ) {
      addComponent({ type, content })
    } else {
      console.warn(
        `Skipping addComponent for ${type} (label: ${label}) due to empty/invalid default content. htmlBlockKey: ${htmlBlockKey}`,
      )
    }
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
      <IconComponent className={`w-5 h-5 ${color} flex-shrink-0`} />
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
                  <DraggablePaletteItem
                    key={`${component.type}-${component.label.replace(/\s+/g, "-")}`} // Ensure unique key
                    type={component.type}
                    icon={component.icon}
                    label={component.label}
                    color={component.color}
                    htmlBlockKey={(component as any).htmlBlockKey}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
