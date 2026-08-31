# Quick Usage Guide

## Setup (One Minute)

### macOS/Linux
```bash
bash ~/.codex/plugins/custom-additional-context/scripts/setup.sh
```

### Windows PowerShell
```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.codex\plugins\custom-additional-context\scripts\setup.ps1"
```

## Configuration

### Edit Your Context File

Edit the file that was created during setup:

- **macOS/Linux**: `~/.codex/plugins-config/custom-additional-context/cac.md`
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md`

### Example Content

```markdown
You are a senior developer. Always:
- Write clean, maintainable code
- Include error handling
- Add helpful comments
- Consider edge cases
```

## Verification

### Test the Plugin

1. Save your context file
2. Start a new Codex conversation
3. Send any message
4. The plugin will automatically inject your context

### Check Logs

If something isn't working, check the logs:

- **macOS/Linux**: `~/.codex/plugins-config/custom-additional-context/logs/log.txt`
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\logs\log.txt`

## Common Use Cases

### Development Context
```markdown
# Development Guidelines
- Use TypeScript with strict mode
- Follow SOLID principles
- Write unit tests for all functions
- Document complex algorithms
```

### Writing Style
```markdown
# Writing Style
- Be concise and clear
- Use active voice
- Include examples
- Structure with headers
```

### Team Standards
```markdown
# Team Standards
- Use our company's coding conventions
- Follow security guidelines
- Include proper error messages
- Document API changes
```

## Troubleshooting

### Context Not Appearing
1. Check that `cac.md` exists in the correct location
2. Verify the file is not empty
3. Check the log file for errors
4. Restart Codex if needed

### File Permission Issues
```bash
# macOS/Linux
chmod 644 ~/.codex/plugins-config/custom-additional-context/cac.md
```

## Support

For detailed information, see [README.md](README.md)
