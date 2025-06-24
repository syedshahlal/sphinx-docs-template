---
title: "Feature Cards Component"
type: "ui-component"
layout: "grid"
columns: 3
responsive: true
theme: "interactive-cards"
---

# Feature Cards Component

## Overview
Interactive feature cards that showcase the main sections of the documentation with hover effects and animations.

## Configuration
\`\`\`yaml
feature_cards:
  enabled: true
  layout:
    columns: 3
    gap: "2rem"
    responsive: true
  cards:
    - id: "platform-overview"
      title: "Platform Overview"
      description: "Get started with GRA Core Platform fundamentals and core concepts."
      icon: "🚀"
      color: "blue"
      gradient: "from-blue-500/20 to-cyan-500/20"
      link: "../platform-overview/index.html"
      topics:
        - "Architecture Overview"
        - "Core Services"
        - "Best Practices"
    - id: "getting-started"
      title: "Getting Started"
      description: "Quick setup guide and installation instructions to get you running."
      icon: "📖"
      color: "green"
      gradient: "from-green-500/20 to-emerald-500/20"
      link: "../getting-started/index.html"
      topics:
        - "Installation Guide"
        - "Quick Start"
        - "Configuration"
    - id: "data-processing"
      title: "Data Processing"
      description: "Advanced data processing capabilities and pipeline management."
      icon: "⚡"
      color: "purple"
      gradient: "from-purple-500/20 to-pink-500/20"
      link: "../data-processing/index.html"
      topics:
        - "Data Pipelines"
        - "Stream Processing"
        - "Batch Operations"
    - id: "api-integration"
      title: "API Integration"
      description: "Comprehensive API documentation with examples and authentication."
      icon: "🔌"
      color: "orange"
      gradient: "from-orange-500/20 to-red-500/20"
      link: "../api-integration/index.html"
      topics:
        - "REST APIs"
        - "Authentication"
        - "SDKs & Libraries"
    - id: "security-compliance"
      title: "Security & Compliance"
      description: "Enterprise security features and compliance guidelines."
      icon: "🔒"
      color: "teal"
      gradient: "from-teal-500/20 to-cyan-500/20"
      link: "../security-compliance/index.html"
      topics:
        - "Security Policies"
        - "Compliance Standards"
        - "Audit Trails"
    - id: "monitoring-analytics"
      title: "Monitoring & Analytics"
      description: "Real-time monitoring, analytics, and performance insights."
      icon: "📊"
      color: "indigo"
      gradient: "from-indigo-500/20 to-blue-500/20"
      link: "../monitoring-analytics/index.html"
      topics:
        - "Real-time Metrics"
        - "Custom Dashboards"
        - "Alerting System"
\`\`\`

## Individual Card Files
Each feature card has its own detailed file:

- [Platform Overview Card](./platform-overview.md)
- [Getting Started Card](./getting-started.md)
- [Data Processing Card](./data-processing.md)
- [API Integration Card](./api-integration.md)
- [Security & Compliance Card](./security-compliance.md)
- [Monitoring & Analytics Card](./monitoring-analytics.md)

## HTML Structure
\`\`\`html
<section class="feature-cards-section py-16 px-4">
  <div class="container mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
          Explore the Documentation
        </span>
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Comprehensive guides and references to help you master GRA Core Platform
      </p>
    </div>
    
    <!-- Cards Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <!-- Individual cards will be rendered here -->
    </div>
  </div>
</section>
\`\`\`

## CSS Styles
\`\`\`css
.feature-card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 2rem;
  height: 100%;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transform: translateY(-8px);
  border-color: var(--card-hover-border);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--card-gradient);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.feature-card:hover .feature-card-icon {
  transform: scale(1.1);
}

.feature-card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-card-title {
  color: var(--card-hover-color);
}

.feature-card-description {
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-card-description {
  color: #374151;
}

.feature-card-topics {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-card-topic {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-card-topic {
  color: #374151;
}

.feature-card-topic::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--topic-dot-color);
  margin-right: 0.75rem;
  flex-shrink: 0;
}
\`\`\`

## Responsive Design
\`\`\`css
@media (max-width: 1024px) {
  .feature-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .feature-cards-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}
\`\`\`

## JavaScript Interactions
\`\`\`javascript
// Add hover effects and click tracking
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.setProperty('--card-hover-border', this.dataset.hoverColor);
    this.style.setProperty('--card-gradient', this.dataset.gradient);
    this.style.setProperty('--card-hover-color', this.dataset.color);
    this.style.setProperty('--topic-dot-color', this.dataset.color);
  });
  
  card.addEventListener('click', function() {
    // Track card clicks
    if (typeof gtag !== 'undefined') {
      gtag('event', 'feature_card_click', {
        'card_title': this.dataset.title,
        'card_link': this.dataset.link
      });
    }
    
    // Navigate to link
    window.location.href = this.dataset.link;
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});
\`\`\`

## Usage
Include this component in the main content area of the homepage after the hero section.

## Dependencies
- Tailwind CSS
- Intersection Observer API
- CSS Grid
- CSS Custom Properties
- Optional: Google Analytics for tracking
