"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import type {
  MarkdownComponent,
  ComponentStyle,
  ImageContent,
  CardContent as CardContentType,
  GridContent,
  TableContent,
  InfographicContent,
} from "./types"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button as UIButton } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ExternalLink,
  Edit3,
  Star,
  Users,
  Briefcase,
  Globe,
  Check,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  Award,
  Target,
  Sparkles,
  Camera,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Search,
  Filter,
  Download,
  Upload,
  Share,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Settings,
  MoreHorizontal,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// Helper to apply styles with enhanced support
const applyStyles = (style?: ComponentStyle): React.CSSProperties => {
  if (!style) return {}
  const cssProps: React.CSSProperties = {}

  // Text styles
  if (style.color) cssProps.color = style.color
  if (style.backgroundColor) cssProps.backgroundColor = style.backgroundColor
  if (style.fontSize) cssProps.fontSize = style.fontSize
  if (style.fontWeight) cssProps.fontWeight = style.fontWeight as React.CSSProperties["fontWeight"]
  if (style.fontStyle) cssProps.fontStyle = style.fontStyle
  if (style.textDecoration) cssProps.textDecoration = style.textDecoration
  if (style.textAlign) cssProps.textAlign = style.textAlign as React.CSSProperties["textAlign"]

  // Layout styles
  if (style.width) cssProps.width = style.width
  if (style.height) cssProps.height = style.height
  if (style.padding) cssProps.padding = style.padding
  if (style.margin) cssProps.margin = style.margin
  if (style.display) cssProps.display = style.display
  if (style.flexDirection) cssProps.flexDirection = style.flexDirection
  if (style.justifyContent) cssProps.justifyContent = style.justifyContent
  if (style.alignItems) cssProps.alignItems = style.alignItems
  if (style.gap) cssProps.gap = style.gap

  // Grid styles
  if (style.gridTemplateColumns) cssProps.gridTemplateColumns = style.gridTemplateColumns
  if (style.gridTemplateRows) cssProps.gridTemplateRows = style.gridTemplateRows
  if (style.gridGap) cssProps.gridGap = style.gridGap
  if (style.gridColumn) cssProps.gridColumn = style.gridColumn
  if (style.gridRow) cssProps.gridRow = style.gridRow

  // Visual styles
  if (style.border) cssProps.border = style.border
  if (style.borderRadius) cssProps.borderRadius = style.borderRadius
  if (style.boxShadow) cssProps.boxShadow = style.boxShadow
  if (style.opacity !== undefined) cssProps.opacity = style.opacity
  if (style.transform) cssProps.transform = style.transform
  if (style.transition) cssProps.transition = style.transition

  // Background styles
  if (style.backgroundImage) cssProps.backgroundImage = style.backgroundImage
  if (style.backgroundSize) cssProps.backgroundSize = style.backgroundSize
  if (style.backgroundPosition) cssProps.backgroundPosition = style.backgroundPosition
  if (style.backgroundRepeat) cssProps.backgroundRepeat = style.backgroundRepeat
  if (style.gradient) {
    cssProps.background = style.gradient
  }

  // Animation styles
  if (style.animation) cssProps.animation = style.animation
  if (style.animationDuration) cssProps.animationDuration = style.animationDuration
  if (style.animationDelay) cssProps.animationDelay = style.animationDelay

  return cssProps
}

// Helper for hover classes with enhanced support
const getHoverClasses = (style?: ComponentStyle): string => {
  if (!style?.hover) return ""
  let classes = "transition-all duration-300 ease-in-out "

  if (style.hover.backgroundColor) classes += `hover:bg-[${style.hover.backgroundColor}] `
  if (style.hover.color) classes += `hover:text-[${style.hover.color}] `
  if (style.hover.boxShadow) classes += `hover:shadow-[${style.hover.boxShadow.replace(/ /g, "_")}] `
  if (style.hover.borderColor) classes += `hover:border-[${style.hover.borderColor}] `
  if (style.hover.transform) {
    if (style.hover.transform.includes("scale")) {
      const scaleMatch = style.hover.transform.match(/scale$$([^)]+)$$/)
      if (scaleMatch) classes += `hover:scale-[${scaleMatch[1]}] `
    }
    if (style.hover.transform.includes("rotate")) {
      const rotateMatch = style.hover.transform.match(/rotate$$([^)]+)$$/)
      if (rotateMatch) classes += `hover:rotate-[${rotateMatch[1]}] `
    }
    if (style.hover.transform.includes("translate")) {
      classes += `hover:translate-x-1 `
    }
  }

  return classes.trim()
}

// Enhanced icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  briefcase: Briefcase,
  globe: Globe,
  check: Check,
  star: Star,
  trending: TrendingUp,
  chart: BarChart3,
  pie: PieChart,
  activity: Activity,
  zap: Zap,
  heart: Heart,
  award: Award,
  target: Target,
  sparkles: Sparkles,
  camera: Camera,
  play: Play,
  pause: Pause,
  forward: SkipForward,
  back: SkipBack,
  volume: Volume2,
  search: Search,
  filter: Filter,
  download: Download,
  upload: Upload,
  share: Share,
  copy: Copy,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  unlock: Unlock,
  settings: Settings,
  more: MoreHorizontal,
}

interface ComponentRendererProps {
  component: MarkdownComponent
  isSelected: boolean
  updateComponentContent: (id: string, contentUpdates: any) => void
}

export function ComponentRenderer({ component, isSelected, updateComponentContent }: ComponentRendererProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<string>("")
  const [isHovered, setIsHovered] = useState(false)
  const editRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Handle click outside to save edits
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        if (editingField) {
          handleSaveEdit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [editingField, tempValue])

  const handleStartEdit = (field: string, currentValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingField(field)
    setTempValue(currentValue || "")
  }

  const handleSaveEdit = () => {
    if (editingField) {
      const keys = editingField.split(".")
      const newContent = { ...component.content }

      if (keys.length === 1) {
        newContent[keys[0]] = tempValue
      } else if (keys.length === 2) {
        if (!newContent[keys[0]]) newContent[keys[0]] = {}
        newContent[keys[0]][keys[1]] = tempValue
      }

      updateComponentContent(component.id, newContent)
      setEditingField(null)
      setTempValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      setEditingField(null)
      setTempValue("")
    }
  }

  const renderEditableText = (
    field: string,
    value: string,
    placeholder = "Click to edit",
    multiline = false,
    className = "",
  ) => {
    const isEditing = editingField === field

    if (isEditing) {
      if (multiline) {
        return (
          <textarea
            ref={editRef as React.RefObject<HTMLTextAreaElement>}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className={cn(
              "w-full bg-white border-2 border-blue-500 rounded-md px-2 py-1 resize-none focus:outline-none",
              className,
            )}
            autoFocus
            rows={3}
          />
        )
      } else {
        return (
          <input
            ref={editRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSaveEdit}
            className={cn(
              "w-full bg-white border-2 border-blue-500 rounded-md px-2 py-1 focus:outline-none",
              className,
            )}
            autoFocus
          />
        )
      }
    }

    return (
      <span
        className={cn(
          "cursor-pointer hover:bg-blue-50 rounded-md px-1 py-0.5 transition-colors min-h-[1.5rem] inline-block",
          !value && "text-gray-400 italic",
          className,
        )}
        onClick={(e) => handleStartEdit(field, value, e)}
      >
        {value || placeholder}
      </span>
    )
  }

  const baseClasses = cn(
    "relative group transition-all duration-200",
    isSelected && "ring-2 ring-blue-500 ring-offset-2 ring-offset-white",
    isHovered && !editingField && "ring-1 ring-slate-300 ring-offset-1",
    getHoverClasses(component.style),
    component.style?.className,
  )

  const style = applyStyles(component.style)

  const renderComponent = (): JSX.Element => {
    switch (component.type) {
      case "heading": {
        const HeadingTag = `h${component.content.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <HeadingTag className="font-bold">
              {renderEditableText("text", component.content.text, "Heading")}
            </HeadingTag>
          </div>
        )
      }

      case "paragraph":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p className="leading-relaxed">
              {renderEditableText("text", component.content.text, "Click to edit paragraph", true)}
            </p>
          </div>
        )

      case "image":
        const imageContent = component.content as ImageContent
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="space-y-2">
              <img
                src={imageContent.src || "/placeholder.svg?height=300&width=500"}
                alt={imageContent.alt || "Image"}
                className={cn(
                  "transition-all duration-300 hover:scale-105 rounded-lg",
                  imageContent.objectFit && `object-${imageContent.objectFit}`,
                )}
                style={{
                  width: imageContent.width || "100%",
                  height: imageContent.height || "auto",
                  borderRadius: imageContent.borderRadius || "8px",
                }}
              />
              {renderEditableText(
                "caption",
                imageContent.caption,
                "Add caption",
                false,
                "text-sm text-gray-600 text-center",
              )}
            </div>
          </div>
        )

      case "button":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <UIButton
              variant={(component.content.variant as any) || "default"}
              size={(component.content.size as any) || "default"}
              className="transition-all duration-200 hover:scale-105"
            >
              {renderEditableText("text", component.content.text, "Button Text")}
              {component.content.link && <ExternalLink className="w-4 h-4 ml-2" />}
            </UIButton>
          </div>
        )

      case "card":
        const cardContent = component.content as CardContentType
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Card className="transition-all duration-300 hover:shadow-lg border-0 shadow-md">
              {cardContent.imageUrl && (
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={cardContent.imageUrl || "/placeholder.svg"}
                    alt=""
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {renderEditableText("title", cardContent.title, "Card Title")}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {renderEditableText("description", cardContent.description, "Card description", true)}
                </CardDescription>
              </CardHeader>
              {cardContent.buttons && cardContent.buttons.length > 0 && (
                <CardContent className="pt-0">
                  <div className="flex gap-2 flex-wrap">
                    {cardContent.buttons.map((button, index) => (
                      <UIButton
                        key={index}
                        variant={button.variant as any}
                        size="sm"
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {button.icon && iconMap[button.icon] && (
                          <span className="mr-2">
                            {React.createElement(iconMap[button.icon], { className: "w-4 h-4" })}
                          </span>
                        )}
                        {renderEditableText(`buttons.${index}.text`, button.text, "Button")}
                        {button.link && <ExternalLink className="w-4 h-4 ml-2" />}
                      </UIButton>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )

      case "grid":
        const gridContent = component.content as GridContent
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="gap-6"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridContent.columns || 3}, 1fr)`,
                gap: gridContent.gap || "1.5rem",
              }}
            >
              {gridContent.items?.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {item.type === "card" && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {renderEditableText(`items.${index}.content.title`, item.content.title, "Grid Item Title")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {renderEditableText(
                          `items.${index}.content.description`,
                          item.content.description,
                          "Grid item description",
                          true,
                        )}
                      </p>
                    </div>
                  )}
                  {item.type === "text" && (
                    <p className="text-gray-700">
                      {renderEditableText(`items.${index}.content.text`, item.content.text, "Grid text content", true)}
                    </p>
                  )}
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No grid items yet. Add items to populate this grid.</p>
                </div>
              )}
            </div>
          </div>
        )

      case "banner":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative overflow-hidden rounded-xl p-8 text-center"
              style={{
                background: component.content.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: component.content.textColor || "white",
              }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">
                  {renderEditableText("title", component.content.title, "Banner Title")}
                </h2>
                <p className="text-lg mb-4 opacity-90">
                  {renderEditableText("subtitle", component.content.subtitle, "Banner subtitle")}
                </p>
                <p className="mb-6">
                  {renderEditableText("description", component.content.description, "Banner description", true)}
                </p>
                {component.content.buttons && component.content.buttons.length > 0 && (
                  <div className="flex gap-4 justify-center">
                    {component.content.buttons.map((button: any, index: number) => (
                      <UIButton
                        key={index}
                        variant={button.variant as any}
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {renderEditableText(`buttons.${index}.text`, button.text, "Button")}
                      </UIButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "hero":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative overflow-hidden rounded-2xl py-16 px-8"
              style={{
                background: component.content.backgroundColor || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                textAlign: component.content.textAlign || "center",
              }}
            >
              <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  {renderEditableText("title", component.content.title, "Hero Title")}
                </h1>
                <p className="text-xl text-white/90 mb-4">
                  {renderEditableText("subtitle", component.content.subtitle, "Hero subtitle")}
                </p>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                  {renderEditableText("description", component.content.description, "Hero description", true)}
                </p>
                {component.content.buttons && component.content.buttons.length > 0 && (
                  <div className="flex gap-4 justify-center flex-wrap">
                    {component.content.buttons.map((button: any, index: number) => (
                      <UIButton
                        key={index}
                        variant={button.variant as any}
                        size="lg"
                        className="transition-all duration-200 hover:scale-105"
                      >
                        {renderEditableText(`buttons.${index}.text`, button.text, "Button")}
                      </UIButton>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "table":
        const tableContent = component.content as TableContent
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden rounded-lg bg-white shadow border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableContent.headers?.map((header, index) => (
                      <TableHead key={index} className="font-semibold">
                        {renderEditableText(`headers.${index}`, header, `Header ${index + 1}`)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableContent.rows?.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {renderEditableText(
                            `rows.${rowIndex}.${cellIndex}`,
                            cell,
                            `Cell ${rowIndex + 1}-${cellIndex + 1}`,
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )

      case "list":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ul className="list-disc list-inside space-y-2">
              {component.content.items?.map((item: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {renderEditableText(`items.${index}`, item, `List item ${index + 1}`)}
                </li>
              )) || <li className="text-gray-400 italic">Click to add list items</li>}
            </ul>
          </div>
        )

      case "orderedList":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ol className="list-decimal list-inside space-y-2" start={component.content.start || 1}>
              {component.content.items?.map((item: string, index: number) => (
                <li key={index} className="text-gray-700">
                  {renderEditableText(`items.${index}`, item, `List item ${index + 1}`)}
                </li>
              )) || <li className="text-gray-400 italic">Click to add list items</li>}
            </ol>
          </div>
        )

      case "taskList":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="space-y-2">
              {component.content.items?.map((item: { text: string; checked: boolean }, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => {
                      const newItems = [...component.content.items]
                      newItems[index] = { ...item, checked: e.target.checked }
                      updateComponentContent(component.id, { items: newItems })
                    }}
                    className="rounded"
                  />
                  <span className={item.checked ? "line-through text-gray-500" : "text-gray-700"}>
                    {renderEditableText(`items.${index}.text`, item.text, `Task ${index + 1}`)}
                  </span>
                </div>
              )) || <div className="text-gray-400 italic">Click to add tasks</div>}
            </div>
          </div>
        )

      case "blockquote":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              {renderEditableText("text", component.content.text, "Quote text", true)}
              {component.content.author && (
                <footer className="text-sm text-gray-500 mt-2">
                  — {renderEditableText("author", component.content.author, "Author name")}
                </footer>
              )}
            </blockquote>
          </div>
        )

      case "alert":
        const alertIcons = {
          info: Info,
          warning: AlertTriangle,
          success: CheckCircle,
          error: XCircle,
        }
        const AlertIcon = alertIcons[component.content.type as keyof typeof alertIcons] || Info

        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Alert>
              <AlertIcon className="h-4 w-4" />
              <AlertTitle>Alert</AlertTitle>
              <AlertDescription>
                {renderEditableText("text", component.content.text, "Alert message", true)}
              </AlertDescription>
            </Alert>
          </div>
        )

      case "code":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
                <code>
                  {renderEditableText("code", component.content.code, "// Your code here", true, "font-mono")}
                </code>
              </pre>
              {component.content.language && (
                <div className="text-xs text-gray-500 mt-2">Language: {component.content.language}</div>
              )}
            </div>
          </div>
        )

      case "divider":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <hr className="border-gray-300 my-4" />
          </div>
        )

      case "spacer":
        return (
          <div
            className={baseClasses}
            style={{ ...style, height: component.content.height || "40px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm h-full">
              Spacer ({component.content.height || "40px"})
            </div>
          </div>
        )

      case "columns":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded">
                {renderEditableText("column1Text", component.content.column1Text, "Column 1 content", true)}
              </div>
              <div className="p-4 border border-gray-200 rounded">
                {renderEditableText("column2Text", component.content.column2Text, "Column 2 content", true)}
              </div>
            </div>
          </div>
        )

      case "mermaid":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="bg-gray-100 p-4 rounded-md border">
              <div className="text-center text-gray-600 mb-2">Mermaid Diagram</div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {renderEditableText(
                  "code",
                  component.content.code,
                  "graph TD;\n    A[Start] --> B[Process];",
                  true,
                  "font-mono",
                )}
              </pre>
            </div>
          </div>
        )

      case "htmlBlock":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  component.content.htmlContent ||
                  "<div class='p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50'><h3 class='text-lg font-semibold text-gray-700 mb-2'>Custom HTML Block</h3><p class='text-gray-500'>Click to edit HTML content</p></div>",
              }}
              className={cn("transition-all duration-200", component.content.responsive && "w-full")}
            />
            {component.content.name && (
              <div className="text-xs text-gray-500 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {component.content.name}
              </div>
            )}
          </div>
        )

      case "infographic":
        const infographicContent = component.content as InfographicContent
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {renderEditableText("title", infographicContent.title, "Infographic Title")}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {infographicContent.items?.map((item, index) => {
                const IconComponent = item.icon && iconMap[item.icon] ? iconMap[item.icon] : Target
                return (
                  <div key={item.id || index} className="text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: item.color || "#3B82F6" }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {renderEditableText(`items.${index}.value`, item.value?.toString() || "", "0")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {renderEditableText(`items.${index}.title`, item.title, "Stat title")}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case "gallery":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {component.content.images?.map((image: any, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src || "/placeholder.svg?height=300&width=400"}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                      {renderEditableText(`images.${index}.caption`, image.caption, "Image caption")}
                    </div>
                  )}
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No images in gallery yet.</p>
                </div>
              )}
            </div>
          </div>
        )

      case "testimonial":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-5 h-5",
                      i < (component.content.rating || 5) ? "text-yellow-400 fill-current" : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-4 italic">
                "{renderEditableText("quote", component.content.quote, "Testimonial quote", true)}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={component.content.avatar || "/placeholder.svg?height=50&width=50"}
                  alt={component.content.author || "Author"}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {renderEditableText("author", component.content.author, "Author Name")}
                  </div>
                  <div className="text-sm text-gray-600">
                    {renderEditableText("position", component.content.position, "Position, Company")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "pricing":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {component.content.plans?.map((plan: any, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "bg-white rounded-lg p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105",
                    plan.popular ? "border-blue-500 relative" : "border-gray-200",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {renderEditableText(`plans.${index}.name`, plan.name, "Plan Name")}
                    </h3>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {renderEditableText(`plans.${index}.price`, plan.price, "$0")}
                    </div>
                    <div className="text-gray-600 mb-6">
                      /{renderEditableText(`plans.${index}.period`, plan.period, "month")}
                    </div>
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.features?.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-gray-700">
                            {renderEditableText(`plans.${index}.features.${featureIndex}`, feature, "Feature")}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <UIButton className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {renderEditableText(`plans.${index}.buttonText`, plan.buttonText, "Get Started")}
                    </UIButton>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No pricing plans yet.</p>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div className={baseClasses} style={style}>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
              </h3>
              <p className="text-gray-500">Component type: {component.type}</p>
              <p className="text-xs text-gray-400 mt-2">Click to edit this component</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative">
      {renderComponent()}
      {(isHovered || isSelected) && !editingField && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          <button
            className="bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
            title="Edit component"
          >
            <Edit3 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
