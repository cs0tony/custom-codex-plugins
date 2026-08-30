# Custom Additional Context Plugin - Usage Guide

## Quick Start

1. **Install the plugin**:
   ```bash
   codex plugin add custom-additional-context@custom-codex-plugins
   ```

2. **Configure in Codex UI**:
   - Open Codex settings
   - Find "Custom Additional Context" in plugins
   - Enter your custom context in the settings field
   - Save

3. **Use immediately**:
   - Start a conversation in Codex
   - Your custom context will be automatically injected

## Configuration Storage

The plugin settings are automatically managed by Codex and stored in:

**Windows**: `%USERPROFILE%\.codex\plugins\custom-additional-context\settings.json`
**Mac/Linux**: `~/.codex/plugins/custom-additional-context/settings.json`

Example settings file:
```json
{
  "additionalContext": "You are a senior software engineer with 10+ years of experience. Focus on best practices, clean code, and maintainability."
}
```

## How It Works

1. **User sends message** → UserPromptSubmit hook is triggered
2. **Hook reads settings** → From Codex plugin configuration
3. **Context is injected** → As additionalContext in the response
4. **AI receives** → Your custom context + original message

## Setting Locations (Priority Order)

The hook script searches for settings in this order:

1. **Environment Variable**: `CODEX_PLUGIN_SETTINGS` (JSON format)
2. **Plugin Settings File**: `~/.codex/plugins/custom-additional-context/settings.json`
3. **Global Plugin Settings**: `~/.codex/plugins/settings.json`

## Example Contexts

### Developer Expert
```
You are an expert software developer. Always provide practical, working code examples and explain technical concepts clearly. Include error handling and best practices.
```

### Technical Writer
```
You are a technical documentation specialist. Write clear, concise, and well-structured explanations. Use examples and diagrams when appropriate.
```

### Security Analyst
```
Always consider security implications. Validate user inputs, sanitize outputs, and follow OWASP security guidelines. Explain any security trade-offs.
```

## Troubleshooting

### Context Not Working?
1. Check plugin is installed: `codex plugin list`
2. Verify settings in Codex UI
3. Check Codex logs for errors
4. Run test: `node scripts/test.js`

### Settings Not Saving?
1. Check file permissions
2. Verify disk space
3. Ensure settings.json is valid JSON

## Testing

Run the test script to verify plugin functionality:
```bash
cd plugins/custom-additional-context
node scripts/test.js
```

## Technical Details

- **Hook Type**: `UserPromptSubmit`
- **Context Limit**: 5000 characters
- **Timeout**: 30 seconds
- **Error Handling**: Graceful fallback with logging
- **Configuration**: Automatic via Codex UI

## Advantages Over Previous Version

✅ No manual file configuration needed
✅ Works with Codex settings system
✅ Real-time configuration updates
✅ Better error handling
✅ Cleaner plugin structure
✅ Standard Codex hook format
