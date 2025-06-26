"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { MarkdownComponent, ComponentStyle, ImageContent, GridContent, TableContent, ChartContent } from "./types"
import { Button as UIButton } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
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
  Plus,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// Simple Chart Component (since we can't use external charting libraries in this environment)
function SimpleChart({ data, type, title }: { data: ChartContent; type: string; title?: string }) {
  const maxValue = Math.max(...data.data.datasets.flatMap((d) => d.data))

  if (type === "bar") {
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
        <div className="space-y-3">
          {data.data.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-muted-foreground">{label}</div>
              <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                {data.data.datasets.map((dataset, datasetIndex) => (
                  <div
                    key={datasetIndex}
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(dataset.data[index] / maxValue) * 100}%`,
                      backgroundColor: Array.isArray(dataset.backgroundColor)
                        ? dataset.backgroundColor[index] || dataset.backgroundColor[0] || "#3b82f6"
                        : dataset.backgroundColor || "#3b82f6",
                    }}
                  />
                ))}
              </div>
              <div className="w-12 text-sm text-foreground text-right">{data.data.datasets[0]?.data[index] || 0}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "pie") {
    const total = data.data.datasets[0]?.data.reduce((sum, val) => sum + val, 0) || 1
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
        <div className="flex items-center justify-center">
          <div className="w-48 h-48 rounded-full relative overflow-hidden border-4 border-muted">
            {data.data.datasets[0]?.data.map((value, index) => {
              const percentage = (value / total) * 100
              const color = Array.isArray(data.data.datasets[0].backgroundColor)
                ? data.data.datasets[0].backgroundColor[index] || "#3b82f6"
                : data.data.datasets[0].backgroundColor || "#3b82f6"

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white"
                  style={{
                    background: `conic-gradient(${color} 0deg ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg 360deg)`,
                    transform: `rotate(${(data.data.datasets[0]?.data.slice(0, index).reduce((sum, val) => sum + val, 0) / total) * 360}deg)`,
                  }}
                >
                  {percentage > 10 && `${percentage.toFixed(1)}%`}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.data.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: Array.isArray(data.data.datasets[0]?.backgroundColor)
                    ? data.data.datasets[0].backgroundColor[index] || "#3b82f6"
                    : data.data.datasets[0]?.backgroundColor || "#3b82f6",
                }}
              />
              <span className="text-sm text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
      <div className="text-center py-8 text-muted-foreground">
        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>Chart type "{type}" not implemented</p>
      </div>
    </div>
  )
}

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
      } else if (keys.length === 3) {
        if (!newContent[keys[0]]) newContent[keys[0]] = {}
        if (!newContent[keys[0]][keys[1]]) newContent[keys[0]][keys[1]] = {}
        newContent[keys[0]][keys[1]][keys[2]] = tempValue
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
              "w-full bg-background border-2 border-primary rounded-md px-2 py-1 resize-none focus:outline-none text-foreground",
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
              "w-full bg-background border-2 border-primary rounded-md px-2 py-1 focus:outline-none text-foreground",
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
          "cursor-pointer hover:bg-primary/10 rounded-md px-1 py-0.5 transition-colors min-h-[1.5rem] inline-block",
          !value && "text-muted-foreground italic",
          className,
        )}
        onClick={(e) => handleStartEdit(field, value, e)}
      >
        {value || placeholder}
      </span>
    )
  }

  // Helper functions for editable arrays
  const addTableRow = () => {
    const newContent = { ...component.content }
    if (!newContent.rows) newContent.rows = []
    const newRow = new Array(newContent.headers?.length || 3).fill("")
    newContent.rows.push(newRow)
    updateComponentContent(component.id, newContent)
  }

  const removeTableRow = (index: number) => {
    const newContent = { ...component.content }
    if (newContent.rows) {
      newContent.rows.splice(index, 1)
      updateComponentContent(component.id, newContent)
    }
  }

  const addTableColumn = () => {
    const newContent = { ...component.content }
    if (!newContent.headers) newContent.headers = []
    if (!newContent.rows) newContent.rows = []

    newContent.headers.push(`Column ${newContent.headers.length + 1}`)
    newContent.rows.forEach((row) => row.push(""))
    updateComponentContent(component.id, newContent)
  }

  const removeTableColumn = (index: number) => {
    const newContent = { ...component.content }
    if (newContent.headers) {
      newContent.headers.splice(index, 1)
    }
    if (newContent.rows) {
      newContent.rows.forEach((row) => row.splice(index, 1))
    }
    updateComponentContent(component.id, newContent)
  }

  const addListItem = () => {
    const newContent = { ...component.content }
    if (!newContent.items) newContent.items = []
    newContent.items.push("New item")
    updateComponentContent(component.id, newContent)
  }

  const removeListItem = (index: number) => {
    const newContent = { ...component.content }
    if (newContent.items) {
      newContent.items.splice(index, 1)
      updateComponentContent(component.id, newContent)
    }
  }

  const addGridItem = () => {
    const newContent = { ...component.content }
    if (!newContent.items) newContent.items = []
    newContent.items.push({
      id: `item-${Date.now()}`,
      type: "card",
      content: { title: "New Item", description: "Description" },
    })
    updateComponentContent(component.id, newContent)
  }

  const removeGridItem = (index: number) => {
    const newContent = { ...component.content }
    if (newContent.items) {
      newContent.items.splice(index, 1)
      updateComponentContent(component.id, newContent)
    }
  }

  const baseClasses = cn(
    "relative group transition-all duration-200 mb-6",
    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
    isHovered && !editingField && "ring-1 ring-border ring-offset-1",
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
            <HeadingTag className="font-bold text-foreground">
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
            <p className="leading-relaxed text-foreground">
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
              <div className="relative group">
                <img
                  src={imageContent.src || "/placeholder.svg?height=300&width=500"}
                  alt={imageContent.alt || "Image"}
                  className={cn(
                    "transition-all duration-300 hover:scale-105 rounded-lg w-full",
                    imageContent.objectFit && `object-${imageContent.objectFit}`,
                  )}
                  style={{
                    width: imageContent.width || "100%",
                    height: imageContent.height || "auto",
                    borderRadius: imageContent.borderRadius || "8px",
                  }}
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <UIButton
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            const result = e.target?.result as string
                            updateComponentContent(component.id, { src: result })
                          }
                          reader.readAsDataURL(file)
                        }
                      }
                      input.click()
                    }}
                  >
                    <Upload className="w-4 h-4" />
                  </UIButton>
                </div>
              </div>
              {renderEditableText(
                "caption",
                imageContent.caption,
                "Add caption",
                false,
                "text-sm text-muted-foreground text-center",
              )}
            </div>
          </div>
        )

      case "chart":
        const chartContent = component.content as ChartContent
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <SimpleChart
              data={chartContent}
              type={chartContent.type}
              title={renderEditableText("title", chartContent.title || "", "Chart Title")}
            />
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Chart Data</h4>
              <div className="space-y-2">
                {chartContent.data?.labels?.map((label, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={label}
                      onChange={(e) => {
                        const newContent = { ...component.content }
                        newContent.data.labels[index] = e.target.value
                        updateComponentContent(component.id, newContent)
                      }}
                      className="flex-1"
                      placeholder="Label"
                    />
                    <Input
                      type="number"
                      value={chartContent.data.datasets[0]?.data[index] || 0}
                      onChange={(e) => {
                        const newContent = { ...component.content }
                        if (!newContent.data.datasets[0]) {
                          newContent.data.datasets[0] = { label: "Dataset 1", data: [] }
                        }
                        newContent.data.datasets[0].data[index] = Number(e.target.value)
                        updateComponentContent(component.id, newContent)
                      }}
                      className="w-20"
                      placeholder="Value"
                    />
                    <UIButton
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newContent = { ...component.content }
                        newContent.data.labels.splice(index, 1)
                        newContent.data.datasets.forEach((dataset) => {
                          dataset.data.splice(index, 1)
                        })
                        updateComponentContent(component.id, newContent)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </UIButton>
                  </div>
                ))}
                <UIButton
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newContent = { ...component.content }
                    if (!newContent.data.labels) newContent.data.labels = []
                    if (!newContent.data.datasets[0]) {
                      newContent.data.datasets[0] = { label: "Dataset 1", data: [] }
                    }
                    newContent.data.labels.push("New Label")
                    newContent.data.datasets[0].data.push(0)
                    updateComponentContent(component.id, newContent)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Data Point
                </UIButton>
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
            <div className="overflow-hidden rounded-lg bg-card shadow border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableContent.headers?.map((header, index) => (
                      <TableHead key={index} className="font-semibold relative group">
                        {renderEditableText(`headers.${index}`, header, `Header ${index + 1}`)}
                        <UIButton
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={() => removeTableColumn(index)}
                        >
                          <X className="w-3 h-3" />
                        </UIButton>
                      </TableHead>
                    ))}
                    <TableHead className="w-12">
                      <UIButton size="sm" variant="ghost" onClick={addTableColumn}>
                        <Plus className="w-4 h-4" />
                      </UIButton>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableContent.rows?.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-muted/50 group">
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {renderEditableText(
                            `rows.${rowIndex}.${cellIndex}`,
                            cell,
                            `Cell ${rowIndex + 1}-${cellIndex + 1}`,
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        <UIButton
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                          onClick={() => removeTableRow(rowIndex)}
                        >
                          <X className="w-3 h-3" />
                        </UIButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={(tableContent.headers?.length || 0) + 1}>
                      <UIButton size="sm" variant="ghost" onClick={addTableRow} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Row
                      </UIButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
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
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Columns:</label>
                <Input
                  type="number"
                  min="1"
                  max="6"
                  value={gridContent.columns || 3}
                  onChange={(e) => updateComponentContent(component.id, { columns: Number(e.target.value) })}
                  className="w-20"
                />
              </div>
              <UIButton size="sm" variant="outline" onClick={addGridItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </UIButton>
            </div>
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
                  className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative group"
                >
                  <UIButton
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => removeGridItem(index)}
                  >
                    <X className="w-3 h-3" />
                  </UIButton>
                  {item.type === "card" && (
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {renderEditableText(`items.${index}.content.title`, item.content.title, "Grid Item Title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
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
                    <p className="text-foreground">
                      {renderEditableText(`items.${index}.content.text`, item.content.text, "Grid text content", true)}
                    </p>
                  )}
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <p>No grid items yet. Add items to populate this grid.</p>
                </div>
              )}
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
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Image Gallery</h3>
              <UIButton
                size="sm"
                variant="outline"
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = "image/*"
                  input.multiple = true
                  input.onchange = (e) => {
                    const files = Array.from((e.target as HTMLInputElement).files || [])
                    files.forEach((file) => {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        const result = e.target?.result as string
                        const newContent = { ...component.content }
                        if (!newContent.images) newContent.images = []
                        newContent.images.push({
                          src: result,
                          alt: file.name,
                          caption: "",
                        })
                        updateComponentContent(component.id, newContent)
                      }
                      reader.readAsDataURL(file)
                    })
                  }
                  input.click()
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Images
              </UIButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {component.content.images?.map((image: any, index: number) => (
                <div key={index} className="relative group">
                  <img
                    src={image.src || "/placeholder.svg?height=300&width=400"}
                    alt={image.alt || `Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                  <UIButton
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => {
                      const newContent = { ...component.content }
                      newContent.images.splice(index, 1)
                      updateComponentContent(component.id, newContent)
                    }}
                  >
                    <X className="w-3 h-3" />
                  </UIButton>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                      {renderEditableText(`images.${index}.caption`, image.caption, "Image caption")}
                    </div>
                  )}
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No images in gallery yet.</p>
                </div>
              )}
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
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pricing Plans</h3>
              <UIButton
                size="sm"
                variant="outline"
                onClick={() => {
                  const newContent = { ...component.content }
                  if (!newContent.plans) newContent.plans = []
                  newContent.plans.push({
                    name: "New Plan",
                    price: "$0",
                    period: "month",
                    features: ["Feature 1", "Feature 2"],
                    buttonText: "Get Started",
                    popular: false,
                  })
                  updateComponentContent(component.id, newContent)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Plan
              </UIButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {component.content.plans?.map((plan: any, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "bg-card rounded-lg p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 relative group",
                    plan.popular ? "border-primary relative" : "border-border",
                  )}
                >
                  <UIButton
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => {
                      const newContent = { ...component.content }
                      newContent.plans.splice(index, 1)
                      updateComponentContent(component.id, newContent)
                    }}
                  >
                    <X className="w-3 h-3" />
                  </UIButton>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {renderEditableText(`plans.${index}.name`, plan.name, "Plan Name")}
                    </h3>
                    <div className="text-4xl font-bold text-foreground mb-1">
                      {renderEditableText(`plans.${index}.price`, plan.price, "$0")}
                    </div>
                    <div className="text-muted-foreground mb-6">
                      /{renderEditableText(`plans.${index}.period`, plan.period, "month")}
                    </div>
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.features?.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center group">
                          <Check className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-foreground flex-1">
                            {renderEditableText(`plans.${index}.features.${featureIndex}`, feature, "Feature")}
                          </span>
                          <UIButton
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 ml-2"
                            onClick={() => {
                              const newContent = { ...component.content }
                              newContent.plans[index].features.splice(featureIndex, 1)
                              updateComponentContent(component.id, newContent)
                            }}
                          >
                            <X className="w-3 h-3" />
                          </UIButton>
                        </li>
                      ))}
                      <li>
                        <UIButton
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newContent = { ...component.content }
                            if (!newContent.plans[index].features) newContent.plans[index].features = []
                            newContent.plans[index].features.push("New Feature")
                            updateComponentContent(component.id, newContent)
                          }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Feature
                        </UIButton>
                      </li>
                    </ul>
                    <UIButton className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {renderEditableText(`plans.${index}.buttonText`, plan.buttonText, "Get Started")}
                    </UIButton>
                  </div>
                </div>
              )) || (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No pricing plans yet.</p>
                </div>
              )}
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
                <li key={index} className="text-foreground flex items-center group">
                  <span className="flex-1">{renderEditableText(`items.${index}`, item, `List item ${index + 1}`)}</span>
                  <UIButton
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 ml-2"
                    onClick={() => removeListItem(index)}
                  >
                    <X className="w-3 h-3" />
                  </UIButton>
                </li>
              )) || <li className="text-muted-foreground italic">Click to add list items</li>}
              <li>
                <UIButton size="sm" variant="ghost" onClick={addListItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </UIButton>
              </li>
            </ul>
          </div>
        )

      // Continue with other component types...
      default:
        return (
          <div className={baseClasses} style={style}>
            <div className="p-6 border-2 border-dashed border-border rounded-xl text-center bg-muted">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
              </h3>
              <p className="text-muted-foreground">Component type: {component.type}</p>
              <p className="text-xs text-muted-foreground mt-2">Click to edit this component</p>
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
            className="bg-primary text-primary-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary/80 hover:scale-110 shadow-lg"
            title="Edit component"
          >
            <Edit3 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
