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

.PHONY: help Makefile clean html livehtml autodoc version-build serve

# Generate auto-documentation
autodoc:
	@echo "📚 Generating auto-documentation..."
	@../scripts/generate_autodocs.sh

# Build HTML documentation
html: autodoc
	@echo "🔨 Building HTML documentation..."
	@$(SPHINXBUILD) -b html "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)
	@echo "✅ Build finished. The HTML pages are in $(BUILDDIR)/html."

# Build with live reload
livehtml: autodoc
	@echo "🔄 Starting live reload server..."
	@sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O) \
		--host 0.0.0.0 --port 8000 --open-browser

# Build versioned documentation
version-build:
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

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@pip install -r ../requirements.txt

# Development setup
dev: install autodoc html
	@echo "✅ Development setup complete!"

# Production build
production: clean autodoc version-build
	@echo "🚀 Production build complete!"

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
