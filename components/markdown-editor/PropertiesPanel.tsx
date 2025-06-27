"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface StyleUpdates {
  color?: string
  fontSize?: string
  [key: string]: string | undefined
}

interface MarkdownComponent {
  id: string
  type: string
  content: Record<string, unknown>
  style?: StyleUpdates
}

interface PropertiesPanelProps {
  selectedComponent: MarkdownComponent | null
  onUpdateComponent: (updates: Partial<MarkdownComponent>) => void
  onUpdateStyle: (updates: StyleUpdates) => void
}

/* -------------------------------------------------------------------------- */
/*                            PROPERTIES PANEL UI                             */
/* -------------------------------------------------------------------------- */

function PropertiesPanelInner({ selectedComponent, onUpdateComponent, onUpdateStyle }: PropertiesPanelProps) {
  const [localContent, setLocalContent] = useState(selectedComponent?.content?.text ?? "")
  const [localColor, setLocalColor] = useState(selectedComponent?.style?.color ?? "")

  if (!selectedComponent) {
    return (
      <Card className="h-full flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No component selected</span>
      </Card>
    )
  }

  const handleSave = () => {
    onUpdateComponent({ content: { ...selectedComponent.content, text: localContent } })
    onUpdateStyle({ color: localColor })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Edit Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content">Text</Label>
          <Textarea id="content" value={localContent as string} onChange={(e) => setLocalContent(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" type="color" value={localColor} onChange={(e) => setLocalColor(e.target.value)} />
        </div>

        <div>
          <Label>Font Size</Label>
          <Select
            defaultValue={selectedComponent.style?.fontSize ?? "text-base"}
            onValueChange={(val) => onUpdateStyle({ fontSize: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-sm">Small</SelectItem>
              <SelectItem value="text-base">Base</SelectItem>
              <SelectItem value="text-lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save changes
        </Button>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                     DEFAULT + NAMED EXPORT (REQUIRED)                      */
/* -------------------------------------------------------------------------- */

export default PropertiesPanelInner
export { PropertiesPanelInner as PropertiesPanel }
