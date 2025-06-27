"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEditor } from "./EditorContext"
import { Settings, Palette, Type, Trash2, Copy, Code } from "lucide-react"

export function PropertiesPanel() {
  const { state, updateComponentContent, updateComponentStyle, deleteComponent, duplicateComponent } = useEditor()
  const [expandedSections, setExpandedSections] = useState<string[]>(["content", "style"])

  const selectedComponent = state.components.find((c) => c.id === state.selectedComponent)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Properties</h2>
              <p className="text-sm text-muted-foreground">Select a component to edit</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Component Selected</h3>
            <p className="text-muted-foreground max-w-sm">
              Click on a component in the canvas to view and edit its properties.
            </p>
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

  const handleDuplicate = () => {
    duplicateComponent(selectedComponent.id)
  }

  const renderContentEditor = () => {
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image-width">Width</Label>
                <Input
                  id="image-width"
                  value={selectedComponent.content.width || ""}
                  onChange={(e) => handleContentUpdate({ width: e.target.value })}
                  placeholder="100%"
                />
              </div>
              <div>
                <Label htmlFor="image-height">Height</Label>
                <Input
                  id="image-height"
                  value={selectedComponent.content.height || ""}
                  onChange={(e) => handleContentUpdate({ height: e.target.value })}
                  placeholder="auto"
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
                onChange={(e) => handleContentUpdate({ text: e.target.value })}
                placeholder="Button text"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => handleContentUpdate({ link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="button-size">Size</Label>
                <Select
                  value={selectedComponent.content.size || "default"}
                  onValueChange={(value) => handleContentUpdate({ size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="icon">Icon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "htmlBlock":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">HTML Content</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedComponent.content.category === "tailgrids" ? "TailGrids Component" : "Custom HTML Block"}
                </p>
              </div>
              {selectedComponent.content.category === "tailgrids" && (
                <Badge variant="secondary" className="text-xs">
                  TailGrids
                </Badge>
              )}
            </div>

            <div>
              <Label htmlFor="html-name">Name</Label>
              <Input
                id="html-name"
                value={selectedComponent.content.name || ""}
                onChange={(e) => handleContentUpdate({ name: e.target.value })}
                placeholder="Component name"
              />
            </div>

            {selectedComponent.content.editable && (
              <div>
                <Label htmlFor="html-content">HTML Content</Label>
                <Textarea
                  id="html-content"
                  value={selectedComponent.content.htmlContent || ""}
                  onChange={(e) => handleContentUpdate({ htmlContent: e.target.value })}
                  placeholder="Enter HTML content"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="html-responsive"
                checked={selectedComponent.content.responsive || false}
                onCheckedChange={(checked) => handleContentUpdate({ responsive: checked })}
              />
              <Label htmlFor="html-responsive" className="text-sm">
                Responsive
              </Label>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <Code className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Content editor for {selectedComponent.type} coming soon</p>
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bg-color">Background</Label>
            <Input
              id="bg-color"
              type="color"
              value={selectedComponent.style.backgroundColor || "#ffffff"}
              onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <Input
              id="text-color"
              type="color"
              value={selectedComponent.style.textColor || "#000000"}
              onChange={(e) => handleStyleUpdate({ textColor: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="text-align">Text Alignment</Label>
          <Select
            value={selectedComponent.style.textAlign || "left"}
            onValueChange={(value) => handleStyleUpdate({ textAlign: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="justify">Justify</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="padding">Padding</Label>
            <Input
              id="padding"
              value={selectedComponent.style.padding || ""}
              onChange={(e) => handleStyleUpdate({ padding: e.target.value })}
              placeholder="16px"
            />
          </div>
          <div>
            <Label htmlFor="margin">Margin</Label>
            <Input
              id="margin"
              value={selectedComponent.style.margin || ""}
              onChange={(e) => handleStyleUpdate({ margin: e.target.value })}
              placeholder="16px"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="border-radius">Border Radius</Label>
          <Input
            id="border-radius"
            value={selectedComponent.style.borderRadius || ""}
            onChange={(e) => handleStyleUpdate({ borderRadius: e.target.value })}
            placeholder="8px"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Properties</h2>
              <p className="text-sm text-muted-foreground">
                {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            ID: {selectedComponent.id.split("-")[0]}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDuplicate} className="flex-1 bg-transparent">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="content">
              <Type className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style">
              <Palette className="h-4 w-4 mr-2" />
              Style
            </TabsTrigger>
          </TabsList>

          <div className="p-4 pt-0">
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Settings</CardTitle>
                </CardHeader>
                <CardContent>{renderContentEditor()}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Style Settings</CardTitle>
                </CardHeader>
                <CardContent>{renderStyleEditor()}</CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </ScrollArea>
    </div>
  )
}
