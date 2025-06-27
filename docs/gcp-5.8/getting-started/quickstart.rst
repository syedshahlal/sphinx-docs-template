==========
Quickstart
==========

This quickstart guide will walk you through creating your first data pipeline with GRA Core Platform v5.8 Beta in approximately 30 minutes.

.. raw:: html

   <div class="quickstart-header">
     <h2>🚀 30-Minute Quickstart Tutorial</h2>
     <p>Build a complete data processing pipeline from scratch</p>
     <div class="tutorial-info">
       <span class="time">⏱️ ~30 minutes</span>
       <span class="level">📊 Beginner</span>
       <span class="prereq">🔧 Docker required</span>
     </div>
   </div>

What You'll Build
=================

In this tutorial, you'll create a real-time data pipeline that:

* Ingests sample financial data from a REST API
* Processes and validates the data using built-in transformations
* Stores results in a PostgreSQL database
* Visualizes the data in a real-time dashboard
* Sets up monitoring and alerting

.. raw:: html

   <div class="architecture-diagram">
     <h3>Pipeline Architecture</h3>
     <pre>
   [Data Source] → [API Gateway] → [Data Processor] → [Database] → [Dashboard]
        ↓              ↓              ↓               ↓           ↓
   Sample JSON    Authentication   Validation     PostgreSQL   Grafana
   Financial      Rate Limiting    Transformation  Storage      Visualization
   Data           Logging          Enrichment      Backup       Alerting
     </pre>
   </div>

Prerequisites Check
===================

Before starting, verify you have completed the :doc:`installation guide <index>`:

.. code-block:: bash

   # Verify GRA Core Platform is running
   curl http://localhost:8080/health
   # Expected: {"status": "healthy", "version": "5.8.0-beta"}
   
   # Check all services are up
   docker-compose ps
   # All services should show "Up" status

Step 1: Authentication Setup
============================

First, let's authenticate and get an API token:

.. code-block:: bash

   # Login and get authentication token
   curl -X POST http://localhost:8080/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "password": "admin123"
     }' | jq -r '.token'

.. code-block:: bash

   # Store the token for subsequent requests
   export GRA_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   
   # Verify authentication
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/user/profile

**Expected Response:**

.. code-block:: json

   {
     "user_id": "admin",
     "email": "admin@bankofamerica.com",
     "roles": ["admin", "pipeline_creator"],
     "permissions": ["read", "write", "admin"]
   }

Step 2: Create Data Source
==========================

Let's create a data source that will provide sample financial data:

.. code-block:: bash

   # Create a new data source
   curl -X POST http://localhost:8080/api/v1/datasources \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "sample-financial-data",
       "type": "rest_api",
       "description": "Sample financial market data for tutorial",
       "config": {
         "url": "https://api.bankofamerica.com/sample/market-data",
         "method": "GET",
         "headers": {
           "Accept": "application/json"
         },
         "polling_interval": 30,
         "timeout": 10
       },
       "schema": {
         "fields": [
           {"name": "symbol", "type": "string", "required": true},
           {"name": "price", "type": "decimal", "required": true},
           {"name": "volume", "type": "integer", "required": true},
           {"name": "timestamp", "type": "datetime", "required": true}
         ]
       }
     }'

**Expected Response:**

.. code-block:: json

   {
     "datasource_id": "ds_001",
     "name": "sample-financial-data",
     "status": "created",
     "created_at": "2024-01-15T10:30:00Z"
   }

Step 3: Configure Data Processing
=================================

Now let's set up data processing rules and transformations:

.. code-block:: bash

   # Create data processor configuration
   curl -X POST http://localhost:8080/api/v1/processors \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "financial-data-processor",
       "description": "Process and validate financial market data",
       "transformations": [
         {
           "type": "validation",
           "rules": [
             {"field": "price", "condition": "greater_than", "value": 0},
             {"field": "volume", "condition": "greater_than", "value": 0},
             {"field": "symbol", "condition": "not_empty"}
           ]
         },
         {
           "type": "enrichment",
           "operations": [
             {
               "field": "price_category",
               "expression": "CASE WHEN price < 50 THEN 'low' WHEN price < 200 THEN 'medium' ELSE 'high' END"
             },
             {
               "field": "processed_at",
               "expression": "NOW()"
             }
           ]
         },
         {
           "type": "aggregation",
           "window": "5m",
           "operations": [
             {"field": "avg_price", "function": "AVG", "source": "price"},
             {"field": "total_volume", "function": "SUM", "source": "volume"},
             {"field": "record_count", "function": "COUNT", "source": "*"}
           ]
         }
       ]
     }'

Step 4: Create Data Pipeline
=============================

Now let's create the complete data pipeline:

.. code-block:: bash

   # Create the pipeline
   curl -X POST http://localhost:8080/api/v1/pipelines \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "quickstart-financial-pipeline",
       "description": "My first GRA Core Platform pipeline",
       "source": {
         "datasource_id": "ds_001",
         "batch_size": 100
       },
       "processor": {
         "processor_id": "financial-data-processor"
       },
       "destination": {
         "type": "postgresql",
         "config": {
           "table": "processed_financial_data",
           "connection": "default",
           "write_mode": "append"
         }
       },
       "schedule": {
         "type": "continuous",
         "max_parallel": 2
       },
       "monitoring": {
         "enabled": true,
         "alerts": [
           {
             "condition": "error_rate > 5%",
             "action": "email",
             "recipients": ["admin@bankofamerica.com"]
           }
         ]
       }
     }'

**Expected Response:**

.. code-block:: json

   {
     "pipeline_id": "pip_001",
     "name": "quickstart-financial-pipeline",
     "status": "created",
     "created_at": "2024-01-15T10:35:00Z"
   }

Step 5: Start the Pipeline
==========================

Let's start our pipeline and monitor its execution:

.. code-block:: bash

   # Start the pipeline
   curl -X POST http://localhost:8080/api/v1/pipelines/pip_001/start \
     -H "Authorization: Bearer $GRA_TOKEN"
   
   # Check pipeline status
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/status

**Expected Response:**

.. code-block:: json

   {
     "pipeline_id": "pip_001",
     "status": "running",
     "started_at": "2024-01-15T10:36:00Z",
     "records_processed": 0,
     "last_execution": null
   }

Step 6: Monitor Pipeline Execution
==================================

Let's monitor the pipeline and see data flowing through:

.. code-block:: bash

   # Get pipeline metrics
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/metrics
   
   # View recent executions
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/executions?limit=5

**Sample Metrics Response:**

.. code-block:: json

   {
     "pipeline_id": "pip_001",
     "metrics": {
       "records_processed": 1250,
       "records_failed": 3,
       "success_rate": 99.76,
       "avg_processing_time": 45.2,
       "throughput_per_minute": 42.3
     },
     "last_updated": "2024-01-15T10:40:00Z"
   }

Step 7: Query Processed Data
============================

Let's verify that data is being processed and stored correctly:

.. code-block:: bash

   # Query processed data via API
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     "http://localhost:8080/api/v1/data/processed_financial_data?limit=10&order=processed_at DESC"

**Sample Data Response:**

.. code-block:: json

   {
     "data": [
       {
         "symbol": "AAPL",
         "price": 175.50,
         "volume": 45000000,
         "timestamp": "2024-01-15T10:39:30Z",
         "price_category": "medium",
         "processed_at": "2024-01-15T10:39:45Z"
       },
       {
         "symbol": "GOOGL",
         "price": 2750.25,
         "volume": 12000000,
         "timestamp": "2024-01-15T10:39:30Z",
         "price_category": "high",
         "processed_at": "2024-01-15T10:39:45Z"
       }
     ],
     "total_records": 1250,
     "page": 1,
     "limit": 10
   }

Step 8: Set Up Dashboard
========================

Let's create a real-time dashboard to visualize our data:

.. code-block:: bash

   # Create dashboard configuration
   curl -X POST http://localhost:8080/api/v1/dashboards \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Financial Data Dashboard",
       "description": "Real-time financial market data visualization",
       "panels": [
         {
           "title": "Records Processed Over Time",
           "type": "line_chart",
           "query": "SELECT DATE_TRUNC('\''minute'\'', processed_at) as time, COUNT(*) as records FROM processed_financial_data WHERE processed_at >= NOW() - INTERVAL '\''1 hour'\'' GROUP BY time ORDER BY time",
           "refresh_interval": 30
         },
         {
           "title": "Price Distribution",
           "type": "histogram",
           "query": "SELECT price_category, COUNT(*) as count FROM processed_financial_data WHERE processed_at >= NOW() - INTERVAL '\''1 hour'\'' GROUP BY price_category",
           "refresh_interval": 60
         },
         {
           "title": "Top Symbols by Volume",
           "type": "bar_chart",
           "query": "SELECT symbol, SUM(volume) as total_volume FROM processed_financial_data WHERE processed_at >= NOW() - INTERVAL '\''1 hour'\'' GROUP BY symbol ORDER BY total_volume DESC LIMIT 10",
           "refresh_interval": 60
         }
       ]
     }'

**Access Your Dashboard:**

Open your browser and navigate to: http://localhost:8080/dashboards

Step 9: Set Up Alerts
=====================

Let's configure alerts for monitoring our pipeline:

.. code-block:: bash

   # Create alert rule
   curl -X POST http://localhost:8080/api/v1/alerts \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Pipeline Health Alert",
       "description": "Alert when pipeline error rate is high",
       "condition": {
         "metric": "pipeline.error_rate",
         "operator": "greater_than",
         "threshold": 5.0,
         "window": "5m"
       },
       "actions": [
         {
           "type": "email",
           "config": {
             "recipients": ["admin@bankofamerica.com"],
             "subject": "GRA Pipeline Alert: High Error Rate"
           }
         },
         {
           "type": "webhook",
           "config": {
             "url": "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
           }
         }
       ]
     }'

Step 10: Test Error Handling
============================

Let's test how the pipeline handles errors:

.. code-block:: bash

   # Simulate data source error
   curl -X POST http://localhost:8080/api/v1/datasources/ds_001/simulate-error \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -d '{"error_type": "connection_timeout", "duration": 60}'
   
   # Check pipeline response to error
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/status

**Monitor Error Recovery:**

.. code-block:: bash

   # View error logs
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     "http://localhost:8080/api/v1/pipelines/pip_001/logs?level=error&limit=10"
   
   # Check retry attempts
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/retries

Congratulations! 🎉
===================

You've successfully created your first GRA Core Platform data pipeline! Here's what you accomplished:

.. raw:: html

   <div class="success-summary">
     <h3>✅ What You Built</h3>
     <ul>
       <li>✅ Configured a REST API data source</li>
       <li>✅ Set up data validation and transformation</li>
       <li>✅ Created a complete data processing pipeline</li>
       <li>✅ Implemented real-time monitoring</li>
       <li>✅ Built a visualization dashboard</li>
       <li>✅ Configured alerting and error handling</li>
     </ul>
   </div>

Next Steps
==========

Now that you have a working pipeline, here are some next steps to explore:

**Immediate Next Steps:**

1. **Explore the Dashboard**: Visit http://localhost:8080/dashboards to see your data visualizations
2. **Review Logs**: Check http://localhost:8080/logs for detailed pipeline execution logs
3. **Monitor Performance**: Visit http://localhost:3000 (Grafana) for system metrics

**Advanced Features to Try:**

.. code-block:: bash

   # 1. Create a batch processing pipeline
   curl -X POST http://localhost:8080/api/v1/pipelines \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "batch-processing-pipeline",
       "schedule": {"type": "cron", "expression": "0 */6 * * *"},
       "source": {"type": "file", "path": "/data/batch/*.csv"}
     }'
   
   # 2. Set up data quality monitoring
   curl -X POST http://localhost:8080/api/v1/quality-rules \
     -H "Authorization: Bearer $GRA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "table": "processed_financial_data",
       "rules": [
         {"type": "completeness", "column": "symbol", "threshold": 0.95},
         {"type": "uniqueness", "column": "symbol", "threshold": 0.99}
       ]
     }'
   
   # 3. Create data lineage tracking
   curl -X GET http://localhost:8080/api/v1/lineage/processed_financial_data \
     -H "Authorization: Bearer $GRA_TOKEN"

**Learning Resources:**

* :doc:`Platform Overview </platform-overview/index>` - Learn about architecture and core concepts
* :doc:`User Guide </user-guide/index>` - Comprehensive guides for advanced features
* :doc:`API Reference </api-reference/index>` - Complete API documentation
* :doc:`Best Practices </user-guide/best-practices>` - Production deployment guidelines

**Community and Support:**

* **Mattermost**: Join #gra-core-quickstart for questions about this tutorial
* **Office Hours**: Wednesdays 2-3 PM EST for live Q&A
* **Training**: Register for comprehensive GRA Core Platform training
* **Documentation**: Explore our full documentation at https://docs.gra.bankofamerica.com

Troubleshooting
===============

**Common Issues:**

.. code-block:: bash

   # Pipeline not starting
   curl -H "Authorization: Bearer $GRA_TOKEN" \
     http://localhost:8080/api/v1/pipelines/pip_001/logs?level=error
   
   # Data not appearing in database
   docker-compose exec postgres psql -U gra_user -d gra_core \
     -c "SELECT COUNT(*) FROM processed_financial_data;"
   
   # Authentication issues
   curl -X POST http://localhost:8080/auth/refresh \
     -H "Authorization: Bearer $GRA_TOKEN"

**Getting Help:**

If you encounter issues:

1. Check the :doc:`troubleshooting guide </troubleshooting/index>`
2. Review pipeline logs in the web interface
3. Contact support at gra-support@bankofamerica.com
4. Join our community chat for peer support

**Clean Up (Optional):**

To clean up the tutorial resources:

.. code-block:: bash

   # Stop the pipeline
   curl -X POST http://localhost:8080/api/v1/pipelines/pip_001/stop \
     -H "Authorization: Bearer $GRA_TOKEN"
   
   # Delete the pipeline (optional)
   curl -X DELETE http://localhost:8080/api/v1/pipelines/pip_001 \
     -H "Authorization: Bearer $GRA_TOKEN"
   
   # Clean up test data (optional)
   docker-compose exec postgres psql -U gra_user -d gra_core \
     -c "TRUNCATE TABLE processed_financial_data;"
