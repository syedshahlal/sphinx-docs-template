Getting Started with GRA Core Platform v5.8 Beta
=================================================

.. raw:: html

   <div class="getting-started-hero">
     <h2>🚀 Ready to Get Started?</h2>
     <p>Follow our step-by-step guide to have GRA Core Platform running in under 30 minutes.</p>
     <div class="time-estimate">
       <span class="icon">⏱️</span>
       <span>Estimated time: 20-30 minutes</span>
     </div>
   </div>

.. warning::
   **Beta Release Notice**
   
   This is a beta version intended for testing and development. Do not use in production environments.
   For production deployments, use the `stable v5.7 release <../../gcp-5.7/index.html>`_.

Welcome to the GRA Core Platform v5.8 Beta! This guide will walk you through everything you need to know to get started with the platform, from initial setup to your first deployment.

Prerequisites
=============

Before you begin, ensure you have the following prerequisites in place:

System Requirements
-------------------

.. list-table:: Minimum Requirements
   :widths: 30 70
   :header-rows: 1

   * - Component
     - Specification
   * - **Operating System**
     - RHEL 8+, Ubuntu 20.04+, CentOS 8+, or macOS 11+
   * - **Memory**
     - 16 GB RAM minimum (32 GB recommended for production)
   * - **Storage**
     - 100 GB available disk space (SSD recommended)
   * - **CPU**
     - 4 cores minimum (8 cores recommended)
   * - **Network**
     - Stable internet connection with access to internal repositories

Required Software
------------------

.. code-block:: bash

   # Docker (required)
   docker --version  # Should be 20.10 or higher
   
   # Docker Compose (required)
   docker-compose --version  # Should be 1.29 or higher
   
   # Git (required)
   git --version
   
   # curl (required for API testing)
   curl --version
   
   # Optional but recommended
   kubectl --version  # For Kubernetes deployments
   helm version       # For Helm chart deployments

Access Requirements
-------------------

Ensure you have access to:

* **Internal Git Repository**: ``https://git.bankofamerica.com/gra/core-platform``
* **Container Registry**: ``registry.bankofamerica.com/gra``
* **VPN Connection**: Required for accessing internal resources
* **Service Account**: Contact your administrator for GRA service account credentials

Installation Methods
====================

Choose the installation method that best fits your environment:

.. tabs::

   .. tab:: Docker Compose (Recommended for Development)

      **Quick Start with Docker Compose**

      This is the fastest way to get GRA Core Platform running locally for development and testing.

      .. code-block:: bash

         # Clone the repository
         git clone https://git.bankofamerica.com/gra/core-platform.git
         cd core-platform
         
         # Switch to beta branch
         git checkout v5.8-beta
         
         # Copy environment template
         cp .env.template .env
         
         # Edit configuration (see Configuration section below)
         nano .env
         
         # Start the platform
         docker-compose up -d
         
         # Verify installation
         docker-compose ps
         curl http://localhost:8080/health

      **What gets installed:**
      
      * API Gateway (Port 8080)
      * Core Services (Ports 8081-8085)
      * PostgreSQL Database (Port 5432)
      * Redis Cache (Port 6379)
      * Monitoring Stack (Grafana on Port 3000)

   .. tab:: Kubernetes (Production)

      **Production Deployment with Kubernetes**

      For production environments, we recommend Kubernetes deployment using our Helm charts.

      .. code-block:: bash

         # Add GRA Helm repository
         helm repo add gra https://charts.bankofamerica.com/gra
         helm repo update
         
         # Create namespace
         kubectl create namespace gra-core
         
         # Install with custom values
         helm install gra-core gra/gra-core-platform \
           --namespace gra-core \
           --version 5.8.0-beta \
           --values values-production.yaml
         
         # Verify deployment
         kubectl get pods -n gra-core
         kubectl get services -n gra-core

      **Production Checklist:**
      
      * ✅ High Availability (3+ replicas)
      * ✅ Persistent Storage configured
      * ✅ Load Balancer configured
      * ✅ SSL/TLS certificates installed
      * ✅ Monitoring and logging enabled
      * ✅ Backup strategy implemented

   .. tab:: Manual Installation

      **Manual Installation Steps**

      For custom environments or when you need full control over the installation process.

      .. code-block:: bash

         # 1. Download and extract binaries
         wget https://releases.bankofamerica.com/gra/v5.8.0-beta/gra-core-platform-linux-amd64.tar.gz
         tar -xzf gra-core-platform-linux-amd64.tar.gz
         cd gra-core-platform
         
         # 2. Install dependencies
         sudo ./scripts/install-dependencies.sh
         
         # 3. Configure the platform
         sudo ./scripts/configure.sh
         
         # 4. Start services
         sudo systemctl enable gra-core
         sudo systemctl start gra-core
         
         # 5. Verify installation
         sudo systemctl status gra-core
         curl http://localhost:8080/health

Configuration
=============

Essential Configuration Settings
--------------------------------

Edit your ``.env`` file with the following required settings:

.. code-block:: bash

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=gra_core
   DB_USER=gra_user
   DB_PASSWORD=your_secure_password_here
   
   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=your_redis_password_here
   
   # API Configuration
   API_PORT=8080
   API_SECRET_KEY=your_32_character_secret_key_here
   JWT_SECRET=your_jwt_secret_key_here
   
   # External Services
   LDAP_URL=ldaps://ldap.bankofamerica.com:636
   LDAP_BIND_DN=cn=gra-service,ou=services,dc=bankofamerica,dc=com
   LDAP_BIND_PASSWORD=your_ldap_password
   
   # Monitoring
   ENABLE_METRICS=true
   METRICS_PORT=9090
   LOG_LEVEL=INFO
   
   # Security
   ENABLE_SSL=true
   SSL_CERT_PATH=/etc/ssl/certs/gra-core.crt
   SSL_KEY_PATH=/etc/ssl/private/gra-core.key

Advanced Configuration
----------------------

For production deployments, additional configuration may be required:

**High Availability Settings:**

.. code-block:: yaml

   # values-production.yaml for Helm deployment
   replicaCount: 3
   
   autoscaling:
     enabled: true
     minReplicas: 3
     maxReplicas: 10
     targetCPUUtilizationPercentage: 70
   
   persistence:
     enabled: true
     storageClass: "fast-ssd"
     size: 100Gi
   
   ingress:
     enabled: true
     className: "nginx"
     annotations:
       cert-manager.io/cluster-issuer: "letsencrypt-prod"
     hosts:
       - host: gra-core.bankofamerica.com
         paths:
           - path: /
             pathType: Prefix
     tls:
       - secretName: gra-core-tls
         hosts:
           - gra-core.bankofamerica.com

First Steps
===========

Once installation is complete, follow these steps to verify everything is working:

1. **Health Check**
   
   .. code-block:: bash

      curl http://localhost:8080/health
      # Expected response: {"status": "healthy", "version": "5.8.0-beta"}

2. **Authentication Test**
   
   .. code-block:: bash

      # Get authentication token
      curl -X POST http://localhost:8080/auth/login \
        -H "Content-Type: application/json" \
        -d '{"username": "admin", "password": "admin123"}'
      
      # Use token for API calls
      export TOKEN="your_token_here"
      curl -H "Authorization: Bearer $TOKEN" http://localhost:8080/api/v1/status

3. **Access Web Interface**
   
   Open your browser and navigate to:
   
   * **Main Dashboard**: http://localhost:8080
   * **API Documentation**: http://localhost:8080/docs
   * **Monitoring**: http://localhost:3000 (Grafana)
   * **Admin Panel**: http://localhost:8080/admin

4. **Run Sample Workflow**
   
   .. code-block:: bash

      # Create a sample data pipeline
      curl -X POST http://localhost:8080/api/v1/pipelines \
        -H "Authorization: Bearer $TOKEN" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "sample-pipeline",
          "description": "My first GRA pipeline",
          "source": "sample-data",
          "destination": "processed-data"
        }'

Next Steps
==========

Now that you have GRA Core Platform running, here's what to do next:

.. raw:: html

   <div class="next-steps-grid">
     <div class="step-card">
       <div class="step-number">1</div>
       <h3>Complete the Quickstart</h3>
       <p>Follow our 30-minute tutorial to build your first data pipeline</p>
       <a href="quickstart.html" class="btn-primary">Start Quickstart →</a>
     </div>
     <div class="step-card">
       <div class="step-number">2</div>
       <h3>Explore the Platform</h3>
       <p>Learn about core concepts and platform architecture</p>
       <a href="../platform-overview/index.html" class="btn-secondary">Platform Overview →</a>
     </div>
     <div class="step-card">
       <div class="step-number">3</div>
       <h3>Read the User Guide</h3>
       <p>Comprehensive guides for daily operations and advanced features</p>
       <a href="../user-guide/index.html" class="btn-secondary">User Guide →</a>
     </div>
     <div class="step-card">
       <div class="step-number">4</div>
       <h3>API Integration</h3>
       <p>Integrate your applications with GRA Core Platform APIs</p>
       <a href="../api-reference/index.html" class="btn-secondary">API Reference →</a>
     </div>
   </div>

Troubleshooting
===============

Common Issues and Solutions
---------------------------

**Issue: Docker containers fail to start**

.. code-block:: bash

   # Check Docker daemon status
   sudo systemctl status docker
   
   # Check available disk space
   df -h
   
   # Check Docker logs
   docker-compose logs

**Issue: Database connection errors**

.. code-block:: bash

   # Verify database is running
   docker-compose ps postgres
   
   # Check database logs
   docker-compose logs postgres
   
   # Test database connection
   docker-compose exec postgres psql -U gra_user -d gra_core -c "SELECT version();"

**Issue: Authentication failures**

.. code-block:: bash

   # Check LDAP connectivity
   ldapsearch -x -H ldaps://ldap.bankofamerica.com:636 -D "cn=gra-service,ou=services,dc=bankofamerica,dc=com" -W
   
   # Verify JWT secret is set
   echo $JWT_SECRET
   
   # Check authentication service logs
   docker-compose logs auth-service

**Issue: Performance problems**

.. code-block:: bash

   # Check system resources
   htop
   
   # Monitor container resources
   docker stats
   
   # Check application metrics
   curl http://localhost:9090/metrics

Getting Help
============

If you encounter issues not covered in this guide:

* **Documentation**: Check our comprehensive :doc:`troubleshooting guide </troubleshooting/index>`
* **Support**: Contact gra-support@bankofamerica.com
* **Community**: Join #gra-core-support on Mattermost
* **Training**: Attend our weekly office hours (Wednesdays 2-3 PM EST)

.. toctree::
   :maxdepth: 2
   :hidden:

   quickstart
