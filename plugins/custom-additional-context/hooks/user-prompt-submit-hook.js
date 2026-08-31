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
    'plugins-config',
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
 * @param {string} result - The result object to log
 * @param {Object} input - The input object (optional, for context)
 */
function writeToLogFile(result, input = {}) {
  try {
    const logFilePath = getLogFilePath();
    const timestamp = new Date().toISOString();

    const logLine = `${timestamp} | ${result}\n`;
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
    // Read hook input
    const input = await readStdin();

    // Get custom context from cac.md file
    const customContext = getCustomContextFromFile();

    // If no custom context, return empty object
    if (!customContext.trim()) {
      console.log(JSON.stringify({}));
      // Log that no context was found
      writeToLogFile('', input);
      return;
    }

    // 将当前时间和result写入log.txt日志文件
    writeToLogFile(customContext, input);

    console.log(customContext);
  } catch (error) {
    console.error('Hook error:', error.message);
    console.log(JSON.stringify({}));
    process.exit(1);
  }
}

main();
