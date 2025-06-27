import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="border-b pb-6">
            <nav className="text-sm text-gray-500 mb-4">
              <a href="/user-guide" className="hover:text-gray-700">
                User Guide
              </a>{" "}
              / Getting Started
            </nav>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Getting Started</h1>
            <p className="text-xl text-gray-600">
              Quick setup and installation guide to get you up and running with GRA Core Platform.
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prerequisites</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Node.js 18.0 or higher</li>
              <li>npm or yarn package manager</li>
              <li>Git for version control</li>
              <li>A modern web browser</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Installation</h2>
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <code className="text-sm">npm install @gra-core/platform</code>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Quick Start</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Initialize your project</li>
              <li>Configure your environment</li>
              <li>Start the development server</li>
              <li>Access the platform dashboard</li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-800">
                <strong>Next Steps:</strong> Once you've completed the installation, check out our
                <a href="/user-guide/configuration" className="text-blue-600 hover:text-blue-800 ml-1">
                  Configuration Guide
                </a>
                to customize your setup.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
