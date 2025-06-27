"use client"

import { useState, useEffect } from "react"
import type { ThemeConfig } from "../types"

const defaultTheme: ThemeConfig = {
  mode: "light",
  primaryColor: "#2563eb",
  accentColor: "#7c3aed",
}

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sphinx-docs-theme")
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return defaultTheme
        }
      }

      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      return { ...defaultTheme, mode: prefersDark ? "dark" : "light" }
    }
    return defaultTheme
  })

  const toggleTheme = () => {
    const newTheme = { ...theme, mode: theme.mode === "light" ? "dark" : ("light" as const) }
    setTheme(newTheme)
  }

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    const newTheme = { ...theme, ...updates }
    setTheme(newTheme)
  }

  useEffect(() => {
    localStorage.setItem("sphinx-docs-theme", JSON.stringify(theme))

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme.mode)
    document.documentElement.style.setProperty("--primary-color", theme.primaryColor)
    document.documentElement.style.setProperty("--accent-color", theme.accentColor)

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme.mode === "dark" ? "#1f2937" : "#ffffff")
    }
  }, [theme])

  return { theme, toggleTheme, updateTheme }
}
