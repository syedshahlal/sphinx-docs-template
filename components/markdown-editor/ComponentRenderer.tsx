"use client"

import type React from "react"
import type { MarkdownComponent, ComponentStyle } from "./types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button as UIButton } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Info, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils" // Your utility for classnames
import type { JSX } from "react/jsx-runtime" // Import JSX to declare the variable

// Helper to apply styles
const applyStyles = (style?: ComponentStyle): React.CSSProperties => {
  if (!style) return {}
  const cssProps: React.CSSProperties = {}
  if (style.color) cssProps.color = style.color
  if (style.backgroundColor) cssProps.backgroundColor = style.backgroundColor
  if (style.fontSize) cssProps.fontSize = style.fontSize
  if (style.fontWeight) cssProps.fontWeight = style.fontWeight as React.CSSProperties["fontWeight"]
  if (style.fontStyle) cssProps.fontStyle = style.fontStyle
  if (style.textDecoration) cssProps.textDecoration = style.textDecoration
  if (style.textAlign) cssProps.textAlign = style.textAlign as React.CSSProperties["textAlign"]
  if (style.width) cssProps.width = style.width
  if (style.height) cssProps.height = style.height
  if (style.padding) cssProps.padding = style.padding
  if (style.margin) cssProps.margin = style.margin
  if (style.border) cssProps.border = style.border
  if (style.borderRadius) cssProps.borderRadius = style.borderRadius
  if (style.boxShadow) cssProps.boxShadow = style.boxShadow
  if (style.opacity !== undefined) cssProps.opacity = style.opacity
  return cssProps
}

// Helper for hover classes (simplified)
const getHoverClasses = (style?: ComponentStyle): string => {
  if (!style?.hover) return ""
  let classes = "transition-all duration-200 ease-in-out "
  if (style.hover.backgroundColor) classes += `hover:bg-[${style.hover.backgroundColor}] ` // Needs JIT mode for arbitrary values
  if (style.hover.color) classes += `hover:text-[${style.hover.color}] `
  if (style.hover.boxShadow) classes += `hover:shadow-[${style.hover.boxShadow.replace(/ /g, "_")}] ` // Tailwind JIT might need specific shadow classes
  if (style.hover.transform) {
    // Example: transform: "scale(1.05)" -> hover:scale-105
    if (style.hover.transform.includes("scale"))
      classes += `hover:scale-[${style.hover.transform.match(/scale$$([^)]+)$$/)?.[1] || "100"}] `
  }
  return classes.trim()
}

export function ComponentRenderer({ component }: { component: MarkdownComponent }) {
  const styles = applyStyles(component.style)
  const hoverClasses = getHoverClasses(component.style)
  const customClasses = component.style?.className || ""
  const combinedClasses = cn(hoverClasses, customClasses)

  switch (component.type) {
    case "heading":
      const Tag = `h${component.content.level || 1}` as keyof JSX.IntrinsicElements
      return (
        <Tag style={styles} className={combinedClasses}>
          {component.content.text || "Heading"}
        </Tag>
      )
    case "paragraph":
      return (
        <p style={styles} className={combinedClasses}>
          {component.content.text || "Paragraph text..."}
        </p>
      )
    case "image":
      return (
        <figure style={styles} className={cn("my-4", combinedClasses)}>
          <img
            src={component.content.src || "/placeholder.svg?height=200&width=400&query=image"}
            alt={component.content.alt || "Image"}
            className="max-w-full h-auto rounded-md shadow-sm"
          />
          {component.content.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {component.content.caption}
            </figcaption>
          )}
        </figure>
      )
    case "code":
      return (
        <pre style={styles} className={cn("bg-muted p-4 rounded-md overflow-x-auto my-4 text-sm", combinedClasses)}>
          <code className={`language-${component.content.language || "plaintext"}`}>
            {component.content.code || "// Your code here"}
          </code>
        </pre>
      )
    case "button":
      return (
        <UIButton
          style={styles}
          className={cn("my-2", combinedClasses)}
          variant={component.content.variant || "default"}
          size={component.content.size || "default"}
          asChild={!!component.content.link}
        >
          {component.content.link ? (
            <a href={component.content.link} target="_blank" rel="noopener noreferrer">
              {component.content.text || "Button"} <ExternalLink className="w-3 h-3 ml-1.5" />
            </a>
          ) : (
            component.content.text || "Button"
          )}
        </UIButton>
      )
    case "card":
      return (
        <Card style={styles} className={cn("my-4 overflow-hidden", combinedClasses)}>
          {component.content.imageUrl && (
            <img
              src={component.content.imageUrl || "/placeholder.svg"}
              alt={component.content.title || "Card image"}
              className="w-full h-40 object-cover"
            />
          )}
          <CardHeader>
            <CardTitle>{component.content.title || "Card Title"}</CardTitle>
            {component.content.description && <CardDescription>{component.content.description}</CardDescription>}
          </CardHeader>
          {/* Add CardContent or CardFooter if needed based on card complexity */}
        </Card>
      )
    case "divider":
      return <hr style={styles} className={cn("my-6 border-border", combinedClasses)} />
    case "list": // Unordered List
      return (
        <ul style={styles} className={cn("list-disc pl-6 my-2 space-y-1", combinedClasses)}>
          {(component.content.items || ["List item 1"]).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )
    case "orderedList":
      return (
        <ol
          style={styles}
          className={cn("list-decimal pl-6 my-2 space-y-1", combinedClasses)}
          start={component.content.start || 1}
        >
          {(component.content.items || ["Ordered item 1"]).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )
    case "taskList":
      return (
        <ul style={styles} className={cn("list-none pl-1 my-2 space-y-1.5", combinedClasses)}>
          {(component.content.items || [{ text: "Task 1", checked: false }]).map(
            (item: { text: string; checked: boolean }, index: number) => (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className={cn(item.checked && "line-through text-muted-foreground")}>{item.text}</span>
              </li>
            ),
          )}
        </ul>
      )
    case "blockquote":
      return (
        <blockquote
          style={styles}
          className={cn("border-l-4 border-primary pl-4 italic text-muted-foreground my-4 py-1", combinedClasses)}
        >
          {component.content.text || "This is a quote."}
        </blockquote>
      )
    case "alert":
      const alertIcons = {
        info: <Info className="h-5 w-5" />,
        warning: <AlertTriangle className="h-5 w-5" />,
        error: <XCircle className="h-5 w-5" />,
        success: <CheckCircle className="h-5 w-5" />,
      }
      const alertType = component.content.type || "info"
      return (
        <Alert style={styles} className={cn("my-4", combinedClasses)} variant={alertType as any}>
          {alertIcons[alertType as keyof typeof alertIcons]}
          <AlertTitle className="font-semibold capitalize">{alertType}</AlertTitle>
          <AlertDescription>{component.content.text || "Alert message."}</AlertDescription>
        </Alert>
      )
    case "spacer":
      return <div style={{ height: component.content.height || "20px", ...styles }} className={combinedClasses}></div>
    case "columns": // Simple 2-column renderer
      return (
        <div style={styles} className={cn("grid md:grid-cols-2 gap-4 my-4", combinedClasses)}>
          <div className="border border-dashed border-muted-foreground/30 p-3 rounded-md prose dark:prose-invert max-w-none">
            {/* For simplicity, render as plain text. For full MD, use a Markdown renderer here */}
            <p>{component.content.column1Text || "Column 1 content..."}</p>
          </div>
          <div className="border border-dashed border-muted-foreground/30 p-3 rounded-md prose dark:prose-invert max-w-none">
            <p>{component.content.column2Text || "Column 2 content..."}</p>
          </div>
        </div>
      )
    case "mermaid":
      return (
        <div style={styles} className={cn("my-4 p-4 border rounded-md bg-muted/50 text-center", combinedClasses)}>
          <pre className="mermaid bg-transparent text-left text-sm overflow-x-auto">
            {component.content.code || "graph TD;\nA-->B;"}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">Mermaid Diagram (renders in preview/HTML)</p>
        </div>
      )
    case "table":
      return (
        <Table style={styles} className={cn("my-4", combinedClasses)}>
          <TableHeader>
            <TableRow>
              {(component.content.headers || ["Header 1"]).map((header: string, idx: number) => (
                <TableHead key={idx}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(component.content.rows || [["Cell 1"]]).map((row: string[], rIdx: number) => (
              <TableRow key={rIdx}>
                {row.map((cell: string, cIdx: number) => (
                  <TableCell key={cIdx}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
    default:
      return (
        <div
          style={styles}
          className={cn(
            "p-3 my-2 border border-dashed border-destructive/50 rounded-md bg-destructive/10 text-destructive-foreground",
            combinedClasses,
          )}
        >
          <p className="font-semibold">Unsupported Component: {component.type}</p>
          <pre className="text-xs mt-1">{JSON.stringify(component.content, null, 2)}</pre>
        </div>
      )
  }
}
