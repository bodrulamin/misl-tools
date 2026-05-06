// Popup initialization and event handlers
document.addEventListener('DOMContentLoaded', function () {
    initQuickMenuToggle();
    initMITSButton();
    checkForUpdates();
});

/**
 * Initialize the quick menu toggle switch
 * Loads saved state and updates UI when toggle is changed
 */
function initQuickMenuToggle() {
    const toggle = document.getElementById('quickMenutoggle');

    chrome.storage.local.get('toggleState', function (data) {
        // Default to true if not set
        const toggleState = data.toggleState !== false;
        toggle.checked = toggleState;
        updateQuickMenu(toggleState);
    });

    toggle.addEventListener('change', function () {
        chrome.storage.local.set({ 'toggleState': toggle.checked });
        updateQuickMenu(toggle.checked);
    });
}

/**
 * Update the quick menu visibility on the current page
 * @param {boolean} show - Whether to show or hide the menu
 */
function updateQuickMenu(show) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: show ? 'show' : 'hide',
            elementId: 'quickMenu'
        });
    });
}

/**
 * Initialize the MITS number search button and input field
 * Handles Enter key press and button click
 */
function initMITSButton() {
    const button = document.getElementById('gotoMITSBtn');
    const input = document.getElementById('mitsNumberInput');

    // Handle Enter key in input field
    input.onkeydown = function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            gotoMITS();
            event.preventDefault();
        }
    };

    // Handle button click
    button.onclick = gotoMITS;
}

/**
 * Navigate to a MITS bug entry
 * Gets the MITS number from the input field and opens it in a new tab
 */
function gotoMITS() {
    const input = document.getElementById('mitsNumberInput');
    const mitsNumber = input.value.trim();
    if (!mitsNumber) return;

    const url = `http://192.168.1.126:1234/mantis/view.php?id=${mitsNumber}`;
    chrome.tabs.create({ url: url });
}

/**
 * Check for extension updates
 * Compares local version with version on GitHub
 */
function checkForUpdates() {
    const currentVersion = 13;
    localStorage.setItem("version", currentVersion);

    const url = 'https://raw.githubusercontent.com/bodrulamin/misl-tools/master/version.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (currentVersion < data.version) {
                var updateAlert = document.getElementById('updateAlert');
                updateAlert.classList.remove('d-none');
                updateAlert.classList.add('d-block');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
