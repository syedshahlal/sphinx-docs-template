"use client"
import type React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Palette, Layout, Type, Plus, Trash2 } from "lucide-react"
import { useEditor } from "./EditorContext"

export function PropertiesPanel() {
  const { state, updateComponentContent, updateComponentStyle } = useEditor()

  const selectedComponent = state.components.find((c) => c.id === state.selectedComponent)

  const updateContent = (newContent: any) => {
    if (!selectedComponent) return
    updateComponentContent(selectedComponent.id, newContent)
  }

  const updateStyle = (field: string, value: any) => {
    if (!selectedComponent) return
    updateComponentStyle(selectedComponent.id, { [field]: value })
  }

  const renderContentEditor = () => {
    if (!selectedComponent) return null

    const content = selectedComponent.content

    const handleFieldChange = (field: string, value: any) => {
      updateContent({ ...content, [field]: value })
    }

    const renderArrayEditor = (
      propName: string,
      itemRenderer: (item: any, index: number) => JSX.Element,
      newItem: any,
    ) => {
      const items = content[propName] || []
      const handleAddItem = () => {
        handleFieldChange(propName, [...items, newItem])
      }
      return (
        <div>
          <Label className="capitalize mb-2 block font-medium">{propName}</Label>
          <div className="space-y-2 border-l-2 pl-4 ml-1">
            {items.map(itemRenderer)}
            <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={handleAddItem}>
              <Plus className="w-4 h-4 mr-2" /> Add {propName.replace(/s$/, "")}
            </Button>
          </div>
        </div>
      )
    }

    switch (selectedComponent.type) {
      case "heading":
        return (
          <div className="space-y-4">
            <div>
              <Label>Text</Label>
              <Input value={content.text || ""} onChange={(e) => handleFieldChange("text", e.target.value)} />
            </div>
            <div>
              <Label>Level</Label>
              <Select
                value={content.level?.toString() || "2"}
                onValueChange={(v) => handleFieldChange("level", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((l) => (
                    <SelectItem key={l} value={String(l)}>
                      H{l}
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
            <Label>Text</Label>
            <Textarea value={content.text || ""} onChange={(e) => handleFieldChange("text", e.target.value)} rows={5} />
          </div>
        )

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label>Image URL</Label>
              <Input value={content.src || ""} onChange={(e) => handleFieldChange("src", e.target.value)} />
            </div>
            <div>
              <Label>Alt Text</Label>
              <Input value={content.alt || ""} onChange={(e) => handleFieldChange("alt", e.target.value)} />
            </div>
            <div>
              <Label>Caption</Label>
              <Input value={content.caption || ""} onChange={(e) => handleFieldChange("caption", e.target.value)} />
            </div>
          </div>
        )

      case "table":
        return (
          <div className="space-y-4">
            {renderArrayEditor(
              "headers",
              (header, index) => {
                const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const newHeaders = [...content.headers]
                  newHeaders[index] = e.target.value
                  handleFieldChange("headers", newHeaders)
                }
                const handleRemoveHeader = () => {
                  const newHeaders = content.headers.filter((_: any, i: number) => i !== index)
                  const newRows = content.rows.map((row: string[]) => row.filter((_: any, i: number) => i !== index))
                  updateContent({ ...content, headers: newHeaders, rows: newRows })
                }
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={header} onChange={handleHeaderChange} />
                    <Button variant="ghost" size="icon" onClick={handleRemoveHeader}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
              },
              "New Header",
            )}
            <div className="mt-4">
              <Label className="font-medium">Rows</Label>
              <div className="space-y-2 border-l-2 pl-4 ml-1">
                {content.rows?.map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="p-2 border rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Row {rowIndex + 1}</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleFieldChange(
                            "rows",
                            content.rows.filter((_: any, i: number) => i !== rowIndex),
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {row.map((cell, cellIndex) => (
                        <Input
                          key={cellIndex}
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...content.rows]
                            newRows[rowIndex][cellIndex] = e.target.value
                            handleFieldChange("rows", newRows)
                          }}
                          placeholder={`Column ${cellIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() =>
                    handleFieldChange("rows", [
                      ...(content.rows || []),
                      new Array(content.headers?.length || 1).fill(""),
                    ])
                  }
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Row
                </Button>
              </div>
            </div>
          </div>
        )

      case "list":
      case "orderedList":
        return renderArrayEditor(
          "items",
          (item, index) => {
            const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const newItems = [...content.items]
              newItems[index] = e.target.value
              handleFieldChange("items", newItems)
            }
            const handleRemoveItem = () => {
              handleFieldChange(
                "items",
                content.items.filter((_: any, i: number) => i !== index),
              )
            }
            return (
              <div key={index} className="flex items-center gap-2">
                <Input value={item} onChange={handleItemChange} />
                <Button variant="ghost" size="icon" onClick={handleRemoveItem}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )
          },
          "New Item",
        )

      case "pricing":
        return renderArrayEditor(
          "plans",
          (plan, index) => (
            <Collapsible key={index} className="border p-2 rounded-md bg-muted/50">
              <CollapsibleTrigger className="flex justify-between w-full font-semibold text-left">
                <span>{plan.name || "New Plan"}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFieldChange(
                      "plans",
                      content.plans.filter((_: any, i: number) => i !== index),
                    )
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={plan.name}
                    onChange={(e) => {
                      const newPlans = [...content.plans]
                      newPlans[index].name = e.target.value
                      handleFieldChange("plans", newPlans)
                    }}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    value={plan.price}
                    onChange={(e) => {
                      const newPlans = [...content.plans]
                      newPlans[index].price = e.target.value
                      handleFieldChange("plans", newPlans)
                    }}
                  />
                </div>
                {renderArrayEditor(
                  `plans[${index}].features`,
                  (feature, fIndex) => {
                    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                      const newPlans = [...content.plans]
                      newPlans[index].features[fIndex] = e.target.value
                      handleFieldChange("plans", newPlans)
                    }
                    const handleRemoveFeature = () => {
                      const newPlans = [...content.plans]
                      newPlans[index].features = newPlans[index].features.filter((_: any, i: number) => i !== fIndex)
                      handleFieldChange("plans", newPlans)
                    }
                    return (
                      <div key={fIndex} className="flex items-center gap-2">
                        <Input value={feature} onChange={handleFeatureChange} />
                        <Button variant="ghost" size="icon" onClick={handleRemoveFeature}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  },
                  "New Feature",
                )}
              </CollapsibleContent>
            </Collapsible>
          ),
          { name: "New Plan", price: "$0", period: "/ month", features: [], buttonText: "Sign Up" },
        )

      default:
        return (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No specific properties available for this component type.</p>
            <Textarea
              readOnly
              value={JSON.stringify(content, null, 2)}
              className="text-xs mt-2 text-left bg-muted p-2 rounded-md h-48"
            />
          </div>
        )
    }
  }

  const renderStyleEditor = () => {
    if (!selectedComponent) return null
    const style = selectedComponent.style || {}
    return (
      <div className="space-y-4">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="font-semibold flex items-center gap-2 w-full text-left">
            <Layout className="w-4 h-4" /> Layout
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2 pl-4 ml-1 border-l-2">
            <div>
              <Label>Width</Label>
              <Input
                value={style.width || ""}
                onChange={(e) => updateStyle("width", e.target.value)}
                placeholder="e.g., 100%, 500px"
              />
            </div>
            <div>
              <Label>Height</Label>
              <Input
                value={style.height || ""}
                onChange={(e) => updateStyle("height", e.target.value)}
                placeholder="e.g., auto, 300px"
              />
            </div>
            <div>
              <Label>Padding</Label>
              <Input
                value={style.padding || ""}
                onChange={(e) => updateStyle("padding", e.target.value)}
                placeholder="e.g., 1rem, 16px"
              />
            </div>
            <div>
              <Label>Margin</Label>
              <Input
                value={style.margin || ""}
                onChange={(e) => updateStyle("margin", e.target.value)}
                placeholder="e.g., 1rem, 16px 0"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="font-semibold flex items-center gap-2 w-full text-left">
            <Type className="w-4 h-4" /> Typography
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2 pl-4 ml-1 border-l-2">
            <div>
              <Label>Font Size</Label>
              <Input
                value={style.fontSize || ""}
                onChange={(e) => updateStyle("fontSize", e.target.value)}
                placeholder="e.g., 16px, 1.2rem"
              />
            </div>
            <div>
              <Label>Text Color</Label>
              <Input
                type="color"
                value={style.color || "#000000"}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="font-semibold flex items-center gap-2 w-full text-left">
            <Palette className="w-4 h-4" /> Appearance
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2 pl-4 ml-1 border-l-2">
            <div>
              <Label>Background Color</Label>
              <Input
                type="color"
                value={style.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              />
            </div>
            <div>
              <Label>Border</Label>
              <Input
                value={style.border || ""}
                onChange={(e) => updateStyle("border", e.target.value)}
                placeholder="e.g., 1px solid #ccc"
              />
            </div>
            <div>
              <Label>Border Radius</Label>
              <Input
                value={style.borderRadius || ""}
                onChange={(e) => updateStyle("borderRadius", e.target.value)}
                placeholder="e.g., 8px, 0.5rem"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }

  if (!selectedComponent) {
    return (
      <div className="h-full flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold">Properties</h2>
          <p className="text-sm text-muted-foreground">No component selected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold capitalize">{selectedComponent.type} Properties</h2>
        <p className="text-xs text-muted-foreground">ID: {selectedComponent.id.slice(0, 8)}</p>
      </div>
      <Tabs defaultValue="content" className="flex-grow flex flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="content">{renderContentEditor()}</TabsContent>
            <TabsContent value="style">{renderStyleEditor()}</TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
