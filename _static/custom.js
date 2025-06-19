// GRA Core Platform Custom JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Theme switcher functionality
  const themeButton = document.querySelector(".theme-switch-button")
  const body = document.body

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      body.setAttribute("data-theme", newTheme)
      localStorage.setItem("gra-theme", newTheme)

      // Update button icon
      const icon = themeButton.querySelector("i")
      if (newTheme === "dark") {
        icon.className = "fas fa-moon"
      } else {
        icon.className = "fas fa-sun"
      }
    })

    // Load saved theme
    const savedTheme = localStorage.getItem("gra-theme") || "light"
    body.setAttribute("data-theme", savedTheme)

    const icon = themeButton.querySelector("i")
    if (savedTheme === "dark") {
      icon.className = "fas fa-moon"
    }
  }

  // Search functionality
  const searchInput = document.querySelector(".search-container input")
  if (searchInput) {
    // Keyboard shortcut for search
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInput.focus()
      }
    })

    // Search placeholder animation
    const placeholders = [
      "Search documentation...",
      "Search API reference...",
      "Search examples...",
      "Search guides...",
    ]

    let placeholderIndex = 0
    setInterval(() => {
      if (!searchInput.matches(":focus")) {
        searchInput.placeholder = placeholders[placeholderIndex]
        placeholderIndex = (placeholderIndex + 1) % placeholders.length
      }
    }, 3000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add copy buttons to code blocks
  document.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button")
    button.className = "copy-button"
    button.innerHTML = '<i class="fas fa-copy"></i>'
    button.title = "Copy to clipboard"

    button.addEventListener("click", async () => {
      const code = pre.querySelector("code")
      if (code) {
        try {
          await navigator.clipboard.writeText(code.textContent)
          button.innerHTML = '<i class="fas fa-check"></i>'
          button.style.color = "#22c55e"

          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i>'
            button.style.color = ""
          }, 2000)
        } catch (err) {
          console.error("Failed to copy text: ", err)
        }
      }
    })

    pre.style.position = "relative"
    pre.appendChild(button)
  })
})
