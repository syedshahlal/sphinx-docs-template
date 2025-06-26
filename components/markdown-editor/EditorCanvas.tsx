"use client"

import type React from "react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEditor } from "./EditorContext"
import { ComponentRenderer } from "./ComponentRenderer"
import { Trash2, GripVertical, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownComponent } from "./types"
import { Button } from "@/components/ui/button"

interface SortableItemProps {
  component: MarkdownComponent
  isLast: boolean
  updateComponentContent: (id: string, contentUpdates: any) => void
}

function SortableComponentItem({ component, isLast, updateComponentContent }: SortableItemProps) {
  const { deleteComponent, selectComponent, state } = useEditor()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 250ms ease",
  }

  const isSelected = state.selectedComponent === component.id
  const [showInserter, setShowInserter] = useState(false)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("group relative outline-none", isDragging ? "opacity-50" : "")}
      onMouseEnter={() => setShowInserter(true)}
      onMouseLeave={() => setShowInserter(false)}
      onClick={(e) => {
        if (!(e.target instanceof HTMLElement && e.target.isContentEditable) || !isSelected) {
          e.stopPropagation()
          selectComponent(component.id)
        }
      }}
      tabIndex={0}
      onFocus={() => {
        if (!isSelected) {
          selectComponent(component.id)
        }
      }}
    >
      {/* Component Content Wrapper for selection outline */}
      <div
        className={cn(
          "transition-all duration-150 ease-in-out rounded-md border-2",
          isSelected ? "border-primary shadow-md" : "border-transparent hover:border-muted-foreground/30",
          "p-1",
        )}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className={cn(
            "absolute -left-7 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-muted-foreground hover:text-foreground",
            isSelected && "opacity-100",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            deleteComponent(component.id)
          }}
          className={cn(
            "absolute -right-7 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700",
            isSelected && "opacity-100",
          )}
          aria-label="Delete component"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Actual Component Content */}
        <div className="min-h-[40px]">
          <ComponentRenderer
            component={component}
            isSelected={isSelected}
            updateComponentContent={updateComponentContent}
          />
        </div>
      </div>

      {/* Inline Inserter - appears below this component */}
      {(showInserter || isSelected) && (
        <div className="flex justify-center py-2">
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              // Add component after this one
            }}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add component
          </Button>
        </div>
      )}
    </div>
  )
}

export function EditorCanvas() {
  const { state, selectComponent, updateComponentContent, addComponent } = useEditor()

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !(e.target instanceof HTMLElement && e.target.isContentEditable)) {
      selectComponent(null)
    }
  }

  if (state.components.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center p-8 min-h-[300px] text-center bg-background"
        onClick={handleCanvasClick}
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <PlusCircle size={48} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">Empty Canvas</h3>
        <p className="text-muted-foreground mb-4 max-w-xs">
          Drag components from the left panel to start building your document.
        </p>
        <Button
          onClick={() => {
            addComponent({
              type: "paragraph",
              content: { text: "Start writing your content here..." },
            })
          }}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add your first component
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-1 relative bg-background" onClick={handleCanvasClick}>
      {state.components
        .sort((a, b) => a.order - b.order)
        .map((component, index) => (
          <SortableComponentItem
            key={component.id}
            component={component}
            isLast={index === state.components.length - 1}
            updateComponentContent={updateComponentContent}
          />
        ))}
      {/* Fallback inserter at the very end */}
      {state.components.length > 0 && (
        <div className="flex justify-center py-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              addComponent({
                type: "paragraph",
                content: { text: "New paragraph..." },
              })
            }}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add component
          </Button>
        </div>
      )}
    </div>
  )
}
