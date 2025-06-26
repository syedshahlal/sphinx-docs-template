"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Highlight, type Language } from "prism-react-renderer"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, ComponentStyle, HtmlBlockContent } from "./types"
import { useEditor } from "./EditorContext"

/* ------------------------------------------------------------------ */
/*  helpers reused by other modules                                   */
/* ------------------------------------------------------------------ */

/** Convert a ComponentStyle object to an inline-CSS string */
const styleObjectToString = (style?: ComponentStyle): string => {
  if (!style) return ""
  return Object.entries(style)
    .filter(([key, val]) => key !== "hover" && key !== "className" && val != null)
    .map(([key, val]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${val};`)
    .join(" ")
}

/** Generate Markdown from the editor's component list (used for export/publish) */
export function generateMarkdown(components: MarkdownComponent[]): string {
  return components
    .sort((a, b) => a.order - b.order)
    .map((c) => {
      const { content } = c
      switch (c.type) {
        case "heading":
          return `${"#".repeat(content.level || 1)} ${content.text || ""}\n`
        case "paragraph":
          return `${content.text || ""}\n`
        case "image": {
          let md = `![${content.alt || ""}](${content.src || ""})`
          if (content.caption) md += `\n*${content.caption}*\n`
          return md + "\n"
        }
        case "code":
          return `\`\`\`${content.language || ""}\n${content.code || ""}\n\`\`\`\n`
        case "button":
          return `[${content.text || "Button"}](${content.link || "#"})\n`
        case "divider":
          return "---\n"
        case "list":
          return (content.items || []).map((i: string) => `- ${i}`).join("\n") + "\n"
        case "orderedList":
          return (
            (content.items || []).map((i: string, idx: number) => `${(content.start || 1) + idx}. ${i}`).join("\n") +
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
          return `> **${(content.type || "info").toUpperCase()}**: ${content.text || ""}\n`
        case "card":
          let cardMd = `## ${content.title || "Card Title"}\n`
          if (content.description) cardMd += `${content.description}\n`
          if (content.imageUrl) cardMd += `![Card Image](${content.imageUrl})\n`
          return cardMd + "\n"
        case "table":
          let tableMd = ""
          if (content.headers) {
            tableMd += "| " + content.headers.join(" | ") + " |\n"
            tableMd += "| " + content.headers.map(() => "---").join(" | ") + " |\n"
          }
          if (content.rows) {
            content.rows.forEach((row: string[]) => {
              tableMd += "| " + row.join(" | ") + " |\n"
            })
          }
          return tableMd + "\n"
        case "columns":
          return `### Column 1\n${content.column1Text || ""}\n\n### Column 2\n${content.column2Text || ""}\n`
        case "spacer":
          return `\n<!-- Spacer: ${content.height || "40px"} -->\n\n`
        case "mermaid":
          return `\`\`\`mermaid\n${content.code || ""}\n\`\`\`\n`
        case "htmlBlock":
          const htmlContent = content as HtmlBlockContent
          return `<!-- ${htmlContent.name || "HTML Block"} -->\n${htmlContent.htmlContent || ""}\n`
        default:
          return ""
      }
    })
    .join("\n")
}

/** Generate HTML from the editor's component list (used for live preview & export) */
export function generateHtml(components: MarkdownComponent[]): string {
  return components
    .sort((a, b) => a.order - b.order)
    .map((c) => {
      const { content } = c
      const style = styleObjectToString(c.style)
      const cls = cn(c.style?.className)
      switch (c.type) {
        case "heading":
          return `<h${content.level || 1} class="${cls}" style="${style}">${content.text || ""}</h${
            content.level || 1
          }>`
        case "paragraph":
          return `<p class="${cls}" style="${style}">${content.text || ""}</p>`
        case "image":
          let imgHtml = `<img src="${content.src || ""}" alt="${content.alt || ""}" class="${cls}" style="${style}" />`
          if (content.caption) {
            imgHtml = `<figure class="${cls}" style="${style}">${imgHtml}<figcaption>${content.caption}</figcaption></figure>`
          }
          return imgHtml
        case "code":
          return `<pre class="${cls}" style="${style}"><code class="language-${
            content.language || ""
          }">${content.code || ""}</code></pre>`
        case "button":
          if (content.link) {
            return `<a href="${content.link}" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 ${cls}" style="${style}">${content.text || "Button"}</a>`
          }
          return `<button class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 ${cls}" style="${style}">${content.text || "Button"}</button>`
        case "card":
          let cardHtml = `<div class="overflow-hidden rounded-lg bg-white shadow ${cls}" style="${style}">`
          if (content.imageUrl) {
            cardHtml += `<img src="${content.imageUrl}" alt="" class="h-48 w-full object-cover" />`
          }
          cardHtml += `<div class="px-4 py-5 sm:p-6">`
          cardHtml += `<h3 class="text-lg font-medium leading-6 text-gray-900">${content.title || "Card Title"}</h3>`
          if (content.description) {
            cardHtml += `<div class="mt-2 max-w-xl text-sm text-gray-500"><p>${content.description}</p></div>`
          }
          cardHtml += `</div></div>`
          return cardHtml
        case "divider":
          return `<hr class="${cls}" style="${style}" />`
        case "list":
          return `<ul class="list-disc list-inside ${cls}" style="${style}">${(content.items || []).map((item: string) => `<li>${item}</li>`).join("")}</ul>`
        case "orderedList":
          return `<ol class="list-decimal list-inside ${cls}" style="${style}" start="${content.start || 1}">${(content.items || []).map((item: string) => `<li>${item}</li>`).join("")}</ol>`
        case "taskList":
          return `<ul class="list-none ${cls}" style="${style}">${(content.items || [])
            .map(
              (item: { text: string; checked: boolean }) =>
                `<li class="flex items-center space-x-2"><input type="checkbox" ${item.checked ? "checked" : ""} class="rounded" /><span${item.checked ? ' class="line-through text-gray-500"' : ""}>${item.text}</span></li>`,
            )
            .join("")}</ul>`
        case "blockquote":
          return `<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 ${cls}" style="${style}">${content.text || ""}</blockquote>`
        case "alert":
          const alertColors = {
            info: "bg-blue-50 text-blue-800 border-blue-200",
            warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
            error: "bg-red-50 text-red-800 border-red-200",
            success: "bg-green-50 text-green-800 border-green-200",
          }
          const alertColor = alertColors[content.type as keyof typeof alertColors] || alertColors.info
          return `<div class="rounded-md border p-4 ${alertColor} ${cls}" style="${style}"><strong>${(content.type || "info").toUpperCase()}:</strong> ${content.text || ""}</div>`
        case "table":
          let tableHtml = `<table class="min-w-full divide-y divide-gray-200 ${cls}" style="${style}"><thead class="bg-gray-50">`
          if (content.headers) {
            tableHtml +=
              "<tr>" +
              content.headers
                .map(
                  (header: string) =>
                    `<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${header}</th>`,
                )
                .join("") +
              "</tr>"
          }
          tableHtml += '</thead><tbody class="bg-white divide-y divide-gray-200">'
          if (content.rows) {
            content.rows.forEach((row: string[]) => {
              tableHtml +=
                "<tr>" +
                row
                  .map((cell: string) => `<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${cell}</td>`)
                  .join("") +
                "</tr>"
            })
          }
          tableHtml += "</tbody></table>"
          return tableHtml
        case "columns":
          return `<div class="grid grid-cols-2 gap-6 ${cls}" style="${style}"><div class="p-4 border border-gray-200 rounded">${content.column1Text || ""}</div><div class="p-4 border border-gray-200 rounded">${content.column2Text || ""}</div></div>`
        case "spacer":
          return `<div class="${cls}" style="height: ${content.height || "40px"}; ${style}"></div>`
        case "mermaid":
          return `<div class="mermaid ${cls}" style="${style}">${content.code || ""}</div>`
        case "htmlBlock":
          const htmlContent = content as HtmlBlockContent
          return `<div class="${cls}" style="${style}">${htmlContent.htmlContent || ""}</div>`
        default:
          return ""
      }
    })
    .join("")
}

/* ------------------------------------------------------------------ */
/*  Prism-React-Renderer inline theme (tiny Dracula subset)            */
/* ------------------------------------------------------------------ */
const draculaTheme = {
  plain: { backgroundColor: "transparent", color: "#f8f8f2" },
  styles: [
    { types: ["comment"], style: { color: "#6272a4" } },
    { types: ["punctuation"], style: { color: "#f8f8f2" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol"], style: { color: "#bd93f9" } },
    { types: ["string", "inserted"], style: { color: "#50fa7b" } },
    { types: ["operator"], style: { color: "#f8f8f2" } },
    { types: ["deleted"], style: { color: "#ff5555" } },
    { types: ["function"], style: { color: "#ffb86c" } },
    { types: ["keyword"], style: { color: "#8be9fd" } },
  ],
} as const

/* ------------------------------------------------------------------ */
/*  React component                                                    */
/* ------------------------------------------------------------------ */

export function PreviewPanel() {
  const { state } = useEditor()
  const markdown = generateMarkdown(state.components)
  const html = generateHtml(state.components)
  const ref = useRef<HTMLDivElement>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ──────────────────────────────────────────────────────────────
  // Render Mermaid diagrams in the HTML preview (client-side only)
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!ref.current) return

    // Skip loading Mermaid unless the preview contains a diagram
    if (!html.includes("mermaid") && !html.includes('class="mermaid"')) {
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        // dynamic import so SSR never touches mermaid
        const mod = await import("mermaid")
        if (cancelled) return
        const mermaid = mod.default ?? mod
        mermaid.initialize({ startOnLoad: false, theme: "default" })

        // find all .mermaid elements
        const nodes = ref.current?.querySelectorAll<HTMLElement>(".mermaid")
        if (!nodes) return

        nodes.forEach((el) => {
          const graph = el.textContent
          if (!graph) return
          const id = `mermaid-${Math.random().toString(36).slice(2)}`

          try {
            mermaid.render(id, graph, (svg) => {
              if (cancelled) return
              const wrapper = document.createElement("div")
              wrapper.innerHTML = svg
              el.parentElement?.replaceChild(wrapper, el)
            })
          } catch (err) {
            console.error("Mermaid render error →", err instanceof Error ? err.message : String(err))
          }
        })
      } catch (err) {
        console.error("Mermaid load failed →", err instanceof Error ? err.message : String(err))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [html])

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="preview" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="mx-2 mt-2 shrink-0">
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>

        {/* ---------- Live preview --------- */}
        <TabsContent value="preview" className="flex-1 overflow-hidden p-2">
          <ScrollArea className="h-full prose dark:prose-invert max-w-none">
            <div
              ref={ref}
              dangerouslySetInnerHTML={{ __html: html }}
              className="prose prose-sm max-w-none dark:prose-invert"
            />
          </ScrollArea>
        </TabsContent>

        {/* ---------- Markdown source --------- */}
        <TabsContent value="markdown" className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(markdown)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(markdown, "content.md")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <ScrollArea className="h-full p-2 font-mono whitespace-pre-wrap text-sm">{markdown}</ScrollArea>
          </div>
        </TabsContent>

        {/* ---------- Raw HTML source --------- */}
        <TabsContent value="html" className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(html)}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(html, "content.html")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <ScrollArea className="h-full p-2 font-mono whitespace-pre-wrap text-sm">{html}</ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Syntax-highlighted <code> render used by ReactMarkdown             */
/* ------------------------------------------------------------------ */

export function CodeBlock({
  inline,
  className,
  children,
  ...props
}: React.ComponentProps<"code"> & { inline?: boolean }) {
  const match = /language-(\w+)/.exec(className || "")
  const language = (match?.[1] as Language) || "tsx"

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  return (
    <Highlight code={String(children).replace(/\n$/, "")} language={language} theme={draculaTheme}>
      {({ className: c, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={c} style={{ ...style, margin: 0 }} {...props}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

// Named export for compatibility
export { PreviewPanel as default }
