export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

/**
 * Simulated TOC for docs v5.7.
 * Replace with a filesystem scan when you move to a real Node runtime.
 */
export const staticNav: NavItem[] = [
  {
    title: "Platform Overview",
    href: "/docs/v5.7/platform-overview",
    items: [
      { title: "Architecture", href: "/docs/v5.7/platform-overview/architecture" },
      { title: "Services", href: "/docs/v5.7/platform-overview/services" },
    ],
  },
  {
    title: "Getting Started",
    href: "/docs/v5.7/getting-started",
    items: [
      { title: "Quickstart", href: "/docs/v5.7/getting-started/quickstart" },
      { title: "Deployment Guide", href: "/docs/v5.7/getting-started/deployment-guide" },
    ],
  },
]
