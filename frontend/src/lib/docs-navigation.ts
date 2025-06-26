import fs from "fs/promises"
import path from "path"
import matter from "gray-matter" // For reading frontmatter

export interface NavItem {
  title: string
  path: string
  version: string // To construct full paths correctly
  children?: NavItem[]
  isInitiallyOpen?: boolean // For search functionality to expand parents
}

// Helper to clean names (strip numeric prefixes and extensions, then capitalize)
function cleanName(name: string, isFile = false): string {
  let cleaned = name.replace(/^\d+[-_.\s]?\s*/, "") // Remove numeric prefix like "01-", "01.", "01_" or "01 "
  if (isFile) {
    cleaned = cleaned.replace(/\.(md|mdx)$/, "")
  }
  return cleaned.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

// Helper to convert kebab-case or snake_case to Title Case
function toTitleCase(str: string): string {
  return str
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Capitalize the first letter
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()) // Replace hyphens/underscores with a space and capitalize next letter
}

// Helper to strip numeric prefixes like "01-", "02-"
function stripNumericPrefix(name: string): string {
  return name.replace(/^\d+-/, "")
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

async function getNavigationItemsRecursive(
  dirPath: string,
  baseContentPath: string, // e.g., "frontend/content/docs"
  currentVersion: string,
  relativePathPrefix = "", // Accumulates the path relative to the version folder
): Promise<NavItem[]> {
  let entries
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true })
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.warn(
        `Directory not found: ${dirPath}. This might be expected if the version path is incorrect or content is missing.`,
      )
      return [] // Return empty if directory doesn't exist
    }
    throw error // Re-throw other errors
  }

  const items: NavItem[] = []

  // Sort entries: folders first, then files, then alphabetically
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1
    if (!a.isDirectory() && b.isDirectory()) return 1
    return a.name.localeCompare(b.name)
  })

  for (const entry of entries) {
    const entryName = entry.name
    // Skip hidden files/folders or specific ones like _static, _templates
    if (entryName.startsWith(".") || entryName.startsWith("_")) {
      continue
    }

    const fullEntryPath = path.join(dirPath, entryName)
    // Relative path from the current version's root (e.g., "01-GRA Core Platform/01-Key Concepts")
    const entryRelativePath = path.join(relativePathPrefix, entryName)
    // URL path segment (e.g., "gra-core-platform/key-concepts")
    const pathSegment = stripNumericPrefix(entryName).replace(/\.md$/, "").toLowerCase().replace(/\s+/g, "-") // Replace spaces with hyphens

    if (entry.isDirectory()) {
      const children = await getNavigationItemsRecursive(
        fullEntryPath,
        baseContentPath,
        currentVersion,
        entryRelativePath, // Pass down the updated relative path
      )
      // Try to find an index.md file for the folder's title and path
      let title = toTitleCase(stripNumericPrefix(entryName))
      let folderPath = `/docs/${currentVersion}/${relativePathPrefix ? relativePathPrefix + "/" : ""}${pathSegment}`

      const indexMdPath = path.join(fullEntryPath, "index.md")
      try {
        await fs.access(indexMdPath) // Check if index.md exists
        const fileContent = await fs.readFile(indexMdPath, "utf-8")
        const { data: frontmatter } = matter(fileContent)
        if (frontmatter.title && typeof frontmatter.title === "string") {
          title = frontmatter.title
        }
        // Path for folder with index.md should point to the index page
        folderPath = `/docs/${currentVersion}/${relativePathPrefix ? relativePathPrefix + "/" : ""}${pathSegment.replace(/\/index$/, "") || stripNumericPrefix(entryName).toLowerCase()}`
        if (entryName.toLowerCase() === "index.md" && relativePathPrefix === "") {
          // Top level index.md for version
          folderPath = `/docs/${currentVersion}`
        } else {
          folderPath = `/docs/${currentVersion}/${path.join(relativePathPrefix, stripNumericPrefix(entryName)).replace(/\.md$/, "").toLowerCase().replace(/\\/g, "/")}`
          if (folderPath.endsWith("/index")) {
            folderPath = folderPath.slice(0, -"/index".length) || `/docs/${currentVersion}`
          }
        }
      } catch {
        // No index.md, or cannot access it. Use folder name as title.
        // If folder has children but no index.md, its link might point to the first child or be non-clickable.
        // For now, let's make it point to its own segment; actual page might 404 if no index.md
        // A better UX might be to make it non-clickable or expand-only if no index.md
      }

      if (children.length > 0 || title) {
        // Only add folder if it has children or a valid title (e.g. from index.md)
        items.push({
          title,
          path: folderPath.replace(/\/index$/, "") || `/docs/${currentVersion}`, // Clean up trailing /index
          version: currentVersion,
          children: children.length > 0 ? children : undefined,
        })
      }
    } else if (entryName.endsWith(".md")) {
      // Skip index.md files here as they are handled by their parent directory logic
      if (entryName.toLowerCase() === "index.md") {
        // If it's the top-level index.md for the version (e.g., /docs/gcp-5.7/index.md)
        if (relativePathPrefix === "") {
          const fileContent = await fs.readFile(fullEntryPath, "utf-8")
          const { data: frontmatter } = matter(fileContent)
          items.unshift({
            // Add to the beginning
            title: frontmatter.title || toTitleCase(stripNumericPrefix(entryName.replace(/\.md$/, ""))),
            path: `/docs/${currentVersion}`,
            version: currentVersion,
          })
        }
        continue
      }

      const fileContent = await fs.readFile(fullEntryPath, "utf-8")
      const { data: frontmatter } = matter(fileContent)
      const title =
        frontmatter.title && typeof frontmatter.title === "string"
          ? frontmatter.title
          : toTitleCase(stripNumericPrefix(entryName.replace(/\.md$/, "")))

      const pagePath = `/docs/${currentVersion}/${path.join(relativePathPrefix, stripNumericPrefix(entryName).replace(/\.md$/, "")).toLowerCase().replace(/\\/g, "/")}`

      items.push({
        title,
        path: pagePath,
        version: currentVersion,
      })
    }
  }
  return items
}

export async function getDocsNavigation(version: string): Promise<NavItem[]> {
  const contentBasePath = path.join(process.cwd(), "frontend", "content", "docs")
  const versionPath = path.join(contentBasePath, version)

  // Check if versionPath exists before proceeding
  try {
    await fs.access(versionPath)
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.warn(`Documentation directory for version "${version}" not found at ${versionPath}.`)
      // Propagate this specific error so layout can decide to 404
      const err = new Error(`Version directory not found: ${version}`) as any
      err.code = "ENOENT" // Custom property or use a specific error type
      err.path = versionPath
      throw err
    }
    throw error // Re-throw other errors
  }

  return getNavigationItemsRecursive(versionPath, contentBasePath, version)
}
