import { Header } from "@/components/header"
import { Banner } from "@/components/banner"
import { FeatureCards } from "@/components/feature-cards"
import { SeeAlsoSection } from "@/components/see-also-section"
import { UserGuideSection } from "@/components/user-guide-section"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      {/* Hero Section with Create Doc CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">GRA Core Platform Documentation</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, manage, and publish beautiful documentation with our visual markdown editor. No coding required -
            just drag, drop, and publish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/markdown-editor"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Create New Document
            </Link>
            <Link
              href="/user-guide"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-blue-600 bg-white hover:bg-gray-50 border-2 border-blue-600 rounded-lg transition-colors duration-200"
            >
              <FileText className="w-5 h-5" />
              View Documentation
            </Link>
          </div>
        </div>
      </section>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <FeatureCards />
        <SeeAlsoSection />
        <UserGuideSection />
      </main>
    </div>
  )
}
