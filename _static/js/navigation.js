// Navigation functionality
class NavigationManager {
  constructor() {
    this.init()
  }

  init() {
    this.initializeMobileNavigation()
    this.initializeSidebarSearch()
    this.initializeSidebarCollapse()
    this.initializeActiveNavigation()
    this.initializeNestedNavigation()
    this.initializeDropdowns()
    this.setupKeyboardNavigation()
  }

  initializeMobileNavigation() {
    const navToggle = document.getElementById("mobile-nav-toggle")
    const mobileNavMenu = document.getElementById("mobile-nav-menu")
    const sidebar = document.getElementById("sidebar")

    if (navToggle && mobileNavMenu) {
      navToggle.addEventListener("click", (e) => {
        e.preventDefault()

        const isVisible = mobileNavMenu.style.display !== "none"

        if (isVisible) {
          mobileNavMenu.style.display = "none"
          navToggle.querySelector("i").className = "fas fa-bars"
          navToggle.setAttribute("aria-expanded", "false")
        } else {
          mobileNavMenu.style.display = "block"
          navToggle.querySelector("i").className = "fas fa-times"
          navToggle.setAttribute("aria-expanded", "true")
        }
      })

      // Close mobile menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
          mobileNavMenu.style.display = "none"
          navToggle.querySelector("i").className = "fas fa-bars"
          navToggle.setAttribute("aria-expanded", "false")
        }
      })

      // Close mobile menu on window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 992) {
          mobileNavMenu.style.display = "none"
          navToggle.querySelector("i").className = "fas fa-bars"
          navToggle.setAttribute("aria-expanded", "false")
        }
      })
    }

    // Sidebar toggle for mobile
    if (navToggle && sidebar) {
      const handleSidebarToggle = () => {
        if (window.innerWidth < 768) {
          sidebar.classList.toggle("show")

          let overlay = document.querySelector(".sidebar-overlay")
          if (!overlay) {
            overlay = document.createElement("div")
            overlay.className = "sidebar-overlay"
            document.body.appendChild(overlay)

            overlay.addEventListener("click", () => {
              sidebar.classList.remove("show")
              overlay.classList.remove("show")
            })
          }

          overlay.classList.toggle("show")
        }
      }

      let tapCount = 0
      navToggle.addEventListener("click", () => {
        tapCount++
        setTimeout(() => {
          if (tapCount === 2) {
            handleSidebarToggle()
          }
          tapCount = 0
        }, 300)
      })
    }
  }

  initializeSidebarSearch() {
    const searchInput = document.getElementById("sidebar-search")
    const clearButton = document.getElementById("sidebar-search-clear")

    if (!searchInput) return

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim()

      if (query) {
        clearButton.style.display = "block"
        this.filterNavigation(query)
      } else {
        clearButton.style.display = "none"
        this.clearNavigationFilter()
      }
    })

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        searchInput.value = ""
        clearButton.style.display = "none"
        this.clearNavigationFilter()
        searchInput.focus()
      })
    }
  }

  filterNavigation(query) {
    const navSections = document.querySelectorAll(".nav-section")
    let hasVisibleItems = false

    navSections.forEach((section) => {
      const sectionLinks = section.querySelectorAll(".nav-link")
      let sectionHasMatch = false

      sectionLinks.forEach((link) => {
        const text = link.textContent.toLowerCase()
        const listItem = link.closest(".nav-item")

        if (text.includes(query)) {
          listItem.style.display = "block"
          link.classList.add("search-highlight")
          sectionHasMatch = true
          hasVisibleItems = true
        } else {
          listItem.style.display = "none"
          link.classList.remove("search-highlight")
        }
      })

      if (sectionHasMatch) {
        section.style.display = "block"
        const collapseElement = section.querySelector(".collapse")
        if (collapseElement && !collapseElement.classList.contains("show")) {
          collapseElement.classList.add("show")
        }
      } else {
        section.style.display = "none"
      }
    })

    this.showNoResultsMessage(!hasVisibleItems)
  }

  clearNavigationFilter() {
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item")
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")
    const navSections = document.querySelectorAll(".nav-section")

    navItems.forEach((item) => {
      item.style.display = "block"
    })

    navLinks.forEach((link) => {
      link.classList.remove("search-highlight")
    })

    navSections.forEach((section) => {
      section.style.display = "block"
    })

    this.hideNoResultsMessage()
  }

  showNoResultsMessage(show) {
    let message = document.getElementById("no-results-message")

    if (show && !message) {
      message = document.createElement("div")
      message.id = "no-results-message"
      message.className = "text-center text-muted p-3"
      message.innerHTML = `
        <i class="fas fa-search mb-2"></i><br>
        <small>No matching navigation items found</small>
      `
      document.querySelector(".sidebar-nav").appendChild(message)
    } else if (!show && message) {
      message.remove()
    }
  }

  hideNoResultsMessage() {
    const message = document.getElementById("no-results-message")
    if (message) {
      message.remove()
    }
  }

  initializeSidebarCollapse() {
    const collapseButton = document.getElementById("sidebar-collapse")

    if (collapseButton) {
      collapseButton.addEventListener("click", () => {
        const allSections = document.querySelectorAll(".nav-section .collapse")
        const isExpanding = Array.from(allSections).some((section) => !section.classList.contains("show"))

        allSections.forEach((section) => {
          if (isExpanding) {
            section.classList.add("show")
          } else {
            section.classList.remove("show")
          }
        })

        const icon = collapseButton.querySelector("i")
        if (isExpanding) {
          icon.className = "fas fa-expand-alt"
          collapseButton.title = "Expand all sections"
        } else {
          icon.className = "fas fa-compress-alt"
          collapseButton.title = "Collapse all sections"
        }
      })
    }
  }

  initializeActiveNavigation() {
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href && (currentPath.endsWith(href) || currentPath.includes(href.replace(".html", "")))) {
        link.classList.add("current")

        let parent = link.closest(".collapse")
        while (parent) {
          parent.classList.add("show")
          parent = parent.parentElement.closest(".collapse")
        }
      }
    })
  }

  initializeNestedNavigation() {
    const toggles = document.querySelectorAll(".nav-toggle")

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault()

        const target = toggle.getAttribute("data-bs-target")
        const targetElement = document.querySelector(target)

        if (targetElement) {
          targetElement.classList.toggle("show")
          toggle.setAttribute("aria-expanded", targetElement.classList.contains("show"))
        }
      })
    })
  }

  initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault()

        const dropdownMenu = toggle.nextElementSibling
        const isOpen = dropdownMenu.classList.contains("show")

        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          menu.classList.remove("show")
        })

        if (!isOpen) {
          dropdownMenu.classList.add("show")
          toggle.setAttribute("aria-expanded", "true")
        } else {
          dropdownMenu.classList.remove("show")
          toggle.setAttribute("aria-expanded", "false")
        }
      })
    })

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          menu.classList.remove("show")
        })
        document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
          toggle.setAttribute("aria-expanded", "false")
        })
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          menu.classList.remove("show")
        })
        document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
          toggle.setAttribute("aria-expanded", "false")
        })
      }
    })
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        const searchInput = document.getElementById("sidebar-search")
        if (searchInput) {
          searchInput.focus()
        }
      }

      if (e.key === "Escape") {
        const searchInput = document.getElementById("sidebar-search")
        if (searchInput && searchInput === document.activeElement) {
          searchInput.value = ""
          document.getElementById("sidebar-search-clear").style.display = "none"
          this.clearNavigationFilter()
        }
      }
    })
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href && currentPath.includes(href.replace(/\/index\.html$/, ""))) {
        link.classList.add("active")
      }
    })
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NavigationManager()
})
