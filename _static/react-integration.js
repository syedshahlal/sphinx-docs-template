// React integration JavaScript for Sphinx
;(() => {
  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn()
    } else {
      document.addEventListener("DOMContentLoaded", fn)
    }
  }

  // Initialize React components when page loads
  ready(() => {
    // Check if React dashboard assets are loaded
    if (typeof window.mountReactComponent === "function") {
      console.log("React integration ready")

      // Auto-mount components with data-component attributes
      const mountPoints = document.querySelectorAll("[data-component]")
      mountPoints.forEach((element) => {
        const componentName = element.getAttribute("data-component")
        const propsString = element.getAttribute("data-props")

        let props = {}
        if (propsString) {
          try {
            props = JSON.parse(propsString)
          } catch (e) {
            console.warn("Invalid props for component " + componentName + ":", e)
          }
        }

        // Mount the component
        window.mountReactComponent(componentName, element, props)
      })
    } else {
      console.warn("React components not available. Make sure to build the React dashboard first.")
    }
  })

  // Debug function
  window.debugSphinxReact = () => {
    console.log("Sphinx React Integration Debug Info:")
    console.log("- React components available:", typeof window.mountReactComponent === "function")
    console.log("- Mount points found:", document.querySelectorAll("[data-component]").length)
    console.log("- Component registry:", window.componentRegistry || "Not available")

    const mountPoints = document.querySelectorAll("[data-component]")
    mountPoints.forEach((element, index) => {
      console.log(`Mount point ${index + 1}:`, {
        component: element.getAttribute("data-component"),
        props: element.getAttribute("data-props"),
        element: element,
      })
    })
  }
})()
