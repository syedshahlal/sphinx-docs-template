import type { DocSection } from "../types"

export const navigationConfig: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    path: "/getting-started",
    icon: "🚀",
    children: [
      { id: "installation", title: "Installation", path: "/getting-started/installation" },
      { id: "quickstart", title: "Quick Start", path: "/getting-started/quickstart" },
      { id: "configuration", title: "Configuration", path: "/getting-started/configuration" },
    ],
  },
  {
    id: "user-guide",
    title: "User Guide",
    path: "/user-guide",
    icon: "📖",
    children: [
      { id: "basics", title: "Basics", path: "/user-guide/basics" },
      { id: "advanced", title: "Advanced Usage", path: "/user-guide/advanced" },
      { id: "best-practices", title: "Best Practices", path: "/user-guide/best-practices" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    path: "/api-reference",
    icon: "🔌",
    badge: "New",
    children: [
      { id: "core-api", title: "Core API", path: "/api-reference/core" },
      { id: "authentication", title: "Authentication", path: "/api-reference/auth" },
      { id: "webhooks", title: "Webhooks", path: "/api-reference/webhooks" },
    ],
  },
  {
    id: "examples",
    title: "Examples",
    path: "/examples",
    icon: "💡",
    children: [
      { id: "tutorials", title: "Tutorials", path: "/examples/tutorials" },
      { id: "code-samples", title: "Code Samples", path: "/examples/code-samples" },
      { id: "integrations", title: "Integrations", path: "/examples/integrations" },
    ],
  },
  {
    id: "development",
    title: "Development",
    path: "/development",
    icon: "🛠️",
    children: [
      { id: "contributing", title: "Contributing", path: "/development/contributing" },
      { id: "testing", title: "Testing", path: "/development/testing" },
      { id: "deployment", title: "Deployment", path: "/development/deployment" },
    ],
  },
]
