# Contributing to AI Website Chat Extension

Thank you for your interest in contributing! This guide will help you get started with contributing to the AI Website Chat Chrome extension.

## 🚀 Getting Started

### Prerequisites
- Chrome browser for testing
- Basic knowledge of JavaScript, HTML, CSS
- Familiarity with Chrome Extension development (helpful but not required)
- Node.js (optional, for future development tools)

### Setting Up Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-website-chat-extension.git
   cd ai-website-chat-extension
   ```

2. **Load Extension in Developer Mode**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make Changes and Test**
   - Edit the code
   - Reload the extension in Chrome
   - Test on various websites

## 📋 How to Contribute

### 🐛 Reporting Bugs

**Before creating an issue:**
- Check if the issue already exists
- Test with the latest version
- Try with different websites/AI providers

**When reporting bugs, include:**
- Chrome version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots (if applicable)

### 💡 Suggesting Features

**Good feature requests include:**
- Clear description of the problem
- Proposed solution
- Use cases and benefits
- Implementation ideas (if you have them)

### 🔧 Code Contributions

**Areas we welcome contributions:**
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Testing improvements
- 🌐 Internationalization
- ♿ Accessibility improvements

### 📝 Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test thoroughly

3. **Commit Guidelines**
   ```bash
   # Use clear, descriptive commit messages
   git commit -m "Add: New AI provider support for Perplexity"
   git commit -m "Fix: Content extraction fails on SPA websites"
   git commit -m "Improve: Error handling for API failures"
   ```

4. **Submit Pull Request**
   - Fill out the PR template
   - Link related issues
   - Describe what you changed and why
   - Include testing steps

## 🏗️ Project Structure

```
ai-website-chat-extension/
├── manifest.json          # Extension configuration
├── content.js             # Content extraction from web pages
├── background.js          # API calls to AI providers
├── popup.html/css/js      # Main extension interface
├── options.html/css/js    # Settings page
├── icons/                 # Extension icons
└── docs/                  # Documentation
```

## 🎯 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Use descriptive variable and function names
- Add JSDoc comments for functions
- Follow existing patterns in the codebase

### Testing Checklist
- [ ] Extension loads without errors
- [ ] Content extraction works on different websites
- [ ] All AI providers work correctly
- [ ] Settings save and load properly
- [ ] UI is responsive and accessible
- [ ] No console errors
- [ ] Works in incognito mode

### AI Provider Integration
When adding new AI providers:
- Follow the existing pattern in `background.js`
- Add provider to the dropdown in `popup.html`
- Update settings page in `options.html`
- Add error handling and validation
- Test with actual API keys

## 🚦 Development Workflow

### Local Development
```bash
# 1. Make changes to files
# 2. Go to chrome://extensions/
# 3. Click reload button on the extension
# 4. Test your changes
# 5. Repeat
```

### Debugging Tips
- Use Chrome DevTools for popup debugging
- Check background script in extension's service worker
- Use `console.log()` for debugging (remove before PR)
- Test content script in website's console

## 📚 Useful Resources

### Chrome Extension Development
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/migrating/)
- [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)

### AI Provider APIs
- [Anthropic Claude API](https://docs.anthropic.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help newcomers learn
- Provide constructive feedback
- Keep discussions focused and relevant
- Follow the project's code of conduct

## ❓ Questions?

- Check existing [Issues](https://github.com/gitvj/ai-website-chat-extension/issues)
- Start a [Discussion](https://github.com/gitvj/ai-website-chat-extension/discussions)
- Review the [README](README.md) and [Installation Guide](INSTALL.md)

## 🎉 Recognition

Contributors will be:
- Listed in the repository contributors
- Mentioned in release notes for significant contributions
- Given credit in the extension's about section

---

**Thank you for contributing to AI Website Chat Extension!** 🎉

Every contribution, no matter how small, helps make this extension better for everyone.