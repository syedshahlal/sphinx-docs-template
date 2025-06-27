"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ComponentRenderer } from "./ComponentRenderer"
import { useEditor } from "./EditorContext"
import { Plus, FileText } from "lucide-react"

export function EditorCanvas() {
  const { state, selectComponent, updateComponentContent } = useEditor()
  const { setNodeRef } = useDroppable({ id: "canvas-drop-zone" })

  const handleComponentClick = (componentId: string) => {
    selectComponent(componentId)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Canvas Header */}
      <div className="p-4 border-b border-[#dfe1e6] bg-[#f4f5f7]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#0052cc] text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#172b4d]">Page Editor</h2>
            <p className="text-sm text-[#6b778c]">Create and edit your documentation</p>
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <ScrollArea className="flex-1">
        <div ref={setNodeRef} className="min-h-full p-8 bg-white" style={{ minHeight: "calc(100vh - 200px)" }}>
          {state.components.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="w-24 h-24 bg-[#f4f5f7] rounded-full flex items-center justify-center mb-6">
                <Plus className="w-12 h-12 text-[#6b778c]" />
              </div>
              <h3 className="text-xl font-semibold text-[#172b4d] mb-2">Start creating your page</h3>
              <p className="text-[#6b778c] max-w-md mb-6">
                Drag elements from the sidebar to begin building your documentation. You can add text, images, code
                blocks, and more.
              </p>
              <div className="bg-[#f4f5f7] border border-[#dfe1e6] rounded-lg p-4 max-w-sm">
                <p className="text-sm text-[#6b778c]">
                  <strong className="text-[#172b4d]">Tip:</strong> Start with a heading to give your page structure,
                  then add paragraphs and other content as needed.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <SortableContext items={state.components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-6">
                  {state.components.map((component) => (
                    <div
                      key={component.id}
                      onClick={() => handleComponentClick(component.id)}
                      className="group cursor-pointer"
                    >
                      <ComponentRenderer
                        component={component}
                        isSelected={state.selectedComponent === component.id}
                        updateComponentContent={updateComponentContent}
                      />
                    </div>
                  ))}
                </div>
              </SortableContext>

              {/* Add more content prompt */}
              <div className="mt-12 p-6 border-2 border-dashed border-[#dfe1e6] rounded-lg text-center hover:border-[#0052cc] transition-colors">
                <Plus className="w-8 h-8 text-[#6b778c] mx-auto mb-2" />
                <p className="text-[#6b778c] text-sm">Drag more elements here to continue building your page</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
