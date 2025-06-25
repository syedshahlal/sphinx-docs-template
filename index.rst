GRA Core Platform Documentation
===============================

.. raw:: html

   <div class="hero-banner">
     <div class="banner-content">
       <div class="banner-badge">
         <span class="pulse-dot"></span>
         <span class="badge-text">New Release</span>
         <span class="banner-message">GRA Core Platform v5.7.0 is now available with enhanced security features and improved performance.</span>
       </div>
       <div class="banner-actions">
         <a href="changelog.html" class="banner-link">View Release Notes</a>
         <button class="banner-close" onclick="this.parentElement.parentElement.parentElement.style.display='none'">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <line x1="18" y1="6" x2="6" y2="18"></line>
             <line x1="6" y1="6" x2="18" y2="18"></line>
           </svg>
         </button>
       </div>
     </div>
   </div>

.. raw:: html

   <div class="main-header">
     <div class="header-content">
       <div class="logo-section">
         <div class="gra-logo">GRA</div>
         <h1 class="main-title">GRA Core Platform Docs</h1>
         <div class="version-info">
           <div class="version-dropdown">
             <button class="version-badge dropdown-trigger" onclick="toggleVersionDropdown()">
               v5.7.0 (stable)
               <svg class="chevron-down" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                 <polyline points="6,9 12,15 18,9"></polyline>
               </svg>
             </button>
             <div class="version-dropdown-menu" id="versionDropdown">
               <div class="dropdown-section">
                 <div class="dropdown-header">Current</div>
                 <div class="dropdown-item active">
                   <span>v5.7.0</span>
                   <span class="status-badge stable">stable</span>
                 </div>
               </div>
               <div class="dropdown-section">
                 <div class="dropdown-header">Previous Versions</div>
                 <div class="dropdown-item">
                   <span>v5.6.2</span>
                   <span class="status-badge legacy">legacy</span>
                 </div>
                 <div class="dropdown-item">
                   <span>v5.5.4</span>
                   <span class="status-badge legacy">legacy</span>
                 </div>
                 <div class="dropdown-item">
                   <span>v5.4.8</span>
                   <span class="status-badge legacy">legacy</span>
                 </div>
               </div>
               <div class="dropdown-section">
                 <div class="dropdown-header">Development</div>
                 <div class="dropdown-item">
                   <span>v5.8.0-beta</span>
                   <span class="status-badge beta">beta</span>
                 </div>
                 <div class="dropdown-item">
                   <span>v6.0.0-alpha</span>
                   <span class="status-badge alpha">alpha</span>
                 </div>
               </div>
             </div>
           </div>
           <span class="live-badge">
             <span class="live-dot"></span>
             Live
           </span>
         </div>
       </div>
       <div class="header-actions">
         <div class="search-container">
           <div class="search-input-wrapper">
             <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="11" cy="11" r="8"></circle>
               <path d="m21 21-4.35-4.35"></path>
             </svg>
             <input type="search" placeholder="Search docs..." class="search-input" />
             <kbd class="search-kbd">⌘K</kbd>
           </div>
         </div>
         <div class="action-buttons">
           <button class="action-btn notification-btn">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
               <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
             </svg>
             <span class="notification-dot"></span>
           </button>
           <button class="action-btn theme-toggle" onclick="toggleTheme()">
             <svg class="sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <circle cx="12" cy="12" r="5"></circle>
               <line x1="12" y1="1" x2="12" y2="3"></line>
               <line x1="12" y1="21" x2="12" y2="23"></line>
               <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
               <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
               <line x1="1" y1="12" x2="3" y2="12"></line>
               <line x1="21" y1="12" x2="23" y2="12"></line>
               <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
               <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
             </svg>
             <svg class="moon-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
               <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
             </svg>
           </button>
           <a href="https://github.com/bankofamerica/gra-core" class="action-btn">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
             </svg>
           </a>
           <button class="mobile-menu-btn" onclick="toggleMobileMenu()">
             <svg class="menu-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <line x1="3" y1="6" x2="21" y2="6"></line>
               <line x1="3" y1="12" x2="21" y2="12"></line>
               <line x1="3" y1="18" x2="21" y2="18"></line>
             </svg>
             <svg class="close-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
               <line x1="18" y1="6" x2="6" y2="18"></line>
               <line x1="6" y1="6" x2="18" y2="18"></line>
             </svg>
           </button>
         </div>
       </div>
     </div>
     <div class="mobile-nav" id="mobileNav">
       <div class="mobile-search">
         <div class="search-input-wrapper">
           <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <circle cx="11" cy="11" r="8"></circle>
             <path d="m21 21-4.35-4.35"></path>
           </svg>
           <input type="search" placeholder="Search docs..." class="search-input" />
         </div>
       </div>
       <nav class="mobile-nav-items">
         <a href="user-guide/index.html" class="mobile-nav-item">
           <span>👥 User Guide</span>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="9,18 15,12 9,6"></polyline>
           </svg>
         </a>
         <a href="api-reference/index.html" class="mobile-nav-item">
           <span>🔧 API Reference</span>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="9,18 15,12 9,6"></polyline>
           </svg>
         </a>
         <a href="examples/index.html" class="mobile-nav-item">
           <span>💡 Examples</span>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="9,18 15,12 9,6"></polyline>
           </svg>
         </a>
         <a href="changelog.html" class="mobile-nav-item">
           <span>📋 Changelog</span>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <polyline points="9,18 15,12 9,6"></polyline>
           </svg>
         </a>
       </nav>
     </div>
   </div>

Welcome to the comprehensive documentation for the **GRA Core Platform** - Bank of America's modern, scalable platform built for enterprise-grade applications.

.. raw:: html

   <div class="feature-cards-section">
     <div class="section-header">
       <h2 class="gradient-title">GRA Core Platform Documentation</h2>
       <p class="section-description">
         Comprehensive documentation and guides to help you master GRA Core Platform with our enterprise-grade tools and workflows.
       </p>
     </div>
   </div>

.. grid:: 1 2 2 3
    :gutter: 3
    :class-container: feature-grid

    .. grid-item-card:: 🚀 GRA Core Platform Introduction
        :link: getting-started/index
        :link-type: doc
        :class-card: feature-card feature-card-blue

        Get started with GRA Core Platform fundamentals and core concepts.
        
        **Key Topics:**
        
        • Core Services
        • Getting Started  
        • Best Practices
        • Architecture Overview

    .. grid-item-card:: 👥 User Guide
        :link: user-guide/index
        :link-type: doc
        :class-card: feature-card feature-card-green

        Complete guide to using GRA Core Platform with step-by-step instructions.
        
        **Key Topics:**
        
        • Installation
        • Configuration
        • User Management
        • Troubleshooting

    .. grid-item-card:: 🔧 API Reference
        :link: api-reference/index
        :link-type: doc
        :class-card: feature-card feature-card-purple

        Comprehensive API documentation with examples and authentication guides.
        
        **Key Topics:**
        
        • REST APIs
        • Authentication
        • SDKs
        • Rate Limits

    .. grid-item-card:: 💡 Examples & Tutorials
        :link: examples/index
        :link-type: doc
        :class-card: feature-card feature-card-orange

        Real-world examples and step-by-step tutorials for common use cases.
        
        **Key Topics:**
        
        • Quick Start
        • Advanced Examples
        • Best Practices
        • Code Samples

    .. grid-item-card:: 🛠️ Development Guide
        :link: development/index
        :link-type: doc
        :class-card: feature-card feature-card-teal

        Development workflows, contribution guidelines, and advanced topics.
        
        **Key Topics:**
        
        • Development Setup
        • Contributing
        • Testing
        • Deployment

    .. grid-item-card:: 🏗️ Platform Architecture
        :link: architecture/index
        :link-type: doc
        :class-card: feature-card feature-card-indigo

        Deep dive into GRA Core Platform architecture and infrastructure.
        
        **Key Topics:**
        
        • System Design
        • Components
        • Scalability
        • Security

Platform Features
-----------------

.. grid:: 1 2 2 2
    :gutter: 2
    :class-container: platform-features

    .. grid-item-card:: 🏗️ Enterprise Architecture
        :class-card: platform-feature-card

        Built with enterprise-grade technologies and best practices for scalability and maintainability.

    .. grid-item-card:: 🔒 Bank-Grade Security
        :class-card: platform-feature-card

        Industry-leading security features with comprehensive authentication and authorization.

    .. grid-item-card:: 📊 Analytics & Monitoring
        :class-card: platform-feature-card

        Built-in analytics and monitoring capabilities for operational excellence.

    .. grid-item-card:: 🌐 Multi-Platform Support
        :class-card: platform-feature-card

        Deploy anywhere - cloud, on-premises, or hybrid environments.

.. admonition:: Version Information
    :class: version-info-box

    You are currently viewing documentation for **version 5.7**. This is the latest stable release.
    
    * :doc:`changelog` - See what's new in this version
    * :doc:`migration/index` - Upgrade from previous versions
    * Use the version switcher in the top navigation to view other versions

Getting Started
---------------

New to GRA Core Platform? Start here:

.. raw:: html

   <div class="getting-started-steps">
     <div class="step-item">
       <div class="step-number">1</div>
       <div class="step-content">
         <h3>Installation</h3>
         <p>Set up your development environment</p>
         <a href="getting-started/index.html" class="step-link">Get Started →</a>
       </div>
     </div>
     <div class="step-item">
       <div class="step-number">2</div>
       <div class="step-content">
         <h3>Quick Start</h3>
         <p>Build your first application</p>
         <a href="getting-started/quickstart.html" class="step-link">Quick Start →</a>
       </div>
     </div>
     <div class="step-item">
       <div class="step-number">3</div>
       <div class="step-content">
         <h3>Configuration</h3>
         <p>Configure the platform for your needs</p>
         <a href="user-guide/index.html" class="step-link">Configure →</a>
       </div>
     </div>
     <div class="step-item">
       <div class="step-number">4</div>
       <div class="step-content">
         <h3>Deployment</h3>
         <p>Deploy to production</p>
         <a href="development/index.html" class="step-link">Deploy →</a>
       </div>
     </div>
   </div>

.. raw:: html

   <div class="see-also-section">
     <div class="see-also-header">
       <div class="see-also-icon">ℹ️</div>
       <div class="see-also-content">
         <h2>See Also</h2>
         <p>Explore our family of platforms designed to meet different needs and use cases.</p>
       </div>
     </div>
     <div class="see-also-grid">
       <div class="see-also-item">
         <div class="see-also-badge enterprise">Enterprise</div>
         <h3>GRA Enterprise Platform</h3>
         <p>Full-featured enterprise solution with advanced sidebar navigation</p>
         <a href="#" class="see-also-link">Learn More →</a>
       </div>
       <div class="see-also-item">
         <div class="see-also-badge lightweight">Lightweight</div>
         <h3>GRA Lite</h3>
         <p>Lightweight version perfect for small to medium projects</p>
         <a href="#" class="see-also-link">Learn More →</a>
       </div>
       <div class="see-also-item">
         <div class="see-also-badge showcase">Showcase</div>
         <h3>GRA Platforms Gallery</h3>
         <p>Showcase of amazing projects built with our platform</p>
         <a href="#" class="see-also-link">Learn More →</a>
       </div>
     </div>
   </div>

.. raw:: html

   <div class="user-guide-section">
     <div class="user-guide-header">
       <div class="guide-icon">📚</div>
       <div class="guide-content">
         <h2>User Guide</h2>
         <p>Comprehensive documentation to help you get started and master the platform</p>
       </div>
     </div>
     <div class="guide-stats">
       <div class="stat-item">
         <div class="stat-icon">📖</div>
         <div class="stat-value">8+</div>
         <div class="stat-label">Guides</div>
       </div>
       <div class="stat-item">
         <div class="stat-icon">⏱️</div>
         <div class="stat-value">~2h</div>
         <div class="stat-label">Total Time</div>
       </div>
       <div class="stat-item">
         <div class="stat-icon">👥</div>
         <div class="stat-value">All</div>
         <div class="stat-label">Skill Levels</div>
       </div>
       <div class="stat-item">
         <div class="stat-icon">⭐</div>
         <div class="stat-value">4.9/5</div>
         <div class="stat-label">Rating</div>
       </div>
     </div>
     <div class="guide-links">
       <div class="guide-link-item">
         <div class="guide-emoji">🚀</div>
         <div class="guide-info">
           <h4>Installation</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 5 min</span>
             <span class="guide-difficulty beginner">Beginner</span>
           </div>
         </div>
         <a href="getting-started/index.html" class="guide-arrow">→</a>
       </div>
       <div class="guide-link-item">
         <div class="guide-emoji">🏗️</div>
         <div class="guide-info">
           <h4>Platform Structure and Layout</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 10 min</span>
             <span class="guide-difficulty beginner">Beginner</span>
           </div>
         </div>
         <a href="user-guide/index.html" class="guide-arrow">→</a>
       </div>
       <div class="guide-link-item">
         <div class="guide-emoji">🧭</div>
         <div class="guide-info">
           <h4>Navigation depth and collapsing sidebars</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 8 min</span>
             <span class="guide-difficulty intermediate">Intermediate</span>
           </div>
         </div>
         <a href="user-guide/index.html" class="guide-arrow">→</a>
       </div>
       <div class="guide-link-item">
         <div class="guide-emoji">📑</div>
         <div class="guide-info">
           <h4>Page Table of Contents</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 6 min</span>
             <span class="guide-difficulty beginner">Beginner</span>
           </div>
         </div>
         <a href="user-guide/index.html" class="guide-arrow">→</a>
       </div>
       <div class="guide-link-item">
         <div class="guide-emoji">⚙️</div>
         <div class="guide-info">
           <h4>Configuration Options</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 15 min</span>
             <span class="guide-difficulty intermediate">Intermediate</span>
           </div>
         </div>
         <a href="user-guide/index.html" class="guide-arrow">→</a>
       </div>
       <div class="guide-link-item">
         <div class="guide-emoji">🎨</div>
         <div class="guide-info">
           <h4>Customization Guide</h4>
           <div class="guide-meta">
             <span class="guide-time">⏱️ 20 min</span>
             <span class="guide-difficulty advanced">Advanced</span>
           </div>
         </div>
         <a href="development/index.html" class="guide-arrow">→</a>
       </div>
     </div>
   </div>

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Getting Started

   getting-started/index
   getting-started/quickstart

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: User Guide

   user-guide/index

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: API Reference

   api-reference/index

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Examples & Tutorials

   examples/index

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Development

   development/index

.. toctree::
   :maxdepth: 2
   :hidden:
   :caption: Architecture

   architecture/index

.. toctree::
   :maxdepth: 1
   :hidden:
   :caption: Community

   community
   support
   changelog
   roadmap

Need Help?
----------

.. raw:: html

   <div class="help-section">
     <div class="help-grid">
       <div class="help-item">
         <div class="help-icon">🤖</div>
         <h3>AI Assistant</h3>
         <p>Use the chatbot in the bottom-right corner for instant help</p>
         <div class="help-action">
           <button class="help-btn" onclick="openChatbot()">Open Chatbot</button>
         </div>
       </div>
       <div class="help-item">
         <div class="help-icon">📖</div>
         <h3>Documentation</h3>
         <p>Browse our comprehensive guides and API reference</p>
         <div class="help-action">
           <a href="user-guide/index.html" class="help-btn">Browse Docs</a>
         </div>
       </div>
       <div class="help-item">
         <div class="help-icon">💬</div>
         <h3>Community</h3>
         <p>Join our community forum for discussions and support</p>
         <div class="help-action">
           <a href="https://community.bankofamerica.com/gra" class="help-btn" target="_blank">Join Community</a>
         </div>
       </div>
       <div class="help-item">
         <div class="help-icon">🐛</div>
         <h3>Issues</h3>
         <p>Report bugs and request features on GitHub</p>
         <div class="help-action">
           <a href="https://github.com/bankofamerica/gra-core/issues" class="help-btn" target="_blank">Report Issue</a>
         </div>
       </div>
       <div class="help-item">
         <div class="help-icon">📧</div>
         <h3>Support</h3>
         <p>Contact our support team for assistance</p>
         <div class="help-action">
           <a href="mailto:gra-support@bankofamerica.com" class="help-btn">Contact Support</a>
         </div>
       </div>
       <div class="help-item">
         <div class="help-icon">📚</div>
         <h3>Training</h3>
         <p>Access training materials and certification programs</p>
         <div class="help-action">
           <a href="examples/index.html" class="help-btn">View Training</a>
         </div>
       </div>
     </div>
   </div>

.. raw:: html

   <div class="bottom-cta">
     <div class="cta-content">
       <span class="cta-text">Need help getting started?</span>
       <a href="getting-started/quickstart.html" class="cta-link">
         Quick Start Guide →
       </a>
     </div>
   </div>

   <!-- Chatbot Widget -->
   <div class="chatbot-widget" id="chatbotWidget">
     <div class="chatbot-header">
       <div class="chatbot-title">
         <span class="chatbot-icon">🤖</span>
         <span>GRA Assistant</span>
       </div>
       <button class="chatbot-close" onclick="closeChatbot()">×</button>
     </div>
     <div class="chatbot-messages" id="chatbotMessages">
       <div class="chatbot-message bot">
         <div class="message-avatar">🤖</div>
         <div class="message-content">
           <p>Hello! I'm the GRA Assistant. How can I help you with the documentation today?</p>
         </div>
       </div>
     </div>
     <div class="chatbot-input">
       <input type="text" placeholder="Ask me anything about GRA Core Platform..." id="chatbotInput" />
       <button onclick="sendMessage()">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <line x1="22" y1="2" x2="11" y2="13"></line>
           <polygon points="22,2 15,22 11,13 2,9"></polygon>
         </svg>
       </button>
     </div>
   </div>

   <button class="chatbot-trigger" onclick="openChatbot()">
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
     </svg>
   </button>

   <script>
   // Theme Toggle
   function toggleTheme() {
     const body = document.body;
     const isDark = body.classList.contains('dark-theme');
     
     if (isDark) {
       body.classList.remove('dark-theme');
       localStorage.setItem('theme', 'light');
     } else {
       body.classList.add('dark-theme');
       localStorage.setItem('theme', 'dark');
     }
     
     // Update theme toggle icons
     const sunIcon = document.querySelector('.sun-icon');
     const moonIcon = document.querySelector('.moon-icon');
     
     if (isDark) {
       sunIcon.style.display = 'block';
       moonIcon.style.display = 'none';
     } else {
       sunIcon.style.display = 'none';
       moonIcon.style.display = 'block';
     }
   }

   // Version Dropdown
   function toggleVersionDropdown() {
     const dropdown = document.getElementById('versionDropdown');
     dropdown.classList.toggle('show');
   }

   // Mobile Menu
   function toggleMobileMenu() {
     const mobileNav = document.getElementById('mobileNav');
     const menuIcon = document.querySelector('.menu-icon');
     const closeIcon = document.querySelector('.close-icon');
     
     mobileNav.classList.toggle('show');
     
     if (mobileNav.classList.contains('show')) {
       menuIcon.style.display = 'none';
       closeIcon.style.display = 'block';
     } else {
       menuIcon.style.display = 'block';
       closeIcon.style.display = 'none';
     }
   }

   // Chatbot Functions
   function openChatbot() {
     document.getElementById('chatbotWidget').classList.add('show');
   }

   function closeChatbot() {
     document.getElementById('chatbotWidget').classList.remove('show');
   }

   function sendMessage() {
     const input = document.getElementById('chatbotInput');
     const messages = document.getElementById('chatbotMessages');
     
     if (input.value.trim()) {
       // Add user message
       const userMessage = document.createElement('div');
       userMessage.className = 'chatbot-message user';
       userMessage.innerHTML = `
         <div class="message-content">
           <p>${input.value}</p>
         </div>
         <div class="message-avatar">👤</div>
       `;
       messages.appendChild(userMessage);
       
       // Simulate bot response
       setTimeout(() => {
         const botMessage = document.createElement('div');
         botMessage.className = 'chatbot-message bot';
         botMessage.innerHTML = `
           <div class="message-avatar">🤖</div>
           <div class="message-content">
             <p>Thanks for your question! I'm still learning about the GRA Core Platform. For detailed information, please check our documentation sections above.</p>
           </div>
         `;
         messages.appendChild(botMessage);
         messages.scrollTop = messages.scrollHeight;
       }, 1000);
       
       input.value = '';
       messages.scrollTop = messages.scrollHeight;
     }
   }

   // Initialize theme on load
   document.addEventListener('DOMContentLoaded', function() {
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
       document.body.classList.add('dark-theme');
       document.querySelector('.sun-icon').style.display = 'none';
       document.querySelector('.moon-icon').style.display = 'block';
     }
     
     // Close dropdowns when clicking outside
     document.addEventListener('click', function(event) {
       const versionDropdown = document.getElementById('versionDropdown');
       const versionTrigger = document.querySelector('.dropdown-trigger');
       
       if (!versionTrigger.contains(event.target)) {
         versionDropdown.classList.remove('show');
       }
     });
     
     // Search functionality
     const searchInputs = document.querySelectorAll('.search-input');
     searchInputs.forEach(input => {
       input.addEventListener('keypress', function(e) {
         if (e.key === 'Enter') {
           // Implement search functionality
           console.log('Searching for:', this.value);
         }
       });
     });
     
     // Keyboard shortcuts
     document.addEventListener('keydown', function(e) {
       if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
         e.preventDefault();
         document.querySelector('.search-input').focus();
       }
     });
   });
   </script>

   <style>
   /* Base Styles */
   :root {
     --primary-color: #e31837;
     --secondary-color: #012169;
     --accent-color: #0066cc;
     --text-color: #333333;
     --text-muted: #666666;
     --background-color: #ffffff;
     --surface-color: #fafafa;
     --border-color: #e0e0e0;
     --success-color: #22c55e;
     --warning-color: #f59e0b;
     --error-color: #ef4444;
     --info-color: #3b82f6;
   }

   .dark-theme {
     --text-color: #ffffff;
     --text-muted: #a4a4a4;
     --background-color: #1a1a1a;
     --surface-color: #2d2d2d;
     --border-color: #404040;
   }

   body {
     color: var(--text-color);
     background-color: var(--background-color);
     transition: all 0.3s ease;
   }

   /* Hero Banner */
   .hero-banner {
     background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
     color: #4c1d95;
     padding: 12px 16px;
     text-align: center;
     margin-bottom: 0;
     border-radius: 0;
     position: relative;
   }
   
   .banner-content {
     max-width: 1200px;
     margin: 0 auto;
     display: flex;
     align-items: center;
     justify-content: space-between;
     flex-wrap: wrap;
     gap: 12px;
   }
   
   .banner-badge {
     display: flex;
     align-items: center;
     gap: 12px;
     font-size: 14px;
   }
   
   .pulse-dot {
     width: 8px;
     height: 8px;
     background: #7c3aed;
     border-radius: 50%;
     animation: pulse 2s infinite;
   }
   
   .badge-text {
     font-weight: 600;
     color: #581c87;
   }
   
   .banner-actions {
     display: flex;
     align-items: center;
     gap: 12px;
   }
   
   .banner-link {
     color: #6d28d9;
     text-decoration: underline;
     font-weight: 500;
   }
   
   .banner-link:hover {
     color: #4c1d95;
   }

   .banner-close {
     background: none;
     border: none;
     color: #6d28d9;
     cursor: pointer;
     padding: 4px;
     border-radius: 4px;
     transition: all 0.2s ease;
   }

   .banner-close:hover {
     background: rgba(109, 40, 217, 0.1);
   }
   
   /* Main Header */
   .main-header {
     background: var(--background-color);
     border-bottom: 1px solid var(--border-color);
     padding: 16px 0;
     margin-bottom: 32px;
     position: sticky;
     top: 0;
     z-index: 100;
     backdrop-filter: blur(10px);
   }
   
   .header-content {
     max-width: 1200px;
     margin: 0 auto;
     padding: 0 16px;
     display: flex;
     align-items: center;
     justify-content: space-between;
     flex-wrap: wrap;
     gap: 16px;
   }
   
   .logo-section {
     display: flex;
     align-items: center;
     gap: 16px;
     flex-wrap: wrap;
   }
   
   .gra-logo {
     width: 32px;
     height: 32px;
     background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
     border-radius: 8px;
     display: flex;
     align-items: center;
     justify-content: center;
     color: white;
     font-weight: bold;
     font-size: 14px;
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
   }
   
   .main-title {
     font-size: 18px;
     font-weight: 600;
     color: var(--text-color);
     margin: 0;
   }
   
   .version-info {
     display: flex;
     align-items: center;
     gap: 12px;
   }

   /* Version Dropdown */
   .version-dropdown {
     position: relative;
   }
   
   .version-badge {
     background: #dbeafe;
     color: #1d4ed8;
     padding: 6px 12px;
     border-radius: 6px;
     font-size: 12px;
     font-weight: 500;
     border: 1px solid #bfdbfe;
     cursor: pointer;
     display: flex;
     align-items: center;
     gap: 6px;
     transition: all 0.2s ease;
   }

   .version-badge:hover {
     background: #bfdbfe;
   }

   .chevron-down {
     transition: transform 0.2s ease;
   }

   .version-dropdown-menu {
     position: absolute;
     top: 100%;
     left: 0;
     margin-top: 8px;
     width: 250px;
     background: var(--background-color);
     border: 1px solid var(--border-color);
     border-radius: 8px;
     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
     opacity: 0;
     visibility: hidden;
     transform: translateY(-10px);
     transition: all 0.2s ease;
     z-index: 1000;
   }

   .version-dropdown-menu.show {
     opacity: 1;
     visibility: visible;
     transform: translateY(0);
   }

   .dropdown-section {
     padding: 8px;
   }

   .dropdown-header {
     font-size: 11px;
     font-weight: 600;
     text-transform: uppercase;
     color: var(--text-muted);
     padding: 8px 12px 4px;
     border-bottom: 1px solid var(--border-color);
     margin-bottom: 4px;
   }

   .dropdown-item {
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 8px 12px;
     border-radius: 6px;
     cursor: pointer;
     transition: all 0.2s ease;
     font-size: 14px;
   }

   .dropdown-item:hover {
     background: var(--surface-color);
   }

   .dropdown-item.active {
     background: #dbeafe;
     color: #1d4ed8;
   }

   .status-badge {
     font-size: 10px;
     padding: 2px 6px;
     border-radius: 4px;
     font-weight: 500;
   }

   .status-badge.stable { background: #dcfce7; color: #166534; }
   .status-badge.legacy { background: #f3f4f6; color: #6b7280; }
   .status-badge.beta { background: #fed7aa; color: #ea580c; }
   .status-badge.alpha { background: #e9d5ff; color: #7c3aed; }
   
   .live-badge {
     background: #dcfce7;
     color: #166534;
     padding: 4px 8px;
     border-radius: 6px;
     font-size: 12px;
     font-weight: 500;
     display: flex;
     align-items: center;
     gap: 4px;
   }
   
   .live-dot {
     width: 6px;
     height: 6px;
     background: #22c55e;
     border-radius: 50%;
     animation: pulse 2s infinite;
   }

   /* Header Actions */
   .header-actions {
     display: flex;
     align-items: center;
     gap: 16px;
   }

   .search-container {
     position: relative;
   }

   .search-input-wrapper {
     position: relative;
     display: flex;
     align-items: center;
   }

   .search-input {
     width: 280px;
     padding: 8px 12px 8px 40px;
     border: 1px solid var(--border-color);
     border-radius: 8px;
     font-size: 14px;
     background: var(--surface-color);
     color: var(--text-color);
     transition: all 0.2s ease;
   }

   .search-input:focus {
     outline: none;
     border-color: var(--primary-color);
     box-shadow: 0 0 0 3px rgba(227, 24, 55, 0.1);
   }

   .search-icon {
     position: absolute;
     left: 12px;
     color: var(--text-muted);
     pointer-events: none;
   }

   .search-kbd {
     position: absolute;
     right: 12px;
     background: var(--border-color);
     color: var(--text-muted);
     padding: 2px 6px;
     border-radius: 4px;
     font-size: 10px;
     font-family: monospace;
   }

   .action-buttons {
     display: flex;
     align-items: center;
     gap: 8px;
   }

   .action-btn {
     padding: 8px;
     border: none;
     background: none;
     color: var(--text-color);
     border-radius: 6px;
     cursor: pointer;
     transition: all 0.2s ease;
     position: relative;
     text-decoration: none;
     display: flex;
     align-items: center;
     justify-content: center;
   }

   .action-btn:hover {
     background: var(--surface-color);
   }

   .notification-btn {
     position: relative;
   }

   .notification-dot {
     position: absolute;
     top: 6px;
     right: 6px;
     width: 6px;
     height: 6px;
     background: var(--error-color);
     border-radius: 50%;
   }

   .mobile-menu-btn {
     display: none;
   }

   /* Mobile Navigation */
   .mobile-nav {
     display: none;
     background: var(--background-color);
     border-top: 1px solid var(--border-color);
     padding: 16px;
   }

   .mobile-nav.show {
     display: block;
   }

   .mobile-search {
     margin-bottom: 16px;
   }

   .mobile-search .search-input {
     width: 100%;
   }

   .mobile-nav-items {
     display: flex;
     flex-direction: column;
     gap: 8px;
   }

   .mobile-nav-item {
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 12px;
     border-radius: 8px;
     text-decoration: none;
     color: var(--text-color);
     transition: all 0.2s ease;
   }

   .mobile-nav-item:hover {
     background: var(--surface-color);
   }
   
   /* Feature Cards Section */
   .feature-cards-section {
     text-align: center;
     margin-bottom: 48px;
   }
   
   .gradient-title {
     font-size: 2.5rem;
     font-weight: bold;
     background: linear-gradient(135deg, #2563eb 0%, #8b5cf6 50%, #059669 100%);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
     background-clip: text;
     margin-bottom: 16px;
   }
   
   .section-description {
     font-size: 18px;
     color: var(--text-muted);
     max-width: 600px;
     margin: 0 auto;
   }
   
   /* Feature Cards */
   .feature-card {
     transition: all 0.3s ease;
     border: 1px solid var(--border-color);
     border-radius: 12px;
     padding: 24px;
     height: 100%;
     background: var(--background-color);
   }
   
   .feature-card:hover {
     transform: translateY(-8px);
     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
   }
   
   .feature-card-blue:hover { border-color: #3b82f6; }
   .feature-card-green:hover { border-color: #10b981; }
   .feature-card-purple:hover { border-color: #8b5cf6; }
   .feature-card-orange:hover { border-color: #f59e0b; }
   .feature-card-teal:hover { border-color: #14b8a6; }
   .feature-card-indigo:hover { border-color: #6366f1; }
   
   .platform-feature-card {
     border: 1px solid var(--border-color);
     border-radius: 8px;
     padding: 20px;
     background: var(--background-color);
     transition: all 0.2s ease;
   }
   
   .platform-feature-card:hover {
     border-color: var(--primary-color);
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
   }
   
   .version-info-box {
     background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
     border: 1px solid #0ea5e9;
     border-radius: 8px;
     padding: 20px;
     margin: 32px 0;
   }
   
   /* Getting Started Steps */
   .getting-started-steps {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 24px;
     margin: 32px 0;
   }
   
   .step-item {
     display: flex;
     align-items: flex-start;
     gap: 16px;
     padding: 20px;
     border: 1px solid var(--border-color);
     border-radius: 8px;
     background: var(--background-color);
     transition: all 0.2s ease;
   }
   
   .step-item:hover {
     border-color: var(--primary-color);
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
   }
   
   .step-number {
     width: 32px;
     height: 32px;
     background: var(--primary-color);
     color: white;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     font-weight: bold;
     flex-shrink: 0;
   }
   
   .step-content h3 {
     margin: 0 0 8px 0;
     font-size: 16px;
     font-weight: 600;
     color: var(--text-color);
   }
   
   .step-content p {
     margin: 0 0 12px 0;
     color: var(--text-muted);
     font-size: 14px;
   }
   
   .step-link {
     color: var(--primary-color);
     text-decoration: none;
     font-weight: 500;
     font-size: 14px;
   }
   
   .step-link:hover {
     text-decoration: underline;
   }

   /* See Also Section */
   .see-also-section {
     background: var(--surface-color);
     padding: 48px 24px;
     border-radius: 12px;
     margin: 48px 0;
     border: 1px solid var(--border-color);
   }

   .see-also-header {
     display: flex;
     align-items: flex-start;
     gap: 16px;
     margin-bottom: 32px;
   }

   .see-also-icon {
     font-size: 2rem;
     background: linear-gradient(135deg, #10b981 0%, #059669 100%);
     padding: 12px;
     border-radius: 12px;
     color: white;
   }

   .see-also-content h2 {
     margin: 0 0 8px 0;
     font-size: 2rem;
     font-weight: bold;
     color: var(--text-color);
   }

   .see-also-content p {
     margin: 0;
     color: var(--text-muted);
     font-size: 16px;
   }

   .see-also-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
     gap: 24px;
   }

   .see-also-item {
     background: var(--background-color);
     padding: 24px;
     border-radius: 8px;
     border: 1px solid var(--border-color);
     transition: all 0.3s ease;
     position: relative;
     overflow: hidden;
   }

   .see-also-item:hover {
     transform: translateY(-4px);
     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
   }

   .see-also-badge {
     display: inline-block;
     padding: 4px 12px;
     border-radius: 20px;
     font-size: 12px;
     font-weight: 600;
     margin-bottom: 12px;
   }

   .see-also-badge.enterprise {
     background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
     color: white;
   }

   .see-also-badge.lightweight {
     background: linear-gradient(135deg, #10b981 0%, #059669 100%);
     color: white;
   }

   .see-also-badge.showcase {
     background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
     color: white;
   }

   .see-also-item h3 {
     margin: 0 0 12px 0;
     font-size: 18px;
     font-weight: 600;
     color: var(--text-color);
   }

   .see-also-item p {
     margin: 0 0 16px 0;
     color: var(--text-muted);
     font-size: 14px;
     line-height: 1.5;
   }

   .see-also-link {
     color: var(--primary-color);
     text-decoration: none;
     font-weight: 500;
     font-size: 14px;
     display: inline-flex;
     align-items: center;
     gap: 4px;
   }

   .see-also-link:hover {
     text-decoration: underline;
   }

   /* User Guide Section */
   .user-guide-section {
     margin: 48px 0;
   }

   .user-guide-header {
     display: flex;
     align-items: center;
     gap: 16px;
     margin-bottom: 32px;
   }

   .guide-icon {
     font-size: 2rem;
     background: var(--primary-color);
     color: white;
     padding: 12px;
     border-radius: 12px;
   }

   .guide-content h2 {
     margin: 0 0 8px 0;
     font-size: 2rem;
     font-weight: bold;
     color: var(--text-color);
   }

   .guide-content p {
     margin: 0;
     color: var(--text-muted);
     font-size: 16px;
   }

   .guide-stats {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
     gap: 16px;
     margin-bottom: 32px;
   }

   .stat-item {
     text-align: center;
     padding: 20px;
     background: var(--background-color);
     border: 1px solid var(--border-color);
     border-radius: 8px;
   }

   .stat-icon {
     font-size: 1.5rem;
     margin-bottom: 8px;
   }

   .stat-value {
     font-size: 1.5rem;
     font-weight: bold;
     color: var(--text-color);
     margin-bottom: 4px;
   }

   .stat-label {
     font-size: 12px;
     color: var(--text-muted);
     text-transform: uppercase;
     font-weight: 500;
   }

   .guide-links {
     display: flex;
     flex-direction: column;
     gap: 12px;
   }

   .guide-link-item {
     display: flex;
     align-items: center;
     gap: 16px;
     padding: 16px;
     background: var(--background-color);
     border: 1px solid var(--border-color);
     border-radius: 8px;
     transition: all 0.2s ease;
   }

   .guide-link-item:hover {
     border-color: var(--primary-color);
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }

   .guide-emoji {
     font-size: 1.5rem;
   }

   .guide-info {
     flex: 1;
   }

   .guide-info h4 {
     margin: 0 0 4px 0;
     font-size: 16px;
     font-weight: 600;
     color: var(--text-color);
   }

   .guide-meta {
     display: flex;
     align-items: center;
     gap: 12px;
   }

   .guide-time {
     font-size: 12px;
     color: var(--text-muted);
   }

   .guide-difficulty {
     font-size: 10px;
     padding: 2px 8px;
     border-radius: 12px;
     font-weight: 500;
   }

   .guide-difficulty.beginner {
     background: #dcfce7;
     color: #166534;
   }

   .guide-difficulty.intermediate {
     background: #fed7aa;
     color: #ea580c;
   }

   .guide-difficulty.advanced {
     background: #fecaca;
     color: #dc2626;
   }

   .guide-arrow {
     color: var(--text-muted);
     text-decoration: none;
     font-size: 18px;
     font-weight: bold;
     transition: all 0.2s ease;
   }

   .guide-link-item:hover .guide-arrow {
     color: var(--primary-color);
     transform: translateX(4px);
   }
   
   /* Help Section */
   .help-section {
     margin: 48px 0;
   }
   
   .help-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 24px;
   }
   
   .help-item {
     text-align: center;
     padding: 24px;
     border: 1px solid var(--border-color);
     border-radius: 8px;
     background: var(--background-color);
     transition: all 0.2s ease;
   }
   
   .help-item:hover {
     border-color: var(--primary-color);
     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
   }
   
   .help-icon {
     font-size: 2rem;
     margin-bottom: 12px;
   }
   
   .help-item h3 {
     margin: 0 0 8px 0;
     font-size: 16px;
     font-weight: 600;
     color: var(--text-color);
   }
   
   .help-item p {
     margin: 0 0 16px 0;
     color: var(--text-muted);
     font-size: 14px;
   }

   .help-action {
     margin-top: 16px;
   }

   .help-btn {
     display: inline-block;
     padding: 8px 16px;
     background: var(--primary-color);
     color: white;
     text-decoration: none;
     border-radius: 6px;
     font-size: 14px;
     font-weight: 500;
     transition: all 0.2s ease;
     border: none;
     cursor: pointer;
   }

   .help-btn:hover {
     background: #c41230;
     transform: translateY(-1px);
   }
   
   /* Bottom CTA */
   .bottom-cta {
     text-align: center;
     margin: 48px 0;
   }
   
   .cta-content {
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 12px 24px;
     background: linear-gradient(135deg, rgba(227, 24, 55, 0.1) 0%, rgba(196, 18, 48, 0.1) 100%);
     border: 1px solid rgba(227, 24, 55, 0.2);
     border-radius: 50px;
   }
   
   .cta-text {
     font-size: 14px;
     font-weight: 500;
     color: var(--text-color);
   }
   
   .cta-link {
     color: var(--primary-color);
     text-decoration: none;
     font-weight: 600;
     font-size: 14px;
   }
   
   .cta-link:hover {
     color: #c41230;
   }

   /* Chatbot Widget */
   .chatbot-widget {
     position: fixed;
     bottom: 80px;
     right: 20px;
     width: 350px;
     height: 500px;
     background: var(--background-color);
     border: 1px solid var(--border-color);
     border-radius: 12px;
     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
     display: flex;
     flex-direction: column;
     opacity: 0;
     visibility: hidden;
     transform: translateY(20px);
     transition: all 0.3s ease;
     z-index: 1000;
   }

   .chatbot-widget.show {
     opacity: 1;
     visibility: visible;
     transform: translateY(0);
   }

   .chatbot-header {
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 16px;
     border-bottom: 1px solid var(--border-color);
     background: var(--primary-color);
     color: white;
     border-radius: 12px 12px 0 0;
   }

   .chatbot-title {
     display: flex;
     align-items: center;
     gap: 8px;
     font-weight: 600;
   }

   .chatbot-close {
     background: none;
     border: none;
     color: white;
     font-size: 20px;
     cursor: pointer;
     padding: 4px;
     border-radius: 4px;
     transition: all 0.2s ease;
   }

   .chatbot-close:hover {
     background: rgba(255, 255, 255, 0.1);
   }

   .chatbot-messages {
     flex: 1;
     padding: 16px;
     overflow-y: auto;
     display: flex;
     flex-direction: column;
     gap: 12px;
   }

   .chatbot-message {
     display: flex;
     gap: 8px;
     align-items: flex-start;
   }

   .chatbot-message.user {
     flex-direction: row-reverse;
   }

   .message-avatar {
     width: 32px;
     height: 32px;
     border-radius: 50%;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 16px;
     flex-shrink: 0;
   }

   .chatbot-message.bot .message-avatar {
     background: var(--primary-color);
     color: white;
   }

   .chatbot-message.user .message-avatar {
     background: var(--surface-color);
     color: var(--text-color);
     border: 1px solid var(--border-color);
   }

   .message-content {
     flex: 1;
     background: var(--surface-color);
     padding: 12px;
     border-radius: 8px;
     border: 1px solid var(--border-color);
   }

   .chatbot-message.user .message-content {
     background: var(--primary-color);
     color: white;
   }

   .message-content p {
     margin: 0;
     font-size: 14px;
     line-height: 1.4;
   }

   .chatbot-input {
     display: flex;
     gap: 8px;
     padding: 16px;
     border-top: 1px solid var(--border-color);
   }

   .chatbot-input input {
     flex: 1;
     padding: 8px 12px;
     border: 1px solid var(--border-color);
     border-radius: 6px;
     font-size: 14px;
     background: var(--background-color);
     color: var(--text-color);
   }

   .chatbot-input input:focus {
     outline: none;
     border-color: var(--primary-color);
   }

   .chatbot-input button {
     padding: 8px 12px;
     background: var(--primary-color);
     color: white;
     border: none;
     border-radius: 6px;
     cursor: pointer;
     transition: all 0.2s ease;
   }

   .chatbot-input button:hover {
     background: #c41230;
   }

   .chatbot-trigger {
     position: fixed;
     bottom: 20px;
     right: 20px;
     width: 56px;
     height: 56px;
     background: var(--primary-color);
     color: white;
     border: none;
     border-radius: 50%;
     cursor: pointer;
     box-shadow: 0 4px 12px rgba(227, 24, 55, 0.3);
     transition: all 0.3s ease;
     z-index: 999;
     display: flex;
     align-items: center;
     justify-content: center;
   }

   .chatbot-trigger:hover {
     background: #c41230;
     transform: scale(1.1);
   }
   
   /* Animations */
   @keyframes pulse {
     0%, 100% { opacity: 1; }
     50% { opacity: 0.5; }
   }

   @keyframes fadeIn {
     from { opacity: 0; transform: translateY(20px); }
     to { opacity: 1; transform: translateY(0); }
   }

   @keyframes slideIn {
     from { transform: translateX(-100%); }
     to { transform: translateX(0); }
   }
   
   /* Responsive Design */
   @media (max-width: 768px) {
     .banner-content {
       flex-direction: column;
       text-align: center;
     }
     
     .header-content {
       flex-direction: column;
       align-items: flex-start;
     }

     .logo-section {
       justify-content: center;
       width: 100%;
     }

     .header-actions {
       width: 100%;
       justify-content: space-between;
     }

     .search-input {
       width: 200px;
     }

     .mobile-menu-btn {
       display: flex;
     }

     .action-buttons {
       display: none;
     }

     .mobile-nav.show .action-buttons {
       display: flex;
       width: 100%;
       justify-content: center;
       margin-top: 16px;
     }
     
     .gradient-title {
       font-size: 2rem;
     }
     
     .getting-started-steps {
       grid-template-columns: 1fr;
     }

     .see-also-grid {
       grid-template-columns: 1fr;
     }

     .guide-stats {
       grid-template-columns: repeat(2, 1fr);
     }

     .help-grid {
       grid-template-columns: 1fr;
     }

     .chatbot-widget {
       width: calc(100vw - 40px);
       height: calc(100vh - 120px);
       bottom: 80px;
       right: 20px;
       left: 20px;
     }

     .version-dropdown-menu {
       width: 200px;
     }
   }

   @media (max-width: 480px) {
     .search-input {
       width: 150px;
     }

     .guide-stats {
       grid-template-columns: 1fr;
     }

     .step-item {
       flex-direction: column;
       text-align: center;
     }

     .guide-link-item {
       flex-direction: column;
       text-align: center;
       gap: 12px;
     }

     .see-also-header {
       flex-direction: column;
       text-align: center;
     }

     .user-guide-header {
       flex-direction: column;
       text-align: center;
     }
   }

   /* Dark Theme Specific Styles */
   .dark-theme .hero-banner {
     background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
     color: #c7d2fe;
   }

   .dark-theme .version-badge {
     background: #1e3a8a;
     color: #bfdbfe;
     border-color: #1e40af;
   }

   .dark-theme .live-badge {
     background: #064e3b;
     color: #6ee7b7;
   }

   .dark-theme .version-info-box {
     background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
     border-color: #0ea5e9;
     color: #e2e8f0;
   }

   .dark-theme .step-number {
     background: var(--primary-color);
   }

   .dark-theme .see-also-section {
     background: #1e293b;
     border-color: #334155;
   }

   .dark-theme .dropdown-item.active {
     background: #1e3a8a;
     color: #bfdbfe;
   }

   /* Print Styles */
   @media print {
     .hero-banner,
     .header-actions,
     .chatbot-widget,
     .chatbot-trigger,
     .mobile-nav {
       display: none !important;
     }

     .main-header {
       position: static;
       box-shadow: none;
     }

     .feature-card,
     .platform-feature-card,
     .help-item {
       break-inside: avoid;
     }
   }

   /* Accessibility */
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }

   @media (prefers-contrast: high) {
     .feature-card,
     .platform-feature-card,
     .help-item {
       border-width: 2px;
     }

     .action-btn:focus,
     .help-btn:focus,
     .search-input:focus {
       outline: 3px solid var(--primary-color);
       outline-offset: 2px;
     }
   }

   /* Focus Styles */
   .feature-card:focus-within,
   .step-item:focus-within,
   .help-item:focus-within {
     outline: 2px solid var(--primary-color);
     outline-offset: 2px;
   }

   /* Loading States */
   .loading {
     opacity: 0.6;
     pointer-events: none;
   }

   .loading::after {
     content: "";
     position: absolute;
     top: 50%;
     left: 50%;
     width: 20px;
     height: 20px;
     margin: -10px 0 0 -10px;
     border: 2px solid var(--primary-color);
     border-top-color: transparent;
     border-radius: 50%;
     animation: spin 1s linear infinite;
   }

   @keyframes spin {
     to { transform: rotate(360deg); }
   }
   </style>
