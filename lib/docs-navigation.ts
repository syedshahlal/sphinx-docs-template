export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

// This is a sample structure for v5.7 based on the file system.
// In a real application, this would be generated dynamically on the server.
export const navigationV5_7: NavItem[] = [
  {
    title: "GRA Core Platform",
    href: "/docs/gcp-5.7/gra-core-platform",
    items: [
      {
        title: "Key Concepts",
        href: "/docs/gcp-5.7/gra-core-platform/key-concepts",
        items: [
          {
            title: "Architecture",
            href: "/docs/gcp-5.7/gra-core-platform/key-concepts/architecture",
          },
          {
            title: "Services",
            href: "/docs/gcp-5.7/gra-core-platform/key-concepts/services",
          },
        ],
      },
      {
        title: "Deployment Guide",
        href: "/docs/gcp-5.7/gra-core-platform/deployment-guide",
      },
    ],
  },
  {
    title: "User Guide",
    href: "/docs/gcp-5.7/user-guide",
    items: [
      {
        title: "Getting Started",
        href: "/docs/gcp-5.7/user-guide/getting-started",
      },
      {
        title: "Advanced Features",
        href: "/docs/gcp-5.7/user-guide/advanced-features",
        items: [
          {
            title: "Data Pipelines",
            href: "/docs/gcp-5.7/user-guide/advanced-features/data-pipelines",
          },
        ],
      },
    ],
  },
  {
    title: "API Reference",
    href: "/docs/gcp-5.7/api-reference",
    items: [
      {
        title: "Endpoints",
        href: "/docs/gcp-5.7/api-reference/endpoints",
        items: [
          {
            title: "Authentication API",
            href: "/docs/gcp-5.7/api-reference/endpoints/authentication-api",
          },
          {
            title: "User Management API",
            href: "/docs/gcp-5.7/api-reference/endpoints/user-management-api",
          },
        ],
      },
    ],
  },
  {
    title: "Examples & Tutorials",
    href: "/docs/gcp-5.7/examples-tutorials",
    items: [
      {
        title: "Quickstart Tutorial",
        href: "/docs/gcp-5.7/examples-tutorials/quickstart-tutorial",
      },
    ],
  },
]
