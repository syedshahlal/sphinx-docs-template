---
title: "Banner Component"
type: "ui-component"
position: "top"
dismissible: true
theme: "gradient-blue-purple"
---

# Banner Component

## Overview
The banner component displays important announcements and notifications at the top of the page.

## Configuration
\`\`\`yaml
banner:
  enabled: true
  type: "announcement"
  dismissible: true
  content: "🎉 GRA Core Platform v5.7.0 is now available!"
  link: "../changelog/index.html"
  link_text: "View Release Notes"
  theme:
    background: "gradient-to-r from-blue-600 to-purple-600"
    text_color: "white"
    hover_color: "blue-200"
\`\`\`

## HTML Structure
\`\`\`html
<div class="banner-container">
  <div class="banner bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <span class="font-medium">{{ banner.content }}</span>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <a href="{{ banner.link }}" class="text-white hover:text-blue-200 text-sm font-medium underline">
          {{ banner.link_text }} →
        </a>
        <button class="text-white hover:text-blue-200" onclick="dismissBanner()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
\`\`\`

## CSS Styles
\`\`\`css
.banner-container {
  position: sticky;
  top: 0;
  z-index: 50;
}

.banner {
  transition: all 0.3s ease;
}

.banner:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
\`\`\`

## JavaScript Functionality
\`\`\`javascript
function dismissBanner() {
  const banner = document.querySelector('.banner-container');
  banner.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    banner.style.display = 'none';
  }, 300);
  
  // Store dismissal in localStorage
  localStorage.setItem('banner-dismissed', 'true');
}

// Check if banner was previously dismissed
if (localStorage.getItem('banner-dismissed') === 'true') {
  document.querySelector('.banner-container').style.display = 'none';
}
\`\`\`

## Usage
Include this component at the top of any page where announcements are needed.

## Dependencies
- Tailwind CSS
- Font Awesome icons (optional)
- Local storage support for dismissal state
