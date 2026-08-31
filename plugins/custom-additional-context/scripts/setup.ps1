# Setup script for custom-additional-context plugin
# Creates the configuration directory and cac.md file

$ErrorActionPreference = "Stop"

# Detect home directory
$homeDir = $env:USERPROFILE
if (-not $homeDir) {
    $homeDir = $env:HOME
}

$configDir = Join-Path $homeDir ".codex\plugins-config\custom-additional-context"
$configFile = Join-Path $configDir "cac.md"

Write-Host "Setting up custom-additional-context plugin..." -ForegroundColor Green

# Create configuration directory
if (-not (Test-Path $configDir)) {
    New-Item -ItemType Directory -Force -Path $configDir | Out-Null
    Write-Host "✓ Created configuration directory: $configDir" -ForegroundColor Green
} else {
    Write-Host "ℹ  Configuration directory already exists: $configDir" -ForegroundColor Yellow
}

# Create cac.md file if it doesn't exist
if (-not (Test-Path $configFile)) {
    $markdownContent = @"
# Custom Additional Context

Add your custom context here. This content will be automatically injected into each conversation.

## Example Context

- Always be concise and focused
- Use technical terms correctly
- Provide code examples when helpful
"@
    
    $markdownContent | Out-File -FilePath $configFile -Encoding UTF8
    Write-Host "✓ Created cac.md file: $configFile" -ForegroundColor Green
} else {
    Write-Host "ℹ  cac.md file already exists: $configFile" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete! Edit the cac.md file at: $configFile" -ForegroundColor Green
Write-Host "Your custom context will be automatically injected into conversations." -ForegroundColor Green
