import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function APIReferencePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
            <p className="text-xl text-gray-600">
              Complete API documentation with examples and best practices for the GRA Core Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🔌</span>
                <h2 className="text-xl font-semibold text-gray-900">Core API</h2>
              </div>
              <p className="text-gray-600 mb-4">Essential API endpoints for platform functionality.</p>
              <a href="/api-reference/core" className="text-blue-600 hover:text-blue-800 font-medium">
                View documentation →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🔐</span>
                <h2 className="text-xl font-semibold text-gray-900">Authentication</h2>
              </div>
              <p className="text-gray-600 mb-4">Authentication and security API endpoints.</p>
              <a href="/api-reference/authentication" className="text-blue-600 hover:text-blue-800 font-medium">
                View documentation →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📊</span>
                <h2 className="text-xl font-semibold text-gray-900">Data Models</h2>
              </div>
              <p className="text-gray-600 mb-4">Schema definitions and data types.</p>
              <a href="/api-reference/data-models" className="text-blue-600 hover:text-blue-800 font-medium">
                View documentation →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">📦</span>
                <h2 className="text-xl font-semibold text-gray-900">SDKs</h2>
              </div>
              <p className="text-gray-600 mb-4">Client libraries and software development kits.</p>
              <a href="/api-reference/sdks" className="text-blue-600 hover:text-blue-800 font-medium">
                View documentation →
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Base URL</h3>
                <code className="text-sm bg-white px-2 py-1 rounded border">
                  https://api.gra-core.bankofamerica.com
                </code>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
                <code className="text-sm bg-white px-2 py-1 rounded border">Bearer Token</code>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
