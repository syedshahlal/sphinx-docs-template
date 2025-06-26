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
    <div className="group relative overflow-hidden rounded-xl bg-secondary p-8 hover:bg-secondary/50 transition-colors duration-300">
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent">{icon}</div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground transition-colors">{title}</h3>
      <div className="CardContent">
        <p className="leading-relaxed text-muted-foreground mb-0 group-hover:text-foreground transition-colors">
          {description}
        </p>
      </div>

      <div className="Feature Details">
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

      <div className={`mt-4 transition-all duration-500`}>
        <a href={ctaLink} className="inline-flex items-center font-medium">
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default FeatureCard
