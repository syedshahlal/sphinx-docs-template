/**
 * Shared navigation type used by both server and client.
 * This file MUST stay “type-only” so it is safe to import in the browser.
 */
export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}
