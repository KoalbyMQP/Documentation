---
id: local-testing
title: Local Development Guide
sidebar_label: Local Testing
sidebar_position: 1
---

# Setting Up Local Development Environment

This guide will help you set up and run the documentation site locally for testing and development.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.14 or above)
- [Git](https://git-scm.com/)
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

## Initial Setup

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/your-org/your-docs-repo.git

# Using SSH
git clone git@github.com:your-org/your-docs-repo.git
```

### 2. Install Dependencies

```bash
# Navigate to the project directory
cd your-docs-repo

# Install dependencies
npm install
```

## Running the Development Server

### Starting the Server

```bash
# Start the development server
npm start
```

This will:
1. Start the local development server
2. Open your default browser to `http://localhost:3000`
3. Enable hot-reloading for instant preview of changes

### Development Server Features

- **Hot Reloading**: Changes to content are reflected immediately
- **Error Reporting**: Build errors are shown in the browser
- **Search**: Local search functionality works as in production
- **Asset Handling**: Images and other assets are served locally

## Testing Your Changes

### 1. Content Changes

1. Edit any Markdown file in the `docs` directory
2. Save the file
3. The browser will automatically refresh
4. Review your changes

### 2. Building the Site

```bash
# Build the site for production
npm run build

# Serve the built site locally
npm run serve
```

This helps ensure your changes will work in production.

## Common Issues and Solutions

### 1. Installation Problems

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### 2. Port Conflicts

If port 3000 is in use:
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -i :3000
   kill -9 <PID>
   ```
2. Or change the port:
   ```bash
   # Windows
   set PORT=3001 && npm start

   # Mac/Linux
   PORT=3001 npm start
   ```

### 3. Build Errors

1. Check console output for error messages
2. Verify all dependencies are installed
3. Clear the cache:
   ```bash
   npm run clear
   ```

## Development Best Practices

### 1. Branch Management

```bash
# Create a new branch for your changes
git checkout -b feature/my-changes

# Make your changes and commit them
git add .
git commit -m "Description of changes"

# Push to remote repository
git push origin feature/my-changes
```

### 2. Configuration Changes

When modifying `docusaurus.config.js`:
1. Stop the development server
2. Make your changes
3. Restart the server

### 3. Performance Testing

1. Build the site: `npm run build`
2. Check the build output for:
   - Bundle sizes
   - Page load times
   - Resource optimization

## Deployment Preview

Before pushing to production:

1. **Build the Site**
   ```bash
   npm run build
   ```

2. **Test the Production Build**
   ```bash
   npm run serve
   ```

3. **Check for Issues**
   - Test navigation
   - Verify images load
   - Check internal links
   - Test search functionality

## Additional Tools

### 1. Debugging

```bash
# Enable debug mode
DEBUG=* npm start
```

### 2. Performance Monitoring

```bash
# Run lighthouse in CLI
npm install -g lighthouse
lighthouse http://localhost:3000
```

### 3. Link Checking

```bash
# Install link checker
npm install -g broken-link-checker

# Check all links
blc http://localhost:3000 -ro
```

Remember: Always test your changes locally before pushing them to ensure a smooth deployment process. 