---
title: "Hero Section Component"
type: "ui-component"
position: "header"
layout: "centered"
theme: "gradient-background"
---

# Hero Section Component

## Overview
The hero section is the main focal point of the homepage, featuring the GRA logo, title, description, and primary call-to-action buttons.

## Configuration
\`\`\`yaml
hero:
  enabled: true
  logo:
    text: "GRA"
    background: "gradient-to-br from-blue-500 to-purple-600"
    size: "w-16 h-16"
  title:
    text: "GRA Core Platform"
    style: "gradient-text"
    size: "text-5xl md:text-6xl"
  subtitle:
    text: "Enterprise-grade platform for data processing, API integration, and secure cloud operations. Built for scale, designed for developers, trusted by Bank of America."
    style: "text-xl text-gray-600"
  background:
    style: "gradient-to-br from-blue-50 via-white to-purple-50"
  buttons:
    primary:
      text: "Get Started"
      link: "../getting-started/index.html"
      style: "gradient-blue-purple"
    secondary:
      text: "API Reference"
      link: "../api-reference/index.html"
      style: "outline-gray"
\`\`\`

## HTML Structure
\`\`\`html
<div class="hero-section py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div class="container mx-auto text-center">
    <!-- Logo -->
    <div class="flex items-center justify-center mb-6">
      <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
        <span class="text-white font-bold text-2xl">GRA</span>
      </div>
    </div>
    
    <!-- Title -->
    <h1 class="text-5xl md:text-6xl font-bold mb-6">
      <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
        GRA Core Platform
      </span>
    </h1>
    
    <!-- Subtitle -->
    <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
      Enterprise-grade platform for data processing, API integration, and secure cloud operations. 
      Built for scale, designed for developers, trusted by Bank of America.
    </p>
    
    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="../getting-started/index.html" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
        Get Started
      </a>
      <a href="../api-reference/index.html" class="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        API Reference
      </a>
    </div>
  </div>
</div>
\`\`\`

## CSS Styles
\`\`\`css
.hero-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.gradient-text {
  background: linear-gradient(to right, #2563eb, #9333ea, #0d9488);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-logo {
  transition: transform 0.3s ease;
}

.hero-logo:hover {
  transform: scale(1.05) rotate(5deg);
}

.hero-button {
  transition: all 0.3s ease;
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
\`\`\`

## Responsive Design
\`\`\`css
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
\`\`\`

## Animation Effects
\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content > * {
  animation: fadeInUp 0.6s ease forwards;
}

.hero-content > *:nth-child(1) { animation-delay: 0.1s; }
.hero-content > *:nth-child(2) { animation-delay: 0.2s; }
.hero-content > *:nth-child(3) { animation-delay: 0.3s; }
.hero-content > *:nth-child(4) { animation-delay: 0.4s; }
\`\`\`

## Usage
Place this component at the top of the homepage after the banner component.

## Dependencies
- Tailwind CSS
- SVG icons
- CSS animations
- Responsive design utilities
