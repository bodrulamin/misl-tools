// Extension settings and constants
// To use a different Mantis server, change MANTIS_SERVER

const SETTINGS = {
  // Mantis server configuration
  MANTIS_SERVER: 'http://192.168.1.126:1234/mantis/',

  // Regex patterns for detecting MITS numbers and note IDs
  MITS_PATTERN: /MITS_(\d+)/gi,
  NOTE_PATTERN: /#c(\d+)$/,

  // Version check URL
  VERSION_URL: 'https://raw.githubusercontent.com/bodrulamin/misl-tools/master/version.json',

  // Current extension version
  CURRENT_VERSION: 12
};

// Helper function to build Mantis URLs
function buildMantisUrl(path) {
  return SETTINGS.MANTIS_SERVER + path;
}

// Helper function to check if URL is a Mantis bug view page
function isMantisViewPage(url) {
  return url.includes('/mantis/view.php?id=');
}