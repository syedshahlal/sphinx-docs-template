import type React from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

export default FeatureCard
