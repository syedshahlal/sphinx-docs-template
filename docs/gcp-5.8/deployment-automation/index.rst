Deployment and Automation
==========================

GRA Core Platform v5.8 provides advanced deployment and automation capabilities.

.. toctree::
   :maxdepth: 2

Deployment Strategies
=====================

Blue-Green Deployment
---------------------

.. code-block:: yaml

   deployment:
     strategy: blue-green
     health_check:
       path: /health
       timeout: 30s
     rollback:
       automatic: true
       threshold: 5%

Canary Deployment
-----------------

.. code-block:: yaml

   deployment:
     strategy: canary
     canary:
       steps:
         - weight: 10
           duration: 5m
         - weight: 50
           duration: 10m
         - weight: 100

Container Orchestration
=======================

Kubernetes Integration
----------------------

.. code-block:: yaml

   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: gra-core-platform
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: gra-core-platform
     template:
       metadata:
         labels:
           app: gra-core-platform
       spec:
         containers:
         - name: gra-core
           image: boa/gra-core-platform:5.8
           ports:
           - containerPort: 8080

Helm Charts
-----------

.. code-block:: bash

   # Install using Helm
   helm repo add boa-charts https://charts.boa.com
   helm install gra-core boa-charts/gra-core-platform \
     --version 5.8.0 \
     --set image.tag=5.8 \
     --set replicas=3

CI/CD Pipeline
==============

GitHub Actions
--------------

.. code-block:: yaml

   name: Deploy GRA Core Platform
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Build and Deploy
           run: |
             gra-cli build --env=production
             gra-cli deploy --target=kubernetes

Jenkins Pipeline
----------------

.. code-block:: groovy

   pipeline {
       agent any
       stages {
           stage('Build') {
               steps {
                   sh 'gra-cli build --env=production'
               }
           }
           stage('Test') {
               steps {
                   sh 'gra-cli test --coverage'
               }
           }
           stage('Deploy') {
               steps {
                   sh 'gra-cli deploy --env=production'
               }
           }
       }
   }

Infrastructure as Code
======================

Terraform Configuration
-----------------------

.. code-block:: hcl

   resource "aws_ecs_service" "gra_core" {
     name            = "gra-core-platform"
     cluster         = aws_ecs_cluster.main.id
     task_definition = aws_ecs_task_definition.gra_core.arn
     desired_count   = 3
     
     deployment_configuration {
       maximum_percent         = 200
       minimum_healthy_percent = 100
     }
   }

Monitoring and Rollback
=======================

Automated Monitoring
--------------------

* Health check endpoints
* Performance metrics tracking
* Error rate monitoring
* Automated alerting

Rollback Procedures
-------------------

.. code-block:: bash

   # Automatic rollback on failure
   gra-cli deploy --auto-rollback --threshold=5%
   
   # Manual rollback
   gra-cli rollback --to-version=5.7.0
