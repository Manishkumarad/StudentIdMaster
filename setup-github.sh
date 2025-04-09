#!/bin/bash

# Setup GitHub repo script
echo "Setting up Student ID Card Generator for GitHub..."

# Copy GitHub-ready files
cp package.json.github package.json
cp vite.config.ts.github vite.config.ts

# Remove ALL Replit-specific files and directories
rm -f .replit replit.nix .replitignore .gitignore.replit
rm -rf .config/ .upm/ .cache/ .breakpoints/ .replit.nix/ .replit/ .git/ generated-icon.png

# Remove Replit tags/comments from all files
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs sed -i 's/replit\|Replit//g' 2>/dev/null || true

# Clean any Replit-specific metadata in various files
find . -type f -name "*.json" -o -name "*.md" | xargs sed -i 's/replit\|Replit//g' 2>/dev/null || true

# Initialize fresh Git repository 
git init

# Create necessary folders for GitHub structure
mkdir -p docs/screenshots

# Add files to git

echo ""
echo "Setup complete! Now run the following commands to connect to your GitHub repository:"
echo ""
echo "  git commit -m \"Initial commit\""
echo "  git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "  git push -u origin main"
echo ""
echo "Don't forget to update your repository URL in package.json and README.md!"