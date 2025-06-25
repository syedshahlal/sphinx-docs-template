GRA Core Platform Documentation
===============================

.. raw:: html
   :file: _templates/banner.html

.. raw:: html

   <div class="hero-section py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
     <div class="container mx-auto text-center">
       <div class="flex items-center justify-center mb-6">
         <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
           <span class="text-white font-bold text-2xl">GRA</span>
         </div>
       </div>
       <h1 class="text-5xl md:text-6xl font-bold mb-6">
         <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
           GRA Core Platform
         </span>
       </h1>
       <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
         Enterprise-grade platform for data processing, API integration, and secure cloud operations. 
         Built for scale, designed for developers, trusted by Bank of America.
       </p>
       <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
         <a href="getting-started/index.html" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
           <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
             <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
           </svg>
           Get Started
         </a>
         <a href="api-reference/index.html" class="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
           <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
             <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>
           API Reference
         </a>
       </div>
     </div>
   </div>

Welcome to the **GRA Core Platform Documentation** for version |version| - the latest and most comprehensive release of our enterprise platform.

.. raw:: html
   :file: _templates/feature-cards.html

.. toctree::
   :maxdepth: 2
   :caption: Platform Overview:
   :hidden:

   platform-overview/index
   getting-started/index

.. toctree::
   :maxdepth: 2
   :caption: Core Features:
   :hidden:

   data-processing/index
   api-integration/index
   security-compliance/index
   monitoring-analytics/index

.. toctree::
   :maxdepth: 2
   :caption: Development:
   :hidden:

   development-tools/index
   deployment-automation/index

.. toctree::
   :maxdepth: 2
   :caption: Reference:
   :hidden:

   api-reference/index
   troubleshooting/index
   migration-guides/index

.. raw:: html
   :file: _templates/see-also-section.html

What's New in v|version|
------------------------

.. raw:: html

   <div class="whats-new-section py-12 px-4">
     <div class="container mx-auto">
       <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
         <div class="grid md:grid-cols-2 gap-8 items-center">
           <div>
             <h3 class="text-2xl font-bold mb-4 text-gray-800">Latest Features & Improvements</h3>
             <ul class="space-y-3">
               <li class="flex items-start">
                 <span class="inline-block w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                 <span class="text-gray-700"><strong>Enhanced Data Processing:</strong> 40% faster pipeline execution</span>
               </li>
               <li class="flex items-start">
                 <span class="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                 <span class="text-gray-700"><strong>Improved API Framework:</strong> New REST endpoints and GraphQL support</span>
               </li>
               <li class="flex items-start">
                 <span class="inline-block w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                 <span class="text-gray-700"><strong>Advanced Security:</strong> Zero-trust architecture implementation</span>
               </li>
               <li class="flex items-start">
                 <span class="inline-block w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                 <span class="text-gray-700"><strong>Real-time Analytics:</strong> Live dashboards and alerting</span>
               </li>
             </ul>
           </div>
           <div class="text-center">
             <div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-2xl">
               <span class="text-white text-3xl font-bold">5.7</span>
             </div>
             <p class="text-gray-600 mb-4">Current Version</p>
             <a href="changelog.html" class="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
               <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path>
               </svg>
               View Full Changelog
             </a>
           </div>
         </div>
       </div>
     </div>
   </div>

.. raw:: html
   :file: _templates/user-guide-section.html

Version Information
-------------------

:Version: |version|
:Release Date: 2024
:Status: Current Release
:Previous Version: :doc:`../v5.6/index`

Support and Community
---------------------

* `GitHub Repository <https://github.com/bankofamerica/gra-core>`_
* `Issue Tracker <https://github.com/bankofamerica/gra-core/issues>`_
* `Community Forum <https://community.bankofamerica.com/gra-core>`_
* `Support Portal <https://support.bankofamerica.com/gra-core>`_

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
