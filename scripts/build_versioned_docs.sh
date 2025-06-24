#!/bin/bash

# Build versioned documentation with _build in docs folder
# This script handles building documentation for different versions

set -e

# Configuration
DOCS_DIR="docs"
BUILD_DIR="docs/_build"
VERSIONS_DIR="docs/versions"
DEFAULT_VERSION="v5.7"

# Parse command line arguments
VERSION=""
BUILD_ALL=false
CLEAN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -a|--all)
            BUILD_ALL=true
            shift
            ;;
        -c|--clean)
            CLEAN=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -v, --version VERSION    Build specific version"
            echo "  -a, --all               Build all versions"
            echo "  -c, --clean             Clean build directory first"
            echo "  -h, --help              Show this help"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Clean build directory if requested
if [ "$CLEAN" = true ]; then
    echo "🧹 Cleaning build directory..."
    rm -rf "$BUILD_DIR"
fi

# Create build directory
mkdir -p "$BUILD_DIR"

# Check dependencies
check_dependencies() {
    echo "🔍 Checking dependencies..."
    
    # Check if sphinx-build is available
    if ! command -v sphinx-build &> /dev/null; then
        echo "❌ sphinx-build not found. Please install Sphinx:"
        echo "   pip install sphinx"
        exit 1
    fi
    
    # Check if required Python packages are installed
    python3 -c "import sphinx_copybutton, sphinx_design, myst_parser" 2>/dev/null || {
        echo "❌ Missing required packages. Installing..."
        pip install sphinx-copybutton sphinx-design myst-parser pydata-sphinx-theme
    }
    
    echo "✅ Dependencies check passed"
}

# Function to build a specific version
build_version() {
    local version=$1
    local version_dir="$VERSIONS_DIR/$version"
    local output_dir="$BUILD_DIR/html/$version"
    
    echo "🔨 Building documentation for $version..."
    
    # Check if version directory exists
    if [ ! -d "$version_dir" ] && [ "$version" != "$DEFAULT_VERSION" ]; then
        echo "❌ Version directory $version_dir not found!"
        return 1
    fi
    
    # Use current docs if building default version
    local source_dir="$DOCS_DIR"
    if [ -d "$version_dir" ]; then
        source_dir="$version_dir"
    fi
    
    # Validate source directory has required files
    if [ ! -f "$source_dir/conf.py" ]; then
        echo "❌ conf.py not found in $source_dir"
        return 1
    fi
    
    if [ ! -f "$source_dir/index.rst" ]; then
        echo "❌ index.rst not found in $source_dir"
        return 1
    fi
    
    # Create output directory
    mkdir -p "$output_dir"
    
    # Build documentation with better error handling
    echo "📖 Building from $source_dir to $output_dir..."
    
    # Run sphinx-build with verbose output for debugging
    if sphinx-build -b html -d "$BUILD_DIR/doctrees/$version" -v "$source_dir" "$output_dir" 2>&1 | tee "$BUILD_DIR/build_$version.log"; then
        echo "✅ Successfully built $version"
        
        # Create version info file
        cat > "$output_dir/version.json" << EOF
{
    "version": "$version",
    "build_date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "build_dir": "$output_dir",
    "source_dir": "$source_dir"
}
EOF
        
        return 0
    else
        echo "❌ Failed to build $version"
        echo "📋 Check build log: $BUILD_DIR/build_$version.log"
        return 1
    fi
}

# Function to get available versions
get_versions() {
    local versions=()
    
    # Add default version
    versions+=("$DEFAULT_VERSION")
    
    # Add versions from versions directory
    if [ -d "$VERSIONS_DIR" ]; then
        for version_dir in "$VERSIONS_DIR"/v*; do
            if [ -d "$version_dir" ]; then
                local version=$(basename "$version_dir")
                if [ "$version" != "$DEFAULT_VERSION" ]; then
                    versions+=("$version")
                fi
            fi
        done
    fi
    
    printf '%s\n' "${versions[@]}"
}

# Function to create version index
create_version_index() {
    local index_file="$BUILD_DIR/html/index.html"
    local versions=($(get_versions))
    
    echo "📝 Creating version index..."
    
    cat > "$index_file" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRA Core Platform Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            background: #f8fafc;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header h1 {
            color: #1e293b;
            margin-bottom: 0.5rem;
        }
        .header p {
            color: #64748b;
            font-size: 1.1rem;
        }
        .version-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .version-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .version-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .version-card.current {
            border-color: #3b82f6;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        }
        .version-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: #1e293b;
        }
        .version-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #10b981;
            color: white;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }
        .version-description {
            color: #64748b;
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }
        .version-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        .version-link:hover {
            background: #2563eb;
            transform: translateY(-1px);
        }
        .footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
        }
        .footer a {
            color: #3b82f6;
            text-decoration: none;
            margin: 0 1rem;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>GRA Core Platform Documentation</h1>
        <p>Comprehensive documentation for all versions of the GRA Core Platform</p>
    </div>
    
    <div class="version-grid">
EOF

    # Add version cards
    for version in "${versions[@]}"; do
        local is_current=""
        local badge=""
        local description="Previous release documentation"
        
        if [ "$version" = "$DEFAULT_VERSION" ]; then
            is_current="current"
            badge='<span class="version-badge">Current</span>'
            description="Latest stable release with all new features"
        fi
        
        cat >> "$index_file" << EOF
        <div class="version-card $is_current">
            <div class="version-title">
                $version
                $badge
            </div>
            <div class="version-description">
                $description
            </div>
            <a href="$version/index.html" class="version-link">View Documentation</a>
        </div>
EOF
    done

    cat >> "$index_file" << 'EOF'
    </div>
    
    <div class="footer">
        <p>
            <a href="https://github.com/bankofamerica/gra-core">GitHub Repository</a>
            <a href="https://github.com/bankofamerica/gra-core/issues">Report Issues</a>
            <a href="mailto:gra-support@bankofamerica.com">Contact Support</a>
        </p>
        <p>© 2024 Bank of America. All rights reserved.</p>
    </div>
</body>
</html>
EOF

    echo "✅ Version index created at $index_file"
}

# Main execution
echo "🚀 Building GRA Core Platform Documentation..."

# Check dependencies first
check_dependencies

# Ensure we're in the right directory
if [ ! -f "$DOCS_DIR/conf.py" ]; then
    echo "❌ conf.py not found in $DOCS_DIR. Please run setup_docs_structure.sh first."
    exit 1
fi

# Generate auto-documentation first
echo "📚 Generating auto-documentation..."
./scripts/generate_autodocs.sh

# Build documentation
if [ "$BUILD_ALL" = true ]; then
    echo "🔨 Building all versions..."
    versions=($(get_versions))
    success_count=0
    
    for version in "${versions[@]}"; do
        if build_version "$version"; then
            ((success_count++))
        fi
    done
    
    echo "✅ Built $success_count/${#versions[@]} versions successfully"
    
    # Create version index
    create_version_index
    
elif [ -n "$VERSION" ]; then
    echo "🔨 Building version $VERSION..."
    build_version "$VERSION"
    
else
    echo "🔨 Building default version $DEFAULT_VERSION..."
    build_version "$DEFAULT_VERSION"
fi

echo "🎉 Documentation build complete!"
echo "📁 Output directory: $BUILD_DIR/html/"

# Show build summary
if [ -d "$BUILD_DIR/html" ]; then
    echo "📊 Built versions:"
    for version_dir in "$BUILD_DIR/html"/*; do
        if [ -d "$version_dir" ]; then
            version=$(basename "$version_dir")
            size=$(du -sh "$version_dir" | cut -f1)
            echo "   - $version ($size)"
        fi
    done
fi
