"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEditor } from "./EditorContext"
import { Settings, Palette, Layout, Type, Trash2 } from "lucide-react"
import { useState } from "react"

export function PropertiesPanel() {
  const { state, updateComponentContent, updateComponentStyle, deleteComponent } = useEditor()
  const [activeTab, setActiveTab] = useState<"content" | "style" | "layout">("content")

  const selectedComponent = state.components.find((comp) => comp.id === state.selectedComponent)

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-white border-l border-[#dfe1e6]">
        <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#6b778c] text-white">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#172b4d]">Properties</h2>
              <p className="text-sm text-[#6b778c]">Configure selected element</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-4 text-[#6b778c] opacity-50" />
            <p className="text-[#6b778c]">No component selected</p>
            <p className="text-sm text-[#6b778c] mt-1">Select a component to edit its properties</p>
          </div>
        </div>
      </div>
    )
  }

  const handleContentUpdate = (updates: Partial<any>) => {
    updateComponentContent(selectedComponent.id, updates)
  }

  const handleStyleUpdate = (updates: Partial<any>) => {
    updateComponentStyle(selectedComponent.id, updates)
  }

  const handleDelete = () => {
    deleteComponent(selectedComponent.id)
  }

  const renderContentProperties = () => {
    switch (selectedComponent.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading-text">Text</Label>
              <Input
                id="heading-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => handleContentUpdate({ text: e.target.value })}
                placeholder="Enter heading text"
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Level</Label>
              <Select
                value={selectedComponent.content.level?.toString() || "2"}
                onValueChange={(value) => handleContentUpdate({ level: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                  <SelectItem value="5">H5</SelectItem>
                  <SelectItem value="6">H6</SelectItem>
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
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              placeholder="Enter paragraph text"
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
                onChange={(e) => handleContentUpdate({ src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => handleContentUpdate({ alt: e.target.value })}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption</Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => handleContentUpdate({ caption: e.target.value })}
                placeholder="Optional caption"
              />
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => handleContentUpdate({ text: e.target.value })}
                placeholder="Click me"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link URL</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => handleContentUpdate({ link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="button-variant">Variant</Label>
              <Select
                value={selectedComponent.content.variant || "default"}
                onValueChange={(value) => handleContentUpdate({ variant: value })}
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
          </div>
        )

      case "list":
      case "orderedList":
        return (
          <div className="space-y-4">
            <div>
              <Label>List Items</Label>
              <div className="space-y-2 mt-2">
                {(selectedComponent.content.items || []).map((item: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newItems = [...(selectedComponent.content.items || [])]
                        newItems[index] = e.target.value
                        handleContentUpdate({ items: newItems })
                      }}
                      placeholder={`Item ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newItems = selectedComponent.content.items.filter((_: any, i: number) => i !== index)
                        handleContentUpdate({ items: newItems })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = [...(selectedComponent.content.items || []), "New item"]
                    handleContentUpdate({ items: newItems })
                  }}
                >
                  Add Item
                </Button>
              </div>
            </div>
            {selectedComponent.type === "orderedList" && (
              <div>
                <Label htmlFor="list-start">Start Number</Label>
                <Input
                  id="list-start"
                  type="number"
                  value={selectedComponent.content.start || 1}
                  onChange={(e) => handleContentUpdate({ start: Number.parseInt(e.target.value) || 1 })}
                />
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <p className="text-sm text-[#6b778c]">No content properties available for this component type.</p>
          </div>
        )
    }
  }

  const renderStyleProperties = () => {
    return (
      <div className="space-y-6">
        {/* Typography */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                value={selectedComponent.style.fontSize || ""}
                onChange={(e) => handleStyleUpdate({ fontSize: e.target.value })}
                placeholder="16px, 1rem, etc."
              />
            </div>
            <div>
              <Label htmlFor="font-weight">Font Weight</Label>
              <Select
                value={selectedComponent.style.fontWeight?.toString() || ""}
                onValueChange={(value) => handleStyleUpdate({ fontWeight: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select weight" />
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
            <div>
              <Label htmlFor="text-align">Text Align</Label>
              <Select
                value={selectedComponent.style.textAlign || ""}
                onValueChange={(value) => handleStyleUpdate({ textAlign: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                type="color"
                value={selectedComponent.style.color || "#000000"}
                onChange={(e) => handleStyleUpdate({ color: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <Input
                id="bg-color"
                type="color"
                value={selectedComponent.style.backgroundColor || "#ffffff"}
                onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Spacing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="margin">Margin</Label>
              <Input
                id="margin"
                value={selectedComponent.style.margin || ""}
                onChange={(e) => handleStyleUpdate({ margin: e.target.value })}
                placeholder="10px, 1rem, etc."
              />
            </div>
            <div>
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={selectedComponent.style.padding || ""}
                onChange={(e) => handleStyleUpdate({ padding: e.target.value })}
                placeholder="10px, 1rem, etc."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderLayoutProperties = () => {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Dimensions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={selectedComponent.style.width || ""}
                onChange={(e) => handleStyleUpdate({ width: e.target.value })}
                placeholder="100%, 300px, auto, etc."
              />
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={selectedComponent.style.height || ""}
                onChange={(e) => handleStyleUpdate({ height: e.target.value })}
                placeholder="auto, 200px, etc."
              />
            </div>
            <div>
              <Label htmlFor="max-width">Max Width</Label>
              <Input
                id="max-width"
                value={selectedComponent.style.maxWidth || ""}
                onChange={(e) => handleStyleUpdate({ maxWidth: e.target.value })}
                placeholder="100%, 600px, etc."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Border & Effects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={selectedComponent.style.borderRadius || ""}
                onChange={(e) => handleStyleUpdate({ borderRadius: e.target.value })}
                placeholder="4px, 0.5rem, etc."
              />
            </div>
            <div>
              <Label htmlFor="box-shadow">Box Shadow</Label>
              <Input
                id="box-shadow"
                value={selectedComponent.style.boxShadow || ""}
                onChange={(e) => handleStyleUpdate({ boxShadow: e.target.value })}
                placeholder="0 2px 4px rgba(0,0,0,0.1)"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#dfe1e6]">
      {/* Properties Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#0052cc] text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#172b4d]">Properties</h2>
            <p className="text-sm text-[#6b778c]">Configure selected element</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Component Info */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            {selectedComponent.type}
          </Badge>
          <span className="text-sm text-[#6b778c]">#{selectedComponent.id.slice(-8)}</span>
        </div>

        {/* Property Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-md p-1 border border-[#dfe1e6]">
          <Button
            variant={activeTab === "content" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("content")}
            className="h-7 px-3 flex-1"
          >
            Content
          </Button>
          <Button
            variant={activeTab === "style" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("style")}
            className="h-7 px-3 flex-1"
          >
            Style
          </Button>
          <Button
            variant={activeTab === "layout" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("layout")}
            className="h-7 px-3 flex-1"
          >
            Layout
          </Button>
        </div>
      </div>

      {/* Properties Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {activeTab === "content" && renderContentProperties()}
          {activeTab === "style" && renderStyleProperties()}
          {activeTab === "layout" && renderLayoutProperties()}
        </div>
      </ScrollArea>
    </div>
  )
}
