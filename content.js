// content.js - Extract and process webpage content

class WebsiteContentExtractor {
  constructor() {
    this.setupMessageListener();
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'extractContent') {
        const content = this.extractPageContent();
        sendResponse(content);
      }
      return true;
    });
  }

  extractPageContent() {
    // Remove script, style, and other non-content elements
    const elementsToRemove = document.querySelectorAll('script, style, nav, header, footer, aside, .advertisement, .ads, .sidebar');
    elementsToRemove.forEach(el => el.remove());

    // Get main content
    const mainContent = this.getMainContent();
    
    return {
      title: document.title,
      url: window.location.href,
      content: mainContent,
      summary: this.generateSummary(mainContent),
      headings: this.extractHeadings(),
      links: this.extractLinks(),
      images: this.extractImages()
    };
  }

  getMainContent() {
    // Try to find main content area
    const selectors = [
      'main',
      'article',
      '[role="main"]',
      '.main-content',
      '.content',
      '.post-content',
      '.entry-content',
      '#main',
      '#content'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        return this.cleanText(element.innerText);
      }
    }

    // Fallback to body content
    const body = document.body.cloneNode(true);
    
    // Remove unwanted elements from the clone
    const unwanted = body.querySelectorAll('nav, header, footer, aside, .sidebar, .menu, .navigation, .ads, .advertisement, script, style');
    unwanted.forEach(el => el.remove());
    
    return this.cleanText(body.innerText);
  }

  cleanText(text) {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
      .substring(0, 8000); // Limit content length
  }

  generateSummary(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).join('. ').trim() + (sentences.length > 3 ? '...' : '');
  }

  extractHeadings() {
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      if (h.innerText.trim()) {
        headings.push({
          level: parseInt(h.tagName.charAt(1)),
          text: h.innerText.trim()
        });
      }
    });
    return headings.slice(0, 10);
  }

  extractLinks() {
    const links = [];
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const text = link.innerText.trim();
      if (text && href && !href.startsWith('#')) {
        links.push({
          text: text.substring(0, 100),
          url: href.startsWith('http') ? href : new URL(href, window.location.href).href
        });
      }
    });
    return links.slice(0, 15);
  }

  extractImages() {
    const images = [];
    document.querySelectorAll('img[src]').forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      if (src && !src.includes('data:image')) {
        images.push({
          src: src.startsWith('http') ? src : new URL(src, window.location.href).href,
          alt: alt.substring(0, 100)
        });
      }
    });
    return images.slice(0, 10);
  }
}

// Initialize the content extractor
new WebsiteContentExtractor();