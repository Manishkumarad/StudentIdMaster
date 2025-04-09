#!/bin/bash

# Script to restructure the project for a more standard folder layout
echo "Restructuring project folders..."

# Create standard structure directories if they don't exist
mkdir -p src/client/components
mkdir -p src/client/pages
mkdir -p src/client/hooks
mkdir -p src/client/utils
mkdir -p src/client/styles
mkdir -p src/client/assets
mkdir -p src/server/controllers
mkdir -p src/server/middleware
mkdir -p src/server/models
mkdir -p src/server/routes
mkdir -p src/server/utils
mkdir -p src/shared/types
mkdir -p config
mkdir -p scripts
mkdir -p docs/api
mkdir -p public/images

# Copy files to the new structure
# This modifies the imports but maintains the actual code

# Client side restructuring
if [ -d "client/src/components" ]; then
  cp -r client/src/components/* src/client/components/
fi

if [ -d "client/src/pages" ]; then
  cp -r client/src/pages/* src/client/pages/
fi

if [ -d "client/src/hooks" ]; then
  cp -r client/src/hooks/* src/client/hooks/
fi

if [ -d "client/src/lib" ]; then
  cp -r client/src/lib/* src/client/utils/
fi

if [ -d "client/src/assets" ]; then
  cp -r client/src/assets/* src/client/assets/
fi

# Server side restructuring
if [ -f "server/routes.ts" ]; then
  cp server/routes.ts src/server/routes/index.ts
fi

if [ -f "server/storage.ts" ]; then
  cp server/storage.ts src/server/models/storage.ts
fi

if [ -f "server/db.ts" ]; then
  cp server/db.ts src/server/models/db.ts
fi

if [ -f "server/index.ts" ]; then
  cp server/index.ts src/server/index.ts
fi

# Shared files
if [ -d "shared" ]; then
  cp -r shared/* src/shared/
fi

# Copy config files
if [ -f "vite.config.ts" ]; then
  cp vite.config.ts config/vite.config.ts
fi

if [ -f "tsconfig.json" ]; then
  cp tsconfig.json config/tsconfig.json
fi

if [ -f "tailwind.config.ts" ]; then
  cp tailwind.config.ts config/tailwind.config.ts
fi

# Create a new root index file
echo "import './src/server/index';" > index.js

echo "Restructuring complete. Note that this doesn't modify imports, so you'd need to update those manually."
echo "This is just a template for how you might want to organize your GitHub repository."