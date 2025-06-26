"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import type {
  MarkdownComponent,
  ComponentStyle,
  ImageContent,
  CardContent as CardContentType,
  GridContent,
} from "./types"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button as UIButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
      "relative group transition-all duration-200",
      isSelected && "ring-2 ring-blue-500 ring-offset-2 ring-offset-white",
      isHovered && !isEditing && "ring-1 ring-slate-300 ring-offset-1",
      getHoverClasses(component.style),
      component.style?.className,
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
              <div className="space-y-3 p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <input
                  type="text"
                  value={editingContent.text || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-inherit font-inherit focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  placeholder="Enter heading text..."
                />
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Level:</label>
                  <select
                    value={editingContent.level || 2}
                    onChange={(e) => setEditingContent({ ...editingContent, level: Number.parseInt(e.target.value) })}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((level) => (
                      <option key={level} value={level}>
                        H{level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <UIButton size="sm" onClick={handleSaveEdit}>
                    Save
                  </UIButton>
                  <UIButton size="sm" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <HeadingTag
                className="cursor-pointer hover:bg-blue-50/50 rounded-md px-2 py-1 transition-colors"
                onClick={handleStartEdit}
              >
                {component.content.text || "Heading"}
              </HeadingTag>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit heading"
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
              <div className="space-y-3 p-4 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <Textarea
                  value={editingContent.text || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, text: e.target.value })}
                  onKeyDown={handleKeyDown}
                  className="w-full min-h-[100px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                  placeholder="Enter paragraph text..."
                />
                <div className="flex gap-2">
                  <UIButton size="sm" onClick={handleSaveEdit}>
                    Save
                  </UIButton>
                  <UIButton size="sm" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <p
                className="cursor-pointer min-h-[24px] hover:bg-blue-50/50 rounded-md px-2 py-1 transition-colors leading-relaxed"
                onClick={handleStartEdit}
              >
                {component.content.text || "Click to edit paragraph"}
              </p>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit paragraph"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <Input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={editingContent.src || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, src: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                    <Input
                      type="text"
                      placeholder="Describe the image"
                      value={editingContent.alt || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, alt: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                    <Input
                      type="text"
                      placeholder="100%, 400px, auto"
                      value={editingContent.width || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, width: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <Input
                      type="text"
                      placeholder="auto, 300px"
                      value={editingContent.height || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, height: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Object Fit</label>
                    <select
                      value={editingContent.objectFit || "cover"}
                      onChange={(e) => setEditingContent({ ...editingContent, objectFit: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                      <option value="fill">Fill</option>
                      <option value="scale-down">Scale Down</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
                    <Input
                      type="text"
                      placeholder="8px, 1rem, 50%"
                      value={editingContent.borderRadius || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, borderRadius: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Caption (optional)</label>
                  <Input
                    type="text"
                    placeholder="Image caption"
                    value={editingContent.caption || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, caption: e.target.value })}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <UIButton onClick={handleSaveEdit}>Save Changes</UIButton>
                  <UIButton variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer group" onClick={handleStartEdit}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={imageContent.src || "/placeholder.svg?height=300&width=500"}
                    alt={imageContent.alt || "Image"}
                    className={cn(
                      "transition-all duration-300 group-hover:scale-105",
                      imageContent.objectFit && `object-${imageContent.objectFit}`,
                    )}
                    style={{
                      width: imageContent.width || "100%",
                      height: imageContent.height || "auto",
                      borderRadius: imageContent.borderRadius || "8px",
                    }}
                  />
                  {imageContent.overlay?.enabled && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        backgroundColor: imageContent.overlay.color || "rgba(0,0,0,0.5)",
                        opacity: imageContent.overlay.opacity || 0.5,
                      }}
                    >
                      {imageContent.overlay.text && (
                        <span className="text-white text-lg font-semibold">{imageContent.overlay.text}</span>
                      )}
                    </div>
                  )}
                </div>
                {imageContent.caption && (
                  <p className="text-sm text-gray-600 mt-3 text-center italic">{imageContent.caption}</p>
                )}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit image"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input
                      type="text"
                      placeholder="Card title"
                      value={editingContent.title || ""}
                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                    <select
                      value={editingContent.layout || "default"}
                      onChange={(e) => setEditingContent({ ...editingContent, layout: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="default">Default</option>
                      <option value="horizontal">Horizontal</option>
                      <option value="minimal">Minimal</option>
                      <option value="feature">Feature</option>
                      <option value="pricing">Pricing</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Card description"
                    value={editingContent.description || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, description: e.target.value })}
                    className="min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
                  <Input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={editingContent.imageUrl || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, imageUrl: e.target.value })}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <UIButton onClick={handleSaveEdit}>Save Changes</UIButton>
                  <UIButton variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg border-0 shadow-md",
                  cardContent.layout === "horizontal" && "flex flex-row",
                  cardContent.layout === "minimal" && "border border-gray-200 shadow-sm",
                  cardContent.layout === "feature" && "text-center",
                  cardContent.layout === "pricing" && "relative overflow-hidden",
                )}
                onClick={handleStartEdit}
              >
                {cardContent.badge && (
                  <div
                    className={cn(
                      "absolute z-10 px-3 py-1 text-xs font-semibold rounded-full",
                      cardContent.badge.position === "top-left" && "top-4 left-4",
                      cardContent.badge.position === "top-right" && "top-4 right-4",
                      cardContent.badge.position === "bottom-left" && "bottom-4 left-4",
                      cardContent.badge.position === "bottom-right" && "bottom-4 right-4",
                    )}
                    style={{ backgroundColor: cardContent.badge.color, color: "white" }}
                  >
                    {cardContent.badge.text}
                  </div>
                )}

                {cardContent.imageUrl && cardContent.imagePosition !== "background" && (
                  <div
                    className={cn(
                      "overflow-hidden",
                      cardContent.imagePosition === "top" && "rounded-t-lg",
                      cardContent.layout === "horizontal" && cardContent.imagePosition === "left" && "w-1/3",
                      cardContent.layout === "horizontal" && cardContent.imagePosition === "right" && "w-1/3 order-2",
                    )}
                  >
                    <img
                      src={cardContent.imageUrl || "/placeholder.svg"}
                      alt=""
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader
                  className={cn(
                    cardContent.layout === "horizontal" && "flex-1",
                    cardContent.layout === "feature" && "text-center",
                  )}
                >
                  <CardTitle className="text-xl font-bold text-gray-900">{cardContent.title || "Card Title"}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {cardContent.description || "Card description"}
                  </CardDescription>
                </CardHeader>

                {(cardContent.buttons || cardContent.stats) && (
                  <CardContent className="pt-0">
                    {cardContent.stats && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {cardContent.stats.map((stat, index) => (
                          <div key={index} className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {cardContent.buttons && (
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
                            {button.text}
                            {button.link && <ExternalLink className="w-4 h-4 ml-2" />}
                          </UIButton>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}

                {cardContent.imageUrl && cardContent.imagePosition === "background" && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 rounded-lg"
                    style={{ backgroundImage: `url(${cardContent.imageUrl})` }}
                  />
                )}
              </Card>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit card"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
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
            ref={editRef}
          >
            {isEditing ? (
              <div className="space-y-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Columns</label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={editingContent.columns || 3}
                      onChange={(e) =>
                        setEditingContent({ ...editingContent, columns: Number.parseInt(e.target.value) })
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gap</label>
                    <Input
                      type="text"
                      placeholder="1rem, 16px"
                      value={editingContent.gap || "1.5rem"}
                      onChange={(e) => setEditingContent({ ...editingContent, gap: e.target.value })}
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SM Columns</label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={editingContent.responsive?.sm || 1}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          responsive: { ...editingContent.responsive, sm: Number.parseInt(e.target.value) },
                        })
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MD Columns</label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={editingContent.responsive?.md || 2}
                      onChange={(e) =>
                        setEditingContent({
                          ...editingContent,
                          responsive: { ...editingContent.responsive, md: Number.parseInt(e.target.value) },
                        })
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <UIButton onClick={handleSaveEdit}>Save Changes</UIButton>
                  <UIButton variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={handleStartEdit}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridContent.columns}, 1fr)`,
                  gap: gridContent.gap || "1.5rem",
                }}
              >
                {gridContent.items?.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    style={{
                      gridColumn: item.span?.columns ? `span ${item.span.columns}` : undefined,
                      gridRow: item.span?.rows ? `span ${item.span.rows}` : undefined,
                    }}
                  >
                    {item.type === "card" && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.content.title}</h3>
                        <p className="text-gray-600 text-sm">{item.content.description}</p>
                      </div>
                    )}
                    {item.type === "image" && (
                      <img
                        src={item.content.src || "/placeholder.svg?height=200&width=300"}
                        alt={item.content.alt || "Grid item"}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    )}
                    {item.type === "text" && <p className="text-gray-700">{item.content.text}</p>}
                  </div>
                )) || (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No grid items yet. Click to edit and add items.
                  </div>
                )}
              </div>
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit grid"
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
              <div className="space-y-4 p-6 border-2 border-blue-200 rounded-lg bg-blue-50/50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Block Name</label>
                  <Input
                    type="text"
                    placeholder="Custom HTML Block"
                    value={editingContent.name || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, name: e.target.value })}
                    className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">HTML Content</label>
                  <Textarea
                    placeholder="Enter your HTML content here..."
                    value={editingContent.htmlContent || ""}
                    onChange={(e) => setEditingContent({ ...editingContent, htmlContent: e.target.value })}
                    className="min-h-[200px] font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingContent.editable !== false}
                      onChange={(e) => setEditingContent({ ...editingContent, editable: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Editable</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingContent.responsive !== false}
                      onChange={(e) => setEditingContent({ ...editingContent, responsive: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Responsive</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <UIButton onClick={handleSaveEdit}>Save Changes</UIButton>
                  <UIButton variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </UIButton>
                </div>
              </div>
            ) : (
              <div className="cursor-pointer group" onClick={handleStartEdit}>
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
            )}
            {(isHovered || isSelected) && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="absolute -top-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-600 hover:scale-110 shadow-lg"
                title="Edit HTML block"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}
          </div>
        )

      // Add more component types here...
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

  return renderEditableContent()
}
