"use client"

import type React from "react"
import { useState } from "react"
import { useDraggable } from "@dnd-kit/core"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Search,
  Grid3X3,
  BarChart3,
  TrendingUp,
  Star,
  Award,
  Zap,
  Target,
  Layers,
  Layout,
  Palette,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// Enhanced TailGrids HTML snippets with modern designs
const enhancedTailGridsSnippets = {
  // Enhanced Buttons
  primaryButton: `<button class="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    <span class="relative z-10">Get Started</span>
    <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 transition-opacity duration-200 group-hover:opacity-20"></div>
  </button>`,

  secondaryButton: `<button class="group relative inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
    <span class="relative z-10">Learn More</span>
  </button>`,

  gradientButton: `<button class="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 px-8 py-4 text-base font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
    <span class="relative z-10 flex items-center gap-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      Launch Now
    </span>
    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
  </button>`,

  // Enhanced Cards
  featureCard: `<div class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
    <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">Experience blazing fast performance with our optimized infrastructure and cutting-edge technology.</p>
    <a href="#" class="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
      Learn more
      <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </a>
  </div>`,

  pricingCard: `<div class="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-2xl border-2 border-blue-100 dark:border-blue-800 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300">
    <div class="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-4 py-2 rounded-bl-2xl text-sm font-semibold">Popular</div>
    <div class="text-center">
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Professional</h3>
      <div class="flex items-center justify-center mb-6">
        <span class="text-5xl font-bold text-gray-900 dark:text-white">$29</span>
        <span class="text-gray-500 dark:text-gray-400 ml-2">/month</span>
      </div>
      <ul class="space-y-4 mb-8 text-left">
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700 dark:text-gray-300">Unlimited projects</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700 dark:text-gray-300">Priority support</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700 dark:text-gray-300">Advanced analytics</span>
        </li>
      </ul>
      <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
        Get Started
      </button>
    </div>
  </div>`,

  // Enhanced Grids
  dashboardGrid: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-white/20 rounded-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg>
        </div>
        <span class="text-sm font-medium opacity-80">+12%</span>
      </div>
      <div class="text-3xl font-bold mb-1">2,543</div>
      <div class="text-sm opacity-80">Total Users</div>
    </div>
    <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-white/20 rounded-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>
        </div>
        <span class="text-sm font-medium opacity-80">+8%</span>
      </div>
      <div class="text-3xl font-bold mb-1">$45,210</div>
      <div class="text-sm opacity-80">Revenue</div>
    </div>
    <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-white/20 rounded-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <span class="text-sm font-medium opacity-80">+23%</span>
      </div>
      <div class="text-3xl font-bold mb-1">1,423</div>
      <div class="text-sm opacity-80">Orders</div>
    </div>
    <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="p-3 bg-white/20 rounded-xl">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        </div>
        <span class="text-sm font-medium opacity-80">+5%</span>
      </div>
      <div class="text-3xl font-bold mb-1">89.2%</div>
      <div class="text-sm opacity-80">Conversion</div>
    </div>
  </div>`,
}

// Enhanced component categories with more variety
export const componentCategories = [
  {
    name: "Basic Components",
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
      {
        type: "image",
        name: "Image",
        icon: ImageIcon,
        description: "Add images with captions",
        tags: ["media", "visual"],
      },
      {
        type: "button",
        name: "Button",
        icon: MousePointer,
        description: "Add interactive buttons",
        tags: ["interactive", "cta"],
      },
      {
        type: "divider",
        name: "Divider",
        icon: Minus,
        description: "Add horizontal dividers",
        tags: ["layout", "separator"],
      },
      { type: "spacer", name: "Spacer", icon: Space, description: "Add vertical spacing", tags: ["layout", "spacing"] },
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
        tags: ["layout", "responsive"],
      },
      {
        type: "columns",
        name: "Columns",
        icon: Columns,
        description: "Add multi-column layouts",
        tags: ["layout", "columns"],
      },
      {
        type: "card",
        name: "Card",
        icon: CreditCard,
        description: "Add content cards",
        tags: ["container", "content"],
      },
      {
        type: "banner",
        name: "Banner",
        icon: Layers,
        description: "Add promotional banners",
        tags: ["marketing", "promotion"],
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
  {
    name: "Data & Charts",
    icon: BarChart3,
    color: "green",
    components: [
      { type: "table", name: "Table", icon: Table, description: "Add data tables", tags: ["data", "tabular"] },
      {
        type: "chart",
        name: "Chart",
        icon: BarChart3,
        description: "Add interactive charts",
        tags: ["data", "visualization"],
      },
      {
        type: "infographic",
        name: "Infographic",
        icon: TrendingUp,
        description: "Add data infographics",
        tags: ["data", "visual", "stats"],
      },
    ],
  },
  {
    name: "Content Components",
    icon: FileCode,
    color: "orange",
    components: [
      {
        type: "code",
        name: "Code Block",
        icon: Code,
        description: "Add syntax-highlighted code",
        tags: ["code", "technical"],
      },
      { type: "blockquote", name: "Quote", icon: Quote, description: "Add blockquotes", tags: ["text", "emphasis"] },
      { type: "list", name: "Bullet List", icon: List, description: "Add unordered lists", tags: ["text", "list"] },
      {
        type: "orderedList",
        name: "Numbered List",
        icon: ListOrdered,
        description: "Add ordered lists",
        tags: ["text", "list"],
      },
      {
        type: "taskList",
        name: "Task List",
        icon: CheckSquare,
        description: "Add task/todo lists",
        tags: ["interactive", "tasks"],
      },
      {
        type: "alert",
        name: "Alert",
        icon: AlertTriangle,
        description: "Add alert messages",
        tags: ["notification", "message"],
      },
    ],
  },
  {
    name: "Advanced Components",
    icon: Sparkles,
    color: "indigo",
    components: [
      {
        type: "mermaid",
        name: "Mermaid Diagram",
        icon: GitBranch,
        description: "Add flowcharts and diagrams",
        tags: ["diagram", "flowchart"],
      },
      {
        type: "gallery",
        name: "Image Gallery",
        icon: ImageIcon,
        description: "Add image galleries",
        tags: ["media", "gallery"],
      },
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
        tags: ["pricing", "comparison"],
      },
      {
        type: "htmlBlock",
        name: "HTML Block",
        icon: FileCode,
        description: "Add custom HTML content",
        tags: ["custom", "html"],
      },
    ],
  },
  {
    name: "TG - Enhanced Buttons",
    icon: Zap,
    color: "blue",
    components: [
      {
        type: "htmlBlock",
        name: "Primary Button",
        icon: MousePointer,
        description: "Modern gradient primary button",
        htmlBlockKey: "primaryButton",
        tags: ["button", "cta", "primary"],
      },
      {
        type: "htmlBlock",
        name: "Secondary Button",
        icon: MousePointer,
        description: "Clean secondary button style",
        htmlBlockKey: "secondaryButton",
        tags: ["button", "secondary"],
      },
      {
        type: "htmlBlock",
        name: "Gradient Button",
        icon: Zap,
        description: "Eye-catching gradient button",
        htmlBlockKey: "gradientButton",
        tags: ["button", "gradient", "premium"],
      },
    ],
  },
  {
    name: "TG - Enhanced Cards",
    icon: CreditCard,
    color: "purple",
    components: [
      {
        type: "htmlBlock",
        name: "Feature Card",
        icon: Star,
        description: "Modern feature showcase card",
        htmlBlockKey: "featureCard",
        tags: ["card", "feature", "modern"],
      },
      {
        type: "htmlBlock",
        name: "Pricing Card",
        icon: Award,
        description: "Professional pricing card",
        htmlBlockKey: "pricingCard",
        tags: ["card", "pricing", "professional"],
      },
    ],
  },
  {
    name: "TG - Enhanced Layouts",
    icon: Grid3X3,
    color: "green",
    components: [
      {
        type: "htmlBlock",
        name: "Dashboard Grid",
        icon: BarChart3,
        description: "Modern dashboard statistics grid",
        htmlBlockKey: "dashboardGrid",
        tags: ["grid", "dashboard", "stats"],
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
      return { text: "This is a new paragraph. Click to edit this text and add your content." }
    case "image":
      return {
        src: "/placeholder.svg?height=300&width=500",
        alt: "Sample image",
        caption: "",
        width: "100%",
        height: "auto",
        objectFit: "cover",
        borderRadius: "8px",
      }
    case "button":
      return {
        text: "Click me",
        variant: "primary",
        size: "default",
        link: "",
        icon: "",
      }
    case "card":
      return {
        title: "Card Title",
        description:
          "This is a card description that provides more details about the content. You can customize this text to match your needs.",
        imageUrl: "",
        imagePosition: "top",
        layout: "default",
        buttons: [{ text: "Learn More", variant: "primary", link: "#" }],
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
        responsive: { sm: 1, md: 2, lg: 3, xl: 3 },
      }
    case "banner":
      return {
        title: "Special Offer",
        subtitle: "Limited time only",
        description: "Get 50% off on all premium features",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textColor: "white",
        buttons: [{ text: "Get Started", variant: "primary", link: "#" }],
      }
    case "hero":
      return {
        title: "Welcome to Our Platform",
        subtitle: "Build Amazing Things",
        description: "Create stunning websites and applications with our powerful tools and intuitive interface.",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: "center",
        buttons: [
          { text: "Get Started", variant: "primary", link: "#" },
          { text: "Learn More", variant: "secondary", link: "#" },
        ],
      }
    case "table":
      return {
        headers: ["Name", "Email", "Role", "Status"],
        rows: [
          ["John Doe", "john@example.com", "Admin", "Active"],
          ["Jane Smith", "jane@example.com", "User", "Active"],
          ["Bob Johnson", "bob@example.com", "User", "Inactive"],
        ],
        sortable: true,
        searchable: true,
        styling: {
          headerStyle: "default",
          striped: true,
          bordered: false,
          hover: true,
        },
      }
    case "divider":
      return { style: "solid", color: "#e5e7eb", thickness: "1px", margin: "2rem 0" }
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
      return { text: "This is a quote that provides insight or emphasis to your content.", author: "" }
    case "alert":
      return { type: "info", text: "This is an informational alert message." }
    case "code":
      return {
        code: "// Your code here\nconsole.log('Hello, World!');",
        language: "javascript",
        showLineNumbers: true,
        theme: "dark",
      }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "This is the content for the first column. You can add any text or information here.",
        column2Text: "This is the content for the second column. You can add different content here.",
        columnRatio: "1:1",
        gap: "2rem",
      }
    case "mermaid":
      return {
        code: "graph TD;\n    A[Start] --> B[Process];\n    B --> C[Decision];\n    C -->|Yes| D[End];\n    C -->|No| B;",
        theme: "default",
      }
    case "htmlBlock":
      if (htmlBlockKey && enhancedTailGridsSnippets[htmlBlockKey as keyof typeof enhancedTailGridsSnippets]) {
        return {
          htmlContent: enhancedTailGridsSnippets[htmlBlockKey as keyof typeof enhancedTailGridsSnippets],
          name: htmlBlockKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          category: "tailgrids",
          editable: true,
          responsive: true,
        } as HtmlBlockContent
      }
      return {
        htmlContent:
          "<div class='p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50'><h3 class='text-lg font-semibold text-gray-700 mb-2'>Custom HTML Block</h3><p class='text-gray-500'>Add your custom HTML content here</p></div>",
        name: "Custom HTML Block",
        category: "custom",
        editable: true,
        responsive: true,
      } as HtmlBlockContent
    default:
      return {}
  }
}

// Draggable component item with enhanced styling
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
        "group flex items-start space-x-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-border/80 hover:shadow-lg cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 shadow-2xl scale-105 rotate-2",
      )}
    >
      <div className="flex-shrink-0 p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-all duration-200">
        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {component.name}
        </p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-200">
          {component.description}
        </p>
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Main component palette with enhanced features
export function ComponentPalette() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Basic Components"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      componentCategories.flatMap((category) => category.components.flatMap((component) => component.tags || [])),
    ),
  ).sort()

  // Filter components based on search and tags
  const filteredCategories = componentCategories
    .map((category) => ({
      ...category,
      components: category.components.filter((component) => {
        const matchesSearch =
          searchQuery === "" ||
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (component.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesTags =
          selectedTags.length === 0 || selectedTags.some((tag) => (component.tags || []).includes(tag))

        return matchesSearch && matchesTags
      }),
    }))
    .filter((category) => category.components.length > 0)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary">
            <Palette className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Components</h2>
            <p className="text-sm text-muted-foreground">Drag to canvas to add</p>
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-1">
          {allTags.slice(0, 6).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={cn(
                "text-xs cursor-pointer transition-all duration-200 hover:scale-105",
                selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2">
          <TabsTrigger value="components" className="text-sm">
            Components
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="components" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {filteredCategories.map((category) => {
                const isExpanded = expandedCategories.includes(category.name)
                const IconComponent = category.icon

                return (
                  <Collapsible key={category.name} open={isExpanded} onOpenChange={() => toggleCategory(category.name)}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-muted/70 transition-all duration-200 bg-card border border-border shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg transition-all duration-200",
                            category.color === "blue" &&
                              "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                            category.color === "purple" &&
                              "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                            category.color === "green" &&
                              "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                            category.color === "orange" &&
                              "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
                            category.color === "indigo" &&
                              "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
                            category.color === "teal" &&
                              "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
                            category.color === "pink" &&
                              "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">{category.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {category.components.length}
                          </Badge>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                      {category.components.map((component) => (
                        <DraggableComponent key={`${category.name}-${component.name}`} component={component} />
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}

              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No components found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your search terms or removing some tag filters to see more components.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Layout className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Templates Coming Soon</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Pre-built page templates and component combinations will be available here soon.
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Named export for compatibility
export { ComponentPalette as default }
