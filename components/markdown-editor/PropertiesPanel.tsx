"use client"

import React from "react"
import { useDebounce } from "use-debounce"

import { useEditor } from "./EditorContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ComponentStyle, MarkdownComponent } from "./types"
import {
  ChevronDown,
  Palette,
  Settings,
  CodeIcon,
  ImageIcon as ImageIconProp,
  Columns,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  PaletteIcon,
} from "lucide-react"

// Debounced input component
const DebouncedInput: React.FC<React.ComponentProps<typeof Input> & { onDebouncedChange: (value: string) => void }> = ({
  onDebouncedChange,
  ...props
}) => {
  const [value, setValue] = React.useState(props.defaultValue || props.value || "")
  const [debouncedValue] = useDebounce(value, 300)

  React.useEffect(() => {
    onDebouncedChange(debouncedValue)
  }, [debouncedValue, onDebouncedChange])

  return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

const DebouncedTextarea: React.FC<
  React.ComponentProps<typeof Textarea> & { onDebouncedChange: (value: string) => void }
> = ({ onDebouncedChange, ...props }) => {
  const [value, setValue] = React.useState(props.defaultValue || props.value || "")
  const [debouncedValue] = useDebounce(value, 300)

  React.useEffect(() => {
    onDebouncedChange(debouncedValue)
  }, [debouncedValue, onDebouncedChange])

  return <Textarea {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

// Helper for style updates
const StyleInput: React.FC<{
  label: string
  value: string | number | undefined
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}> = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div>
    <Label htmlFor={`style-${label.toLowerCase().replace(" ", "-")}`} className="text-xs text-muted-foreground">
      {label}
    </Label>
    <DebouncedInput
      id={`style-${label.toLowerCase().replace(" ", "-")}`}
      defaultValue={value || ""}
      onDebouncedChange={onChange}
      placeholder={placeholder}
      type={type}
      className="h-8 text-sm"
    />
  </div>
)

const ColorInput: React.FC<{ label: string; value: string | undefined; onChange: (value: string) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <div>
    <Label htmlFor={`style-${label.toLowerCase()}`} className="text-xs text-muted-foreground">
      {label}
    </Label>
    <div className="flex items-center gap-2">
      <Input
        id={`style-${label.toLowerCase()}`}
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 p-1"
      />
      <DebouncedInput
        type="text"
        defaultValue={value || ""}
        onDebouncedChange={onChange}
        placeholder="#RRGGBB"
        className="h-8 text-sm flex-1"
      />
    </div>
  </div>
)

const ToggleGroup: React.FC<{
  label: string
  options: { value: string; icon: React.ElementType; label: string }[]
  value: string | undefined
  onValueChange: (value: string) => void
}> = ({ label, options, value, onValueChange }) => (
  <div>
    <Label className="text-xs text-muted-foreground mb-1 block">{label}</Label>
    <div className="flex space-x-1">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? "secondary" : "outline"}
          size="icon_sm" // Custom size or adjust padding
          onClick={() => onValueChange(opt.value === value ? "" : opt.value)} // Toggle off if same value clicked
          title={opt.label}
          className="p-2 h-8 w-8"
        >
          <opt.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  </div>
)

export function PropertiesPanel() {
  const { state, updateComponentContent, updateComponentStyle, selectComponent } = useEditor()
  const selectedComponent = state.components.find((c) => c.id === state.selectedComponent)

  if (!selectedComponent) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-background dark:bg-neutral-900">
        <PaletteIcon className="w-12 h-12 text-muted-foreground mb-4" strokeWidth={1} />
        <h3 className="text-lg font-semibold text-foreground">Properties</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Select a component on the canvas to view and edit its properties here.
        </p>
      </div>
    )
  }

  const handleContentChange = (field: string, value: any) => {
    updateComponentContent(selectedComponent.id, { [field]: value })
  }

  const handleStyleChange = (field: keyof ComponentStyle, value: any) => {
    updateComponentStyle(selectedComponent.id, { [field]: value })
  }

  const handleNestedStyleChange = (group: keyof ComponentStyle, field: string, value: any) => {
    const currentGroupStyle = (selectedComponent.style?.[group] as Record<string, any>) || {}
    updateComponentStyle(selectedComponent.id, { [group]: { ...currentGroupStyle, [field]: value } })
  }

  const commonStyleControls = (
    <AccordionItem value="common-styles">
      <AccordionTrigger className="text-sm font-medium">Common Styles</AccordionTrigger>
      <AccordionContent className="space-y-3 pt-2">
        <StyleInput
          label="Custom CSS Class"
          value={selectedComponent.style?.className}
          onChange={(v) => handleStyleChange("className", v)}
          placeholder="e.g., my-custom-style"
        />
        <ColorInput
          label="Text Color"
          value={selectedComponent.style?.color}
          onChange={(v) => handleStyleChange("color", v)}
        />
        <ColorInput
          label="Background Color"
          value={selectedComponent.style?.backgroundColor}
          onChange={(v) => handleStyleChange("backgroundColor", v)}
        />
        <StyleInput
          label="Font Size (e.g., 16px, 1.2em)"
          value={selectedComponent.style?.fontSize}
          onChange={(v) => handleStyleChange("fontSize", v)}
          placeholder="16px"
        />
        <ToggleGroup
          label="Text Align"
          value={selectedComponent.style?.textAlign}
          onValueChange={(v) => handleStyleChange("textAlign", v)}
          options={[
            { value: "left", icon: AlignLeft, label: "Left" },
            { value: "center", icon: AlignCenter, label: "Center" },
            { value: "right", icon: AlignRight, label: "Right" },
            { value: "justify", icon: AlignJustify, label: "Justify" },
          ]}
        />
      </AccordionContent>
    </AccordionItem>
  )

  const textStyleControls = (
    <AccordionItem value="text-styles">
      <AccordionTrigger className="text-sm font-medium">Text Formatting</AccordionTrigger>
      <AccordionContent className="space-y-3 pt-2">
        <ToggleGroup
          label="Font Weight"
          value={selectedComponent.style?.fontWeight}
          onValueChange={(v) => handleStyleChange("fontWeight", v)}
          options={[{ value: "bold", icon: Bold, label: "Bold" }]}
        />
        <ToggleGroup
          label="Font Style"
          value={selectedComponent.style?.fontStyle}
          onValueChange={(v) => handleStyleChange("fontStyle", v)}
          options={[{ value: "italic", icon: Italic, label: "Italic" }]}
        />
        <ToggleGroup
          label="Text Decoration"
          value={selectedComponent.style?.textDecoration}
          onValueChange={(v) => handleStyleChange("textDecoration", v)}
          options={[
            { value: "underline", icon: Underline, label: "Underline" },
            { value: "line-through", icon: Strikethrough, label: "Strikethrough" },
          ]}
        />
      </AccordionContent>
    </AccordionItem>
  )

  const boxModelControls = (
    <AccordionItem value="box-model">
      <AccordionTrigger className="text-sm font-medium">Layout & Spacing</AccordionTrigger>
      <AccordionContent className="space-y-3 pt-2">
        <StyleInput
          label="Width (e.g., 100%, 300px)"
          value={selectedComponent.style?.width}
          onChange={(v) => handleStyleChange("width", v)}
          placeholder="auto"
        />
        <StyleInput
          label="Height (e.g., auto, 100px)"
          value={selectedComponent.style?.height}
          onChange={(v) => handleStyleChange("height", v)}
          placeholder="auto"
        />
        <StyleInput
          label="Padding (e.g., 10px, 1rem 2rem)"
          value={selectedComponent.style?.padding}
          onChange={(v) => handleStyleChange("padding", v)}
          placeholder="0px"
        />
        <StyleInput
          label="Margin (e.g., 10px auto)"
          value={selectedComponent.style?.margin}
          onChange={(v) => handleStyleChange("margin", v)}
          placeholder="0px"
        />
        <StyleInput
          label="Border (e.g., 1px solid #ccc)"
          value={selectedComponent.style?.border}
          onChange={(v) => handleStyleChange("border", v)}
          placeholder="none"
        />
        <StyleInput
          label="Border Radius (e.g., 8px, 50%)"
          value={selectedComponent.style?.borderRadius}
          onChange={(v) => handleStyleChange("borderRadius", v)}
          placeholder="0px"
        />
      </AccordionContent>
    </AccordionItem>
  )

  const effectsControls = (
    <AccordionItem value="effects-styles">
      <AccordionTrigger className="text-sm font-medium">Effects</AccordionTrigger>
      <AccordionContent className="space-y-3 pt-2">
        <StyleInput
          label="Box Shadow (e.g., 0 2px 4px #0001)"
          value={selectedComponent.style?.boxShadow}
          onChange={(v) => handleStyleChange("boxShadow", v)}
          placeholder="none"
        />
        <StyleInput
          label="Opacity (0-1)"
          value={selectedComponent.style?.opacity}
          onChange={(v) => handleStyleChange("opacity", Number.parseFloat(v))}
          placeholder="1"
          type="number"
        />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="hover-effects" className="border-b-0">
            <AccordionTrigger className="text-xs font-normal py-2 text-muted-foreground hover:no-underline">
              Hover Effects
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-1">
              <ColorInput
                label="Hover BG Color"
                value={selectedComponent.style?.hover?.backgroundColor}
                onChange={(v) => handleNestedStyleChange("hover", "backgroundColor", v)}
              />
              <ColorInput
                label="Hover Text Color"
                value={selectedComponent.style?.hover?.color}
                onChange={(v) => handleNestedStyleChange("hover", "color", v)}
              />
              <StyleInput
                label="Hover Box Shadow"
                value={selectedComponent.style?.hover?.boxShadow}
                onChange={(v) => handleNestedStyleChange("hover", "boxShadow", v)}
              />
              <StyleInput
                label="Hover Transform (e.g. scale(1.05))"
                value={selectedComponent.style?.hover?.transform}
                onChange={(v) => handleNestedStyleChange("hover", "transform", v)}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )

  const renderSpecificControls = () => {
    switch (selectedComponent.type) {
      case "heading":
        return (
          <div className="space-y-3">
            <Label htmlFor="heading-text">Text</Label>
            <DebouncedInput
              id="heading-text"
              defaultValue={selectedComponent.content.text}
              onDebouncedChange={(v) => handleContentChange("text", v)}
            />
            <Label htmlFor="heading-level">Level</Label>
            <Select
              value={selectedComponent.content.level.toString()}
              onValueChange={(v) => handleContentChange("level", Number.parseInt(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((lvl) => (
                  <SelectItem key={lvl} value={lvl.toString()}>
                    H{lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case "paragraph":
        return (
          <div className="space-y-3">
            <Label htmlFor="paragraph-text">Text</Label>
            <DebouncedTextarea
              id="paragraph-text"
              defaultValue={selectedComponent.content.text}
              onDebouncedChange={(v) => handleContentChange("text", v)}
              rows={5}
            />
          </div>
        )
      case "image":
        return (
          <div className="space-y-3">
            <Label htmlFor="image-src">Image URL</Label>
            <DebouncedInput
              id="image-src"
              defaultValue={selectedComponent.content.src}
              onDebouncedChange={(v) => handleContentChange("src", v)}
            />
            <Label htmlFor="image-alt">Alt Text</Label>
            <DebouncedInput
              id="image-alt"
              defaultValue={selectedComponent.content.alt}
              onDebouncedChange={(v) => handleContentChange("alt", v)}
            />
            <Label htmlFor="image-caption">Caption</Label>
            <DebouncedInput
              id="image-caption"
              defaultValue={selectedComponent.content.caption || ""}
              onDebouncedChange={(v) => handleContentChange("caption", v)}
            />
          </div>
        )
      case "code":
        return (
          <div className="space-y-3">
            <Label htmlFor="code-language">Language</Label>
            <DebouncedInput
              id="code-language"
              defaultValue={selectedComponent.content.language}
              onDebouncedChange={(v) => handleContentChange("language", v)}
            />
            <Label htmlFor="code-content">Code</Label>
            <DebouncedTextarea
              id="code-content"
              defaultValue={selectedComponent.content.code}
              onDebouncedChange={(v) => handleContentChange("code", v)}
              rows={8}
              className="font-mono text-xs"
            />
          </div>
        )
      case "button":
        return (
          <div className="space-y-3">
            <Label htmlFor="button-text">Button Text</Label>
            <DebouncedInput
              id="button-text"
              defaultValue={selectedComponent.content.text}
              onDebouncedChange={(v) => handleContentChange("text", v)}
            />
            <Label htmlFor="button-link">Link URL</Label>
            <DebouncedInput
              id="button-link"
              defaultValue={selectedComponent.content.link}
              onDebouncedChange={(v) => handleContentChange("link", v)}
            />
          </div>
        )
      case "card":
        return (
          <div className="space-y-3">
            <Label htmlFor="card-title">Title</Label>
            <DebouncedInput
              id="card-title"
              defaultValue={selectedComponent.content.title}
              onDebouncedChange={(v) => handleContentChange("title", v)}
            />
            <Label htmlFor="card-description">Description</Label>
            <DebouncedTextarea
              id="card-description"
              defaultValue={selectedComponent.content.description}
              onDebouncedChange={(v) => handleContentChange("description", v)}
              rows={3}
            />
            <Label htmlFor="card-image">Image URL (Optional)</Label>
            <DebouncedInput
              id="card-image"
              defaultValue={selectedComponent.content.imageUrl || ""}
              onDebouncedChange={(v) => handleContentChange("imageUrl", v)}
            />
          </div>
        )
      case "alert":
        return (
          <div className="space-y-3">
            <Label htmlFor="alert-text">Text</Label>
            <DebouncedTextarea
              id="alert-text"
              defaultValue={selectedComponent.content.text}
              onDebouncedChange={(v) => handleContentChange("text", v)}
              rows={3}
            />
            <Label htmlFor="alert-type">Type</Label>
            <Select value={selectedComponent.content.type} onValueChange={(v) => handleContentChange("type", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "spacer":
        return (
          <div className="space-y-3">
            <Label htmlFor="spacer-height">Height (e.g., 20px, 2rem)</Label>
            <DebouncedInput
              id="spacer-height"
              defaultValue={selectedComponent.content.height || "20px"}
              onDebouncedChange={(v) => handleContentChange("height", v)}
            />
          </div>
        )
      case "columns": // Simple 2-column for now
        return (
          <div className="space-y-3">
            <Label>Column Content (Markdown supported)</Label>
            <DebouncedTextarea
              placeholder="Column 1 Content"
              defaultValue={selectedComponent.content.column1Text || ""}
              onDebouncedChange={(v) => handleContentChange("column1Text", v)}
              rows={4}
            />
            <DebouncedTextarea
              placeholder="Column 2 Content"
              defaultValue={selectedComponent.content.column2Text || ""}
              onDebouncedChange={(v) => handleContentChange("column2Text", v)}
              rows={4}
            />
          </div>
        )
      // Add cases for list, orderedList, taskList, blockquote, table, mermaid, etc.
      // For lists, you'd manage an array of items. For tables, headers and rows.
      default:
        return <p className="text-muted-foreground text-sm">No specific content properties for this component type.</p>
    }
  }

  const getIconForType = (type: MarkdownComponent["type"]) => {
    const icons: Record<MarkdownComponent["type"], React.ElementType> = {
      heading: Settings,
      paragraph: AlignLeft,
      image: ImageIconProp,
      code: CodeIcon,
      button: Settings,
      card: Settings,
      grid: Settings,
      divider: Settings,
      list: Settings,
      orderedList: Settings,
      taskList: Settings,
      blockquote: Settings,
      video: Settings,
      alert: Settings,
      mermaid: Settings,
      spacer: Settings,
      columns: Columns,
      table: Settings,
    }
    return icons[type] || Settings
  }
  const Icon = getIconForType(selectedComponent.type)

  return (
    <div className="p-0 h-full flex flex-col bg-background dark:bg-neutral-900 border-l border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-md font-semibold capitalize">{selectedComponent.type}</h3>
          </div>
          <Button variant="ghost" size="icon_sm" onClick={() => selectComponent(null)} className="h-7 w-7">
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground truncate">ID: {selectedComponent.id}</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 h-9">
              <TabsTrigger value="content" className="text-xs px-2">
                <Settings className="w-3.5 h-3.5 mr-1.5" />
                Content
              </TabsTrigger>
              <TabsTrigger value="style" className="text-xs px-2">
                <Palette className="w-3.5 h-3.5 mr-1.5" />
                Appearance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">{renderSpecificControls()}</TabsContent>
            <TabsContent value="style">
              <Accordion type="multiple" defaultValue={["common-styles"]} className="w-full">
                {commonStyleControls}
                {["heading", "paragraph", "button", "card", "alert"].includes(selectedComponent.type) &&
                  textStyleControls}
                {boxModelControls}
                {effectsControls}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
}
