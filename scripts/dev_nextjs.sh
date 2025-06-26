#!/bin/bash

# Next.js Development Server
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Next.js Development Server${NC}"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm not found. Please install npm first.${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Set development environment
export NODE_ENV=development

echo -e "${GREEN}🌐 Starting Next.js on http://localhost:3000${NC}"
echo -e "${GREEN}📱 Network access: http://0.0.0.0:3000${NC}"
echo -e "${GREEN}🔄 Hot reload enabled${NC}"
echo -e "${GREEN}🎯 Press Ctrl+C to stop${NC}"
echo ""

# Start Next.js development server
npm run dev

# Pause at the end
echo ""
echo -e "${GREEN}✅ Development server stopped${NC}"
read -p "Press any key to continue..."
