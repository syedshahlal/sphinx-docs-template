"use client"

import type React from "react"
import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  ChevronRight,
  Search,
  Grid3X3,
  BarChart3,
  Star,
  Award,
  Target,
  Layers,
  Layout,
  Info,
  CheckCircle,
  Zap,
  Puzzle,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// Confluence-style macro definitions
const confluenceMacros = {
  infoMacro: `<div class="confluence-macro info-macro bg-[#e3fcef] border border-[#00875a] rounded-lg p-4 my-4">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-6 h-6 bg-[#00875a] rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="text-[#00875a] font-semibold text-sm mb-1">Info</h4>
        <p class="text-[#172b4d] text-sm">This is an info macro. Use it to highlight important information for your readers.</p>
      </div>
    </div>
  </div>`,

  warningMacro: `<div class="confluence-macro warning-macro bg-[#fff4e6] border border-[#ff8b00] rounded-lg p-4 my-4">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-6 h-6 bg-[#ff8b00] rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="text-[#ff8b00] font-semibold text-sm mb-1">Warning</h4>
        <p class="text-[#172b4d] text-sm">This is a warning macro. Use it to alert readers about potential issues or important considerations.</p>
      </div>
    </div>
  </div>`,

  noteMacro: `<div class="confluence-macro note-macro bg-[#f4f5f7] border border-[#dfe1e6] rounded-lg p-4 my-4">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-6 h-6 bg-[#6b778c] rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="text-[#6b778c] font-semibold text-sm mb-1">Note</h4>
        <p class="text-[#172b4d] text-sm">This is a note macro. Use it to add additional context or explanatory information.</p>
      </div>
    </div>
  </div>`,

  tipMacro: `<div class="confluence-macro tip-macro bg-[#e3fcef] border border-[#00875a] rounded-lg p-4 my-4">
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0 w-6 h-6 bg-[#00875a] rounded-full flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="text-[#00875a] font-semibold text-sm mb-1">Tip</h4>
        <p class="text-[#172b4d] text-sm">This is a tip macro. Use it to share helpful hints and best practices with your readers.</p>
      </div>
    </div>
  </div>`,

  codeMacro: `<div class="confluence-macro code-macro bg-[#f4f5f7] border border-[#dfe1e6] rounded-lg overflow-hidden my-4">
    <div class="bg-[#172b4d] px-4 py-2 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4 text-[#b3bac5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        <span class="text-[#b3bac5] text-sm font-medium">JavaScript</span>
      </div>
      <button class="text-[#b3bac5] hover:text-white text-sm">Copy</button>
    </div>
    <div class="p-4">
      <pre class="text-sm text-[#172b4d] font-mono"><code>// Example API call
const response = await fetch('/api/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const users = await response.json();
console.log(users);</code></pre>
    </div>
  </div>`,

  expandMacro: `<div class="confluence-macro expand-macro border border-[#dfe1e6] rounded-lg my-4">
    <div class="bg-[#f4f5f7] px-4 py-3 border-b border-[#dfe1e6] cursor-pointer hover:bg-[#ebecf0] transition-colors">
      <div class="flex items-center justify-between">
        <h4 class="text-[#172b4d] font-medium">Click to expand...</h4>
        <svg class="w-4 h-4 text-[#6b778c] transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
    <div class="p-4 bg-white">
      <p class="text-[#172b4d] text-sm">This content is hidden by default and can be expanded by clicking the header above. This is useful for optional or detailed information that doesn't need to be visible immediately.</p>
    </div>
  </div>`,

  tableOfContentsMacro: `<div class="confluence-macro toc-macro bg-[#f4f5f7] border border-[#dfe1e6] rounded-lg p-4 my-4">
    <div class="flex items-center space-x-2 mb-3">
      <svg class="w-5 h-5 text-[#6b778c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
      </svg>
      <h4 class="text-[#172b4d] font-semibold">Table of Contents</h4>
    </div>
    <ul class="space-y-1 text-sm">
      <li><a href="#section1" class="text-[#0052cc] hover:underline">1. Introduction</a></li>
      <li><a href="#section2" class="text-[#0052cc] hover:underline">2. Getting Started</a></li>
      <li class="ml-4"><a href="#section2-1" class="text-[#0052cc] hover:underline">2.1 Prerequisites</a></li>
      <li class="ml-4"><a href="#section2-2" class="text-[#0052cc] hover:underline">2.2 Installation</a></li>
      <li><a href="#section3" class="text-[#0052cc] hover:underline">3. Configuration</a></li>
      <li><a href="#section4" class="text-[#0052cc] hover:underline">4. API Reference</a></li>
    </ul>
  </div>`,

  statusMacro: `<div class="confluence-macro status-macro inline-flex items-center space-x-2 bg-[#e3fcef] border border-[#00875a] rounded-full px-3 py-1 my-2">
    <div class="w-2 h-2 bg-[#00875a] rounded-full"></div>
    <span class="text-[#00875a] text-sm font-medium">In Progress</span>
  </div>`,

  panelMacro: `<div class="confluence-macro panel-macro bg-white border border-[#dfe1e6] rounded-lg p-6 my-4 shadow-sm">
    <div class="border-l-4 border-[#0052cc] pl-4">
      <h3 class="text-[#172b4d] font-semibold text-lg mb-2">Panel Title</h3>
      <p class="text-[#6b778c] text-sm leading-relaxed">This is a panel macro that can be used to highlight important content or create visual separation in your documentation. Panels are great for callouts, summaries, or featured content.</p>
    </div>
  </div>`,
}

export const componentCategories = [
  {
    name: "Basic Elements",
    icon: Type,
    color: "blue",
    components: [
      { type: "heading", name: "Heading", icon: Type, description: "Add headings (H1-H6)", tags: ["text", "title"] },
      {
        type: "paragraph",
        name: "Paragraph",
        icon: Type,
        description: "Add text paragraphs",
        tags: ["text", "content"],
      },
      { type: "blockquote", name: "Quote", icon: Quote, description: "Add blockquotes", tags: ["text", "emphasis"] },
      { type: "list", name: "Bullet List", icon: List, description: "Add unordered lists", tags: ["list", "bullets"] },
      {
        type: "orderedList",
        name: "Numbered List",
        icon: ListOrdered,
        description: "Add ordered lists",
        tags: ["list", "numbers"],
      },
      {
        type: "taskList",
        name: "Task List",
        icon: CheckSquare,
        description: "Add task/todo lists",
        tags: ["interactive", "tasks"],
      },
    ],
  },
  {
    name: "Confluence Macros",
    icon: Puzzle,
    color: "blue",
    components: [
      {
        type: "htmlBlock",
        name: "Info Macro",
        icon: Info,
        description: "Confluence-style info callout",
        htmlBlockKey: "infoMacro",
        tags: ["macro", "info", "callout"],
      },
      {
        type: "htmlBlock",
        name: "Warning Macro",
        icon: AlertTriangle,
        description: "Confluence-style warning callout",
        htmlBlockKey: "warningMacro",
        tags: ["macro", "warning", "callout"],
      },
      {
        type: "htmlBlock",
        name: "Note Macro",
        icon: FileText,
        description: "Confluence-style note callout",
        htmlBlockKey: "noteMacro",
        tags: ["macro", "note", "callout"],
      },
      {
        type: "htmlBlock",
        name: "Tip Macro",
        icon: Zap,
        description: "Confluence-style tip callout",
        htmlBlockKey: "tipMacro",
        tags: ["macro", "tip", "callout"],
      },
      {
        type: "htmlBlock",
        name: "Code Macro",
        icon: Code,
        description: "Confluence-style code block",
        htmlBlockKey: "codeMacro",
        tags: ["macro", "code", "syntax"],
      },
      {
        type: "htmlBlock",
        name: "Expand Macro",
        icon: ChevronRight,
        description: "Collapsible content section",
        htmlBlockKey: "expandMacro",
        tags: ["macro", "expand", "collapsible"],
      },
      {
        type: "htmlBlock",
        name: "Table of Contents",
        icon: List,
        description: "Auto-generated table of contents",
        htmlBlockKey: "tableOfContentsMacro",
        tags: ["macro", "toc", "navigation"],
      },
      {
        type: "htmlBlock",
        name: "Status Macro",
        icon: CheckCircle,
        description: "Status indicator badge",
        htmlBlockKey: "statusMacro",
        tags: ["macro", "status", "badge"],
      },
      {
        type: "htmlBlock",
        name: "Panel Macro",
        icon: Layout,
        description: "Highlighted content panel",
        htmlBlockKey: "panelMacro",
        tags: ["macro", "panel", "highlight"],
      },
    ],
  },
  {
    name: "Media & Visual",
    icon: ImageIcon,
    color: "green",
    components: [
      {
        type: "image",
        name: "Image",
        icon: ImageIcon,
        description: "Add images with captions",
        tags: ["media", "photo"],
      },
      {
        type: "gallery",
        name: "Image Gallery",
        icon: Grid3X3,
        description: "Add image galleries",
        tags: ["media", "gallery"],
      },
      {
        type: "chart",
        name: "Chart",
        icon: BarChart3,
        description: "Add interactive charts",
        tags: ["data", "visualization"],
      },
      {
        type: "mermaid",
        name: "Diagram",
        icon: GitBranch,
        description: "Add flowcharts and diagrams",
        tags: ["diagram", "flowchart"],
      },
    ],
  },
  {
    name: "Layout & Structure",
    icon: Layout,
    color: "purple",
    components: [
      {
        type: "grid",
        name: "Grid Layout",
        icon: Grid3X3,
        description: "Create responsive grid layouts",
        tags: ["layout", "grid"],
      },
      {
        type: "columns",
        name: "Columns",
        icon: Columns,
        description: "Add multi-column layouts",
        tags: ["layout", "columns"],
      },
      { type: "card", name: "Card", icon: CreditCard, description: "Add content cards", tags: ["container", "card"] },
      {
        type: "divider",
        name: "Divider",
        icon: Minus,
        description: "Add horizontal dividers",
        tags: ["layout", "separator"],
      },
      { type: "spacer", name: "Spacer", icon: Space, description: "Add vertical spacing", tags: ["layout", "spacing"] },
      { type: "table", name: "Table", icon: Table, description: "Add data tables", tags: ["data", "tabular"] },
    ],
  },
  {
    name: "Interactive Elements",
    icon: MousePointer,
    color: "orange",
    components: [
      {
        type: "button",
        name: "Button",
        icon: MousePointer,
        description: "Add interactive buttons",
        tags: ["interactive", "cta"],
      },
      {
        type: "alert",
        name: "Alert",
        icon: AlertTriangle,
        description: "Add alert messages",
        tags: ["notification", "alert"],
      },
    ],
  },
  {
    name: "Advanced Components",
    icon: Target,
    color: "red",
    components: [
      {
        type: "testimonial",
        name: "Testimonial",
        icon: Star,
        description: "Add customer testimonials",
        tags: ["social", "review"],
      },
      {
        type: "pricing",
        name: "Pricing Table",
        icon: Award,
        description: "Add pricing tables",
        tags: ["pricing", "plans"],
      },
      {
        type: "banner",
        name: "Banner",
        icon: Layers,
        description: "Add promotional banners",
        tags: ["marketing", "announcement"],
      },
      {
        type: "hero",
        name: "Hero Section",
        icon: Target,
        description: "Add hero sections",
        tags: ["marketing", "landing"],
      },
    ],
  },
]

export function getDefaultContent(type: MarkdownComponent["type"], htmlBlockKey?: string): any {
  switch (type) {
    case "heading":
      return { text: "New Heading", level: 2 }
    case "paragraph":
      return { text: "This is a new paragraph. Click to edit this text and add your content." }
    case "image":
      return { src: "/placeholder.svg?height=300&width=500", alt: "Sample image", caption: "" }
    case "button":
      return { text: "Click me", variant: "default", size: "default", link: "#" }
    case "card":
      return {
        title: "Card Title",
        description: "This is a card description that provides more details about the content.",
        buttons: [{ text: "Learn More", variant: "default", link: "#" }],
      }
    case "grid":
      return {
        columns: 3,
        gap: "1.5rem",
        items: [
          { id: "1", type: "card", content: { title: "Item 1", description: "Description 1" } },
          { id: "2", type: "card", content: { title: "Item 2", description: "Description 2" } },
          { id: "3", type: "card", content: { title: "Item 3", description: "Description 3" } },
        ],
      }
    case "table":
      return {
        headers: ["Property", "Type", "Description"],
        rows: [
          ["id", "string", "Unique identifier"],
          ["name", "string", "Display name"],
          ["email", "string", "Email address"],
        ],
      }
    case "divider":
      return { style: "solid", color: "#dfe1e6", thickness: "1px", margin: "2rem 0" }
    case "list":
      return { items: ["First item", "Second item", "Third item"] }
    case "orderedList":
      return { items: ["First step", "Second step", "Third step"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Complete setup", checked: true },
          { text: "Configure settings", checked: false },
          { text: "Test integration", checked: false },
        ],
      }
    case "blockquote":
      return { text: "Documentation is a love letter that you write to your future self.", author: "Damian Conway" }
    case "alert":
      return { type: "info", title: "Information", text: "This is an informational alert message." }
    case "code":
      return {
        code: `// Example API call
const response = await fetch('/api/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const users = await response.json();
console.log(users);`,
        language: "javascript",
      }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "This column contains the main content or instructions.",
        column2Text: "This column can contain additional information or examples.",
        columnRatio: "1:1",
        gap: "2rem",
      }
    case "mermaid":
      return {
        code: `graph TD
    A[User Request] --> B{Authentication}
    B -->|Valid| C[Process Request]
    B -->|Invalid| D[Return Error]
    C --> E[Database Query]
    E --> F[Return Response]`,
      }
    case "chart":
      return {
        type: "bar",
        data: {
          labels: ["API Calls", "Response Time", "Error Rate", "Uptime"],
          datasets: [
            {
              label: "Metrics",
              data: [95, 87, 2, 99.9],
              backgroundColor: ["#0052cc", "#00875a", "#ff8b00", "#de350b"],
            },
          ],
        },
      }
    case "gallery":
      return {
        images: [
          { src: "/placeholder.svg?height=300&width=400", alt: "Screenshot 1", caption: "Main dashboard" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Screenshot 2", caption: "Settings panel" },
        ],
      }
    case "testimonial":
      return {
        quote: "This documentation is incredibly clear and comprehensive. It made integration a breeze!",
        author: "Sarah Johnson",
        title: "Senior Developer",
        avatarUrl: "/placeholder.svg?height=60&width=60",
      }
    case "pricing":
      return {
        plans: [
          {
            name: "Free",
            price: "$0",
            period: "/ month",
            features: ["1,000 API calls", "Basic support", "Community access"],
            buttonText: "Get Started",
            popular: false,
          },
          {
            name: "Pro",
            price: "$29",
            period: "/ month",
            features: ["50,000 API calls", "Priority support", "Advanced analytics"],
            buttonText: "Start Trial",
            popular: true,
          },
        ],
      }
    case "banner":
      return {
        title: "Important Announcement",
        description: "We've released new features to improve your documentation experience.",
        backgroundColor: "#0052cc",
        textColor: "white",
        buttons: [{ text: "Learn More", variant: "secondary", link: "#" }],
      }
    case "hero":
      return {
        title: "Welcome to Our Documentation",
        subtitle: "Everything You Need to Get Started",
        description: "Comprehensive guides and API references to help you integrate and build amazing applications.",
        backgroundColor: "#0052cc",
        textAlign: "center",
        buttons: [
          { text: "Get Started", variant: "default", link: "#" },
          { text: "View API Docs", variant: "outline", link: "#" },
        ],
      }
    case "htmlBlock":
      if (htmlBlockKey && confluenceMacros[htmlBlockKey as keyof typeof confluenceMacros]) {
        return {
          htmlContent: confluenceMacros[htmlBlockKey as keyof typeof confluenceMacros],
          name: htmlBlockKey
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace("Macro", ""),
          category: "confluence",
          editable: true,
          responsive: true,
        } as HtmlBlockContent
      }
      return {
        htmlContent: `<div class='p-6 border-2 border-dashed border-[#dfe1e6] rounded-lg text-center bg-[#f4f5f7]'>
          <h3 class='text-lg font-semibold text-[#172b4d] mb-2'>Custom HTML Block</h3>
          <p class='text-[#6b778c]'>Add your custom HTML content here</p>
        </div>`,
        name: "Custom HTML Block",
        category: "custom",
        editable: true,
        responsive: true,
      } as HtmlBlockContent
    default:
      return {}
  }
}

interface DraggableComponentProps {
  component: {
    type: MarkdownComponent["type"]
    name: string
    icon: React.ComponentType<{ className?: string }>
    description: string
    htmlBlockKey?: string
    tags?: string[]
  }
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `palette-${component.name.toLowerCase().replace(/\s+/g, "-")}`,
    data: { type: component.type, htmlBlockKey: component.htmlBlockKey },
  })
  const IconComponent = component.icon

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      role="button"
      className="group flex items-start space-x-3 rounded-lg border border-[#dfe1e6] bg-white p-3 shadow-sm transition-all hover:border-[#0052cc] hover:shadow-md cursor-grab active:cursor-grabbing"
    >
      <div className="flex-shrink-0 p-2 rounded-md bg-[#f4f5f7] group-hover:bg-[#0052cc]/10 transition-colors">
        <IconComponent className="h-4 w-4 text-[#6b778c] group-hover:text-[#0052cc] transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#172b4d] group-hover:text-[#0052cc] transition-colors">
          {component.name}
        </p>
        <p className="text-xs text-[#6b778c] mt-1 line-clamp-2">{component.description}</p>
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-1.5 py-0.5 bg-[#f4f5f7] text-[#6b778c] border-[#dfe1e6]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function ComponentPalette() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategories, setOpenCategories] = useState<string[]>(["Basic Elements", "Confluence Macros"])

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      components: category.components.filter(
        (component) =>
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (component.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    }))
    .filter((category) => category.components.length > 0)

  return (
    <div className="h-full flex flex-col bg-white border-r border-[#dfe1e6]">
      {/* Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#0052cc] text-white">
            <Puzzle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#172b4d]">Insert Elements</h2>
            <p className="text-sm text-[#6b778c]">Drag elements to add to page</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6b778c]" />
          <Input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9 border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={openCategories.includes(category.name)}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-[#f4f5f7] transition-colors border border-[#dfe1e6] bg-white">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-[#f4f5f7]">
                    <category.icon className="h-4 w-4 text-[#6b778c]" />
                  </div>
                  <span className="text-sm font-medium text-[#172b4d]">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-[#f4f5f7] text-[#6b778c] border-[#dfe1e6]">
                    {category.components.length}
                  </Badge>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-[#6b778c] transition-transform",
                      openCategories.includes(category.name) && "rotate-90",
                    )}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {category.components.map((component) => (
                  <DraggableComponent key={`${category.name}-${component.name}`} component={component} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-[#6b778c]">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No elements found.</p>
              <p className="text-xs mt-1">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
