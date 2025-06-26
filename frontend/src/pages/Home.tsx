import { Header } from "../components/features/header"
import { Banner } from "../components/features/banner"
import { FeatureCards } from "../components/features/feature-cards"
import { SeeAlsoSection } from "../components/features/see-also-section"
import { UserGuideSection } from "../components/features/user-guide-section"

export function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Banner />
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <FeatureCards />
        <SeeAlsoSection />
        <UserGuideSection />
      </main>
    </div>
  )
}
