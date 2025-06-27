Migration Guides
================

Guide for migrating from previous versions to GRA Core Platform v5.8.

.. toctree::
   :maxdepth: 2

Migration from v5.7 to v5.8
============================

Breaking Changes
----------------

* **API Changes**: Some endpoints have been updated
* **Configuration**: New security configuration options
* **Dependencies**: Updated minimum Python version to 3.9

Pre-Migration Checklist
-----------------------

1. **Backup Data**: Create full system backup
2. **Test Environment**: Set up v5.8 in staging
3. **Update Dependencies**: Ensure compatibility
4. **Review Changes**: Read release notes thoroughly

Step-by-Step Migration
----------------------

1. **Update Configuration**

   .. code-block:: yaml

      # Old v5.7 config
      version: "5.7"
      security:
        encryption: AES-128
      
      # New v5.8 config
      version: "5.8"
      security:
        encryption: AES-256
        mfa_enabled: true

2. **Update API Calls**

   .. code-block:: python

      # v5.7 API call
      response = client.get('/api/v5.7/users')
      
      # v5.8 API call
      response = client.get('/api/v5.8/users')

3. **Database Migration**

   .. code-block:: bash

      # Run migration scripts
      gra-cli db:migrate --from=5.7 --to=5.8

Migration from v5.6 to v5.8
============================

Major Changes
-------------

* Complete API redesign
* New authentication system
* Updated database schema
* Enhanced security features

Migration Strategy
------------------

1. **Phased Approach**: Migrate services incrementally
2. **Parallel Running**: Run both versions during transition
3. **Data Synchronization**: Keep data in sync during migration
4. **Gradual Cutover**: Switch traffic gradually

Post-Migration Tasks
====================

Validation Steps
----------------

1. **Functional Testing**: Verify all features work
2. **Performance Testing**: Ensure performance meets expectations
3. **Security Testing**: Validate security configurations
4. **User Acceptance**: Get user sign-off

Rollback Plan
-------------

.. code-block:: bash

   # If migration fails, rollback to previous version
   gra-cli rollback --to-version=5.7.0 --preserve-data

Common Issues
=============

Authentication Problems
-----------------------

* **Issue**: Users cannot log in after migration
* **Solution**: Clear authentication cache and regenerate tokens

Performance Degradation
-----------------------

* **Issue**: Slower response times after migration
* **Solution**: Review configuration and optimize database queries

Data Inconsistencies
--------------------

* **Issue**: Data appears corrupted or missing
* **Solution**: Run data validation scripts and restore from backup if needed
