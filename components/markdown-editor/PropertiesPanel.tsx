"use client"
import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Palette, Layout, Type, ChevronDown, ChevronRight, Sliders, Save, Check } from "lucide-react"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent, ComponentStyle } from "./types"

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
  onUpdateComponent: (updates: Partial<MarkdownComponent>) => void
  onUpdateStyle: (styleUpdates: Partial<ComponentStyle>) => void
}

export function PropertiesPanel({ selectedComponent, onUpdateComponent, onUpdateStyle }: PropertiesPanelProps) {
  const { updateComponentContent, updateComponentStyle } = useEditor()
  const [expandedSections, setExpandedSections] = useState<string[]>(["content", "style"])
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const updateContent = (field: string, value: any) => {
    if (!selectedComponent) return
    updateComponentContent(selectedComponent.id, { [field]: value })
  }

  const updateStyle = (field: string, value: any) => {
    if (!selectedComponent) return
    updateComponentStyle(selectedComponent.id, { [field]: value })
  }

  const handleSave = async () => {
    setSaveStatus("saving")
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 500))
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
              <Label htmlFor="heading-text" className="text-foreground">
                Text
              </Label>
              <Input
                id="heading-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Heading text"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="heading-level" className="text-foreground">
                Level
              </Label>
              <Select
                value={selectedComponent.content.level?.toString() || "2"}
                onValueChange={(value) => updateContent("level", Number.parseInt(value))}
              >
                <SelectTrigger className="bg-background border-border">
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
            <Label htmlFor="paragraph-text" className="text-foreground">
              Text
            </Label>
            <Textarea
              id="paragraph-text"
              value={selectedComponent.content.text || ""}
              onChange={(e) => updateContent("text", e.target.value)}
              placeholder="Paragraph text"
              rows={4}
              className="bg-background border-border text-foreground"
            />
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src" className="text-foreground">
                Image URL
              </Label>
              <Input
                id="image-src"
                value={selectedComponent.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="image-alt" className="text-foreground">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => updateContent("alt", e.target.value)}
                placeholder="Describe the image"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="image-caption" className="text-foreground">
                Caption
              </Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => updateContent("caption", e.target.value)}
                placeholder="Image caption"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="image-width" className="text-foreground">
                  Width
                </Label>
                <Input
                  id="image-width"
                  value={selectedComponent.content.width || ""}
                  onChange={(e) => updateContent("width", e.target.value)}
                  placeholder="100%, 400px"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="image-height" className="text-foreground">
                  Height
                </Label>
                <Input
                  id="image-height"
                  value={selectedComponent.content.height || ""}
                  onChange={(e) => updateContent("height", e.target.value)}
                  placeholder="auto, 300px"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text" className="text-foreground">
                Text
              </Label>
              <Input
                id="button-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Button text"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="button-link" className="text-foreground">
                Link (optional)
              </Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => updateContent("link", e.target.value)}
                placeholder="https://example.com"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="button-variant" className="text-foreground">
                  Variant
                </Label>
                <Select
                  value={selectedComponent.content.variant || "default"}
                  onValueChange={(value) => updateContent("variant", value)}
                >
                  <SelectTrigger className="bg-background border-border">
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
                <Label htmlFor="button-size" className="text-foreground">
                  Size
                </Label>
                <Select
                  value={selectedComponent.content.size || "default"}
                  onValueChange={(value) => updateContent("size", value)}
                >
                  <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="card-title" className="text-foreground">
                Title
              </Label>
              <Input
                id="card-title"
                value={selectedComponent.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Card title"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="card-description" className="text-foreground">
                Description
              </Label>
              <Textarea
                id="card-description"
                value={selectedComponent.content.description || ""}
                onChange={(e) => updateContent("description", e.target.value)}
                placeholder="Card description"
                rows={3}
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="card-image" className="text-foreground">
                Image URL (optional)
              </Label>
              <Input
                id="card-image"
                value={selectedComponent.content.imageUrl || ""}
                onChange={(e) => updateContent("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="card-layout" className="text-foreground">
                Layout
              </Label>
              <Select
                value={selectedComponent.content.layout || "default"}
                onValueChange={(value) => updateContent("layout", value)}
              >
                <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="chart-type" className="text-foreground">
                Chart Type
              </Label>
              <Select
                value={selectedComponent.content.type || "bar"}
                onValueChange={(value) => updateContent("type", value)}
              >
                <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="chart-title" className="text-foreground">
                Title
              </Label>
              <Input
                id="chart-title"
                value={selectedComponent.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Chart title"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>
        )

      case "grid":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="grid-columns" className="text-foreground">
                Columns
              </Label>
              <Input
                id="grid-columns"
                type="number"
                min="1"
                max="6"
                value={selectedComponent.content.columns || 3}
                onChange={(e) => updateContent("columns", Number(e.target.value))}
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="grid-gap" className="text-foreground">
                Gap
              </Label>
              <Input
                id="grid-gap"
                value={selectedComponent.content.gap || "1.5rem"}
                onChange={(e) => updateContent("gap", e.target.value)}
                placeholder="1.5rem, 24px"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
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
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span className="font-medium text-foreground">Typography</span>
            </div>
            {expandedSections.includes("typography") ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="font-size" className="text-foreground">
                  Font Size
                </Label>
                <Input
                  id="font-size"
                  value={style.fontSize || ""}
                  onChange={(e) => updateStyle("fontSize", e.target.value)}
                  placeholder="16px, 1rem"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="font-weight" className="text-foreground">
                  Font Weight
                </Label>
                <Select
                  value={style.fontWeight?.toString() || ""}
                  onValueChange={(value) => updateStyle("fontWeight", value)}
                >
                  <SelectTrigger className="bg-background border-border">
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
              <Label htmlFor="text-color" className="text-foreground">
                Text Color
              </Label>
              <Input
                id="text-color"
                type="color"
                value={style.color || "#000000"}
                onChange={(e) => updateStyle("color", e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="text-align" className="text-foreground">
                Text Align
              </Label>
              <Select value={style.textAlign || ""} onValueChange={(value) => updateStyle("textAlign", value)}>
                <SelectTrigger className="bg-background border-border">
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
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              <span className="font-medium text-foreground">Layout</span>
            </div>
            {expandedSections.includes("layout") ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width" className="text-foreground">
                  Width
                </Label>
                <Input
                  id="width"
                  value={style.width || ""}
                  onChange={(e) => updateStyle("width", e.target.value)}
                  placeholder="100%, 400px"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="height" className="text-foreground">
                  Height
                </Label>
                <Input
                  id="height"
                  value={style.height || ""}
                  onChange={(e) => updateStyle("height", e.target.value)}
                  placeholder="auto, 300px"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="padding" className="text-foreground">
                  Padding
                </Label>
                <Input
                  id="padding"
                  value={style.padding || ""}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                  placeholder="16px, 1rem"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="margin" className="text-foreground">
                  Margin
                </Label>
                <Input
                  id="margin"
                  value={style.margin || ""}
                  onChange={(e) => updateStyle("margin", e.target.value)}
                  placeholder="16px, 1rem"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Appearance */}
        <Collapsible open={expandedSections.includes("appearance")} onOpenChange={() => toggleSection("appearance")}>
          <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="font-medium text-foreground">Appearance</span>
            </div>
            {expandedSections.includes("appearance") ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-2">
            <div>
              <Label htmlFor="bg-color" className="text-foreground">
                Background Color
              </Label>
              <Input
                id="bg-color"
                type="color"
                value={style.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div>
              <Label htmlFor="border" className="text-foreground">
                Border
              </Label>
              <Input
                id="border"
                value={style.border || ""}
                onChange={(e) => updateStyle("border", e.target.value)}
                placeholder="1px solid #ccc"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="border-radius" className="text-foreground">
                Border Radius
              </Label>
              <Input
                id="border-radius"
                value={style.borderRadius || ""}
                onChange={(e) => updateStyle("borderRadius", e.target.value)}
                placeholder="8px, 0.5rem"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="box-shadow" className="text-foreground">
                Box Shadow
              </Label>
              <Input
                id="box-shadow"
                value={style.boxShadow || ""}
                onChange={(e) => updateStyle("boxShadow", e.target.value)}
                placeholder="0 4px 6px rgba(0,0,0,0.1)"
                className="bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="opacity" className="text-foreground">
                Opacity
              </Label>
              <Input
                id="opacity"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={style.opacity || 1}
                onChange={(e) => updateStyle("opacity", Number.parseFloat(e.target.value))}
                className="bg-background border-border"
              />
              <div className="text-xs text-muted-foreground mt-1">{((style.opacity || 1) * 100).toFixed(0)}%</div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card">
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Settings className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Properties</h2>
              <p className="text-sm text-muted-foreground">No component selected</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary">
            <Settings className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Properties</h2>
            <p className="text-sm text-muted-foreground">Edit component properties</p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <Tabs defaultValue="content" className="space-y-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
          <TabsContent value="content">{renderContentEditor()}</TabsContent>
          <TabsContent value="style">{renderStyleEditor()}</TabsContent>
        </Tabs>
      </ScrollArea>
      <div className="p-4 border-t border-border bg-muted/50">
        <Button onClick={handleSave} className="w-full">
          {saveStatus === "saving" ? (
            <span className="flex items-center justify-center gap-2">
              Saving...
              <Sliders className="w-4 h-4 animate-spin" />
            </span>
          ) : saveStatus === "saved" ? (
            <span className="flex items-center justify-center gap-2">
              Saved
              <Check className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Save
              <Save className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
