---
title: "Platform Overview Card"
parent: "feature-cards"
id: "platform-overview"
icon: "🚀"
color: "blue"
gradient: "from-blue-500/20 to-cyan-500/20"
link: "../../platform-overview/index.html"
---

# Platform Overview Feature Card

## Card Configuration
\`\`\`yaml
card:
  id: "platform-overview"
  title: "Platform Overview"
  description: "Get started with GRA Core Platform fundamentals and core concepts."
  icon: "🚀"
  color: "blue"
  gradient: "from-blue-500/20 to-cyan-500/20"
  hover_color: "#2563eb"
  border_hover: "#3b82f6"
  link: "../../platform-overview/index.html"
  topics:
    - "Architecture Overview"
    - "Core Services"
    - "Best Practices"
    - "System Components"
\`\`\`

## HTML Structure
\`\`\`html
<a href="../../platform-overview/index.html" class="group block">
  <div class="feature-card bg-white rounded-2xl border border-gray-200 p-8 h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-300"
       data-title="Platform Overview"
       data-color="#2563eb"
       data-hover-color="#3b82f6"
       data-gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))"
       data-link="../../platform-overview/index.html">
    
    <!-- Header -->
    <div class="flex items-center mb-6">
      <div class="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <span class="text-2xl">🚀</span>
      </div>
      <h3 class="text-xl font-bold ml-4 group-hover:text-blue-600 transition-colors">Platform Overview</h3>
    </div>
    
    <!-- Description -->
    <p class="text-gray-600 mb-6 group-hover:text-gray-800 transition-colors">
      Get started with GRA Core Platform fundamentals and core concepts.
    </p>
    
    <!-- Topics -->
    <div class="space-y-2">
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
        <span>Architecture Overview</span>
      </div>
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
        <span>Core Services</span>
      </div>
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
        <span>Best Practices</span>
      </div>
      <div class="flex items-center text-sm text-gray-500">
        <div class="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
        <span>System Components</span>
      </div>
    </div>
  </div>
</a>
\`\`\`

## Linked Content
This card links to the [Platform Overview](../../platform-overview/index.md) section which contains:

- System architecture diagrams
- Core service descriptions
- Best practices documentation
- Component interaction guides

## Styling Variables
\`\`\`css
:root {
  --platform-overview-primary: #2563eb;
  --platform-overview-secondary: #3b82f6;
  --platform-overview-gradient: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
  --platform-overview-hover-shadow: 0 25px 50px rgba(37, 99, 235, 0.15);
}
\`\`\`

## Interactive States
- **Default**: Clean white card with subtle border
- **Hover**: Blue gradient background, elevated shadow, scaled icon
- **Focus**: Keyboard navigation support with focus ring
- **Active**: Pressed state with slight scale reduction

## Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Focus indicators

## Analytics Tracking
\`\`\`javascript
// Track card interactions
function trackPlatformOverviewCard(action) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'platform_overview_card', {
      'action': action,
      'card_position': 1,
      'section': 'feature_cards'
    });
  }
}
