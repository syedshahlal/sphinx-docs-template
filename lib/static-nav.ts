export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export const staticNavByVersion: Record<string, NavItem[]> = {
  "v5.7": [
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
  ],
}
