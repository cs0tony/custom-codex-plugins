# Custom Additional Context Plugin

This plugin automatically injects custom additional context into each conversation using the UserPromptSubmit hook. This allows you to add custom instructions or context that will be available to the AI in every conversation.

## Features

- ✅ Automatically injects custom additional context before each user message
- ✅ Works with Codex plugin settings system
- ✅ No manual file configuration required
- ✅ Easy to use through Codex UI
- ✅ Real-time context updates

## Installation

This plugin is available in the custom-codex-plugins marketplace. To install it:

```bash
codex plugin add custom-additional-context@custom-codex-plugins
```

## Configuration

### Using Codex UI

1. After installing the plugin, go to Codex settings
2. Find "Custom Additional Context" in the plugins section
3. Enter your custom context in the "Additional Context" field
4. Save your settings

### Example Context

Here are some useful example contexts:

#### Developer Persona
```
You are a senior software engineer with 10+ years of experience. Focus on best practices, clean code, and maintainability. Always include error handling and edge cases in your solutions.
```

#### Technical Writer Persona
```
You are a technical documentation specialist. Write clear, concise, and well-structured explanations. Use examples and diagrams when appropriate.
```

#### Team Guidelines
```
Follow our team's coding standards: use TypeScript, prefer functional programming, include JSDoc comments, and always write unit tests with Jest.
```

#### Security Focus
```
Always consider security implications. Validate user inputs, sanitize outputs, and follow OWASP security guidelines. Explain any security trade-offs.
```

## How It Works

1. When you send a message in Codex, the UserPromptSubmit hook is triggered
2. The plugin retrieves your custom context from the plugin settings
3. The custom context is injected as additional context along with your message
4. The AI receives your custom context and your message together

## Technical Details

### Settings Storage

The plugin settings are stored by Codex in the following locations:
- **Windows**: `%USERPROFILE%\.codex\plugins\custom-additional-context\settings.json`
- **Mac/Linux**: `~/.codex/plugins/custom-additional-context/settings.json`

### Hook Mechanism

- **Hook Type**: `UserPromptSubmit`
- **Context Limit**: 5000 characters
- **Settings Access**: Reads from Codex plugin settings system
- **Error Handling**: Graceful fallback with detailed error logging

### Hook Script Behavior

The hook script attempts to read settings in this order:
1. Environment variable `CODEX_PLUGIN_SETTINGS`
2. Plugin-specific settings file
3. Global plugin settings file
4. Returns empty string if no settings found

## Troubleshooting

### Context Not Being Injected

1. **Verify Plugin Installation**: 
   ```bash
   codex plugin list
   ```
   Check that `custom-additional-context` is listed

2. **Check Settings**: 
   - Open Codex settings
   - Verify that your custom context is entered and saved

3. **Check Hook Registration**: 
   - Look for hook error messages in Codex logs
   - Verify the hook script is executable

4. **Manual Testing**: 
   ```bash
   cd plugins/custom-additional-context
   node scripts/test.js
   ```

### Settings Not Saving

1. **Permissions**: Ensure Codex has write access to the settings directory
2. **Disk Space**: Check available disk space
3. **File Format**: Ensure settings file is valid JSON

## Advanced Usage

### Dynamic Context

You can update your context in real-time:
1. Open Codex settings
2. Modify the "Additional Context" field
3. Save your changes
4. The updated context will be used in the next message

### Project-Specific Context (Future)

The plugin may be enhanced to support project-specific contexts in future versions, allowing different contexts for different projects.

## Development

### Testing the Hook

Run the test script to verify basic functionality:

```bash
cd plugins/custom-additional-context
node scripts/test.js
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

Tony - GitHub: @gh-cs0tony

## Changelog

### Version 2.0.0
- Renamed from "hook-based-prompt-injector" to "custom-additional-context"
- Removed manual file-based configuration
- Integrated with Codex plugin settings system
- Improved error handling and logging
- Updated to use standard Codex hooks format
- Increased additional context limit to 5000 characters
- Enhanced documentation and examples

### Version 1.0.1
- Initial release with basic functionality

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Codex logs for error messages
3. Open an issue in the repository
