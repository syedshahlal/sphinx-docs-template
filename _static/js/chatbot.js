// Chatbot functionality
class DocumentationChatbot {
  constructor() {
    this.isOpen = false
    this.isLoading = false
    this.documentationIndex = null
    this.conversationHistory = []

    this.init()
  }

  async init() {
    await this.loadDocumentationIndex()
    this.setupEventListeners()
    this.setupKeyboardShortcuts()
  }

  async loadDocumentationIndex() {
    try {
      const response = await fetch("/_static/chatbot_index.json")
      this.documentationIndex = await response.json()
      console.log(`Loaded ${this.documentationIndex.length} documentation chunks`)
    } catch (error) {
      console.error("Failed to load documentation index:", error)
      this.documentationIndex = []
    }
  }

  setupEventListeners() {
    const toggle = document.getElementById("chatbot-toggle")
    const close = document.getElementById("chatbot-close")
    const input = document.getElementById("chatbot-input")
    const send = document.getElementById("chatbot-send")

    if (toggle) {
      toggle.addEventListener("click", () => this.toggleChatbot())
    }

    if (close) {
      close.addEventListener("click", () => this.closeChatbot())
    }

    if (input) {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          this.sendMessage()
        }
      })

      input.addEventListener("input", () => {
        const sendBtn = document.getElementById("chatbot-send")
        if (sendBtn) {
          sendBtn.disabled = !input.value.trim()
        }
      })
    }

    if (send) {
      send.addEventListener("click", () => this.sendMessage())
    }
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Alt + C to toggle chatbot
      if (e.altKey && e.key === "c") {
        e.preventDefault()
        this.toggleChatbot()
      }

      // Escape to close chatbot
      if (e.key === "Escape" && this.isOpen) {
        this.closeChatbot()
      }
    })
  }

  toggleChatbot() {
    const container = document.getElementById("chatbot-container")
    if (!container) return

    if (this.isOpen) {
      this.closeChatbot()
    } else {
      this.openChatbot()
    }
  }

  openChatbot() {
    const container = document.getElementById("chatbot-container")
    const input = document.getElementById("chatbot-input")

    if (container) {
      container.style.display = "flex"
      this.isOpen = true

      // Focus input after animation
      setTimeout(() => {
        if (input) input.focus()
      }, 300)
    }
  }

  closeChatbot() {
    const container = document.getElementById("chatbot-container")

    if (container) {
      container.style.display = "none"
      this.isOpen = false
    }
  }

  async sendMessage() {
    const input = document.getElementById("chatbot-input")
    const message = input?.value.trim()

    if (!message || this.isLoading) return

    // Add user message
    this.addMessage(message, "user")
    input.value = ""
    document.getElementById("chatbot-send").disabled = true

    // Show loading
    this.showLoading()
    this.isLoading = true

    try {
      // Find relevant documentation
      const relevantDocs = this.findRelevantDocumentation(message)

      // Generate response
      const response = await this.generateResponse(message, relevantDocs)

      // Add bot response
      this.hideLoading()
      this.addMessage(response, "bot")
    } catch (error) {
      console.error("Error generating response:", error)
      this.hideLoading()
      this.addMessage(
        "I apologize, but I encountered an error while processing your question. Please try again or check the documentation directly.",
        "bot",
      )
    }

    this.isLoading = false
  }

  findRelevantDocumentation(query) {
    if (!this.documentationIndex) return []

    const queryLower = query.toLowerCase()
    const queryWords = queryLower.split(/\s+/).filter((word) => word.length > 2)

    // Score each document chunk
    const scored = this.documentationIndex.map((doc) => {
      const contentLower = doc.content.toLowerCase()
      const titleLower = doc.title.toLowerCase()

      let score = 0

      // Exact phrase match (highest score)
      if (contentLower.includes(queryLower)) {
        score += 10
      }

      // Title matches (high score)
      queryWords.forEach((word) => {
        if (titleLower.includes(word)) {
          score += 5
        }
      })

      // Word matches in content
      queryWords.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        const matches = (contentLower.match(regex) || []).length
        score += matches * 2
      })

      return { ...doc, score }
    })

    // Return top 3 most relevant documents
    return scored
      .filter((doc) => doc.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  async generateResponse(query, relevantDocs) {
    // For demo purposes, we'll create a simple rule-based response
    // In production, this would call an LLM API

    if (relevantDocs.length === 0) {
      return "I couldn't find specific information about that in the documentation. Could you try rephrasing your question or check the main documentation sections?"
    }

    // Create context from relevant docs
    const context = relevantDocs.map((doc) => `From "${doc.title}": ${doc.content.substring(0, 300)}...`).join("\n\n")

    // Simple keyword-based responses (replace with actual LLM call)
    const queryLower = query.toLowerCase()

    if (queryLower.includes("install")) {
      const installDoc = relevantDocs.find(
        (doc) => doc.title.toLowerCase().includes("install") || doc.content.toLowerCase().includes("install"),
      )

      if (installDoc) {
        return `Based on the installation documentation:\n\n${installDoc.content.substring(0, 400)}...\n\nFor complete installation instructions, please check the [Installation Guide](${installDoc.url}).`
      }
    }

    if (queryLower.includes("config")) {
      const configDoc = relevantDocs.find(
        (doc) => doc.title.toLowerCase().includes("config") || doc.content.toLowerCase().includes("config"),
      )

      if (configDoc) {
        return `Here's information about configuration:\n\n${configDoc.content.substring(0, 400)}...\n\nFor more details, see the [Configuration Guide](${configDoc.url}).`
      }
    }

    // Default response with relevant documentation
    const firstDoc = relevantDocs[0]
    return `Based on the documentation, here's what I found:\n\n${firstDoc.content.substring(0, 400)}...\n\nYou can find more information in the [${firstDoc.title}](${firstDoc.url}) section.`
  }

  addMessage(content, type) {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}-message`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = type === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>'

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    // Convert markdown-like syntax to HTML
    const formattedContent = content
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")

    messageContent.innerHTML = `<p>${formattedContent}</p>`

    messageDiv.appendChild(avatar)
    messageDiv.appendChild(messageContent)
    messagesContainer.appendChild(messageDiv)

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    // Store in conversation history
    this.conversationHistory.push({ type, content, timestamp: Date.now() })
  }

  showLoading() {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const loadingDiv = document.createElement("div")
    loadingDiv.className = "message bot-message message-loading"
    loadingDiv.id = "loading-message"

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"
    avatar.innerHTML = '<i class="fas fa-robot"></i>'

    const loadingContent = document.createElement("div")
    loadingContent.className = "message-content"
    loadingContent.innerHTML = `
      <div class="loading-dots">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    `

    loadingDiv.appendChild(avatar)
    loadingDiv.appendChild(loadingContent)
    messagesContainer.appendChild(loadingDiv)

    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  hideLoading() {
    const loadingMessage = document.getElementById("loading-message")
    if (loadingMessage) {
      loadingMessage.remove()
    }
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("chatbot-toggle")) {
    new DocumentationChatbot()
  }
})
