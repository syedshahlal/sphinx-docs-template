/**
 * LLM-Powered Documentation Chatbot
 * Provides intelligent assistance for GRA Core Platform documentation
 */

class LLMDocumentationChatbot {
  constructor(config = {}) {
    this.config = {
      apiEndpoint: config.apiEndpoint || "/api/chat",
      model: config.model || "gpt-3.5-turbo",
      maxTokens: config.maxTokens || 500,
      temperature: config.temperature || 0.1,
      systemPrompt: config.systemPrompt || this.getDefaultSystemPrompt(),
      enabled: config.enabled !== false,
      ...config,
    }

    this.isOpen = false
    this.isLoading = false
    this.conversationHistory = []
    this.documentationIndex = null
    this.currentSessionId = this.generateSessionId()

    if (this.config.enabled) {
      this.init()
    }
  }

  getDefaultSystemPrompt() {
    return `You are a helpful AI assistant for the GRA Core Platform documentation. 

Your role:
- Answer questions about GRA Core Platform features, installation, configuration, and usage
- Provide code examples and best practices
- Help users navigate the documentation
- Explain technical concepts clearly
- Direct users to relevant documentation sections

Guidelines:
- Only answer questions related to GRA Core Platform documentation
- If you don't know something, say so and suggest checking the documentation
- Provide concise but helpful answers
- Include relevant links to documentation sections when possible
- Be friendly and professional

Current documentation sections available:
- Installation and Setup
- Platform Structure and Layout
- Configuration Options
- API Reference
- Examples and Tutorials
- Contributing Guidelines`
  }

  async init() {
    await this.loadDocumentationIndex()
    this.createChatbotUI()
    this.setupEventListeners()
    this.setupKeyboardShortcuts()
    console.log("🤖 LLM Documentation Chatbot initialized")
  }

  generateSessionId() {
    return "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }

  async loadDocumentationIndex() {
    try {
      const response = await fetch("/_static/chatbot_index.json")
      if (response.ok) {
        this.documentationIndex = await response.json()
        console.log(`📚 Loaded ${this.documentationIndex.length} documentation chunks`)
      } else {
        console.warn("📚 Documentation index not found, using fallback mode")
        this.documentationIndex = []
      }
    } catch (error) {
      console.error("Failed to load documentation index:", error)
      this.documentationIndex = []
    }
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div id="llm-chatbot-widget" class="llm-chatbot-widget">
        <!-- Floating Toggle Button -->
        <div class="chatbot-toggle" id="chatbot-toggle">
          <div class="toggle-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.38 14.99 3.06 16.26L2 22L7.74 20.94C9.01 21.62 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.65 8.5 19.06L8.19 18.88L4.91 19.71L5.74 16.43L5.56 16.12C4.97 15.08 4.62 13.88 4.62 12.62C4.62 7.58 8.58 3.62 13.62 3.62C18.66 3.62 22.62 7.58 22.62 12.62C22.62 17.66 18.66 21.62 13.62 21.62H12V20Z" fill="currentColor"/>
              <circle cx="9" cy="12" r="1" fill="currentColor"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
              <circle cx="15" cy="12" r="1" fill="currentColor"/>
            </svg>
          </div>
          <span class="toggle-text">Ask AI</span>
          <div class="notification-badge" id="notification-badge" style="display: none;">1</div>
        </div>

        <!-- Chat Container -->
        <div class="chatbot-container" id="chatbot-container" style="display: none;">
          <!-- Header -->
          <div class="chatbot-header">
            <div class="header-info">
              <div class="bot-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C3 8.1 3.9 9 5 9H8V11C8 12.1 8.9 13 10 13H14C15.1 13 16 12.1 16 11V9H19C20.1 9 21 8.1 21 7V9Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="header-text">
                <h4>GRA Assistant</h4>
                <span class="status-indicator">
                  <span class="status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <div class="header-actions">
              <button class="action-btn" id="clear-chat" title="Clear conversation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 7L18.36 19.18C18.26 20.22 17.39 21 16.35 21H7.65C6.61 21 5.74 20.22 5.64 19.18L5 7H19ZM16 2V4H20V6H4V4H8V2H16Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="action-btn" id="chatbot-close" title="Close chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="chatbot-messages" id="chatbot-messages">
            <div class="message bot-message welcome-message">
              <div class="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="message-content">
                <div class="message-text">
                  👋 Hi! I'm your GRA Core Platform documentation assistant. I can help you with:
                  <ul>
                    <li>🔧 Installation and setup questions</li>
                    <li>📚 Finding specific documentation</li>
                    <li>💡 Code examples and best practices</li>
                    <li>🐛 Troubleshooting common issues</li>
                  </ul>
                  What would you like to know?
                </div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions" id="quick-actions">
            <button class="quick-action-btn" data-question="How do I install GRA Core Platform?">
              📦 Installation
            </button>
            <button class="quick-action-btn" data-question="Show me the API reference">
              🔧 API Docs
            </button>
            <button class="quick-action-btn" data-question="What are the configuration options?">
              ⚙️ Configuration
            </button>
            <button class="quick-action-btn" data-question="How do I contribute to the project?">
              🤝 Contributing
            </button>
          </div>

          <!-- Input Area -->
          <div class="chatbot-input">
            <div class="input-container">
              <textarea 
                id="chatbot-input" 
                placeholder="Ask me anything about GRA Core Platform..." 
                rows="1"
                maxlength="500"
              ></textarea>
              <div class="input-actions">
                <button id="attach-btn" class="input-action-btn" title="Attach context">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 6V17.5C16.5 19.43 14.93 21 13 21C11.07 21 9.5 19.43 9.5 17.5V5C9.5 3.62 10.62 2.5 12 2.5C13.38 2.5 14.5 3.62 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5C12.95 16.5 12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18C14.88 18 16 16.88 16 15.5V5C16 2.79 14.21 1 12 1C9.79 1 8 2.79 8 5V17.5C8 20.26 10.24 22.5 13 22.5C15.76 22.5 18 20.26 18 17.5V6H16.5Z" fill="currentColor"/>
                  </svg>
                </button>
                <button id="chatbot-send" class="send-btn" disabled title="Send message">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="input-footer">
              <span class="character-count">0/500</span>
              <span class="powered-by">AI</span>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.insertAdjacentHTML("beforeend", chatbotHTML)
  }

  setupEventListeners() {
    const toggle = document.getElementById("chatbot-toggle")
    const close = document.getElementById("chatbot-close")
    const input = document.getElementById("chatbot-input")
    const send = document.getElementById("chatbot-send")
    const clear = document.getElementById("clear-chat")

    // Toggle chatbot
    toggle?.addEventListener("click", () => this.toggleChatbot())
    close?.addEventListener("click", () => this.closeChatbot())

    // Input handling
    input?.addEventListener("input", (e) => this.handleInputChange(e))
    input?.addEventListener("keydown", (e) => this.handleKeyDown(e))

    // Send message
    send?.addEventListener("click", () => this.sendMessage())

    // Clear conversation
    clear?.addEventListener("click", () => this.clearConversation())

    // Quick actions
    document.querySelectorAll(".quick-action-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const question = e.target.dataset.question
        if (question) {
          document.getElementById("chatbot-input").value = question
          this.sendMessage()
        }
      })
    })

    // Auto-resize textarea
    input?.addEventListener("input", () => {
      input.style.height = "auto"
      input.style.height = Math.min(input.scrollHeight, 120) + "px"
    })
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Alt + A to toggle chatbot
      if (e.altKey && e.key === "a") {
        e.preventDefault()
        this.toggleChatbot()
      }

      // Escape to close chatbot
      if (e.key === "Escape" && this.isOpen) {
        this.closeChatbot()
      }
    })
  }

  handleInputChange(e) {
    const input = e.target
    const sendBtn = document.getElementById("chatbot-send")
    const charCount = document.querySelector(".character-count")

    // Update character count
    charCount.textContent = `${input.value.length}/500`

    // Enable/disable send button
    sendBtn.disabled = !input.value.trim() || this.isLoading

    // Hide quick actions when typing
    const quickActions = document.getElementById("quick-actions")
    if (input.value.trim()) {
      quickActions.style.display = "none"
    } else {
      quickActions.style.display = "flex"
    }
  }

  handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  toggleChatbot() {
    if (this.isOpen) {
      this.closeChatbot()
    } else {
      this.openChatbot()
    }
  }

  openChatbot() {
    const container = document.getElementById("chatbot-container")
    const toggle = document.getElementById("chatbot-toggle")
    const badge = document.getElementById("notification-badge")

    if (container && toggle) {
      container.style.display = "flex"
      toggle.classList.add("active")
      badge.style.display = "none"
      this.isOpen = true

      // Focus input after animation
      setTimeout(() => {
        const input = document.getElementById("chatbot-input")
        input?.focus()
      }, 300)

      // Track opening
      this.trackEvent("chatbot_opened")
    }
  }

  closeChatbot() {
    const container = document.getElementById("chatbot-container")
    const toggle = document.getElementById("chatbot-toggle")

    if (container && toggle) {
      container.style.display = "none"
      toggle.classList.remove("active")
      this.isOpen = false

      // Track closing
      this.trackEvent("chatbot_closed")
    }
  }

  async sendMessage() {
    const input = document.getElementById("chatbot-input")
    const message = input?.value.trim()

    if (!message || this.isLoading) return

    // Add user message
    this.addMessage(message, "user")
    input.value = ""
    this.handleInputChange({ target: input })

    // Show loading
    this.showLoading()
    this.isLoading = true

    try {
      // Find relevant documentation context
      const context = this.findRelevantContext(message)

      // Generate AI response
      const response = await this.generateAIResponse(message, context)

      // Add bot response
      this.hideLoading()
      this.addMessage(response.content, "bot", response.metadata)

      // Track successful interaction
      this.trackEvent("message_sent", {
        user_message: message,
        response_length: response.content.length,
      })
    } catch (error) {
      console.error("Error generating response:", error)
      this.hideLoading()
      this.addMessage(
        "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or check the documentation directly.",
        "bot",
        { error: true },
      )

      // Track error
      this.trackEvent("message_error", { error: error.message })
    }

    this.isLoading = false
  }

  findRelevantContext(query) {
    if (!this.documentationIndex || this.documentationIndex.length === 0) {
      return []
    }

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

  async generateAIResponse(message, context) {
    // Prepare context for the AI
    const contextText =
      context.length > 0
        ? context.map((doc) => `From "${doc.title}": ${doc.content.substring(0, 300)}...`).join("\n\n")
        : "No specific documentation context found."

    const prompt = `${this.config.systemPrompt}

Context from documentation:
${contextText}

User question: ${message}

Please provide a helpful response based on the documentation context. If the context doesn't contain relevant information, provide general guidance and suggest checking the documentation sections.`

    try {
      // Call your LLM API endpoint
      const response = await fetch(this.config.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: "system", content: this.config.systemPrompt },
            { role: "user", content: prompt },
          ],
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          session_id: this.currentSessionId,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()

      return {
        content:
          data.choices?.[0]?.message?.content || data.response || "I apologize, but I could not generate a response.",
        metadata: {
          model: this.config.model,
          tokens_used: data.usage?.total_tokens,
          context_docs: context.length,
        },
      }
    } catch (error) {
      // Fallback to rule-based responses if API fails
      return this.generateFallbackResponse(message, context)
    }
  }

  generateFallbackResponse(message, context) {
    const messageLower = message.toLowerCase()

    // Rule-based responses for common questions
    if (messageLower.includes("install")) {
      return {
        content: `To install GRA Core Platform, you can use pip:

\`\`\`bash
pip install gra-core-platform
\`\`\`

Or install from source:

\`\`\`bash
git clone https://github.com/gra-community/gra-core.git
cd gra-core
pip install -e .
\`\`\`

For detailed installation instructions, check the [Installation Guide](/user-guide/installation.html).`,
        metadata: { fallback: true },
      }
    }

    if (messageLower.includes("config")) {
      return {
        content: `GRA Core Platform can be configured through a configuration file:

\`\`\`python
# config.py
GRA_CORE_SETTINGS = {
    'DEBUG': False,
    'DATABASE_URL': 'postgresql://user:pass@localhost/gracore',
    'SECRET_KEY': 'your-secret-key-here',
}
\`\`\`

For more configuration options, see the [Configuration Guide](/user-guide/configuration.html).`,
        metadata: { fallback: true },
      }
    }

    if (messageLower.includes("api")) {
      return {
        content: `The GRA Core Platform provides a comprehensive API. Here are some key endpoints:

- **Authentication**: \`/api/auth/\`
- **Data Access**: \`/api/data/\`
- **User Management**: \`/api/users/\`

For complete API documentation, visit the [API Reference](/api/) section.`,
        metadata: { fallback: true },
      }
    }

    // Default response with context
    if (context.length > 0) {
      const firstDoc = context[0]
      return {
        content: `Based on the documentation, here's what I found:

${firstDoc.content.substring(0, 300)}...

You can find more information in the [${firstDoc.title}](${firstDoc.url}) section.`,
        metadata: { fallback: true, context_used: true },
      }
    }

    // Generic fallback
    return {
      content: `I'd be happy to help you with GRA Core Platform! Here are some areas I can assist with:

🔧 **Installation & Setup** - Getting started with the platform
📚 **Documentation** - Finding specific information
💡 **Examples** - Code samples and best practices
🐛 **Troubleshooting** - Common issues and solutions

Could you please be more specific about what you'd like to know?`,
      metadata: { fallback: true },
    }
  }

  addMessage(content, type, metadata = {}) {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${type}-message`

    const avatar = document.createElement("div")
    avatar.className = "message-avatar"

    if (type === "bot") {
      avatar.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
        </svg>
      `
    } else {
      avatar.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
        </svg>
      `
    }

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    // Format content (convert markdown-like syntax to HTML)
    const formattedContent = this.formatMessageContent(content)

    const messageText = document.createElement("div")
    messageText.className = "message-text"
    messageText.innerHTML = formattedContent

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"
    messageTime.textContent = new Date().toLocaleTimeString()

    messageContent.appendChild(messageText)
    messageContent.appendChild(messageTime)

    // Add metadata info for bot messages
    if (type === "bot" && metadata.model) {
      const metadataDiv = document.createElement("div")
      metadataDiv.className = "message-metadata"
      metadataDiv.innerHTML = `
        <span class="metadata-item">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          ${metadata.model}
        </span>
        ${metadata.tokens_used ? `<span class="metadata-item">${metadata.tokens_used} tokens</span>` : ""}
        ${metadata.context_docs ? `<span class="metadata-item">${metadata.context_docs} docs</span>` : ""}
      `
      messageContent.appendChild(metadataDiv)
    }

    messageDiv.appendChild(avatar)
    messageDiv.appendChild(messageContent)
    messagesContainer.appendChild(messageDiv)

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    // Store in conversation history
    this.conversationHistory.push({
      type,
      content,
      metadata,
      timestamp: Date.now(),
    })

    // Hide quick actions after first message
    if (this.conversationHistory.length > 1) {
      const quickActions = document.getElementById("quick-actions")
      quickActions.style.display = "none"
    }
  }

  formatMessageContent(content) {
    return (
      content
        // Convert markdown links
        .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
        // Convert inline code
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        // Convert code blocks
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        // Convert bold text
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Convert italic text
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        // Convert line breaks
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n/g, "<br>")
        // Wrap in paragraphs
        .replace(/^(.+)$/gm, "<p>$1</p>")
        // Clean up empty paragraphs
        .replace(/<p><\/p>/g, "")
    )
  }

  showLoading() {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    const loadingDiv = document.createElement("div")
    loadingDiv.className = "message bot-message loading-message"
    loadingDiv.id = "loading-message"

    loadingDiv.innerHTML = `
      <div class="message-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
        </svg>
      </div>
      <div class="message-content">
        <div class="message-text">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `

    messagesContainer.appendChild(loadingDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  hideLoading() {
    const loadingMessage = document.getElementById("loading-message")
    loadingMessage?.remove()
  }

  clearConversation() {
    const messagesContainer = document.getElementById("chatbot-messages")
    if (!messagesContainer) return

    // Keep only the welcome message
    const welcomeMessage = messagesContainer.querySelector(".welcome-message")
    messagesContainer.innerHTML = ""
    if (welcomeMessage) {
      messagesContainer.appendChild(welcomeMessage)
    }

    // Clear history
    this.conversationHistory = []

    // Show quick actions
    const quickActions = document.getElementById("quick-actions")
    quickActions.style.display = "flex"

    // Generate new session ID
    this.currentSessionId = this.generateSessionId()

    this.trackEvent("conversation_cleared")
  }

  trackEvent(eventName, data = {}) {
    // Analytics tracking (implement based on your analytics provider)
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, {
        event_category: "chatbot",
        ...data,
      })
    }

    console.log("📊 Chatbot Event:", eventName, data)
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Configuration - customize these values
  const chatbotConfig = {
    apiEndpoint: "/api/chat", // Your LLM API endpoint
    model: "gpt-3.5-turbo",
    maxTokens: 500,
    temperature: 0.1,
    enabled: true,
  }

  // Initialize the chatbot
  window.llmChatbot = new LLMDocumentationChatbot(chatbotConfig)
})

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = LLMDocumentationChatbot
}
