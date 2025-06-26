#!/bin/bash

# Simple launcher for the interactive setup
# This can be run from the project root

echo "🚀 GRA Core Documentation Setup Launcher"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "scripts/interactive_setup.sh" ]; then
    echo "❌ Error: interactive_setup.sh not found in scripts/ directory"
    echo "Please make sure you're in the project root directory."
    exit 1
fi

# Make the interactive setup script executable
chmod +x scripts/interactive_setup.sh

# Run the interactive setup
exec scripts/interactive_setup.sh "$@"
