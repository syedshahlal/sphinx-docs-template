"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { MarkdownComponent, ComponentStyle, ImageContent, GridContent, TableContent, ChartContent } from "./types"
import { Button as UIButton } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Check, BarChart3, Upload, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

// Simple Chart Component (since we can't use external charting libraries in this environment)
function SimpleChart({ data, type, title }: { data: ChartContent; type: string; title?: string }) {
  const datasets = data.data?.datasets?.length
    ? data.data.datasets
    : [
        {
          label: "Dataset 1",
          data: new Array(data.data?.labels?.length || 0).fill(0),
          backgroundColor: "#3b82f6",
        },
      ]

  const maxValue = Math.max(1, ...datasets.flatMap((d) => d.data))

  if (type === "bar") {
    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
        <div className="space-y-3">
          {data.data.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-muted-foreground">{label}</div>
              <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                {datasets.map((dataset, datasetIndex) => (
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
              <div className="w-12 text-sm text-foreground text-right">{datasets[0]?.data[index] || 0}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === "pie") {
    const total = datasets[0]?.data.reduce((sum, val) => sum + val, 0) || 1
    let accumulatedPercentage = 0
    const pieSegments = datasets[0]?.data.map((value) => {
      const percentage = (value / total) * 100
      const segment = { percentage, startAngle: accumulatedPercentage * 3.6 }
      accumulatedPercentage += percentage
      return segment
    })

    return (
      <div className="p-4 bg-card border border-border rounded-lg">
        {title && <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>}
        <div className="flex items-center justify-center">
          <div
            className="w-48 h-48 rounded-full"
            style={{
              background: `conic-gradient(${pieSegments
                .map(
                  (segment, index) =>
                    `${
                      Array.isArray(datasets[0].backgroundColor)
                        ? datasets[0].backgroundColor[index]
                        : datasets[0].backgroundColor
                    } ${segment.startAngle}deg ${segment.startAngle + segment.percentage * 3.6}deg`,
                )
                .join(", ")})`,
            }}
          ></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.data.labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: Array.isArray(datasets[0]?.backgroundColor)
                    ? datasets[0].backgroundColor[index] || "#3b82f6"
                    : datasets[0]?.backgroundColor || "#3b82f6",
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

const applyStyles = (style?: ComponentStyle): React.CSSProperties => {
  if (!style) return {}
  const cssProps: React.CSSProperties = {}
  if (style.color) cssProps.color = style.color
  if (style.backgroundColor) cssProps.backgroundColor = style.backgroundColor
  if (style.fontSize) cssProps.fontSize = style.fontSize
  if (style.fontWeight) cssProps.fontWeight = style.fontWeight as React.CSSProperties["fontWeight"]
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        if (editingField) handleSaveEdit()
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
    if (!editingField) return
    const keys = editingField.split(".")
    const newContent = JSON.parse(JSON.stringify(component.content))
    let current = newContent
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = tempValue
    updateComponentContent(component.id, newContent)
    setEditingField(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      setEditingField(null)
    }
  }

  const renderEditableText = (
    field: string,
    value: string,
    placeholder = "Click to edit",
    multiline = false,
    className = "",
  ) => {
    if (editingField === field) {
      const commonProps = {
        value: tempValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTempValue(e.target.value),
        onKeyDown: handleKeyDown,
        onBlur: handleSaveEdit,
        className: cn(
          "w-full bg-background border-2 border-primary rounded-md px-2 py-1 focus:outline-none text-foreground",
          className,
        ),
        autoFocus: true,
      }
      return multiline ? (
        <Textarea ref={editRef as React.RefObject<HTMLTextAreaElement>} {...commonProps} rows={3} />
      ) : (
        <Input ref={editRef as React.RefObject<HTMLInputElement>} type="text" {...commonProps} />
      )
    }
    return (
      <span
        className={cn(
          "cursor-pointer hover:bg-primary/10 rounded-md px-1 py-0.5 transition-colors min-h-[1.5rem] inline-block w-full",
          !value && "text-muted-foreground italic",
          className,
        )}
        onClick={(e) => handleStartEdit(field, value, e)}
      >
        {value || placeholder}
      </span>
    )
  }

  const updateArray = (field: string, newArray: any[]) => {
    updateComponentContent(component.id, { [field]: newArray })
  }

  const baseClasses = cn(
    "relative group transition-all duration-200",
    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
  )
  const style = applyStyles(component.style)

  const renderComponent = (): JSX.Element => {
    switch (component.type) {
      case "heading": {
        const HeadingTag = `h${component.content.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag style={style} className={baseClasses}>
            {renderEditableText("text", component.content.text, "Heading")}
          </HeadingTag>
        )
      }
      case "paragraph":
        return (
          <p style={style} className={baseClasses}>
            {renderEditableText("text", component.content.text, "Paragraph text", true)}
          </p>
        )
      case "image": {
        const imageContent = component.content as ImageContent
        return (
          <div style={style} className={baseClasses}>
            <div className="relative group">
              <img
                src={imageContent.src || "/placeholder.svg?height=300&width=500"}
                alt={imageContent.alt || "Image"}
                className="rounded-lg w-full"
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
                        reader.onload = (e) => updateComponentContent(component.id, { src: e.target?.result as string })
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
              "text-sm text-muted-foreground text-center mt-2",
            )}
          </div>
        )
      }
      case "table": {
        const { headers = [], rows = [] } = component.content as TableContent
        return (
          <div style={style} className={baseClasses}>
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index} className="relative group/header">
                      {renderEditableText(`headers.${index}`, header)}
                      <UIButton
                        size="icon"
                        variant="ghost"
                        className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover/header:opacity-100"
                        onClick={() =>
                          updateArray(
                            "headers",
                            headers.filter((_, i) => i !== index),
                          )
                        }
                      >
                        {" "}
                        <X className="h-3 w-3" />{" "}
                      </UIButton>
                    </TableHead>
                  ))}
                  <TableHead>
                    <UIButton
                      size="sm"
                      variant="ghost"
                      onClick={() => updateArray("headers", [...headers, "New Header"])}
                    >
                      <Plus className="w-4 h-4" />
                    </UIButton>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="group/row">
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{renderEditableText(`rows.${rowIndex}.${cellIndex}`, cell)}</TableCell>
                    ))}
                    <TableCell>
                      <UIButton
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 opacity-0 group-hover/row:opacity-100"
                        onClick={() =>
                          updateArray(
                            "rows",
                            rows.filter((_, i) => i !== rowIndex),
                          )
                        }
                      >
                        {" "}
                        <X className="h-3 w-3" />{" "}
                      </UIButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <UIButton
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => updateArray("rows", [...rows, new Array(headers.length).fill("")])}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </UIButton>
          </div>
        )
      }
      case "grid": {
        const { columns = 3, gap = "1rem", items = [] } = component.content as GridContent
        return (
          <div style={style} className={baseClasses}>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap }}>
              {items.map((item, index) => (
                <div key={item.id} className="relative group/item border p-4 rounded-lg">
                  <h4 className="font-bold">
                    {renderEditableText(`items.${index}.content.title`, item.content.title)}
                  </h4>
                  <p>
                    {renderEditableText(
                      `items.${index}.content.description`,
                      item.content.description,
                      "Description",
                      true,
                    )}
                  </p>
                  <UIButton
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover/item:opacity-100"
                    onClick={() =>
                      updateArray(
                        "items",
                        items.filter((_, i) => i !== index),
                      )
                    }
                  >
                    {" "}
                    <X className="h-3 w-3" />{" "}
                  </UIButton>
                </div>
              ))}
            </div>
            <UIButton
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() =>
                updateArray("items", [
                  ...items,
                  {
                    id: `item-${Date.now()}`,
                    type: "card",
                    content: { title: "New Item", description: "New Description" },
                  },
                ])
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </UIButton>
          </div>
        )
      }
      case "gallery": {
        const { images = [] } = component.content
        return (
          <div style={style} className={baseClasses}>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image: any, index: number) => (
                <div key={index} className="relative group/item">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <UIButton
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover/item:opacity-100"
                    onClick={() =>
                      updateArray(
                        "images",
                        images.filter((_: any, i: number) => i !== index),
                      )
                    }
                  >
                    {" "}
                    <X className="h-3 w-3" />{" "}
                  </UIButton>
                </div>
              ))}
            </div>
            <UIButton
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => {
                const input = document.createElement("input")
                input.type = "file"
                input.accept = "image/*"
                input.multiple = true
                input.onchange = (e) => {
                  const files = Array.from((e.target as HTMLInputElement).files || [])
                  files.forEach((file) => {
                    const reader = new FileReader()
                    reader.onload = (e) => updateArray("images", [...images, { src: e.target?.result, alt: file.name }])
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
        )
      }
      case "pricing": {
        const { plans = [] } = component.content
        return (
          <div style={style} className={cn(baseClasses, "grid grid-cols-1 md:grid-cols-3 gap-6")}>
            {plans.map((plan: any, index: number) => (
              <div
                key={index}
                className={cn(
                  "border rounded-lg p-6 text-center flex flex-col",
                  plan.popular ? "border-primary" : "border-border",
                )}
              >
                <h3 className="text-xl font-bold">{renderEditableText(`plans.${index}.name`, plan.name)}</h3>
                <p className="text-4xl font-bold my-4">{renderEditableText(`plans.${index}.price`, plan.price)}</p>
                <ul className="space-y-2 text-left mb-6">
                  {plan.features?.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-center group/feature">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      <span className="flex-1">{renderEditableText(`plans.${index}.features.${fIndex}`, feature)}</span>
                      <UIButton
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5 opacity-0 group-hover/feature:opacity-100"
                        onClick={() => {
                          const newPlans = [...plans]
                          newPlans[index].features.splice(fIndex, 1)
                          updateArray("plans", newPlans)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </UIButton>
                    </li>
                  ))}
                </ul>
                <UIButton
                  size="sm"
                  variant="outline"
                  className="mb-4"
                  onClick={() => {
                    const newPlans = [...plans]
                    newPlans[index].features.push("New Feature")
                    updateArray("plans", newPlans)
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Feature
                </UIButton>
                <UIButton className="mt-auto" variant={plan.popular ? "default" : "outline"}>
                  {renderEditableText(`plans.${index}.buttonText`, plan.buttonText)}
                </UIButton>
              </div>
            ))}
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg">
              <UIButton
                variant="ghost"
                onClick={() =>
                  updateArray("plans", [
                    ...plans,
                    { name: "New Plan", price: "$0", features: [], buttonText: "Sign Up" },
                  ])
                }
              >
                <Plus className="w-6 h-6" />
              </UIButton>
            </div>
          </div>
        )
      }
      case "chart": {
        const chartContent = component.content as ChartContent
        return (
          <div style={style} className={baseClasses}>
            <SimpleChart
              data={chartContent}
              type={chartContent.type}
              title={chartContent.options?.plugins?.title?.text}
            />
          </div>
        )
      }
      default:
        return (
          <div style={style} className={cn(baseClasses, "p-4 border-2 border-dashed rounded-lg text-center")}>
            Unsupported component type: {component.type}
          </div>
        )
    }
  }

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {renderComponent()}
      {(isHovered || isSelected) && !editingField && (
        <div className="absolute -top-3 -right-3 z-10">
          <button className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg hover:bg-primary/80">
            <Edit3 className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  )
}
