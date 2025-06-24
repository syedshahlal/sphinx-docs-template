---
title: "Bank of America Theme"
type: "theme"
version: "1.0.0"
author: "Bank of America Technology Team"
---

# Bank of America Theme

## Overview
The BoA theme provides the official Bank of America branding and styling for the GRA Core Platform documentation.

## Theme Structure
\`\`\`
src/gcp_docs/themes/boa-theme/
├── index.md                 # Theme documentation
├── config.yml              # Theme configuration
├── layouts/                # Layout templates
│   ├── base.html           # Base layout
│   ├── homepage.html       # Homepage layout
│   ├── documentation.html  # Documentation pages
│   └── components/         # Layout components
├── assets/                 # Theme assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── images/            # Theme images
│   └── fonts/             # Custom fonts
└── partials/              # Reusable template parts
    ├── header.html        # Site header
    ├── footer.html        # Site footer
    ├── navigation.html    # Navigation menu
    └── sidebar.html       # Sidebar content
\`\`\`

## Configuration
\`\`\`yaml
theme:
  name: "boa-theme"
  version: "1.0.0"
  description: "Official Bank of America theme for GRA Core Platform documentation"
  
  # Brand Colors
  colors:
    primary: "#e31837"        # BoA Red
    secondary: "#012169"      # BoA Blue
    accent: "#0066cc"         # Light Blue
    text: "#333333"           # Dark Gray
    text_muted: "#666666"     # Medium Gray
    background: "#ffffff"     # White
    surface: "#f5f5f5"        # Light Gray
    border: "#e0e0e0"         # Border Gray
  
  # Typography
  fonts:
    primary: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    monospace: "'JetBrains Mono', 'Fira Code', Consolas, monospace"
    headings: "Inter, sans-serif"
  
  # Layout
  layout:
    max_width: "1200px"
    sidebar_width: "280px"
    header_height: "80px"
    footer_height: "120px"
  
  # Components
  components:
    banner: true
    hero: true
    feature_cards: true
    chatbot: true
    search: true
    version_switcher: true
    theme_toggle: true
  
  # Responsive Breakpoints
  breakpoints:
    sm: "640px"
    md: "768px"
    lg: "1024px"
    xl: "1280px"
    xxl: "1536px"
\`\`\`

## CSS Variables
\`\`\`css
:root {
  /* Bank of America Brand Colors */
  --boa-red: #e31837;
  --boa-blue: #012169;
  --boa-navy: #001f5f;
  --boa-light-blue: #0066cc;
  --boa-gray: #666666;
  --boa-light-gray: #f5f5f5;
  --boa-white: #ffffff;

  /* Semantic Colors */
  --primary-color: var(--boa-red);
  --secondary-color: var(--boa-blue);
  --accent-color: var(--boa-light-blue);
  --text-color: #333333;
  --text-muted: var(--boa-gray);
  --background-color: var(--boa-white);
  --surface-color: #fafafa;
  --border-color: #e0e0e0;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Typography */
  --font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: "JetBrains Mono", "Fira Code", Consolas, monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
}

/* Dark theme variables */
[data-theme="dark"] {
  --primary-color: #ff4757;
  --secondary-color: #3742fa;
  --accent-color: #2ed573;
  --text-color: #ffffff;
  --text-muted: #a4a4a4;
  --background-color: #1a1a1a;
  --surface-color: #2d2d2d;
  --border-color: #404040;
  --boa-light-gray: #2d2d2d;
}
\`\`\`

## Component Styles
The theme includes comprehensive styling for all components:

### [Header Styles](./components/header.md)
### [Navigation Styles](./components/navigation.md)
### [Feature Cards Styles](./components/feature-cards.md)
### [Chatbot Styles](./components/chatbot.md)
### [Footer Styles](./components/footer.md)

## Layout Templates
\`\`\`html
<!-- Base Layout Template -->
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ page.title }} - {{ site.title }}</title>
  
  <!-- Theme CSS -->
  <link rel="stylesheet" href="{{ '/assets/css/boa-theme.css' | relative_url }}">
  <link rel="stylesheet" href="{{ '/assets/css/components.css' | relative_url }}">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Meta -->
  <meta name="description" content="{{ page.description | default: site.description }}">
  <meta name="theme-color" content="#e31837">
</head>
<body class="boa-theme">
  <!-- Banner Component -->
  {% if site.banner.enabled %}
    {% include partials/banner.html %}
  {% endif %}
  
  <!-- Header Component -->
  {% include partials/header.html %}
  
  <!-- Main Content -->
  <main class="main-content">
    {{ content }}
  </main>
  
  <!-- Footer Component -->
  {% include partials/footer.html %}
  
  <!-- Chatbot Component -->
  {% if site.chatbot.enabled %}
    {% include partials/chatbot.html %}
  {% endif %}
  
  <!-- Theme JavaScript -->
  <script src="{{ '/assets/js/theme.js' | relative_url }}"></script>
  <script src="{{ '/assets/js/components.js' | relative_url }}"></script>
</body>
</html>
\`\`\`

## Responsive Design
The theme is fully responsive with mobile-first design:

\`\`\`css
/* Mobile First Approach */
.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
\`\`\`

## Accessibility Features
- WCAG 2.1 AA compliance
- High contrast mode support
- Keyboard navigation
- Screen reader optimization
- Focus indicators
- Semantic HTML structure

## Performance Optimizations
- CSS minification
- JavaScript bundling
- Image optimization
- Font loading optimization
- Critical CSS inlining
- Lazy loading for images

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization
The theme can be customized by:
1. Overriding CSS variables
2. Creating custom component styles
3. Modifying layout templates
4. Adding custom JavaScript

## Installation
\`\`\`bash
# Copy theme files to your documentation project
cp -r src/gcp_docs/themes/boa-theme/ your-project/themes/

# Update your configuration to use the theme
echo "theme: boa-theme" >> your-project/config.yml
\`\`\`

## Development
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
\`\`\`

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on contributing to the theme.

## License
This theme is proprietary to Bank of America and is licensed for internal use only.
