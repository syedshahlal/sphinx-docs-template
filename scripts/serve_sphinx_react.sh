#!/bin/bash

# Serve Sphinx Documentation with React Components
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🌐 Starting Sphinx Documentation Server${NC}"

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d ".venv" ]; then
    source .venv/bin/activate
fi

# Build first
./scripts/build_sphinx_with_react.sh

# Serve with auto-reload
echo -e "${GREEN}🚀 Starting auto-reload server on http://localhost:8000${NC}"
sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000 --watch _templates --watch _static
