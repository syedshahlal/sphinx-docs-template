"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Check, Sliders } from "lucide-react"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
}

export function PropertiesPanel({ selectedComponent }: PropertiesPanelProps) {
  const { updateComponentContent, updateComponentStyle } = useEditor()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  // A local state to manage form inputs and only update context on blur or explicit action
  // This can improve performance for complex components
  const [localContent, setLocalContent] = useState(selectedComponent?.content)

  useEffect(() => {
    setLocalContent(selectedComponent?.content)
  }, [selectedComponent])

  const handleContentChange = (field: string, value: any) => {
    if (!selectedComponent) return
    updateComponentContent(selectedComponent.id, { [field]: value })
  }

  const handleStyleChange = (field: string, value: any) => {
    if (!selectedComponent) return
    updateComponentStyle(selectedComponent.id, { [field]: value })
  }

  const handleSave = async () => {
    setSaveStatus("saving")
    // In a real app, you'd call an API here
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
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
                onChange={(e) => handleContentChange("text", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Level</Label>
              <Select
                value={String(selectedComponent.content.level || "2")}
                onValueChange={(value) => handleContentChange("level", Number(value))}
              >
                <SelectTrigger id="heading-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <SelectItem key={level} value={String(level)}>
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
              onChange={(e) => handleContentChange("text", e.target.value)}
              rows={5}
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
                onChange={(e) => handleContentChange("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => handleContentChange("alt", e.target.value)}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption</Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => handleContentChange("caption", e.target.value)}
                placeholder="Image caption"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="image-width">Width</Label>
                <Input
                  id="image-width"
                  value={selectedComponent.content.width || ""}
                  onChange={(e) => handleContentChange("width", e.target.value)}
                  placeholder="100%, 400px"
                />
              </div>
              <div>
                <Label htmlFor="image-height">Height</Label>
                <Input
                  id="image-height"
                  value={selectedComponent.content.height || ""}
                  onChange={(e) => handleContentChange("height", e.target.value)}
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
                onChange={(e) => handleContentChange("text", e.target.value)}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link (optional)</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => handleContentChange("link", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="button-variant">Variant</Label>
                <Select
                  value={selectedComponent.content.variant || "default"}
                  onValueChange={(value) => handleContentChange("variant", value)}
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
                  onValueChange={(value) => handleContentChange("size", value)}
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
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div>
              <Label htmlFor="card-description">Description</Label>
              <Textarea
                id="card-description"
                value={selectedComponent.content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                rows={3}
                placeholder="Card description"
              />
            </div>
            <div>
              <Label htmlFor="card-image">Image URL (optional)</Label>
              <Input
                id="card-image"
                value={selectedComponent.content.imageUrl || ""}
                onChange={(e) => handleContentChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="card-layout">Layout</Label>
              <Select
                value={selectedComponent.content.layout || "default"}
                onValueChange={(value) => handleContentChange("layout", value)}
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
      case "chart":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="chart-type">Chart Type</Label>
              <Select
                value={selectedComponent.content.type || "bar"}
                onValueChange={(value) => handleContentChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="doughnut">Doughnut Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="chart-title">Title</Label>
              <Input
                id="chart-title"
                value={selectedComponent.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Chart title"
              />
            </div>
          </div>
        )
      case "grid":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="grid-columns">Columns</Label>
              <Input
                id="grid-columns"
                type="number"
                min="1"
                max="6"
                value={selectedComponent.content.columns || 3}
                onChange={(e) => handleContentChange("columns", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="grid-gap">Gap</Label>
              <Input
                id="grid-gap"
                value={selectedComponent.content.gap || "1.5rem"}
                onChange={(e) => handleContentChange("gap", e.target.value)}
                placeholder="1.5rem, 24px"
              />
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No specific properties for this component.</p>
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    if (!selectedComponent) return null
    const style = selectedComponent.style || {}

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="style-padding">Padding</Label>
          <Input
            id="style-padding"
            value={style.padding || ""}
            placeholder="e.g., 1rem or 16px"
            onChange={(e) => handleStyleChange("padding", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="style-margin">Margin</Label>
          <Input
            id="style-margin"
            value={style.margin || ""}
            placeholder="e.g., 1rem 0"
            onChange={(e) => handleStyleChange("margin", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="style-color">Text Color</Label>
          <Input
            id="style-color"
            type="color"
            value={style.color || "#000000"}
            onChange={(e) => handleStyleChange("color", e.target.value)}
            className="w-full h-10 p-1"
          />
        </div>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-foreground">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Select a component to edit its properties.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-foreground capitalize">{selectedComponent.type} Properties</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="pt-4">
              {renderContentEditor()}
            </TabsContent>
            <TabsContent value="style" className="pt-4">
              {renderStyleEditor()}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-muted/50">
        <Button onClick={handleSave} className="w-full" disabled={saveStatus === "saving"}>
          {saveStatus === "saving" && <Sliders className="w-4 h-4 mr-2 animate-spin" />}
          {saveStatus === "saving" ? (
            "Saving..."
          ) : saveStatus === "saved" ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saveStatus === "saved" ? "Saved!" : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

export default PropertiesPanel
