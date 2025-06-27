"use client"

import { useEffect, useRef } from "react"
import type { ComponentMount } from "../types"
import { componentRegistry } from "../components/registry"

export const useComponentMount = () => {
  const mountedComponents = useRef<Map<string, ComponentMount>>(new Map())

  const mountComponent = (container: HTMLElement, componentName: string, props: Record<string, any> = {}) => {
    const Component = componentRegistry[componentName]
    if (!Component) {
      console.warn(`Component "${componentName}" not found in registry`)
      return
    }

    const mountId = `mount-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const mount: ComponentMount = {
      id: mountId,
      component: componentName,
      props,
      container,
    }

    mountedComponents.current.set(mountId, mount)

    // Create React root and render
    import("react-dom/client").then(({ createRoot }) => {
      import("react").then(({ createElement }) => {
        const root = createRoot(container)
        root.render(createElement(Component, props))

        // Store root for cleanup
        ;(container as any).__reactRoot = root
      })
    })

    return mountId
  }

  const unmountComponent = (mountId: string) => {
    const mount = mountedComponents.current.get(mountId)
    if (mount && (mount.container as any).__reactRoot) {
      ;(mount.container as any).__reactRoot.unmount()
      mountedComponents.current.delete(mountId)
    }
  }

  const scanAndMountComponents = () => {
    // Find all elements with data-component attribute
    const elements = document.querySelectorAll("[data-component]")

    elements.forEach((element) => {
      const componentName = element.getAttribute("data-component")
      const propsAttr = element.getAttribute("data-props")

      if (componentName && !element.hasAttribute("data-mounted")) {
        let props = {}
        if (propsAttr) {
          try {
            props = JSON.parse(propsAttr)
          } catch (e) {
            console.warn("Invalid props JSON:", propsAttr)
          }
        }

        mountComponent(element as HTMLElement, componentName, props)
        element.setAttribute("data-mounted", "true")
      }
    })
  }

  useEffect(() => {
    // Initial scan
    scanAndMountComponents()

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              if (element.hasAttribute("data-component") || element.querySelector("[data-component]")) {
                shouldScan = true
              }
            }
          })
        }
      })

      if (shouldScan) {
        setTimeout(scanAndMountComponents, 100)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      // Cleanup all mounted components
      mountedComponents.current.forEach((mount) => {
        if ((mount.container as any).__reactRoot) {
          ;(mount.container as any).__reactRoot.unmount()
        }
      })
      mountedComponents.current.clear()
    }
  }, [])

  return { mountComponent, unmountComponent, scanAndMountComponents }
}
