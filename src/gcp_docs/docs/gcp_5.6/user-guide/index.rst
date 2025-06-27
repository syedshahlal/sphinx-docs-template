User Guide
==========

Comprehensive guide to using GRA Core Platform v5.6.

.. toctree::
   :maxdepth: 2

   basic-concepts
   project-management
   data-processing
   api-integration
   deployment
   monitoring

Basic Concepts
--------------

Projects
~~~~~~~~

A project is the fundamental unit of organization in GRA Core Platform. Each project contains:

* Configuration files
* Source code
* Dependencies
* Deployment settings

Services
~~~~~~~~

Services are the building blocks of your application:

* **Web Services**: HTTP APIs and web applications
* **Background Services**: Scheduled tasks and workers
* **Data Services**: Database connections and data processing

Environments
~~~~~~~~~~~~

GRA Core Platform supports multiple environments:

* **Development**: Local development environment
* **Staging**: Pre-production testing environment
* **Production**: Live production environment

Project Structure
-----------------

A typical GRA Core Platform project structure:

.. code-block:: text

   my-project/
   ├── config.yaml
   ├── src/
   │   ├── services/
   │   ├── models/
   │   └── utils/
   ├── tests/
   ├── docs/
   └── deployment/

Configuration
-------------

The ``config.yaml`` file defines your project settings:

.. code-block:: yaml

   project:
     name: "My Project"
     version: "1.0.0"
     description: "My GRA Core Platform project"
   
   services:
     web:
       type: "http"
       port: 8000
     
     worker:
       type: "background"
       schedule: "0 */6 * * *"
   
   database:
     type: "postgresql"
     host: "localhost"
     port: 5432
