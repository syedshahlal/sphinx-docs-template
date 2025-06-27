\`\`\`ts

// NEW — keyed by version
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

// Optional default (so any old imports continue to work)
export const staticNav = staticNavByVersion["v5.7"]
\`\`\`

\`\`\`ts
// lib/docs-navigation.ts
import { staticNavByVersion } from "./static-nav"

export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export function getDocsNavigation(version: string): NavItem[] {
  return staticNavByVersion[version] ?? []
}
\`\`\`

\`\`\`tsx
// components/sidebar.tsx
// …keep all existing imports and code…
import { Loader2 } from "lucide-react"
import type React from "react"

interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

interface CollapsibleNavItemProps {
  item: NavItem
}

const CollapsibleNavItem: React.FC<CollapsibleNavItemProps> = ({ item }) => {
  return (
    <li>
      <a href={item.href}>{item.title}</a>
    </li>
  )
}

interface SidebarProps {
  navigation: NavItem[] | undefined
  isLoading: boolean
  error: string | null
}

const Sidebar: React.FC<SidebarProps> = ({ navigation, isLoading, error }) => {
  return (
    <nav className="space-y-1">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      )}
      {error && <div className="text-red-500 px-3 text-sm">{error}</div>}

      {!isLoading &&
        !error &&
        Array.isArray(navigation) &&
        navigation.map((item) => <CollapsibleNavItem key={item.href} item={item} />)}
    </nav>
  )
}

export default Sidebar
\`\`\`
