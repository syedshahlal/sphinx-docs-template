#!/bin/bash

# Ensure script doesn't close immediately
set -e
trap 'echo "Script failed at line $LINENO. Press any key to exit..."; read -n 1' ERR

# Add debug mode
if [[ "${1}" == "--debug" ]]; then
    set -x
fi

# Setup Environment - Create venv and install dependencies
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🛠️  Setting Up Environment${NC}"
echo "=========================="

# Create virtual environment
if [ ! -d "venv" ]; then
    echo -e "${GREEN}📦 Creating Python virtual environment...${NC}"
    python -m venv venv
else
    echo -e "${GREEN}📦 Virtual environment already exists${NC}"
fi

# Activate virtual environment
source venv/Scripts/activate
echo -e "${GREEN}✅ Virtual environment activated${NC}"

# Create requirements.txt if it doesn't exist
if [ ! -f "requirements.txt" ]; then
    echo -e "${GREEN}📝 Creating requirements.txt...${NC}"
    cat > requirements.txt << 'EOF'
sphinx>=7.0.0
sphinx-rtd-theme>=1.3.0
sphinx-copybutton>=0.5.0
sphinx-design>=0.5.0
myst-parser>=2.0.0
beautifulsoup4>=4.12.0
lxml>=4.9.0
pyyaml>=6.0
jinja2>=3.1.0
watchdog>=3.0.0
EOF
fi

# Install Python dependencies
echo -e "${GREEN}📦 Installing Python dependencies...${NC}"
pip install --upgrade pip
pip install -r requirements.txt

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ] && command -v npm &> /dev/null; then
    echo -e "${GREEN}📦 Installing Node.js dependencies...${NC}"
    npm install
elif [ ! -f "package.json" ] && command -v npm &> /dev/null; then
    echo -e "${GREEN}📝 Creating package.json...${NC}"
    cat > package.json << 'EOF'
{
  "name": "gra-core-docs",
  "version": "1.0.0",
  "description": "GRA Core Platform Documentation with React Integration",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/node": "20.8.0",
    "@types/react": "18.2.0",
    "@types/react-dom": "18.2.0",
    "typescript": "5.2.2"
  }
}
EOF
    npm install
fi

# Create necessary directories
echo -e "${GREEN}📁 Creating project structure...${NC}"
mkdir -p {_static/{css,js},_templates,_extensions,docs,components,app}

echo -e "${GREEN}🎉 Environment setup completed!${NC}"
echo ""
echo "Press any key to continue..."
read -n 1 -s
