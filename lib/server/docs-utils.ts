"use server"

import fs from "fs/promises"
import path from "path"
import type { NavItem } from "../docs-navigation"

const DOCS_ROOT = path.join(process.cwd(), "docs")

const isContentFile = (name: string): boolean => name.endsWith(".md") || name.endsWith(".rst")

const formatTitle = (raw: string): string => {
  // Remove leading numbers used for ordering (e.g., "01-getting-started")
  const withoutOrder = raw.replace(/^\d+-/, "")
  return withoutOrder.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * Recursively walk docs/{version} and build a navigation tree.
 * This function is guaranteed to run only on the server.
 */
export async function buildNav(version: string): Promise<NavItem[]> {
  const baseDir = path.join(DOCS_ROOT, version)

  async function walk(dir: string): Promise<NavItem[]> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      const nav: NavItem[] = []

      for (const e of entries) {
        // Skip hidden files and configuration files
        if (e.name.startsWith(".") || e.name.startsWith("conf")) continue

        const fullPath = path.join(dir, e.name)
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/")

        if (e.isDirectory()) {
          const children = await walk(fullPath)
          // A directory is only added if it contains children or an index file
          const hasIndex = (await fs.readdir(fullPath)).some((f) => f.startsWith("index."))
          if (children.length > 0 || hasIndex) {
            nav.push({
              title: formatTitle(e.name),
              href: `/docs/${version}/${relativePath}`,
              items: children,
            })
          }
        } else if (e.isFile() && isContentFile(e.name)) {
          const baseName = path.parse(e.name).name
          // The index file itself is not added; its parent directory link is used instead
          if (baseName === "index") continue

          nav.push({
            title: formatTitle(baseName),
            href: `/docs/${version}/${relativePath.replace(/\.(md|rst)$/, "")}`,
          })
        }
      }
      // Sort items alphabetically
      return nav.sort((a, b) => a.title.localeCompare(b.title))
    } catch (error) {
      if (error.code === "ENOENT") {
        // This is expected if a version directory doesn't exist.
        return []
      }
      // Re-throw other errors
      throw error
    }
  }

  return await walk(baseDir)
}
