import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function ExamplesPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Examples</h1>
            <p className="text-xl text-gray-600">
              Real-world examples and tutorials to help you get started quickly with the GRA Core Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⚡</span>
                <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
              </div>
              <p className="text-gray-600 mb-4">Get running in 5 minutes with our quick start guide.</p>
              <a href="/examples/quick-start" className="text-blue-600 hover:text-blue-800 font-medium">
                Start now →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📚</span>
                <h2 className="text-xl font-semibold text-gray-900">Tutorials</h2>
              </div>
              <p className="text-gray-600 mb-4">Step-by-step guides for common use cases.</p>
              <a href="/examples/tutorials" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse tutorials →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">💻</span>
                <h2 className="text-xl font-semibold text-gray-900">Code Samples</h2>
              </div>
              <p className="text-gray-600 mb-4">Ready-to-use code snippets and examples.</p>
              <a href="/examples/code-samples" className="text-blue-600 hover:text-blue-800 font-medium">
                View samples →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🎨</span>
                <h2 className="text-xl font-semibold text-gray-900">Templates</h2>
              </div>
              <p className="text-gray-600 mb-4">Project starters and boilerplate templates.</p>
              <a href="/examples/templates" className="text-blue-600 hover:text-blue-800 font-medium">
                Download templates →
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Example</h2>
            <div className="bg-white rounded-lg p-4 border">
              <h3 className="font-medium text-gray-900 mb-2">Building a Data Processing Pipeline</h3>
              <p className="text-gray-600 mb-4">
                Learn how to create a complete data processing pipeline using the GRA Core Platform APIs.
              </p>
              <div className="flex space-x-4">
                <a href="/examples/data-pipeline" className="text-blue-600 hover:text-blue-800 font-medium">
                  View Example →
                </a>
                <a href="https://github.com/gra-core/examples" className="text-gray-600 hover:text-gray-800">
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
