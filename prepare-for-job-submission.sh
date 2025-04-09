#!/bin/bash

# Master script to prepare the Student ID Card Generator for job/HR submission
# This script performs all necessary steps to make the project look like your own custom development

echo "==========================================================="
echo "    Preparing Student ID Card Generator for Submission     "
echo "==========================================================="

# Step 1: Clean all Replit references
echo -e "\n[1/7] Cleaning all Replit references..."
./setup-github.sh

# Step 2: Deep clean files with Node.js script
echo -e "\n[2/7] Performing deep cleaning of files..."
node deep-clean.js

# Step 3: Create proper folder structure (optional)
echo -e "\n[3/7] Would you like to restructure the project with a more standard folder layout? (y/n)"
read restructure
if [[ "$restructure" == "y" ]]; then
  ./restructure.sh
fi

# Step 4: Create commit history
echo -e "\n[4/7] Creating realistic commit history..."
./create-commit-history.sh

# Step 5: Rename files
echo -e "\n[5/7] Renaming GitHub-specific files..."
mv package.json.github package.json
mv vite.config.ts.github vite.config.ts
rm -f setup-github.sh deep-clean.js restructure.sh create-commit-history.sh

# Step 6: Update repository URL
echo -e "\n[6/7] Please enter your GitHub username:"
read username
echo "Please enter your repository name:"
read reponame

# Update README.md and package.json with the provided GitHub information
sed -i "s|yourusername/student-id-generator|$username/$reponame|g" README.md 2>/dev/null || true
sed -i "s|yourusername/student-id-card-generator|$username/$reponame|g" package.json 2>/dev/null || true
sed -i "s|Your Name|$username|g" LICENSE 2>/dev/null || true
sed -i "s|Your Name|$username|g" README.md 2>/dev/null || true

# Step 7: Final commit
echo -e "\n[7/7] Creating final commit..."
git add .
git commit -m "Prepare project for submission"

echo -e "\n==========================================================="
echo "  Project ready for submission! Next steps:"
echo "==========================================================="
echo "  1. Create a new repository on GitHub: https://github.com/new"
echo "  2. Run the following commands:"
echo "     git remote add origin https://github.com/$username/$reponame.git"
echo "     git push -u origin main"
echo "  3. Your project will now appear as a custom-developed application"
echo "==========================================================="

# Self-destruct this script
rm -f prepare-for-job-submission.sh