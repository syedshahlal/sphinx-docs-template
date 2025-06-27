Getting Started with GRA Core Platform v5.8 Beta
=================================================

.. warning::
   **Beta Release Notice**
   
   This is a beta version intended for testing and development. Do not use in production environments.
   For production deployments, use the `stable v5.7 release <../../gcp-5.7/index.html>`_.

Welcome to the GRA Core Platform v5.8 Beta! This guide will help you get up and running quickly with the latest features and improvements.

Prerequisites
=============

Before installing GRA Core Platform v5.8 Beta, ensure you have:

System Requirements
-------------------

**Minimum Requirements:**
- CPU: 4 cores, 2.4 GHz
- RAM: 8 GB
- Storage: 50 GB available space
- Network: Broadband internet connection

**Recommended Requirements:**
- CPU: 8 cores, 3.0 GHz or higher
- RAM: 16 GB or more
- Storage: 100 GB SSD
- Network: High-speed internet (100 Mbps+)

Software Dependencies
---------------------

**Required:**
- Node.js 18.x or higher
- Python 3.9 or higher
- Docker 20.10 or higher
- Git 2.30 or higher

**Optional but Recommended:**
- Kubernetes 1.24+
- Redis 6.2+
- PostgreSQL 13+
- MongoDB 5.0+

Installation Methods
====================

Choose your preferred installation method:

1. **NPM Installation** (Recommended)
   
   .. code-block:: bash
   
      # Install the beta version
      npm install -g @gra/core-platform@5.8.0-beta
   
      # Verify installation
      gra-cli --version
      # Expected output: GRA Core Platform v5.8.0-beta

   .. code-block:: bash
   
      # Initialize a new project
      gra-cli init my-project --template beta
      cd my-project
   
      # Install dependencies
      npm install
   
      # Start development server
      npm run dev

2. **Python Installation**
   
   .. code-block:: bash
   
      # Create virtual environment
      python -m venv gra-env
      source gra-env/bin/activate  # On Windows: gra-env\Scripts\activate
   
      # Install beta version
      pip install gra-core-platform==5.8.0b1
   
      # Verify installation
      python -c "import gra_platform; print(gra_platform.__version__)"

3. **Docker Installation**
   
   .. code-block:: bash
   
      # Pull the beta image
      docker pull bankofamerica/gra-core-platform:5.8.0-beta
   
      # Run container
      docker run -d \
        --name gra-platform-beta \
        -p 8080:8080 \
        -p 9090:9090 \
        -e GRA_ENV=development \
        bankofamerica/gra-core-platform:5.8.0-beta

4. **Kubernetes Deployment**
   
   .. code-block:: bash
   
      # Add Helm repository
      helm repo add gra-platform https://charts.gra-platform.com
      helm repo update
   
      # Install beta version
      helm install gra-platform-beta gra-platform/gra-core \
        --version 5.8.0-beta \
        --namespace gra-system \
        --create-namespace \
        --set image.tag=5.8.0-beta

Configuration
=============

Basic Configuration
-------------------

Create a configuration file ``gra-config.yaml``:

.. code-block:: yaml

   # GRA Core Platform v5.8 Beta Configuration
   version: "5.8.0-beta"
   
   # API Configuration
   api:
     host: "localhost"
     port: 8080
     ssl: false
     cors:
       enabled: true
       origins: ["http://localhost:3000"]
   
   # Database Configuration
   database:
     type: "postgresql"
     host: "localhost"
     port: 5432
     name: "gra_platform_beta"
     username: "gra_user"
     password: "secure_password"
     ssl: false
   
   # Cache Configuration (New in v5.8)
   cache:
     type: "redis"
     host: "localhost"
     port: 6379
     cluster: false
     ttl: 3600
   
   # Security Configuration (Enhanced in v5.8)
   security:
     encryption:
       algorithm: "AES-256-GCM"
       key_rotation: true
       key_rotation_interval: "30d"
     authentication:
       mfa_enabled: true
       session_timeout: "24h"
       max_login_attempts: 5
   
   # Monitoring Configuration (New in v5.8)
   monitoring:
     enabled: true
     metrics:
       prometheus: true
       grafana: true
     logging:
       level: "info"
       format: "json"
       output: "stdout"

Environment Variables
---------------------

.. code-block:: bash

   # Core Configuration
   export GRA_VERSION=5.8.0-beta
   export GRA_ENV=development
   export GRA_CONFIG_PATH=./gra-config.yaml
   
   # API Configuration
   export GRA_API_HOST=localhost
   export GRA_API_PORT=8080
   export GRA_API_KEY=your-api-key-here
   
   # Database Configuration
   export GRA_DB_URL=postgresql://user:pass@localhost:5432/gra_beta
   
   # Security Configuration (New in v5.8)
   export GRA_ENCRYPTION_KEY=your-256-bit-encryption-key
   export GRA_JWT_SECRET=your-jwt-secret-key
   
   # Feature Flags (Beta Features)
   export GRA_ENABLE_GRAPHQL=true
   export GRA_ENABLE_REALTIME=true
   export GRA_ENABLE_ANALYTICS=true

First Steps
===========

1. **Verify Installation**

.. code-block:: bash

   # Check version
   gra-cli version
   
   # Check system status
   gra-cli status
   
   # Run health check
   gra-cli health

2. **Create Your First Project**

.. code-block:: bash

   # Create new project
   gra-cli create project my-first-app
   cd my-first-app
   
   # Generate sample code
   gra-cli generate component user-dashboard
   gra-cli generate api user-service

3. **Start Development Server**

.. code-block:: bash

   # Start all services
   gra-cli start
   
   # Or start specific services
   gra-cli start api
   gra-cli start ui
   gra-cli start worker

4. **Access the Platform**

- **Web UI**: http://localhost:8080
- **API Documentation**: http://localhost:8080/docs
- **GraphQL Playground**: http://localhost:8080/graphql
- **Monitoring Dashboard**: http://localhost:9090

Beta Features to Try
====================

GraphQL API (New)
-----------------

.. code-block:: javascript

   // GraphQL query example
   const query = `
     query GetUsers($limit: Int!) {
       users(limit: $limit) {
         id
         name
         email
         profile {
           avatar
           department
         }
       }
     }
   `;
   
   const response = await fetch('/graphql', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ query, variables: { limit: 10 } })
   });

Real-time Analytics (Enhanced)
------------------------------

.. code-block:: python

   from gra_platform import Analytics
   
   # Initialize analytics client
   analytics = Analytics(version='5.8.0-beta')
   
   # Track custom events
   analytics.track('user_action', {
       'action': 'button_click',
       'component': 'dashboard',
       'user_id': '12345'
   })
   
   # Get real-time metrics
   metrics = analytics.get_realtime_metrics()
   print(f"Active users: {metrics['active_users']}")

Enhanced Security (New)
-----------------------

.. code-block:: bash

   # Enable MFA for user
   gra-cli user mfa enable --user-id 12345
   
   # Generate API key with specific permissions
   gra-cli api-key create --name "beta-testing" --permissions "read,write"
   
   # Audit security events
   gra-cli security audit --since "24h"

Next Steps
==========

Now that you have GRA Core Platform v5.8 Beta installed and configured:

1. **Complete the Quickstart Tutorial**: :doc:`quickstart`
2. **Explore the API Reference**: :doc:`../api-reference/index`
3. **Learn about New Features**: :doc:`../platform-overview/index`
4. **Join the Beta Community**: https://community.gra-platform.com/beta

Troubleshooting
===============

Common Issues
-------------

**Installation Fails**
   - Ensure you have the correct Node.js/Python version
   - Clear npm/pip cache: ``npm cache clean --force`` or ``pip cache purge``
   - Check network connectivity and proxy settings

**Service Won't Start**
   - Check port availability: ``netstat -tulpn | grep :8080``
   - Verify configuration file syntax
   - Check logs: ``gra-cli logs --tail 100``

**Database Connection Issues**
   - Verify database is running and accessible
   - Check connection string format
   - Ensure database user has proper permissions

Getting Help
============

- **Documentation**: Complete guides and API reference
- **Community Forum**: https://community.gra-platform.com
- **GitHub Issues**: Report bugs and request features
- **Email Support**: gra-platform-beta@bankofamerica.com
- **Slack Channel**: #gra-platform-beta
