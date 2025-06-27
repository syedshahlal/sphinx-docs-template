import type { NavItem } from "./docs-navigation"

/**
 * Hard-coded navigation trees for each documentation version.
 * In a real app you would generate this at build-time.
 */
export const staticNav: Record<string, NavItem[]> = {
  "v5.7": [
    {
      title: "Getting Started",
      href: "/docs/v5.7/getting-started",
      items: [
        {
          title: "Quickstart",
          href: "/docs/v5.7/getting-started/quickstart",
        },
      ],
    },
    {
      title: "Platform Overview",
      href: "/docs/v5.7/platform-overview",
      items: [],
    },
    {
      title: "User Guide",
      href: "/docs/v5.7/user-guide",
      items: [
        {
          title: "Advanced Features",
          href: "/docs/v5.7/user-guide/advanced-features",
          items: [
            {
              title: "Data Pipelines",
              href: "/docs/v5.7/user-guide/advanced-features/data-pipelines",
            },
          ],
        },
      ],
    },
    {
      title: "API Reference",
      href: "/docs/v5.7/api-reference",
      items: [
        {
          title: "Authentication API",
          href: "/docs/v5.7/api-reference/endpoints/authentication-api",
        },
        {
          title: "User Management API",
          href: "/docs/v5.7/api-reference/endpoints/user-management-api",
        },
      ],
    },
  ],
}
