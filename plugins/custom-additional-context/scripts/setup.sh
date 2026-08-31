#!/bin/bash

# Setup script for custom-additional-context plugin
# Creates the configuration directory and cac.md file

set -e

# Detect home directory
HOME_DIR="${HOME:-$(cd ~ && pwd)}"
CONFIG_DIR="$HOME_DIR/.codex/plugins-config/custom-additional-context"
CONFIG_FILE="$CONFIG_DIR/cac.md"

echo "Setting up custom-additional-context plugin..."

# Create configuration directory
mkdir -p "$CONFIG_DIR"
echo "✓ Created configuration directory: $CONFIG_DIR"

# Create cac.md file if it doesn't exist
if [ ! -f "$CONFIG_FILE" ]; then
    cat > "$CONFIG_FILE" << 'MARKDOWN'
# Custom Additional Context

Add your custom context here. This content will be automatically injected into each conversation.

## Example Context

- Always be concise and focused
- Use technical terms correctly
- Provide code examples when helpful
MARKDOWN
    echo "✓ Created cac.md file: $CONFIG_FILE"
else
    echo "ℹ  cac.md file already exists: $CONFIG_FILE"
fi

echo ""
echo "Setup complete! Edit the cac.md file at: $CONFIG_FILE"
echo "Your custom context will be automatically injected into conversations."
