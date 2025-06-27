"use client"

import { Button } from "@/components/ui/button"

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
  Star,
  Award,
  Zap,
  Target,
  Layers,
  Layout,
  Palette,
  Sparkles,
  Users,
  Mail,
  File,
  BookOpen,
  Terminal,
  Play,
  Download,
  Info,
  CheckCircle,
  XCircle,
  HelpCircle,
  Clock,
  Database,
  Workflow,
  Puzzle,
  Bug,
  Rocket,
  Activity,
  Timer,
  FileText,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, HtmlBlockContent } from "./types"

// Enhanced TailGrids component definitions with technical documentation focus
const tailGridsComponents = {
  // Documentation Hero Sections
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
                <pre class="text-sm text-gray-800 dark:text-gray-200"><code>curl -X POST \\
  https://api.example.com/v1/users \\
  -H "Authorization: Bearer token" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe"}'</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,

  // API Reference Card
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
            <pre class="text-sm text-gray-300"><code>{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2023-01-01T00:00:00Z"
}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  // Code Example with Tabs
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
        <button class="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          Node.js
        </button>
      </nav>
    </div>
    <div class="relative">
      <div class="absolute top-4 right-4 z-10">
        <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Copy
        </button>
      </div>
      <div class="bg-gray-900 p-6 overflow-x-auto">
        <pre class="text-sm text-gray-300"><code>curl -X POST https://api.example.com/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer"
  }'</code></pre>
      </div>
    </div>
  </div>`,

  // Step-by-Step Guide
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
    
    <div class="flex">
      <div class="flex-shrink-0">
        <div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
          <span class="text-sm font-medium text-white">3</span>
        </div>
      </div>
      <div class="ml-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Make Your First Request</h3>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Now you're ready to make your first API call.
        </p>
        <div class="mt-3 bg-gray-900 rounded-md p-3">
          <code class="text-sm text-gray-300">const user = await client.users.get('user_123');</code>
        </div>
      </div>
    </div>
  </div>`,

  // Callout/Admonition
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

  // Interactive Demo
  interactiveDemo: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive API Demo</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Try our API directly in your browser</p>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Request</label>
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Endpoint</label>
              <input type="text" value="/api/v1/users" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white" readonly>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Method</label>
              <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Headers</label>
              <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono" placeholder='{"Authorization": "Bearer token"}'></textarea>
            </div>
            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
              Send Request
            </button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Response</label>
          <div class="bg-gray-900 rounded-md p-4 h-64 overflow-auto">
            <pre class="text-sm text-gray-300"><code>{
  "users": [
    {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  // SDK Installation Guide
  sdkInstallation: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">SDK Installation</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Choose your preferred language and package manager</p>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center mr-3">
              <span class="text-xs font-bold text-black">JS</span>
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white">JavaScript</h4>
          </div>
          <div class="space-y-2">
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">npm install @example/sdk</code>
            </div>
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">yarn add @example/sdk</code>
            </div>
          </div>
        </div>
        
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-3">
              <span class="text-xs font-bold text-white">PY</span>
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white">Python</h4>
          </div>
          <div class="space-y-2">
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">pip install example-sdk</code>
            </div>
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">poetry add example-sdk</code>
            </div>
          </div>
        </div>
        
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer">
          <div class="flex items-center mb-3">
            <div class="w-8 h-8 bg-red-500 rounded flex items-center justify-center mr-3">
              <span class="text-xs font-bold text-white">RB</span>
            </div>
            <h4 class="font-medium text-gray-900 dark:text-white">Ruby</h4>
          </div>
          <div class="space-y-2">
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">gem install example-sdk</code>
            </div>
            <div class="bg-gray-900 rounded p-2">
              <code class="text-xs text-gray-300">bundle add example-sdk</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  // Changelog Entry
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
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
              <li>• Added support for webhook signatures</li>
              <li>• New batch operations endpoint</li>
              <li>• Enhanced error handling with detailed codes</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">🐛 Bug Fixes</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
              <li>• Fixed rate limiting edge case</li>
              <li>• Resolved pagination issue with large datasets</li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-1">⚠️ Breaking Changes</h4>
            <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
              <li>• Deprecated <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">legacy_field</code> in favor of <code class="bg-gray-100 dark:bg-gray-700 px-1 rounded">new_field</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`,

  // Error Reference
  errorReference: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
    <div class="bg-red-50 dark:bg-red-900/20 px-6 py-4 border-b border-red-200 dark:border-red-800">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="text-lg font-medium text-red-800 dark:text-red-200">Error 400: Bad Request</h3>
      </div>
    </div>
    <div class="p-6">
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            The request was invalid or cannot be served. This usually indicates a problem with the request syntax, size, or content.
          </p>
        </div>
        
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Common Causes</h4>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
            <li>• Missing required parameters</li>
            <li>• Invalid parameter values</li>
            <li>• Malformed JSON in request body</li>
            <li>• Incorrect Content-Type header</li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Example Response</h4>
          <div class="bg-gray-900 rounded-md p-4">
            <pre class="text-sm text-gray-300"><code>{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter: email",
    "details": {
      "field": "email",
      "reason": "required"
    }
  }
}</code></pre>
          </div>
        </div>
        
        <div>
          <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">How to Fix</h4>
          <ol class="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
            <li>1. Check that all required parameters are included</li>
            <li>2. Verify parameter values match expected formats</li>
            <li>3. Ensure JSON syntax is valid</li>
            <li>4. Set Content-Type header to application/json</li>
          </ol>
        </div>
      </div>
    </div>
  </div>`,

  // Architecture Diagram
  architectureDiagram: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">System Architecture</h3>
    <div class="relative">
      <svg viewBox="0 0 800 400" class="w-full h-auto">
        <!-- Client -->
        <rect x="50" y="50" width="120" height="80" rx="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
        <text x="110" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Client App</text>
        
        <!-- API Gateway -->
        <rect x="250" y="50" width="120" height="80" rx="8" fill="#10B981" stroke="#047857" strokeWidth="2"/>
        <text x="310" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">API Gateway</text>
        
        <!-- Microservices -->
        <rect x="450" y="20" width="100" height="60" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <text x="500" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Auth Service</text>
        
        <rect x="450" y="100" width="100" height="60" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <text x="500" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User Service</text>
        
        <rect x="450" y="180" width="100" height="60" rx="8" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <text x="500" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Data Service</text>
        
        <!-- Database -->
        <rect x="650" y="120" width="100" height="80" rx="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <text x="700" y="165" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Database</text>
        
        <!-- Arrows -->
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280"/>
          </marker>
        </defs>
        
        <!-- Client to API Gateway -->
        <line x1="170" y1="90" x2="250" y2="90" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        <!-- API Gateway to Services -->
        <line x1="370" y1="70" x2="450" y2="50" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="370" y1="90" x2="450" y2="130" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="370" y1="110" x2="450" y2="210" stroke="#6B7280" strokeEnd="url(#arrowhead)"/>
        
        <!-- Services to Database -->
        <line x1="550" y1="130" x2="650" y2="150" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="550" y1="160" x2="650" y2="160" stroke="#6B7280" strokeEnd="url(#arrowhead)"/>
        <line x1="550" y1="210" x2="650" y2="170" stroke="#6B7280" strokeEnd="url(#arrowhead)"/>
      </svg>
    </div>
    <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
      <p>The system follows a microservices architecture with an API Gateway handling client requests and routing them to appropriate services.</p>
    </div>
  </div>`,

  // Performance Metrics
  performanceMetrics: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">99.9%</p>
            <p class="text-sm text-green-700 dark:text-green-300">Uptime</p>
          </div>
        </div>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">45ms</p>
            <p class="text-sm text-blue-700 dark:text-blue-300">Avg Response</p>
          </div>
        </div>
      </div>
      
      <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">10K</p>
            <p class="text-sm text-purple-700 dark:text-purple-300">Requests/min</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Response Time Trend (Last 24h)</h4>
      <div class="h-32 bg-white dark:bg-gray-800 rounded border flex items-end justify-between p-2">
        <div class="w-2 bg-green-500 h-16"></div>
        <div class="w-2 bg-green-500 h-20"></div>
        <div class="w-2 bg-green-500 h-12"></div>
        <div class="w-2 bg-yellow-500 h-24"></div>
        <div class="w-2 bg-green-500 h-18"></div>
        <div class="w-2 bg-green-500 h-22"></div>
        <div class="w-2 bg-green-500 h-14"></div>
        <div class="w-2 bg-green-500 h-16"></div>
        <div class="w-2 bg-green-500 h-20"></div>
        <div class="w-2 bg-green-500 h-18"></div>
        <div class="w-2 bg-green-500 h-16"></div>
        <div class="w-2 bg-green-500 h-14"></div>
      </div>
    </div>
  </div>`,

  // Rate Limiting Info
  rateLimiting: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Rate Limiting</h3>
    <div class="space-y-4">
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Current Limits</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-blue-700 dark:text-blue-300">Free Tier</p>
            <p class="text-lg font-semibold text-blue-800 dark:text-blue-200">1,000 requests/hour</p>
          </div>
          <div>
            <p class="text-sm text-blue-700 dark:text-blue-300">Pro Tier</p>
            <p class="text-lg font-semibold text-blue-800 dark:text-blue-200">10,000 requests/hour</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Response Headers</h4>
        <div class="bg-gray-900 rounded-md p-4">
          <pre class="text-sm text-gray-300"><code>X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200</code></pre>
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Rate Limit Exceeded Response</h4>
        <div class="bg-gray-900 rounded-md p-4">
          <pre class="text-sm text-gray-300"><code>{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 3600 seconds.",
    "retry_after": 3600
  }
}</code></pre>
        </div>
      </div>
    </div>
  </div>`,

  // Webhook Documentation
  webhookDocs: `<div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Webhook Configuration</h3>
    <div class="space-y-6">
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Setup</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Configure your webhook endpoint to receive real-time notifications when events occur.
        </p>
        <div class="bg-gray-900 rounded-md p-4">
          <pre class="text-sm text-gray-300"><code>POST /api/v1/webhooks
{
  "url": "https://your-app.com/webhooks",
  "events": ["user.created", "user.updated"],
  "secret": "your-webhook-secret"
}</code></pre>
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Event Types</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">user.created</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Triggered when a new user is created</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">user.updated</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Triggered when user data is modified</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">user.deleted</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Triggered when a user is deleted</p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <code class="text-sm font-mono text-blue-600 dark:text-blue-400">payment.completed</code>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Triggered when payment is processed</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Payload Example</h4>
        <div class="bg-gray-900 rounded-md p-4">
          <pre class="text-sm text-gray-300"><code>{
  "id": "evt_1234567890",
  "type": "user.created",
  "created": 1640995200,
  "data": {
    "object": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2023-01-01T00:00:00Z"
    }
  }
}</code></pre>
        </div>
      </div>
      
      <div>
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Signature Verification</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Verify webhook signatures to ensure requests are from our servers.
        </p>
        <div class="bg-gray-900 rounded-md p-4">
          <pre class="text-sm text-gray-300"><code>const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === \`sha256=${expectedSignature}\`;
}</code></pre>
        </div>
      </div>
    </div>
  </div>`,
}

// Enhanced component categories with comprehensive technical documentation components
export const componentCategories = [
  {
    name: "Basic Text & Content",
    icon: Type,
    color: "blue",
    components: [
      {
        type: "heading",
        name: "Heading",
        icon: Type,
        description: "Add headings (H1-H6)",
        tags: ["text", "title", "structure"],
      },
      {
        type: "paragraph",
        name: "Paragraph",
        icon: Type,
        description: "Add text paragraphs",
        tags: ["text", "content", "body"],
      },
      {
        type: "blockquote",
        name: "Quote",
        icon: Quote,
        description: "Add blockquotes and citations",
        tags: ["text", "emphasis", "citation"],
      },
      {
        type: "list",
        name: "Bullet List",
        icon: List,
        description: "Add unordered lists",
        tags: ["text", "list", "bullets"],
      },
      {
        type: "orderedList",
        name: "Numbered List",
        icon: ListOrdered,
        description: "Add ordered lists",
        tags: ["text", "list", "numbers"],
      },
      {
        type: "taskList",
        name: "Task List",
        icon: CheckSquare,
        description: "Add task/todo lists",
        tags: ["interactive", "tasks", "checklist"],
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
        tags: ["code", "technical", "syntax"],
      },
      {
        type: "mermaid",
        name: "Mermaid Diagram",
        icon: GitBranch,
        description: "Add flowcharts and diagrams",
        tags: ["diagram", "flowchart", "technical"],
      },
      {
        type: "htmlBlock",
        name: "Terminal Output",
        icon: Terminal,
        description: "Show command line output",
        htmlBlockKey: "terminalOutput",
        tags: ["terminal", "cli", "output"],
      },
      {
        type: "htmlBlock",
        name: "API Reference",
        icon: Database,
        description: "Document API endpoints",
        htmlBlockKey: "apiReference",
        tags: ["api", "reference", "documentation"],
      },
      {
        type: "htmlBlock",
        name: "Code Example",
        icon: FileCode,
        description: "Multi-language code examples",
        htmlBlockKey: "codeExample",
        tags: ["code", "example", "multi-language"],
      },
      {
        type: "htmlBlock",
        name: "Interactive Demo",
        icon: Play,
        description: "Interactive API testing",
        htmlBlockKey: "interactiveDemo",
        tags: ["interactive", "demo", "api"],
      },
      {
        type: "htmlBlock",
        name: "SDK Installation",
        icon: Download,
        description: "SDK installation guide",
        htmlBlockKey: "sdkInstallation",
        tags: ["sdk", "installation", "setup"],
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
        tags: ["guide", "steps", "tutorial"],
      },
      {
        type: "htmlBlock",
        name: "Info Callout",
        icon: Info,
        description: "Information callout box",
        htmlBlockKey: "calloutInfo",
        tags: ["callout", "info", "note"],
      },
      {
        type: "htmlBlock",
        name: "Warning Callout",
        icon: AlertTriangle,
        description: "Warning callout box",
        htmlBlockKey: "calloutWarning",
        tags: ["callout", "warning", "caution"],
      },
      {
        type: "htmlBlock",
        name: "Danger Callout",
        icon: XCircle,
        description: "Danger callout box",
        htmlBlockKey: "calloutDanger",
        tags: ["callout", "danger", "error"],
      },
      {
        type: "htmlBlock",
        name: "Success Callout",
        icon: CheckCircle,
        description: "Success callout box",
        htmlBlockKey: "calloutSuccess",
        tags: ["callout", "success", "tip"],
      },
      {
        type: "htmlBlock",
        name: "Changelog Entry",
        icon: Clock,
        description: "Version changelog entry",
        htmlBlockKey: "changelogEntry",
        tags: ["changelog", "version", "release"],
      },
      {
        type: "htmlBlock",
        name: "Error Reference",
        icon: Bug,
        description: "Error code documentation",
        htmlBlockKey: "errorReference",
        tags: ["error", "reference", "troubleshooting"],
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
        tags: ["media", "visual", "photo"],
      },
      {
        type: "gallery",
        name: "Image Gallery",
        icon: Grid3X3,
        description: "Add image galleries",
        tags: ["media", "gallery", "collection"],
      },
      {
        type: "htmlBlock",
        name: "Architecture Diagram",
        icon: Workflow,
        description: "System architecture diagram",
        htmlBlockKey: "architectureDiagram",
        tags: ["diagram", "architecture", "system"],
      },
      {
        type: "chart",
        name: "Chart",
        icon: BarChart3,
        description: "Add interactive charts",
        tags: ["data", "visualization", "chart"],
      },
      {
        type: "htmlBlock",
        name: "Performance Metrics",
        icon: Activity,
        description: "Performance dashboard",
        htmlBlockKey: "performanceMetrics",
        tags: ["metrics", "performance", "dashboard"],
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
        tags: ["layout", "responsive", "grid"],
      },
      {
        type: "columns",
        name: "Columns",
        icon: Columns,
        description: "Add multi-column layouts",
        tags: ["layout", "columns", "split"],
      },
      {
        type: "card",
        name: "Card",
        icon: CreditCard,
        description: "Add content cards",
        tags: ["container", "content", "card"],
      },
      {
        type: "divider",
        name: "Divider",
        icon: Minus,
        description: "Add horizontal dividers",
        tags: ["layout", "separator", "break"],
      },
      {
        type: "spacer",
        name: "Spacer",
        icon: Space,
        description: "Add vertical spacing",
        tags: ["layout", "spacing", "gap"],
      },
      {
        type: "table",
        name: "Table",
        icon: Table,
        description: "Add data tables",
        tags: ["data", "tabular", "structured"],
      },
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
        tags: ["interactive", "cta", "action"],
      },
      {
        type: "alert",
        name: "Alert",
        icon: AlertTriangle,
        description: "Add alert messages",
        tags: ["notification", "message", "alert"],
      },
      {
        type: "htmlBlock",
        name: "Rate Limiting",
        icon: Timer,
        description: "Rate limiting documentation",
        htmlBlockKey: "rateLimiting",
        tags: ["rate-limit", "api", "limits"],
      },
      {
        type: "htmlBlock",
        name: "Webhook Docs",
        icon: Zap,
        description: "Webhook configuration guide",
        htmlBlockKey: "webhookDocs",
        tags: ["webhook", "events", "integration"],
      },
    ],
  },
  {
    name: "Documentation Templates",
    icon: FileText,
    color: "pink",
    components: [
      {
        type: "htmlBlock",
        name: "Docs Hero",
        icon: Target,
        description: "Documentation hero section",
        htmlBlockKey: "docsHero",
        tags: ["hero", "documentation", "landing"],
      },
      {
        type: "testimonial",
        name: "Testimonial",
        icon: Star,
        description: "Add customer testimonials",
        tags: ["social", "review", "feedback"],
      },
      {
        type: "pricing",
        name: "Pricing Table",
        icon: Award,
        description: "Add pricing tables",
        tags: ["pricing", "comparison", "plans"],
      },
    ],
  },
  {
    name: "Advanced Components",
    icon: Sparkles,
    color: "red",
    components: [
      {
        type: "banner",
        name: "Banner",
        icon: Layers,
        description: "Add promotional banners",
        tags: ["marketing", "promotion", "announcement"],
      },
      {
        type: "hero",
        name: "Hero Section",
        icon: Target,
        description: "Add hero sections",
        tags: ["marketing", "landing", "header"],
      },
      {
        type: "htmlBlock",
        name: "HTML Block",
        icon: FileCode,
        description: "Add custom HTML content",
        tags: ["custom", "html", "advanced"],
      },
    ],
  },
  {
    name: "TailGrids - Marketing",
    icon: Target,
    color: "blue",
    components: [
      {
        type: "htmlBlock",
        name: "Hero Gradient",
        icon: Zap,
        description: "Modern gradient hero section",
        htmlBlockKey: "heroGradient",
        tags: ["hero", "gradient", "cta"],
      },
      {
        type: "htmlBlock",
        name: "Hero Minimal",
        icon: Layout,
        description: "Clean minimal hero with image",
        htmlBlockKey: "heroMinimal",
        tags: ["hero", "minimal", "image"],
      },
      {
        type: "htmlBlock",
        name: "Features Grid",
        icon: Grid3X3,
        description: "Professional features grid",
        htmlBlockKey: "featuresGrid",
        tags: ["features", "grid", "icons"],
      },
      {
        type: "htmlBlock",
        name: "CTA Gradient",
        icon: Target,
        description: "Eye-catching call-to-action",
        htmlBlockKey: "ctaGradient",
        tags: ["cta", "gradient", "action"],
      },
    ],
  },
  {
    name: "TailGrids - Business",
    icon: Building2,
    color: "green",
    components: [
      {
        type: "htmlBlock",
        name: "Pricing Cards",
        icon: CreditCard,
        description: "Professional pricing table",
        htmlBlockKey: "pricingCards",
        tags: ["pricing", "cards", "popular"],
      },
      {
        type: "htmlBlock",
        name: "Team Grid",
        icon: Users,
        description: "Professional team member grid",
        htmlBlockKey: "teamGrid",
        tags: ["team", "grid", "members"],
      },
      {
        type: "htmlBlock",
        name: "Testimonial Slider",
        icon: Star,
        description: "Customer testimonials with ratings",
        htmlBlockKey: "testimonialSlider",
        tags: ["testimonial", "slider", "ratings"],
      },
    ],
  },
  {
    name: "TailGrids - Content",
    icon: FileText,
    color: "purple",
    components: [
      {
        type: "htmlBlock",
        name: "Blog Grid",
        icon: File,
        description: "Modern blog posts grid layout",
        htmlBlockKey: "blogGrid",
        tags: ["blog", "grid", "posts"],
      },
      {
        type: "htmlBlock",
        name: "FAQ Accordion",
        icon: HelpCircle,
        description: "Expandable FAQ accordion",
        htmlBlockKey: "faqAccordion",
        tags: ["faq", "accordion", "questions"],
      },
      {
        type: "htmlBlock",
        name: "Contact Form",
        icon: Mail,
        description: "Complete contact section",
        htmlBlockKey: "contactForm",
        tags: ["contact", "form", "info"],
      },
    ],
  },
]

// Get default content for each component type (enhanced)
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
        variant: "default",
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
    case "banner":
      return {
        title: "Special Announcement",
        subtitle: "Important Update",
        description: "We've released new features to improve your documentation experience",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textColor: "white",
        buttons: [{ text: "Learn More", variant: "default", link: "#" }],
      }
    case "hero":
      return {
        title: "Welcome to Our Documentation",
        subtitle: "Everything You Need to Get Started",
        description:
          "Comprehensive guides, API references, and tutorials to help you integrate and build amazing applications.",
        backgroundImage: "",
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        textAlign: "center",
        buttons: [
          { text: "Get Started", variant: "default", link: "#" },
          { text: "View API Docs", variant: "outline", link: "#" },
        ],
      }
    case "table":
      return {
        headers: ["Property", "Type", "Required", "Description"],
        rows: [
          ["id", "string", "Yes", "Unique identifier"],
          ["name", "string", "Yes", "Display name"],
          ["email", "string", "No", "Email address"],
          ["created_at", "datetime", "No", "Creation timestamp"],
        ],
      }
    case "divider":
      return { style: "solid", color: "#e5e7eb", thickness: "1px", margin: "2rem 0" }
    case "list":
      return { items: ["First item", "Second item", "Third item"] }
    case "orderedList":
      return { items: ["First step", "Second step", "Third step"], start: 1 }
    case "taskList":
      return {
        items: [
          { text: "Set up development environment", checked: true },
          { text: "Install required dependencies", checked: true },
          { text: "Configure API credentials", checked: false },
          { text: "Run first test", checked: false },
        ],
      }
    case "blockquote":
      return { text: "Documentation is a love letter that you write to your future self.", author: "Damian Conway" }
    case "alert":
      return {
        type: "info",
        title: "Information",
        text: "This is an informational alert message for your documentation.",
      }
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
        showLineNumbers: true,
        theme: "dark",
      }
    case "spacer":
      return { height: "40px" }
    case "columns":
      return {
        column1Text: "This column contains the main content or instructions for your documentation.",
        column2Text: "This column can contain additional information, examples, or related content.",
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
    E --> F[Return Response]
    D --> G[Log Error]`,
        theme: "default",
      }
    case "chart":
      return {
        type: "bar",
        data: {
          labels: ["API Calls", "Response Time", "Error Rate", "Uptime", "Throughput"],
          datasets: [
            {
              label: "Performance Metrics",
              data: [95, 87, 2, 99.9, 92],
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "API Performance Dashboard",
            },
          },
        },
      }
    case "gallery":
      return {
        images: [
          {
            src: "/placeholder.svg?height=300&width=400",
            alt: "API Dashboard Screenshot",
            caption: "Main dashboard view",
          },
          { src: "/placeholder.svg?height=300&width=400", alt: "Settings Panel", caption: "Configuration settings" },
          { src: "/placeholder.svg?height=300&width=400", alt: "Analytics View", caption: "Usage analytics" },
        ],
      }
    case "testimonial":
      return {
        quote: "This API documentation is incredibly clear and comprehensive. It made integration a breeze!",
        author: "Sarah Johnson",
        title: "Senior Developer, TechCorp",
        avatarUrl: "/placeholder.svg?height=60&width=60",
      }
    case "pricing":
      return {
        plans: [
          {
            name: "Free",
            price: "$0",
            period: "/ month",
            features: ["1,000 API calls", "Basic support", "Standard rate limits", "Community access"],
            buttonText: "Get Started",
            popular: false,
          },
          {
            name: "Pro",
            price: "$29",
            period: "/ month",
            features: [
              "50,000 API calls",
              "Priority support",
              "Higher rate limits",
              "Advanced analytics",
              "Webhook support",
            ],
            buttonText: "Start Free Trial",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: [
              "Unlimited API calls",
              "24/7 dedicated support",
              "Custom rate limits",
              "SLA guarantee",
              "On-premise deployment",
            ],
            buttonText: "Contact Sales",
            popular: false,
          },
        ],
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
        htmlContent: `<div class='p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50 dark:bg-gray-900 dark:border-gray-700'>
          <h3 class='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2'>Custom HTML Block</h3>
          <p class='text-gray-500 dark:text-gray-400'>Add your custom HTML content here</p>
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

// Enhanced draggable component with better accessibility
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
      role="button"
      tabIndex={0}
      aria-label={`Drag ${component.name} component`}
      className={cn(
        "group flex items-start space-x-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:border-border/80 hover:shadow-lg cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isDragging && "opacity-50 shadow-2xl scale-105 rotate-2 z-50",
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          // Handle keyboard activation
        }
      }}
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
            {component.tags.slice(0, 3).map((tag) => (
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

// Enhanced main component palette
export function ComponentPalette() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Basic Text & Content", "Code & Technical"])
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

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
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
            aria-label="Search components"
          />
        </div>

        {/* Enhanced tag filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Filter by tags:</span>
            {(selectedTags.length > 0 || searchQuery) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                Clear
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1">
            {allTags.slice(0, 8).map((tag) => (
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
      </div>

      <Tabs defaultValue="components" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2">
          <TabsTrigger value="components" className="text-sm">
            <Puzzle className="h-4 w-4 mr-2" />
            Components
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">
            <FileText className="h-4 w-4 mr-2" />
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
                    <CollapsibleTrigger
                      className="flex w-full items-center justify-between rounded-xl p-4 text-left hover:bg-muted/70 transition-all duration-200 bg-card border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-expanded={isExpanded}
                      aria-controls={`category-${category.name.replace(/\s+/g, "-")}`}
                    >
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
                            category.color === "red" && "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                            category.color === "yellow" &&
                              "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
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

                    <CollapsibleContent
                      className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200"
                      id={`category-${category.name.replace(/\s+/g, "-")}`}
                    >
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
                  <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="templates" className="flex-1">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Template previews */}
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">API Documentation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete API documentation template with endpoints, examples, and guides.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      API
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Reference
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Examples
                    </Badge>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Getting Started Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Step-by-step onboarding guide with installation, setup, and first steps.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Tutorial
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Setup
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Onboarding
                    </Badge>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <Bug className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Troubleshooting Guide</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Common issues, error codes, and solutions for debugging problems.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">
                      Troubleshooting
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Errors
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Solutions
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="text-center py-8 border-t border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">More Templates Coming Soon</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We're working on more pre-built templates to help you create documentation faster.
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
