const fs = require('fs');
const path = require('path');

/**
 * Get log file path for the plugin
 * @returns {string} Path to log file
 */
function getLogFilePath() {
  const logDir = path.join(
    process.env.HOME || process.env.USERPROFILE || process.cwd(),
    '.codex',
    'plugins',
    'custom-additional-context',
    'logs'
  );

  // Create log directory if it doesn't exist
  if (!fs.existsSync(logDir)) {
    try {
      fs.mkdirSync(logDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create log directory:', error.message);
      // Fallback to temp directory
      const tempDir = path.join(process.env.TEMP || process.env.TMP || '/tmp', 'custom-additional-context');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      return path.join(tempDir, 'log.txt');
    }
  }

  return path.join(logDir, 'log.txt');
}

/**
 * Write log entry with timestamp and result
 * @param {Object} result - The result object to log
 * @param {Object} input - The input object (optional, for context)
 */
function writeToLogFile(result, input = {}) {
  try {
    const logFilePath = getLogFilePath();
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      input: {
        conversationId: input.conversationId || 'unknown',
        messageId: input.messageId || 'unknown'
      },
      result: {
        hasContext: !!(result.hookSpecificOutput && result.hookSpecificOutput.additionalContext),
        contextLength:
          result.hookSpecificOutput && result.hookSpecificOutput.additionalContext
            ? result.hookSpecificOutput.additionalContext.length
            : 0
      }
    };

    const logLine = `${timestamp} | ${JSON.stringify(logEntry)}\n`;
    fs.appendFileSync(logFilePath, logLine, 'utf8');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
}

/**
 * Read JSON data from stdin
 */
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.on('data', chunk => {
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
      // Log that no context was found
      writeToLogFile({}, input);
      return;
    }

    // Return additional context response
    const result = {
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: customContext
      }
    };

    // 将当前时间和result写入log.txt日志文件
    writeToLogFile(result, input);

    console.log(JSON.stringify(result));
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({}));
    process.exit(1);
  }
}

main();
