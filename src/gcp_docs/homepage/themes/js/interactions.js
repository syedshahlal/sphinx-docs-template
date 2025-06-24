// Interactive Features for GRA Core Platform Homepage

class GRAInteractions {
  constructor() {
    this.init()
  }

  init() {
    this.initScrollAnimations()
    this.initHoverEffects()
    this.initParallaxEffects()
    this.initSmoothScrolling()
    this.initKeyboardNavigation()
    this.initAccessibilityFeatures()
  }

  initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")

          // Stagger animation for children
          if (entry.target.classList.contains("stagger-children")) {
            const children = entry.target.children
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("entrance-fade")
              }, index * 100)
            })
          }
        }
      })
    }, observerOptions)

    // Observe elements
    const animatedElements = document.querySelectorAll(
      ".scroll-reveal, .feature-cards-section, .quick-links-section, .whats-new-section, .support-section",
    )
    animatedElements.forEach((el) => observer.observe(el))
  }

  initHoverEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(".group")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        this.addHoverEffect(e.target)
      })

      card.addEventListener("mouseleave", (e) => {
        this.removeHoverEffect(e.target)
      })
    })
  }

  addHoverEffect(element) {
    // Add shimmer effect
    element.classList.add("hover-shimmer")

    // Add subtle rotation for icons
    const icon = element.querySelector(".text-2xl")
    if (icon) {
      icon.style.transform = "scale(1.1) rotate(5deg)"
      icon.style.transition = "transform 0.3s ease"
    }

    // Add glow effect to gradients
    const gradientBg = element.querySelector(".bg-gradient-to-br")
    if (gradientBg) {
      gradientBg.classList.add("animate-glow")
    }
  }

  removeHoverEffect(element) {
    element.classList.remove("hover-shimmer")

    const icon = element.querySelector(".text-2xl")
    if (icon) {
      icon.style.transform = "scale(1) rotate(0deg)"
    }

    const gradientBg = element.querySelector(".bg-gradient-to-br")
    if (gradientBg) {
      gradientBg.classList.remove("animate-glow")
    }
  }

  initParallaxEffects() {
    // Subtle parallax for hero section
    const hero = document.querySelector(".hero-section")
    if (!hero) return

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5

      if (hero) {
        hero.style.transform = `translateY(${rate}px)`
      }
    })
  }

  initSmoothScrolling() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        const targetId = link.getAttribute("href").substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  initKeyboardNavigation() {
    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K for search (if implemented)
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        this.focusSearch()
      }

      // Escape to close chatbot
      if (e.key === "Escape") {
        const chatbot = window.graChatbot
        if (chatbot && chatbot.isOpen) {
          chatbot.close()
        }
      }

      // Tab navigation enhancement
      if (e.key === "Tab") {
        this.enhanceTabNavigation(e)
      }
    })
  }

  focusSearch() {
    // Focus search input if available
    const searchInput = document.querySelector('input[type="search"]')
    if (searchInput) {
      searchInput.focus()
    }
  }

  enhanceTabNavigation(e) {
    // Add visual indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')

    focusableElements.forEach((el) => {
      el.addEventListener("focus", () => {
        el.classList.add("keyboard-focus")
      })

      el.addEventListener("blur", () => {
        el.classList.remove("keyboard-focus")
      })
    })
  }

  initAccessibilityFeatures() {
    // High contrast mode detection
    if (window.matchMedia("(prefers-contrast: high)").matches) {
      document.body.classList.add("high-contrast")
    }

    // Reduced motion detection
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.add("reduced-motion")
    }

    // Focus management for modals/overlays
    this.initFocusManagement()
  }

  initFocusManagement() {
    // Focus trap for chatbot
    const chatbotPanel = document.getElementById("chatbot-panel")
    if (chatbotPanel) {
      chatbotPanel.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          this.trapFocus(e, chatbotPanel)
        }
      })
    }
  }

  trapFocus(e, container) {
    const focusableElements = container.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])')
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  // Utility methods
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // Performance monitoring
  measurePerformance() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        const perfData = performance.getEntriesByType("navigation")[0]
        console.log("Page Load Time:", perfData.loadEventEnd - perfData.loadEventStart)
      })
    }
  }
}

// Initialize interactions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GRAInteractions()
})

// Add CSS for keyboard focus
const style = document.createElement("style")
style.textContent = `
  .keyboard-focus {
    outline: 2px solid #3b82f6 !important;
    outline-offset: 2px !important;
  }
  
  .high-contrast .border {
    border-width: 2px !important;
  }
  
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`
document.head.appendChild(style)
