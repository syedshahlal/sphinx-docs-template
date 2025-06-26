// React Integration JavaScript for Sphinx Documentation

;(() => {
  // Initialize React integration when DOM is ready
  function initReactIntegration() {
    console.log("🚀 Initializing React integration for Sphinx documentation")

    // Add loading indicators
    addLoadingIndicators()

    // Setup component error handling
    setupErrorHandling()

    // Setup responsive behavior
    setupResponsiveBehavior()

    // Setup accessibility features
    setupAccessibility()

    // Process any queued components
    if (window.SphinxReact && window.SphinxReact.processQueue) {
      window.SphinxReact.processQueue()
    }
  }

  function addLoadingIndicators() {
    const componentContainers = document.querySelectorAll(".react-component-embed, .react-page-embed")

    componentContainers.forEach((container) => {
      const loadingElement = container.querySelector(".react-loading")
      if (loadingElement) {
        // Add spinner animation
        loadingElement.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div class="spinner" style="
                            width: 20px; 
                            height: 20px; 
                            border: 2px solid #e2e8f0; 
                            border-top: 2px solid #4299e1; 
                            border-radius: 50%; 
                            animation: spin 1s linear infinite;
                        "></div>
                        <span>Loading component...</span>
                    </div>
                `
      }
    })

    // Add spinner animation CSS
    if (!document.getElementById("react-spinner-styles")) {
      const style = document.createElement("style")
      style.id = "react-spinner-styles"
      style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `
      document.head.appendChild(style)
    }
  }

  function setupErrorHandling() {
    // Global error handler for React components
    window.addEventListener("error", (event) => {
      if (event.error && event.error.stack && event.error.stack.includes("React")) {
        console.error("React component error:", event.error)

        // Find and update any loading components with error state
        const loadingElements = document.querySelectorAll(".react-loading")
        loadingElements.forEach((element) => {
          if (element.textContent.includes("Loading")) {
            element.innerHTML = `
                            <div style="text-align: center; color: #ef4444; padding: 1rem;">
                                <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">⚠️</div>
                                <div>Component failed to load</div>
                                <div style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.7;">
                                    Check browser console for details
                                </div>
                            </div>
                        `
          }
        })
      }
    })
  }

  function setupResponsiveBehavior() {
    // Handle responsive component sizing
    function updateComponentSizes() {
      const components = document.querySelectorAll(".react-component-embed, .react-page-embed")
      const isMobile = window.innerWidth < 768

      components.forEach((component) => {
        if (isMobile) {
          component.style.height = "300px"
        } else {
          // Restore original height from data attribute or default
          const originalHeight = component.dataset.originalHeight || "400px"
          component.style.height = originalHeight
        }
      })
    }

    // Store original heights
    document.querySelectorAll(".react-component-embed, .react-page-embed").forEach((component) => {
      component.dataset.originalHeight = component.style.height || "400px"
    })

    // Update on resize
    window.addEventListener("resize", debounce(updateComponentSizes, 250))
    updateComponentSizes()
  }

  function setupAccessibility() {
    // Add ARIA labels and keyboard navigation
    document.querySelectorAll(".react-component-embed, .react-page-embed").forEach((component) => {
      // Add ARIA label
      if (!component.getAttribute("aria-label")) {
        const header = component.querySelector(".react-component-header, .react-page-header")
        if (header) {
          const label = header.textContent.trim()
          component.setAttribute("aria-label", label)
        }
      }

      // Make focusable if interactive
      if (component.querySelector('[data-interactive="true"]')) {
        component.setAttribute("tabindex", "0")
      }
    })

    // Add keyboard navigation
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        // Highlight focused component
        const focusedComponent = document.activeElement
        if (
          focusedComponent.classList.contains("react-component-embed") ||
          focusedComponent.classList.contains("react-page-embed")
        ) {
          focusedComponent.style.outline = "2px solid #4299e1"
          focusedComponent.style.outlineOffset = "2px"
        }
      }
    })

    document.addEventListener(
      "blur",
      (event) => {
        if (
          event.target.classList.contains("react-component-embed") ||
          event.target.classList.contains("react-page-embed")
        ) {
          event.target.style.outline = ""
          event.target.style.outlineOffset = ""
        }
      },
      true,
    )
  }

  // Utility function for debouncing
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

  // Component lifecycle management
  window.SphinxReactIntegration = {
    init: initReactIntegration,

    // Method to manually render a component
    renderComponent: (componentName, props, containerId, interactive = false) => {
      if (window.SphinxReact && window.SphinxReact.renderComponent) {
        window.SphinxReact.renderComponent(componentName, props, containerId, interactive)
      } else {
        console.warn("SphinxReact not available. Component bundle may not be loaded.")
      }
    },

    // Method to check if React is ready
    isReady: () => !!(window.React && window.ReactDOM && window.SphinxReact),

    // Method to get available components
    getComponents: () => (window.SphinxReact ? window.SphinxReact.components : {}),
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReactIntegration)
  } else {
    initReactIntegration()
  }

  // Also initialize when React bundle is loaded
  window.addEventListener("load", () => {
    setTimeout(initReactIntegration, 100) // Small delay to ensure React is ready
  })
})()

// Debug helper
window.debugSphinxReact = () => {
  console.log("🔍 Sphinx React Integration Debug Info:")
  console.log("React available:", !!window.React)
  console.log("ReactDOM available:", !!window.ReactDOM)
  console.log("SphinxReact available:", !!window.SphinxReact)
  console.log("Components:", window.SphinxReact ? Object.keys(window.SphinxReact.components) : "None")
  console.log("Component queue:", window.reactComponentQueue || [])
  console.log("Page queue:", window.reactPageQueue || [])
}
