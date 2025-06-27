"use client"
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
import { Settings, Palette, Type, Trash2, Copy, Code, Edit3 } from "lucide-react"

export function PropertiesPanel() {
  const { state, updateComponentContent, updateComponentStyle, deleteComponent, duplicateComponent } = useEditor()

  const selectedComponent = state.components.find((c) => c.id === state.selectedComponent)

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-white border-r border-[#dfe1e6]">
        <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#6b778c] text-white">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#172b4d]">Properties</h2>
              <p className="text-sm text-[#6b778c]">Select an element to edit</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f4f5f7] flex items-center justify-center">
              <Settings className="h-8 w-8 text-[#6b778c]" />
            </div>
            <h3 className="text-lg font-semibold text-[#172b4d] mb-2">No Element Selected</h3>
            <p className="text-[#6b778c] max-w-sm text-sm leading-relaxed">
              Click on an element in the editor to view and modify its properties, styling, and content.
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
              <Label htmlFor="heading-text" className="text-[#172b4d] font-medium">
                Text
              </Label>
              <Input
                id="heading-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => handleContentUpdate({ text: e.target.value })}
                placeholder="Enter heading text"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
            <div>
              <Label htmlFor="heading-level" className="text-[#172b4d] font-medium">
                Level
              </Label>
              <Select
                value={selectedComponent.content.level?.toString() || "2"}
                onValueChange={(value) => handleContentUpdate({ level: Number.parseInt(value) })}
              >
                <SelectTrigger className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1 - Page Title</SelectItem>
                  <SelectItem value="2">H2 - Section</SelectItem>
                  <SelectItem value="3">H3 - Subsection</SelectItem>
                  <SelectItem value="4">H4 - Minor Heading</SelectItem>
                  <SelectItem value="5">H5 - Small Heading</SelectItem>
                  <SelectItem value="6">H6 - Tiny Heading</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "paragraph":
        return (
          <div>
            <Label htmlFor="paragraph-text" className="text-[#172b4d] font-medium">
              Text Content
            </Label>
            <Textarea
              id="paragraph-text"
              value={selectedComponent.content.text || ""}
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              placeholder="Enter paragraph text"
              rows={6}
              className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] mt-2"
            />
            <p className="text-xs text-[#6b778c] mt-2">
              You can use basic formatting like **bold** and *italic* in your text.
            </p>
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src" className="text-[#172b4d] font-medium">
                Image URL
              </Label>
              <Input
                id="image-src"
                value={selectedComponent.content.src || ""}
                onChange={(e) => handleContentUpdate({ src: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
            <div>
              <Label htmlFor="image-alt" className="text-[#172b4d] font-medium">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt || ""}
                onChange={(e) => handleContentUpdate({ alt: e.target.value })}
                placeholder="Describe the image for accessibility"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
            <div>
              <Label htmlFor="image-caption" className="text-[#172b4d] font-medium">
                Caption (Optional)
              </Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => handleContentUpdate({ caption: e.target.value })}
                placeholder="Image caption"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
          </div>
        )

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text" className="text-[#172b4d] font-medium">
                Button Text
              </Label>
              <Input
                id="button-text"
                value={selectedComponent.content.text || ""}
                onChange={(e) => handleContentUpdate({ text: e.target.value })}
                placeholder="Button text"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
            <div>
              <Label htmlFor="button-link" className="text-[#172b4d] font-medium">
                Link URL
              </Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link || ""}
                onChange={(e) => handleContentUpdate({ link: e.target.value })}
                placeholder="https://example.com"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="button-variant" className="text-[#172b4d] font-medium">
                  Style
                </Label>
                <Select
                  value={selectedComponent.content.variant || "default"}
                  onValueChange={(value) => handleContentUpdate({ variant: value })}
                >
                  <SelectTrigger className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="button-size" className="text-[#172b4d] font-medium">
                  Size
                </Label>
                <Select
                  value={selectedComponent.content.size || "default"}
                  onValueChange={(value) => handleContentUpdate({ size: value })}
                >
                  <SelectTrigger className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]">
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

      case "htmlBlock":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-[#172b4d] font-medium">Macro Content</Label>
                <p className="text-xs text-[#6b778c] mt-1">
                  {selectedComponent.content.category === "confluence" ? "Confluence Macro" : "Custom HTML Block"}
                </p>
              </div>
              {selectedComponent.content.category === "confluence" && (
                <Badge variant="secondary" className="text-xs bg-[#e3fcef] text-[#00875a] border-[#00875a]">
                  Confluence
                </Badge>
              )}
            </div>

            <div>
              <Label htmlFor="html-name" className="text-[#172b4d] font-medium">
                Name
              </Label>
              <Input
                id="html-name"
                value={selectedComponent.content.name || ""}
                onChange={(e) => handleContentUpdate({ name: e.target.value })}
                placeholder="Macro name"
                className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>

            {selectedComponent.content.editable && (
              <div>
                <Label htmlFor="html-content" className="text-[#172b4d] font-medium">
                  HTML Content
                </Label>
                <Textarea
                  id="html-content"
                  value={selectedComponent.content.htmlContent || ""}
                  onChange={(e) => handleContentUpdate({ htmlContent: e.target.value })}
                  placeholder="Enter HTML content"
                  rows={8}
                  className="font-mono text-sm border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="html-responsive"
                checked={selectedComponent.content.responsive || false}
                onCheckedChange={(checked) => handleContentUpdate({ responsive: checked })}
              />
              <Label htmlFor="html-responsive" className="text-sm text-[#172b4d]">
                Responsive design
              </Label>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <Code className="h-8 w-8 mx-auto mb-2 text-[#6b778c]" />
            <p className="text-sm text-[#6b778c]">Content editor for {selectedComponent.type} is coming soon</p>
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bg-color" className="text-[#172b4d] font-medium">
              Background
            </Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="bg-color"
                type="color"
                value={selectedComponent.style.backgroundColor || "#ffffff"}
                onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
                className="w-12 h-8 p-1 border-[#dfe1e6]"
              />
              <Input
                value={selectedComponent.style.backgroundColor || "#ffffff"}
                onChange={(e) => handleStyleUpdate({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
                className="flex-1 border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="text-color" className="text-[#172b4d] font-medium">
              Text Color
            </Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="text-color"
                type="color"
                value={selectedComponent.style.textColor || "#172b4d"}
                onChange={(e) => handleStyleUpdate({ textColor: e.target.value })}
                className="w-12 h-8 p-1 border-[#dfe1e6]"
              />
              <Input
                value={selectedComponent.style.textColor || "#172b4d"}
                onChange={(e) => handleStyleUpdate({ textColor: e.target.value })}
                placeholder="#172b4d"
                className="flex-1 border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="text-align" className="text-[#172b4d] font-medium">
            Text Alignment
          </Label>
          <Select
            value={selectedComponent.style.textAlign || "left"}
            onValueChange={(value) => handleStyleUpdate({ textAlign: value })}
          >
            <SelectTrigger className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]">
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
            <Label htmlFor="padding" className="text-[#172b4d] font-medium">
              Padding
            </Label>
            <Input
              id="padding"
              value={selectedComponent.style.padding || ""}
              onChange={(e) => handleStyleUpdate({ padding: e.target.value })}
              placeholder="16px"
              className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
            />
          </div>
          <div>
            <Label htmlFor="margin" className="text-[#172b4d] font-medium">
              Margin
            </Label>
            <Input
              id="margin"
              value={selectedComponent.style.margin || ""}
              onChange={(e) => handleStyleUpdate({ margin: e.target.value })}
              placeholder="16px"
              className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="border-radius" className="text-[#172b4d] font-medium">
            Border Radius
          </Label>
          <Input
            id="border-radius"
            value={selectedComponent.style.borderRadius || ""}
            onChange={(e) => handleStyleUpdate({ borderRadius: e.target.value })}
            placeholder="8px"
            className="border-[#dfe1e6] focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc]"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0052cc] text-white">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#172b4d]">Properties</h2>
              <p className="text-sm text-[#6b778c]">
                {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Element
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-mono bg-white border-[#dfe1e6] text-[#6b778c]">
            {selectedComponent.id.split("-")[0]}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicate}
            className="flex-1 border-[#dfe1e6] text-[#6b778c] hover:text-[#172b4d] hover:bg-[#f4f5f7] bg-transparent"
          >
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 border-[#de350b] text-[#de350b] hover:bg-[#ffebe6] hover:border-[#de350b] bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-4 bg-[#f4f5f7] border border-[#dfe1e6]">
            <TabsTrigger value="content" className="data-[state=active]:bg-white data-[state=active]:text-[#0052cc]">
              <Type className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="style" className="data-[state=active]:bg-white data-[state=active]:text-[#0052cc]">
              <Palette className="h-4 w-4 mr-2" />
              Style
            </TabsTrigger>
          </TabsList>

          <div className="p-4 pt-0">
            <TabsContent value="content">
              <Card className="border-[#dfe1e6]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#172b4d] flex items-center gap-2">
                    <Edit3 className="h-4 w-4" />
                    Content Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>{renderContentEditor()}</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style">
              <Card className="border-[#dfe1e6]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#172b4d] flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Style Settings
                  </CardTitle>
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
