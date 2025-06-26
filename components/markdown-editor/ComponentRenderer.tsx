"use client"

import type React from "react"
import type { MarkdownComponent, ComponentStyle } from "./types"

// Helper to apply styles
const applyStyles = (style?: ComponentStyle): React.CSSProperties => {
  if (!style) return {}
  const cssProps: React.CSSProperties = {}
  if (style.color) cssProps.color = style.color
  if (style.backgroundColor) cssProps.backgroundColor = style.backgroundColor
  if (style.fontSize) cssProps.fontSize = style.fontSize
  if (style.fontWeight) cssProps.fontWeight = style.fontWeight as React.CSSProperties["fontWeight"]
  if (style.fontStyle) cssProps.fontStyle = style.fontStyle
  if (style.textDecoration) cssProps.textDecoration = style.textDecoration
  if (style.textAlign) cssProps.textAlign = style.textAlign as React.CSSProperties["textAlign"]
  if (style.width) cssProps.width = style.width
  if (style.height) cssProps.height = style.height
  if (style.padding) cssProps.padding = style.padding
  if (style.margin) cssProps.margin = style.margin
  if (style.border) cssProps.border = style.border
  if (style.borderRadius) cssProps.borderRadius = style.borderRadius
  if (style.boxShadow) cssProps.boxShadow = style.boxShadow
  if (style.opacity !== undefined) cssProps.opacity = style.opacity
  return cssProps
}

// Helper for hover classes
const getHoverClasses = (style?: ComponentStyle): string => {
  if (!style?.hover) return ""
  let classes = "transition-all duration-200 ease-in-out "
  if (style.hover.backgroundColor) classes += `hover:bg-[${style.hover.backgroundColor}] `
  if (style.hover.color) classes += `hover:text-[${style.hover.color}] `
  if (style.hover.boxShadow) classes += `hover:shadow-[${style.hover.boxShadow.replace(/ /g, "_")}] `
  if (style.hover.transform) {
    if (style.hover.transform.includes("scale"))
      classes += `hover:scale-[${style.hover.transform.match(/scale$$([^)]+)$$/)?.[1] || "100"}] `
  }
  return classes.trim()
}

interface ComponentRendererProps {
  component: MarkdownComponent
  isSelected: boolean
  updateComponentContent: (id: string, contentUpdates: any) => void
}

export function ComponentRenderer({ component, isSelected, updateComponentContent }: ComponentRendererProps) {
