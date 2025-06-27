import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const contentDirectory = path.join(process.cwd(), "content/docs") // Adjusted for Next.js project root

export interface DocData {
  id: string
  title: string
  date?: string
  description?: string
  contentHtml: string
  [key: string]: any // For other frontmatter fields
}

export function getAllDocIds() {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        // Slug will be an array of path segments
        slug: fileName.replace(/\.md$/, "").split("/"),
      },
    }
  })
}

export async function getDocData(slug: string | string[]): Promise<DocData> {
  const id = Array.isArray(slug) ? slug.join("/") : slug
  const fullPath = path.join(contentDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    // Try finding with .mdx if .md not found, or handle as 404
    // For now, simple check:
    throw new Error(`Markdown file not found for slug: ${id}`)
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html, { sanitize: false }) // sanitize:false if you trust your MD content or will sanitize later
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    title: matterResult.data.title || "Untitled Document",
    ...(matterResult.data as { date?: string; description?: string }),
  }
}

export function getAllDocsMetadata() {
  const fileNames = fs.readdirSync(contentDirectory)
  const allDocsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "")
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const matterResult = matter(fileContents)
      return {
        id,
        title: matterResult.data.title || "Untitled Document",
        description: matterResult.data.description || "",
        date: matterResult.data.date || null,
      }
    })
  return allDocsData.sort((a, b) => (a.date && b.date && a.date < b.date ? 1 : -1))
}
