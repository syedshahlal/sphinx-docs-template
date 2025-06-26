# GRA Core Platform Documentation Setup Guide

This guide explains when and how to run the various scripts in the GRA Core Platform documentation project.

## Initial Setup (First Time Only)

Run these commands in order when setting up the project for the first time:

\`\`\`bash
# 1. Create the documentation structure
./scripts/create_documentation_structure.sh

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Install Node.js dependencies
npm install
\`\`\`

## Daily Development Workflow

### For Next.js Web App Development
\`\`\`bash
# Start the development server (runs continuously)
npm run dev
\`\`\`
Access at: `http://localhost:3000`

### For Documentation Content Editing
\`\`\`bash
# Build and serve with live reload (runs continuously)
make livehtml
# OR
python scripts/serve.py --port 8000
\`\`\`
Access at: `http://localhost:8000`

## When Adding New Content

After making changes to documentation content:

\`\`\`bash
# 1. Build the documentation
./scripts/build.sh
# OR
make html

# 2. Validate the build
python scripts/version_manager.py validate
\`\`\`

## Version Management (When Ready for New Release)

When you're ready to create a new version:

\`\`\`bash
# 1. Create a new version
python scripts/version_manager.py create 1.1.0 --message "Added new features"

# 2. Build all versions
python scripts/documentation_builder.py --all

# 3. Switch to the new version as current
python scripts/version_manager.py switch 1.1.0
\`\`\`

## Production Deployment

For deploying to production:

\`\`\`bash
# 1. Build everything for production
make production

# 2. Deploy (if using GitHub Pages or similar)
./scripts/deploy.sh
\`\`\`

## Troubleshooting/Maintenance

Common maintenance commands:

\`\`\`bash
# Check current status
make status

# List all versions
python scripts/version_manager.py list

# Validate documentation
python scripts/version_manager.py validate

# Clean and rebuild
make clean
make html
\`\`\`

## Script Running Schedule

| Script | When to Run | Frequency |
|--------|-------------|-----------|
| `create_documentation_structure.sh` | Initial setup only | Once |
| `build.sh` | After content changes | As needed |
| `serve.py` | Development/testing | During development |
| `version_manager.py` | Version releases | Per release cycle |
| `documentation_builder.py` | Production builds | Before deployment |
| `deploy.sh` | Production deployment | Per release |

## Quick Commands for Common Tasks

### Start Fresh Development Session
\`\`\`bash
npm run dev
\`\`\`

### Quick Build and Test
\`\`\`bash
make html && python scripts/serve.py
\`\`\`

### Prepare for Release
\`\`\`bash
make production
\`\`\`

### Emergency Rebuild
\`\`\`bash
make clean && make docs-build-all
\`\`\`

## Development Modes

### 1. Web App Development Mode
- **Command**: `npm run dev`
- **Use Case**: Working on the React/Next.js interface
- **Port**: 3000
- **Features**: Hot reload, component development

### 2. Documentation Editing Mode
- **Command**: `make livehtml`
- **Use Case**: Writing and editing documentation content
- **Port**: 8000
- **Features**: Live reload for .rst/.md files

### 3. Production Testing Mode
- **Command**: `make production && python scripts/serve.py`
- **Use Case**: Testing the final build before deployment
- **Port**: 8000
- **Features**: Production-optimized build

## Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Make utility
- Git

### Required Dependencies
\`\`\`bash
# Python packages
pip install -r requirements.txt

# Node.js packages
npm install
\`\`\`

## Common Workflows

### New Developer Onboarding
1. Clone the repository
2. Run initial setup commands
3. Start development with `npm run dev`
4. Test documentation build with `make html`

### Content Author Workflow
1. Start live documentation server: `make livehtml`
2. Edit .rst or .md files
3. Preview changes in browser
4. Build final version: `make html`

### Release Manager Workflow
1. Create new version: `python scripts/version_manager.py create X.X.X`
2. Build all versions: `python scripts/documentation_builder.py --all`
3. Deploy: `./scripts/deploy.sh`

## Troubleshooting

### Common Issues

**Port Already in Use**
\`\`\`bash
# Kill processes on port 3000 or 8000
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
\`\`\`

**Build Errors**
\`\`\`bash
# Clean and rebuild
make clean
rm -rf node_modules
npm install
make html
\`\`\`

**Extension Errors**
\`\`\`bash
# Check Python dependencies
pip install -r requirements.txt --upgrade
\`\`\`

## Pro Tips

- **Daily Development**: Most day-to-day work only needs `npm run dev`
- **Content Editing**: Use `make livehtml` for real-time documentation preview
- **Version Control**: Always validate builds before committing changes
- **Performance**: Use production builds for deployment testing

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Validate your environment setup
3. Review the build logs for specific errors
4. Consult the project README.md for additional details
