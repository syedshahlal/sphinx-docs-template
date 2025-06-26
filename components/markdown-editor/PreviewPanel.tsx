"use client"

import { useEffect, useRef } from "react"
import { useEditor } from "./EditorContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism" // Or your preferred theme
import type { MarkdownComponent, ComponentStyle } from "./types"
import { cn } from "@/lib/utils"

// Lazy mermaid loader to avoid SSR crashes
let mermaid: any = null
const loadMermaid = async () => {
  if (mermaid) return mermaid // already loaded
  if (typeof window === "undefined") return // SSR — skip
  const mod = await import("mermaid")
  mermaid = mod.default ?? mod
  mermaid.initialize({ startOnLoad: false, theme: "default" })
  return mermaid
}

// Helper to convert style object to inline CSS string
const styleObjectToString = (style?: ComponentStyle): string => {
  if (!style) return ""
  let cssString = ""
  for (const [key, value] of Object.entries(style)) {
    if (key === "hover" || key === "className" || value === undefined || value === null) continue
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase() // camelCase to kebab-case
    cssString += `${cssKey}: ${value}; `
  }
  return cssString.trim()
}

// Helper for hover (simplified, relies on global CSS or more complex setup for full dynamic hover)
// For Markdown, hover effects are not standard. For HTML, we can use classes or inline JS.
// This example will focus on generating classes if `style.className` is used.

const generateMarkdown = (components: MarkdownComponent[]): string => {
  return components
    .sort((a, b) => a.order - b.order)
    .map((component) => {
      const content = component.content
      // Basic Markdown generation, styling is mostly lost in pure MD
      switch (component.type) {
        case "heading":
          return `${"#".repeat(content.level || 1)} ${content.text || ""}\n`
        case "paragraph":
          return `${content.text || ""}\n`
        case "image":
          let imgMd = `![${content.alt || ""}](${content.src || ""})`
          if (content.caption) imgMd += `\n*${content.caption}*\n`
          return imgMd + "\n"
        case "code":
          return `\`\`\`${content.language || ""}\n${content.code || ""}\n\`\`\`\n`
        case "button":
          return `[${content.text || "Button"}](${content.link || "#"}) <!-- Button -->\n` // MD doesn't have real buttons
        case "card":
          return `> **${content.title || "Card"}**\n> ${content.description || ""}\n${content.imageUrl ? `> ![Card Image](${content.imageUrl})\n` : ""}` // Simple blockquote card
        case "divider":
          return "---\n"
        case "list":
          return (content.items || []).map((item: string) => `- ${item}`).join("\n") + "\n"
        case "orderedList":
          return (
            (content.items || []).map((item: string, i: number) => `${(content.start || 1) + i}. ${item}`).join("\n") +
            "\n"
          )
        case "taskList":
          return (
            (content.items || [])
              .map((item: { text: string; checked: boolean }) => `- [${item.checked ? "x" : " "}] ${item.text}`)
              .join("\n") + "\n"
          )
        case "blockquote":
          return `> ${content.text || ""}\n`
        case "alert":
          return `> **${content.type || "Info"}:** ${content.text || ""}\n`
        case "spacer":
          return `<!-- Spacer (${content.height || "20px"}) -->\n`
        case "columns":
          return `<!-- 2 Columns Layout -->\n**Column 1:**\n${content.column1Text || ""}\n\n**Column 2:**\n${content.column2Text || ""}\n`
        case "mermaid":
          return `\`\`\`mermaid\n${content.code || ""}\n\`\`\`\n`
        case "table":
          let tableMd = `| ${(content.headers || []).join(" | ")} |\n`
          tableMd += `| ${(content.headers || []).map(() => "---").join(" | ")} |\n`
          tableMd += (content.rows || []).map((row: string[]) => `| ${row.join(" | ")} |`).join("\n") + "\n"
          return tableMd
        default:
          return `<!-- Unsupported component: ${component.type} -->\n`
      }
    })
    .join("\n")
}

const generateHtml = (components: MarkdownComponent[]): string => {
  return components
    .sort((a, b) => a.order - b.order)
    .map((component) => {
      const content = component.content
      const inlineStyle = styleObjectToString(component.style)
      const classes = cn(component.style?.className || "") // Add hover classes if you have a system for it

      // HTML generation with inline styles and classes
      switch (component.type) {
        case "heading":
          return `<h${content.level || 1} style="${inlineStyle}" class="${classes}">${content.text || ""}</h${content.level || 1}>`
        case "paragraph":
          return `<p style="${inlineStyle}" class="${classes}">${content.text || ""}</p>`
        case "image":
          let imgHtml = `<figure style="${inlineStyle}" class="${classes}"><img src="${content.src || ""}" alt="${content.alt || ""}" style="max-width:100%;height:auto;">`
          if (content.caption)
            imgHtml += `<figcaption style="font-size:0.9em;color:grey;text-align:center;">${content.caption}</figcaption>`
          imgHtml += `</figure>`
          return imgHtml
        case "code":
          return `<pre style="${inlineStyle}" class="${classes}"><code class="language-${content.language || ""}">${content.code || ""}</code></pre>` // Syntax highlighting needs JS
        case "button":
          return `<a href="${content.link || "#"}" style="display:inline-block;padding:0.5em 1em;text-decoration:none;border:1px solid;${inlineStyle}" class="${classes}" role="button">${content.text || "Button"}</a>`
        case "card":
          return `<div style="border:1px solid #eee;padding:1em;margin:1em 0;${inlineStyle}" class="${classes}"><h4>${content.title || ""}</h4><p>${content.description || ""}</p>${content.imageUrl ? `<img src="${content.imageUrl}" alt="Card Image" style="max-width:100%;"/>` : ""}</div>`
        case "divider":
          return `<hr style="${inlineStyle}" class="${classes}">`
        case "list":
          return `<ul style="${inlineStyle}" class="${classes}">${(content.items || []).map((item: string) => `<li>${item}</li>`).join("")}</ul>`
        case "orderedList":
          return `<ol style="${inlineStyle}" class="${classes}" start="${content.start || 1}">${(content.items || []).map((item: string) => `<li>${item}</li>`).join("")}</ol>`
        case "taskList":
          return `<ul style="list-style-type:none;${inlineStyle}" class="${classes}">${(content.items || []).map((item: { text: string; checked: boolean }) => `<li><input type="checkbox" ${item.checked ? "checked" : ""} disabled> ${item.text}</li>`).join("")}</ul>`
        case "blockquote":
          return `<blockquote style="border-left:3px solid #ccc;padding-left:1em;font-style:italic;${inlineStyle}" class="${classes}">${content.text || ""}</blockquote>`
        case "alert":
          return `<div style="padding:1em;border:1px solid;border-left-width:4px;${inlineStyle}" class="alert-${content.type || "info"} ${classes}">${content.text || ""}</div>` // CSS needed for alert types
        case "spacer":
          return `<div style="height:${content.height || "20px"};${inlineStyle}" class="${classes}"></div>`
        case "columns":
          return `<div style="display:flex;gap:1em;${inlineStyle}" class="${classes}"><div style="flex:1;">${content.column1Text || ""}</div><div style="flex:1;">${content.column2Text || ""}</div></div>`
        case "mermaid":
          return `<pre class="mermaid" style="${inlineStyle}">${content.code || ""}</pre>` // Mermaid JS will render this
        case "table":
          let tableHtml = `<table style="border-collapse:collapse;width:100%;${inlineStyle}" class="${classes}"><thead><tr>${(content.headers || []).map((h: string) => `<th style="border:1px solid #ddd;padding:8px;">${h}</th>`).join("")}</tr></thead><tbody>`
          tableHtml += (content.rows || [])
            .map(
              (row: string[]) =>
                `<tr>${row.map((cell: string) => `<td style="border:1px solid #ddd;padding:8px;">${cell}</td>`).join("")}</tr>`,
            )
            .join("")
          tableHtml += `</tbody></table>`
          return tableHtml
        default:
          return `<!-- ${component.type} -->`
      }
    })
    .join("")
}

const MermaidRenderer = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chart) return
    let isMounted = true
    loadMermaid().then((m) => {
      if (!m || !isMounted || !ref.current) return
      try {
        m.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          chart,
          (svgCode: string) => ref.current && (ref.current.innerHTML = svgCode),
        )
      } catch (err) {
        console.error("Mermaid render error:", err)
        if (ref.current) ref.current.textContent = "Error rendering diagram."
      }
    })
    return () => {
      isMounted = false
    }
  }, [chart])

  return (
    <div ref={ref} className="flex justify-center items-center my-4">
      Loading diagram...
    </div>
  )
}

export function PreviewPanel() {
  const { state } = useEditor()
  const markdownContent = generateMarkdown(state.components)
  const htmlContent = generateHtml(state.components)

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="preview" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-2 mt-2 shrink-0">
          <TabsTrigger value="preview" className="text-xs">
            Live Preview
          </TabsTrigger>
          <TabsTrigger value="markdown" className="text-xs">
            Markdown
          </TabsTrigger>
          <TabsTrigger value="html" className="text-xs">
            HTML
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="flex-1 overflow-hidden p-1">
          <ScrollArea className="h-full p-3 prose dark:prose-invert max-w-none">
            {/* This is a simple HTML render. For full fidelity, you might need a more complex renderer or iframe */}
            {/* For Mermaid in HTML preview, ensure Mermaid.js is initialized and run */}
            {state.components.map((component) => {
              if (component.type === "mermaid" && component.content.code) {
                return <MermaidRenderer key={component.id} chart={component.content.code} />
              }
              // A more robust way would be to parse the generated HTML string
              // For now, this is a placeholder for direct component rendering if needed
              return null
            })}
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent.replace(/<pre class="mermaid">([\s\S]*?)<\/pre>/g, "") }}
            />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="markdown" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <SyntaxHighlighter
              language="markdown"
              style={atomDark}
              customStyle={{ margin: 0, padding: "1rem", height: "100%" }}
              wrapLines={true}
              PreTag="div"
            >
              {markdownContent}
            </SyntaxHighlighter>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="html" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <SyntaxHighlighter
              language="html"
              style={atomDark}
              customStyle={{ margin: 0, padding: "1rem", height: "100%" }}
              wrapLines={true}
              PreTag="div"
            >
              {htmlContent}
            </SyntaxHighlighter>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// --- exports --------------------------------------------------------------
export { generateMarkdown, generateHtml }
