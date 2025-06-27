export interface NavItem {
  title: string
  href: string
  /** Nested items (optional) */
  items?: NavItem[]
}

/**
 * getDocsNavigation
 * Returns the navigation tree for the requested docs version.
 * Falls back to an empty array if the version is not present.
 */
import { staticNav } from "./static-nav"

export function getDocsNavigation(version: string): NavItem[] {
  return staticNav[version] ?? []
}
