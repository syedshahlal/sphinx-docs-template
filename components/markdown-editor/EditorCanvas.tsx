"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useDroppable } from "@dnd-kit/core"
import { ComponentRenderer } from "./ComponentRenderer"
import { useEditor } from "./EditorContext"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Trash2, Copy, MoveUp, MoveDown, Lock, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent } from "./types"

interface SortableComponentProps {
  component: MarkdownComponent
  index: number
}

function SortableComponent({ component, index }: SortableComponentProps) {
  const { state, selectComponent, updateComponentContent, deleteComponent, duplicateComponent, moveComponent } =
    useEditor()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: component.id,
    data: {
      type: "component",
      component,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isSelected = state.selectedComponent === component.id

  const handleSelect = () => {
    selectComponent(component.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteComponent(component.id)
  }

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation()
    duplicateComponent(component.id)
  }

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (index > 0) {
      moveComponent(component.id, index - 1)
    }
  }

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (index < state.components.length - 1) {
      moveComponent(component.id, index + 1)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "group relative transition-all duration-200",
        isDragging && "opacity-50 scale-105 rotate-1 z-50",
        isSelected && "ring-2 ring-primary ring-offset-2",
        component.hidden && "opacity-50",
      )}
      onClick={handleSelect}
    >
      {/* Component Actions */}
      <div className="absolute -top-2 -right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="secondary" className="h-6 w-6 p-0" onClick={handleMoveUp} disabled={index === 0}>
          <MoveUp className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-6 w-6 p-0"
          onClick={handleMoveDown}
          disabled={index === state.components.length - 1}
        >
          <MoveDown className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="secondary" className="h-6 w-6 p-0" onClick={handleDuplicate}>
          <Copy className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={handleDelete}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Drag Handle */}
      <div
        {...listeners}
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-muted border border-border rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <div className="w-1 h-4 bg-muted-foreground rounded-full opacity-50"></div>
      </div>

      {/* Component Status Indicators */}
      <div className="absolute -left-8 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {component.locked && (
          <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <Lock className="w-2 h-2 text-white" />
          </div>
        )}
        {component.hidden && (
          <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
            <EyeOff className="w-2 h-2 text-white" />
          </div>
        )}
      </div>

      <ComponentRenderer
        component={component}
        isSelected={isSelected}
        updateComponentContent={updateComponentContent}
      />
    </div>
  )
}

function DropZone() {
  const { setNodeRef } = useDroppable({
    id: "canvas-drop-zone",
  })

  return (
    <div
      ref={setNodeRef}
      className="min-h-[200px] border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground"
    >
      <div className="text-center">
        <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Drag components here to start building</p>
        <p className="text-xs opacity-75">Or click on components in the palette</p>
      </div>
    </div>
  )
}

export function EditorCanvas() {
  const { state } = useEditor()

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Canvas Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Canvas</h3>
            <p className="text-sm text-muted-foreground">
              {state.components.length} component{state.components.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {state.components.length === 0 ? (
            <DropZone />
          ) : (
            <div className="space-y-6">
              {state.components.map((component, index) => (
                <SortableComponent key={component.id} component={component} index={index} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
