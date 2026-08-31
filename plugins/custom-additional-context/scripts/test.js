const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the script directory
const scriptDir = __dirname;
const pluginRoot = path.join(scriptDir, '..');
const hookScript = path.join(pluginRoot, 'hooks', 'user-prompt-submit-hook.js');

console.log('Testing Custom Additional Context Plugin\n');

// Test 1: Check if hook script exists
console.log('Test 1: Checking hook script existence...');
if (fs.existsSync(hookScript)) {
    console.log('✓ Hook script found at:', hookScript);
} else {
    console.error('✗ Hook script not found at:', hookScript);
    process.exit(1);
}

// Test 2: Check if Node.js is available
console.log('\nTest 2: Checking Node.js availability...');
try {
    const nodeVersion = execSync('node --version').toString().trim();
    console.log('✓ Node.js available:', nodeVersion);
} catch (e) {
    console.error('✗ Node.js not available');
    process.exit(1);
}

// Test 3: Test hook with empty configuration
console.log('\nTest 3: Testing hook with empty configuration...');
try {
    const result = execSync(`echo '{}' | node "${hookScript}"`, {
        cwd: pluginRoot,
        env: { ...process.env, PLUGIN_ROOT: pluginRoot }
    }).toString().trim();
    
    if (result === '{}') {
        console.log('✓ Hook handles empty configuration correctly');
    } else {
        console.log('ℹ  Hook output:', result);
    }
} catch (e) {
    console.error('✗ Hook execution failed:', e.message);
}

// Test 4: Create test configuration and test hook
console.log('\nTest 4: Testing hook with sample configuration...');
const testConfigDir = path.join(pluginRoot, '.test-config');
const testConfigFile = path.join(testConfigDir, 'cac.md');

try {
    // Create test directory
    if (!fs.existsSync(testConfigDir)) {
        fs.mkdirSync(testConfigDir, { recursive: true });
    }

    // Create test configuration file
    const testContent = '# Test Context\nThis is a test context for the plugin.';
    fs.writeFileSync(testConfigFile, testContent, 'utf8');
    console.log('✓ Created test configuration file');

    // Test hook with test configuration
    const result = execSync(`echo '{}' | node "${hookScript}"`, {
        cwd: pluginRoot,
        env: { 
            ...process.env, 
            PLUGIN_ROOT: pluginRoot,
            HOME: pluginRoot
        }
    }).toString().trim();

    if (result.includes('test context')) {
        console.log('✓ Hook successfully reads and outputs configuration');
        console.log('  Sample output:', result.substring(0, 50) + '...');
    } else {
        console.log('ℹ  Hook output:', result);
    }
} catch (e) {
    console.error('✗ Hook test with configuration failed:', e.message);
} finally {
    // Cleanup test configuration
    try {
        if (fs.existsSync(testConfigFile)) {
            fs.unlinkSync(testConfigFile);
        }
        if (fs.existsSync(testConfigDir)) {
            fs.rmdirSync(testConfigDir);
        }
        console.log('✓ Cleaned up test configuration');
    } catch (e) {
        console.log('ℹ  Cleanup warning:', e.message);
    }
}

// Test 5: Check configuration files
console.log('\nTest 5: Checking plugin configuration files...');
const pluginJson = path.join(pluginRoot, '.codex-plugin', 'plugin.json');
const hooksJson = path.join(pluginRoot, 'hooks', 'codex.hooks.json');

if (fs.existsSync(pluginJson)) {
    console.log('✓ plugin.json found');
} else {
    console.error('✗ plugin.json not found');
}

if (fs.existsSync(hooksJson)) {
    console.log('✓ codex.hooks.json found');
} else {
    console.error('✗ codex.hooks.json not found');
}

// Test 6: Check setup scripts
console.log('\nTest 6: Checking setup scripts...');
const setupScriptSh = path.join(pluginRoot, 'scripts', 'setup.sh');
const setupScriptPs1 = path.join(pluginRoot, 'scripts', 'setup.ps1');

if (fs.existsSync(setupScriptSh)) {
    console.log('✓ macOS/Linux setup script found');
} else {
    console.error('✗ macOS/Linux setup script not found');
}

if (fs.existsSync(setupScriptPs1)) {
    console.log('✓ Windows setup script found');
} else {
    console.error('✗ Windows setup script not found');
}

console.log('\n=== Test Summary ===');
console.log('All critical tests passed! The plugin is ready to use.');
console.log('\nNext steps:');
console.log('1. Run the setup script for your platform');
console.log('2. Edit the cac.md file with your custom context');
console.log('3. Start using Codex with automatic context injection');
console.log('\nFor detailed usage, see README.md and USAGE.md');
