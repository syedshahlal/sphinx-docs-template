#!/bin/bash

# Simulate running the deploy.sh script
echo "🚀 Starting GRA Core Platform Documentation Deployment"
echo "====================================================="

# Configuration
REPO_URL="https://github.com/gra-community/gra-core-docs.git"
BUILD_DIR="_build/html"
DEPLOY_BRANCH="gh-pages"
COMMIT_MESSAGE="Deploy documentation $(date '+%Y-%m-%d %H:%M:%S')"

echo "📋 Deployment Configuration:"
echo "   Repository: $REPO_URL"
echo "   Build Directory: $BUILD_DIR"
echo "   Deploy Branch: $DEPLOY_BRANCH"
echo "   Commit Message: $COMMIT_MESSAGE"
echo ""

# Check if we're in a git repository
echo "🔍 Checking git repository..."
if [ -d ".git" ]; then
    echo "✅ Git repository found"
else
    echo "❌ Error: Not in a git repository"
    echo "   Please run this script from the documentation root."
    exit 1
fi

# Check for uncommitted changes
echo "🔍 Checking for uncommitted changes..."
echo "✅ Working directory is clean"

# Install dependencies
echo "📦 Installing dependencies..."
echo "   - sphinx>=6.0.0"
echo "   - pydata-sphinx-theme>=0.14.0"
echo "   - sphinx-design>=0.4.0"
echo "✅ Dependencies installed"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
echo "✅ Build directory cleaned"

# Build multi-version documentation
echo "🏗️  Building multi-version documentation..."
echo "   Building version: v5.7 (latest)"
echo "   Building version: v5.6"
echo "   Building version: v5.5"
echo "✅ Multi-version build completed"

# Verify build
echo "🔍 Verifying build..."
echo "   Found 25 HTML files"
echo "   Total size: 2.4 MB"
echo "✅ Build verification successful"

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
echo "   Creating temporary directory..."
echo "   Cloning repository..."
echo "   Switching to gh-pages branch..."
echo "   Copying built documentation..."
echo "   Adding .nojekyll file..."
echo "   Committing changes..."
echo "   Pushing to gh-pages..."

echo ""
echo "✅ Documentation deployed successfully!"
echo "🌐 Your documentation will be available at:"
echo "   https://gra-community.github.io/gra-core-docs/"
echo ""
echo "📊 Deployment Summary:"
echo "   - Files deployed: 25 HTML + 15 assets"
echo "   - Deployment time: 45.2 seconds"
echo "   - Branch: gh-pages"
echo "   - Commit: abc123def456"
echo ""
echo "🎉 Deployment complete!"
