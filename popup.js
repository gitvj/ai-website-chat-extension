// popup.js - Main popup functionality

class WebsiteChatExtension {
  constructor() {
    this.websiteContent = null;
    this.conversationHistory = [];
    this.currentProvider = 'claude';
    
    this.initializeElements();
    this.setupEventListeners();
    this.loadWebsiteContent();
    this.loadSettings();
  }

  initializeElements() {
    this.elements = {
      websiteInfo: document.getElementById('websiteInfo'),
      chatMessages: document.getElementById('chatMessages'),
      messageInput: document.getElementById('messageInput'),
      sendBtn: document.getElementById('sendBtn'),
      aiProvider: document.getElementById('aiProvider'),
      settingsBtn: document.getElementById('settingsBtn'),
      statusText: document.getElementById('statusText'),
      clearChat: document.getElementById('clearChat')
    };
  }

  setupEventListeners() {
    // Send message
    this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
    this.elements.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Input validation
    this.elements.messageInput.addEventListener('input', () => {
      const hasText = this.elements.messageInput.value.trim().length > 0;
      this.elements.sendBtn.disabled = !hasText;
    });

    // Provider selection
    this.elements.aiProvider.addEventListener('change', (e) => {
      this.currentProvider = e.target.value;
      this.saveSettings();
    });

    // Quick question buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        this.elements.messageInput.value = question;
        this.elements.sendBtn.disabled = false;
        this.sendMessage();
      });
    });

    // Settings and clear chat
    this.elements.settingsBtn.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });

    this.elements.clearChat.addEventListener('click', () => {
      this.clearConversation();
    });
  }

  async loadWebsiteContent() {
    try {
      this.updateStatus('Loading website content...');
      
      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Extract content from the webpage
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractContent' });
      
      this.websiteContent = response;
      this.displayWebsiteInfo();
      this.updateStatus('Ready');
      
    } catch (error) {
      console.error('Error loading website content:', error);
      this.elements.websiteInfo.innerHTML = `
        <div class="error">❌ Could not load website content. Please refresh the page and try again.</div>
      `;
      this.updateStatus('Error loading content');
    }
  }

  displayWebsiteInfo() {
    if (!this.websiteContent) return;

    this.elements.websiteInfo.innerHTML = `
      <div class="website-title">${this.escapeHtml(this.websiteContent.title)}</div>
      <a href="${this.websiteContent.url}" class="website-url" target="_blank" title="${this.websiteContent.url}">
        ${this.truncateUrl(this.websiteContent.url, 50)}
      </a>
    `;
    
    this.elements.websiteInfo.classList.add('loaded');
  }

  async sendMessage() {
    const message = this.elements.messageInput.value.trim();
    if (!message || !this.websiteContent) return;

    // Check if API key is configured
    const apiKey = await this.getApiKey(this.currentProvider);
    if (!apiKey) {
      this.showError('Please configure your API key in settings first.');
      return;
    }

    // Add user message to chat
    this.addMessage(message, 'user');
    this.elements.messageInput.value = '';
    this.elements.sendBtn.disabled = true;

    // Show thinking indicator
    const thinkingMessage = this.addThinkingMessage();

    try {
      this.updateStatus('Thinking...');
      
      // Send to background script
      const response = await chrome.runtime.sendMessage({
        action: 'chatWithAI',
        data: {
          provider: this.currentProvider,
          message: message,
          websiteContent: this.websiteContent,
          apiKey: apiKey,
          conversationHistory: this.conversationHistory
        }
      });

      // Remove thinking indicator
      thinkingMessage.remove();

      if (response.success) {
        // Add AI response to chat
        this.addMessage(response.data.content, 'ai');
        
        // Update conversation history
        this.conversationHistory.push(
          { role: 'user', content: message },
          { role: 'assistant', content: response.data.content }
        );
        
        this.updateStatus('Ready');
      } else {
        this.showError(response.error);
      }

    } catch (error) {
      thinkingMessage.remove();
      this.showError('Failed to get AI response. Please try again.');
      console.error('AI chat error:', error);
    }
  }

  addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = content;
    
    this.elements.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
    
    return messageDiv;
  }

  addThinkingMessage() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message-thinking';
    thinkingDiv.innerHTML = `
      <span>AI is thinking</span>
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    
    this.elements.chatMessages.appendChild(thinkingDiv);
    this.scrollToBottom();
    
    return thinkingDiv;
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error';
    errorDiv.textContent = `Error: ${message}`;
    
    this.elements.chatMessages.appendChild(errorDiv);
    this.scrollToBottom();
    this.updateStatus('Error');
  }

  clearConversation() {
    // Remove all messages except welcome message
    const messages = this.elements.chatMessages.querySelectorAll('.message, .message-thinking');
    messages.forEach(msg => msg.remove());
    
    this.conversationHistory = [];
    this.updateStatus('Chat cleared');
  }

  scrollToBottom() {
    this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
  }

  updateStatus(text) {
    this.elements.statusText.textContent = text;
  }

  async getApiKey(provider) {
    return new Promise((resolve) => {
      chrome.storage.sync.get([`${provider}ApiKey`], (result) => {
        resolve(result[`${provider}ApiKey`] || '');
      });
    });
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['selectedProvider'], (result) => {
        if (result.selectedProvider) {
          this.currentProvider = result.selectedProvider;
          this.elements.aiProvider.value = this.currentProvider;
        }
        resolve();
      });
    });
  }

  saveSettings() {
    chrome.storage.sync.set({
      selectedProvider: this.currentProvider
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  truncateUrl(url, maxLength) {
    if (url.length <= maxLength) return url;
    
    const start = url.substring(0, maxLength - 15);
    const end = url.substring(url.length - 12);
    return `${start}...${end}`;
  }
}

// Initialize the extension when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WebsiteChatExtension();
});