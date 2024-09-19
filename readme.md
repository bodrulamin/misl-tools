
## Features:

- Rich Text Editor: Available in all text areas.
- Quick Navigation: Move easily to the first and last note with a quick menu.
- Context Menu Navigation: Jump to the first or last note directly from the context menu.
- Open Bugs Count: View the current number of open bugs and quickly navigate to the next one.
- Paste Note ID Button: Hover over note IDs to quickly paste them.
- Go to MITS: Right-click on selected text containing MITS_xxxxx (from GitLab) to directly navigate to the corresponding MITS entry.
- MITS Number Search: Use the extension's popup to search for specific MITS numbers.



## folder structure
```
my-extension/
│
├── manifest.json          # Required manifest file for extension configuration
├── background.js          # Optional: Background script to handle background tasks
├── content.js             # Optional: Content script to interact with web pages
├── popup.html             # Optional: HTML file for the popup window
├── popup.js               # Optional: JavaScript for handling popup logic
├── popup.css              # Optional: Styling for the popup window
├── options.html           # Optional: HTML file for the options/settings page
├── options.js             # Optional: JavaScript for handling options page logic
├── options.css            # Optional: Styling for the options/settings page
├── icons/                 # Folder to store icon images
│   ├── icon16.png         # Icon for the extension (16x16)
│   ├── icon48.png         # Icon for the extension (48x48)
│   └── icon128.png        # Icon for the extension (128x128)
└── assets/                # Folder for other assets like images, fonts, etc.
```


## How to install

1. Chrome webstore
2. Packed extension file (deprecated)
2. Manual Developer mode install

