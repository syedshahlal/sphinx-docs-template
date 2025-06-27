import type { MarkdownComponent } from "@/components/markdown-editor/types"

function contentToMarkdown(component: MarkdownComponent): string {
  const { type, content } = component

  switch (type) {
    case "heading":
      return `${"#".repeat(content.level || 1)} ${content.text || ""}`
    case "paragraph":
      return content.text || ""
    case "image":
      return `![${content.alt || ""}](${content.src || ""})`
    case "code":
      return "```" + (content.language || "") + "\n" + content.code + "\n```"
    case "blockquote":
      return `> ${content.text || ""}`
    case "list":
      return (content.items || []).map((item: string) => `- ${item}`).join("\n")
    case "orderedList":
      return (content.items || []).map((item: string, index: number) => `${index + 1}. ${item}`).join("\n")
    case "table": {
      const headers = `| ${content.headers.join(" | ")} |`
      const separator = `| ${content.headers.map(() => "---").join(" | ")} |`
      const rows = content.rows.map((row: string[]) => `| ${row.join(" | ")} |`).join("\n")
      return `${headers}\n${separator}\n${rows}`
    }
    case "divider":
      return "---"
    // For complex components, we might just stringify the content as a comment
    // or find a suitable markdown representation. For now, we'll use a placeholder.
    case "card":
    case "grid":
    case "chart":
    case "gallery":
    case "pricing":
      return `<!-- Component: ${type} - ${JSON.stringify(content)} -->`
    default:
      return ""
  }
}

export function componentsToMarkdown(components: MarkdownComponent[]): string {
  return components.map((component) => contentToMarkdown(component)).join("\n\n")
}
