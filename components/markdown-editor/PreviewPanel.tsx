// -----------------------------------------------------------
// Simple HTML generator – converts a MarkdownComponent array
// (or any serialised editor state you pass in) to raw HTML.
// -----------------------------------------------------------
import type { MarkdownComponent } from "./types"

/** Convert a Component list to Markdown */
export function generateMarkdown(blocks: MarkdownComponent[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "heading":
          return `${"#".repeat(b.content.level || 1)} ${b.content.text}\n\n`
        case "paragraph":
          return `${b.content.text}\n\n`
        case "image":
          return `![${b.content.alt}](${b.content.src})\n\n`
        case "code":
          return `\`\`\`${b.content.language || ""}\n${b.content.code}\n\`\`\`\n\n`
        case "htmlBlock":
          return `${b.content.html}\n\n`
        default:
          return ""
      }
    })
    .join("")
}

export function generateHtml(components: MarkdownComponent[]): string {
  return components
    .map((c) => {
      switch (c.type) {
        case "heading":
          return `<h${c.content.level}>${c.content.text}</h${c.content.level}>`
        case "paragraph":
          return `<p>${c.content.text}</p>`
        case "image":
          return `<figure><img src="${c.content.src}" alt="${c.content.alt}" />${
            c.content.caption ? `<figcaption>${c.content.caption}</figcaption>` : ""
          }</figure>`
        case "code":
          return `<pre><code class="language-${c.content.language}">${c.content.code}</code></pre>`
        case "htmlBlock":
          return c.content.html
        // add more cases as needed …
        default:
          return ""
      }
    })
    .join("\n")
}
