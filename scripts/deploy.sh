#!/bin/bash

# GRA Core Platform Documentation Deployment Script
# Deploys documentation to various platforms

set -e

# Configuration
DEPLOY_TARGET=${1:-"github-pages"}
BUILD_DIR="docs/gcp-5.7/0.1/_build/html"

echo "🚀 Deploying GRA Core Platform Documentation to $DEPLOY_TARGET..."

# Build documentation first
./scripts/build-docs.sh

case $DEPLOY_TARGET in
    "github-pages")
        echo "📤 Deploying to GitHub Pages..."
        
        # Check if gh-pages branch exists
        if git show-ref --verify --quiet refs/heads/gh-pages; then
            git checkout gh-pages
            git pull origin gh-pages
        else
            git checkout --orphan gh-pages
        fi
        
        # Clear existing content
        git rm -rf . || true
        
        # Copy built documentation
        cp -r $BUILD_DIR/* .
        
        # Create .nojekyll file for GitHub Pages
        touch .nojekyll
        
        # Commit and push
        git add .
        git commit -m "Deploy documentation - $(date)"
        git push origin gh-pages
        
        # Switch back to main branch
        git checkout main
        
        echo "✅ Deployed to GitHub Pages!"
        ;;
        
    "netlify")
        echo "📤 Deploying to Netlify..."
        
        # Install Netlify CLI if not present
        if ! command -v netlify &> /dev/null; then
            npm install -g netlify-cli
        fi
        
        # Deploy to Netlify
        netlify deploy --prod --dir=$BUILD_DIR
        
        echo "✅ Deployed to Netlify!"
        ;;
        
    "aws-s3")
        echo "📤 Deploying to AWS S3..."
        
        # Check if AWS CLI is configured
        if ! command -v aws &> /dev/null; then
            echo "❌ AWS CLI not found. Please install and configure AWS CLI."
            exit 1
        fi
        
        # Sync to S3 bucket
        aws s3 sync $BUILD_DIR s3://$AWS_S3_BUCKET --delete
        
        # Invalidate CloudFront cache if distribution ID is set
        if [ ! -z "$AWS_CLOUDFRONT_DISTRIBUTION_ID" ]; then
            aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
        fi
        
        echo "✅ Deployed to AWS S3!"
        ;;
        
    *)
        echo "❌ Unknown deployment target: $DEPLOY_TARGET"
        echo "Available targets: github-pages, netlify, aws-s3"
        exit 1
        ;;
esac

echo "🎉 Deployment complete!"
