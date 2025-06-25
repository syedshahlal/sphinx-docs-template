import { Layout } from "./components/layout/Layout"
import { FeatureCards } from "./components/examples/FeatureCards"
import { Chart } from "./components/examples/Chart"
import { UserGuideSection } from "./components/examples/UserGuideSection"

function App() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">GRA Core Platform</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade platform for building scalable, secure applications with modern developer experience.
          </p>
        </div>

        {/* Feature Cards */}
        <FeatureCards />

        {/* Metrics Chart */}
        <Chart title="Platform Usage Metrics" />

        {/* User Guide */}
        <UserGuideSection />

        {/* Example of dynamic mounting area */}
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Dynamic Component Area</h3>
          <p className="text-muted-foreground mb-4">
            Components with <code>data-component</code> attributes will be mounted here automatically.
          </p>

          {/* This div will have React components mounted dynamically */}
          <div
            data-component="FeatureCards"
            data-props='{"title": "Dynamic Features", "subtitle": "Loaded via data attributes"}'
            className="react-mount"
          />
        </div>
      </div>
    </Layout>
  )
}

export default App
