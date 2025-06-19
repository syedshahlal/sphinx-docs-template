import { Header } from "@/components/header"
import { Banner } from "@/components/banner"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { SeeAlsoSection } from "@/components/see-also-section"
import { UserGuideSection } from "@/components/user-guide-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <HeroSection />
        <FeatureCards />
        <SeeAlsoSection />
        <UserGuideSection />
      </main>
    </div>
  )
}
