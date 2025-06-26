#!/bin/bash

# Setup Documentation Links Script
# This script ensures proper linking between React components and Sphinx documentation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

# Check if documentation is built
check_docs_built() {
    print_info "Checking if Sphinx documentation is built..."
    
    if [ ! -d "docs/_build/html" ]; then
        print_warning "Documentation not built. Building now..."
        ./scripts/04_build_docs.sh
    fi
    
    # Check specific documentation files
    local docs_to_check=(
        "docs/_build/html/v5.7/getting-started/index.html"
        "docs/_build/html/v5.7/user-guide/index.html"
        "docs/_build/html/v5.7/api-reference/index.html"
        "docs/_build/html/v5.7/examples/index.html"
        "docs/_build/html/v5.7/development/index.html"
        "docs/_build/html/v5.7/architecture/index.html"
    )
    
    local missing_docs=()
    
    for doc in "${docs_to_check[@]}"; do
        if [ ! -f "$doc" ]; then
            missing_docs+=("$doc")
        fi
    done
    
    if [ ${#missing_docs[@]} -gt 0 ]; then
        print_warning "Missing documentation files:"
        for doc in "${missing_docs[@]}"; do
            echo "  - $doc"
        done
        print_info "Creating placeholder files..."
        create_placeholder_docs "${missing_docs[@]}"
    else
        print_success "All documentation files found"
    fi
}

# Create placeholder documentation files
create_placeholder_docs() {
    local docs=("$@")
    
    for doc in "${docs[@]}"; do
        local dir=$(dirname "$doc")
        mkdir -p "$dir"
        
        local title=$(basename "$dir" | tr '-' ' ' | sed 's/\b\w/\U&/g')
        
        cat > "$doc" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>$title - GRA Core Platform</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem;
            line-height: 1.6;
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        .content {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .back-link {
            display: inline-block;
            margin-top: 2rem;
            padding: 0.5rem 1rem;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        .back-link:hover {
            background: #5a67d8;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>$title</h1>
        <p>GRA Core Platform Documentation</p>
    </div>
    
    <div class="content">
        <h2>📚 Documentation Coming Soon</h2>
        <p>This section of the documentation is currently being developed. Please check back soon for comprehensive guides and references.</p>
        
        <h3>What to expect:</h3>
        <ul>
            <li>Detailed setup instructions</li>
            <li>Code examples and tutorials</li>
            <li>Best practices and guidelines</li>
            <li>API references and specifications</li>
        </ul>
        
        <p><strong>Need immediate help?</strong> Contact the GRA Core team or check our existing documentation sections.</p>
    </div>
    
    <a href="../../index.html" class="back-link">← Back to Documentation Home</a>
</body>
</html>
EOF
        print_success "Created placeholder: $doc"
    done
}

# Setup Next.js public directory symlink for documentation
setup_nextjs_docs_link() {
    print_info "Setting up Next.js documentation links..."
    
    # Create public directory if it doesn't exist
    mkdir -p public
    
    # Create symlink to built documentation
    if [ -d "docs/_build/html" ]; then
        if [ ! -L "public/docs" ]; then
            ln -sf "../docs/_build/html" "public/docs"
            print_success "Created symlink: public/docs -> docs/_build/html"
        else
            print_info "Documentation symlink already exists"
        fi
    else
        print_warning "Built documentation not found. Run build first."
    fi
}

# Verify documentation links work
verify_doc_links() {
    print_info "Verifying documentation links..."
    
    local base_url="http://localhost:3000"
    local docs_to_verify=(
        "/docs/v5.7/getting-started/index.html"
        "/docs/v5.7/user-guide/index.html"
        "/docs/v5.7/api-reference/index.html"
    )
    
    print_info "To test links manually, start the Next.js server and visit:"
    for doc in "${docs_to_verify[@]}"; do
        echo "  ${base_url}${doc}"
    done
}

# Create development server script that serves both Next.js and docs
create_dev_server_script() {
    print_info "Creating unified development server script..."
    
    cat > "scripts/dev_unified.sh" << 'EOF'
#!/bin/bash

# Unified Development Server
# Serves both Next.js app and Sphinx documentation

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if documentation is built
if [ ! -d "docs/_build/html" ]; then
    print_warning "Documentation not built. Building now..."
    ./scripts/04_build_docs.sh
fi

# Setup documentation links
./scripts/setup_doc_links.sh

# Start Sphinx documentation server in background
print_info "Starting Sphinx documentation server on port 8000..."
cd docs/_build/html && python -m http.server 8000 &
SPHINX_PID=$!
cd ../../..

# Wait a moment for Sphinx server to start
sleep 2

# Start Next.js development server
print_info "Starting Next.js development server on port 3000..."
npm run dev &
NEXTJS_PID=$!

# Print access information
echo ""
print_success "🚀 Development servers started!"
echo ""
echo -e "${BLUE}📚 Sphinx Documentation: ${NC}http://localhost:8000"
echo -e "${BLUE}⚛️  Next.js Application:   ${NC}http://localhost:3000"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    print_info "Stopping servers..."
    kill $SPHINX_PID 2>/dev/null || true
    kill $NEXTJS_PID 2>/dev/null || true
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Wait for user to stop
wait
EOF

    chmod +x "scripts/dev_unified.sh"
    print_success "Created unified development server script"
}

# Main function
main() {
    print_header "🔗 Setting Up Documentation Links"
    
    check_docs_built
    setup_nextjs_docs_link
    create_dev_server_script
    verify_doc_links
    
    echo ""
    print_success "Documentation links setup complete!"
    echo ""
    print_info "Next steps:"
    echo "1. Start unified development server: ./scripts/dev_unified.sh"
    echo "2. Visit http://localhost:3000 to see the React app"
    echo "3. Click feature cards to navigate to documentation"
    echo "4. Documentation is served from http://localhost:8000"
    echo ""
}

# Run main function
main "$@"
