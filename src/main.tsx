import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/globals.css"

// Mount the main app
const rootElement = document.getElementById("root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// Export components for Sphinx integration
export { FeatureCards } from "./components/examples/FeatureCards"
export { Chart } from "./components/examples/Chart"
export { UserGuideSection } from "./components/examples/UserGuideSection"
export { componentRegistry } from "./components/registry"

// Global function for Sphinx to mount components
;(window as any).mountReactComponent = (componentName: string, element: HTMLElement, props: any = {}) => {
  const { componentRegistry } = require("./components/registry")
  const Component = componentRegistry[componentName]

  if (Component) {
    const root = ReactDOM.createRoot(element)
    root.render(React.createElement(Component, props))
  } else {
    console.warn(`Component ${componentName} not found in registry`)
  }
}
