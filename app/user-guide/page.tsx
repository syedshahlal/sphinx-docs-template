import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function UserGuidePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">User Guide</h1>
            <p className="text-xl text-gray-600">
              Comprehensive guides covering all aspects of using the GRA Core Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🚀</span>
                <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
              </div>
              <p className="text-gray-600 mb-4">Quick setup and installation guide to get you up and running.</p>
              <a href="/user-guide/getting-started" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⚙️</span>
                <h2 className="text-xl font-semibold text-gray-900">Configuration</h2>
              </div>
              <p className="text-gray-600 mb-4">Customize your setup and configure the platform for your needs.</p>
              <a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">⭐</span>
                <h2 className="text-xl font-semibold text-gray-900">Best Practices</h2>
              </div>
              <p className="text-gray-600 mb-4">Tips and recommendations for optimal platform usage.</p>
              <a href="/user-guide/best-practices" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">🔧</span>
                <h2 className="text-xl font-semibold text-gray-900">Troubleshooting</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Common issues and their solutions to help you resolve problems quickly.
              </p>
              <a href="/user-guide/troubleshooting" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
