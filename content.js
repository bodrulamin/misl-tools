// Inject the feature loader when content script loads
injectScriptLoader();

// Listen for text selection to enable MITS navigation context menu
document.addEventListener('mouseup', detectTextSelection);

// Listen for context menu to show/hide note ID paste option
document.addEventListener('oncontextmenu', onContextMenuOpen);

/**
 * Inject the feature loader script into the page
 * This allows us to conditionally load features based on the current URL
 */
function injectScriptLoader() {
    let script = document.createElement('script');
    script.type = "text/javascript"
    script.id = 'extension-url';
    script.innerHTML= chrome.runtime.getURL('');
    script.src = chrome.runtime.getURL('features/load-features.js');
    script.onload = () => {
    };
    (document.head || document.documentElement).appendChild(script);
}

/**
 * Detect when user selects text and send to background script
 * Used to show "Go to MITS_xxxxx" context menu option
 */
function detectTextSelection() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: 'textSelection',
            data: selectedText
        });
    }
}

/**
 * Handle context menu open event
 * Sends URL to background script to determine which context menu items to show
 */
function onContextMenuOpen() {
    chrome.runtime.sendMessage({
        type: 'oncontextmenu',
        data: window.location.href
    });
}


/**
 * Handle messages from background script and popup
 * Currently handles showing/hiding the quick navigation menu
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'hide') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display = 'none';
            localStorage.setItem("quickMenu", 'hide');
        }
    }

    if (request.action === 'show') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display = 'flex';
            localStorage.setItem("quickMenu", 'show');
        }
    }
});