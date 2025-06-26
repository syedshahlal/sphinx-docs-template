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
  // Core Components - Buttons (33 variations)
  tgButtonPrimary: {
    label: "Primary Button",
    html: `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Primary Button</button>`,
  },
  tgButtonSecondary: {
    label: "Secondary Button",
    html: `<button class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Secondary</button>`,
  },
  tgButtonOutline: {
    label: "Outline Button",
    html: `<button class="inline-flex items-center justify-center rounded-md border-2 border-blue-600 bg-transparent px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">Outline</button>`,
  },
  tgButtonGhost: {
    label: "Ghost Button",
    html: `<button class="inline-flex items-center justify-center rounded-md bg-transparent px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">Ghost</button>`,
  },
  tgButtonIcon: {
    label: "Icon Button",
    html: `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"><svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>Add Item</button>`,
  },

  // Core Components - Alerts (11 variations)
  tgAlertInfo: {
    label: "Info Alert",
    html: `<div class="rounded-md bg-blue-50 p-4 border border-blue-200"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-blue-800">Information</h3><div class="mt-2 text-sm text-blue-700"><p>This is an informational alert message.</p></div></div></div></div>`,
  },
  tgAlertSuccess: {
    label: "Success Alert",
    html: `<div class="rounded-md bg-green-50 p-4 border border-green-200"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-green-800">Success</h3><div class="mt-2 text-sm text-green-700"><p>Your action was completed successfully!</p></div></div></div></div>`,
  },
  tgAlertWarning: {
    label: "Warning Alert",
    html: `<div class="rounded-md bg-yellow-50 p-4 border border-yellow-200"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-yellow-800">Warning</h3><div class="mt-2 text-sm text-yellow-700"><p>Please review this important information.</p></div></div></div></div>`,
  },
  tgAlertError: {
    label: "Error Alert",
    html: `<div class="rounded-md bg-red-50 p-4 border border-red-200"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg></div><div class="ml-3"><h3 class="text-sm font-medium text-red-800">Error</h3><div class="mt-2 text-sm text-red-700"><p>There was an error processing your request.</p></div></div></div></div>`,
  },

  // Core Components - Cards (16 variations)
  tgCardBasic: {
    label: "Basic Card",
    html: `<div class="bg-white overflow-hidden shadow rounded-lg"><div class="px-4 py-5 sm:p-6"><h3 class="text-lg leading-6 font-medium text-gray-900">Card Title</h3><div class="mt-2 max-w-xl text-sm text-gray-500"><p>This is a basic card component with some content.</p></div></div></div>`,
  },
  tgCardWithImage: {
    label: "Card with Image",
    html: `<div class="bg-white overflow-hidden shadow rounded-lg"><img class="h-48 w-full object-cover" src="/placeholder.svg?height=200&width=400" alt="Card image"><div class="px-4 py-5 sm:p-6"><h3 class="text-lg leading-6 font-medium text-gray-900">Card with Image</h3><div class="mt-2 max-w-xl text-sm text-gray-500"><p>This card includes an image at the top.</p></div><div class="mt-3"><button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Learn More</button></div></div></div>`,
  },
  tgCardProduct: {
    label: "Product Card",
    html: `<div class="bg-white shadow rounded-lg overflow-hidden"><div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200"><img src="/placeholder.svg?height=300&width=300" alt="Product" class="h-full w-full object-cover object-center"></div><div class="p-4"><h3 class="text-sm font-medium text-gray-900">Product Name</h3><p class="mt-1 text-sm text-gray-500">Brief product description</p><div class="mt-2 flex items-center justify-between"><span class="text-lg font-bold text-gray-900">$29.99</span><button class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Add to Cart</button></div></div></div>`,
  },
  tgCardProfile: {
    label: "Profile Card",
    html: `<div class="bg-white shadow rounded-lg p-6"><div class="flex items-center"><div class="flex-shrink-0"><img class="h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="Profile"></div><div class="ml-4"><div class="text-sm font-medium text-gray-900">John Doe</div><div class="text-sm text-gray-500">Software Engineer</div></div></div><div class="mt-4"><p class="text-sm text-gray-600">Passionate developer with 5+ years of experience in web technologies.</p></div></div>`,
  },

  // Core Components - Form Elements
  tgFormInput: {
    label: "Input Field",
    html: `<div class="mb-4"><label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email"></div>`,
  },
  tgFormTextarea: {
    label: "Textarea",
    html: `<div class="mb-4"><label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your message"></textarea></div>`,
  },
  tgFormSelect: {
    label: "Select Dropdown",
    html: `<div class="mb-4"><label for="country" class="block text-sm font-medium text-gray-700 mb-2">Country</label><select id="country" name="country" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option>United States</option><option>Canada</option><option>Mexico</option></select></div>`,
  },
  tgFormCheckbox: {
    label: "Checkbox",
    html: `<div class="flex items-center mb-4"><input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="terms" class="ml-2 block text-sm text-gray-900">I agree to the terms and conditions</label></div>`,
  },

  // Application UI - Navigation
  tgNavbar: {
    label: "Navigation Bar",
    html: `<nav class="bg-white shadow"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex items-center"><div class="flex-shrink-0"><img class="h-8 w-8" src="/placeholder.svg?height=32&width=32" alt="Logo"></div><div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><a href="#" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a><a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a><a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</a><a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a></div></div></div><div class="flex items-center"><button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">Sign In</button></div></div></div></nav>`,
  },
  tgBreadcrumbs: {
    label: "Breadcrumbs",
    html: `<nav class="flex" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1 md:space-x-3"><li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>Home</a></li><li><div class="flex items-center"><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg><a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">Products</a></div></li><li aria-current="page"><div class="flex items-center"><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg><span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">Current Page</span></div></li></ol></nav>`,
  },

  // Application UI - Tables
  tgTable: {
    label: "Data Table",
    html: `<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"><table class="min-w-full divide-y divide-gray-300"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td><td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span></td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane@example.com</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User</td><td class="px-6 py-4 whitespace-nowrap"><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td></tr></tbody></table></div>`,
  },

  // Marketing UI - Hero Sections
  tgHeroSimple: {
    label: "Simple Hero",
    html: `<div class="bg-white"><div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8"><div class="text-center"><h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">Welcome to Our Platform</h1><p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Build amazing products with our comprehensive suite of tools and services.</p><div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"><div class="rounded-md shadow"><a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">Get Started</a></div><div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"><a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">Learn More</a></div></div></div></div></div>`,
  },
  tgHeroWithImage: {
    label: "Hero with Image",
    html: `<div class="relative bg-white overflow-hidden"><div class="max-w-7xl mx-auto"><div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"><div class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"><div class="sm:text-center lg:text-left"><h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"><span class="block xl:inline">Data to enrich your</span> <span class="block text-blue-600 xl:inline">online business</span></h1><p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p><div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"><div class="rounded-md shadow"><a href="#" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">Get started</a></div></div></div></div></div></div><div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"><img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="/placeholder.svg?height=600&width=800" alt="Hero image"></div></div>`,
  },

  // Marketing UI - Features
  tgFeatures3Col: {
    label: "3-Column Features",
    html: `<div class="py-12 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="lg:text-center"><h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2><p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">A better way to work</p></div><div class="mt-10"><dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10"><div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Performance</p></dt><dd class="mt-2 ml-16 text-base text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</dd></div><div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900">Secure</p></dt><dd class="mt-2 ml-16 text-base text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</dd></div><div class="relative"><dt><div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900">Easy to Use</p></dt><dd class="mt-2 ml-16 text-base text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</dd></div></dl></div></div></div>`,
  },

  // Marketing UI - Testimonials
  tgTestimonial: {
    label: "Testimonial Card",
    html: `<div class="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8"><div class="max-w-3xl mx-auto text-center"><h2 class="text-3xl font-extrabold text-gray-900">What our customers say</h2></div><div class="mt-12 max-w-lg mx-auto"><blockquote class="text-center"><div class="text-2xl leading-9 font-medium text-gray-900"><p>"This product has completely transformed how we work. The team is more productive and our clients are happier."</p></div><footer class="mt-8"><div class="md:flex md:items-center md:justify-center"><div class="md:flex-shrink-0"><img class="mx-auto h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="Customer"></div><div class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center"><div class="text-base font-medium text-gray-900">Sarah Johnson</div><svg class="hidden md:block mx-1 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M11 0h3L9 20H6l5-20z"></path></svg><div class="text-base font-medium text-gray-500">CEO, Company Inc.</div></div></div></footer></blockquote></div></div>`,
  },

  // Marketing UI - Pricing
  tgPricingCard: {
    label: "Pricing Card",
    html: `<div class="bg-white rounded-lg shadow-lg overflow-hidden"><div class="px-6 py-8"><h3 class="text-2xl font-medium text-gray-900 text-center">Starter</h3><div class="mt-4 text-center"><span class="text-4xl font-extrabold text-gray-900">$19</span><span class="text-base font-medium text-gray-500">/month</span></div><ul class="mt-6 space-y-4"><li class="flex items-start"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div><p class="ml-3 text-base text-gray-700">Up to 5 projects</p></li><li class="flex items-start"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div><p class="ml-3 text-base text-gray-700">10GB storage</p></li><li class="flex items-start"><div class="flex-shrink-0"><svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div><p class="ml-3 text-base text-gray-700">Email support</p></li></ul><div class="mt-8"><button class="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Get Started</button></div></div></div>`,
  },

  // E-Commerce Components
  tgProductCard: {
    label: "Product Card",
    html: `<div class="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"><div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200"><img src="/placeholder.svg?height=300&width=300" alt="Product" class="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"></div><div class="p-4"><h3 class="text-sm font-medium text-gray-900"><a href="#"><span aria-hidden="true" class="absolute inset-0"></span>Product Name</a></h3><p class="mt-1 text-sm text-gray-500">Brief product description that highlights key features.</p><div class="mt-2 flex items-center justify-between"><div><span class="text-lg font-bold text-gray-900">$49.99</span><span class="ml-2 text-sm text-gray-500 line-through">$69.99</span></div><div class="flex items-center"><svg class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg><span class="ml-1 text-sm text-gray-500">4.5</span></div></div><button class="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add to Cart</button></div></div>`,
  },
  tgShoppingCart: {
    label: "Shopping Cart Item",
    html: `<div class="flex items-center py-4 border-b border-gray-200"><div class="flex-shrink-0"><img class="h-16 w-16 rounded-md object-cover" src="/placeholder.svg?height=64&width=64" alt="Product"></div><div class="ml-4 flex-1"><h3 class="text-sm font-medium text-gray-900">Product Name</h3><p class="mt-1 text-sm text-gray-500">Color: Blue, Size: Large</p><div class="mt-2 flex items-center justify-between"><div class="flex items-center"><button class="text-gray-400 hover:text-gray-500"><span class="sr-only">Decrease quantity</span><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg></button><span class="mx-2 text-gray-700">2</span><button class="text-gray-400 hover:text-gray-500"><span class="sr-only">Increase quantity</span><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button></div><div class="text-sm font-medium text-gray-900">$49.98</div></div></div><div class="ml-4"><button class="text-red-500 hover:text-red-700"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`,
  },

  // Dashboard Components
  tgDashboardCard: {
    label: "Dashboard Stat Card",
    html: `<div class="bg-white overflow-hidden shadow rounded-lg"><div class="p-5"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center"><svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path></svg></div></div><div class="ml-5 w-0 flex-1"><dl><dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt><dd><div class="text-lg font-medium text-gray-900">1,234</div></dd></dl></div></div></div><div class="bg-gray-50 px-5 py-3"><div class="text-sm"><a href="#" class="font-medium text-blue-700 hover:text-blue-900">View all</a></div></div></div>`,
  },
  tgProgressBar: {
    label: "Progress Bar",
    html: `<div class="mb-4"><div class="flex justify-between items-center mb-2"><span class="text-sm font-medium text-gray-700">Project Progress</span><span class="text-sm text-gray-500">75%</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div></div></div>`,
  },

  // Error Pages
  tg404Page: {
    label: "404 Error Page",
    html: `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8 text-center"><div><h1 class="text-9xl font-bold text-blue-600">404</h1><h2 class="mt-6 text-3xl font-extrabold text-gray-900">Page not found</h2><p class="mt-2 text-sm text-gray-600">Sorry, we couldn't find the page you're looking for.</p></div><div class="mt-8"><a href="#" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Go back home</a></div></div></div>`,
  },

  // Authentication
  tgLoginForm: {
    label: "Login Form",
    html: `<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"><div class="max-w-md w-full space-y-8"><div><h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2></div><form class="mt-8 space-y-6"><div class="rounded-md shadow-sm -space-y-px"><div><label for="email" class="sr-only">Email address</label><input id="email" name="email" type="email" required class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address"></div><div><label for="password" class="sr-only">Password</label><input id="password" name="password" type="password" required class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password"></div></div><div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label></div><div class="text-sm"><a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a></div></div><div><button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign in</button></div></form></div></div>`,
  },

  // Footer
  tgFooter: {
    label: "Footer",
    html: `<footer class="bg-gray-800"><div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"><div class="xl:grid xl:grid-cols-3 xl:gap-8"><div class="space-y-8 xl:col-span-1"><img class="h-10" src="/placeholder.svg?height=40&width=120" alt="Company"><p class="text-gray-300 text-base">Making the world a better place through constructing elegant hierarchies.</p><div class="flex space-x-6"><a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">Facebook</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg></a><a href="#" class="text-gray-400 hover:text-gray-300"><span class="sr-only">Twitter</span><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a></div></div><div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2"><div class="md:grid md:grid-cols-2 md:gap-8"><div><h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Solutions</h3><ul class="mt-4 space-y-4"><li><a href="#" class="text-base text-gray-300 hover:text-white">Marketing</a></li><li><a href="#" class="text-base text-gray-300 hover:text-white">Analytics</a></li><li><a href="#" class="text-base text-gray-300 hover:text-white">Commerce</a></li></ul></div><div class="mt-12 md:mt-0"><h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3><ul class="mt-4 space-y-4"><li><a href="#" class="text-base text-gray-300 hover:text-white">Pricing</a></li><li><a href="#" class="text-base text-gray-300 hover:text-white">Documentation</a></li><li><a href="#" class="text-base text-gray-300 hover:text-white">Guides</a></li></ul></div></div></div></div><div class="mt-12 border-t border-gray-700 pt-8"><p class="text-base text-gray-400 xl:text-center">&copy; 2024 Your Company, Inc. All rights reserved.</p></div></div></footer>`,
  },
}

const iconMap: { [key: string]: React.ElementType } = {
  Heading: HeadingIcon,
  Paragraph: ParagraphIcon,
  Image: ImageIcon,
  List: ListIcon,
  ListOrdered: OrderedListIcon,
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
  // TailGrids Core Components
  {
    name: "TG - Buttons",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Primary Button",
        color: "text-blue-500",
        htmlBlockKey: "tgButtonPrimary",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Secondary Button",
        color: "text-blue-500",
        htmlBlockKey: "tgButtonSecondary",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Outline Button",
        color: "text-blue-500",
        htmlBlockKey: "tgButtonOutline",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Ghost Button",
        color: "text-blue-500",
        htmlBlockKey: "tgButtonGhost",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "MousePointer",
        label: "Icon Button",
        color: "text-blue-500",
        htmlBlockKey: "tgButtonIcon",
      },
    ],
  },
  {
    name: "TG - Alerts",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Info Alert",
        color: "text-blue-500",
        htmlBlockKey: "tgAlertInfo",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Success Alert",
        color: "text-green-500",
        htmlBlockKey: "tgAlertSuccess",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Warning Alert",
        color: "text-yellow-500",
        htmlBlockKey: "tgAlertWarning",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "AlertTriangle",
        label: "Error Alert",
        color: "text-red-500",
        htmlBlockKey: "tgAlertError",
      },
    ],
  },
  {
    name: "TG - Cards",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Basic Card",
        color: "text-purple-500",
        htmlBlockKey: "tgCardBasic",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Card with Image",
        color: "text-purple-500",
        htmlBlockKey: "tgCardWithImage",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Product Card",
        color: "text-purple-500",
        htmlBlockKey: "tgCardProduct",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Profile Card",
        color: "text-purple-500",
        htmlBlockKey: "tgCardProfile",
      },
    ],
  },
  {
    name: "TG - Forms",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Input Field",
        color: "text-indigo-500",
        htmlBlockKey: "tgFormInput",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Textarea",
        color: "text-indigo-500",
        htmlBlockKey: "tgFormTextarea",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Select Dropdown",
        color: "text-indigo-500",
        htmlBlockKey: "tgFormSelect",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CheckSquare",
        label: "Checkbox",
        color: "text-indigo-500",
        htmlBlockKey: "tgFormCheckbox",
      },
    ],
  },
  {
    name: "TG - Navigation",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Navigation Bar",
        color: "text-teal-500",
        htmlBlockKey: "tgNavbar",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Breadcrumbs",
        color: "text-teal-500",
        htmlBlockKey: "tgBreadcrumbs",
      },
    ],
  },
  {
    name: "TG - Data Display",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Table",
        label: "Data Table",
        color: "text-orange-500",
        htmlBlockKey: "tgTable",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Progress Bar",
        color: "text-orange-500",
        htmlBlockKey: "tgProgressBar",
      },
    ],
  },
  {
    name: "TG - Marketing",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Hero",
        label: "Simple Hero",
        color: "text-lime-500",
        htmlBlockKey: "tgHeroSimple",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Hero",
        label: "Hero with Image",
        color: "text-lime-500",
        htmlBlockKey: "tgHeroWithImage",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "3-Column Features",
        color: "text-lime-500",
        htmlBlockKey: "tgFeatures3Col",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Testimonial",
        label: "Testimonial",
        color: "text-lime-500",
        htmlBlockKey: "tgTestimonial",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "CreditCard",
        label: "Pricing Card",
        color: "text-lime-500",
        htmlBlockKey: "tgPricingCard",
      },
    ],
  },
  {
    name: "TG - E-Commerce",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "ShoppingCart",
        label: "Product Card",
        color: "text-amber-500",
        htmlBlockKey: "tgProductCard",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "ShoppingCart",
        label: "Cart Item",
        color: "text-amber-500",
        htmlBlockKey: "tgShoppingCart",
      },
    ],
  },
  {
    name: "TG - Dashboard",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "Chart",
        label: "Stat Card",
        color: "text-cyan-500",
        htmlBlockKey: "tgDashboardCard",
      },
    ],
  },
  {
    name: "TG - Application UI",
    components: [
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "ErrorPage",
        label: "404 Error Page",
        color: "text-rose-500",
        htmlBlockKey: "tg404Page",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "SignIn",
        label: "Login Form",
        color: "text-rose-500",
        htmlBlockKey: "tgLoginForm",
      },
      {
        type: "htmlBlock" as MarkdownComponent["type"],
        icon: "LayoutGrid",
        label: "Footer",
        color: "text-rose-500",
        htmlBlockKey: "tgFooter",
      },
    ],
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
