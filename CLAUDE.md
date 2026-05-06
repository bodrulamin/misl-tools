# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MISL Tools is a Chrome extension (Manifest V3) that enhances the Mantis bug tracker experience with rich text editing, navigation shortcuts, and productivity features. The extension targets a specific Mantis installation at `http://192.168.1.126:1234/mantis/`.

## Installation & Development

### Load Extension for Development
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the project directory

### Testing Changes
- After making changes, go to `chrome://extensions/`
- Click the refresh icon on the MISL Tools extension card
- Reload any Mantis tabs to test content script changes
- For background/popup changes, click the extension icon to reload

### Version Management
- Update `version.json` in the root directory when releasing new versions
- The format is: `{"version": <number>, "releaseDate": "DD/MM/YYYY", "notes": "..."}`
- The popup checks GitHub for updates automatically

**See `DEVELOPMENT.md` for detailed development guide**

## Architecture

### File Structure (Refactored for Beginner-Friendliness)

```
misl-tools/
├── manifest.json           # Extension configuration
├── background.js           # Background service worker
├── content.js              # Injected into web pages
├── popup.html/js           # Extension popup interface
├── settings.js             # Configuration and constants
├── helpers/                # Shared utility functions
│   └── navigation.js       # Navigation functions
├── features/               # Feature scripts (conditionally loaded)
│   ├── load-features.js   # Feature loader
│   ├── rich-text.js       # TinyMCE editor (was init.tinymce.js)
│   ├── navigation-menu.js # Floating menu (was quick.menu.js)
│   ├── date-picker.js     # Date input (was date.input.js)
│   └── fix-html-tags.js   # HTML fixes (was fix-tags.js)
└── resources/              # External libraries
    ├── tinymce/           # TinyMCE editor
    └── icons/             # Extension icons
```

### Extension Structure

**Background Service Worker (`background.js`)**
- Manages context menus that are dynamically shown/hidden based on URL patterns
- Uses helper functions `showMantisMenus()` and `hideMantisMenus()` to reduce duplication
- Handles navigation commands (first/last note, MITS navigation)
- Key URL pattern: `/mantis/view.php?id=` enables Mantis-specific features

**Content Script (`content.js`)**
- Injects `features/load-features.js` into the page context
- Detects text selection to enable "Go to MITS" context menu
- Handles quick menu visibility toggling via message passing

**Feature Loader (`features/load-features.js`)**
Conditionally loads features based on current URL:
- **fix-html-tags.js**: Always loaded (fixes HTML tag issues)
- **rich-text.js**: Loaded on pages that need rich text editing
- **navigation-menu.js**: Loaded on bug view pages (`/view.php?id=`)
- **date-picker.js**: Loaded on bug update and report pages

### Key Features

**Rich Text Editor (`features/rich-text.js`)**
- Integrates TinyMCE editor (GPL license) into textareas
- Creates a modal dialog with TinyMCE instance
- Adds `[ ]` buttons to textareas that open the rich text editor
- Post-processes content to remove excessive newlines and clean up HTML

**Navigation Menu (`features/navigation-menu.js`)**
- Floating vertical menu on the right side of bug view pages
- Contains:
  - ↑ (First Note) - single click goes to first bugnote, double-click goes to page top
  - ↓ (Last Note) - scrolls to last bugnote
  - Open Bugs Count - displays count, cycles through open bugs on click
- Adds "Paste Note Id" buttons that appear on hover over note links
- Toggleable via extension popup (state stored in localStorage)

**Navigation Helper (`helpers/navigation.js`)**
- Shared navigation functions used by both background.js and navigation-menu.js
- Includes: `goToFirstNote()`, `goToLastNote()`, `pasteNoteId()`, `extractNoteId()`
- Reduces code duplication across the extension

**Context Menus**
- "Go to MITS_xxxxx" - appears when text containing MITS pattern is selected
- "First Note" / "Last Note" - visible on Mantis bug view pages
- "Paste Note Id" - appears on link context menu when viewing bugs

### Message Passing

The extension uses Chrome's message passing API extensively:

**From content.js to background.js:**
- `textSelection`: Sends selected text for MITS pattern detection
- `oncontextmenu`: Notifies of context menu open for URL-based menu toggling

**From background.js to content.js:**
- `action: 'show'/'hide'`: Controls quick menu visibility
- Used by popup toggle to show/hide the floating menu

### Configuration

**Settings File (`settings.js`)**
- Central location for all configuration constants
- Contains: `MANTIS_SERVER`, `MITS_PATTERN`, `NOTE_PATTERN`, `VERSION_URL`, `CURRENT_VERSION`
- Helper functions: `buildMantisUrl()`, `isMantisViewPage()`
- To change the Mantis server URL, edit the `MANTIS_SERVER` constant

### Storage

- **chrome.storage.local**: Stores `toggleState` for quick menu visibility preference
- **localStorage**: Stores `version` for update checks and `quickMenu` state per-page

## External Dependencies

- **TinyMCE**: Rich text editor (GPL licensed, bundled in `resources/tinymce/`)
- **No build process**: The extension uses vanilla JavaScript with no bundling or compilation

## Important Constraints

1. **Hardcoded Mantis URL**: The extension uses `http://192.168.1.126:1234/mantis/` - this internal IP should be made configurable for external users
2. **Manifest V3**: Uses service worker instead of background pages, no persistent background state
3. **Script Injection**: Uses `chrome.runtime.getURL()` to load scripts from web_accessible_resources
4. **DOM Manipulation**: Heavy reliance on querySelector and DOM manipulation - selectors depend on Mantis HTML structure (`.bugnote`, `.bugnote-public`, etc.)

## Common Patterns

### Adding New Features
To conditionally load a new script based on URL, add to `features/load-features.js`:

```javascript
if (window.location.href.includes('your-pattern')) {
    loadScript('features/your-feature.js');
}
```

### Adding Context Menu Items
1. Create menu in `background.js` `chrome.runtime.onInstalled` listener
2. Add visibility logic to `showMantisMenus()`/`hideMantisMenus()` helper functions
3. Handle clicks in `chrome.contextMenus.onClicked` listener

### Message Passing Pattern
```javascript
// Sender
chrome.runtime.sendMessage({type: 'yourType', data: yourData});

// Receiver (background.js or content.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'yourType') {
        // Handle message
    }
});
```