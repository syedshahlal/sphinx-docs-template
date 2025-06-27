import { Header } from "@/components/header"
import { Banner } from "@/components/banner"
import { FeatureCards } from "@/components/feature-cards"
import { SeeAlsoSection } from "@/components/see-also-section"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-900">
      <Banner />
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <FeatureCards />
            <SeeAlsoSection />
          </div>
        </main>
      </div>
    </div>
  )
}
