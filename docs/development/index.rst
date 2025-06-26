Development Guide
=================

Development workflows, contribution guidelines, and advanced topics.

.. toctree::
   :maxdepth: 2
   :caption: Development:

   setup
   contributing
   coding-standards
   testing-guide
   ci-cd
   debugging
   performance

Development Environment
-----------------------

Setting up your development environment for contributing to GRA Core Platform.

Prerequisites
-------------

* **Python 3.8+** with pip
* **Node.js 16+** with npm/yarn
* **Git** with SSH keys configured
* **Docker** for containerized development
* **VS Code** or preferred IDE

Development Setup
-----------------

.. code-block:: bash

   # Clone the repository
   git clone git@github.com:bankofamerica/gra-core.git
   cd gra-core
   
   # Install dependencies
   pip install -r requirements-dev.txt
   npm install
   
   # Set up pre-commit hooks
   pre-commit install
   
   # Run tests to verify setup
   pytest
   npm test

Contributing Workflow
--------------------

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

Code Standards
--------------

* **Python**: Follow PEP 8, use Black formatter
* **JavaScript**: Follow ESLint configuration
* **Documentation**: Write clear docstrings and comments
* **Testing**: Maintain >90% code coverage

Testing Strategy
----------------

**Unit Tests**
   * Test individual functions and classes
   * Use pytest for Python, Jest for JavaScript
   * Mock external dependencies

**Integration Tests**
   * Test component interactions
   * Use test databases and services
   * Verify API contracts

**End-to-End Tests**
   * Test complete user workflows
   * Use Playwright or Selenium
   * Run in CI/CD pipeline

Debugging Tools
---------------

* **Python**: pdb, pytest-pdb, VS Code debugger
* **JavaScript**: Chrome DevTools, VS Code debugger
* **API**: Postman, curl, httpie
* **Database**: pgAdmin, MongoDB Compass

Performance Guidelines
----------------------

* **Database**: Use indexes, optimize queries
* **API**: Implement caching, pagination
* **Frontend**: Lazy loading, code splitting
* **Monitoring**: Use APM tools, logging
