export interface DocSection {
  id: string
  title: string
  description: string
  path: string
  gradient: string
  topics: string[]
  status: "available" | "beta" | "coming-soon"
}

export const docsConfig = {
  baseUrl: "/docs/_build/html",
  version: "v5.7",
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Quick setup guides and tutorials to get you up and running with GRA Core Platform.",
      path: "/v5.7/getting-started/index.html",
      gradient: "from-blue-500/20 to-cyan-500/20",
      topics: ["Installation & Setup", "Quick Start Guide", "Basic Configuration", "First Project"],
      status: "available" as const,
    },
    {
      id: "platform-overview",
      title: "Platform Overview",
      description: "Comprehensive overview of GRA Core Platform architecture and capabilities.",
      path: "/v5.7/platform-overview/index.html",
      gradient: "from-green-500/20 to-emerald-500/20",
      topics: ["Architecture Overview", "Core Components", "System Requirements", "Feature Matrix"],
      status: "available" as const,
    },
    {
      id: "api-reference",
      title: "API Reference",
      description: "Complete API documentation with examples and best practices.",
      path: "/v5.7/api-reference/index.html",
      gradient: "from-purple-500/20 to-pink-500/20",
      topics: ["REST API Endpoints", "Authentication", "Request/Response Format", "Error Handling"],
      status: "available" as const,
    },
    {
      id: "data-processing",
      title: "Data Processing",
      description: "Advanced data processing capabilities and pipeline management.",
      path: "/v5.7/data-processing/index.html",
      gradient: "from-orange-500/20 to-red-500/20",
      topics: ["Data Pipelines", "Batch Processing", "Real-time Streaming", "Data Transformation"],
      status: "beta" as const,
    },
    {
      id: "security-compliance",
      title: "Security & Compliance",
      description: "Security features, compliance standards, and best practices.",
      path: "/v5.7/security-compliance/index.html",
      gradient: "from-teal-500/20 to-cyan-500/20",
      topics: ["Authentication & Authorization", "Data Encryption", "Compliance Standards", "Security Auditing"],
      status: "available" as const,
    },
    {
      id: "monitoring-analytics",
      title: "Monitoring & Analytics",
      description: "Comprehensive monitoring, logging, and analytics capabilities.",
      path: "/v5.7/monitoring-analytics/index.html",
      gradient: "from-indigo-500/20 to-purple-500/20",
      topics: ["Performance Monitoring", "Log Management", "Analytics Dashboard", "Alerting & Notifications"],
      status: "coming-soon" as const,
    },
  ] as DocSection[],
}

export function getFullDocUrl(path: string): string {
  return `${docsConfig.baseUrl}${path}`
}
