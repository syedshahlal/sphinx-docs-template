#!/bin/bash

# Create a new documentation version
# This script creates a new version directory and copies current docs

set -e

# Configuration
DOCS_DIR="docs"
VERSIONS_DIR="docs/versions"
CURRENT_VERSION_FILE="docs/current_version.txt"

# Parse command line arguments
NEW_VERSION=""
FROM_VERSION=""
MESSAGE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--version)
            NEW_VERSION="$2"
            shift 2
            ;;
        -f|--from)
            FROM_VERSION="$2"
            shift 2
            ;;
        -m|--message)
            MESSAGE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 -v VERSION [OPTIONS]"
            echo "Options:"
            echo "  -v, --version VERSION   New version to create (required)"
            echo "  -f, --from VERSION      Source version to copy from"
            echo "  -m, --message MESSAGE   Version message"
            echo "  -h, --help              Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate input
if [ -z "$NEW_VERSION" ]; then
    echo "❌ Version is required. Use -v or --version"
    exit 1
fi

# Add 'v' prefix if not present
if [[ ! "$NEW_VERSION" =~ ^v ]]; then
    NEW_VERSION="v$NEW_VERSION"
fi

# Create versions directory
mkdir -p "$VERSIONS_DIR"

# Determine source directory
if [ -n "$FROM_VERSION" ]; then
    if [[ ! "$FROM_VERSION" =~ ^v ]]; then
        FROM_VERSION="v$FROM_VERSION"
    fi
    SOURCE_DIR="$VERSIONS_DIR/$FROM_VERSION"
    if [ ! -d "$SOURCE_DIR" ]; then
        echo "❌ Source version $FROM_VERSION not found in $VERSIONS_DIR"
        exit 1
    fi
else
    SOURCE_DIR="$DOCS_DIR"
fi

# Check if new version already exists
NEW_VERSION_DIR="$VERSIONS_DIR/$NEW_VERSION"
if [ -d "$NEW_VERSION_DIR" ]; then
    echo "❌ Version $NEW_VERSION already exists!"
    exit 1
fi

echo "🚀 Creating new documentation version: $NEW_VERSION"
echo "📁 Source: $SOURCE_DIR"
echo "📁 Target: $NEW_VERSION_DIR"

# Copy source to new version directory
echo "📋 Copying documentation..."
cp -r "$SOURCE_DIR" "$NEW_VERSION_DIR"

# Update version in conf.py
if [ -f "$NEW_VERSION_DIR/conf.py" ]; then
    echo "📝 Updating version in conf.py..."
    sed -i.bak "s/version = '[^']*'/version = '${NEW_VERSION#v}'/" "$NEW_VERSION_DIR/conf.py"
    sed -i.bak "s/release = '[^']*'/release = '${NEW_VERSION#v}.0'/" "$NEW_VERSION_DIR/conf.py"
    rm -f "$NEW_VERSION_DIR/conf.py.bak"
fi

# Update version references in index.rst
if [ -f "$NEW_VERSION_DIR/index.rst" ]; then
    echo "📝 Updating version references in documentation..."
    # Add version info to the main index
    if ! grep -q "Version $NEW_VERSION" "$NEW_VERSION_DIR/index.rst"; then
        sed -i.bak "1a\\
\\
.. note::\\
   You are viewing documentation for version $NEW_VERSION.\\
" "$NEW_VERSION_DIR/index.rst"
        rm -f "$NEW_VERSION_DIR/index.rst.bak"
    fi
fi

# Create version metadata
cat > "$NEW_VERSION_DIR/version.json" << EOF
{
    "version": "$NEW_VERSION",
    "created_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "source_version": "${FROM_VERSION:-"current"}",
    "message": "${MESSAGE:-"Created version $NEW_VERSION"}",
    "status": "active"
}
EOF

# Update current version file
echo "$NEW_VERSION" > "$CURRENT_VERSION_FILE"

# Create git tag if in git repository
if [ -d ".git" ] && [ -n "$MESSAGE" ]; then
    echo "🏷️ Creating git tag..."
    git add .
    git commit -m "Create documentation version $NEW_VERSION: $MESSAGE" || true
    git tag -a "$NEW_VERSION" -m "$MESSAGE" || true
fi

echo "✅ Successfully created version $NEW_VERSION"
echo "📊 Version summary:"
echo "   Version: $NEW_VERSION"
echo "   Directory: $NEW_VERSION_DIR"
echo "   Source: $SOURCE_DIR"
echo "   Message: ${MESSAGE:-"No message provided"}"

# List all versions
echo ""
echo "📋 All versions:"
if [ -d "$VERSIONS_DIR" ]; then
    for version_dir in "$VERSIONS_DIR"/v*; do
        if [ -d "$version_dir" ]; then
            version=$(basename "$version_dir")
            if [ -f "$version_dir/version.json" ]; then
                created=$(grep '"created_date"' "$version_dir/version.json" | cut -d'"' -f4 | cut -d'T' -f1)
                echo "   - $version (created: $created)"
            else
                echo "   - $version"
            fi
        fi
    done
else
    echo "   No versions found"
fi

echo ""
echo "🔧 Next steps:"
echo "   1. Build the new version: ./scripts/build_versioned_docs.sh -v $NEW_VERSION"
echo "   2. Build all versions: ./scripts/build_versioned_docs.sh -a"
echo "   3. Serve documentation: ./scripts/serve_docs.sh"
