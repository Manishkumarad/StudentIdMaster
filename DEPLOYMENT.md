# Deployment Guide

This document provides instructions for deploying the Student ID Card Generator application to various environments.

## Prerequisites

Before deploying, ensure you have:

1. Node.js (v16 or higher) installed
2. PostgreSQL database instance
3. Environment variables set up

## Environment Variables

Create a `.env` file with the following variables:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
```

## Local Deployment

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/student-id-card-generator.git
   cd student-id-card-generator
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Initialize the database
   ```bash
   npm run db:push
   ```

4. Build the application
   ```bash
   npm run build
   ```

5. Start the server
   ```bash
   npm start
   ```

The application will be available at http://localhost:3000

## Production Deployment

### Deploying to Vercel

1. Connect your GitHub repository to Vercel
2. Configure the environment variables in Vercel dashboard
3. Set the build command to `npm run build`
4. Set the output directory to `dist`
5. Deploy!

### Deploying to Railway

1. Create a new project in Railway
2. Connect your GitHub repository
3. Add a PostgreSQL database service
4. Configure the environment variables
5. Deploy!

### Deploying to Heroku

1. Create a new Heroku application
   ```bash
   heroku create your-app-name
   ```

2. Add PostgreSQL addon
   ```bash
   heroku addons:create heroku-postgresql
   ```

3. Push to Heroku
   ```bash
   git push heroku main
   ```

4. Open the application
   ```bash
   heroku open
   ```

## Database Migration

When making changes to the database schema:

1. Update the schema in `shared/schema.ts`
2. Run the database migration:
   ```bash
   npm run db:push
   ```

## Troubleshooting

If you encounter any issues during deployment:

1. Check your environment variables
2. Ensure PostgreSQL is running and accessible
3. Verify that the database schema is up to date
4. Check server logs:
   ```bash
   heroku logs --tail # for Heroku
   ```