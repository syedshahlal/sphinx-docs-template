export interface NavItem {
  title: string
  href: string
  /** Nested items (optional) */
  items?: NavItem[]
}
