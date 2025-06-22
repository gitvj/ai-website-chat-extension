# Quick Installation Guide

Follow these steps to install and set up the AI Website Chat extension in Chrome.

## 📦 Installation Steps

### 1. Download the Extension
```bash
# Clone the repository
git clone https://github.com/gitvj/ai-website-chat-extension.git
cd ai-website-chat-extension
```

### 2. Add Extension Icons
Create simple placeholder icons in the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels) 
- `icon128.png` (128x128 pixels)

**Quick Icon Creation:**
```bash
# Create simple colored squares using any image editor or online tool
# Use the extension's blue theme color: #667eea
# Add white "AI" text in the center
```

### 3. Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the `ai-website-chat-extension` folder
5. The extension should appear in your extensions list

### 4. Configure API Keys
1. Click the extension icon in Chrome toolbar
2. Click the settings button (⚙️) 
3. Enter API keys for your preferred AI providers:
   - **Claude**: Get from [Anthropic Console](https://console.anthropic.com/)
   - **ChatGPT**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - **Gemini**: Get from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Click **"Save Settings"**
5. Use **"Test Connection"** to verify your setup

## 🚀 Usage

1. **Visit any website** you want to analyze
2. **Click the extension icon** in Chrome toolbar
3. **Wait for content extraction** (automatic)
4. **Start chatting** with AI about the website!

### Quick Questions
- 📝 **Summarize** - Get page summary
- 🎯 **Key Points** - Extract main points  
- 💡 **Explain Simply** - Simplify complex content

## 🔧 Troubleshooting

**Extension not loading?**
- Ensure all files are in correct locations
- Check for missing icon files
- Look for errors in `chrome://extensions/`

**API connection failed?**
- Verify API key format and validity
- Check internet connection
- Ensure sufficient API credits
- Try different AI provider

**Content not extracting?**
- Refresh the webpage
- Check if page finished loading
- Some sites may block content extraction

## 🔄 Updates

To update the extension:
1. Pull latest changes: `git pull origin main`
2. Go to `chrome://extensions/`
3. Click refresh button on the extension

## 📝 Next Steps

- Star the repository if you find it helpful! ⭐
- Report issues or suggest features in GitHub Issues
- Customize the extension for your needs
- Share with others who might benefit

---

**Need help?** Check the full [README.md](README.md) or open an issue on GitHub.