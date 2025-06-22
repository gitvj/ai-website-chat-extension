# AI Website Chat - Chrome Extension

A powerful Chrome extension that lets you chat with AI about any website content using Claude, ChatGPT, or Gemini APIs.

![AI Website Chat Extension](https://img.shields.io/badge/Version-1.0-blue) ![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-green)

## 🌟 Features

- **Multi-AI Support**: Use Claude (Anthropic), ChatGPT (OpenAI), or Gemini (Google) APIs
- **Smart Content Extraction**: Automatically extracts and processes website content
- **Interactive Chat Interface**: Clean, modern popup interface for AI conversations
- **Quick Question Shortcuts**: Pre-built buttons for common queries
- **Secure Storage**: API keys stored securely in Chrome's local storage
- **Conversation History**: Maintains context during your session
- **Real-time Analysis**: Get instant insights about any webpage

## 🚀 Installation

### Method 1: Manual Installation (Recommended)

1. **Download the Extension Files**
   - Clone this repository or download all the files
   - Create a new folder for your extension

2. **Add the Required Files**
   - Copy all the files from the artifacts above into your extension folder:
     - `manifest.json`
     - `content.js`
     - `background.js`
     - `popup.html`
     - `popup.css`
     - `popup.js`
     - `options.html`
     - `options.css`
     - `options.js`

3. **Create Icons Folder**
   - Create an `icons` folder in your extension directory
   - Add icon files (16x16, 48x48, 128x128 pixels) named:
     - `icon16.png`
     - `icon48.png`
     - `icon128.png`
   - You can create simple icons or download from icon libraries

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select your extension folder
   - The extension should now appear in your extensions list

## ⚙️ Setup

### 1. Get API Keys

You'll need at least one API key from these providers:

**Claude (Anthropic)**
- Visit [Anthropic Console](https://console.anthropic.com/)
- Create an account and generate an API key
- Format: `sk-ant-api03-...`

**ChatGPT (OpenAI)**
- Visit [OpenAI Platform](https://platform.openai.com/api-keys)
- Create an account and generate an API key
- Format: `sk-...`

**Gemini (Google)**
- Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create an account and generate an API key
- Format: `AIza...`

### 2. Configure the Extension

1. Click the extension icon in Chrome
2. Click the settings button (⚙️) or right-click the extension and select "Options"
3. Enter your API keys for the providers you want to use
4. Choose your default AI provider
5. Configure preferences as needed
6. Click "Save Settings"
7. Test the connection using the "Test Connection" button

## 🎯 How to Use

### Basic Usage

1. **Navigate to any website** you want to analyze
2. **Click the extension icon** in your Chrome toolbar
3. **Wait for content extraction** (happens automatically)
4. **Choose your AI provider** from the dropdown
5. **Start chatting!** Ask questions about the website content

### Quick Questions

Use the pre-built question buttons for instant insights:
- **📝 Summarize**: Get a concise summary of the page
- **🎯 Key Points**: Extract the main points and important information
- **💡 Explain Simply**: Get complex content explained in simple terms

### Example Questions

- "What is the main purpose of this website?"
- "Summarize the key features mentioned on this page"
- "What are the pricing options available?"
- "Explain this technical article in simple terms"
- "What are the main benefits highlighted here?"
- "Find the contact information on this page"

## 🛠️ File Structure

```
ai-website-chat/
├── manifest.json          # Extension configuration
├── content.js             # Content extraction script
├── background.js          # API handling service worker
├── popup.html            # Main interface HTML
├── popup.css             # Main interface styles
├── popup.js              # Main interface logic
├── options.html          # Settings page HTML
├── options.css           # Settings page styles
├── options.js            # Settings page logic
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## 🔒 Privacy & Security

- **Local Storage**: All API keys are stored securely in Chrome's local storage
- **No Data Collection**: We don't collect, store, or transmit any personal data
- **Direct API Calls**: Your data goes directly to the AI providers, not through our servers
- **Session-Only History**: Conversation history is cleared when you close the popup
- **Secure Transmission**: All API communications use HTTPS encryption

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
- Ensure all files are in the correct location
- Check the Chrome Extensions page for error messages
- Make sure you have the required icon files

**API connection failed:**
- Verify your API key is correct and properly formatted
- Check your internet connection
- Ensure you have sufficient API credits/quota
- Try the "Test Connection" button in settings

**Content not extracting:**
- Refresh the webpage and try again
- Some websites may block content extraction
- Check if the page has finished loading completely

**Error messages:**
- Check the browser console for detailed error information
- Ensure your API keys haven't expired
- Try switching to a different AI provider

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify your API keys in the settings
3. Test with a simple webpage first
4. Check if the AI provider's service is operational

## 🔄 Updates & Maintenance

To update the extension:
1. Download the latest version of the files
2. Replace the files in your extension folder
3. Go to `chrome://extensions/`
4. Click the refresh button on your extension

## 📝 License

This project is open source. Feel free to modify and distribute according to your needs.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## ⭐ Support

If you find this extension helpful, please:
- Star the repository
- Share it with others
- Provide feedback for improvements

---

**Happy browsing with AI! 🤖✨**