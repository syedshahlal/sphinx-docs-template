#!/bin/bash

# Deployment script for GRA Core Platform Documentation

set -e  # Exit on any error

echo "🚀 Starting GRA Core Platform Documentation Deployment"

# Configuration
REPO_URL="https://github.com/gra-community/gra-core-docs.git"
BUILD_DIR="_build/html"
DEPLOY_BRANCH="gh-pages"
COMMIT_MESSAGE="Deploy documentation $(date '+%Y-%m-%d %H:%M:%S')"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    log_error "Not in a git repository. Please run this script from the documentation root."
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    log_warn "You have uncommitted changes. Consider committing them first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies
log_info "Installing dependencies..."
pip install -r requirements.txt

# Clean previous builds
log_info "Cleaning previous builds..."
make clean

# Build multi-version documentation
log_info "Building multi-version documentation..."
make multiversion

# Verify build
if [ ! -d "$BUILD_DIR" ]; then
    log_error "Build directory $BUILD_DIR not found. Build may have failed."
    exit 1
fi

# Check if there are any HTML files
if [ -z "$(find $BUILD_DIR -name '*.html' -type f)" ]; then
    log_error "No HTML files found in build directory. Build may have failed."
    exit 1
fi

log_info "Build completed successfully!"

# Deploy to GitHub Pages
log_info "Deploying to GitHub Pages..."

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
log_info "Using temporary directory: $TEMP_DIR"

# Clone the repository to temp directory
git clone "$REPO_URL" "$TEMP_DIR"
cd "$TEMP_DIR"

# Switch to or create the deployment branch
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    log_info "Switching to existing $DEPLOY_BRANCH branch"
    git checkout $DEPLOY_BRANCH
else
    log_info "Creating new $DEPLOY_BRANCH branch"
    git checkout --orphan $DEPLOY_BRANCH
    git rm -rf .
fi

# Copy built documentation
log_info "Copying built documentation..."
cp -r "$OLDPWD/$BUILD_DIR"/* .

# Add CNAME file for custom domain (if needed)
# echo "docs.gra-platform.org" > CNAME

# Add .nojekyll file to prevent Jekyll processing
touch .nojekyll

# Add all files
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    log_info "No changes to deploy."
else
    log_info "Committing changes..."
    git commit -m "$COMMIT_MESSAGE"
    
    log_info "Pushing to $DEPLOY_BRANCH..."
    git push origin $DEPLOY_BRANCH
    
    log_info "✅ Documentation deployed successfully!"
    log_info "🌐 Your documentation will be available at: https://gra-community.github.io/gra-core-docs/"
fi

# Cleanup
cd "$OLDPWD"
rm -rf "$TEMP_DIR"

log_info "🎉 Deployment complete!"
