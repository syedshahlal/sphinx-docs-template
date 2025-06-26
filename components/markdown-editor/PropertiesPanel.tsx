"use client"

import { useEditor } from "./EditorContext"
import { Input } from "@/components/core/ui/input"
import { Button } from "@/components/core/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertiesPanel() {
  const { state, updateComponent, selectComponent } = useEditor()

  const selectedComponent = state.components.find((c) => c.id === state.selectedComponent)

  if (!selectedComponent) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        <p className="text-muted-foreground text-sm">Select a component to edit its properties</p>
      </div>
    )
  }

  const updateContent = (updates: any) => {
    updateComponent(selectedComponent.id, {
      content: { ...selectedComponent.content, ...updates },
    })
  }

  const renderProperties = () => {
    switch (selectedComponent.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading-level">Heading Level</Label>
              <Select
                value={selectedComponent.content.level.toString()}
                onValueChange={(value) => updateContent({ level: Number.parseInt(value) })}
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
            <div>
              <Label htmlFor="heading-text">Text</Label>
              <Input
                id="heading-text"
                value={selectedComponent.content.text}
                onChange={(e) => updateContent({ text: e.target.value })}
              />
            </div>
          </div>
        )

      case "paragraph":
        return (
          <div>
            <Label htmlFor="paragraph-text">Text</Label>
            <Textarea
              id="paragraph-text"
              value={selectedComponent.content.text}
              onChange={(e) => updateContent({ text: e.target.value })}
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
                value={selectedComponent.content.src}
                onChange={(e) => updateContent({ src: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={selectedComponent.content.alt}
                onChange={(e) => updateContent({ alt: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="image-caption">Caption (optional)</Label>
              <Input
                id="image-caption"
                value={selectedComponent.content.caption || ""}
                onChange={(e) => updateContent({ caption: e.target.value })}
              />
            </div>
          </div>
        )

      case "code":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="code-language">Language</Label>
              <Select
                value={selectedComponent.content.language}
                onValueChange={(value) => updateContent({ language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="code-content">Code</Label>
              <Textarea
                id="code-content"
                value={selectedComponent.content.code}
                onChange={(e) => updateContent({ code: e.target.value })}
                rows={6}
                className="font-mono text-sm"
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
                value={selectedComponent.content.text}
                onChange={(e) => updateContent({ text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link URL</Label>
              <Input
                id="button-link"
                value={selectedComponent.content.link}
                onChange={(e) => updateContent({ link: e.target.value })}
              />
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
                value={selectedComponent.content.title}
                onChange={(e) => updateContent({ title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="card-description">Description</Label>
              <Textarea
                id="card-description"
                value={selectedComponent.content.description}
                onChange={(e) => updateContent({ description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      default:
        return <p className="text-muted-foreground text-sm">No properties available for this component type.</p>
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Properties</h3>
        <Button variant="ghost" size="sm" onClick={() => selectComponent(null)}>
          ✕
        </Button>
      </div>

      <div className="mb-4 p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium">{selectedComponent.type}</p>
        <p className="text-xs text-muted-foreground">Component ID: {selectedComponent.id}</p>
      </div>

      {renderProperties()}
    </div>
  )
}
