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
  FileCode,
  ChevronRight,
  Search,
  Grid3X3,
  BarChart3,
  Star,
  Award,
  Target,
  Layers,
  Layout,
  Palette,
  Sparkles,
  BookOpen,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  Database,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// Enhanced TailGrids component definitions with technical documentation focus
const tailGridsComponents = {
  docsHero: `<section class="relative z-10 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center -mx-4">
        <div class="w-full px-4 lg:w-1/2">
          <div class="hero-content">
            <h1 class="mb-5 text-4xl font-bold !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
              Complete Developer Documentation
            </h1>
            <p class="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
              Everything you need to integrate, build, and deploy with our platform. From quick start guides to advanced API references.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <a href="#" class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-dark">
                Get Started
              </a>
              <a href="#" class="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-[#464646] hover:text-primary dark:text-white">
                <span class="mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                  </svg>
                </span>
                Watch Tutorial
              </a>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2">
          <div class="lg:ml-auto lg:text-right">
            <div class="relative z-10 inline-block pt-11 lg:pt-0">
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md">
                <div class="flex items-center mb-4">
                  <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <pre class="text-sm text-gray-800 dark:text-gray-200"><code>curl -X POST \\\n  https://api.example.com/v1/users \\\n  -H "Authorization: Bearer token" \\\n  -H "Content-Type: application/json" \\\n  -d '{"name": "John Doe"}'</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,
  apiReference: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            GET
          </span>
          <code class="text-sm font-mono text-gray-900 dark:text-gray-100">/api/v1/users/{id}</code>
        </div>
        <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get User by ID</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">Retrieve detailed information about a specific user by their unique identifier.</p>
      
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Parameters</h4>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-md p-3">
            <div class="flex items-center justify-between">
              <code class="text-sm font-mono text-blue-600 dark:text-blue-400">id</code>
              <span class="text-xs text-gray-500 dark:text-gray-400">string</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">The unique identifier for the user</p>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Response</h4>
          <div class="bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre class="text-sm text-gray-300"><code>{\n  "id": "user_123",\n  "name": "John Doe",\n  "email": "john@example.com",\n  "created_at": "2023-01-01T00:00:00Z"\n}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  codeExample: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8 px-6" aria-label="Tabs">
        <button class="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          cURL
        </button>
        <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          JavaScript
        </button>
        <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Python
        </button>
      </nav>
    </div>
    <div class="relative">
      <div class="absolute top-4 right-4 z-10">
        <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          Copy
        </button>
      </div>
      <div class="bg-gray-900 p-6 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code>curl -X POST https://api.example.com/v1/users \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "name": "John Doe",\n    "email": "john@example.com"\n  }'</code></pre>
      </div>
    </div>
  </div>`,
  stepGuide: `<div class="space-y-8">
    <div class="flex">
      <div class="flex-shrink-0">
        <div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span class="text-sm font-medium text-white">1</span>
        </div>
      </div>
      <div class="ml-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Install the SDK</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          First, install our SDK using your preferred package manager.
        </p>
        <div class="mt-3 bg-gray-900 rounded-md p-3">
          <code class="text-sm text-gray-300">npm install @example/sdk</code>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="flex-shrink-0">
        <div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span class="text-sm font-medium text-white">2</span>
        </div>
      </div>
      <div class="ml-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Initialize the Client</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Create a new client instance with your API key.
        </p>
        <div class="mt-3 bg-gray-900 rounded-md p-3">
          <code class="text-sm text-gray-300">const client = new ExampleSDK('your-api-key');</code>
        </div>
      </div>
    </div>
  </div>`,
  calloutInfo: `<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-r-md">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
          Information
        </h3>
        <div class="mt-2 text-sm text-blue-700 dark:text-blue-300">
          <p>This is an informational callout that provides additional context or helpful tips to the reader.</p>
        </div>
      </div>
    </div>
  </div>`,
  calloutWarning: `<div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-md">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800 dark:text-yellow-200">
          Warning
        </h3>
        <div class="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
          <p>This is a warning callout that alerts users to potential issues or important considerations.</p>
        </div>
      </div>
    </div>
  </div>`,
  calloutDanger: `<div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-r-md">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
          Danger
        </h3>
        <div class="mt-2 text-sm text-red-700 dark:text-red-300">
          <p>This is a danger callout that warns users about critical issues or destructive actions.</p>
        </div>
      </div>
    </div>
  </div>`,
  calloutSuccess: `<div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded-r-md">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
          Success
        </h3>
        <div class="mt-2 text-sm text-green-700 dark:text-green-300">
          <p>This is a success callout that confirms successful completion or positive outcomes.</p>
        </div>
      </div>
    </div>
  </div>`,
  changelogEntry: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2 mb-2">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">v2.1.0</h3>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Latest
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">March 15, 2024</span>
        </div>
        <div class="space-y-3">
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">✨ New Features</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>Added support for webhook signatures</li>
              <li>New batch operations endpoint</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">🐛 Bug Fixes</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li>Fixed rate limiting edge case</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`,
}

export const componentCategories = [
  {
    name: "Basic Text & Content",
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
    name: "Code & Technical",
    icon: Code,
    color: "green",
    components: [
      {
        type: "code",
        name: "Code Block",
        icon: Code,
        description: "Add syntax-highlighted code",
        tags: ["code", "syntax"],
      },
      {
        type: "mermaid",
        name: "Mermaid Diagram",
        icon: GitBranch,
        description: "Add flowcharts and diagrams",
        tags: ["diagram", "flowchart"],
      },
      {
        type: "htmlBlock",
        name: "API Reference",
        icon: Database,
        description: "Document API endpoints",
        htmlBlockKey: "apiReference",
        tags: ["api", "reference"],
      },
      {
        type: "htmlBlock",
        name: "Code Example",
        icon: FileCode,
        description: "Multi-language code examples",
        htmlBlockKey: "codeExample",
        tags: ["code", "example"],
      },
    ],
  },
  {
    name: "Documentation Helpers",
    icon: BookOpen,
    color: "purple",
    components: [
      {
        type: "htmlBlock",
        name: "Step Guide",
        icon: ListOrdered,
        description: "Step-by-step instructions",
        htmlBlockKey: "stepGuide",
        tags: ["guide", "tutorial"],
      },
      {
        type: "htmlBlock",
        name: "Info Callout",
        icon: Info,
        description: "Information callout box",
        htmlBlockKey: "calloutInfo",
        tags: ["callout", "info"],
      },
      {
        type: "htmlBlock",
        name: "Warning Callout",
        icon: AlertTriangle,
        description: "Warning callout box",
        htmlBlockKey: "calloutWarning",
        tags: ["callout", "warning"],
      },
      {
        type: "htmlBlock",
        name: "Danger Callout",
        icon: XCircle,
        description: "Danger callout box",
        htmlBlockKey: "calloutDanger",
        tags: ["callout", "danger"],
      },
      {
        type: "htmlBlock",
        name: "Success Callout",
        icon: CheckCircle,
        description: "Success callout box",
        htmlBlockKey: "calloutSuccess",
        tags: ["callout", "success"],
      },
      {
        type: "htmlBlock",
        name: "Changelog Entry",
        icon: Clock,
        description: "Version changelog entry",
        htmlBlockKey: "changelogEntry",
        tags: ["changelog", "version"],
      },
    ],
  },
  {
    name: "Media & Visual",
    icon: ImageIcon,
    color: "orange",
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
    ],
  },
  {
    name: "Layout & Structure",
    icon: Layout,
    color: "indigo",
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
    color: "teal",
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
    name: "Marketing Templates",
    icon: Sparkles,
    color: "pink",
    components: [
      {
        type: "htmlBlock",
        name: "Docs Hero",
        icon: Target,
        description: "Documentation hero section",
        htmlBlockKey: "docsHero",
        tags: ["hero", "landing"],
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
      return { text: "This is a new paragraph. Click to edit this text." }
    case "image":
      return { src: "/placeholder.svg?height=300&width=500", alt: "Sample image", caption: "" }
    case "button":
      return { text: "Click me", variant: "default", size: "default", link: "#" }
    case "card":
      return {
        title: "Card Title",
        description: "This is a card description.",
        buttons: [{ text: "Learn More", variant: "default", link: "#" }],
      }
    case "grid":
      return {
        columns: 3,
        gap: "1.5rem",
        items: [
          { id: "1", type: "card", content: { title: "Item 1" } },
          { id: "2", type: "card", content: { title: "Item 2" } },
          { id: "3", type: "card", content: { title: "Item 3" } },
        ],
      }
    case "table":
      return {
        headers: ["Header 1", "Header 2"],
        rows: [
          ["Cell 1", "Cell 2"],
          ["Cell 3", "Cell 4"],
        ],
      }
    case "divider":
      return { style: "solid", color: "#e5e7eb", thickness: "1px", margin: "2rem 0" }
    case "list":
      return { items: ["First item", "Second item"] }
    case "orderedList":
      return { items: ["First step", "Second step"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "First task", checked: false },
          { text: "Second task", checked: true },
        ],
      }
    case "blockquote":
      return { text: "A great quote.", author: "Author" }
    case "alert":
      return { type: "info", title: "Info", text: "This is an informational alert." }
    case "code":
      return { code: `console.log("Hello, World!");`, language: "javascript" }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return { column1Text: "Column 1 content.", column2Text: "Column 2 content.", columnRatio: "1:1", gap: "2rem" }
    case "mermaid":
      return { code: `graph TD;\n    A-->B;` }
    case "chart":
      return { type: "bar", data: { labels: ["A", "B"], datasets: [{ label: "Data", data: [10, 20] }] } }
    case "gallery":
      return {
        images: [
          { src: "/placeholder.svg?height=300&width=400", alt: "Image 1" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Image 2" },
        ],
      }
    case "testimonial":
      return { quote: "This is amazing!", author: "Jane Doe", title: "CEO" }
    case "pricing":
      return { plans: [{ name: "Basic", price: "$10", period: "/mo", features: ["Feature 1"], buttonText: "Sign Up" }] }
    case "banner":
      return {
        title: "Banner Title",
        description: "Banner description.",
        buttons: [{ text: "Click", variant: "default" }],
      }
    case "hero":
      return {
        title: "Hero Title",
        description: "Hero description.",
        buttons: [{ text: "Get Started", variant: "default" }],
      }
    case "htmlBlock":
      if (htmlBlockKey && tailGridsComponents[htmlBlockKey as keyof typeof tailGridsComponents]) {
        return {
          htmlContent: tailGridsComponents[htmlBlockKey as keyof typeof tailGridsComponents],
          name: htmlBlockKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          category: "tailgrids",
          editable: true,
          responsive: true,
        } as HtmlBlockContent
      }
      return {
        htmlContent: `<div>Custom HTML</div>`,
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
      className="group flex items-start space-x-3 rounded-lg border bg-card p-3 shadow-sm transition-colors hover:bg-muted/50 cursor-grab active:cursor-grabbing"
    >
      <div className="flex-shrink-0 p-2 rounded-md bg-muted group-hover:bg-primary/10">
        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{component.name}</p>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{component.description}</p>
      </div>
    </div>
  )
}

export function ComponentPalette() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategories, setOpenCategories] = useState<string[]>(["Basic Text & Content", "Code & Technical"])

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
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Palette className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Components</h2>
            <p className="text-sm text-muted-foreground">Drag to add to canvas</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={openCategories.includes(category.name)}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-muted/70 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-muted">
                    <category.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {category.components.length}
                  </Badge>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
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
            <div className="text-center py-12 text-muted-foreground">
              <p>No components found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
