---
title: "Chatbot Component"
type: "ui-component"
position: "fixed-bottom-right"
interactive: true
ai_powered: true
---

# Chatbot Component

## Overview
AI-powered chatbot widget that provides instant help and answers questions about the GRA Core Platform documentation.

## Configuration
\`\`\`yaml
chatbot:
  enabled: true
  position: "bottom-right"
  title: "GRA Assistant"
  icon: "🤖"
  welcome_message: "Hello! I'm the GRA Assistant. How can I help you with the documentation today?"
  placeholder: "Ask me anything about GRA Core Platform..."
  ai_config:
    model: "gpt-3.5-turbo"
    max_tokens: 500
    temperature: 0.1
    system_prompt: "You are a helpful assistant for the GRA Core Platform documentation."
  ui:
    trigger_size: "w-14 h-14"
    panel_size: "w-80 h-96"
    theme: "gradient-blue-purple"
    animation: "scale-hover"
\`\`\`

## HTML Structure
\`\`\`html
<!-- Chatbot Widget -->
<div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
  <!-- Trigger Button -->
  <div id="chatbot-trigger" 
       class="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300" 
       onclick="toggleChatbot()"
       role="button"
       aria-label="Open GRA Assistant Chatbot"
       tabindex="0">
    <span class="text-white text-xl">🤖</span>
  </div>
  
  <!-- Chat Panel -->
  <div id="chatbot-panel" 
       class="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 hidden"
       role="dialog"
       aria-labelledby="chatbot-title"
       aria-describedby="chatbot-description">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <span class="text-white text-sm">🤖</span>
        </div>
        <div>
          <h3 id="chatbot-title" class="text-white font-semibold">GRA Assistant</h3>
          <p class="text-white/80 text-xs">Online</p>
        </div>
      </div>
      <button onclick="toggleChatbot()" 
              class="text-white hover:text-white/80 transition-colors"
              aria-label="Close chatbot">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    
    <!-- Messages Area -->
    <div id="chatbot-messages" 
         class="flex-1 p-4 overflow-y-auto h-64"
         role="log"
         aria-live="polite"
         aria-label="Chat messages">
      
      <!-- Welcome Message -->
      <div class="flex items-start space-x-3 mb-4">
        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-blue-600 text-sm">🤖</span>
        </div>
        <div class="bg-gray-100 rounded-2xl rounded-tl-sm p-3 max-w-xs">
          <p class="text-sm text-gray-800">Hello! I'm the GRA Assistant. How can I help you with the documentation today?</p>
        </div>
      </div>
    </div>
    
    <!-- Input Area -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex space-x-2">
        <input type="text" 
               id="chatbot-input" 
               placeholder="Ask me anything..." 
               class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               aria-label="Type your message">
        <button onclick="sendMessage()" 
                class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                aria-label="Send message">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
\`\`\`

## CSS Styles
\`\`\`css
#chatbot-widget {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#chatbot-trigger {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

#chatbot-trigger:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

#chatbot-trigger:active {
  transform: scale(0.95);
}

#chatbot-panel {
  transition: all 0.3s ease;
  transform-origin: bottom right;
}

#chatbot-panel.show {
  animation: chatbotSlideIn 0.3s ease forwards;
}

#chatbot-panel.hide {
  animation: chatbotSlideOut 0.3s ease forwards;
}

@keyframes chatbotSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes chatbotSlideOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
}

#chatbot-messages {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

#chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

#chatbot-messages::-webkit-scrollbar-track {
  background: #f7fafc;
}

#chatbot-messages::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.message-user {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  margin-left: auto;
  border-radius: 1rem 1rem 0.25rem 1rem;
}

.message-bot {
  background: #f3f4f6;
  color: #374151;
  border-radius: 1rem 1rem 1rem 0.25rem;
}

.typing-indicator {
  display: flex;
  align-items: center;
  space-x: 4px;
  padding: 12px 16px;
  background: #f3f4f6;
  border-radius: 1rem 1rem 1rem 0.25rem;
  max-width: fit-content;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typingAnimation 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingAnimation {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}
\`\`\`

## JavaScript Functionality
\`\`\`javascript
class GRAChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadChatHistory();
  }

  bindEvents() {
    // Toggle chatbot
    document.getElementById('chatbot-trigger').addEventListener('click', () => {
      this.toggleChatbot();
    });

    // Send message on Enter key
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Send button click
    document.querySelector('#chatbot-panel button[onclick="sendMessage()"]').addEventListener('click', () => {
      this.sendMessage();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.toggleChatbot();
      }
    });
  }

  toggleChatbot() {
    const panel = document.getElementById('chatbot-panel');
    const trigger = document.getElementById('chatbot-trigger');
    
    if (this.isOpen) {
      panel.classList.add('hide');
      setTimeout(() => {
        panel.classList.add('hidden');
        panel.classList.remove('hide');
      }, 300);
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      panel.classList.remove('hidden');
      panel.classList.add('show');
      setTimeout(() => {
        panel.classList.remove('show');
        document.getElementById('chatbot-input').focus();
      }, 300);
      trigger.setAttribute('aria-expanded', 'true');
    }
    
    this.isOpen = !this.isOpen;
    
    // Track chatbot usage
    this.trackEvent('chatbot_toggle', { action: this.isOpen ? 'open' : 'close' });
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Send to AI service
      const response = await this.callAIService(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      console.error('Chatbot error:', error);
    }
    
    // Track message
    this.trackEvent('chatbot_message', { 
      message_length: message.length,
      user_message: message.substring(0, 50) // First 50 chars for analytics
    });
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex items-start space-x-3 mb-4 ${sender === 'user' ? 'justify-end' : ''}`;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="message-user text-white rounded-2xl rounded-tr-sm p-3 max-w-xs">
          <p class="text-sm">${this.escapeHtml(text)}</p>
          <span class="text-xs opacity-75 mt-1 block">${timestamp}</span>
        </div>
        <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-white text-sm">👤</span>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-blue-600 text-sm">🤖</span>
        </div>
        <div class="message-bot rounded-2xl rounded-tl-sm p-3 max-w-xs">
          <p class="text-sm text-gray-800">${this.formatBotMessage(text)}</p>
          <span class="text-xs text-gray-500 mt-1 block">${timestamp}</span>
        </div>
      `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Store message
    this.messages.push({ text, sender, timestamp: Date.now() });
    this.saveChatHistory();
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'flex items-start space-x-3 mb-4';
    typingDiv.innerHTML = `
      <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span class="text-blue-600 text-sm">🤖</span>
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async callAIService(message) {
    // Simulate AI response - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple response logic - replace with actual AI integration
    const responses = [
      "I'd be happy to help you with that! You can find more information in our documentation sections.",
      "That's a great question! Let me point you to the relevant documentation section.",
      "For detailed information about that topic, please check our API reference or user guide.",
      "I can help you with GRA Core Platform questions. What specific area would you like to know more about?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  formatBotMessage(text) {
    // Format bot messages with links and formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded">$1</code>');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveChatHistory() {
    try {
      localStorage.setItem('gra-chatbot-history', JSON.stringify(this.messages.slice(-20))); // Keep last 20 messages
    } catch (error) {
      console.warn('Could not save chat history:', error);
    }
  }

  loadChatHistory() {
    try {
      const history = localStorage.getItem('gra-chatbot-history');
      if (history) {
        this.messages = JSON.parse(history);
        // Optionally restore messages to UI
      }
    } catch (error) {
      console.warn('Could not load chat history:', error);
    }
  }

  trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'chatbot',
        ...parameters
      });
    }
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.graChatbot = new GRAChatbot();
});

// Legacy function support
function toggleChatbot() {
  if (window.graChatbot) {
    window.graChatbot.toggleChatbot();
  }
}

function sendMessage() {
  if (window.graChatbot) {
    window.graChatbot.sendMessage();
  }
}
\`\`\`

## Responsive Design
\`\`\`css
@media (max-width: 768px) {
  #chatbot-panel {
    width: calc(100vw - 2rem);
    right: 1rem;
    left: 1rem;
    bottom: 5rem;
  }
  
  #chatbot-trigger {
    width: 3rem;
    height: 3rem;
    bottom: 1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  #chatbot-panel {
    height: 70vh;
    bottom: 4rem;
  }
}
\`\`\`

## Accessibility Features
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast mode support

## Integration with Documentation
The chatbot can be configured to:
- Search documentation content
- Provide contextual help based on current page
- Link to relevant documentation sections
- Track user questions for documentation improvements

## Dependencies
- Modern browser with ES6+ support
- CSS Grid and Flexbox support
- Local Storage API
- Optional: Google Analytics for tracking
- Optional: AI service API for intelligent responses
