#!/bin/bash

# Create New Documentation Version
# Usage: ./scripts/create_version.sh 5.7
# Creates: src/gcp_docs/docs/gcp_5.7/

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Function to show usage
show_usage() {
    echo "Usage: $0 <version>"
    echo "Example: $0 5.7"
    echo "Creates: src/gcp_docs/docs/gcp_5.7/"
    exit 1
}

# Check if version argument is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Error: Version number required${NC}"
    show_usage
fi

VERSION=$1
NEW_VERSION_DIR="src/gcp_docs/docs/gcp_${VERSION}"
TEMPLATE_DIR="src/gcp_docs/docs/gcp_5.6"

echo -e "${BLUE}📚 Creating GRA Core Platform Documentation v${VERSION}${NC}"
echo "=================================================="

# Validate version format (should be like 5.7, 5.8, etc.)
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+$ ]]; then
    echo -e "${RED}❌ Error: Invalid version format. Use format like '5.7'${NC}"
    exit 1
fi

# Check if version already exists
if [ -d "$NEW_VERSION_DIR" ]; then
    echo -e "${RED}❌ Error: Version $VERSION already exists at $NEW_VERSION_DIR${NC}"
    exit 1
fi

# Check if template directory exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    echo -e "${RED}❌ Error: Template directory not found: $TEMPLATE_DIR${NC}"
    echo -e "${YELLOW}💡 Run this script after setting up the base documentation structure${NC}"
    exit 1
fi

# Create new version directory
echo -e "${GREEN}📁 Creating directory: $NEW_VERSION_DIR${NC}"
mkdir -p "$NEW_VERSION_DIR"

# Copy template structure
echo -e "${GREEN}📋 Copying documentation structure from template...${NC}"
cp -r "$TEMPLATE_DIR"/* "$NEW_VERSION_DIR"/

# Update version references in files
echo -e "${GREEN}🔄 Updating version references...${NC}"

# Update index.rst
if [ -f "$NEW_VERSION_DIR/index.rst" ]; then
    sed -i.bak "s/v5\.6/v${VERSION}/g" "$NEW_VERSION_DIR/index.rst"
    sed -i.bak "s/5\.6/${VERSION}/g" "$NEW_VERSION_DIR/index.rst"
    rm -f "$NEW_VERSION_DIR/index.rst.bak"
    echo -e "${GREEN}  ✓ Updated index.rst${NC}"
fi

# Update all .rst files recursively
find "$NEW_VERSION_DIR" -name "*.rst" -type f | while read -r file; do
    sed -i.bak "s/v5\.6/v${VERSION}/g" "$file"
    sed -i.bak "s/5\.6/${VERSION}/g" "$file"
    rm -f "${file}.bak"
done

# Update conf.py if it exists
if [ -f "$NEW_VERSION_DIR/conf.py" ]; then
    sed -i.bak "s/version = '5\.6'/version = '${VERSION}'/g" "$NEW_VERSION_DIR/conf.py"
    sed -i.bak "s/release = '5\.6\.[0-9]'/release = '${VERSION}.0'/g" "$NEW_VERSION_DIR/conf.py"
    rm -f "$NEW_VERSION_DIR/conf.py.bak"
    echo -e "${GREEN}  ✓ Updated conf.py${NC}"
fi

# Create version metadata
cat > "$NEW_VERSION_DIR/version.json" << EOF
{
    "version": "${VERSION}",
    "created_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "source_version": "5.6",
    "status": "active",
    "description": "GRA Core Platform v${VERSION} Documentation"
}
EOF

echo -e "${GREEN}  ✓ Created version metadata${NC}"

# Update main configuration to include new version
echo -e "${GREEN}🔧 Updating main configuration...${NC}"

# Update conf.py in root to include new version
if [ -f "conf.py" ]; then
    # Add new version to available versions in html_context
    python3 << EOF
import re

# Read conf.py
with open('conf.py', 'r') as f:
    content = f.read()

# Find the available_versions section and add new version
version_pattern = r'("available_versions": \[)(.*?)(\])'
match = re.search(version_pattern, content, re.DOTALL)

if match:
    versions_content = match.group(2)
    new_version_entry = '''
        {"version": "v${VERSION}.0", "status": "stable", "current": True},'''
    
    # Make previous version non-current
    versions_content = re.sub(r'"current": True', '"current": False', versions_content)
    
    # Add new version at the top
    new_versions_content = new_version_entry + versions_content
    
    # Replace in content
    new_content = content.replace(match.group(0), match.group(1) + new_versions_content + match.group(3))
    
    # Write back
    with open('conf.py', 'w') as f:
        f.write(new_content)
    
    print("✓ Updated conf.py with new version")
else:
    print("⚠ Could not find available_versions in conf.py")
EOF
fi

# Create symbolic link for easy access
echo -e "${GREEN}🔗 Creating symbolic link...${NC}"
if [ -L "docs/current" ]; then
    rm docs/current
fi
mkdir -p docs
ln -sf "../src/gcp_docs/docs/gcp_${VERSION}" "docs/current"

echo -e "${GREEN}✅ Documentation version ${VERSION} created successfully!${NC}"
echo ""
echo -e "${BLUE}📊 Summary:${NC}"
echo -e "${GREEN}  📁 Location: $NEW_VERSION_DIR${NC}"
echo -e "${GREEN}  🔗 Symlink: docs/current -> gcp_${VERSION}${NC}"
echo -e "${GREEN}  📄 Files: $(find "$NEW_VERSION_DIR" -type f | wc -l) files created${NC}"
echo ""
echo -e "${BLUE}🔧 Next steps:${NC}"
echo -e "${YELLOW}  1. Review and customize the documentation content${NC}"
echo -e "${YELLOW}  2. Build documentation: ./scripts/04_build_docs.sh${NC}"
echo -e "${YELLOW}  3. Serve documentation: ./scripts/05_serve_docs.sh${NC}"
echo ""
echo -e "${BLUE}📋 Available versions:${NC}"
if [ -d "src/gcp_docs/docs" ]; then
    for version_dir in src/gcp_docs/docs/gcp_*; do
        if [ -d "$version_dir" ]; then
            version_name=$(basename "$version_dir")
            if [ -f "$version_dir/version.json" ]; then
                created_date=$(grep '"created_date"' "$version_dir/version.json" | cut -d'"' -f4 | cut -d'T' -f1)
                echo -e "${GREEN}  - $version_name (created: $created_date)${NC}"
            else
                echo -e "${GREEN}  - $version_name${NC}"
            fi
        fi
    done
fi
