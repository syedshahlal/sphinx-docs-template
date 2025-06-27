import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Mount the app
const rootElement = document.getElementById("root")
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// Export for Sphinx integration
declare global {
  interface Window {
    SphinxReactApp: {
      mount: (element: HTMLElement) => void
      unmount: (element: HTMLElement) => void
      mountComponent: (element: HTMLElement, componentName: string, props?: any) => void
    }
  }
}

window.SphinxReactApp = {
  mount: (element: HTMLElement) => {
    const root = ReactDOM.createRoot(element)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    ;(element as any).__reactRoot = root
  },

  unmount: (element: HTMLElement) => {
    const root = (element as any).__reactRoot
    if (root) {
      root.unmount()
      delete (element as any).__reactRoot
    }
  },

  mountComponent: (element: HTMLElement, componentName: string, props = {}) => {
    import("./components/registry").then(({ componentRegistry }) => {
      const Component = componentRegistry[componentName]
      if (Component) {
        const root = ReactDOM.createRoot(element)
        root.render(React.createElement(Component, props))
        ;(element as any).__reactRoot = root
      }
    })
  },
}
