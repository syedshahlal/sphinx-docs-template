# GRA Core Platform Documentation

A comprehensive, versioned documentation system for the GRA Core Platform built with Sphinx and designed for local development and deployment.

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git
- Node.js (optional, for enhanced development)

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/gra-community/gra-core-docs.git
   cd gra-core-docs
   \`\`\`

2. **Set up Python virtual environment:**
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. **Install dependencies:**
   \`\`\`bash
   make install
   # or manually: pip install -r requirements.txt
   \`\`\`

4. **Initialize documentation structure:**
   \`\`\`bash
   make docs-init
   \`\`\`

## 📁 Documentation Structure

\`\`\`
documentation/
├── v1.0.0/                    # Current version
│   ├── user-guide/           # User documentation
│   │   ├── installation.rst
│   │   ├── getting-started.rst
│   │   └── advanced-usage.rst
│   ├── api-reference/        # API documentation
│   │   ├── core-api.rst
│   │   └── extensions.rst
│   ├── examples/             # Code examples
│   ├── tutorials/            # Step-by-step guides
│   ├── contributing/         # Contribution guidelines
│   ├── migration/            # Migration guides
│   ├── troubleshooting/      # Common issues
│   └── index.rst            # Main index
├── v1.1.0/                   # Future versions
├── current_version.txt       # Version tracking
└── README.md
\`\`\`

## 🛠️ Local Development

### Start Development Server

\`\`\`bash
make livehtml
\`\`\`

This will:
- Build the current version documentation
- Start a live-reload server at `http://localhost:8000`
- Automatically rebuild when files change

### Build Documentation

**Build current version:**
\`\`\`bash
make html
\`\`\`

**Build all versions:**
\`\`\`bash
make docs-build-all
\`\`\`

**Build specific version:**
\`\`\`bash
python scripts/documentation_builder.py --version v1.0.0
\`\`\`

## 📝 Version Management

### Create New Version

\`\`\`bash
make docs-new-version
\`\`\`

You'll be prompted to enter:
- Version number (e.g., 1.1.0)
- Version message (e.g., "Added new API features")

### List All Versions

\`\`\`bash
make docs-list
\`\`\`

### Switch Current Version

\`\`\`bash
make docs-switch
\`\`\`

### Check Documentation Status

\`\`\`bash
make status
\`\`\`

## 🚀 Deployment

### Local Deployment

1. **Build all versions:**
   \`\`\`bash
   make production
   \`\`\`

2. **Serve locally:**
   \`\`\`bash
   python scripts/serve.py
   \`\`\`
   Documentation will be available at `http://localhost:8080`

### GitHub Pages Deployment

1. **Automated deployment:**
   \`\`\`bash
   make deploy
   \`\`\`

2. **Manual deployment:**
   \`\`\`bash
   # Build documentation
   make production
   
   # Deploy to gh-pages branch
   ./scripts/deploy.sh
   \`\`\`

### Custom Server Deployment

1. **Build documentation:**
   \`\`\`bash
   make production
   \`\`\`

2. **Copy build files:**
   \`\`\`bash
   # Copy _build/html/ to your web server
   rsync -av _build/html/ user@server:/var/www/docs/
   \`\`\`

## 🔧 Configuration

### Sphinx Configuration

Edit `conf.py` to customize:
- Project information
- Theme settings
- Extensions
- Build options

### Version Configuration

Edit `documentation/versions.json` to manage:
- Available versions
- Version labels
- Default version

### Theme Customization

Modify theme files in `_themes/gra_boa_theme/`:
- `layout.html` - Main template
- `theme.conf` - Theme configuration
- Custom CSS in `_static/css/`

## 📚 Writing Documentation

### RestructuredText (.rst) Files

\`\`\`rst
Chapter Title
=============

Section Title
-------------

Subsection Title
~~~~~~~~~~~~~~~~

**Bold text** and *italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

.. code-block:: python

   def hello_world():
       print("Hello, World!")

.. note::
   This is a note box.

.. warning::
   This is a warning box.
\`\`\`

### Markdown (.md) Files (with MyST)

\`\`\`markdown
# Chapter Title

## Section Title

### Subsection Title

**Bold text** and *italic text*

- Bullet point
- Another point

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

\`\`\`{note}
This is a note box.
\`\`\`

\`\`\`{warning}
This is a warning box.
\`\`\`
\`\`\`

## 🔍 Quality Assurance

### Validate Documentation

\`\`\`bash
make docs-validate
\`\`\`

### Link Checking

\`\`\`bash
make lint
\`\`\`

### Build Testing

\`\`\`bash
# Test current version
make html

# Test all versions
make docs-build-all
\`\`\`

## 🐛 Troubleshooting

### Common Issues

**1. Build Errors:**
\`\`\`bash
# Clean build directory
make clean

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Rebuild
make html
\`\`\`

**2. Version Issues:**
\`\`\`bash
# Check current version
make status

# Reset to specific version
make docs-switch
\`\`\`

**3. Missing Dependencies:**
\`\`\`bash
# Install all dependencies
make install

# Check Python version
python --version  # Should be 3.8+
\`\`\`

**4. Port Already in Use:**
\`\`\`bash
# Kill process using port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
sphinx-autobuild documentation/v1.0.0 _build/html/v1.0.0 --port 8001
\`\`\`

### Debug Mode

Enable verbose output:
\`\`\`bash
SPHINXOPTS="-v" make html
\`\`\`

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `make docs-init` | Initialize documentation structure |
| `make docs-new-version` | Create new documentation version |
| `make docs-list` | List all available versions |
| `make docs-switch` | Switch current working version |
| `make html` | Build current version HTML |
| `make livehtml` | Start development server with live reload |
| `make docs-build-all` | Build all versions |
| `make multiversion` | Build using sphinx-multiversion |
| `make clean` | Clean build directory |
| `make lint` | Check documentation links |
| `make deploy` | Deploy to GitHub Pages |
| `make status` | Show documentation status |
| `make production` | Full production build |

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch:** `git checkout -b feature/new-docs`
3. **Make changes** in appropriate version folder
4. **Test locally:** `make livehtml`
5. **Create new version if needed:** `make docs-new-version`
6. **Submit pull request**

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add cross-references
- Test all examples
- Follow RST/Markdown conventions

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/gra-community/gra-core-docs/issues)
- **Discussions:** [GitHub Discussions](https://github.com/gra-community/gra-core-docs/discussions)
- **Documentation:** [Online Docs](https://gra-community.github.io/gra-core-docs/)

## 📄 License

This documentation is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Happy documenting! 📚✨**
