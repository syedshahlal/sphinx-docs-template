"use client"

import { useState, useMemo, Suspense, lazy } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw" // To handle HTML in Markdown
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism" // Using esm imports
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Lazy load Mermaid component
const Mermaid = lazy(() => import("@/components/ui/mermaid"))

interface PreviewPanelProps {
  markdown: string
  className?: string
  initialPreviewMode?: "preview" | "markdown" | "html" // Added html option
}

// Function to generate HTML (simplified, actual HTML generation might be more complex)
export function generateHtml(markdown: string): string {
  // This is a placeholder. In a real scenario, you'd use a robust Markdown-to-HTML
  // converter library on the server or client, or get HTML directly from BlockNote if possible.
  // For now, we'll just wrap the markdown in a pre tag for demonstration.
  // A library like `marked` or `showdown` could be used here.
  // Or, if BlockNote provides an HTML export, use that.
  // For simplicity, this example won't implement full HTML generation.
  // We will rely on react-markdown for preview.
  return `<div class="prose dark:prose-invert max-w-none">${markdown}</div>` // Basic representation
}

export function PreviewPanel({ markdown, className, initialPreviewMode = "preview" }: PreviewPanelProps) {
  const { resolvedTheme } = useTheme()
  const [currentTab, setCurrentTab] = useState(initialPreviewMode)

  const syntaxHighlighterTheme = useMemo(() => {
    return resolvedTheme === "dark" ? oneDark : oneLight
  }, [resolvedTheme])

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "")
      const codeContent = String(children).replace(/\n$/, "")

      if (match && match[1] === "mermaid") {
        return (
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" /> Rendering Diagram...
              </div>
            }
          >
            <Mermaid chart={codeContent} />
          </Suspense>
        )
      }

      return !inline && match ? (
        <SyntaxHighlighter style={syntaxHighlighterTheme} language={match[1]} PreTag="div" {...props}>
          {codeContent}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    // You can add more custom renderers here if needed
    // e.g., for tables, images, etc., to apply specific styling or behavior
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-background z-10 dark:bg-neutral-800">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="markdown">Markdown</TabsTrigger>
          {/* <TabsTrigger value="html">HTML</TabsTrigger> */}
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="preview" className="p-4 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
              {markdown}
            </ReactMarkdown>
          </TabsContent>
          <TabsContent value="markdown" className="p-4">
            <pre className="text-sm whitespace-pre-wrap bg-muted dark:bg-neutral-900 p-3 rounded-md">{markdown}</pre>
          </TabsContent>
          {/* <TabsContent value="html" className="p-4">
            <pre className="text-sm whitespace-pre-wrap bg-muted dark:bg-neutral-900 p-3 rounded-md">
              {generateHtml(markdown)}
            </pre>
          </TabsContent> */}
        </ScrollArea>
      </Tabs>
    </div>
  )
}
