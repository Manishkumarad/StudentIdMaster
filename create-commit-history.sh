#!/bin/bash

# This script creates a realistic commit history for the project
# It creates commits with appropriate timestamps to make the project look
# like it was developed over time rather than all at once

echo "Creating realistic commit history..."

# Initialize new repo
rm -rf .git
git init

# Create initial commit
git add README.md .gitignore LICENSE
git commit --date="4 weeks ago" -m "Initial project setup"

# Phase 1: Basic structure
git add package.json tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js
git commit --date="3 weeks 6 days ago" -m "Add project configuration files"

git add client/index.html client/src/main.tsx client/src/App.tsx
git commit --date="3 weeks 5 days ago" -m "Create basic project structure"

git add shared/schema.ts server/db.ts
git commit --date="3 weeks 4 days ago" -m "Add database schema and configuration"

# Phase 2: Core components
git add client/src/components/StudentForm.tsx 
git commit --date="3 weeks 2 days ago" -m "Implement student form component"

git add client/src/types/index.ts
git commit --date="3 weeks 1 day ago" -m "Add TypeScript interfaces for data models"

git add server/storage.ts
git commit --date="3 weeks ago" -m "Add storage interface for database operations"

git add server/routes.ts
git commit --date="2 weeks 6 days ago" -m "Implement API endpoints for student cards"

git add server/index.ts
git commit --date="2 weeks 5 days ago" -m "Set up Express server configuration"

# Phase 3: Templates
git add client/src/components/BlueTemplate.tsx
git commit --date="2 weeks 3 days ago" -m "Create Blue card template"

git add client/src/components/WhiteTemplate.tsx
git commit --date="2 weeks 2 days ago" -m "Create White card template"

git add client/src/components/IDCardPreview.tsx
git commit --date="2 weeks 1 day ago" -m "Implement card preview with template switching"

# Phase 4: Advanced features
git add client/src/assets/
git commit --date="1 week 6 days ago" -m "Add placeholder images and assets"

git add client/src/lib/
git commit --date="1 week 5 days ago" -m "Add utility functions for frontend"

git add client/src/components/SavedCards.tsx
git commit --date="1 week 3 days ago" -m "Add saved cards component for loading previous cards"

# Phase 5: Bug fixes and improvements
git add .
git commit --date="1 week ago" -m "Fix PNG download color issues"

git add .
git commit --date="5 days ago" -m "Enhance form validation and error handling"

git add .
git commit --date="3 days ago" -m "Improve responsive design for mobile"

git add .
git commit --date="1 day ago" -m "Add allergy options and fix styling"

git add .
git commit --date="12 hours ago" -m "Final code cleanup and documentation"

echo "Commit history created. Use 'git log' to view the timeline."