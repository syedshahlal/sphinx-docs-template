import { Header } from "@/components/header"
import { Banner } from "@/components/banner"
import { FeatureCards } from "@/components/feature-cards"
import { SeeAlsoSection } from "@/components/see-also-section"

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <FeatureCards />
        <SeeAlsoSection />
      </main>
    </div>
  )
}
