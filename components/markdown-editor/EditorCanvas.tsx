"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ComponentRenderer } from "./ComponentRenderer"
import { useEditor } from "./EditorContext"
import { cn } from "@/lib/utils"

export function EditorCanvas() {
  const { state, updateComponentContent, selectComponent } = useEditor()
  const { setNodeRef } = useDroppable({
    id: "canvas-drop-zone",
  })

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-4 border-b border-border bg-muted/50">
        <h2 className="text-lg font-bold text-foreground">Canvas</h2>
        <p className="text-sm text-muted-foreground">
          {state.components.length === 0
            ? "Drag components here to start building"
            : `${state.components.length} components`}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div
          ref={setNodeRef}
          className={cn("min-h-full p-8", state.components.length === 0 && "flex items-center justify-center")}
        >
          {state.components.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Start Building</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Drag components from the palette on the left to start creating your document.
              </p>
            </div>
          ) : (
            <SortableContext items={state.components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {state.components.map((component) => (
                  <div key={component.id} onClick={() => selectComponent(component.id)} className="cursor-pointer">
                    <ComponentRenderer
                      component={component}
                      isSelected={state.selectedComponent === component.id}
                      updateComponentContent={updateComponentContent}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
