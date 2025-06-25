"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme(mediaQuery.matches ? "dark" : "light")
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme }
}
