import type React from "react"
export interface NavigationItem {
  title: string
  href: string
  children?: NavigationItem[]
  icon?: string
}

export interface ComponentProps {
  [key: string]: any
}

export interface MountableComponent {
  name: string
  component: React.ComponentType<any>
}

export interface ThemeConfig {
  mode: "light" | "dark" | "system"
}

export interface ContentSection {
  id: string
  title: string
  level: number
}
