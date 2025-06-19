// Theme switching functionality
class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getStoredTheme() || "light"
    this.init()
  }

  init() {
    this.applyTheme(this.currentTheme)
    this.setupEventListeners()
    this.updateThemeIcon()
  }

  setupEventListeners() {
    const themeSwitcher = document.getElementById("theme-switcher")
    if (themeSwitcher) {
      themeSwitcher.addEventListener("click", () => {
        this.toggleTheme()
      })
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? "dark" : "light")
          this.updateThemeIcon()
        }
      })
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  setTheme(theme) {
    this.currentTheme = theme
    this.applyTheme(theme)
    this.storeTheme(theme)
    this.updateThemeIcon()
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)
    document.body.setAttribute("data-theme", theme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#1a1a1a" : "#e31837")
    }
  }

  updateThemeIcon() {
    const icon = document.querySelector("#theme-switcher i")
    if (icon) {
      icon.className = this.currentTheme === "light" ? "fas fa-moon" : "fas fa-sun"
    }
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
