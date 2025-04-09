/**
 * Deep cleaning script to remove all Replit references
 * Run with: node deep-clean.js
 */

const fs = require('fs');
const path = require('path');

// Words to search for and replace
const replitKeywords = [
  'replit', 'Replit', 'REPLIT', 'repl', 'Repl', 'REPL',
  '@replit', '.replit.app', 'replit.com',
  'replitignore', 'replit.nix'
];

// File extensions to check
const fileExtensions = [
  '.js', '.jsx', '.ts', '.tsx', '.json', '.md', 
  '.html', '.css', '.scss', '.yml', '.yaml', '.env',
  '.gitignore', '.prettierrc', '.eslintrc'
];

// Directories to exclude
const excludeDirs = [
  'node_modules', 'dist', 'build', '.git'
];

function cleanFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Replace any Replit references
    replitKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      content = content.replace(regex, '');
    });
    
    // If content was changed, write it back
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Cleaned: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!excludeDirs.includes(file)) {
        walkDir(filePath);
      }
    } else {
      // Check if file extension should be processed
      const ext = path.extname(file);
      if (fileExtensions.includes(ext) || file === 'package.json' || file === 'tsconfig.json') {
        cleanFile(filePath);
      }
    }
  }
}

console.log('Starting deep cleaning of Replit references...');
walkDir('.');
console.log('Deep cleaning complete!');