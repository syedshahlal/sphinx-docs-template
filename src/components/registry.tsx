import type React from "react"
import { FeatureCards } from "./examples/FeatureCards"
import { Chart } from "./examples/Chart"
import { UserGuideSection } from "./examples/UserGuideSection"

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  FeatureCards,
  Chart,
  UserGuideSection,
}
