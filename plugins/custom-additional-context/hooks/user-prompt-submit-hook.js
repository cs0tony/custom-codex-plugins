const fs = require('fs');
const path = require('path');

/**
 * Read JSON data from stdin
 */
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch (e) {
        resolve({});
      }
    });
    process.stdin.on('error', reject);
  });
}

/**
 * Read plugin settings from Codex configuration
 * @returns {string} The custom additional context text
 */
function getPluginSettings() {
  // Method 1: Try environment variable
  if (process.env.CODEX_PLUGIN_SETTINGS) {
    try {
      const settings = JSON.parse(process.env.CODEX_PLUGIN_SETTINGS);
      if (settings.additionalContext) {
        return settings.additionalContext;
      }
    } catch (e) {
      console.error('Failed to parse CODEX_PLUGIN_SETTINGS:', e.message);
    }
  }

  // Method 2: Try plugin-specific settings file
  const pluginName = 'custom-additional-context';
  const settingsDir = path.join(
    process.env.HOME || process.env.USERPROFILE || process.cwd(),
    '.codex',
    'plugins',
    pluginName,
    'settings.json'
  );
  
  if (fs.existsSync(settingsDir)) {
    try {
      const settings = JSON.parse(fs.readFileSync(settingsDir, 'utf8'));
      if (settings.additionalContext) {
        return settings.additionalContext;
      }
    } catch (e) {
      console.error(`Failed to read plugin settings from ${settingsDir}:`, e.message);
    }
  }

  // Method 3: Try global plugin settings
  const globalSettingsPath = path.join(
    process.env.HOME || process.env.USERPROFILE || process.cwd(),
    '.codex',
    'plugins',
    'settings.json'
  );
  
  if (fs.existsSync(globalSettingsPath)) {
    try {
      const globalSettings = JSON.parse(fs.readFileSync(globalSettingsPath, 'utf8'));
      if (globalSettings[pluginName] && globalSettings[pluginName].additionalContext) {
        return globalSettings[pluginName].additionalContext;
      }
    } catch (e) {
      console.error(`Failed to read global plugin settings from ${globalSettingsPath}:`, e.message);
    }
  }

  return '';
}

async function main() {
  try {
    // Read hook input
    const input = await readStdin();
    
    // Get plugin settings
    const customContext = getPluginSettings();
    
    // If no custom context, return empty object
    if (!customContext.trim()) {
      console.log(JSON.stringify({}));
      return;
    }
    
    // Return additional context response
    const result = {
      additionalContext: customContext
    };
    
    console.log(JSON.stringify(result));
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({}));
    process.exit(1);
  }
}

main();
