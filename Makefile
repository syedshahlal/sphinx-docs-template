# Makefile for React-Sphinx Documentation

SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build

# React build
REACT_BUILD   = _static/react-dashboard

.PHONY: help clean html react dev serve

help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS)

clean:
	@$(SPHINXBUILD) -M clean "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS)
	@echo "Cleaning React build..."
	@rm -rf $(REACT_BUILD)

# Build React dashboard for Sphinx integration
react:
	@echo "Building React dashboard..."
	@npm run build:sphinx
	@echo "✅ React dashboard built successfully!"

# Build Sphinx documentation with React integration
html: react
	@echo "Building Sphinx documentation..."
	@$(SPHINXBUILD) -b html "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS)
	@echo "✅ Documentation built successfully!"
	@echo "📁 Output: $(BUILDDIR)/html/"

# Development mode - start both React and Sphinx servers
dev:
	@echo "Starting development servers..."
	@echo "React dev server: http://localhost:3000"
	@echo "Sphinx auto-build: http://localhost:8000"
	@npm run dev &
	@sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/html" --host 0.0.0.0 --port 8000

# Serve built documentation
serve: html
	@echo "Starting documentation server at http://localhost:8000"
	@cd $(BUILDDIR)/html && python -m http.server 8000

# Install dependencies
install:
	@echo "Installing Python dependencies..."
	@pip install -r requirements.txt
	@echo "Installing Node.js dependencies..."
	@npm install
	@echo "✅ All dependencies installed!"

# Quick setup for new users
setup: install
	@echo "🚀 Setup complete!"
	@echo ""
	@echo "Available commands:"
	@echo "  make react     - Build React dashboard"
	@echo "  make html      - Build documentation"
	@echo "  make dev       - Start development servers"
	@echo "  make serve     - Serve built documentation"
