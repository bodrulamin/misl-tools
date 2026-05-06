// Feature loader - Conditionally loads features based on current page URL
// This script is injected into all pages and determines which features to load

var extensionUrl = document.getElementById('extension-url').innerHTML;

// Always load HTML tag fixes
loadScript('features/fix-html-tags.js');

// Load rich text editor on pages that need it
if (needEditor()) {
  loadScript('resources/tinymce/tinymce.min.js');
  loadScript('features/rich-text.js', 100);
}

// Load navigation menu on bug view pages
if (window.location.href.includes('/view.php?id=')) {
  loadScript('features/navigation-menu.js');
}

// Load date picker on bug update and report pages
if (window.location.href.includes('bug_update_page.php') ||
    window.location.href.includes('bug_report_page.php')) {
  loadScript('features/date-picker.js');
}

/**
 * Check if current page needs the rich text editor
 * @returns {boolean} True if page needs editor
 */
function needEditor() {
  return window.location.href.includes('/view.php?id=') ||
         window.location.href.includes('bugnote_edit_page.php') ||
         window.location.href.includes('bug_update_page.php') ||
         window.location.href.includes('bug_report_page.php');
}

/**
 * Load a script file with optional delay
 * @param {string} relativeUrl - Path to script file relative to extension URL
 * @param {number} delay - Delay in milliseconds before loading (default: 0)
 */
function loadScript(relativeUrl, delay = 0) {
  setTimeout(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = extensionUrl + relativeUrl;
    (document.head || document.documentElement).appendChild(script);
  }, delay);
}