"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditor } from "./EditorContext"
import type { MarkdownComponent } from "./types"
import { getDefaultContent, componentCategories } from "./ComponentPalette" // Import componentCategories
import { cn } from "@/lib/utils"

interface InlineInserterProps {
  targetIndex: number
  isVisible: boolean
  alwaysVisible?: boolean
}

export function InlineInserter({ targetIndex, isVisible, alwaysVisible = false }: InlineInserterProps) {
  const { addComponent } = useEditor()
  const [open, setOpen] = useState(false)

  const componentDefinitions = useMemo(() => {
    return componentCategories.flatMap((category) =>
      category.components.map((comp) => ({
        ...comp,
        categoryName: category.name,
      })),
    )
  }, [])

  const onSelectComponentType = (type: MarkdownComponent["type"], htmlBlockKey?: string) => {
    console.log(`InlineInserter: Attempting to add component type "${type}" at index ${targetIndex}`, htmlBlockKey)
    const content = getDefaultContent(type, htmlBlockKey)
    if (content === undefined) {
      // Check for undefined specifically
      console.error(`InlineInserter: getDefaultContent returned undefined for type "${type}". Aborting add.`)
      setOpen(false)
      return
    }
    addComponent({ type, content }, false, targetIndex)
    setOpen(false) // Close dropdown after selection
  }

  if (!isVisible && !alwaysVisible) {
    return null
  }

  return (
    <div className={cn("relative flex justify-center my-2", alwaysVisible ? "py-2" : "")}>
      <div className={cn("absolute inset-0 flex items-center", alwaysVisible ? "px-4" : "")} aria-hidden="true">
        {!alwaysVisible && <div className="w-full border-t border-dashed border-muted-foreground/50" />}
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "relative rounded-full w-8 h-8 transition-opacity duration-150 ease-in-out group-hover:opacity-100 focus-visible:opacity-100",
              isVisible || alwaysVisible ? "opacity-100" : "opacity-0",
              alwaysVisible
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-card hover:bg-accent dark:bg-neutral-700 dark:hover:bg-neutral-600 border dark:border-neutral-600",
            )}
            onClick={(e) => {
              e.stopPropagation() // Prevent canvas deselection or other parent clicks
              // setOpen(!open); // onOpenChange handles this
            }}
            aria-label="Add component here"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          className="max-h-96 overflow-y-auto w-64 dark:bg-neutral-800 dark:border-neutral-700"
          align="center"
          sideOffset={5}
        >
          <DropdownMenuLabel className="dark:text-neutral-300">Add Element</DropdownMenuLabel>
          <DropdownMenuSeparator className="dark:bg-neutral-700" />
          {componentDefinitions.map((componentDef) => (
            <DropdownMenuItem
              key={`${componentDef.type}-${componentDef.label}-${componentDef.htmlBlockKey || ""}`}
              onSelect={(event) => {
                event.preventDefault() // Crucial for custom onSelect logic
                onSelectComponentType(componentDef.type, componentDef.htmlBlockKey)
              }}
              className="flex items-center gap-2 cursor-pointer dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <componentDef.icon className={`w-4 h-4 ${componentDef.color} flex-shrink-0`} />
              <span>{componentDef.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
