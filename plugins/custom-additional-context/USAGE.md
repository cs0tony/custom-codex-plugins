# Quick Usage Guide

## 🚀 One-Click Setup (Recommended)

### macOS/Linux
```bash
# Using curl (Recommended)
curl -fsSL https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.sh | bash

# Using wget
wget -qO- https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.sh | bash
```

### Windows PowerShell
```powershell
# One-liner (Recommended)
irm https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.ps1 | iex

# Alternative
Invoke-WebRequest -Uri https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.ps1 -OutFile setup.ps1
powershell -ExecutionPolicy Bypass -File setup.ps1
Remove-Item setup.ps1
```

## Manual Setup

### macOS/Linux
```bash
mkdir -p ~/.codex/plugins-config/custom-additional-context
touch ~/.codex/plugins-config/custom-additional-context/cac.md
```

### Windows PowerShell
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.codex\plugins-config\custom-additional-context"
New-Item -ItemType File -Path "$env:USERPROFILE\.codex\plugins-config\custom-additional-context\cac.md" -Force
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

## Troubleshooting

### Remote Script Issues

**Network problems:**
```bash
# Test GitHub connectivity
curl -I https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.sh
```

**Certificate errors:**
```bash
# Try wget as fallback
wget -qO- https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.sh | bash
```

**PowerShell execution policy:**
```powershell
# Use bypass flag
powershell -ExecutionPolicy Bypass -File setup.ps1
```

### Context Not Appearing

1. Check that `cac.md` exists in the correct location
2. Verify the file is not empty
3. Check the log file for errors
4. Restart Codex if needed

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

## Quick Reference

### Remote Script URLs
- **Bash**: https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.sh
- **PowerShell**: https://raw.githubusercontent.com/cs0tony/custom-codex-plugins/main/plugins/custom-additional-context/scripts/setup.ps1

### Configuration File Paths
- **macOS/Linux**: `~/.codex/plugins-config/custom-additional-context/cac.md`
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\cac.md`

### Log File Paths
- **macOS/Linux**: `~/.codex/plugins-config/custom-additional-context/logs/log.txt`
- **Windows**: `%USERPROFILE%\.codex\plugins-config\custom-additional-context\logs\log.txt`

## Support

For detailed information, see [README.md](README.md)
