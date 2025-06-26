import { Hero } from "@/components/home/Hero"
import { FeaturesGrid } from "@/components/home/FeaturesGrid"
import { Cta } from "@/components/home/Cta"
import { Testimonials } from "@/components/home/Testimonials"
import { Header } from "@/components/core/Header"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesGrid />
        <Testimonials />
        <Cta />
      </main>
    </div>
  )
}
