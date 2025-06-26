# GRA Core Platform Documentation

A comprehensive documentation system combining **Sphinx** for structured documentation and **React** for interactive UI components, specifically designed for the Bank of America GRA Core Platform.

## 🏗️ Architecture

This project follows a hybrid architecture:

- **Frontend** (`/frontend/`): React + TypeScript + Vite for interactive components
- **Documentation** (`/docs/`): Sphinx-based documentation with reStructuredText and Markdown
- **Integration**: React components are built and integrated into Sphinx static files

## 📁 Project Structure

\`\`\`
sphinx-docs-template/
├── frontend/                     # React + TypeScript UI/UX
│   ├── src/
│   │   ├── components/
│   │   │   ├── core/            # Reusable UI elements
│   │   │   ├── shared/          # Composite UI components  
│   │   │   └── features/        # Feature-specific blocks
│   │   ├── pages/               # React pages
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── types/               # TypeScript definitions
│   │   └── utils/               # Utility functions
│   └── package.json
│
├── docs/                        # Sphinx documentation
│   ├── gcp-5.7/0.1/            # Version-specific docs
│   │   ├── _build/              # Generated HTML output
│   │   ├── _static/             # Custom assets
│   │   ├── _templates/          # HTML templates
│   │   ├── conf.py              # Sphinx configuration
│   │   └── *.rst, *.md          # Documentation content
│   ├── _shared_conf/            # Shared Sphinx config
│   └── _extensions/             # Custom Sphinx extensions
│
└── scripts/                     # Build and deployment scripts
    ├── setup-docs.sh            # Initial setup
    ├── build-docs.sh            # Build process
    └── deploy.sh                # Deployment
\`\`\`

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Git**

### Setup

1. **Clone and setup the project:**
   \`\`\`bash
   git clone <repository-url>
   cd sphinx-docs-template
   make setup
   \`\`\`

2. **Start development servers:**
   \`\`\`bash
   # Terminal 1: Sphinx documentation with auto-reload
   make watch
   
   # Terminal 2: React development server
   make dev-frontend
   \`\`\`

3. **Access the documentation:**
   - Sphinx docs: http://localhost:8000
   - React dev server: http://localhost:3000

## 🔧 Development Workflow

### Building Documentation

\`\`\`bash
# Build everything
make build

# Build and serve locally
make serve

# Build with auto-reload (recommended for development)
make watch

# Clean build directories
make clean
\`\`\`

### Frontend Development

\`\`\`bash
# Start React development server
cd frontend
npm run dev

# Build React components
npm run build

# Run tests
npm test

# Lint code
npm run lint
\`\`\`

### Sphinx Documentation

\`\`\`bash
# Build Sphinx docs only
cd docs/gcp-5.7/0.1
sphinx-build -b html . _build/html

# Auto-build with live reload
sphinx-autobuild . _build/html --host 0.0.0.0 --port 8001
\`\`\`

## 📦 Deployment

### GitHub Pages
\`\`\`bash
make deploy
# or
./scripts/deploy.sh github-pages
\`\`\`

### Netlify
\`\`\`bash
./scripts/deploy.sh netlify
\`\`\`

### AWS S3
\`\`\`bash
export AWS_S3_BUCKET=your-bucket-name
export AWS_CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id
./scripts/deploy.sh aws-s3
\`\`\`

## 🎨 Customization

### Adding React Components

1. Create component in `frontend/src/components/`
2. Export from appropriate index file
3. Build frontend: `npm run build`
4. Reference in Sphinx docs using custom directives

### Sphinx Themes and Extensions

- Modify `docs/_shared_conf/base_conf.py` for global settings
- Version-specific config in `docs/gcp-5.7/0.1/conf.py`
- Custom extensions in `docs/_extensions/`

### Styling

- **React**: Tailwind CSS in `frontend/src/styles/`
- **Sphinx**: Custom CSS in `docs/gcp-5.7/0.1/_static/css/`

## 🧪 Testing

\`\`\`bash
# Run all tests
make test

# Frontend tests only
cd frontend && npm test

# Python/Sphinx tests
cd docs/gcp-5.7/0.1 && python -m pytest
\`\`\`

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `make setup` | Initial environment setup |
| `make build` | Build documentation and React components |
| `make serve` | Build and serve locally |
| `make watch` | Development server with auto-reload |
| `make clean` | Clean build directories |
| `make deploy` | Deploy to configured platform |
| `make test` | Run all tests |
| `make lint` | Run code linting |

## 🔧 Configuration

### Environment Variables

\`\`\`bash
# Deployment
AWS_S3_BUCKET=your-s3-bucket
AWS_CLOUDFRONT_DISTRIBUTION_ID=your-cloudfront-id
NETLIFY_SITE_ID=your-netlify-site-id

# Development
DOCS_BASE_URL=http://localhost:8000
REACT_DEV_SERVER=http://localhost:3000
\`\`\`

### Version Management

- Each version has its own directory: `docs/gcp-X.Y/Z.W/`
- Shared configuration in `docs/_shared_conf/`
- Version-specific overrides in individual `conf.py` files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly: `make test && make lint`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Internal Wiki](https://wiki.bankofamerica.com/gra-core)
- **Issues**: [GitHub Issues](https://github.com/gra-core/docs/issues)
- **Email**: gra-support@bankofamerica.com
- **Slack**: #gra-core-support

---

**Built with ❤️ by the GRA Core Team at Bank of America**
\`\`\`

```plaintext file=".gitignore"
# Dependencies
node_modules/
venv/
env/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
frontend/dist/
frontend/build/
docs/gcp-*/*/\_build/
docs/_shared_static/react-build/

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Sphinx
docs/**/doctrees/
docs/**/.doctrees/

# Testing
.pytest_cache/
.coverage
htmlcov/
.tox/
.nox/
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/

# Jupyter Notebook
.ipynb_checkpoints

# pyenv
.python-version

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
