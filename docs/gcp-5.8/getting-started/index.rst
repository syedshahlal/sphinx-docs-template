Getting Started with GRA Core Platform v5.8 Beta
=================================================

.. warning::
   This is **BETA** software. Please test thoroughly before production use.

Welcome to GRA Core Platform v5.8 Beta! This guide will help you get up and 
running with the latest features and improvements.

Prerequisites
-------------

Before installing GRA Core Platform v5.8 Beta, ensure you have:

**System Requirements**
   - **OS**: Linux (Ubuntu 20.04+, RHEL 8+, CentOS 8+) or macOS 11+
   - **Memory**: Minimum 8GB RAM (16GB recommended)
   - **Storage**: 50GB available disk space
   - **CPU**: 4+ cores recommended
   - **Network**: Stable internet connection

**Software Dependencies**
   - **Docker**: v20.10+ and Docker Compose v2.0+
   - **Kubernetes**: v1.24+ (for container deployments)
   - **Node.js**: v18+ (for SDK development)
   - **Python**: v3.9+ (for Python SDK)
   - **Java**: OpenJDK 11+ (for Java SDK)

**Database Support**
   - **PostgreSQL**: v13+ (recommended)
   - **MySQL**: v8.0+
   - **MongoDB**: v5.0+
   - **Redis**: v6.0+ (for caching)

Installation Methods
--------------------

Choose your preferred installation method:

1. **Docker Compose** (Recommended for development)
   
   .. code-block:: bash
   
      # Download the beta compose file
      curl -O https://releases.gra-core.com/v5.8-beta/docker-compose.yml
      
      # Start the platform
      docker-compose up -d
      
      # Verify installation
      curl http://localhost:8080/health

2. **Kubernetes Deployment**
   
   .. code-block:: bash
   
      # Add the Helm repository
      helm repo add gra-core https://charts.gra-core.com
      helm repo update
      
      # Install v5.8 beta
      helm install gra-core gra-core/platform \
        --version 5.8.0-beta \
        --namespace gra-core \
        --create-namespace

3. **Binary Installation**
   
   .. code-block:: bash
   
      # Download the binary
      wget https://releases.gra-core.com/v5.8-beta/gra-core-linux-amd64.tar.gz
      
      # Extract and install
      tar -xzf gra-core-linux-amd64.tar.gz
      sudo mv gra-core /usr/local/bin/
      
      # Initialize configuration
      gra-core init --version=5.8-beta

Quick Start Tutorial
--------------------

Once installed, follow these steps to get started:

**Step 1: Initialize Your Workspace**

.. code-block:: bash

   # Create a new project
   gra-core create-project my-first-app
   cd my-first-app
   
   # Initialize with beta features
   gra-core init --enable-beta-features

**Step 2: Configure Authentication**

.. code-block:: yaml

   # config/auth.yml
   authentication:
     provider: "oauth2"
     mfa_enabled: true  # New in v5.8
     session_timeout: 3600
     jwt_secret: "your-secret-key"

**Step 3: Set Up Your First API Endpoint**

.. code-block:: javascript

   // Using the new GraphQL API (Beta feature)
   const { GraphQLServer } = require('@gra-core/graphql-beta');
   
   const server = new GraphQLServer({
     typeDefs: `
       type Query {
         hello(name: String!): String
       }
     `,
     resolvers: {
       Query: {
         hello: (_, { name }) => `Hello, ${name}! Welcome to GRA Core v5.8 Beta`
       }
     }
   });
   
   server.start({ port: 4000 });

**Step 4: Test Your Setup**

.. code-block:: bash

   # Test REST API
   curl http://localhost:8080/api/v1/health
   
   # Test GraphQL API (New in v5.8)
   curl -X POST http://localhost:4000/graphql \
     -H "Content-Type: application/json" \
     -d '{"query": "{ hello(name: \"World\") }"}'

Beta Features to Explore
-------------------------

**1. Enhanced Analytics Dashboard**
   Access the new real-time dashboard at ``http://localhost:8080/dashboard``

**2. GraphQL Playground**
   Interactive GraphQL explorer at ``http://localhost:4000/playground``

**3. WebSocket Connections**
   Real-time data streaming capabilities

**4. Advanced Monitoring**
   Comprehensive metrics and alerting system

Next Steps
----------

- :doc:`quickstart` - Complete tutorial with examples
- :doc:`../api-reference/index` - Explore the new APIs
- :doc:`../user-guide/configuration` - Advanced configuration options
- :doc:`../migration-guides/index` - Migrating from v5.7

Need Help?
----------

- **Documentation**: Continue reading this guide
- **Community**: Join our `Discord server <https://discord.gg/gra-core>`_
- **Support**: Email beta-feedback@gra-core.com
- **Issues**: Report bugs on `GitHub <https://github.com/gra-core/platform/issues>`_

.. note::
   **Beta Limitations**: Some features may have limited functionality or 
   require additional configuration. Please refer to the 
   :doc:`../troubleshooting/index` section for known issues.
