"use client"

import { useState, useEffect } from "react"
import type { ThemeConfig } from "../types"

export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gra-docs-theme")
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          // Fall back to default if parsing fails
        }
      }
      return {
        mode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
        primaryColor: "#3b82f6",
        accentColor: "#06b6d4",
      }
    }
    return {
      mode: "light" as const,
      primaryColor: "#3b82f6",
      accentColor: "#06b6d4",
    }
  })

  const toggleTheme = () => {
    const newMode = theme.mode === "light" ? "dark" : "light"
    const newTheme = { ...theme, mode: newMode }
    setTheme(newTheme)
    localStorage.setItem("gra-docs-theme", JSON.stringify(newTheme))
  }

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates }
    setTheme(newTheme)
    localStorage.setItem("gra-docs-theme", JSON.stringify(newTheme))
  }

  useEffect(() => {
    const root = document.documentElement

    if (theme.mode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Apply custom colors
    root.style.setProperty("--primary", theme.primaryColor)
    root.style.setProperty("--accent", theme.accentColor)
  }, [theme])

  return {
    theme,
    toggleTheme,
    updateTheme,
  }
}
