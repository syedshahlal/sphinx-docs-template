// Documentation configuration for linking React components to Sphinx docs

export interface DocSection {
  id: string
  title: string
  description: string
  path: string
  icon: string
  color: string
  gradient: string
  topics: string[]
  status: "available" | "coming-soon" | "beta"
}

export interface DocsConfig {
  baseUrl: string
  version: string
  sections: DocSection[]
}

// Get the base URL based on environment
export const getDocsBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    // Client-side: use current origin
    return window.location.origin
  }
  // Server-side: use environment variable or default
  return process.env.DOCS_BASE_URL || "http://localhost:8000"
}

// Main documentation configuration
export const docsConfig: DocsConfig = {
  baseUrl: getDocsBaseUrl(),
  version: "v5.7",
  sections: [
    {
      id: "getting-started",
      title: "GRA Core Platform Introduction",
      description: "Get started with GRA Core Platform fundamentals and core concepts.",
      path: "/docs/_build/html/v5.7/getting-started/index.html",
      icon: "🚀",
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      topics: ["Core Services", "Getting Started", "Best Practices", "Architecture Overview"],
      status: "available",
    },
    {
      id: "user-guide",
      title: "User Guide",
      description: "Complete guide to using GRA Core Platform with step-by-step instructions.",
      path: "/docs/_build/html/v5.7/user-guide/index.html",
      icon: "👥",
      color: "green",
      gradient: "from-green-500/20 to-emerald-500/20",
      topics: ["Installation", "Configuration", "User Management", "Troubleshooting"],
      status: "available",
    },
    {
      id: "api-reference",
      title: "API Reference",
      description: "Comprehensive API documentation with examples and authentication guides.",
      path: "/docs/_build/html/v5.7/api-reference/index.html",
      icon: "🔌",
      color: "purple",
      gradient: "from-purple-500/20 to-pink-500/20",
      topics: ["REST APIs", "Authentication", "SDKs", "Rate Limits"],
      status: "available",
    },
    {
      id: "examples",
      title: "Examples & Tutorials",
      description: "Real-world examples and step-by-step tutorials for common use cases.",
      path: "/docs/_build/html/v5.7/examples/index.html",
      icon: "📚",
      color: "orange",
      gradient: "from-orange-500/20 to-red-500/20",
      topics: ["Quick Start", "Advanced Examples", "Best Practices", "Code Samples"],
      status: "available",
    },
    {
      id: "development",
      title: "Development Guide",
      description: "Development workflows, contribution guidelines, and advanced topics.",
      path: "/docs/_build/html/v5.7/development/index.html",
      icon: "🛠️",
      color: "teal",
      gradient: "from-teal-500/20 to-cyan-500/20",
      topics: ["Development Setup", "Contributing", "Testing", "Deployment"],
      status: "available",
    },
    {
      id: "architecture",
      title: "Platform Architecture",
      description: "Deep dive into GRA Core Platform architecture and infrastructure.",
      path: "/docs/_build/html/v5.7/architecture/index.html",
      icon: "🏗️",
      color: "indigo",
      gradient: "from-indigo-500/20 to-blue-500/20",
      topics: ["System Design", "Components", "Scalability", "Security"],
      status: "available",
    },
  ],
}

// Helper functions
export const getDocSection = (id: string): DocSection | undefined => {
  return docsConfig.sections.find((section) => section.id === id)
}

export const getFullDocUrl = (path: string): string => {
  return `${docsConfig.baseUrl}${path}`
}

export const isDocAvailable = (id: string): boolean => {
  const section = getDocSection(id)
  return section?.status === "available"
}
