// Custom JavaScript for GRA Core Platform Documentation
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeSearch()
  initializeNavigation()
  initializeCopyButtons()
  initializeScrollSpy()
  initializeTooltips()

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
  const navToggle = document.querySelector(".navbar-toggler")
  const sidebar = document.getElementById("sidebar")

  if (navToggle && sidebar) {
    navToggle.addEventListener("click", () => {
      sidebar.classList.toggle("show")
    })
  }

  // Collapsible sidebar sections
  document.querySelectorAll(".sidebar .toctree-l1 > a").forEach((link) => {
    const parent = link.parentElement
    const sublist = parent.querySelector("ul")

    if (sublist) {
      link.addEventListener("click", (e) => {
        if (link.getAttribute("href") === "#") {
          e.preventDefault()
          parent.classList.toggle("expanded")
        }
      })
    }
  })
}

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
