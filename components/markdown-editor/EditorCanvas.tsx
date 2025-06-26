"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEditor } from "./EditorContext"
import { ComponentRenderer } from "./ComponentRenderer"
import { Trash2, GripVertical } from "lucide-react"

function SortableComponent({ component }: { component: any }) {
  const { deleteComponent, selectComponent, state } = useEditor()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: component.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isSelected = state.selectedComponent === component.id

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative border-2 rounded-lg transition-all
        ${isSelected ? "border-primary" : "border-transparent hover:border-border"}
        ${isDragging ? "opacity-50" : ""}
      `}
      onClick={() => selectComponent(component.id)}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          deleteComponent(component.id)
        }}
        className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Component Content */}
      <div className="p-4">
        <ComponentRenderer component={component} />
      </div>
    </div>
  )
}

export function EditorCanvas() {
  const { state, addComponent } = useEditor()

  if (state.components.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Start Creating</h3>
          <p className="text-muted-foreground mb-4">
            Drag components from the palette or click to add them to your document.
          </p>
          <button
            onClick={() =>
              addComponent({ type: "heading", content: { level: 1, text: "Welcome to your new document" } })
            }
            className="btn-primary"
          >
            Add Your First Component
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-4">
      {state.components
        .sort((a, b) => a.order - b.order)
        .map((component) => (
          <SortableComponent key={component.id} component={component} />
        ))}
    </div>
  )
}
