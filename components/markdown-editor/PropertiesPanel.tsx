"use client"

import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Sliders, Check, Save } from "lucide-react"

import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function PropertiesPanel({ selectedComponent }: PropertiesPanelProps) {
  const { updateComponentContent, updateComponentStyle } = useEditor()
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  /* -------------------------------- saving -------------------------------- */

  const handleSave = async () => {
    setSaveStatus("saving")
    await new Promise((r) => setTimeout(r, 700))
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 1500)
  }

  /* ------------------------------- RENDERERS ------------------------------ */

  const renderContentEditor = () => {
    if (!selectedComponent) return null

    const c = selectedComponent

    switch (c.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="heading-text">Text</Label>
              <Input
                id="heading-text"
                value={c.content.text || ""}
                onChange={(e) => updateComponentContent(c.id, { text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Level</Label>
              <Select
                value={String(c.content.level ?? 2)}
                onValueChange={(v) => updateComponentContent(c.id, { level: Number(v) })}
              >
                <SelectTrigger id="heading-level">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((lvl) => (
                    <SelectItem key={lvl} value={String(lvl)}>
                      H{lvl}
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
              rows={6}
              value={c.content.text || ""}
              onChange={(e) => updateComponentContent(c.id, { text: e.target.value })}
            />
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="img-src">Image URL</Label>
              <Input
                id="img-src"
                placeholder="https://example.com/image.jpg"
                value={c.content.src || ""}
                onChange={(e) => updateComponentContent(c.id, { src: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="img-alt">Alt text</Label>
              <Input
                id="img-alt"
                value={c.content.alt || ""}
                onChange={(e) => updateComponentContent(c.id, { alt: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="img-width">Width</Label>
                <Input
                  id="img-width"
                  placeholder="100% or 400px"
                  value={c.content.width || ""}
                  onChange={(e) => updateComponentContent(c.id, { width: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="img-height">Height</Label>
                <Input
                  id="img-height"
                  placeholder="auto or 300px"
                  value={c.content.height || ""}
                  onChange={(e) => updateComponentContent(c.id, { height: e.target.value })}
                />
              </div>
            </div>
          </div>
        )

      /* ---------- ADD OTHER COMPONENT TYPES HERE AS NEEDED ---------- */
      default:
        return (
          <div className="text-center py-10 text-muted-foreground">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No editable content for this component.</p>
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    if (!selectedComponent) return null

    const style = selectedComponent.style ?? {}

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="style-padding">Padding</Label>
          <Input
            id="style-padding"
            placeholder="e.g., 1rem"
            value={style.padding || ""}
            onChange={(e) =>
              updateComponentStyle(selectedComponent.id, {
                padding: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="style-bg">Background Color</Label>
          <Input
            id="style-bg"
            type="color"
            value={style.backgroundColor || "#ffffff"}
            onChange={(e) =>
              updateComponentStyle(selectedComponent.id, {
                backgroundColor: e.target.value,
              })
            }
            className="h-10 w-full p-1"
          />
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card border rounded-lg">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Select a component to edit its properties.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold capitalize">{selectedComponent.type} Properties</h2>
      </div>

      {/* Tabs */}
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

      {/* Save button */}
      <div className="p-4 border-t border-border bg-muted/50">
        <Button className="w-full" disabled={saveStatus === "saving"} onClick={handleSave}>
          {saveStatus === "saving" ? (
            <>
              <Sliders className="w-4 h-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default PropertiesPanel
