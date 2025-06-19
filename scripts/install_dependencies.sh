#!/bin/bash

# Install dependencies script for different operating systems

set -e

# Detect OS
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "🔍 Detected OS: $MACHINE"

# Function to install Python on different systems
install_python() {
    case $MACHINE in
        Linux)
            echo "📦 Installing Python on Linux..."
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install -y python3 python3-pip python3-venv
            elif command -v yum &> /dev/null; then
                sudo yum install -y python3 python3-pip
            elif command -v dnf &> /dev/null; then
                sudo dnf install -y python3 python3-pip
            else
                echo "❌ Unsupported Linux distribution"
                exit 1
            fi
            ;;
        Mac)
            echo "📦 Installing Python on macOS..."
            if command -v brew &> /dev/null; then
                brew install python@3.11
            else
                echo "❌ Homebrew not found. Please install from https://brew.sh/"
                echo "   Or install Python from https://www.python.org/downloads/"
                exit 1
            fi
            ;;
        *)
            echo "❌ Unsupported operating system: $MACHINE"
            echo "   Please install Python manually from https://www.python.org/downloads/"
            exit 1
            ;;
    esac
}

# Function to install Git
install_git() {
    case $MACHINE in
        Linux)
            echo "📦 Installing Git on Linux..."
            if command -v apt-get &> /dev/null; then
                sudo apt-get install -y git
            elif command -v yum &> /dev/null; then
                sudo yum install -y git
            elif command -v dnf &> /dev/null; then
                sudo dnf install -y git
            fi
            ;;
        Mac)
            echo "📦 Installing Git on macOS..."
            if command -v brew &> /dev/null; then
                brew install git
            else
                echo "❌ Homebrew not found. Installing Xcode command line tools..."
                xcode-select --install
            fi
            ;;
    esac
}

# Check and install Python if needed
if ! command -v python3 &> /dev/null; then
    echo "⚠️  Python 3 not found. Installing..."
    install_python
else
    echo "✅ Python 3 found: $(python3 --version)"
fi

# Check and install Git if needed
if ! command -v git &> /dev/null; then
    echo "⚠️  Git not found. Installing..."
    install_git
else
    echo "✅ Git found: $(git --version)"
fi

# Install Node.js (optional)
install_nodejs() {
    case $MACHINE in
        Linux)
            echo "📦 Installing Node.js on Linux..."
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        Mac)
            echo "📦 Installing Node.js on macOS..."
            if command -v brew &> /dev/null; then
                brew install node
            fi
            ;;
    esac
}

# Ask if user wants to install Node.js
read -p "🤔 Install Node.js for advanced features? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if ! command -v node &> /dev/null; then
        install_nodejs
    else
        echo "✅ Node.js already installed: $(node --version)"
    fi
fi

echo "🎉 System dependencies installation complete!"
