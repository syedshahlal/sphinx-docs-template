import type React from "react"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
  icon: React.ReactNode
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, features, ctaText, ctaLink, icon }) => {
  return (
    <div className="feature-card">
      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />

      {/* Icon */}
      <div className="feature-card-icon">{icon}</div>

      {/* Title */}
      <h3 className="feature-card-title">{title}</h3>

      {/* Description */}
      <div className="mb-4">
        <p className="feature-card-description mb-0">{description}</p>
      </div>

      {/* Features List */}
      <div className="mb-6">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <a href={ctaLink} className="feature-card-cta">
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default FeatureCard
