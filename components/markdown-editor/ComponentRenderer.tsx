"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { MarkdownComponent, ComponentStyle } from "./types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button as UIButton } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Info, CheckCircle, XCircle, ExternalLink, Edit3, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { JSX } from "react/jsx-runtime"

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

// Helper for hover classes
const getHoverClasses = (style?: ComponentStyle): string => {
  if (!style?.hover) return ""
  let classes = "transition-all duration-200 ease-in-out "
  if (style.hover.backgroundColor) classes += `hover:bg-[${style.hover.backgroundColor}] `
  if (style.hover.color) classes += `hover:text-[${style.hover.color}] `
  if (style.hover.boxShadow) classes += `hover:shadow-[${style.hover.boxShadow.replace(/ /g, "_")}] `
  if (style.hover.transform) {
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
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState<any>(component.content)
  const [isHovered, setIsHovered] = useState(false)
  const editRef = useRef<HTMLDivElement>(null)

  // Handle click outside to save edits
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        if (isEditing) {
          handleSaveEdit()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isEditing, editingContent])

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
    setEditingContent(component.content)
  }

  const handleSaveEdit = () => {
    updateComponentContent(component.id, editingContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditingContent(component.content)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && component.type !== "paragraph") {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancelEdit()
    }
  }

  const renderEditableContent = (): JSX.Element => {
    const baseClasses = cn(
      "relative group",
      isSelected && "ring-2 ring-blue-500 ring-offset-2",
      isHovered && !isEditing && "ring-1 ring-gray-300",
      getHoverClasses(component.style),
    )

    const style = applyStyles(component.style)

    switch (component.type) {
      case "heading": {
        const HeadingTag = `h${component.content.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <input
                type="text"
                value={editingContent.text || ""}
                onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-inherit font-inherit"
                autoFocus
              />
            ) : (
              <HeadingTag className="cursor-pointer" onClick={handleStartEdit}>
                {component.content.text || "Heading"}
              </HeadingTag>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            ref={editRef}
          >
            {isEditing ? (
              <textarea
                value={editingContent.text || ""}
                onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none resize-none text-inherit font-inherit min-h-[60px]"
                autoFocus
              />
            ) : (
              <p className="cursor-pointer min-h-[24px]" onClick={handleStartEdit}>
                {component.content.text || "Click to edit paragraph"}
              </p>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "image":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editingContent.src || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, src: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Alt text"
                  value={editingContent.alt || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, alt: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Caption (optional)"
                  value={editingContent.caption || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, caption: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handleStartEdit}>
                <img
                  src={component.content.src || "/placeholder.svg?height=200&width=400"}
                  alt={component.content.alt || "Image"}
                  className="max-w-full h-auto rounded"
                />
                {component.content.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center">{component.content.caption}</p>
                )}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "button":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="text"
                  placeholder="Button text"
                  value={editingContent.text || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  placeholder="Link URL (optional)"
                  value={editingContent.link || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, link: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <select
                  value={editingContent.variant || "default"}
                  onChange={(e) => setEditingContent({ ...editingContent, variant: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="default">Default</option>
                  <option value="destructive">Destructive</option>
                  <option value="outline">Outline</option>
                  <option value="secondary">Secondary</option>
                  <option value="ghost">Ghost</option>
                  <option value="link">Link</option>
                </select>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <UIButton
                variant={(component.content.variant as any) || "default"}
                size={(component.content.size as any) || "default"}
                onClick={component.content.link ? () => window.open(component.content.link, "_blank") : handleStartEdit}
                className="cursor-pointer"
              >
                {component.content.text || "Button"}
                {component.content.link && <ExternalLink className="w-4 h-4 ml-2" />}
              </UIButton>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "card":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="text"
                  placeholder="Card title"
                  value={editingContent.title || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="Card description"
                  value={editingContent.description || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded min-h-[80px]"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={editingContent.imageUrl || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, imageUrl: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <Card className="cursor-pointer" onClick={handleStartEdit}>
                {component.content.imageUrl && (
                  <img
                    src={component.content.imageUrl || "/placeholder.svg"}
                    alt=""
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle>{component.content.title || "Card Title"}</CardTitle>
                  <CardDescription>{component.content.description || "Card description"}</CardDescription>
                </CardHeader>
              </Card>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "list":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                {editingContent.items?.map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...editingContent.items]
                        newItems[index] = e.target.value
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => {
                        const newItems = editingContent.items.filter((_: any, i: number) => i !== index)
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...(editingContent.items || []), "New item"]
                    setEditingContent({ ...editingContent, items: newItems })
                  }}
                  className="flex items-center space-x-1 text-blue-500 hover:bg-blue-100 p-2 rounded"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add item</span>
                </button>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <ul className="list-disc list-inside space-y-1 cursor-pointer" onClick={handleStartEdit}>
                {component.content.items?.map((item: string, index: number) => <li key={index}>{item}</li>) || (
                  <li>Empty list - click to edit</li>
                )}
              </ul>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "orderedList":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="number"
                  placeholder="Start number"
                  value={editingContent.start || 1}
                  onChange={(e) =>
                    setEditingContent({ ...editingContent, start: Number.parseInt(e.target.value) || 1 })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {editingContent.items?.map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...editingContent.items]
                        newItems[index] = e.target.value
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => {
                        const newItems = editingContent.items.filter((_: any, i: number) => i !== index)
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...(editingContent.items || []), "New item"]
                    setEditingContent({ ...editingContent, items: newItems })
                  }}
                  className="flex items-center space-x-1 text-blue-500 hover:bg-blue-100 p-2 rounded"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add item</span>
                </button>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <ol
                className="list-decimal list-inside space-y-1 cursor-pointer"
                start={component.content.start || 1}
                onClick={handleStartEdit}
              >
                {component.content.items?.map((item: string, index: number) => <li key={index}>{item}</li>) || (
                  <li>Empty list - click to edit</li>
                )}
              </ol>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "taskList":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                {editingContent.items?.map((item: { text: string; checked: boolean }, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => {
                        const newItems = [...editingContent.items]
                        newItems[index] = { ...item, checked: e.target.checked }
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="rounded"
                    />
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const newItems = [...editingContent.items]
                        newItems[index] = { ...item, text: e.target.value }
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => {
                        const newItems = editingContent.items.filter((_: any, i: number) => i !== index)
                        setEditingContent({ ...editingContent, items: newItems })
                      }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...(editingContent.items || []), { text: "New task", checked: false }]
                    setEditingContent({ ...editingContent, items: newItems })
                  }}
                  className="flex items-center space-x-1 text-blue-500 hover:bg-blue-100 p-2 rounded"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add task</span>
                </button>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 cursor-pointer" onClick={handleStartEdit}>
                {component.content.items?.map((item: { text: string; checked: boolean }, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input type="checkbox" checked={item.checked} readOnly className="rounded" />
                    <span className={item.checked ? "line-through text-gray-500" : ""}>{item.text}</span>
                  </div>
                )) || <div>Empty task list - click to edit</div>}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "blockquote":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <textarea
                value={editingContent.text || ""}
                onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                onKeyDown={handleKeyDown}
                className="w-full p-4 border-l-4 border-gray-300 bg-gray-50 italic resize-none min-h-[80px]"
                autoFocus
              />
            ) : (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 italic text-gray-600 cursor-pointer"
                onClick={handleStartEdit}
              >
                {component.content.text || "Click to edit quote"}
              </blockquote>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <select
                  value={editingContent.type || "info"}
                  onChange={(e) => setEditingContent({ ...editingContent, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
                <textarea
                  placeholder="Alert message"
                  value={editingContent.text || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded min-h-[80px]"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <Alert className="cursor-pointer" onClick={handleStartEdit}>
                <AlertIcon className="h-4 w-4" />
                <AlertTitle>Alert</AlertTitle>
                <AlertDescription>{component.content.text || "Alert message"}</AlertDescription>
              </Alert>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "code":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <select
                  value={editingContent.language || "javascript"}
                  onChange={(e) => setEditingContent({ ...editingContent, language: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="json">JSON</option>
                </select>
                <textarea
                  value={editingContent.code || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, code: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-sm min-h-[120px]"
                  placeholder="Enter your code here..."
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handleStartEdit}>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">{component.content.code || "// Click to edit code"}</code>
                </pre>
                {component.content.language && (
                  <div className="text-xs text-gray-500 mt-1">Language: {component.content.language}</div>
                )}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "table":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-4 p-4 border border-gray-300 rounded">
                <div>
                  <label className="block text-sm font-medium mb-2">Headers</label>
                  <div className="flex space-x-2">
                    {editingContent.headers?.map((header: string, index: number) => (
                      <input
                        key={index}
                        type="text"
                        value={header}
                        onChange={(e) => {
                          const newHeaders = [...editingContent.headers]
                          newHeaders[index] = e.target.value
                          setEditingContent({ ...editingContent, headers: newHeaders })
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded"
                      />
                    ))}
                    <button
                      onClick={() => {
                        const newHeaders = [...(editingContent.headers || []), "New Column"]
                        const newRows = editingContent.rows?.map((row: string[]) => [...row, ""]) || []
                        setEditingContent({ ...editingContent, headers: newHeaders, rows: newRows })
                      }}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rows</label>
                  {editingContent.rows?.map((row: string[], rowIndex: number) => (
                    <div key={rowIndex} className="flex space-x-2 mb-2">
                      {row.map((cell: string, cellIndex: number) => (
                        <input
                          key={cellIndex}
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...editingContent.rows]
                            newRows[rowIndex][cellIndex] = e.target.value
                            setEditingContent({ ...editingContent, rows: newRows })
                          }}
                          className="flex-1 p-2 border border-gray-300 rounded"
                        />
                      ))}
                      <button
                        onClick={() => {
                          const newRows = editingContent.rows.filter((_: any, i: number) => i !== rowIndex)
                          setEditingContent({ ...editingContent, rows: newRows })
                        }}
                        className="p-2 text-red-500 hover:bg-red-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newRow = new Array(editingContent.headers?.length || 3).fill("")
                      const newRows = [...(editingContent.rows || []), newRow]
                      setEditingContent({ ...editingContent, rows: newRows })
                    }}
                    className="flex items-center space-x-1 text-blue-500 hover:bg-blue-100 p-2 rounded"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add row</span>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handleStartEdit}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {component.content.headers?.map((header: string, index: number) => (
                        <TableHead key={index}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {component.content.rows?.map((row: string[], index: number) => (
                      <TableRow key={index}>
                        {row.map((cell: string, cellIndex: number) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "htmlBlock":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="text"
                  placeholder="Block name"
                  value={editingContent.name || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  placeholder="HTML content"
                  value={editingContent.htmlContent || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, htmlContent: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-sm min-h-[200px]"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handleStartEdit}>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      component.content.htmlContent ||
                      "<div class='p-4 border border-dashed border-gray-300 rounded-md text-center text-gray-500'>Click to edit HTML block</div>",
                  }}
                />
                {component.content.name && (
                  <div className="text-xs text-gray-500 mt-2 text-center">{component.content.name}</div>
                )}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            {(isHovered || isSelected) && (
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="w-3 h-3" />
              </div>
            )}
          </div>
        )

      case "spacer":
        return (
          <div
            className={baseClasses}
            style={{ ...style, height: component.content.height || "40px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <input
                  type="text"
                  placeholder="Height (e.g., 40px, 2rem)"
                  value={editingContent.height || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, height: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 text-sm cursor-pointer"
                onClick={handleStartEdit}
              >
                Spacer ({component.content.height || "40px"})
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "columns":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Column 1</label>
                    <textarea
                      value={editingContent.column1Text || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, column1Text: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Column 2</label>
                    <textarea
                      value={editingContent.column2Text || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, column2Text: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded min-h-[80px]"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 cursor-pointer" onClick={handleStartEdit}>
                <div className="p-4 border border-gray-200 rounded">
                  <p>{component.content.column1Text || "Column 1 content"}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded">
                  <p>{component.content.column2Text || "Column 2 content"}</p>
                </div>
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      case "mermaid":
        return (
          <div
            className={baseClasses}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-2 p-4 border border-gray-300 rounded">
                <textarea
                  value={editingContent.code || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, code: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-sm min-h-[120px]"
                  placeholder="Enter Mermaid diagram code..."
                />
                <div className="flex space-x-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handleStartEdit}>
                <div className="bg-gray-100 p-4 rounded-md border">
                  <div className="text-center text-gray-600 mb-2">Mermaid Diagram</div>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {component.content.code || "graph TD;\n    A[Start] --> B[Process];\n    B --> C[End];"}
                  </pre>
                </div>
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      default:
        return (
          <div className={baseClasses} style={style}>
            <div className="p-4 border border-dashed border-gray-300 rounded text-center text-gray-500">
              Unknown component type: {component.type}
            </div>
          </div>
        )
    }
  }

  return renderEditableContent()
}
