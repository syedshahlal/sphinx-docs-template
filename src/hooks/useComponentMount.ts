"use client"

import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { componentRegistry } from "../components/registry"

export function useComponentMount() {
  useEffect(() => {
    const mountComponents = () => {
      const mountPoints = document.querySelectorAll("[data-component]")

      mountPoints.forEach((element) => {
        const componentName = element.getAttribute("data-component")
        const propsString = element.getAttribute("data-props")

        if (componentName && componentRegistry[componentName]) {
          const Component = componentRegistry[componentName]
          let props = {}

          if (propsString) {
            try {
              props = JSON.parse(propsString)
            } catch (e) {
              console.warn(`Invalid props for component ${componentName}:`, e)
            }
          }

          const root = createRoot(element)
          root.render(<Component {...props} />)
        }
      })
    }

    // Mount components on initial load
    mountComponents()

    // Re-mount when content changes (for dynamic content)
    const observer = new MutationObserver(mountComponents)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-component"],
    })

    return () => observer.disconnect()
  }, [])
}
