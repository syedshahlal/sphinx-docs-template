import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function ChangelogPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Changelog</h1>
            <p className="text-xl text-gray-600">
              Stay up to date with the latest changes, improvements, and new features in GRA Core Platform.
            </p>
          </div>

          <div className="space-y-8">
            {/* Version 5.7.0 */}
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center space-x-3 mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">v5.7.0</h2>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">Latest</span>
                <span className="text-gray-500 text-sm">Released on January 15, 2024</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🚀 New Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Enhanced data processing pipeline with 40% performance improvement</li>
                    <li>New authentication system with multi-factor support</li>
                    <li>Advanced monitoring dashboard with real-time metrics</li>
                    <li>Improved API rate limiting and throttling</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🐛 Bug Fixes</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Fixed memory leak in data streaming operations</li>
                    <li>Resolved authentication token refresh issues</li>
                    <li>Fixed pagination errors in large dataset queries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 5.6.2 */}
            <div className="border-l-4 border-gray-300 pl-6">
              <div className="flex items-center space-x-3 mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">v5.6.2</h2>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">Legacy</span>
                <span className="text-gray-500 text-sm">Released on December 10, 2023</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🔧 Improvements</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Enhanced security protocols for data transmission</li>
                    <li>Improved error handling and logging</li>
                    <li>Updated documentation with new examples</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 5.5.4 */}
            <div className="border-l-4 border-gray-300 pl-6">
              <div className="flex items-center space-x-3 mb-3">
                <h2 className="text-2xl font-semibold text-gray-900">v5.5.4</h2>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">Legacy</span>
                <span className="text-gray-500 text-sm">Released on November 5, 2023</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🚀 New Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Added support for batch processing operations</li>
                    <li>New webhook system for real-time notifications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">🐛 Bug Fixes</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Fixed connection timeout issues</li>
                    <li>Resolved data validation errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-medium text-blue-900 mb-2">Migration Guide</h3>
            <p className="text-blue-800 mb-4">
              Need help upgrading to the latest version? Check out our migration guides for step-by-step instructions.
            </p>
            <a href="/migration-guide" className="text-blue-600 hover:text-blue-800 font-medium">
              View Migration Guide →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
