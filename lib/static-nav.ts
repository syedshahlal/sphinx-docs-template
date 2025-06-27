import type { NavItem } from "./docs-navigation"

/**
 * A minimal, hand-crafted navigation tree.
 * In a full Node.js environment this would be generated
 * by reading the real `docs/{version}` folders.
 */
export const staticNav: Record<string, NavItem[]> = {
  "v5.7": [
    {
      title: "Getting Started",
      href: "/docs/v5.7/getting-started",
      items: [{ title: "Quickstart", href: "/docs/v5.7/getting-started/quickstart" }],
    },
    {
      title: "API Reference",
      href: "/docs/v5.7/api-reference",
      items: [],
    },
  ],
}
