/**
 * HeroSection – prominent introductory banner.
 * Uses Tailwind utility classes that rely on our global CSS-variable theme.
 */
export function HeroSection() {
  return (
    <section className="py-16 px-4 bg-background text-foreground transition-colors">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Our Amazing Platform</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover a world of possibilities with our innovative solutions. We’re here to help you achieve your goals and
          make a&nbsp;difference.
        </p>
        <a
          href="#"
          className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Get&nbsp;Started
        </a>
      </div>
    </section>
  )
}

/* Default export so either `import HeroSection` or `import { HeroSection }`
   works without errors. */
export default HeroSection
