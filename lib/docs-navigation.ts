import { staticNavByVersion } from "./static-nav"
import type { NavItem } from "./static-nav"

export type { NavItem }

/**
 * getDocsNavigation
 * Returns the navigation tree for the requested docs version.
 * Falls back to an empty array if the version is not present.
 */
export function getDocsNavigation(version: string): NavItem[] {
  return staticNavByVersion[version] ?? []
}
