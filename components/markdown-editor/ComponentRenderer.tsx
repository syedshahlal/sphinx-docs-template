"use client"

import type React from "react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  GripVertical,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Code,
  BarChart3,
  Star,
  FileCode,
} from "lucide-react"
import type { MarkdownComponent } from "./types"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface ComponentRendererProps {
  component: MarkdownComponent
  isSelected: boolean
  updateComponentContent: (id: string, contentUpdates: Partial<any>) => void
}

export function ComponentRenderer({ component, isSelected, updateComponentContent }: ComponentRendererProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    // This would be handled by the parent component
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    // This would be handled by the parent component
  }

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(!isVisible)
  }

  const toggleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(!isEditing)
  }

  const renderComponent = () => {
    if (!isVisible) {
      return (
        <div className="p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground text-center">Component hidden</p>
        </div>
      )
    }

    switch (component.type) {
      case "heading":
        const HeadingTag = `h${component.content.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag
            className={cn(
              "font-bold text-foreground",
              component.content.level === 1 && "text-4xl",
              component.content.level === 2 && "text-3xl",
              component.content.level === 3 && "text-2xl",
              component.content.level === 4 && "text-xl",
              component.content.level === 5 && "text-lg",
              component.content.level === 6 && "text-base",
            )}
            style={component.style}
          >
            {component.content.text || "Heading"}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p className="text-base text-foreground leading-relaxed" style={component.style}>
            {component.content.text || "Paragraph text"}
          </p>
        )

      case "image":
        return (
          <div className="space-y-2" style={component.style}>
            <img
              src={component.content.src || "/placeholder.svg?height=300&width=500"}
              alt={component.content.alt || "Image"}
              className="rounded-lg max-w-full h-auto"
              style={{
                width: component.content.width || "100%",
                height: component.content.height || "auto",
                objectFit: component.content.objectFit || "cover",
                borderRadius: component.content.borderRadius || "8px",
              }}
            />
            {component.content.caption && (
              <p className="text-sm text-muted-foreground text-center italic">{component.content.caption}</p>
            )}
          </div>
        )

      case "button":
        return (
          <Button
            variant={component.content.variant || "default"}
            size={component.content.size || "default"}
            style={component.style}
            className="inline-flex items-center gap-2"
          >
            {component.content.icon && <span>{component.content.icon}</span>}
            {component.content.text || "Button"}
          </Button>
        )

      case "card":
        return (
          <Card className="w-full" style={component.style}>
            {component.content.imageUrl && component.content.imagePosition === "top" && (
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={component.content.imageUrl || "/placeholder.svg"}
                  alt={component.content.title || "Card image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{component.content.title || "Card Title"}</CardTitle>
              {component.content.description && <CardDescription>{component.content.description}</CardDescription>}
            </CardHeader>
            {component.content.buttons && component.content.buttons.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {component.content.buttons.map((button: any, index: number) => (
                    <Button key={index} variant={button.variant || "default"}>
                      {button.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )

      case "grid":
        return (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${component.content.columns || 3}, 1fr)`,
              gap: component.content.gap || "1.5rem",
              ...component.style,
            }}
          >
            {(component.content.items || []).map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.content?.title || `Item ${index + 1}`}</CardTitle>
                  {item.content?.description && <CardDescription>{item.content.description}</CardDescription>}
                </CardHeader>
              </Card>
            ))}
          </div>
        )

      case "banner":
        return (
          <div
            className="relative overflow-hidden rounded-xl p-8 text-center"
            style={{
              background: component.content.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: component.content.textColor || "white",
              backgroundImage: component.content.backgroundImage
                ? `url(${component.content.backgroundImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              ...component.style,
            }}
          >
            <div className="relative z-10">
              {component.content.subtitle && <p className="text-sm opacity-90 mb-2">{component.content.subtitle}</p>}
              <h2 className="text-2xl font-bold mb-4">{component.content.title || "Banner Title"}</h2>
              {component.content.description && (
                <p className="text-lg opacity-90 mb-6">{component.content.description}</p>
              )}
              {component.content.buttons && component.content.buttons.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {component.content.buttons.map((button: any, index: number) => (
                    <Button key={index} variant={button.variant || "secondary"}>
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case "hero":
        return (
          <div
            className="relative overflow-hidden rounded-xl py-20 px-8"
            style={{
              background: component.content.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundImage: component.content.backgroundImage
                ? `url(${component.content.backgroundImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              textAlign: component.content.textAlign || "center",
              ...component.style,
            }}
          >
            <div className="relative z-10 max-w-4xl mx-auto text-white">
              {component.content.subtitle && <p className="text-lg opacity-90 mb-4">{component.content.subtitle}</p>}
              <h1 className="text-5xl font-bold mb-6">{component.content.title || "Hero Title"}</h1>
              {component.content.description && (
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">{component.content.description}</p>
              )}
              {component.content.buttons && component.content.buttons.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {component.content.buttons.map((button: any, index: number) => (
                    <Button key={index} variant={button.variant || "secondary"} size="lg">
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case "table":
        return (
          <div className="rounded-md border" style={component.style}>
            <Table>
              <TableHeader>
                <TableRow>
                  {(component.content.headers || []).map((header: string, index: number) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(component.content.rows || []).map((row: string[], rowIndex: number) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )

      case "divider":
        return (
          <Separator
            className="my-4"
            style={{
              backgroundColor: component.content.color || "#e5e7eb",
              height: component.content.thickness || "1px",
              margin: component.content.margin || "2rem 0",
              ...component.style,
            }}
          />
        )

      case "list":
        return (
          <ul className="list-disc list-inside space-y-2" style={component.style}>
            {(component.content.items || []).map((item: string, index: number) => (
              <li key={index} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>
        )

      case "orderedList":
        return (
          <ol
            className="list-decimal list-inside space-y-2"
            style={{ ...component.style }}
            start={component.content.start || 1}
          >
            {(component.content.items || []).map((item: string, index: number) => (
              <li key={index} className="text-foreground">
                {item}
              </li>
            ))}
          </ol>
        )

      case "taskList":
        return (
          <div className="space-y-3" style={component.style}>
            {(component.content.items || []).map((item: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <Checkbox checked={item.checked} />
                <span className={cn("text-foreground", item.checked && "line-through text-muted-foreground")}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )

      case "blockquote":
        return (
          <blockquote className="border-l-4 border-primary pl-6 py-2 italic" style={component.style}>
            <p className="text-lg text-foreground mb-2">"{component.content.text}"</p>
            {component.content.author && (
              <cite className="text-sm text-muted-foreground">— {component.content.author}</cite>
            )}
          </blockquote>
        )

      case "alert":
        const alertIcons = {
          info: Info,
          warning: AlertTriangle,
          error: XCircle,
          success: CheckCircle,
        }
        const AlertIcon = alertIcons[component.content.type as keyof typeof alertIcons] || Info

        return (
          <Alert style={component.style}>
            <AlertIcon className="h-4 w-4" />
            {component.content.title && <AlertTitle>{component.content.title}</AlertTitle>}
            <AlertDescription>{component.content.text}</AlertDescription>
          </Alert>
        )

      case "code":
        return (
          <div className="relative" style={component.style}>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{component.content.code || "// Your code here"}</code>
            </pre>
            {component.content.language && (
              <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                {component.content.language}
              </Badge>
            )}
          </div>
        )

      case "spacer":
        return (
          <div
            className="w-full bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded flex items-center justify-center"
            style={{
              height: component.content.height || "40px",
              ...component.style,
            }}
          >
            <span className="text-xs text-muted-foreground">Spacer ({component.content.height || "40px"})</span>
          </div>
        )

      case "columns":
        return (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns:
                component.content.columnRatio === "1:2"
                  ? "1fr 2fr"
                  : component.content.columnRatio === "2:1"
                    ? "2fr 1fr"
                    : "1fr 1fr",
              gap: component.content.gap || "2rem",
              ...component.style,
            }}
          >
            <div className="space-y-4">
              <p className="text-foreground">{component.content.column1Text || "Column 1 content"}</p>
            </div>
            <div className="space-y-4">
              <p className="text-foreground">{component.content.column2Text || "Column 2 content"}</p>
            </div>
          </div>
        )

      case "mermaid":
        return (
          <div className="border rounded-lg p-4 bg-muted/50" style={component.style}>
            <div className="flex items-center gap-2 mb-3">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Mermaid Diagram</span>
            </div>
            <pre className="text-sm bg-background p-3 rounded border">
              <code>{component.content.code || "graph TD;\n    A[Start] --> B[Process];"}</code>
            </pre>
          </div>
        )

      case "chart":
        return (
          <div className="border rounded-lg p-6 bg-card" style={component.style}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Chart Component</h3>
            </div>
            <div className="h-64 bg-muted/50 rounded flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization would appear here</p>
            </div>
          </div>
        )

      case "gallery":
        return (
          <div className="space-y-4" style={component.style}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(component.content.images || []).map((image: any, index: number) => (
                <div key={index} className="space-y-2">
                  <img
                    src={image.src || "/placeholder.svg?height=300&width=400"}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {image.caption && <p className="text-sm text-muted-foreground text-center">{image.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )

      case "testimonial":
        return (
          <Card className="max-w-2xl mx-auto" style={component.style}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <img
                  src={component.content.avatarUrl || "/placeholder.svg?height=60&width=60"}
                  alt={component.content.author || "Author"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">
                    "{component.content.quote || "This is a testimonial quote."}"
                  </blockquote>
                  <div>
                    <p className="font-semibold">{component.content.author || "Author Name"}</p>
                    <p className="text-sm text-muted-foreground">{component.content.title || "Author Title"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "pricing":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={component.style}>
            {(component.content.plans || []).map((plan: any, index: number) => (
              <Card key={index} className={cn("relative", plan.popular && "border-primary shadow-lg")}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {(plan.features || []).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.buttonText || "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "htmlBlock":
        return (
          <div className="relative" style={component.style}>
            <div className="flex items-center gap-2 mb-3">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                {component.content.name || "HTML Block"}
              </span>
              {component.content.category === "tailgrids" && (
                <Badge variant="secondary" className="text-xs">
                  TailGrids
                </Badge>
              )}
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: component.content.htmlContent || "<p>No HTML content</p>",
              }}
            />
          </div>
        )

      default:
        return (
          <div className="p-4 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground text-center">Unknown component type: {component.type}</p>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative transition-all duration-200",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        isDragging && "opacity-50 scale-105 rotate-1 shadow-2xl z-50",
      )}
    >
      {/* Component Controls */}
      {isSelected && (
        <div className="absolute -top-10 left-0 flex items-center gap-1 bg-background border border-border rounded-md shadow-lg px-2 py-1 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleEdit}>
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleVisibility}>
            {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleDuplicate}>
            <Copy className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Component Content */}
      <div className={cn("transition-all duration-200", !isVisible && "opacity-50")}>{renderComponent()}</div>
    </div>
  )
}
