# Custom Additional Context Plugin

This plugin automatically injects custom additional context into each conversation using the UserPromptSubmit hook. The context is read from a `cac.md` file in your configuration directory.

## Features

- ✅ Automatically injects custom additional context before each user message
- ✅ Simple file-based configuration using Markdown
- ✅ Easy to edit and update context
- ✅ Supports multi-line formatting and rich content
- ✅ Cross-platform support (Windows, macOS, Linux)
- ✅ Graceful error handling with detailed logging

## Installation

This plugin is available in the custom-codex-plugins marketplace. To install it:

```bash
codex plugin add custom-additional-context@custom-codex-plugins
```

## Quick Setup

### One-Command Setup

Choose the command based on your operating system:

#### macOS/Linux (Bash/Zsh)
```bash
# Run the setup script
bash ~/.codex/plugins/custom-additional-context/scripts/setup.sh

# Or manually create the directory and file
mkdir -p ~/.codex/plugins-config/custom-additional-context && touch ~/.codex/plugins-config/custom-additional-context/cac.md
```

#### Windows (PowerShell)
```powershell
# Run the setup script
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.codex\plugins\custom-additional-context\scripts\setup.ps1"

# Or manually create the directory and file
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\plugins-config\custom-additional-context"
New-Item -ItemType File -Path "$env:USERPROFILE\.codex\plugins-config\custom-additional-context\cac.md" -Force
```

#### Windows (CMD)
```cmd
mkdir "%USERPROFILE%\.codex\plugins-config\custom-additional-context" 2>nul
type nul > "%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md"
```

## Configuration

### Editing Your Context

After running the setup script, edit the `cac.md` file at:

- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md`
- **Mac/Linux**: `~/.codex/plugins-config/custom-additional-context/cac.md`

### Example Context

Here's an example `cac.md` file:

```markdown
# Custom Additional Context

You are a senior software engineer with 10+ years of experience. When writing code:

- Always include proper error handling
- Write clean, maintainable code with clear variable names
- Add comments for complex logic
- Consider performance implications
- Follow security best practices

## Code Style
- Use meaningful variable and function names
- Keep functions focused and single-purpose
- Include unit tests when appropriate

## Communication Style
- Be concise but thorough
- Provide examples when helpful
- Explain trade-offs of different approaches
```

### Update Context in Real-Time

Simply edit the `cac.md` file and save it. The plugin will automatically read the updated content in your next conversation.

## How It Works

1. When you send a message in Codex, the UserPromptSubmit hook is triggered
2. The plugin reads the `cac.md` file from your configuration directory
3. The content of `cac.md` is injected as additional context along with your message
4. The AI receives your custom context and your message together

## Technical Details

### Configuration File Location

The plugin looks for `cac.md` in:
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md`
- **Mac/Linux**: `~/.codex/plugins-config/custom-additional-context/cac.md`

### Hook Configuration

- **Hook Type**: `UserPromptSubmit`
- **Context Limit**: 5000 characters
- **File Format**: Markdown (any text format works)
- **Error Handling**: Graceful fallback with detailed error logging

### Logging

The plugin maintains a log file at:
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\logs\log.txt`
- **Mac/Linux**: `~/.codex/plugins-config/custom-additional-context/logs/log.txt`

Logs include:
- Timestamp of each hook execution
- Context that was injected
- Error messages if any issues occur

## Troubleshooting

### Context Not Being Injected

1. **Verify Configuration File**:
   ```bash
   # Check if cac.md exists
   ls ~/.codex/plugins-config/custom-additional-context/cac.md
   # Windows
   dir "%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md"
   ```

2. **Check Plugin Installation**: 
   ```bash
   codex plugin list
   ```
   Check that `custom-additional-context` is listed

3. **Review Logs**: 
   - Check the log file for error messages
   - Verify the file path is correct

4. **Test Manually**: 
   ```bash
   # Test the hook script
   echo '{}' | node ~/.codex/plugins/custom-additional-context/hooks/user-prompt-submit-hook.js
   ```

### Setup Script Issues

1. **Permission Errors**: Ensure you have write permissions to your home directory
2. **Missing Dependencies**: Verify Node.js is installed and accessible
3. **Path Issues**: Check that the Codex plugins directory exists

## Advanced Usage

### Dynamic Context Updates

The plugin reads the `cac.md` file each time the hook is triggered, so you can:
- Update context in real-time by editing the file
- Use version control to manage different context configurations
- Create different context files for different use cases

### Multi-Line Formatting

Since the context file is Markdown, you can use:
- Headers for organization
- Lists for guidelines
- Code blocks for examples
- Links to external resources

### Context Length Management

If your context exceeds the 5000 character limit:
- Split into multiple focused sections
- Use concise language
- Remove redundant information
- Prioritize the most important guidelines

## Development

### Testing the Hook

```bash
# Test with empty input
echo '{}' | node hooks/user-prompt-submit-hook.js

# Test with sample input
echo '{"userMessage":"test"}' | node hooks/user-prompt-submit-hook.js
```

### File Structure

```
custom-additional-context/
├── .codex-plugin/
│   └── plugin.json          # Plugin manifest
├── hooks/
│   ├── codex.hooks.json     # Hook configuration
│   └── user-prompt-submit-hook.js  # Main hook script
├── scripts/
│   ├── setup.sh            # macOS/Linux setup script
│   └── setup.ps1           # Windows setup script
├── README.md               # This file
├── USAGE.md               # Usage examples
└── LICENSE                # MIT License
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across platforms
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

Tony - GitHub: @gh-cs0tony

## Changelog

### Version 2.0.0
- Changed from plugin settings to file-based configuration
- Configuration file location: `~/.codex/plugins-config/custom-additional-context/cac.md`
- Added cross-platform setup scripts
- Removed dependency on Codex settings system
- Simplified configuration process
- Enhanced documentation with platform-specific commands
- Improved error handling and logging

### Version 1.0.1
- Initial release with plugin settings configuration

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the log file for error messages
3. Open an issue in the repository
