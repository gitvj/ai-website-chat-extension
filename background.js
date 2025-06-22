// background.js - Handle API calls to different AI providers

class AIProviders {
  constructor() {
    this.setupMessageListener();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'chatWithAI') {
        this.handleAIChat(request.data)
          .then(response => sendResponse({ success: true, data: response }))
          .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep message channel open for async response
      }
    });
  }

  async handleAIChat({ provider, message, websiteContent, apiKey, conversationHistory = [] }) {
    switch (provider) {
      case 'claude':
        return await this.callClaudeAPI(message, websiteContent, apiKey, conversationHistory);
      case 'chatgpt':
        return await this.callChatGPTAPI(message, websiteContent, apiKey, conversationHistory);
      case 'gemini':
        return await this.callGeminiAPI(message, websiteContent, apiKey, conversationHistory);
      default:
        throw new Error('Unsupported AI provider');
    }
  }

  async callClaudeAPI(message, websiteContent, apiKey, conversationHistory) {
    const systemPrompt = `You are an AI assistant helping a user understand and discuss a website they're browsing. Here's the website content:

Title: ${websiteContent.title}
URL: ${websiteContent.url}
Content: ${websiteContent.content}
Summary: ${websiteContent.summary}

Please help the user with questions about this website content. Be helpful, accurate, and conversational.`;

    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.content[0].text,
      provider: 'claude'
    };
  }

  async callChatGPTAPI(message, websiteContent, apiKey, conversationHistory) {
    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant helping a user understand and discuss a website they're browsing. Here's the website content:

Title: ${websiteContent.title}
URL: ${websiteContent.url}
Content: ${websiteContent.content}
Summary: ${websiteContent.summary}

Please help the user with questions about this website content. Be helpful, accurate, and conversational.`
    };

    const messages = [
      systemMessage,
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`ChatGPT API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      provider: 'chatgpt'
    };
  }

  async callGeminiAPI(message, websiteContent, apiKey, conversationHistory) {
    const prompt = `You are an AI assistant helping a user understand and discuss a website they're browsing. Here's the website content:

Title: ${websiteContent.title}
URL: ${websiteContent.url}
Content: ${websiteContent.content}
Summary: ${websiteContent.summary}

Conversation history:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${message}

Please help the user with questions about this website content. Be helpful, accurate, and conversational.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: data.candidates[0].content.parts[0].text,
      provider: 'gemini'
    };
  }
}

// Initialize the AI providers handler
new AIProviders();