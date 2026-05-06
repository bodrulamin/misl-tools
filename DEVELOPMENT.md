# MISL Tools - Development Guide

This guide helps you understand and work with the MISL Tools Chrome extension codebase.

## Quick Start

### Testing Your Changes
1. Open Chrome and go to `chrome://extensions/`
2. Find "MISL Tools" and click the reload icon
3. Go to your Mantis page and refresh to see changes

### File Structure
```
misl-tools/
├── manifest.json           # Extension configuration
├── background.js           # Background service worker (context menus, browser actions)
├── content.js              # Injected into web pages
├── popup.html/js           # Extension popup interface
├── settings.js             # Configuration and constants
├── helpers/                # Shared utility functions
│   └── navigation.js       # Navigation functions used in multiple places
├── features/               # Feature scripts (conditionally loaded)
│   ├── load-features.js   # Decides which features to load based on URL
│   ├── rich-text.js       # TinyMCE rich text editor
│   ├── navigation-menu.js # Floating navigation menu
│   ├── date-picker.js     # Date input enhancement
│   └── fix-html-tags.js   # HTML tag fixes
└── resources/              # External libraries and assets
    ├── tinymce/           # TinyMCE editor library
    └── icons/             # Extension icons
```

## How the Extension Works

### 1. Content Script Injection
When you visit any webpage, Chrome injects `content.js` into the page. This script:
- Injects the feature loader (`load-features.js`)
- Listens for text selection (for MITS navigation)
- Handles show/hide messages for the quick menu

### 2. Conditional Feature Loading
`load-features.js` checks the current URL and loads only the features needed:
- **Mantis bug view pages** (`/view.php?id=`) → Rich text editor + Navigation menu
- **Bug update/report pages** → Rich text editor + Date picker
- **All pages** → HTML tag fixes

### 3. Background Service Worker
`background.js` runs in the background and:
- Manages context menus (shows/hides based on URL)
- Handles browser actions (popup click)
- Receives messages from content scripts

### 4. Communication Flow
```
Web Page → content.js → background.js → (perform action)
                    ↘ popup.js → (update settings)
```

## Common Tasks

### Change the Mantis Server URL
Edit `settings.js`:
```javascript
MANTIS_SERVER: 'http://your-server-here/mantis/',
```

### Add a New Context Menu Item
1. Create menu in `background.js` `chrome.runtime.onInstalled` listener
2. Add visibility logic in `showMantisMenus()`/`hideMantisMenus()` functions
3. Handle clicks in `chrome.contextMenus.onClicked` listener

### Add a New Feature
1. Create your feature script in `features/your-feature.js`
2. Add loading logic to `features/load-features.js`:
```javascript
if (window.location.href.includes('your-pattern')) {
  loadScript('features/your-feature.js');
}
```

### Modify the Popup
1. Edit HTML in `popup.html`
2. Add logic to `popup.js` (functions are organized by feature)
3. Reload extension to test

### Debug Issues
- Open Chrome DevTools on the webpage (F12)
- Check Console for errors
- For background script issues: Go to `chrome://extensions/` → "Service worker" link

## Key Concepts

### Message Passing
Content scripts and background scripts communicate via messages:
```javascript
// Send message
chrome.runtime.sendMessage({ type: 'yourType', data: yourData });

// Receive message
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'yourType') {
    // Handle message
  }
});
```

### Script Injection
Some features need to run in the page context (not content script context). We inject them:
```javascript
const script = document.createElement('script');
script.src = chrome.runtime.getURL('features/your-feature.js');
document.head.appendChild(script);
```

### Context Menu Visibility
Menus are shown/hidden based on URL patterns:
- Mantis bug pages show navigation menus
- Text with MITS_xxxxx shows "Go to MITS" option

## Extension Settings

Current configuration is in `settings.js`:
- `MANTIS_SERVER`: The Mantis bug tracker URL
- `MITS_PATTERN`: Regex for finding MITS numbers
- `NOTE_PATTERN`: Regex for extracting note IDs
- `VERSION_URL`: GitHub URL for version checking

## Browser Compatibility

This extension uses **Manifest V3** (required by Chrome):
- Uses service workers instead of background pages
- No persistent background state
- Modern Chrome extension APIs

## Need Help?

1. Check the Chrome Extensions documentation
2. Look at existing features for examples
3. Console logging is your friend - use `console.log()` to debug
4. Test changes by reloading the extension

## Architecture Notes

- **Simple over complex**: We use plain JavaScript, no frameworks
- **Clear naming**: Files and functions are named for what they do
- **Comments where needed**: Complex logic has explanations
- **Helpers for reuse**: Functions used in multiple places are in `helpers/`