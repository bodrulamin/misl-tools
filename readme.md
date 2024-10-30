This is the firefox version of the famous [MISL Tools](https://chromewebstore.google.com/detail/misl-tools/epcalnjfdoicbkphoaabdjifgbjinjno) chrome extension by [Bodrul Amin](https://github.com/bodrulamin). The firefox version has not been reviewed as of 2024-10-29.

## Features:

- Rich Text Editor: Available in all text areas.
- Quick Navigation: Move easily to the first and last note with a quick menu.
- Context Menu Navigation: Jump to the first or last note directly from the context menu.
- Open Bugs Count: View the current number of open bugs and quickly navigate to the next one.
- Paste Note ID Button: Hover over note IDs to quickly paste them.
- Go to MITS: Right-click on selected text containing MITS_xxxxx (from GitLab) to directly navigate to the corresponding MITS entry.
- MITS Number Search: Use the extension's popup to search for specific MITS numbers.
- Double Click to Go to Top of the Page  




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

Currently the only way to install the extension is to clone the repository, make a zip file out of the files in the repository and using the install from zip feature of firefox.

1. Enter `about:addons` in the location bar
2. Go to `Extensions`
3. Click on the cog icon at the right of `Manage Your Extensions`
4. Select `Install Add-on From File...`
5. Select the zip file using the filepicker

