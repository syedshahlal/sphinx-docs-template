# Scripts Directory

Optimized scripts for GRA Core Documentation setup and development.

## 📋 Script Order (Run in sequence)

### Setup Scripts
1. **`01_check_prerequisites.sh`** - Check system requirements (Python, Node.js, npm)
2. **`02_setup_environment.sh`** - Create virtual environment and install dependencies
3. **`03_extract_components.sh`** - Extract and convert React components for Sphinx
4. **`04_build_docs.sh`** - Build static HTML documentation with Sphinx

### Development Scripts
5. **`05_serve_docs.sh`** - Serve built documentation (production mode)
6. **`06_dev_mode.sh`** - Auto-reload development server

### Utility Scripts
- **`setup_all.sh`** - Run all setup scripts in order (recommended for first-time setup)
- **`interactive_setup.sh`** - Interactive menu to choose what to run

## 🚀 Quick Start

\`\`\`bash
# Complete setup (recommended)
./scripts/setup_all.sh

# Or interactive setup
./scripts/interactive_setup.sh

# Or step by step
./scripts/01_check_prerequisites.sh
./scripts/02_setup_environment.sh
./scripts/03_extract_components.sh
./scripts/04_build_docs.sh
./scripts/05_serve_docs.sh
\`\`\`

## 🔄 Development Workflow

\`\`\`bash
# Start development mode (auto-reload)
./scripts/06_dev_mode.sh

# Or build and serve manually
./scripts/04_build_docs.sh
./scripts/05_serve_docs.sh
\`\`\`

## 📁 What Each Script Does

| Script | Purpose | Output |
|--------|---------|--------|
| `01_check_prerequisites.sh` | Verify Python, Node.js, npm | System check results |
| `02_setup_environment.sh` | Create venv, install packages | `venv/`, `node_modules/` |
| `03_extract_components.sh` | Convert React to Sphinx | `_static/react-components/` |
| `04_build_docs.sh` | Generate HTML docs | `_build/html/` |
| `05_serve_docs.sh` | Start HTTP server | Server on port 8000 |
| `06_dev_mode.sh` | Auto-reload server | Development server |

All scripts are now numbered in logical execution order! 🎯
