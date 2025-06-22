// Custom JavaScript for GRA Core Platform Documentation
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeSearch()
  initializeNavigation()
  initializeCopyButtons()
  initializeScrollSpy()
  initializeTooltips()
  initializeHelpModal()

  // Add smooth scrolling to anchor links
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
})

function initializeHelpModal() {
  const helpButton = document.getElementById("help-button")

  if (helpButton) {
    helpButton.addEventListener("click", () => {
      // Create help modal if it doesn't exist
      let helpModal = document.getElementById("help-modal")
      if (!helpModal) {
        createHelpModal()
        helpModal = document.getElementById("help-modal")
      }

      // Show the modal
      if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
        const modal = new bootstrap.Modal(helpModal)
        modal.show()
      } else {
        // Fallback for when Bootstrap is not available
        helpModal.style.display = "block"
        helpModal.classList.add("show")
      }
    })
  }
}

function createHelpModal() {
  const modalHtml = `
    <div class="modal fade" id="help-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="fas fa-question-circle me-2"></i>Need Help?
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="help-options">
              <div class="help-option">
                <i class="fas fa-robot text-primary"></i>
                <div>
                  <h6>AI Assistant</h6>
                  <p>Use the chatbot in the bottom-right corner for instant help</p>
                </div>
              </div>
              <div class="help-option">
                <i class="fas fa-keyboard text-info"></i>
                <div>
                  <h6>Keyboard Shortcuts</h6>
                  <p><kbd><i class="fas fa-keyboard me-1"></i>Ctrl + K</kbd> - Search documentation<br>
                     <kbd>Alt + S</kbd> - Focus sidebar search<br>
                     <kbd>Alt + C</kbd> - Toggle chatbot</p>
                </div>
              </div>
              <div class="help-option">
                <i class="fas fa-users text-success"></i>
                <div>
                  <h6>Community</h6>
                  <p>Join our community forum for discussions and support</p>
                </div>
              </div>
              <div class="help-option">
                <i class="fas fa-envelope text-warning"></i>
                <div>
                  <h6>Contact Support</h6>
                  <p>Email us at <a href="mailto:support@gra-platform.org">support@gra-platform.org</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML("beforeend", modalHtml)
}

function initializeSearch() {
  const searchInput = document.querySelector(".search-input")
  if (!searchInput) return

  // Search keyboard shortcut
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault()
      searchInput.focus()
    }
  })

  // Search functionality (placeholder - integrate with your search backend)
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      const query = e.target.value.trim()
      if (query.length > 2) {
        performSearch(query)
      }
    }, 300),
  )
}

function initializeNavigation() {
  // Mobile navigation toggle
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
    // Add separate handler for sidebar toggle on smaller screens
    const handleSidebarToggle = () => {
      if (window.innerWidth < 768) {
        sidebar.classList.toggle("show")

        // Add overlay for mobile
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

    // Double-tap on mobile nav toggle to open sidebar
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

  // Initialize other navigation features
  initializeSidebarSearch()
  initializeSidebarCollapse()
  initializeActiveNavigation()
  initializeNestedNavigation()
  initializeDropdowns()
}

function initializeSidebarSearch() {
  const searchInput = document.getElementById("sidebar-search")
  const clearButton = document.getElementById("sidebar-search-clear")

  if (!searchInput) return

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim()

    if (query) {
      clearButton.style.display = "block"
      filterNavigation(query)
    } else {
      clearButton.style.display = "none"
      clearNavigationFilter()
    }
  })

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      searchInput.value = ""
      clearButton.style.display = "none"
      clearNavigationFilter()
      searchInput.focus()
    })
  }
}

function filterNavigation(query) {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")
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

    // Show/hide entire section based on matches
    if (sectionHasMatch) {
      section.style.display = "block"
      // Expand section if it has matches
      const collapseElement = section.querySelector(".collapse")
      if (collapseElement && !collapseElement.classList.contains("show")) {
        collapseElement.classList.add("show")
      }
    } else {
      section.style.display = "none"
    }
  })

  // Show "no results" message if needed
  showNoResultsMessage(!hasVisibleItems)
}

function clearNavigationFilter() {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item")
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

  hideNoResultsMessage()
}

function showNoResultsMessage(show) {
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

function hideNoResultsMessage() {
  const message = document.getElementById("no-results-message")
  if (message) {
    message.remove()
  }
}

function initializeSidebarCollapse() {
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

      // Update button icon
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

function initializeActiveNavigation() {
  // Highlight current page in navigation
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href && (currentPath.endsWith(href) || currentPath.includes(href.replace(".html", "")))) {
      link.classList.add("current")

      // Expand parent sections
      let parent = link.closest(".collapse")
      while (parent) {
        parent.classList.add("show")
        parent = parent.parentElement.closest(".collapse")
      }
    }
  })
}

function initializeNestedNavigation() {
  // Handle nested navigation toggles
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

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  // Alt + S to focus sidebar search
  if (e.altKey && e.key === "s") {
    e.preventDefault()
    const searchInput = document.getElementById("sidebar-search")
    if (searchInput) {
      searchInput.focus()
    }
  }

  // Escape to clear sidebar search
  if (e.key === "Escape") {
    const searchInput = document.getElementById("sidebar-search")
    if (searchInput && searchInput === document.activeElement) {
      searchInput.value = ""
      document.getElementById("sidebar-search-clear").style.display = "none"
      clearNavigationFilter()
    }
  }
})

function initializeCopyButtons() {
  // Add copy buttons to code blocks
  document.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button")
    button.className = "copy-button"
    button.innerHTML = '<i class="fas fa-copy"></i>'
    button.title = "Copy to clipboard"

    button.addEventListener("click", async () => {
      const code = pre.querySelector("code") || pre
      try {
        await navigator.clipboard.writeText(code.textContent)
        button.innerHTML = '<i class="fas fa-check"></i>'
        button.classList.add("copied")

        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>'
          button.classList.remove("copied")
        }, 2000)
      } catch (err) {
        console.error("Failed to copy text:", err)
      }
    })

    pre.style.position = "relative"
    pre.appendChild(button)
  })
}

function initializeScrollSpy() {
  // Highlight current section in TOC
  const tocLinks = document.querySelectorAll(".toc-sidebar a")
  const sections = document.querySelectorAll("h1, h2, h3, h4, h5, h6")

  if (tocLinks.length === 0 || sections.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          if (id) {
            tocLinks.forEach((link) => link.classList.remove("current"))
            const currentLink = document.querySelector(`.toc-sidebar a[href="#${id}"]`)
            if (currentLink) {
              currentLink.classList.add("current")
            }
          }
        }
      })
    },
    {
      rootMargin: "-20% 0px -80% 0px",
    },
  )

  sections.forEach((section) => {
    if (section.id) {
      observer.observe(section)
    }
  })
}

function initializeTooltips() {
  // Initialize Bootstrap tooltips if available
  if (typeof bootstrap !== "undefined" && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  }
}

async function performSearch(query) {
  // Placeholder search function - integrate with your search backend
  console.log("Searching for:", query)

  // You would typically make an API call here
  // const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  // displaySearchResults(await results.json());
}

function displaySearchResults(results) {
  // Display search results in a dropdown or modal
  console.log("Search results:", results)
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add custom CSS for copy buttons
const copyButtonStyles = `
  .copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    cursor: pointer;
    opacity: 0;
    transition: all 0.2s ease;
  }
  
  pre:hover .copy-button {
    opacity: 1;
  }
  
  .copy-button:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  .copy-button.copied {
    background: #28a745;
    color: white;
    border-color: #28a745;
  }
`

// Inject styles
const styleSheet = document.createElement("style")
styleSheet.textContent = copyButtonStyles
document.head.appendChild(styleSheet)

function initializeDropdowns() {
  // Handle dropdown menus
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()

      const dropdownMenu = toggle.nextElementSibling
      const isOpen = dropdownMenu.classList.contains("show")

      // Close all other dropdowns
      document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
        menu.classList.remove("show")
      })

      // Toggle current dropdown
      if (!isOpen) {
        dropdownMenu.classList.add("show")
        toggle.setAttribute("aria-expanded", "true")
      } else {
        dropdownMenu.classList.remove("show")
        toggle.setAttribute("aria-expanded", "false")
      }
    })
  })

  // Close dropdowns when clicking outside
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

  // Close dropdowns on escape key
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

// Add active state detection for navigation
function setActiveNavigation() {
  const currentPath = window.location.pathname
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href && currentPath.includes(href.replace(/\/index\.html$/, ""))) {
      link.classList.add("active")
    }
  })
}

// Initialize active navigation on page load
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavigation()
})
