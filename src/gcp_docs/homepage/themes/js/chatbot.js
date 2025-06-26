// Chatbot Functionality for GRA Core Platform

class GRAChatbot {
  constructor() {
    this.isOpen = false
    this.messages = []
    this.init()
  }

  init() {
    this.bindEvents()
    this.addWelcomeMessage()
  }

  bindEvents() {
    // Chatbot trigger
    const trigger = document.getElementById("chatbot-trigger")
    if (trigger) {
      trigger.addEventListener("click", () => this.toggle())
    }

    // Close button
    const closeBtn = document.querySelector('#chatbot-panel button[onclick="toggleChatbot()"]')
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close())
    }

    // Input handling
    const input = document.getElementById("chatbot-input")
    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage()
        }
      })
    }

    // Send button
    const sendBtn = document.querySelector('#chatbot-panel button[onclick="sendMessage()"]')
    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.sendMessage())
    }

    // Click outside to close
    document.addEventListener("click", (e) => {
      const widget = document.getElementById("chatbot-widget")
      if (widget && !widget.contains(e.target) && this.isOpen) {
        this.close()
      }
    })
  }

  toggle() {
    if (this.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    const panel = document.getElementById("chatbot-panel")
    if (panel) {
      panel.classList.remove("hidden")
      panel.classList.add("show")
      this.isOpen = true

      // Focus on input
      const input = document.getElementById("chatbot-input")
      if (input) {
        setTimeout(() => input.focus(), 100)
      }
    }
  }

  close() {
    const panel = document.getElementById("chatbot-panel")
    if (panel) {
      panel.classList.add("hidden")
      panel.classList.remove("show")
      this.isOpen = false
    }
  }

  addWelcomeMessage() {
    const welcomeMessage = {
      type: "bot",
      content: "Hello! I'm the GRA Assistant. How can I help you with the documentation today?",
      timestamp: new Date(),
    }
    this.messages.push(welcomeMessage)
  }

  sendMessage() {
    const input = document.getElementById("chatbot-input")
    const messagesContainer = document.getElementById("chatbot-messages")

    if (!input || !messagesContainer) return

    const message = input.value.trim()
    if (!message) return

    // Add user message
    this.addMessage("user", message)
    input.value = ""

    // Show typing indicator
    this.showTypingIndicator()

    // Simulate bot response
    setTimeout(
      () => {
        this.hideTypingIndicator()
        this.generateBotResponse(message)
      },
      1000 + Math.random() * 2000,
    )
  }

  addMessage(type, content) {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const messageElement = document.createElement("div")
    messageElement.className = `flex items-start space-x-3 mb-4 ${type === "user" ? "justify-end" : ""}`

    if (type === "user") {
      messageElement.innerHTML = `
        <div class="bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3 max-w-xs">
          <p class="text-sm">${this.escapeHtml(content)}</p>
        </div>
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-white text-sm">👤</span>
        </div>
      `
    } else {
      messageElement.innerHTML = `
        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-blue-600 text-sm">🤖</span>
        </div>
        <div class="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
          <p class="text-sm text-gray-800">${this.escapeHtml(content)}</p>
        </div>
      `
    }

    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    // Add to messages array
    this.messages.push({
      type,
      content,
      timestamp: new Date(),
    })
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const typingElement = document.createElement("div")
    typingElement.id = "typing-indicator"
    typingElement.className = "flex items-start space-x-3 mb-4"
    typingElement.innerHTML = `
      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-blue-600 text-sm">🤖</span>
      </div>
      <div class="bg-gray-100 rounded-2xl rounded-tl-sm p-3">
        <div class="flex space-x-1">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    `

    messagesContainer.appendChild(typingElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  hideTypingIndicator() {
    const typingElement = document.getElementById("typing-indicator")
    if (typingElement) {
      typingElement.remove()
    }
  }

  generateBotResponse(userMessage) {
    const responses = this.getBotResponses(userMessage.toLowerCase())
    const response = responses[Math.floor(Math.random() * responses.length)]
    this.addMessage("bot", response)
  }

  getBotResponses(message) {
    // Documentation-specific responses
    if (message.includes("install") || message.includes("setup")) {
      return [
        "You can find installation instructions in our Getting Started guide. Check out the Platform Overview section for setup details.",
        "For installation help, visit our Getting Started documentation. It includes step-by-step setup instructions.",
        "Installation is covered in detail in our documentation. Would you like me to point you to the specific section?",
      ]
    }

    if (message.includes("api") || message.includes("endpoint")) {
      return [
        "Our API documentation is comprehensive and includes examples. Check out the API Integration section for detailed information.",
        "You can find all API endpoints and authentication details in our API Reference documentation.",
        "For API help, visit our API Integration guide which covers REST endpoints, authentication, and SDKs.",
      ]
    }

    if (message.includes("security") || message.includes("auth")) {
      return [
        "Security is a top priority. Check our Security & Compliance section for best practices and guidelines.",
        "Authentication and security features are detailed in our Security & Compliance documentation.",
        "For security questions, our Security & Compliance guide covers enterprise-grade security features.",
      ]
    }

    if (message.includes("data") || message.includes("process")) {
      return [
        "Data processing capabilities are covered in our Data Processing section, including pipelines and analytics.",
        "You can learn about data processing, pipelines, and stream processing in our dedicated documentation section.",
        "Our Data Processing guide covers advanced capabilities and pipeline management.",
      ]
    }

    if (message.includes("monitor") || message.includes("analytics")) {
      return [
        "Monitoring and analytics features are detailed in our Monitoring & Analytics section.",
        "Real-time monitoring, dashboards, and alerting are covered in our analytics documentation.",
        "Check out our Monitoring & Analytics guide for performance insights and custom dashboards.",
      ]
    }

    if (message.includes("help") || message.includes("support")) {
      return [
        "I'm here to help! You can also contact our support team or join our community forum for additional assistance.",
        "For additional help, check our support options including community forums and direct support contact.",
        "Need more help? Our support section has multiple ways to get assistance including community and direct support.",
      ]
    }

    if (message.includes("version") || message.includes("5.7")) {
      return [
        "You're viewing documentation for GRA Core Platform v5.7, our latest stable release with enhanced features.",
        "Version 5.7 includes enhanced data processing, improved APIs, and advanced security features. Check the What's New section!",
        "GRA Core Platform v5.7 is our current release. You can see all the new features in our changelog.",
      ]
    }

    // Default responses
    return [
      "I'd be happy to help you with that! You can find more information in our documentation sections above.",
      "That's a great question! Our comprehensive documentation should have the answer you're looking for.",
      "Thanks for asking! Please check the relevant documentation section, or feel free to contact our support team for detailed assistance.",
      "I'm here to help guide you through our documentation. Is there a specific section you'd like me to point you to?",
      "Our documentation covers that topic in detail. Would you like me to suggest which section might be most helpful?",
    ]
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  // Public methods for external access
  static getInstance() {
    if (!window.graChatbot) {
      window.graChatbot = new GRAChatbot()
    }
    return window.graChatbot
  }
}

// Global functions for backward compatibility
function toggleChatbot() {
  const chatbot = GRAChatbot.getInstance()
  chatbot.toggle()
}

function sendMessage() {
  const chatbot = GRAChatbot.getInstance()
  chatbot.sendMessage()
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  GRAChatbot.getInstance()
})

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = GRAChatbot
}
