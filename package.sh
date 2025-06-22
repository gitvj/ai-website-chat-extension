#!/bin/bash

# AI Website Chat Extension - Package Script
# This script creates a distributable ZIP file of the Chrome extension

set -e  # Exit on any error

echo "🚀 AI Website Chat Extension - Package Script"
echo "=============================================="

# Get the current version from manifest.json
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
echo "📦 Packaging version: $VERSION"

# Create package directory name
PACKAGE_NAME="ai-website-chat-extension-v$VERSION"
ZIP_NAME="$PACKAGE_NAME.zip"

# Check if required files exist
echo "🔍 Checking required files..."
REQUIRED_FILES=("manifest.json" "content.js" "background.js" "popup.html" "popup.css" "popup.js" "options.html" "options.css" "options.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

# Check for icons
if [ ! -d "icons" ]; then
    echo "⚠️  Warning: icons/ directory not found"
    echo "   Please create icons before packaging for production"
else
    ICON_FILES=("icons/icon16.png" "icons/icon48.png" "icons/icon128.png")
    for icon in "${ICON_FILES[@]}"; do
        if [ ! -f "$icon" ]; then
            echo "⚠️  Warning: Missing icon file: $icon"
        fi
    done
fi

echo "✅ All required files found"

# Create temporary directory for packaging
echo "📁 Creating package directory..."
mkdir -p "temp/$PACKAGE_NAME"

# Copy extension files
echo "📋 Copying extension files..."
cp manifest.json "temp/$PACKAGE_NAME/"
cp content.js "temp/$PACKAGE_NAME/"
cp background.js "temp/$PACKAGE_NAME/"
cp popup.html popup.css popup.js "temp/$PACKAGE_NAME/"
cp options.html options.css options.js "temp/$PACKAGE_NAME/"

# Copy icons if they exist
if [ -d "icons" ]; then
    mkdir -p "temp/$PACKAGE_NAME/icons"
    cp icons/* "temp/$PACKAGE_NAME/icons/" 2>/dev/null || echo "⚠️  Some icon files may be missing"
fi

# Copy documentation
echo "📚 Copying documentation..."
cp README.md "temp/$PACKAGE_NAME/"
cp LICENSE "temp/$PACKAGE_NAME/"
cp INSTALL.md "temp/$PACKAGE_NAME/"

# Create ZIP file
echo "🗜️  Creating ZIP archive..."
cd temp
zip -r "../$ZIP_NAME" "$PACKAGE_NAME"
cd ..

# Clean up temporary directory
echo "🧹 Cleaning up..."
rm -rf temp

# Calculate file size
if command -v stat >/dev/null 2>&1; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        SIZE=$(stat -f%z "$ZIP_NAME")
    else
        # Linux
        SIZE=$(stat -c%s "$ZIP_NAME")
    fi
    SIZE_KB=$((SIZE / 1024))
    echo "📊 Package size: ${SIZE_KB}KB"
fi

echo ""
echo "✅ Package created successfully!"
echo "📦 File: $ZIP_NAME"
echo ""
echo "🎯 Next steps:"
echo "   1. Test the extension by loading the ZIP contents in Chrome"
echo "   2. Add icons to the icons/ folder if missing"
echo "   3. Share the ZIP file or submit to Chrome Web Store"
echo ""
echo "📋 Chrome Web Store Checklist:"
echo "   ✓ All files included"
echo "   $([ -f "icons/icon16.png" ] && echo "✓" || echo "⚠️ ") Icon files (create icons/icon16.png, icon48.png, icon128.png)"
echo "   ✓ Privacy policy (included in README)"
echo "   ✓ Description and screenshots (create for store listing)"
echo ""
echo "🔗 Useful links:"
echo "   • Chrome Developer Dashboard: https://chrome.google.com/webstore/devconsole"
echo "   • Extension publication guide: https://developer.chrome.com/docs/webstore/publish"
echo ""
echo "🎉 Happy publishing!"