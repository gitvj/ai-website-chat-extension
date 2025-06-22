// options.js - Options page functionality

class OptionsManager {
  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.loadSettings();
  }

  initializeElements() {
    this.elements = {
      claudeApiKey: document.getElementById('claudeApiKey'),
      chatgptApiKey: document.getElementById('chatgptApiKey'),
      geminiApiKey: document.getElementById('geminiApiKey'),
      claudeStatus: document.getElementById('claudeStatus'),
      chatgptStatus: document.getElementById('chatgptStatus'),
      geminiStatus: document.getElementById('geminiStatus'),
      defaultProvider: document.getElementById('defaultProvider'),
      autoExtract: document.getElementById('autoExtract'),
      showSummary: document.getElementById('showSummary'),
      saveBtn: document.getElementById('saveBtn'),
      testBtn: document.getElementById('testBtn'),
      clearBtn: document.getElementById('clearBtn'),
      statusMessage: document.getElementById('statusMessage')
    };
  }

  setupEventListeners() {
    // Save settings
    this.elements.saveBtn.addEventListener('click', () => this.saveSettings());

    // Test connection
    this.elements.testBtn.addEventListener('click', () => this.testConnection());

    // Clear all data
    this.elements.clearBtn.addEventListener('click', () => this.clearAllData());

    // Toggle password visibility
    document.querySelectorAll('.toggle-visibility').forEach(btn => {
      btn.addEventListener('click', (e) => this.togglePasswordVisibility(e.target));
    });

    // Monitor API key inputs to update status and enable test button
    [this.elements.claudeApiKey, this.elements.chatgptApiKey, this.elements.geminiApiKey].forEach(input => {
      input.addEventListener('input', () => {
        this.updateProviderStatus();
        this.updateTestButtonState();
      });
    });

    // Footer links
    document.getElementById('aboutLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showAbout();
    });

    document.getElementById('helpLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showHelp();
    });

    document.getElementById('privacyLink').addEventListener('click', (e) => {
      e.preventDefault();
      this.showPrivacy();
    });
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get([
        'claudeApiKey',
        'chatgptApiKey', 
        'geminiApiKey',
        'selectedProvider',
        'autoExtract',
        'showSummary'
      ]);

      // Load API keys
      this.elements.claudeApiKey.value = result.claudeApiKey || '';
      this.elements.chatgptApiKey.value = result.chatgptApiKey || '';
      this.elements.geminiApiKey.value = result.geminiApiKey || '';

      // Load preferences
      this.elements.defaultProvider.value = result.selectedProvider || 'claude';
      this.elements.autoExtract.checked = result.autoExtract !== false; // Default true
      this.elements.showSummary.checked = result.showSummary !== false; // Default true

      this.updateProviderStatus();
      this.updateTestButtonState();

    } catch (error) {
      console.error('Error loading settings:', error);
      this.showStatus('Error loading settings', 'error');
    }
  }

  async saveSettings() {
    try {
      const settings = {
        claudeApiKey: this.elements.claudeApiKey.value.trim(),
        chatgptApiKey: this.elements.chatgptApiKey.value.trim(),
        geminiApiKey: this.elements.geminiApiKey.value.trim(),
        selectedProvider: this.elements.defaultProvider.value,
        autoExtract: this.elements.autoExtract.checked,
        showSummary: this.elements.showSummary.checked
      };

      await chrome.storage.sync.set(settings);
      
      this.updateProviderStatus();
      this.showStatus('Settings saved successfully!', 'success');

    } catch (error) {
      console.error('Error saving settings:', error);
      this.showStatus('Error saving settings', 'error');
    }
  }

  async testConnection() {
    const provider = this.elements.defaultProvider.value;
    const apiKey = this.elements[`${provider}ApiKey`].value.trim();

    if (!apiKey) {
      this.showStatus('Please enter an API key first', 'error');
      return;
    }

    this.elements.testBtn.disabled = true;
    this.elements.testBtn.textContent = 'Testing...';
    this.showStatus('Testing connection...', 'info');

    try {
      // Send test message to background script
      const response = await chrome.runtime.sendMessage({
        action: 'chatWithAI',
        data: {
          provider: provider,
          message: 'Hello, this is a test message.',
          websiteContent: {
            title: 'Test Page',
            url: 'https://example.com',
            content: 'This is a test to verify the API connection.',
            summary: 'Test content for API verification'
          },
          apiKey: apiKey,
          conversationHistory: []
        }
      });

      if (response.success) {
        this.showStatus(`✅ ${provider.toUpperCase()} connection successful!`, 'success');
      } else {
        this.showStatus(`❌ ${provider.toUpperCase()} connection failed: ${response.error}`, 'error');
      }

    } catch (error) {
      console.error('Test connection error:', error);
      this.showStatus('❌ Connection test failed', 'error');
    } finally {
      this.elements.testBtn.disabled = false;
      this.elements.testBtn.textContent = 'Test Connection';
    }
  }

  async clearAllData() {
    if (!confirm('Are you sure you want to clear all saved data? This action cannot be undone.')) {
      return;
    }

    try {
      await chrome.storage.sync.clear();
      
      // Reset form
      this.elements.claudeApiKey.value = '';
      this.elements.chatgptApiKey.value = '';
      this.elements.geminiApiKey.value = '';
      this.elements.defaultProvider.value = 'claude';
      this.elements.autoExtract.checked = true;
      this.elements.showSummary.checked = true;

      this.updateProviderStatus();
      this.updateTestButtonState();
      this.showStatus('All data cleared successfully', 'success');

    } catch (error) {
      console.error('Error clearing data:', error);
      this.showStatus('Error clearing data', 'error');
    }
  }

  togglePasswordVisibility(button) {
    const targetId = button.getAttribute('data-target');
    const input = document.getElementById(targetId);
    
    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁️';
    }
  }

  updateProviderStatus() {
    const providers = [
      { key: 'claude', element: this.elements.claudeStatus, input: this.elements.claudeApiKey },
      { key: 'chatgpt', element: this.elements.chatgptStatus, input: this.elements.chatgptApiKey },
      { key: 'gemini', element: this.elements.geminiStatus, input: this.elements.geminiApiKey }
    ];

    providers.forEach(provider => {
      const hasKey = provider.input.value.trim().length > 0;
      provider.element.textContent = hasKey ? 'Configured' : 'Not configured';
      provider.element.className = `provider-status ${hasKey ? 'configured' : ''}`;
    });
  }

  updateTestButtonState() {
    const selectedProvider = this.elements.defaultProvider.value;
    const hasApiKey = this.elements[`${selectedProvider}ApiKey`].value.trim().length > 0;
    this.elements.testBtn.disabled = !hasApiKey;
  }

  showStatus(message, type) {
    this.elements.statusMessage.textContent = message;
    this.elements.statusMessage.className = `status-message ${type}`;
    
    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
      setTimeout(() => {
        this.elements.statusMessage.style.display = 'none';
      }, 5000);
    }
  }

  showAbout() {
    alert(`AI Website Chat Extension v1.0

A Chrome extension that allows you to chat with AI about any website content using Claude, ChatGPT, or Gemini APIs.

Features:
• Extract and analyze website content
• Chat with multiple AI providers
• Quick question shortcuts
• Secure local storage of API keys

Created with ❤️ for better web browsing experience.`);
  }

  showHelp() {
    alert(`How to use AI Website Chat:

1. Setup API Keys:
   • Get API keys from Claude, ChatGPT, or Gemini
   • Enter them in this settings page
   • Click "Save Settings"

2. Using the Extension:
   • Click the extension icon on any webpage
   • Choose your preferred AI provider
   • Ask questions about the website content
   • Use quick question buttons for common queries

3. Tips:
   • The extension automatically extracts page content
   • Your conversation history is maintained during the session
   • Use "Clear Chat" to start fresh conversations

Need more help? Check the extension's GitHub repository.`);
  }

  showPrivacy() {
    alert(`Privacy & Security:

🔒 Your API keys are stored locally in your browser using Chrome's secure storage API.

🛡️ API keys are never sent to our servers - they're only used to make direct requests to the AI providers.

📝 Website content is temporarily processed to enable AI conversations but is not stored permanently.

🔄 Conversation history is kept only during your session and is cleared when you close the popup.

🚫 We do not collect, store, or transmit any personal data.

Your privacy and security are our top priorities.`);
  }
}

// Initialize the options manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OptionsManager();
});