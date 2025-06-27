import type { NavItem } from "./docs-navigation"

/**
 * A STATIC navigation tree.
 * In a production app, you would generate this at build time by
 * scanning the file system. For the preview, we keep it in memory.
 */
export const staticNav: Record<string, NavItem[]> = {
  "v5.7": [
    { title: "Platform Overview", href: "/docs/v5.7/platform-overview" },
    { title: "Getting Started", href: "/docs/v5.7/getting-started" },
    { title: "API Integration", href: "/docs/v5.7/api-integration" },
    { title: "API Reference", href: "/docs/v5.7/api-reference" },
    { title: "UI Components", href: "/docs/v5.7/components/ui-components" },
    { title: "Data Processing", href: "/docs/v5.7/data-processing" },
    { title: "Deployment Automation", href: "/docs/v5.7/deployment-automation" },
    { title: "Development Tools", href: "/docs/v5.7/development-tools" },
    { title: "Migration Guides", href: "/docs/v5.7/migration-guides" },
    { title: "Monitoring & Analytics", href: "/docs/v5.7/monitoring-analytics" },
    { title: "Security & Compliance", href: "/docs/v5.7/security-compliance" },
    { title: "Troubleshooting", href: "/docs/v5.7/troubleshooting" },
  ],
}
