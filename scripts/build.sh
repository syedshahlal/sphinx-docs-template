#!/bin/bash

# Build script for GRA Core Platform Documentation

echo "Building GRA Core Platform Documentation..."

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Clean previous builds
echo "Cleaning previous builds..."
make clean

# Build HTML documentation
echo "Building HTML documentation..."
make html

# Copy static assets
echo "Copying static assets..."
cp -r _static/* _build/html/_static/

echo "Build complete! Documentation available in _build/html/"
echo "To serve locally, run: python -m http.server 8000 --directory _build/html"
