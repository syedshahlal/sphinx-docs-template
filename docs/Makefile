# Makefile for Sphinx documentation in docs folder

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?= -W --keep-going
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile clean html livehtml autodoc version-build serve validate install

# Validate setup before building
validate:
	@echo "🔍 Validating setup..."
	@../scripts/validate_setup.sh

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@../scripts/install_dependencies.sh

# Generate auto-documentation
autodoc:
	@echo "📚 Generating auto-documentation..."
	@../scripts/generate_autodocs.sh

# Build HTML documentation with validation
html: validate autodoc
	@echo "🔨 Building HTML documentation..."
	@$(SPHINXBUILD) -b html "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)
	@echo "✅ Build finished. The HTML pages are in $(BUILDDIR)/html."

# Build with live reload
livehtml: validate autodoc
	@echo "🔄 Starting live reload server..."
	@sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O) \
		--host 0.0.0.0 --port 8000 --open-browser --watch ../_static --watch ../_themes

# Build versioned documentation
version-build: validate
	@echo "🔨 Building versioned documentation..."
	@../scripts/build_versioned_docs.sh -a

# Serve documentation
serve:
	@echo "🚀 Serving documentation..."
	@../scripts/serve_docs.sh -o

# Clean build directory
clean:
	@echo "🧹 Cleaning build directory..."
	@rm -rf "$(BUILDDIR)"

# Development setup
dev: install validate autodoc html
	@echo "✅ Development setup complete!"

# Production build
production: clean install validate autodoc version-build
	@echo "🚀 Production build complete!"

# Quick development server
dev-server: validate autodoc livehtml

# Test build (quick validation)
test: validate
	@echo "🧪 Running test build..."
	@$(SPHINXBUILD) -b html -q "$(SOURCEDIR)" "$(BUILDDIR)/test" $(SPHINXOPTS)
	@rm -rf "$(BUILDDIR)/test"
	@echo "✅ Test build passed!"

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
