import Link from "next/link"
import { FeatureCards } from "@/components/features/FeatureCards" // Ensure this path is correct

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to GRA Core Platform</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          The central hub for all documentation, guides, and API references for the GRA Core Platform.
        </p>
        <Link
          href="/docs/introduction"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      <FeatureCards />

      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">Explore Documentation</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">User Guides</h3>
            <p className="text-gray-700 mb-4">Step-by-step instructions for using platform features.</p>
            <Link href="/docs/user-guide" className="text-blue-500 hover:underline font-medium">
              View Guides &rarr;
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">API Reference</h3>
            <p className="text-gray-700 mb-4">Detailed information about our APIs and SDKs.</p>
            <Link href="/docs/api-reference" className="text-blue-500 hover:underline font-medium">
              Explore APIs &rarr;
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Tutorials</h3>
            <p className="text-gray-700 mb-4">Practical examples and walkthroughs.</p>
            <Link href="/docs/tutorials" className="text-blue-500 hover:underline font-medium">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
