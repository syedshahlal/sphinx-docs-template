import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

export interface NavItem {
  title: string
  path: string // Full path for next/link, e.g., /docs/gcp-5.7/getting-started/introduction
  children?: NavItem[]
  isPage: boolean // True if this item directly represents a page (e.g., an .md file or a folder with index.md)
}

const contentRoot = path.join(process.cwd(), "frontend", "content", "docs")

// Helper to clean names (strip numeric prefixes and extensions, then capitalize)
function cleanName(name: string, isFile = false): string {
  let cleaned = name.replace(/^\d+[-_.\s]?\s*/, "") // Remove numeric prefix like "01-", "01.", "01_" or "01 "
  if (isFile) {
    cleaned = cleaned.replace(/\.(md|mdx)$/, "")
  }
  return cleaned.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

async function getTitleFromFile(filePath: string, defaultTitle: string): Promise<string> {
  try {
    const fileContent = await fs.readFile(filePath, "utf8")
    const { data } = matter(fileContent)
    return data.title || defaultTitle
  } catch (error) {
    // console.warn(`Could not read frontmatter from ${filePath}, using default: ${defaultTitle}`);
    return defaultTitle
  }
}

export async function getDocsNavigation(version: string): Promise<NavItem[]> {
  const versionPath = path.join(contentRoot, version)

  async function buildNav(currentDirPath: string, currentUrlPrefix: string): Promise<NavItem[]> {
    const items: NavItem[] = []
    let entries
    try {
      entries = await fs.readdir(currentDirPath, { withFileTypes: true })
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") {
        console.warn(`Directory not found, cannot build navigation: ${currentDirPath}`)
        return [] // Return empty if version/path doesn't exist
      }
      throw e // Rethrow other errors
    }

    // Sort entries: numeric prefixes first, then alphabetically.
    entries.sort((a, b) => {
      const numA = Number.parseInt(a.name.split(/[-_.\s]/)[0], 10)
      const numB = Number.parseInt(b.name.split(/[-_.\s]/)[0], 10)
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) return numA - numB
      if (!isNaN(numA) && isNaN(numB)) return -1
      if (isNaN(numA) && !isNaN(numB)) return 1
      return a.name.localeCompare(b.name)
    })

    for (const entry of entries) {
      const fullEntryPath = path.join(currentDirPath, entry.name)
      // entry.name might be "01-Folder Name" or "My File.md"
      // We want the URL segment to be "01-Folder Name" or "My File"
      const entryUrlSegment = entry.name.replace(/\.(md|mdx)$/, "")
      const navPath = `${currentUrlPrefix}/${entryUrlSegment}`

      if (entry.isDirectory()) {
        const children = await buildNav(fullEntryPath, navPath)
        let title = cleanName(entry.name)
        let directoryLinkPath = navPath
        let isDirPage = false

        const indexMdPath = path.join(fullEntryPath, "index.md")
        const indexMdxPath = path.join(fullEntryPath, "index.mdx")
        let indexFileActualPath = ""

        try {
          await fs.access(indexMdPath)
          indexFileActualPath = indexMdPath
        } catch {
          try {
            await fs.access(indexMdxPath)
            indexFileActualPath = indexMdxPath
          } catch {}
        }

        if (indexFileActualPath) {
          title = await getTitleFromFile(indexFileActualPath, title)
          // Link to /docs/version/folder (which maps to folder/index.md by Next.js convention)
          directoryLinkPath = navPath
          isDirPage = true
        }

        const displayChildren = children.filter((c) => !(c.title.toLowerCase() === "index" && c.isPage))
        if (isDirPage || displayChildren.length > 0) {
          items.push({
            title,
            path: directoryLinkPath,
            children: displayChildren.length > 0 ? displayChildren : undefined,
            isPage: isDirPage,
          })
        }
      } else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))) {
        if (entry.name.toLowerCase() === "index.md" || entry.name.toLowerCase() === "index.mdx") {
          continue // Handled by parent directory logic
        }
        const fileTitle = await getTitleFromFile(fullEntryPath, cleanName(entry.name, true))
        items.push({
          title: fileTitle,
          path: navPath,
          isPage: true,
        })
      }
    }
    return items
  }
  return buildNav(versionPath, `/docs/${version}`)
}
