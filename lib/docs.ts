import fs from "fs"
import path from "path"

export interface DocumentationItem {
  slug: string
  title: string
  description?: string
  content: string
  lastModified?: string
  type: "file" | "folder"
}

const DOCS_DIRECTORY = path.join(process.cwd(), "docu")

export async function getDocumentationStructure(): Promise<DocumentationItem[]> {
  try {
    if (!fs.existsSync(DOCS_DIRECTORY)) {
      // Create the docu directory if it doesn't exist
      fs.mkdirSync(DOCS_DIRECTORY, { recursive: true })

      // Create a sample getting started file
      const sampleContent = `# Getting Started

Welcome to your documentation hub! This is a sample documentation file.

## How to add documentation

1. Create markdown files in the \`docu\` folder
2. Organize them in subfolders if needed
3. They will automatically appear in the documentation

## Features

- **Markdown Support**: Write in standard markdown
- **File-based**: Simple file organization
- **Auto-navigation**: Automatic menu generation
- **API Integration**: Link docs to API endpoints

## Next Steps

Start creating your documentation by adding markdown files to the \`docu\` folder.
`

      fs.writeFileSync(path.join(DOCS_DIRECTORY, "getting-started.md"), sampleContent)
    }

    const items = await readDirectory(DOCS_DIRECTORY)
    return items
  } catch (error) {
    console.error("Error reading documentation structure:", error)
    return []
  }
}

async function readDirectory(dirPath: string, basePath = ""): Promise<DocumentationItem[]> {
  const items: DocumentationItem[] = []

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name

      if (entry.isDirectory()) {
        // Recursively read subdirectories
        const subItems = await readDirectory(fullPath, relativePath)
        items.push(...subItems)
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const content = fs.readFileSync(fullPath, "utf-8")
        const stats = fs.statSync(fullPath)

        // Extract title from first heading or use filename
        const titleMatch = content.match(/^#\s+(.+)$/m)
        const title = titleMatch ? titleMatch[1] : entry.name.replace(".md", "")

        // Extract description from content
        const descriptionMatch = content.match(/^#\s+.+\n\n(.+)$/m)
        const description = descriptionMatch ? descriptionMatch[1] : undefined

        items.push({
          slug: relativePath.replace(".md", ""),
          title,
          description,
          content,
          lastModified: stats.mtime.toISOString(),
          type: "file",
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }

  return items.sort((a, b) => a.title.localeCompare(b.title))
}

export async function getDocumentBySlug(slug: string): Promise<DocumentationItem | null> {
  const docs = await getDocumentationStructure()
  return docs.find((doc) => doc.slug === slug) || null
}
