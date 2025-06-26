#!/bin/bash

# Python Installation Checker and Guide
# Helps users install Python if it's missing

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

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

check_python_detailed() {
    print_header "Python Installation Check"
    
    local python_found=false
    local python_cmd=""
    local python_version=""
    local pip_available=false
    
    # Check for python3
    if command -v python3 >/dev/null 2>&1; then
        python_cmd="python3"
        python_version=$(python3 --version 2>&1)
        print_success "Found python3: $python_version"
        python_found=true
        
        # Check version compatibility
        if python3 -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
            print_success "Python version is compatible (3.8+)"
        else
            print_warning "Python version may be too old. Recommended: 3.8+"
        fi
        
        # Check pip3
        if command -v pip3 >/dev/null 2>&1; then
            print_success "Found pip3: $(pip3 --version)"
            pip_available=true
        else
            print_warning "pip3 not found"
        fi
        
    # Check for python
    elif command -v python >/dev/null 2>&1; then
        python_version=$(python --version 2>&1)
        print_info "Found python: $python_version"
        
        # Check if it's Python 3
        if python -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
            python_cmd="python"
            python_found=true
            print_success "Python version is compatible (3.8+)"
            
            # Check pip
            if command -v pip >/dev/null 2>&1; then
                print_success "Found pip: $(pip --version)"
                pip_available=true
            else
                print_warning "pip not found"
            fi
        else
            print_error "Found Python 2. Python 3.8+ is required."
        fi
        
    # Check for py (Windows)
    elif command -v py >/dev/null 2>&1; then
        python_version=$(py --version 2>&1)
        print_info "Found py launcher: $python_version"
        
        if py -c "import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)" 2>/dev/null; then
            python_cmd="py"
            python_found=true
            print_success "Python version is compatible (3.8+)"
            
            # Check pip with py launcher
            if py -m pip --version >/dev/null 2>&1; then
                print_success "Found pip via py launcher"
                pip_available=true
            else
                print_warning "pip not available via py launcher"
            fi
        else
            print_error "Python version too old or not found via py launcher"
        fi
    fi
    
    # Summary
    echo ""
    print_header "Summary"
    
    if [ "$python_found" = true ]; then
        print_success "Python 3.8+ is available: $python_cmd"
        
        if [ "$pip_available" = true ]; then
            print_success "Package installer (pip) is available"
            print_success "✅ Your system is ready for GRA Core Documentation setup!"
            echo ""
            print_info "Next steps:"
            echo "  1. Run: ./scripts/interactive_setup.sh"
            echo "  2. Choose 'Complete Setup' option"
            echo "  3. Follow the prompts"
            return 0
        else
            print_warning "pip is not available. You may need to install it."
            show_pip_installation_guide "$python_cmd"
            return 1
        fi
    else
        print_error "Python 3.8+ is not available on your system"
        show_python_installation_guide
        return 1
    fi
}

show_pip_installation_guide() {
    local python_cmd="$1"
    
    echo ""
    print_info "📦 Installing pip:"
    echo ""
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macOS:"
        echo "  curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py"
        echo "  $python_cmd get-pip.py"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "Linux:"
        if command -v apt-get >/dev/null 2>&1; then
            echo "  sudo apt update && sudo apt install python3-pip"
        elif command -v yum >/dev/null 2>&1; then
            echo "  sudo yum install python3-pip"
        else
            echo "  Use your package manager to install python3-pip"
        fi
    else
        echo "General:"
        echo "  $python_cmd -m ensurepip --upgrade"
        echo "  or download get-pip.py from https://bootstrap.pypa.io/get-pip.py"
    fi
}

show_python_installation_guide() {
    echo ""
    print_info "🐍 Python Installation Guide:"
    echo ""
    
    # Detect OS and show specific instructions
    case "$OSTYPE" in
        darwin*)
            print_info "📱 macOS:"
            echo ""
            echo "Option 1 - Homebrew (Recommended):"
            echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            echo "  brew install python@3.11"
            echo ""
            echo "Option 2 - Official Installer:"
            echo "  Visit: https://www.python.org/downloads/macos/"
            echo "  Download Python 3.11+ installer"
            echo ""
            echo "Option 3 - pyenv:"
            echo "  brew install pyenv"
            echo "  pyenv install 3.11.0"
            echo "  pyenv global 3.11.0"
            ;;
            
        linux-gnu*)
            print_info "🐧 Linux:"
            echo ""
            
            if command -v apt-get >/dev/null 2>&1; then
                echo "Ubuntu/Debian:"
                echo "  sudo apt update"
                echo "  sudo apt install python3.11 python3.11-pip python3.11-venv"
                echo "  sudo apt install python3-pip python3-venv  # fallback"
            elif command -v yum >/dev/null 2>&1; then
                echo "CentOS/RHEL:"
                echo "  sudo yum install python39 python39-pip"
                echo "  # or for newer versions:"
                echo "  sudo dnf install python3 python3-pip"
            elif command -v pacman >/dev/null 2>&1; then
                echo "Arch Linux:"
                echo "  sudo pacman -S python python-pip"
            else
                echo "Generic Linux:"
                echo "  Use your distribution's package manager"
                echo "  Look for packages: python3, python3-pip, python3-venv"
            fi
            
            echo ""
            echo "Alternative - Build from source:"
            echo "  wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0.tgz"
            echo "  tar xzf Python-3.11.0.tgz"
            echo "  cd Python-3.11.0"
            echo "  ./configure --enable-optimizations"
            echo "  make -j 8"
            echo "  sudo make altinstall"
            ;;
            
        msys*|cygwin*|win32*)
            print_info "🪟 Windows:"
            echo ""
            echo "Option 1 - Official Installer (Recommended):"
            echo "  1. Visit: https://www.python.org/downloads/windows/"
            echo "  2. Download Python 3.11+ installer"
            echo "  3. ⚠️  IMPORTANT: Check 'Add Python to PATH' during installation"
            echo "  4. Choose 'Install for all users' if you have admin rights"
            echo ""
            echo "Option 2 - Microsoft Store:"
            echo "  1. Open Microsoft Store"
            echo "  2. Search for 'Python 3.11'"
            echo "  3. Install the official Python package"
            echo ""
            echo "Option 3 - Package Managers:"
            echo "  Chocolatey: choco install python"
            echo "  Scoop: scoop install python"
            echo "  Winget: winget install Python.Python.3"
            ;;
            
        *)
            print_info "🖥️  General Installation:"
            echo ""
            echo "Visit: https://www.python.org/downloads/"
            echo "Download Python 3.8+ for your operating system"
            ;;
    esac
    
    echo ""
    print_info "📋 After Installation:"
    echo "1. Close and reopen your terminal/command prompt"
    echo "2. Verify: python3 --version (or python --version)"
    echo "3. Verify pip: python3 -m pip --version"
    echo "4. Run this checker again: ./scripts/check_python.sh"
    echo "5. Then run: ./scripts/interactive_setup.sh"
}

# Main execution
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
    check_python_detailed
fi
