const fs = require('fs');
const path = require('path');

/**
 * Read custom context from local cac.md file
 * @returns {string} The custom additional context text from cac.md
 */
function getCustomContextFromFile() {
  // Read cac.md from the plugin configuration directory
  const configDir = path.join(
    process.env.HOME || process.env.USERPROFILE || process.cwd(),
    '.codex',
    'plugins-config',
    'custom-additional-context'
  );
  const cacMdPath = path.join(configDir, 'cac.md');

  if (fs.existsSync(cacMdPath)) {
    try {
      const content = fs.readFileSync(cacMdPath, 'utf8');
      return content.trim();
    } catch (e) {
      console.error(`Failed to read cac.md from ${cacMdPath}:`, e.message);
    }
  }

  return '';
}

async function main() {
  try {
    // Get custom context from cac.md file
    const customContext = getCustomContextFromFile();

    // If no custom context, return empty object
    if (!customContext.trim()) {
      console.log('');
      return;
    }

    console.log(customContext);
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({}));
    process.exit(1);
  }
}

main();
