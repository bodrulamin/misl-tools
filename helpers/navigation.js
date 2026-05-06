// Navigation helper functions
// These functions are used in multiple places (background.js and quick.menu.js)

/**
 * Scroll to the first bugnote on the page
 */
function goToFirstNote() {
  const notes = document.querySelectorAll('.bugnote');
  if (notes[0]) {
    notes[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Scroll to the last bugnote on the page
 * Note: We use [length - 2] because the last element is the "add note" form, not a real note
 */
function goToLastNote() {
  const notes = document.querySelectorAll('.bugnote');
  const lastNoteIndex = notes.length - 2; // Skip the "add note" form
  if (notes[lastNoteIndex]) {
    notes[lastNoteIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Paste a note ID into the textarea
 * @param {string} noteId - The note ID to paste
 * @param {HTMLElement} textarea - The textarea element
 */
function pasteNoteId(noteId, textarea) {
  textarea.value += ' ~' + noteId;
}

/**
 * Extract note ID from a link URL
 * @param {string} linkUrl - The link URL (e.g., "...view.php?id=123#c456")
 * @returns {string} The note ID (e.g., "~456") or empty string
 */
function extractNoteId(linkUrl) {
  const match = linkUrl.match(/#c(\d+)$/);
  return match ? '~' + match[1] : '';
}