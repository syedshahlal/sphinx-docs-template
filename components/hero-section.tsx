import type React from "react"

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-background text-foreground">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Welcome to Our Amazing Platform</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover a world of possibilities with our innovative solutions. We are here to help you achieve your goals
          and make a difference.
        </p>
        <a
          href="#"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}

export default HeroSection
