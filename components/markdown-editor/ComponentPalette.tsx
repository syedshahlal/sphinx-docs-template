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
  Navigation,
  Mail,
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
  featureCard: `<div class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
    <p class="text-gray-600 leading-relaxed mb-6">Experience blazing fast performance with our optimized infrastructure and cutting-edge technology.</p>
    <a href="#" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
      Learn more
      <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </a>
  </div>`,

  pricingCard: `<div class="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-300">
    <div class="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-purple-600 text-white px-4 py-2 rounded-bl-2xl text-sm font-semibold">Popular</div>
    <div class="text-center">
      <h3 class="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
      <div class="flex items-center justify-center mb-6">
        <span class="text-5xl font-bold text-gray-900">$29</span>
        <span class="text-gray-500 ml-2">/month</span>
      </div>
      <ul class="space-y-4 mb-8 text-left">
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700">Unlimited projects</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700">Priority support</span>
        </li>
        <li class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-gray-700">Advanced analytics</span>
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

  // Enhanced Hero Sections
  modernHero: `<div class="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
    <div class="absolute inset-0 bg-black/20"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Build the <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Future</span> Today
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Transform your ideas into reality with our cutting-edge platform. Join thousands of innovators who trust us to power their success.
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button class="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/25 hover:scale-110">
            <span class="relative z-10">Start Free Trial</span>
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
          </button>
          <button class="group inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5"></path></svg>
            Watch Demo
          </button>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
  </div>`,

  // Enhanced Navigation
  modernNavbar: `<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <span class="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Brand</span>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a href="#" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Home</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Products</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Solutions</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Pricing</a>
            <a href="#" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Contact</a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">Sign In</button>
          <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>`,

  // Enhanced Tables
  modernTable: `<div class="overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100">
    <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">Payment received</div>
                  <div class="text-sm text-gray-500">From John Doe</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">+$2,500.00</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 15, 2024</td>
          </tr>
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">Subscription fee</div>
                  <div class="text-sm text-gray-500">Monthly billing</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">-$29.00</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 14, 2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,

  // Enhanced Forms
  modernContactForm: `<div class="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
      <p class="text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    </div>
    <form class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
          <input type="text" id="firstName" name="firstName" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="John">
        </div>
        <div>
          <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
          <input type="text" id="lastName" name="lastName" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Doe">
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
        <input type="email" id="email" name="email" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="john@example.com">
      </div>
      <div>
        <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
        <select id="subject" name="subject" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
          <option>General Inquiry</option>
          <option>Support Request</option>
          <option>Partnership</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
        <textarea id="message" name="message" rows="6" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none" placeholder="Tell us about your project..."></textarea>
      </div>
      <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
        Send Message
      </button>
    </form>
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
  {
    name: "TG - Enhanced Heroes",
    icon: Target,
    color: "indigo",
    components: [
      {
        type: "htmlBlock",
        name: "Modern Hero",
        icon: Target,
        description: "Stunning gradient hero section",
        htmlBlockKey: "modernHero",
        tags: ["hero", "landing", "gradient"],
      },
    ],
  },
  {
    name: "TG - Enhanced Navigation",
    icon: Navigation,
    color: "teal",
    components: [
      {
        type: "htmlBlock",
        name: "Modern Navbar",
        icon: Navigation,
        description: "Glassmorphism navigation bar",
        htmlBlockKey: "modernNavbar",
        tags: ["navigation", "modern", "glassmorphism"],
      },
    ],
  },
  {
    name: "TG - Enhanced Tables",
    icon: Table,
    color: "orange",
    components: [
      {
        type: "htmlBlock",
        name: "Modern Table",
        icon: Table,
        description: "Beautiful data table with interactions",
        htmlBlockKey: "modernTable",
        tags: ["table", "data", "modern"],
      },
    ],
  },
  {
    name: "TG - Enhanced Forms",
    icon: Mail,
    color: "pink",
    components: [
      {
        type: "htmlBlock",
        name: "Modern Contact Form",
        icon: Mail,
        description: "Beautiful contact form with validation",
        htmlBlockKey: "modernContactForm",
        tags: ["form", "contact", "modern"],
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
    case "chart":
      return {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "rgba(54, 162, 235, 0.8)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: "Monthly Sales" },
          },
        },
      }
    case "infographic":
      return {
        type: "stats",
        title: "Our Impact",
        layout: "grid",
        items: [
          { id: "1", title: "Users", value: "10K+", icon: "users", color: "#3B82F6" },
          { id: "2", title: "Projects", value: "500+", icon: "briefcase", color: "#10B981" },
          { id: "3", title: "Countries", value: "25+", icon: "globe", color: "#F59E0B" },
          { id: "4", title: "Success Rate", value: "99%", icon: "check", color: "#EF4444" },
        ],
        animations: {
          enabled: true,
          type: "fade",
          duration: 800,
          delay: 200,
        },
      }
    case "gallery":
      return {
        images: [
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 1", caption: "Image 1" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 2", caption: "Image 2" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Gallery image 3", caption: "Image 3" },
        ],
        layout: "grid",
        columns: 3,
        gap: "1rem",
        lightbox: true,
      }
    case "testimonial":
      return {
        quote:
          "This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed.",
        author: "John Doe",
        position: "CEO, Company Inc.",
        avatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        layout: "card",
      }
    case "pricing":
      return {
        plans: [
          {
            name: "Basic",
            price: "$9",
            period: "month",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            popular: false,
            buttonText: "Get Started",
          },
          {
            name: "Pro",
            price: "$29",
            period: "month",
            features: ["Everything in Basic", "Feature 4", "Feature 5", "Priority Support"],
            popular: true,
            buttonText: "Get Started",
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "month",
            features: ["Everything in Pro", "Custom Integration", "Dedicated Support"],
            popular: false,
            buttonText: "Contact Sales",
          },
        ],
        layout: "cards",
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
        "group flex items-start space-x-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-lg cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50 shadow-2xl scale-105 rotate-2",
      )}
    >
      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200">
        <IconComponent className="h-5 w-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-900 transition-colors duration-200">
          {component.name}
        </p>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 group-hover:text-slate-600 transition-colors duration-200">
          {component.description}
        </p>
        {component.tags && component.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {component.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600">
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
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Palette className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Components</h2>
            <p className="text-sm text-slate-600">Drag to canvas to add</p>
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              )}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2 bg-slate-100">
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
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-slate-100/70 transition-all duration-200 bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg transition-all duration-200",
                            category.color === "blue" && "bg-blue-100 text-blue-600",
                            category.color === "purple" && "bg-purple-100 text-purple-600",
                            category.color === "green" && "bg-green-100 text-green-600",
                            category.color === "orange" && "bg-orange-100 text-orange-600",
                            category.color === "indigo" && "bg-indigo-100 text-indigo-600",
                            category.color === "teal" && "bg-teal-100 text-teal-600",
                            category.color === "pink" && "bg-pink-100 text-pink-600",
                          )}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-slate-900">{category.name}</span>
                          <Badge variant="secondary" className="ml-2 text-xs bg-slate-100 text-slate-600">
                            {category.components.length}
                          </Badge>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-200" />
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
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No components found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
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
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Layout className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Templates Coming Soon</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
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
