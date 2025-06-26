// Search functionality
class SearchManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupSearchInput()
    this.setupKeyboardShortcuts()
  }

  setupSearchInput() {
    const searchInput = document.querySelector(".search-input")
    if (!searchInput) return

    searchInput.addEventListener(
      "input",
      this.debounce((e) => {
        const query = e.target.value.trim()
        if (query.length > 2) {
          this.performSearch(query)
        }
      }, 300),
    )
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector(".search-input")
        if (searchInput) {
          searchInput.focus()
        }
      }
    })
  }

  async performSearch(query) {
    console.log("Searching for:", query)
    // Integrate with your search backend here
  }

  displaySearchResults(results) {
    console.log("Search results:", results)
    // Display search results in a dropdown or modal
  }

  debounce(func, wait) {
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
}

// Initialize search when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SearchManager()
})
