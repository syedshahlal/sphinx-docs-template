// Enhanced Theme Switching with Pill Toggle
class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme()
    this.pillToggle = null
    this.init()
  }

  init() {
    this.applyTheme(this.currentTheme)
    this.setupEventListeners()
    this.updatePillToggle()
  }

  setupEventListeners() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.bindPillToggle()
      })
    } else {
      this.bindPillToggle()
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? "dark" : "light", false)
        }
      })
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      // Alt + T to toggle theme
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  bindPillToggle() {
    this.pillToggle = document.getElementById("theme-toggle-pill")

    if (this.pillToggle) {
      // Click handler
      this.pillToggle.addEventListener("click", () => {
        this.toggleTheme()
      })

      // Keyboard handler
      this.pillToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          this.toggleTheme()
        }
      })

      // Initial state
      this.updatePillToggle()
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme, true)
  }

  setTheme(theme, animate = false) {
    this.currentTheme = theme

    if (animate && this.pillToggle) {
      this.pillToggle.classList.add("switching")
      setTimeout(() => {
        this.pillToggle.classList.remove("switching")
      }, 300)
    }

    this.applyTheme(theme)
    this.storeTheme(theme)
    this.updatePillToggle()
    this.announceThemeChange(theme)
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#1a1a1a" : "#e31837")
    }

    // Update favicon based on theme (optional)
    this.updateFavicon(theme)
  }

  updatePillToggle() {
    if (!this.pillToggle) return

    const isDark = this.currentTheme === "dark"

    // Update pill state
    this.pillToggle.setAttribute("data-theme", this.currentTheme)
    this.pillToggle.setAttribute("aria-checked", isDark.toString())

    // Update icon
    const icon = this.pillToggle.querySelector(".theme-icon")
    if (icon) {
      icon.className = isDark ? "theme-icon fas fa-moon" : "theme-icon fas fa-sun"
    }

    // Update title
    this.pillToggle.title = `Switch to ${isDark ? "light" : "dark"} theme`
  }

  updateFavicon(theme) {
    const favicon = document.querySelector('link[rel="icon"]')
    if (favicon) {
      // You can have different favicons for light/dark themes
      const faviconPath = theme === "dark" ? "/favicon-dark.ico" : "/favicon.ico"
      favicon.href = faviconPath
    }
  }

  announceThemeChange(theme) {
    // Create a live region announcement for screen readers
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = `Theme switched to ${theme} mode`

    document.body.appendChild(announcement)

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  getStoredTheme() {
    return localStorage.getItem("gra-docs-theme")
  }

  storeTheme(theme) {
    localStorage.setItem("gra-docs-theme", theme)
  }

  getSystemTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  }
}

// Initialize theme switcher
document.addEventListener("DOMContentLoaded", () => {
  new ThemeSwitcher()
})

// Export for potential external use
window.ThemeSwitcher = ThemeSwitcher
