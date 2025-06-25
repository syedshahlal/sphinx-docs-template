# Enhanced Makefile for versioned documentation with React dashboard

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?= -W --keep-going
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build
MULTIVERSION  = sphinx-multiversion
DOCSDIR       = documentation
CURRENT_VERSION = $(shell cat $(DOCSDIR)/current_version.txt 2>/dev/null || echo "v1.0.0")

# React dashboard build
REACT_DIR    = .
REACT_BUILD  = _static/react-dashboard

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile clean html livehtml multiversion docs-init docs-new-version docs-list docs-switch docs-validate docs-build-all react react-dev serve dev

# Initialize documentation structure
docs-init:
	@echo "🚀 Initializing documentation structure..."
	@chmod +x scripts/create_documentation_structure.sh
	@./scripts/create_documentation_structure.sh
	@echo "✅ Documentation structure initialized!"

# Create new documentation version
docs-new-version:
	@echo "📝 Creating new documentation version..."
	@read -p "Enter version number (e.g., 1.1.0): " version; \
	read -p "Enter version message: " message; \
	python scripts/version_manager.py create $$version --message "$$message"

# List all documentation versions
docs-list:
	@echo "📋 Listing documentation versions..."
	@python scripts/version_manager.py list

# Switch current documentation version
docs-switch:
	@echo "🔄 Switching documentation version..."
	@read -p "Enter version to switch to: " version; \
	python scripts/version_manager.py switch $$version

# Validate current documentation
docs-validate:
	@echo "🔍 Validating documentation..."
	@python scripts/version_manager.py validate

# Build current version HTML
html: react
	@echo "🔨 Building current version ($(CURRENT_VERSION)) HTML documentation..."
	@python scripts/documentation_builder.py --version $(CURRENT_VERSION)
	@echo "✅ Build finished. The HTML pages are in $(BUILDDIR)/html/$(CURRENT_VERSION)."

# Build all versions
docs-build-all:
	@echo "🔨 Building all documentation versions..."
	@python scripts/documentation_builder.py --all
	@echo "✅ All versions built successfully!"

# Build with live reload for development (current version)
livehtml:
	@echo "🔄 Starting live reload server for current version ($(CURRENT_VERSION))..."
	@if [ ! -d "$(DOCSDIR)/$(CURRENT_VERSION)" ]; then \
		echo "❌ Current version directory not found. Run 'make docs-init' first."; \
		exit 1; \
	fi
	sphinx-autobuild "$(DOCSDIR)/$(CURRENT_VERSION)" "$(BUILDDIR)/html/$(CURRENT_VERSION)" $(SPHINXOPTS) $(O) \
		--host 0.0.0.0 --port 8000 --open-browser

# Build all versions using sphinx-multiversion
multiversion:
	@echo "🔨 Building multi-version documentation..."
	@$(MULTIVERSION) "$(DOCSDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS)
	@echo "✅ Multi-version build finished. The HTML pages are in $(BUILDDIR)/html."

# Clean build directory
clean:
	@$(SPHINXBUILD) -M clean "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
	@echo "Cleaning React build..."
	@rm -rf $(REACT_BUILD)

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	pip install -r requirements.txt
	@echo "✅ Dependencies installed."

# Development setup
dev-setup: install docs-init
	@echo "🛠️ Setting up development environment..."
	@echo "✅ Development setup complete!"
	@echo "📖 Available commands:"
	@echo "   make docs-new-version  - Create new documentation version"
	@echo "   make docs-list         - List all versions"
	@echo "   make docs-switch       - Switch current version"
	@echo "   make html              - Build current version"
	@echo "   make livehtml          - Start live reload server"
	@echo "   make docs-build-all    - Build all versions"

# Production build with all versions
production: clean docs-build-all
	@echo "🚀 Production build complete!"
	@echo "📁 Documentation available in $(BUILDDIR)/html/"

# Lint documentation
lint:
	@echo "🔍 Linting documentation..."
	@for version_dir in $(DOCSDIR)/v*; do \
		if [ -d "$$version_dir" ]; then \
			echo "Checking $$version_dir..."; \
			sphinx-build -b linkcheck "$$version_dir" "$(BUILDDIR)/linkcheck/$$(basename $$version_dir)" $(SPHINXOPTS); \
		fi \
	done
	@echo "✅ Link check complete."

# Deploy to GitHub Pages
deploy:
	@echo "🚀 Deploying to GitHub Pages..."
	@chmod +x scripts/deploy.sh
	@./scripts/deploy.sh
	@echo "✅ Deployment complete!"

# Show current documentation status
status:
	@echo "📊 Documentation Status:"
	@echo "   Current Version: $(CURRENT_VERSION)"
	@echo "   Documentation Root: $(DOCSDIR)"
	@echo "   Build Directory: $(BUILDDIR)"
	@if [ -d "$(DOCSDIR)" ]; then \
		echo "   Available Versions:"; \
		for version_dir in $(DOCSDIR)/v*; do \
			if [ -d "$$version_dir" ]; then \
				version=$$(basename $$version_dir); \
				if [ "$$version" = "$(CURRENT_VERSION)" ]; then \
					echo "     - $$version (current)"; \
				else \
					echo "     - $$version"; \
				fi \
			fi \
		done \
	else \
		echo "   ❌ Documentation not initialized. Run 'make docs-init'"; \
	fi

# Quick start for new users
quickstart:
	@echo "🚀 GRA Core Platform Documentation Quick Start"
	@echo ""
	@echo "1. Initialize documentation structure:"
	@echo "   make docs-init"
	@echo ""
	@echo "2. Start development server:"
	@echo "   make livehtml"
	@echo ""
	@echo "3. Create new version when ready:"
	@echo "   make docs-new-version"
	@echo ""
	@echo "4. Build all versions for production:"
	@echo "   make production"

# Build React dashboard
react:
	@echo "Building React dashboard..."
	@cd $(REACT_DIR) && npm run build:sphinx

# Start React development server
react-dev:
	@echo "Starting React development server..."
	@cd $(REACT_DIR) && npm run dev

# Serve documentation
serve: html
	@echo "Starting documentation server at http://localhost:8000"
	@cd $(BUILDDIR)/html && python -m http.server 8000

# Development mode
dev:
	@echo "Starting development mode..."
	@echo "React dev server: http://localhost:3000"
	@echo "Sphinx auto-build: http://localhost:8000"
	@make react-dev &
	@sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/html" --host 0.0.0.0 --port 8000

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
