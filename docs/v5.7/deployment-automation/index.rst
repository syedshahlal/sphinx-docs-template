Deployment Automation
=====================

The GRA Core Platform provides comprehensive deployment automation capabilities for reliable, scalable, and secure application deployments.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   ci-cd-pipelines
   containerization
   infrastructure-as-code
   blue-green-deployment
   monitoring-deployment
   rollback-strategies

Overview
--------

Deployment automation features include:

* **CI/CD Pipelines**: Automated build, test, and deployment
* **Containerization**: Docker and Kubernetes support
* **Infrastructure as Code**: Terraform and CloudFormation
* **Blue-Green Deployment**: Zero-downtime deployments
* **Automated Testing**: Integration and deployment testing
* **Rollback Strategies**: Quick recovery from failed deployments

CI/CD Pipelines
---------------

Automated continuous integration and deployment:

**GitHub Actions Workflow:**

.. code-block:: yaml

   name: GRA Core Platform CI/CD
   
   on:
     push:
       branches: [main, develop]
     pull_request:
       branches: [main]
   
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Setup GRA Core
           uses: gra-core/setup-action@v1
           with:
             version: '5.7'
         
         - name: Install dependencies
           run: gra-core install
         
         - name: Run tests
           run: gra-core test --coverage
         
         - name: Security scan
           run: gra-core security-scan
     
     build:
       needs: test
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Build application
           run: gra-core build --optimize
         
         - name: Build Docker image
           run: |
             docker build -t gra-core-app:${{ github.sha }} .
             docker tag gra-core-app:${{ github.sha }} gra-core-app:latest
     
     deploy:
       needs: build
       runs-on: ubuntu-latest
       if: github.ref == 'refs/heads/main'
       steps:
         - name: Deploy to staging
           run: gra-core deploy --environment=staging
         
         - name: Run integration tests
           run: gra-core test --integration --environment=staging
         
         - name: Deploy to production
           run: gra-core deploy --environment=production

**Jenkins Pipeline:**

.. code-block:: groovy

   pipeline {
       agent any
       
       stages {
           stage('Checkout') {
               steps {
                   checkout scm
               }
           }
           
           stage('Test') {
               steps {
                   sh 'gra-core test --coverage'
               }
               post {
                   always {
                       publishTestResults testResultsPattern: 'test-results.xml'
                       publishCoverageResults coverageResultsPattern: 'coverage.xml'
                   }
               }
           }
           
           stage('Build') {
               steps {
                   sh 'gra-core build --optimize'
                   sh 'docker build -t gra-core-app:${BUILD_NUMBER} .'
               }
           }
           
           stage('Deploy') {
               when {
                   branch 'main'
               }
               steps {
                   sh 'gra-core deploy --environment=production'
               }
           }
       }
   }

Containerization
----------------

Docker and Kubernetes deployment support:

**Dockerfile:**

.. code-block:: dockerfile

   FROM gra-core/base:5.7
   
   # Set working directory
   WORKDIR /app
   
   # Copy application files
   COPY . .
   
   # Install dependencies
   RUN gra-core install --production
   
   # Build application
   RUN gra-core build --optimize
   
   # Expose port
   EXPOSE 8080
   
   # Health check
   HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
     CMD gra-core health-check
   
   # Start application
   CMD ["gra-core", "start"]

**Kubernetes Deployment:**

.. code-block:: yaml

   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: gra-core-app
     labels:
       app: gra-core-app
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: gra-core-app
     template:
       metadata:
         labels:
           app: gra-core-app
       spec:
         containers:
         - name: app
           image: gra-core-app:latest
           ports:
           - containerPort: 8080
           env:
           - name: NODE_ENV
             value: "production"
           - name: DATABASE_URL
             valueFrom:
               secretKeyRef:
                 name: app-secrets
                 key: database-url
           resources:
             requests:
               memory: "256Mi"
               cpu: "250m"
             limits:
               memory: "512Mi"
               cpu: "500m"
           livenessProbe:
             httpGet:
               path: /health
               port: 8080
             initialDelaySeconds: 30
             periodSeconds: 10
           readinessProbe:
             httpGet:
               path: /ready
               port: 8080
             initialDelaySeconds: 5
             periodSeconds: 5

Infrastructure as Code
----------------------

Automated infrastructure provisioning:

**Terraform Configuration:**

.. code-block:: hcl

   # main.tf
   terraform {
     required_providers {
       aws = {
         source  = "hashicorp/aws"
         version = "~> 5.0"
       }
     }
   }
   
   provider "aws" {
     region = var.aws_region
   }
   
   # VPC
   resource "aws_vpc" "main" {
     cidr_block           = "10.0.0.0/16"
     enable_dns_hostnames = true
     enable_dns_support   = true
     
     tags = {
       Name = "gra-core-vpc"
     }
   }
   
   # EKS Cluster
   resource "aws_eks_cluster" "main" {
     name     = "gra-core-cluster"
     role_arn = aws_iam_role.cluster.arn
     version  = "1.27"
     
     vpc_config {
       subnet_ids = aws_subnet.private[*].id
     }
     
     depends_on = [
       aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
     ]
   }
   
   # RDS Database
   resource "aws_db_instance" "main" {
     identifier = "gra-core-db"
     
     engine         = "postgres"
     engine_version = "15.3"
     instance_class = "db.t3.micro"
     
     allocated_storage     = 20
     max_allocated_storage = 100
     
     db_name  = "gracore"
     username = "admin"
     password = var.db_password
     
     vpc_security_group_ids = [aws_security_group.rds.id]
     db_subnet_group_name   = aws_db_subnet_group.main.name
     
     backup_retention_period = 7
     backup_window          = "03:00-04:00"
     maintenance_window     = "sun:04:00-sun:05:00"
     
     skip_final_snapshot = true
   }

**CloudFormation Template:**

.. code-block:: yaml

   AWSTemplateFormatVersion: '2010-09-09'
   Description: 'GRA Core Platform Infrastructure'
   
   Parameters:
     Environment:
       Type: String
       Default: production
       AllowedValues: [development, staging, production]
   
   Resources:
     VPC:
       Type: AWS::EC2::VPC
       Properties:
         CidrBlock: 10.0.0.0/16
         EnableDnsHostnames: true
         EnableDnsSupport: true
         Tags:
           - Key: Name
             Value: !Sub '${Environment}-gra-core-vpc'
     
     EKSCluster:
       Type: AWS::EKS::Cluster
       Properties:
         Name: !Sub '${Environment}-gra-core-cluster'
         Version: '1.27'
         RoleArn: !GetAtt EKSClusterRole.Arn
         ResourcesVpcConfig:
           SubnetIds:
             - !Ref PrivateSubnet1
             - !Ref PrivateSubnet2

Blue-Green Deployment
---------------------

Zero-downtime deployment strategy:

.. code-block:: python

   from gra_core.deployment import BlueGreenDeployment
   
   deployment = BlueGreenDeployment(
       application="gra-core-app",
       environment="production"
   )
   
   async def deploy_new_version(version):
       # Deploy to green environment
       green_deployment = await deployment.deploy_green(version)
       
       # Run health checks
       health_check_passed = await deployment.health_check(green_deployment)
       
       if health_check_passed:
           # Switch traffic to green
           await deployment.switch_traffic()
           
           # Monitor for issues
           await deployment.monitor(duration="10m")
           
           # If successful, clean up blue environment
           await deployment.cleanup_blue()
       else:
           # Rollback if health checks fail
           await deployment.rollback()

**Deployment Configuration:**

.. code-block:: yaml

   deployment:
     strategy: blue-green
     
     health_checks:
       - type: http
         endpoint: /health
         expected_status: 200
         timeout: 30s
       
       - type: database
         query: "SELECT 1"
         timeout: 10s
     
     traffic_switching:
       method: gradual
       steps:
         - percentage: 10
           duration: 5m
         - percentage: 50
           duration: 10m
         - percentage: 100
           duration: 5m
     
     rollback:
       automatic: true
       triggers:
         - error_rate > 5%
         - response_time > 2s
         - health_check_failures > 3

Monitoring Deployment
---------------------

Real-time deployment monitoring:

.. code-block:: python

   from gra_core.deployment import DeploymentMonitor
   
   monitor = DeploymentMonitor()
   
   @monitor.on_deployment_start
   async def deployment_started(deployment_id):
       await notify_team(f"Deployment {deployment_id} started")
   
   @monitor.on_deployment_success
   async def deployment_succeeded(deployment_id):
       await notify_team(f"Deployment {deployment_id} completed successfully")
   
   @monitor.on_deployment_failure
   async def deployment_failed(deployment_id, error):
       await alert_team(f"Deployment {deployment_id} failed: {error}")
       await trigger_rollback(deployment_id)

**Deployment Metrics:**

* **Deployment Frequency**: How often deployments occur
* **Lead Time**: Time from commit to production
* **Mean Time to Recovery**: Time to recover from failures
* **Change Failure Rate**: Percentage of deployments causing issues

Rollback Strategies
-------------------

Quick recovery from failed deployments:

.. code-block:: bash

   # Automatic rollback
   gra-core deploy --auto-rollback --health-check-timeout=5m
   
   # Manual rollback to previous version
   gra-core rollback --to-previous
   
   # Rollback to specific version
   gra-core rollback --to-version=v1.2.3
   
   # Database rollback (if needed)
   gra-core db:rollback --to-migration=20240115_001

**Rollback Configuration:**

.. code-block:: yaml

   rollback:
     automatic: true
     triggers:
       - error_rate > 5%
       - response_time_p95 > 2000ms
       - health_check_failures > 3
       - custom_metric_threshold_exceeded
     
     strategy:
       method: immediate  # or gradual
       preserve_data: true
       notification_channels:
         - slack: "#deployments"
         - email: "oncall@bankofamerica.com"

Environment Management
----------------------

Multi-environment deployment pipeline:

.. code-block:: yaml

   environments:
     development:
       auto_deploy: true
       branch: develop
       replicas: 1
       resources:
         cpu: 100m
         memory: 256Mi
     
     staging:
       auto_deploy: false
       branch: main
       replicas: 2
       resources:
         cpu: 250m
         memory: 512Mi
       approval_required: true
     
     production:
       auto_deploy: false
       branch: main
       replicas: 5
       resources:
         cpu: 500m
         memory: 1Gi
       approval_required: true
       deployment_window: "02:00-04:00 UTC"

Deployment Security
-------------------

Security considerations for deployment automation:

.. code-block:: yaml

   security:
     image_scanning:
       enabled: true
       fail_on_critical: true
       registries:
         - "registry.bankofamerica.com"
     
     secrets_management:
       provider: "vault"
       rotation: "30d"
       encryption: "AES-256"
     
     access_control:
       rbac_enabled: true
       deployment_approvers:
         - "deployment-team"
         - "security-team"
     
     compliance:
       sox_compliance: true
       audit_logging: true
       change_management: true

Best Practices
--------------

1. **Immutable Infrastructure**: Treat infrastructure as code
2. **Automated Testing**: Test everything automatically
3. **Gradual Rollouts**: Deploy incrementally to reduce risk
4. **Monitor Everything**: Comprehensive monitoring and alerting
5. **Quick Rollbacks**: Plan for failure and quick recovery
6. **Security First**: Security scanning and compliance checks

Troubleshooting Deployments
---------------------------

Common deployment issues and solutions:

**Failed Health Checks:**

.. code-block:: bash

   # Check application logs
   gra-core logs --environment=production --tail=100
   
   # Verify health endpoint
   gra-core health-check --environment=production
   
   # Check resource usage
   gra-core status --environment=production

**Database Migration Issues:**

.. code-block:: bash

   # Check migration status
   gra-core db:status --environment=production
   
   # Rollback migration
   gra-core db:rollback --steps=1
   
   # Fix and retry migration
   gra-core db:migrate --environment=production

**Resource Constraints:**

.. code-block:: bash

   # Check resource usage
   kubectl top pods -n gra-core-production
   
   # Scale up resources
   gra-core scale --replicas=10 --environment=production
   
   # Update resource limits
   gra-core update-resources --cpu=1000m --memory=2Gi

Next Steps
----------

* Review :doc:`../api-reference/deployment`
* Explore :doc:`../monitoring-analytics/index`
* Check :doc:`../troubleshooting/deployment-issues`
* Learn about :doc:`../security-compliance/index`

.. note::
   Deployment automation is continuously evolving. Check the latest documentation for new features and best practices.
