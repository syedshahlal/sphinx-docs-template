#!/bin/bash

# Manage Documentation Versions
# Usage: ./scripts/manage_versions.sh [list|switch|delete] [version]

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOCS_DIR="src/gcp_docs/docs"

show_usage() {
    echo "Usage: $0 <command> [version]"
    echo ""
    echo "Commands:"
    echo "  list                 - List all available versions"
    echo "  switch <version>     - Switch to a specific version"
    echo "  delete <version>     - Delete a version"
    echo "  current              - Show current active version"
    echo ""
    echo "Examples:"
    echo "  $0 list"
    echo "  $0 switch 5.7"
    echo "  $0 delete 5.5"
    echo "  $0 current"
    exit 1
}

list_versions() {
    echo -e "${BLUE}📋 Available Documentation Versions:${NC}"
    echo "===================================="
    
    if [ ! -d "$DOCS_DIR" ]; then
        echo -e "${RED}❌ Documentation directory not found: $DOCS_DIR${NC}"
        return 1
    fi
    
    current_version=""
    if [ -L "docs/current" ]; then
        current_version=$(readlink docs/current | sed 's/.*gcp_//')
    fi
    
    for version_dir in "$DOCS_DIR"/gcp_*; do
        if [ -d "$version_dir" ]; then
            version_name=$(basename "$version_dir" | sed 's/gcp_//')
            
            # Check if this is the current version
            current_marker=""
            if [ "$version_name" = "$current_version" ]; then
                current_marker=" ${GREEN}(current)${NC}"
            fi
            
            if [ -f "$version_dir/version.json" ]; then
                created_date=$(grep '"created_date"' "$version_dir/version.json" | cut -d'"' -f4 | cut -d'T' -f1)
                status=$(grep '"status"' "$version_dir/version.json" | cut -d'"' -f4)
                echo -e "${GREEN}  📚 v$version_name${NC} - $status (created: $created_date)$current_marker"
            else
                echo -e "${GREEN}  📚 v$version_name${NC}$current_marker"
            fi
        fi
    done
}

switch_version() {
    local version=$1
    local version_dir="$DOCS_DIR/gcp_$version"
    
    if [ ! -d "$version_dir" ]; then
        echo -e "${RED}❌ Version $version not found${NC}"
        echo -e "${YELLOW}💡 Available versions:${NC}"
        list_versions
        return 1
    fi
    
    echo -e "${BLUE}🔄 Switching to version $version...${NC}"
    
    # Update symbolic link
    mkdir -p docs
    if [ -L "docs/current" ]; then
        rm docs/current
    fi
    ln -sf "../$version_dir" "docs/current"
    
    # Update conf.py master_doc
    if [ -f "conf.py" ]; then
        sed -i.bak "s|master_doc = 'src/gcp_docs/docs/gcp_[^']*'|master_doc = 'src/gcp_docs/docs/gcp_$version/index'|" conf.py
        rm -f conf.py.bak
    fi
    
    echo -e "${GREEN}✅ Switched to version $version${NC}"
    echo -e "${GREEN}🔗 Current symlink: docs/current -> gcp_$version${NC}"
}

delete_version() {
    local version=$1
    local version_dir="$DOCS_DIR/gcp_$version"
    
    if [ ! -d "$version_dir" ]; then
        echo -e "${RED}❌ Version $version not found${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}⚠️  Are you sure you want to delete version $version?${NC}"
    echo -e "${YELLOW}   This will permanently delete: $version_dir${NC}"
    read -p "Type 'yes' to confirm: " confirm
    
    if [ "$confirm" = "yes" ]; then
        rm -rf "$version_dir"
        echo -e "${GREEN}✅ Version $version deleted${NC}"
        
        # If this was the current version, switch to latest
        if [ -L "docs/current" ] && [ "$(readlink docs/current | sed 's/.*gcp_//')" = "$version" ]; then
            echo -e "${YELLOW}🔄 Deleted version was current, switching to latest...${NC}"
            latest_version=$(ls -1 "$DOCS_DIR" | grep "gcp_" | sort -V | tail -1 | sed 's/gcp_//')
            if [ -n "$latest_version" ]; then
                switch_version "$latest_version"
            else
                rm -f docs/current
                echo -e "${YELLOW}⚠️  No other versions available${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}❌ Deletion cancelled${NC}"
    fi
}

show_current() {
    echo -e "${BLUE}📍 Current Documentation Version:${NC}"
    echo "================================"
    
    if [ -L "docs/current" ]; then
        current_version=$(readlink docs/current | sed 's/.*gcp_//')
        version_dir="$DOCS_DIR/gcp_$current_version"
        
        echo -e "${GREEN}  Version: v$current_version${NC}"
        echo -e "${GREEN}  Path: $version_dir${NC}"
        
        if [ -f "$version_dir/version.json" ]; then
            created_date=$(grep '"created_date"' "$version_dir/version.json" | cut -d'"' -f4)
            status=$(grep '"status"' "$version_dir/version.json" | cut -d'"' -f4)
            echo -e "${GREEN}  Status: $status${NC}"
            echo -e "${GREEN}  Created: $created_date${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  No current version set${NC}"
    fi
}

# Main script logic
case "${1:-}" in
    list)
        list_versions
        ;;
    switch)
        if [ -z "${2:-}" ]; then
            echo -e "${RED}❌ Version required for switch command${NC}"
            show_usage
        fi
        switch_version "$2"
        ;;
    delete)
        if [ -z "${2:-}" ]; then
            echo -e "${RED}❌ Version required for delete command${NC}"
            show_usage
        fi
        delete_version "$2"
        ;;
    current)
        show_current
        ;;
    *)
        show_usage
        ;;
esac
