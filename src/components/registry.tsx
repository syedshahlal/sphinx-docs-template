import type React from "react"
import { FeatureCards } from "./examples/FeatureCards"
import { Chart } from "./examples/Chart"
import { UserGuideSection } from "./examples/UserGuideSection"

// Component registry for dynamic mounting
export const componentRegistry: Record<string, React.ComponentType<any>> = {
  FeatureCards,
  Chart,
  UserGuideSection,
}

// Export individual components for direct import
export { FeatureCards, Chart, UserGuideSection }
