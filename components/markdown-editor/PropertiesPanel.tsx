"use client"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Check, Sliders } from "lucide-react"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
}

export function PropertiesPanel({ selectedComponent }: PropertiesPanelProps) {
  const { updateComponentContent, updateComponentStyle } = useEditor()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const handleSave = async () => {
    setSaveStatus("saving")
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Level</Label>
              <Select
                value={String(selectedComponent.content.level || "2")}
                onValueChange={(value) => updateComponentContent(selectedComponent.id, { level: Number(value) })}
              >
                <SelectTrigger>
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
              onChange={(e) => updateComponentContent(selectedComponent.id, { text: e.target.value })}
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { src: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => updateComponentContent(selectedComponent.id, { alt: e.target.value })}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption</Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => updateComponentContent(selectedComponent.id, { caption: e.target.value })}
                placeholder="Image caption"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="image-width">Width</Label>
                <Input
                  id="image-width"
                  value={selectedComponent.content.width || ""}
                  onChange={(e) => updateComponentContent(selectedComponent.id, { width: e.target.value })}
                  placeholder="100%, 400px"
                />
              </div>
              <div>
                <Label htmlFor="image-height">Height</Label>
                <Input
                  id="image-height"
                  value={selectedComponent.content.height || ""}
                  onChange={(e) => updateComponentContent(selectedComponent.id, { height: e.target.value })}
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { text: e.target.value })}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link (optional)</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => updateComponentContent(selectedComponent.id, { link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="button-variant">Variant</Label>
                <Select
                  value={selectedComponent.content.variant || "default"}
                  onValueChange={(value) => updateComponentContent(selectedComponent.id, { variant: value })}
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
                  onValueChange={(value) => updateComponentContent(selectedComponent.id, { size: value })}
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { title: e.target.value })}
                placeholder="Card title"
              />
            </div>
            <div>
              <Label htmlFor="card-description">Description</Label>
              <Textarea
                id="card-description"
                value={selectedComponent.content.description || ""}
                onChange={(e) => updateComponentContent(selectedComponent.id, { description: e.target.value })}
                rows={3}
                placeholder="Card description"
              />
            </div>
            <div>
              <Label htmlFor="card-image">Image URL (optional)</Label>
              <Input
                id="card-image"
                value={selectedComponent.content.imageUrl || ""}
                onChange={(e) => updateComponentContent(selectedComponent.id, { imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="card-layout">Layout</Label>
              <Select
                value={selectedComponent.content.layout || "default"}
                onValueChange={(value) => updateComponentContent(selectedComponent.id, { layout: value })}
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
                onValueChange={(value) => updateComponentContent(selectedComponent.id, { type: value })}
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { title: e.target.value })}
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
                onChange={(e) => updateComponentContent(selectedComponent.id, { columns: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="grid-gap">Gap</Label>
              <Input
                id="grid-gap"
                value={selectedComponent.content.gap || "1.5rem"}
                onChange={(e) => updateComponentContent(selectedComponent.id, { gap: e.target.value })}
                placeholder="1.5rem, 24px"
              />
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <p>No content properties for this component.</p>
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
            onChange={(e) => updateComponentStyle(selectedComponent.id, { padding: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="style-margin">Margin</Label>
          <Input
            id="style-margin"
            value={style.margin || ""}
            placeholder="e.g., 1rem 0"
            onChange={(e) => updateComponentStyle(selectedComponent.id, { margin: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="style-color">Text Color</Label>
          <Input
            id="style-color"
            type="color"
            value={style.color || "#000000"}
            onChange={(e) => updateComponentStyle(selectedComponent.id, { color: e.target.value })}
            className="w-full h-10"
          />
        </div>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Select a component to edit</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground capitalize">{selectedComponent.type} Properties</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content">
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
      <div className="p-4 border-t border-border bg-muted/50">
        <Button onClick={handleSave} className="w-full">
          {saveStatus === "saving" ? (
            <span className="flex items-center justify-center gap-2">
              <Sliders className="w-4 h-4 animate-spin" /> Saving...
            </span>
          ) : saveStatus === "saved" ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Saved
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}

export default PropertiesPanel
