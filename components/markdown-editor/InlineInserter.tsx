"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  PlusCircle,
  Type,
  AlignLeft,
  ImageIcon,
  Code,
  Minus,
  List,
  CheckSquare,
  AlertTriangle,
  Columns,
  Share2,
  Table,
  MousePointer,
  CreditCard,
  Hourglass,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEditor } from "./EditorContext"
import { getDefaultContent } from "./ComponentPalette" // Assuming this is exported
import type { MarkdownComponent } from "./types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface InlineInserterProps {
  targetIndex: number
  isVisible: boolean
  alwaysVisible?: boolean // For the empty canvas case
}

const inserterOptions: { label: string; type: MarkdownComponent["type"]; icon: React.ElementType }[] = [
  { label: "Paragraph", type: "paragraph", icon: AlignLeft },
  { label: "Heading", type: "heading", icon: Type },
  { label: "Image", type: "image", icon: ImageIcon },
  { label: "Bullet List", type: "list", icon: List },
  { label: "Task List", type: "taskList", icon: CheckSquare },
  { label: "Code Block", type: "code", icon: Code },
  { label: "Divider", type: "divider", icon: Minus },
  { label: "Blockquote", type: "blockquote", icon: Quote },
  { label: "Table", type: "table", icon: Table },
  { label: "Button", type: "button", icon: MousePointer },
  { label: "Card", type: "card", icon: CreditCard },
  { label: "Alert", type: "alert", icon: AlertTriangle },
  { label: "Columns", type: "columns", icon: Columns }, // Simple 2-column
  { label: "Spacer", type: "spacer", icon: Hourglass },
  { label: "Mermaid", type: "mermaid", icon: Share2 },
  // { label: "Video", type: "video", icon: Youtube }, // Needs custom Tiptap node
]

export function InlineInserter({ targetIndex, isVisible, alwaysVisible = false }: InlineInserterProps) {
  const { addComponent } = useEditor()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleAddComponent = (type: MarkdownComponent["type"]) => {
    const content = getDefaultContent(type)
    addComponent({ type, content }, false, targetIndex)
    setPopoverOpen(false)
  }

  if (!isVisible && !alwaysVisible) {
    return <div className="h-8 my-1"></div> // Placeholder for spacing, hidden
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center my-1 transition-opacity duration-200",
        isVisible || alwaysVisible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div className="w-full h-px bg-muted-foreground/20 absolute top-1/2 left-0 z-0"></div>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild ref={triggerRef}>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full bg-background hover:bg-muted border border-transparent hover:border-muted-foreground/30 z-10",
              "transition-all duration-150 ease-in-out",
              isVisible || alwaysVisible ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
            aria-label="Add element"
          >
            <PlusCircle className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-1" side="bottom" align="center">
          <ScrollArea className="h-[250px]">
            <div className="grid grid-cols-1 gap-1 p-1 text-slate-400 text-slate-400 text-slate-100 text-slate-700 text-slate-950 text-slate-300 text-slate-100 text-slate-50 text-transparent bg-neutral-600 bg-neutral-700 bg-neutral-600 bg-gray-900 bg-gray-800 bg-slate-900 bg-slate-950 bg-black">
              {inserterOptions.map((opt) => (
                <Button
                  key={opt.type}
                  variant="ghost"
                  className="w-full justify-start h-10 px-3"
                  onClick={() => handleAddComponent(opt.type)}
                >
                  <opt.icon className="w-4 h-4 mr-3 text-muted-foreground" />
                  {opt.label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}
