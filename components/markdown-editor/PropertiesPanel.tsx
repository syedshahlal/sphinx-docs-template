"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------- */
/*                                Type Helpers                                */
/* -------------------------------------------------------------------------- */

interface StyleUpdates {
  color?: string
  fontSize?: string
}

interface MarkdownComponent {
  id: string
  type: string
  content: { text?: string }
  style?: StyleUpdates
}

interface PropertiesProps {
  selected: MarkdownComponent | null
  onUpdateComponent?: (updates: Partial<MarkdownComponent>) => void
  onUpdateStyle?: (updates: StyleUpdates) => void
}

/* -------------------------------------------------------------------------- */
/*                               PropertiesPanel                              */
/* -------------------------------------------------------------------------- */

function PropertiesPanelInner({ selected, onUpdateComponent = () => {}, onUpdateStyle = () => {} }: PropertiesProps) {
  const [text, setText] = useState(selected?.content.text ?? "")
  const [color, setColor] = useState(selected?.style?.color ?? "#000000")
  const [font, setFont] = useState(selected?.style?.fontSize ?? "text-base")

  if (!selected) {
    return (
      <Card className="h-full flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Select a component</span>
      </Card>
    )
  }

  const handleSave = () => {
    onUpdateComponent({ content: { text } })
    onUpdateStyle({ color, fontSize: font })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Component Properties</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Text */}
        <div>
          <Label htmlFor="prop-text">Text</Label>
          <Textarea id="prop-text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        {/* Color */}
        <div>
          <Label htmlFor="prop-color">Color</Label>
          <Input
            id="prop-color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 p-1"
          />
        </div>

        {/* Font size */}
        <div>
          <Label>Font size</Label>
          <Select value={font} onValueChange={(val) => setFont(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text-sm">Small</SelectItem>
              <SelectItem value="text-base">Base</SelectItem>
              <SelectItem value="text-lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
      </CardContent>
    </Card>
  )
}

export default PropertiesPanelInner
export { PropertiesPanelInner as PropertiesPanel }
