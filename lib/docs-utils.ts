import fs from "fs/promises"
import path from "path"
import type { NavItem } from "./docs-navigation"

const DOCS_ROOT = path.join(process.cwd(), "docs")

const isContentFile = (name: string) => name.endsWith(".md") || name.endsWith(".rst")

const niceTitle = (raw: string) => raw.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) // capitalise every word

/**
 * Recursively walk docs/{version} and build a navigation tree.
 */
export async function buildNav(version: string): Promise<NavItem[]> {
  const baseDir = path.join(DOCS_ROOT, version)

  async function walk(dir: string): Promise<NavItem[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const nav: NavItem[] = []

    for (const e of entries) {
      if (e.name.startsWith(".")) continue

      const fullPath = path.join(dir, e.name)
      const rel = path.relative(baseDir, fullPath).replace(/\\/g, "/")

      if (e.isDirectory()) {
        const children = await walk(fullPath)
        const hasIndex = (await fs.readdir(fullPath)).some((f) => f.startsWith("index."))
        if (children.length || hasIndex) {
          nav.push({
            title: niceTitle(e.name),
            href: `/docs/${version}/${rel}`,
            items: children,
          })
        }
      } else if (e.isFile() && isContentFile(e.name)) {
        // skip "index" → the directory link already covers it
        const base = path.parse(e.name).name
        if (base === "index") continue
        nav.push({
          title: niceTitle(base),
          href: `/docs/${version}/${rel.replace(/\.(md|rst)$/, "")}`,
        })
      }
    }
    // alpha sort
    return nav.sort((a, b) => a.title.localeCompare(b.title))
  }

  try {
    return await walk(baseDir)
  } catch {
    return [] // version folder missing
  }
}
