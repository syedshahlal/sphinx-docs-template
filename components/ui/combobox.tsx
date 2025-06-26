"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export interface ComboboxOption {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyPlaceholder?: string
  loading?: boolean
  className?: string
  allowCustomValue?: boolean
  customValueLabel?: (value: string) => string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyPlaceholder = "No results found.",
  loading,
  className,
  allowCustomValue = true,
  customValueLabel = (val) => `Create "${val}"`,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("") // For custom value input

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (currentValue: string) => {
    onChange(currentValue)
    setOpen(false)
    setInputValue("") // Reset input value
  }

  const handleInputChange = (searchValue: string) => {
    setInputValue(searchValue)
  }

  const filteredOptions = React.useMemo(() => {
    if (!inputValue.trim() || !allowCustomValue) return options

    const existingOption = options.find(
      (option) =>
        option.label.toLowerCase() === inputValue.toLowerCase() ||
        option.value.toLowerCase() === inputValue.toLowerCase(),
    )
    if (existingOption) return options // If exact match exists, don't show "create"

    return [...options, { value: inputValue, label: customValueLabel(inputValue), icon: PlusCircle } as ComboboxOption]
  }, [options, inputValue, allowCustomValue, customValueLabel])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={loading}
        >
          {loading ? "Loading..." : selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={!allowCustomValue}>
          {" "}
          {/* Disable default filtering if we handle it for custom values */}
          <CommandInput placeholder={searchPlaceholder} value={inputValue} onValueChange={handleInputChange} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value} // Command uses this for its internal filtering/selection
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                  {option.label}
                  {option.value === inputValue && allowCustomValue && (
                    <Badge variant="outline" className="ml-auto">
                      New
                    </Badge>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
