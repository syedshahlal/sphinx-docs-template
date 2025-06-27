import type { MarkdownComponent } from "@/components/markdown-editor/types"

export function componentsToMarkdown(components: MarkdownComponent[]): string {
  let markdown = ""

  components.forEach((component) => {
    switch (component.type) {
      case "heading":
        markdown += `${"#".repeat(component.content.level || 2)} ${component.content.text || "Heading"}\n\n`
        break

      case "paragraph":
        markdown += `${component.content.text || "Paragraph text"}\n\n`
        break

      case "image":
        markdown += `![${component.content.alt || ""}](${component.content.src || ""})\n`
        if (component.content.caption) {
          markdown += `*${component.content.caption}*\n`
        }
        markdown += "\n"
        break

      case "button":
        if (component.content.link) {
          markdown += `[${component.content.text || "Button"}](${component.content.link})\n\n`
        } else {
          markdown += `**${component.content.text || "Button"}**\n\n`
        }
        break

      case "code":
        markdown += "```" + (component.content.language || "") + "\n"
        markdown += (component.content.code || "// Your code here") + "\n"
        markdown += "```\n\n"
        break

      case "blockquote":
        markdown += `> ${component.content.text || "Quote text"}\n`
        if (component.content.author) {
          markdown += `> \n> — ${component.content.author}\n`
        }
        markdown += "\n"
        break

      case "list":
        component.content.items?.forEach((item: string) => {
          markdown += `- ${item}\n`
        })
        markdown += "\n"
        break

      case "orderedList":
        component.content.items?.forEach((item: string, index: number) => {
          markdown += `${(component.content.start || 1) + index}. ${item}\n`
        })
        markdown += "\n"
        break

      case "taskList":
        component.content.items?.forEach((item: any) => {
          markdown += `- [${item.checked ? "x" : " "}] ${item.text}\n`
        })
        markdown += "\n"
        break

      case "table":
        if (component.content.headers?.length > 0) {
          markdown += "| " + component.content.headers.join(" | ") + " |\n"
          markdown += "| " + component.content.headers.map(() => "---").join(" | ") + " |\n"
          component.content.rows?.forEach((row: string[]) => {
            markdown += "| " + row.join(" | ") + " |\n"
          })
          markdown += "\n"
        }
        break

      case "divider":
        markdown += "---\n\n"
        break

      case "htmlBlock":
        markdown += `<!-- ${component.content.name || "HTML Block"} -->\n`
        markdown += `${component.content.htmlContent || ""}\n\n`
        break

      default:
        markdown += `<!-- ${component.type} component -->\n\n`
    }
  })

  return markdown
}
