#!/bin/bash

# Setup GitHub repo script
echo "Setting up Student ID Card Generator for GitHub..."

# Copy GitHub-ready files
cp package.json.github package.json
cp vite.config.ts.github vite.config.ts

# Remove Replit specific files
rm -f .replit replit.nix
rm -rf .config .upm .cache .breakpoints

# Initialize Git repository
git init

# Add files to git
git add .

echo ""
echo "Setup complete! Now run the following commands to connect to your GitHub repository:"
echo ""
echo "  git commit -m \"Initial commit\""
echo "  git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "  git push -u origin main"
echo ""
echo "Don't forget to update your repository URL in package.json and README.md!"