"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Type,
  ImageIcon,
  List,
  Table,
  Code,
  Quote,
  Link,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  User,
  Mail,
  Star,
  Menu,
  X,
  Plus,
  Edit,
  Lock,
  Home,
  FileText,
  Tag,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Bell,
  Globe,
  Monitor,
} from "lucide-react"
import type { ComponentItem, HtmlBlockContent } from "./types"

// Sample TailGrids HTML snippets
const sampleTailGridsSnippets = {
  primaryButton: `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Primary Button</button>`,

  successAlert: `<div class="rounded-md bg-green-50 p-4 border border-green-200">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium text-green-800">Success! Your action was completed.</p>
      </div>
    </div>
  </div>`,

  productCard: `<div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img class="w-full h-48 object-cover" src="/placeholder.svg?height=200&width=300" alt="Product">
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900">Product Name</h3>
      <p class="text-gray-600 text-sm mt-1">Product description goes here</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">$99.99</span>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add to Cart</button>
      </div>
    </div>
  </div>`,

  contactForm: `<form class="space-y-4 bg-white p-6 rounded-lg shadow-md">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Your name">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="your@email.com">
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">Message</label>
      <textarea rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Your message"></textarea>
    </div>
    <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Send Message</button>
  </form>`,

  navbar: `<nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <span class="text-xl font-bold text-gray-800">Brand</span>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
          <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
        </div>
      </div>
    </div>
  </nav>`,

  statsCard: `<div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
          </svg>
        </div>
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600">Total Users</p>
        <p class="text-2xl font-bold text-gray-900">1,234</p>
      </div>
    </div>
  </div>`,

  heroSection: `<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6">Welcome to Our Platform</h1>
      <p class="text-xl mb-8 max-w-2xl mx-auto">Build amazing experiences with our powerful tools and components</p>
      <div class="space-x-4">
        <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Started</button>
        <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">Learn More</button>
      </div>
    </div>
  </div>`,

  pricingCard: `<div class="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-500">
    <div class="text-center">
      <h3 class="text-2xl font-bold text-gray-900">Pro Plan</h3>
      <div class="mt-4">
        <span class="text-4xl font-bold text-gray-900">$29</span>
        <span class="text-gray-600">/month</span>
      </div>
      <ul class="mt-6 space-y-4">
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Unlimited projects</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Priority support</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Advanced analytics</span>
        </li>
      </ul>
      <button class="w-full mt-8 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700">Choose Plan</button>
    </div>
  </div>`,

  testimonialCard: `<div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center mb-4">
      <img class="w-12 h-12 rounded-full mr-4" src="/placeholder.svg?height=48&width=48" alt="User">
      <div>
        <h4 class="font-semibold text-gray-900">John Doe</h4>
        <p class="text-gray-600 text-sm">CEO, Company</p>
      </div>
    </div>
    <p class="text-gray-700">"This product has completely transformed how we work. Highly recommended!"</p>
    <div class="flex mt-4">
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </div>
  </div>`,

  featureGrid: `<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="text-center">
      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Fast Performance</h3>
      <p class="text-gray-600">Lightning fast loading times and optimized performance</p>
    </div>
    <div class="text-center">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Reliable</h3>
      <p class="text-gray-600">99.9% uptime guarantee with robust infrastructure</p>
    </div>
    <div class="text-center">
      <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-semibold mb-2">Secure</h3>
      <p class="text-gray-600">Enterprise-grade security with end-to-end encryption</p>
    </div>
  </div>`,
}

// ---------------------------------------------------------------------------
// getDefaultContent ---------------------------------------------------------
// Returns the initial `content` object for a new component placed on the canvas
// ---------------------------------------------------------------------------
import type { MarkdownComponent } from "./types"

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
      return { text: "Click me", variant: "default", size: "default", link: "" }

    case "card":
      return {
        title: "Card Title",
        description: "This is a card description that provides more details.",
        imageUrl: "",
      }

    case "list":
      return { items: ["First item", "Second item", "Third item"] }

    case "table":
      return {
        headers: ["Header 1", "Header 2", "Header 3"],
        rows: [
          ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
          ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
        ],
      }

    case "code":
      return {
        code: "// Your code here\nconsole.log('Hello, World!');",
        language: "javascript",
      }

    case "blockquote":
      return { text: "This is a quote that provides emphasis to your content." }

    case "alert":
      return { type: "info", text: "This is an informational alert." }

    case "mermaid":
      return {
        code: "graph TD;\n    A[Start] --> B[Process];\n    B --> C[End];",
      }

    case "htmlBlock":
      // If a TailGrids key is provided, use that snippet; otherwise a blank block
      if (htmlBlockKey && sampleTailGridsSnippets[htmlBlockKey as keyof typeof sampleTailGridsSnippets]) {
        return {
          html: sampleTailGridsSnippets[htmlBlockKey as keyof typeof sampleTailGridsSnippets],
          category: "custom",
        }
      }
      return {
        html: `<div class="p-4 border-2 border-dashed rounded-md text-center text-gray-500">Custom HTML content</div>`,
        category: "custom",
      }

    default:
      return {}
  }
}

export const componentCategories = [
  {
    name: "Basic Components",
    icon: Type,
    components: [
      {
        id: "heading",
        name: "Heading",
        icon: Type,
        type: "heading" as const,
        content: {
          level: 1,
          text: "Heading Text",
        },
      },
      {
        id: "paragraph",
        name: "Paragraph",
        icon: FileText,
        type: "paragraph" as const,
        content: {
          text: "This is a paragraph of text. You can edit this content directly on the canvas.",
        },
      },
      {
        id: "image",
        name: "Image",
        icon: ImageIcon,
        type: "image" as const,
        content: {
          url: "/placeholder.svg?height=200&width=300",
          alt: "Placeholder image",
          caption: "Image caption",
        },
      },
      {
        id: "button",
        name: "Button",
        icon: Plus,
        type: "button" as const,
        content: {
          text: "Click me",
          variant: "default" as const,
          size: "default" as const,
          link: "#",
        },
      },
      {
        id: "card",
        name: "Card",
        icon: FileText,
        type: "card" as const,
        content: {
          title: "Card Title",
          description: "Card description goes here. This is a sample card component.",
          imageUrl: "/placeholder.svg?height=200&width=300",
        },
      },
      {
        id: "list",
        name: "List",
        icon: List,
        type: "list" as const,
        content: {
          type: "unordered" as const,
          items: ["First item", "Second item", "Third item"],
        },
      },
      {
        id: "table",
        name: "Table",
        icon: Table,
        type: "table" as const,
        content: {
          headers: ["Column 1", "Column 2", "Column 3"],
          rows: [
            ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
            ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
          ],
        },
      },
      {
        id: "code",
        name: "Code Block",
        icon: Code,
        type: "code" as const,
        content: {
          code: "console.log('Hello, World!');",
          language: "javascript",
        },
      },
      {
        id: "quote",
        name: "Quote",
        icon: Quote,
        type: "quote" as const,
        content: {
          text: "This is an inspirational quote that will motivate and inspire readers.",
          author: "Author Name",
        },
      },
      {
        id: "link",
        name: "Link",
        icon: Link,
        type: "link" as const,
        content: {
          text: "Click here",
          url: "https://example.com",
          external: true,
        },
      },
    ],
  },
  {
    name: "TG - Buttons",
    icon: Plus,
    components: [
      {
        id: "tg-primary-button",
        name: "Primary Button",
        icon: Plus,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.primaryButton,
          category: "buttons",
        } as HtmlBlockContent,
      },
      {
        id: "tg-secondary-button",
        name: "Secondary Button",
        icon: Plus,
        type: "htmlBlock" as const,
        content: {
          html: `<button class="inline-flex items-center justify-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Secondary Button</button>`,
          category: "buttons",
        } as HtmlBlockContent,
      },
      {
        id: "tg-outline-button",
        name: "Outline Button",
        icon: Plus,
        type: "htmlBlock" as const,
        content: {
          html: `<button class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Outline Button</button>`,
          category: "buttons",
        } as HtmlBlockContent,
      },
      {
        id: "tg-danger-button",
        name: "Danger Button",
        icon: X,
        type: "htmlBlock" as const,
        content: {
          html: `<button class="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>`,
          category: "buttons",
        } as HtmlBlockContent,
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
        content: {
          html: sampleTailGridsSnippets.successAlert,
          category: "alerts",
        } as HtmlBlockContent,
      },
      {
        id: "tg-error-alert",
        name: "Error Alert",
        icon: XCircle,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="rounded-md bg-red-50 p-4 border border-red-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">Error! Something went wrong.</p>
              </div>
            </div>
          </div>`,
          category: "alerts",
        } as HtmlBlockContent,
      },
      {
        id: "tg-warning-alert",
        name: "Warning Alert",
        icon: AlertCircle,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="rounded-md bg-yellow-50 p-4 border border-yellow-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-yellow-800">Warning! Please check your input.</p>
              </div>
            </div>
          </div>`,
          category: "alerts",
        } as HtmlBlockContent,
      },
      {
        id: "tg-info-alert",
        name: "Info Alert",
        icon: Info,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="rounded-md bg-blue-50 p-4 border border-blue-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-blue-800">Info: Here's some helpful information.</p>
              </div>
            </div>
          </div>`,
          category: "alerts",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Cards",
    icon: FileText,
    components: [
      {
        id: "tg-product-card",
        name: "Product Card",
        icon: ShoppingCart,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.productCard,
          category: "cards",
        } as HtmlBlockContent,
      },
      {
        id: "tg-stats-card",
        name: "Stats Card",
        icon: BarChart3,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.statsCard,
          category: "cards",
        } as HtmlBlockContent,
      },
      {
        id: "tg-testimonial-card",
        name: "Testimonial Card",
        icon: Quote,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.testimonialCard,
          category: "cards",
        } as HtmlBlockContent,
      },
      {
        id: "tg-pricing-card",
        name: "Pricing Card",
        icon: Tag,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.pricingCard,
          category: "cards",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Forms",
    icon: Edit,
    components: [
      {
        id: "tg-contact-form",
        name: "Contact Form",
        icon: Mail,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.contactForm,
          category: "forms",
        } as HtmlBlockContent,
      },
      {
        id: "tg-login-form",
        name: "Login Form",
        icon: Lock,
        type: "htmlBlock" as const,
        content: {
          html: `<form class="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 class="text-2xl font-bold text-center text-gray-900">Sign In</h2>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="your@email.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="••••••••">
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Sign In</button>
          </form>`,
          category: "forms",
        } as HtmlBlockContent,
      },
      {
        id: "tg-newsletter-form",
        name: "Newsletter Form",
        icon: Mail,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-gray-100 p-6 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Subscribe to our newsletter</h3>
            <p class="text-gray-600 mb-4">Get the latest updates and news delivered to your inbox.</p>
            <form class="flex gap-2">
              <input type="email" class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter your email">
              <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Subscribe</button>
            </form>
          </div>`,
          category: "forms",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Navigation",
    icon: Menu,
    components: [
      {
        id: "tg-navbar",
        name: "Navigation Bar",
        icon: Menu,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.navbar,
          category: "navigation",
        } as HtmlBlockContent,
      },
      {
        id: "tg-breadcrumb",
        name: "Breadcrumb",
        icon: Home,
        type: "htmlBlock" as const,
        content: {
          html: `<nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Current Page</span>
                </div>
              </li>
            </ol>
          </nav>`,
          category: "navigation",
        } as HtmlBlockContent,
      },
      {
        id: "tg-sidebar",
        name: "Sidebar Menu",
        icon: Menu,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="w-64 bg-white shadow-lg h-screen">
            <div class="p-4">
              <h2 class="text-lg font-semibold text-gray-900">Menu</h2>
            </div>
            <nav class="mt-4">
              <a href="#" class="flex items-center px-4 py-2 text-gray-700 bg-gray-100">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                </svg>
                Dashboard
              </a>
              <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Users
              </a>
              <a href="#" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Settings
              </a>
            </nav>
          </div>`,
          category: "navigation",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Marketing",
    icon: Zap,
    components: [
      {
        id: "tg-hero-section",
        name: "Hero Section",
        icon: Star,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.heroSection,
          category: "marketing",
        } as HtmlBlockContent,
      },
      {
        id: "tg-feature-grid",
        name: "Feature Grid",
        icon: BarChart3,
        type: "htmlBlock" as const,
        content: {
          html: sampleTailGridsSnippets.featureGrid,
          category: "marketing",
        } as HtmlBlockContent,
      },
      {
        id: "tg-cta-section",
        name: "Call to Action",
        icon: Zap,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-blue-600 text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
              <p class="text-xl mb-8 opacity-90">Join thousands of satisfied customers and transform your business today.</p>
              <div class="space-x-4">
                <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Start Free Trial</button>
                <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">Contact Sales</button>
              </div>
            </div>
          </div>`,
          category: "marketing",
        } as HtmlBlockContent,
      },
      {
        id: "tg-logo-cloud",
        name: "Logo Cloud",
        icon: Globe,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-gray-50 py-12">
            <div class="max-w-7xl mx-auto px-4">
              <p class="text-center text-sm font-semibold text-gray-600 mb-8">Trusted by leading companies worldwide</p>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 1">
                </div>
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 2">
                </div>
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 3">
                </div>
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 4">
                </div>
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 5">
                </div>
                <div class="flex justify-center">
                  <img class="h-8 grayscale opacity-60 hover:opacity-100" src="/placeholder.svg?height=32&width=120" alt="Company 6">
                </div>
              </div>
            </div>
          </div>`,
          category: "marketing",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - E-Commerce",
    icon: ShoppingCart,
    components: [
      {
        id: "tg-product-grid",
        name: "Product Grid",
        icon: ShoppingCart,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${Array(4).fill(sampleTailGridsSnippets.productCard).join("")}
          </div>`,
          category: "ecommerce",
        } as HtmlBlockContent,
      },
      {
        id: "tg-shopping-cart",
        name: "Shopping Cart",
        icon: ShoppingCart,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4">Shopping Cart</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b pb-4">
                <div class="flex items-center">
                  <img class="w-16 h-16 object-cover rounded" src="/placeholder.svg?height=64&width=64" alt="Product">
                  <div class="ml-4">
                    <h3 class="font-medium">Product Name</h3>
                    <p class="text-gray-600 text-sm">Size: M, Color: Blue</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <button class="text-gray-400 hover:text-gray-600">-</button>
                  <span class="mx-2">1</span>
                  <button class="text-gray-400 hover:text-gray-600">+</button>
                  <span class="ml-4 font-semibold">$99.99</span>
                </div>
              </div>
              <div class="flex justify-between items-center pt-4">
                <span class="text-lg font-semibold">Total: $99.99</span>
                <button class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Checkout</button>
              </div>
            </div>
          </div>`,
          category: "ecommerce",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Dashboard",
    icon: BarChart3,
    components: [
      {
        id: "tg-stats-grid",
        name: "Stats Grid",
        icon: BarChart3,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${Array(4).fill(sampleTailGridsSnippets.statsCard).join("")}
          </div>`,
          category: "dashboard",
        } as HtmlBlockContent,
      },
      {
        id: "tg-data-table",
        name: "Data Table",
        icon: Table,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Recent Orders</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12345</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$299.99</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#12346</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jane Smith</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$149.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>`,
          category: "dashboard",
        } as HtmlBlockContent,
      },
    ],
  },
  {
    name: "TG - Application UI",
    icon: Monitor,
    components: [
      {
        id: "tg-user-profile",
        name: "User Profile",
        icon: User,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center">
              <img class="w-20 h-20 rounded-full" src="/placeholder.svg?height=80&width=80" alt="User">
              <div class="ml-6">
                <h2 class="text-xl font-semibold text-gray-900">John Doe</h2>
                <p class="text-gray-600">Software Engineer</p>
                <p class="text-gray-600">john.doe@example.com</p>
                <div class="mt-2">
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">Edit Profile</button>
                  <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">View Details</button>
                </div>
              </div>
            </div>
          </div>`,
          category: "application",
        } as HtmlBlockContent,
      },
      {
        id: "tg-notification-list",
        name: "Notification List",
        icon: Bell,
        type: "htmlBlock" as const,
        content: {
          html: `<div class="bg-white rounded-lg shadow-md">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="p-6 hover:bg-gray-50">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 7.586 8.707 5.293z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Your order has been confirmed</p>
                    <p class="text-sm text-gray-600">Order #12345 is being processed</p>
                    <p class="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div class="p-6 hover:bg-gray-50">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">Payment successful</p>
                    <p class="text-sm text-gray-600">Your payment of $99.99 has been processed</p>
                    <p class="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>`,
          category: "application",
        } as HtmlBlockContent,
      },
    ],
  },
]

interface ComponentPaletteProps {
  onComponentSelect: (component: ComponentItem) => void
}

export default function ComponentPalette({ onComponentSelect }: ComponentPaletteProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(["Basic Components"])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

  return (
    <div className="h-full bg-sky-50">
      <div className="p-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-slate-800">Components</h2>
        <p className="text-sm text-slate-600">Drag components to the canvas</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {componentCategories.map((category) => (
            <Card key={category.name} className="border-slate-200">
              <CardHeader
                className="pb-2 cursor-pointer hover:bg-slate-50"
                onClick={() => toggleCategory(category.name)}
              >
                <CardTitle className="text-sm flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.components.length}
                    </Badge>
                  </div>
                  <span className="text-xs">{expandedCategories.includes(category.name) ? "−" : "+"}</span>
                </CardTitle>
              </CardHeader>

              {expandedCategories.includes(category.name) && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-2">
                    {category.components.map((component) => (
                      <Button
                        key={component.id}
                        variant="ghost"
                        className="h-auto p-3 justify-start hover:bg-slate-100 border border-slate-200"
                        onClick={() => onComponentSelect(component)}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("application/json", JSON.stringify(component))
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <component.icon className="h-4 w-4 text-slate-600" />
                          <div className="text-left">
                            <div className="font-medium text-sm text-slate-800">{component.name}</div>
                            <div className="text-xs text-slate-500 capitalize">{component.type}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Export for use in other components
