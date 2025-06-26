"use client"

import type React from "react"
import type { MarkdownComponent, ComponentStyle, HtmlBlockContent } from "./types" // Added HtmlBlockContent
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

interface ComponentRendererProps {
  component: MarkdownComponent
  isSelected: boolean
  updateComponentContent: (id: string, contentUpdates: any) => void
}

export function ComponentRenderer({ component, isSelected, updateComponentContent }: ComponentRendererProps) {
  const styles = applyStyles(component.style)
  const hoverClasses = getHoverClasses(component.style)
  const customClasses = component.style?.className || ""
  const combinedClasses = cn(hoverClasses, customClasses)

  const handleTextBlur = (e: React.FocusEvent<HTMLElement>, field = "text") => {
    const newText = e.currentTarget.textContent
    if (newText !== null && newText !== (component.content as any)[field]) {
      updateComponentContent(component.id, { [field]: newText })
    }
  }

  switch (component.type) {
    case "heading":
      const Tag = `h${component.content.level || 1}` as keyof JSX.IntrinsicElements
      return (
        <Tag
          style={styles}
          className={cn(
            combinedClasses,
            isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "",
          )}
          contentEditable={isSelected}
          suppressContentEditableWarning={true}
          onBlur={handleTextBlur}
          // Key ensures re-render if text changes externally while not focused
          // However, direct children update should be handled by React.
          // Let's rely on React's diffing for the child text node.
        >
          {component.content.text || "Heading"}
        </Tag>
      )
    case "paragraph":
      return (
        <p
          style={styles}
          className={cn(
            combinedClasses,
            isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "",
          )}
          contentEditable={isSelected}
          suppressContentEditableWarning={true}
          onBlur={handleTextBlur}
        >
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
            <figcaption
              className={cn(
                "text-sm text-muted-foreground mt-2 text-center",
                isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "",
              )}
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextBlur(e, "caption")}
            >
              {component.content.caption}
            </figcaption>
          )}
        </figure>
      )
    case "code": // Code blocks are typically not contentEditable directly for rich editing.
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
              <span
                className={cn(isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "")}
                contentEditable={isSelected}
                suppressContentEditableWarning={true}
                onBlur={handleTextBlur}
                onClick={(e) => {
                  if (isSelected) e.stopPropagation()
                }} // Prevent link navigation during edit
              >
                {component.content.text || "Button"}
              </span>
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </a>
          ) : (
            <span
              className={cn(isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "")}
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={handleTextBlur}
            >
              {component.content.text || "Button"}
            </span>
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
            <CardTitle
              className={cn(isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "")}
              contentEditable={isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleTextBlur(e, "title")}
            >
              {component.content.title || "Card Title"}
            </CardTitle>
            {component.content.description && (
              <CardDescription
                className={cn(isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "")}
                contentEditable={isSelected}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleTextBlur(e, "description")}
              >
                {component.content.description}
              </CardDescription>
            )}
          </CardHeader>
          {/* Add CardContent or CardFooter if needed based on card complexity */}
        </Card>
      )
    case "divider":
      return <hr style={styles} className={cn("my-6 border-border", combinedClasses)} />
    case "list": // Unordered List - Direct editing of items is complex, typically done via PropertiesPanel
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
                  readOnly // Task checking usually via click, not direct text edit of checkbox
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
          className={cn(
            "border-l-4 border-primary pl-4 italic text-muted-foreground my-4 py-1",
            combinedClasses,
            isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "",
          )}
          contentEditable={isSelected}
          suppressContentEditableWarning={true}
          onBlur={handleTextBlur}
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
          <AlertDescription
            className={cn(isSelected ? "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" : "")}
            contentEditable={isSelected}
            suppressContentEditableWarning={true}
            onBlur={handleTextBlur}
          >
            {component.content.text || "Alert message."}
          </AlertDescription>
        </Alert>
      )
    case "spacer":
      return <div style={{ height: component.content.height || "20px", ...styles }} className={combinedClasses}></div>
    case "columns": // Direct editing of column content is complex.
      return (
        <div style={styles} className={cn("grid md:grid-cols-2 gap-4 my-4", combinedClasses)}>
          <div className="border border-dashed border-muted-foreground/30 p-3 rounded-md prose dark:prose-invert max-w-none">
            <p>{component.content.column1Text || "Column 1 content..."}</p>
          </div>
          <div className="border border-dashed border-muted-foreground/30 p-3 rounded-md prose dark:prose-invert max-w-none">
            <p>{component.content.column2Text || "Column 2 content..."}</p>
          </div>
        </div>
      )
    case "mermaid": // Mermaid code edited in PropertiesPanel
      return (
        <div style={styles} className={cn("my-4 p-4 border rounded-md bg-muted/50 text-center", combinedClasses)}>
          <pre className="mermaid bg-transparent text-left text-sm overflow-x-auto">
            {component.content.code || "graph TD;\nA-->B;"}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">Mermaid Diagram (renders in preview/HTML)</p>
        </div>
      )
    case "table": // Table content typically edited via PropertiesPanel or a more specialized UI
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
    case "htmlBlock": // HTML block content is raw HTML, edited in PropertiesPanel
      const htmlContent = component.content as HtmlBlockContent
      return (
        <div style={styles} className={cn("my-2 relative group", combinedClasses)}>
          {isSelected && (
            <div className="absolute -top-6 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded text-nowrap z-10">
              {htmlContent.name || "HTML Block"}
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent.htmlContent || "" }}
            className="prose prose-sm max-w-none dark:prose-invert"
          />
          {isSelected && (
            <div className="absolute inset-0 border-2 border-blue-500 rounded pointer-events-none opacity-50"></div>
          )}
        </div>
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
