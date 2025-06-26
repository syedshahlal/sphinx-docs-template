// GRA Core Platform Documentation JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize version selector
  initVersionSelector()

  // Initialize search enhancements
  initSearchEnhancements()

  // Initialize React component mounting
  initReactComponents()

  // Initialize analytics
  initAnalytics()
})

function initVersionSelector() {
  const versionSelector = document.querySelector(".version-selector select")
  if (versionSelector) {
    versionSelector.addEventListener("change", function () {
      const selectedVersion = this.value
      if (selectedVersion) {
        window.location.href = selectedVersion
      }
    })
  }
}

function initSearchEnhancements() {
  const searchInput = document.querySelector('input[name="q"]')
  if (searchInput) {
    // Add search suggestions
    searchInput.addEventListener(
      "input",
      debounce(function () {
        const query = this.value
        if (query.length > 2) {
          fetchSearchSuggestions(query)
        }
      }, 300),
    )
  }
}

function initReactComponents() {
  // Find all React component placeholders
  const reactPlaceholders = document.querySelectorAll("[data-react-component]")

  reactPlaceholders.forEach((placeholder) => {
    const componentName = placeholder.dataset.reactComponent
    const props = JSON.parse(placeholder.dataset.reactProps || "{}")

    // Load and mount React component
    loadReactComponent(componentName, props, placeholder)
  })
}

function initAnalytics() {
  // Declare gtag variable
  const gtag = window.gtag || (() => {})

  // Track page views
  if (typeof gtag !== "undefined") {
    gtag("config", "GA_MEASUREMENT_ID", {
      page_title: document.title,
      page_location: window.location.href,
    })
  }

  // Track documentation interactions
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a")
    if (link && link.href) {
      trackLinkClick(link.href, link.textContent)
    }
  })
}

function fetchSearchSuggestions(query) {
  fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((suggestions) => {
      displaySearchSuggestions(suggestions)
    })
    .catch((error) => {
      console.error("Error fetching search suggestions:", error)
    })
}

function displaySearchSuggestions(suggestions) {
  // Implementation for displaying search suggestions
  const suggestionsContainer = document.getElementById("search-suggestions")
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = suggestions
      .map((suggestion) => `<div class="suggestion-item">${suggestion.title}</div>`)
      .join("")
  }
}

function loadReactComponent(componentName, props, container) {
  // Show loading state
  container.innerHTML = '<div class="react-component-loading">Loading component...</div>'

  // In a real implementation, this would load the React component
  // For now, we'll just show a placeholder
  setTimeout(() => {
    container.innerHTML = `
            <div class="react-component">
                <h3>${componentName}</h3>
                <p>React component would be rendered here with props: ${JSON.stringify(props)}</p>
            </div>
        `
  }, 1000)
}

function trackLinkClick(href, text) {
  const gtag = window.gtag || (() => {})
  if (typeof gtag !== "undefined") {
    gtag("event", "click", {
      event_category: "documentation",
      event_label: href,
      value: text,
    })
  }
}

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

// Utility functions for React integration
window.GRADocs = {
  mountComponent: loadReactComponent,
  trackEvent: trackLinkClick,
  utils: {
    debounce: debounce,
  },
}
