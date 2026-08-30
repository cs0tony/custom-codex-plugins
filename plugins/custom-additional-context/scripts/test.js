// Test script for custom-additional-context plugin

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

console.log('Testing Custom Additional Context Plugin...\n');

// Test 1: Check plugin structure
console.log('1. Checking plugin structure...');
const pluginDir = path.join(__dirname, '..');
const requiredFiles = [
  '.codex-plugin/plugin.json',
  '.codex-plugin/config.json',
  'hooks/hooks.json',
  'hooks/user-prompt-submit-hook.js',
];

for (const file of requiredFiles) {
  const filePath = path.join(pluginDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} missing`);
  }
}

// Test 2: Validate plugin.json
console.log('\n2. Validating plugin.json...');
try {
  const pluginJson = JSON.parse(fs.readFileSync(
    path.join(pluginDir, '.codex-plugin/plugin.json'),
    'utf8'
  ));
  console.log(`  ✅ Plugin name: ${pluginJson.name}`);
  console.log(`  ✅ Version: ${pluginJson.version}`);
  console.log(`  ✅ Display name: ${pluginJson.interface.displayName}`);
  
  // Check settings definition
  if (pluginJson.settings && pluginJson.settings.additionalContext) {
    console.log(`  ✅ Settings defined for: additionalContext`);
  } else {
    console.log(`  ❌ Settings not properly defined`);
  }
} catch (error) {
  console.log(`  ❌ Invalid plugin.json: ${error.message}`);
}

// Test 3: Validate hooks.json
console.log('\n3. Validating hooks.json...');
try {
  const hooksJson = JSON.parse(fs.readFileSync(
    path.join(pluginDir, 'hooks/hooks.json'),
    'utf8'
  ));
  console.log(`  ✅ Hooks defined for: ${Object.keys(hooksJson.hooks).join(', ')}`);
  
  // Check hook configuration
  const userPromptHook = hooksJson.hooks.UserPromptSubmit?.[0]?.hooks?.[0];
  if (userPromptHook) {
    console.log(`  ✅ Hook type: ${userPromptHook.type}`);
    console.log(`  ✅ Command: ${userPromptHook.command}`);
    console.log(`  ✅ Timeout: ${userPromptHook.timeout}s`);
    console.log(`  ✅ Context limit: ${userPromptHook.additionalContextLimit} characters`);
  }
} catch (error) {
  console.log(`  ❌ Invalid hooks.json: ${error.message}`);
}

// Test 4: Check hook script
console.log('\n4. Checking hook script...');
const hookScript = path.join(pluginDir, 'hooks/user-prompt-submit-hook.js');
if (fs.existsSync(hookScript)) {
  const content = fs.readFileSync(hookScript, 'utf8');
  console.log(`  ✅ Hook script exists (${content.length} bytes)`);
  console.log(`  ✅ Contains readStdin function: ${content.includes('readStdin')}`);
  console.log(`  ✅ Contains getPluginSettings function: ${content.includes('getPluginSettings')}`);
  console.log(`  ✅ Returns additionalContext: ${content.includes('additionalContext')}`);
}

// Test 5: Check for .codex directory (should NOT exist in plugin)
console.log('\n5. Checking plugin directory structure...');
const codexDir = path.join(pluginDir, '.codex');
if (!fs.existsSync(codexDir)) {
  console.log(`  ✅ .codex directory correctly absent`);
} else {
  console.log(`  ❌ .codex directory should not exist in plugin directory`);
}

// Test 6: Simulate hook execution
console.log('\n6. Testing hook execution (simulation)...');
try {
  // Set test environment
  const testSettings = {
    additionalContext: 'You are a test AI assistant for testing purposes.'
  };
  
  process.env.CODEX_PLUGIN_SETTINGS = JSON.stringify(testSettings);
  
  // Simulate hook input
  const mockInput = JSON.stringify({
    conversationId: 'test-123',
    messageId: 'msg-456'
  });
  
  console.log(`  ✅ Test settings set: ${testSettings.additionalContext}`);
  console.log(`  ✅ Mock input prepared`);
  console.log(`  ℹ️  Run actual hook test with: echo '${mockInput}' | node ${hookScript}`);
  
} catch (error) {
  console.log(`  ❌ Hook test simulation failed: ${error.message}`);
}

console.log('\n✅ All basic tests completed!');
console.log('\nNext steps:');
console.log('1. Install the plugin: codex plugin add custom-additional-context@custom-codex-plugins');
console.log('2. Configure settings in Codex UI');
console.log('3. Test by sending a message in Codex');
