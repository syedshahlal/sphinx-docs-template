"use client"

\`\`\`typescript
// lib/static-nav.ts
export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

/**
 * Docs navigation, keyed by version.
 * When you add a new version just extend this object.
 */
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
\`\`\`

\`\`\`typescript
// lib/docs-navigation.ts
import { staticNavByVersion } from "./static-nav"

export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

/**
 * Return the navigation tree for the requested docs version.
 * Falls back to an empty array when the version is unknown.
 */
export function getDocsNavigation(version: string): NavItem[] {
  return staticNavByVersion[version] ?? []
}
\`\`\`

\`\`\`typescript
// app/api/docs-nav/route.ts
import { NextResponse } from "next/server"
import { getDocsNavigation } from "@/lib/docs-navigation"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const version = searchParams.get("version") ?? "v5.7"

  // Always respond with an array.
  const nav = getDocsNavigation(version)
  return NextResponse.json(nav)
}
\`\`\`

\`\`\`typescript
// components/sidebar.tsx
// Assuming the original file structure and imports are present.
// This is just the relevant part that needs patching.

import type React from "react"
import { useState, useEffect } from "react"

interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

interface SidebarProps {
  version: string
}

const Sidebar: React.FC<SidebarProps> = ({ version }) => {
  const [navigation, setNavigation] = useState<NavItem[]>([])

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await fetch(`/api/docs-nav?version=${version}`)
        // The API should give us an array, but be defensive just in case.
        const data = await response.json()
        setNavigation(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to fetch navigation:", error)
        setNavigation([])
      }
    }

    fetchNavigation()
  }, [version])

  // Rest of the component implementation using the navigation data.
  return (
    <aside>
      {/* Render navigation items here */}
      <ul>
        {navigation.map((item) => (
          <li key={item.title}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
\`\`\`
