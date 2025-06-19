# Makefile for Sphinx documentation

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?= -W --keep-going
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = .
BUILDDIR      = _build
MULTIVERSION  = sphinx-multiversion

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile clean html livehtml multiversion

# Build single version HTML
html:
	@echo "Building single version HTML documentation..."
	@$(SPHINXBUILD) -b html "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O)
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."

# Build with live reload for development
livehtml:
	@echo "Starting live reload server..."
	sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS) $(O) \
		--host 0.0.0.0 --port 8000 --open-browser

# Build all versions using sphinx-multiversion
multiversion:
	@echo "Building multi-version documentation..."
	@$(MULTIVERSION) "$(SOURCEDIR)" "$(BUILDDIR)/html" $(SPHINXOPTS)
	@echo "Multi-version build finished. The HTML pages are in $(BUILDDIR)/html."

# Clean build directory
clean:
	@echo "Cleaning build directory..."
	rm -rf "$(BUILDDIR)"
	@echo "Clean finished."

# Install dependencies
install:
	@echo "Installing dependencies..."
	pip install -r requirements.txt
	@echo "Dependencies installed."

# Development setup
dev-setup: install
	@echo "Setting up development environment..."
	@echo "Development setup complete. Run 'make livehtml' to start development server."

# Production build with all versions
production: clean multiversion
	@echo "Production build complete."

# Lint documentation
lint:
	@echo "Linting documentation..."
	sphinx-build -b linkcheck "$(SOURCEDIR)" "$(BUILDDIR)/linkcheck" $(SPHINXOPTS)
	@echo "Link check complete."

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
