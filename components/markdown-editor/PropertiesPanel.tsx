"use client"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Palette, Layout, Type, ChevronDown, ChevronRight, Eye, Sliders } from "lucide-react"
import type { MarkdownComponent, ComponentStyle } from "./types"

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
  onUpdateComponent: (updates: Partial<MarkdownComponent>) => void
  onUpdateStyle: (styleUpdates: Partial<ComponentStyle>) => void
}

export function PropertiesPanel({ selectedComponent, onUpdateComponent, onUpdateStyle }: PropertiesPanelProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["content", "style"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const updateContent = (field: string, value: any) => {
    if (!selectedComponent) return
    onUpdateComponent({
      content: { ...selectedComponent.content, [field]: value },
    })
  }

  const updateStyle = (field: string, value: any) => {
    if (!selectedComponent) return
    onUpdateStyle({ [field]: value })
  }

  const renderContentEditor = () => {
    if (!selectedComponent) return null

    switch (selectedComponent.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading-text">Text</Label>
              <Input
                id="heading-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Heading text"
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Level</Label>
              <Select
                value={selectedComponent.content.level?.toString() || "2"}
                onValueChange={(value) => updateContent("level", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      H{level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "paragraph":
        return (
          <div>
            <Label htmlFor="paragraph-text">Text</Label>
            <Textarea
              id="paragraph-text"
              value={selectedComponent.content.text || ""}
              onChange={(e) => updateContent("text", e.target.value)}
              placeholder="Paragraph text"
              rows={4}
            />
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={selectedComponent.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => updateContent("alt", e.target.value)}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption</Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => updateContent("caption", e.target.value)}
                placeholder="Image caption"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="image-width">Width</Label>
                <Input
                  id="image-width"
                  value={selectedComponent.content.width || ""}
                  onChange={(e) => updateContent("width", e.target.value)}
                  placeholder="100%, 400px"
                />
              </div>
              <div>
                <Label htmlFor="image-height">Height</Label>
                <Input
                  id="image-height"
                  value={selectedComponent.content.height || ""}
                  onChange={(e) => updateContent("height", e.target.value)}
                  placeholder="auto, 300px"
                />
              </div>
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text">Text</Label>
              <Input
                id="button-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link (optional)</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => updateContent("link", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="button-variant">Variant</Label>
                <Select
                  value={selectedComponent.content.variant || "default"}
                  onValueChange={(value) => updateContent("variant", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="destructive">Destructive</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="button-size">Size</Label>
                <Select
                  value={selectedComponent.content.size || "default"}
                  onValueChange={(value) => updateContent("size", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-title">Title</Label>
              <Input
                id="card-title"
                value={selectedComponent.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div>
              <Label htmlFor="card-description">Description</Label>
              <Textarea
                id="card-description"
                value={selectedComponent.content.description || ""}
                onChange={(e) => updateContent("description", e.target.value)}
                placeholder="Card description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="card-image">Image URL (optional)</Label>
              <Input
                id="card-image"
                value={selectedComponent.content.imageUrl || ""}
                onChange={(e) => updateContent("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="card-layout">Layout</Label>
              <Select
                value={selectedComponent.content.layout || "default"}
                onValueChange={(value) => updateContent("layout", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="pricing">Pricing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No specific properties available for this component type.</p>
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    if (!selectedComponent) return null

    const style = selectedComponent.style || {}

    return (
      <div className="space-y-6">
        {/* Typography */}
        <Collapsible open={expandedSections.includes("typography")} onOpenChange={() => toggleSection("typography")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span className="font-medium">Typography</span>
            </div>
            {expandedSections.includes("typography") ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="font-size">Font Size</Label>
                <Input
                  id="font-size"
                  value={style.fontSize || ""}
                  onChange={(e) => updateStyle("fontSize", e.target.value)}
                  placeholder="16px, 1rem"
                />
              </div>
              <div>
                <Label htmlFor="font-weight">Font Weight</Label>
                <Select
                  value={style.fontWeight?.toString() || ""}
                  onValueChange={(value) => updateStyle("fontWeight", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Light</SelectItem>
                    <SelectItem value="400">Normal</SelectItem>
                    <SelectItem value="500">Medium</SelectItem>
                    <SelectItem value="600">Semibold</SelectItem>
                    <SelectItem value="700">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={style.color || "#000000"}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="text-align">Text Align</Label>
              <Select value={style.textAlign || ""} onValueChange={(value) => updateStyle("textAlign", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Layout */}
        <Collapsible open={expandedSections.includes("layout")} onOpenChange={() => toggleSection("layout")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              <span className="font-medium">Layout</span>
            </div>
            {expandedSections.includes("layout") ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  value={style.width || ""}
                  onChange={(e) => updateStyle("width", e.target.value)}
                  placeholder="100%, 400px"
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  value={style.height || ""}
                  onChange={(e) => updateStyle("height", e.target.value)}
                  placeholder="auto, 300px"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="padding">Padding</Label>
                <Input
                  id="padding"
                  value={style.padding || ""}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                  placeholder="16px, 1rem"
                />
              </div>
              <div>
                <Label htmlFor="margin">Margin</Label>
                <Input
                  id="margin"
                  value={style.margin || ""}
                  onChange={(e) => updateStyle("margin", e.target.value)}
                  placeholder="16px, 1rem"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Appearance */}
        <Collapsible open={expandedSections.includes("appearance")} onOpenChange={() => toggleSection("appearance")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="font-medium">Appearance</span>
            </div>
            {expandedSections.includes("appearance") ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <Input
                id="bg-color"
                type="color"
                value={style.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="border">Border</Label>
              <Input
                id="border"
                value={style.border || ""}
                onChange={(e) => updateStyle("border", e.target.value)}
                placeholder="1px solid #ccc"
              />
            </div>
            <div>
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={style.borderRadius || ""}
                onChange={(e) => updateStyle("borderRadius", e.target.value)}
                placeholder="8px, 0.5rem"
              />
            </div>
            <div>
              <Label htmlFor="box-shadow">Box Shadow</Label>
              <Input
                id="box-shadow"
                value={style.boxShadow || ""}
                onChange={(e) => updateStyle("boxShadow", e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
              />
            </div>
            <div>
              <Label htmlFor="opacity">Opacity</Label>
              <Input
                id="opacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={style.opacity || 1}
                onChange={(e) => updateStyle("opacity", Number.parseFloat(e.target.value))}
              />
              <div className="text-xs text-gray-500 mt-1">{((style.opacity || 1) * 100).toFixed(0)}%</div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Properties</h2>
              <p className="text-sm text-gray-600">Component settings</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Component Selected</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Select a component from the canvas to view and edit its properties.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Properties</h2>
              <p className="text-sm text-gray-600">Component settings</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {selectedComponent.type}
          </Badge>
          {selectedComponent.locked && (
            <Badge variant="secondary" className="text-xs">
              Locked
            </Badge>
          )}
          {selectedComponent.hidden && (
            <Badge variant="secondary" className="text-xs">
              Hidden
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Style
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              {renderContentEditor()}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              {renderStyleEditor()}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}
