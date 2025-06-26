"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Highlight, type Language } from "prism-react-renderer"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { MarkdownComponent, ComponentStyle } from "./types"
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

/** Generate Markdown from the editor’s component list (used for export/publish) */
function generateMarkdown(components: MarkdownComponent[]): string {
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
        case "mermaid":
          return `\`\`\`mermaid\n${content.code || ""}\n\`\`\`\n`
        /* …handle any other component types you support… */
        default:
          return ""
      }
    })
    .join("\n")
}

/** Generate HTML from the editor’s component list (used for live preview & export) */
function generateHtml(components: MarkdownComponent[]): string {
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
          return `<img src="${content.src || ""}" alt="${content.alt || ""}" class="${cls}" style="${style}" />`
        case "code":
          return `<pre class="${cls}" style="${style}"><code class="language-${
            content.language || ""
          }">${content.code || ""}</code></pre>`
        /* …other component types… */
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

  // handle mermaid diagrams in HTML preview on client-side
  useEffect(() => {
    if (!ref.current) return
    ;(async () => {
      // dynamic import to avoid SSR issues
      const mermaid = (await import("mermaid")).default
      mermaid.initialize({ startOnLoad: false, theme: "default" })
      mermaid.run({ nodes: [ref.current] })
    })().catch(() => {})
  }, [html])

  /* helper to retry failed images */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const broken = e.target as HTMLImageElement
    const retry = new Image()
    retry.crossOrigin = "anonymous"
    retry.onload = () => (broken.src = retry.src)
    retry.src = broken.src
  }

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
            {/* Render HTML (mermaid placeholders are handled via effect) */}
            <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
          </ScrollArea>
        </TabsContent>

        {/* ---------- Markdown source --------- */}
        <TabsContent value="markdown" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-2 font-mono whitespace-pre-wrap text-sm">{markdown}</ScrollArea>
        </TabsContent>

        {/* ---------- Raw HTML source --------- */}
        <TabsContent value="html" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full p-2 font-mono whitespace-pre-wrap text-sm">{html}</ScrollArea>
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

/* ------------------------------------------------------------------ */
/*  re-export helpers so other modules keep working                    */
/* ------------------------------------------------------------------ */
export { generateMarkdown, generateHtml }
