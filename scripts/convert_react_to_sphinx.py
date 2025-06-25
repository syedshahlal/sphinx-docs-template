"""
Convert React/Next.js components to Sphinx-compatible HTML templates and CSS
"""
import os
import re
import json
from pathlib import Path
from typing import Dict, List, Any

class ReactToSphinxConverter:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.components_dir = self.project_root / "components"
        self.app_dir = self.project_root / "app"
        self.output_templates = self.project_root / "_templates"
        self.output_static = self.project_root / "_static"
        
    def convert_all(self):
        """Convert all React components to Sphinx templates"""
        print("🔄 Converting React components to Sphinx templates...")
        
        # Create output directories
        self.output_templates.mkdir(exist_ok=True)
        self.output_static.mkdir(exist_ok=True)
        (self.output_static / "css").mkdir(exist_ok=True)
        (self.output_static / "js").mkdir(exist_ok=True)
        
        # Convert components
        self.convert_layout()
        self.convert_header()
        self.convert_banner()
        self.convert_feature_cards()
        self.convert_see_also_section()
        self.convert_user_guide_section()
        
        # Extract and convert styling
        self.extract_global_styles()
        self.create_component_css()
        self.create_component_js()
        
        print("✅ Conversion completed!")
    
    def convert_layout(self):
        """Convert app/layout.tsx to Sphinx base template"""
        layout_html = '''<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ title|striptags|e }}{{ titlesuffix }}</title>
    
    <!-- Favicon -->
    <link rel="icon" href="{{ pathto('_static/favicon.ico', 1) }}" />
    
    <!-- CSS Files -->
    <link rel="stylesheet" type="text/css" href="{{ pathto('_static/css/globals.css', 1) }}" />
    <link rel="stylesheet" type="text/css" href="{{ pathto('_static/css/components.css', 1) }}" />
    {% for css in css_files %}
    <link rel="stylesheet" type="text/css" href="{{ pathto(css, 1) }}" />
    {% endfor %}
    
    <!-- Meta tags -->
    <meta name="description" content="{{ metatags.description or 'GRA Core Platform Documentation' }}" />
    <meta property="og:title" content="{{ title|striptags|e }}" />
    <meta property="og:description" content="{{ metatags.description or 'Enterprise-grade platform documentation' }}" />
    <meta property="og:type" content="website" />
</head>
<body class="min-h-screen bg-white">
    <!-- Banner Component -->
    {% include 'banner.html' %}
    
    <!-- Header Component -->
    {% include 'header.html' %}
    
    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
        {% block body %}
        <div class="content-wrapper">
            {% block content %}{{ body }}{% endblock %}
        </div>
        {% endblock %}
    </main>
    
    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200 mt-16">
        <div class="max-w-6xl mx-auto px-4 py-8">
            <div class="text-center text-gray-600">
                <p>&copy; {{ copyright }} Bank of America. All rights reserved.</p>
                <p class="text-sm mt-2">Built with Sphinx {{ sphinx_version }}</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript Files -->
    <script src="{{ pathto('_static/js/components.js', 1) }}"></script>
    {% for js in script_files %}
    <script src="{{ pathto(js, 1) }}"></script>
    {% endfor %}
</body>
</html>'''
        
        (self.output_templates / "layout.html").write_text(layout_html, encoding='utf-8')
        print("📄 Converted layout.tsx to layout.html")
    
    def convert_header(self):
        """Convert header component to HTML template"""
        header_html = '''<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span class="text-white font-bold text-lg">GRA</span>
                </div>
                <div>
                    <h1 class="text-xl font-bold text-gray-900">GRA Core Platform</h1>
                    <p class="text-sm text-gray-500">Documentation v{{ version }}</p>
                </div>
            </div>
            
            <!-- Navigation -->
            <nav class="hidden md:flex items-center space-x-8">
                <a href="{{ pathto('index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Home
                </a>
                <a href="{{ pathto('getting-started/index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Getting Started
                </a>
                <a href="{{ pathto('api-reference/index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    API Reference
                </a>
                <a href="{{ pathto('examples/index') }}" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Examples
                </a>
            </nav>
            
            <!-- Search and Theme Toggle -->
            <div class="flex items-center space-x-4">
                <!-- Search -->
                <div class="relative">
                    <input type="text" 
                           placeholder="Search docs..." 
                           class="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           id="search-input">
                    <div class="absolute right-3 top-2.5">
                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
                
                <!-- Theme Toggle -->
                <button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Mobile Menu Button -->
            <button class="md:hidden p-2 rounded-lg hover:bg-gray-100" id="mobile-menu-toggle">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        
        <!-- Mobile Menu -->
        <div class="md:hidden hidden" id="mobile-menu">
            <div class="py-4 space-y-2">
                <a href="{{ pathto('index') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Home</a>
                <a href="{{ pathto('getting-started/index') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Getting Started</a>
                <a href="{{ pathto('api-reference/index') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">API Reference</a>
                <a href="{{ pathto('examples/index') }}" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Examples</a>
            </div>
        </div>
    </div>
</header>'''
        
        (self.output_templates / "header.html").write_text(header_html, encoding='utf-8')
        print("🏠 Converted header component to header.html")
    
    def convert_banner(self):
        """Convert banner component to HTML template"""
        banner_html = '''<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-medium">🎉 GRA Core Platform v{{ version }} is now available!</span>
            </div>
        </div>
        <div class="flex items-center space-x-4">
            <a href="{{ pathto('changelog') }}" class="text-white hover:text-blue-200 text-sm font-medium underline">
                View Release Notes →
            </a>
            <button class="text-white hover:text-blue-200" onclick="this.parentElement.parentElement.parentElement.style.display='none'">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    </div>
</div>'''
        
        (self.output_templates / "banner.html").write_text(banner_html, encoding='utf-8')
        print("📢 Converted banner component to banner.html")
    
    def convert_feature_cards(self):
        """Convert feature cards to HTML template"""
        feature_cards_html = '''<section class="py-16 px-4">
    <div class="container mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    GRA Core Platform Documentation
                </span>
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive documentation and guides to help you master GRA Core Platform with our enterprise-grade tools and workflows.
            </p>
        </div>

        <!-- Feature Cards Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <!-- Platform Overview Card -->
            <a href="{{ pathto('platform-overview/index') }}" class="group block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl">
                <div class="relative border border-gray-200 bg-white transition-all duration-500 overflow-hidden h-full hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-3 cursor-pointer rounded-xl">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative z-10 p-8">
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span class="text-2xl">🚀</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-xl group-hover:text-blue-600 transition-colors">Platform Overview</span>
                            </div>
                        </div>
                        
                        <p class="leading-relaxed text-gray-600 mb-6 group-hover:text-gray-800 transition-colors">
                            Get started with GRA Core Platform fundamentals and core concepts.
                        </p>
                        
                        <div class="space-y-3">
                            <div class="border-t border-gray-200 pt-4">
                                <h4 class="text-sm font-semibold text-gray-800 mb-3">Key Topics:</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Core Services</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Getting Started</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Best Practices</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-700 ease-out w-0 group-hover:w-full"></div>
                    </div>
                </div>
            </a>

            <!-- Getting Started Card -->
            <a href="{{ pathto('getting-started/index') }}" class="group block focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl">
                <div class="relative border border-gray-200 bg-white transition-all duration-500 overflow-hidden h-full hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-3 cursor-pointer rounded-xl">
                    <div class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative z-10 p-8">
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span class="text-2xl">📖</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-xl group-hover:text-green-600 transition-colors">Getting Started</span>
                            </div>
                        </div>
                        
                        <p class="leading-relaxed text-gray-600 mb-6 group-hover:text-gray-800 transition-colors">
                            Complete guide to using GRA Core Platform with step-by-step instructions.
                        </p>
                        
                        <div class="space-y-3">
                            <div class="border-t border-gray-200 pt-4">
                                <h4 class="text-sm font-semibold text-gray-800 mb-3">Key Topics:</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-green-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Installation</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-green-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Configuration</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-green-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">User Management</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700 ease-out w-0 group-hover:w-full"></div>
                    </div>
                </div>
            </a>

            <!-- API Reference Card -->
            <a href="{{ pathto('api-reference/index') }}" class="group block focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl">
                <div class="relative border border-gray-200 bg-white transition-all duration-500 overflow-hidden h-full hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-3 cursor-pointer rounded-xl">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative z-10 p-8">
                        <div class="flex items-center space-x-4 mb-6">
                            <div class="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <span class="text-2xl">🔌</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-xl group-hover:text-purple-600 transition-colors">API Reference</span>
                            </div>
                        </div>
                        
                        <p class="leading-relaxed text-gray-600 mb-6 group-hover:text-gray-800 transition-colors">
                            Comprehensive API documentation with examples and authentication guides.
                        </p>
                        
                        <div class="space-y-3">
                            <div class="border-t border-gray-200 pt-4">
                                <h4 class="text-sm font-semibold text-gray-800 mb-3">Key Topics:</h4>
                                <div class="grid grid-cols-1 gap-2">
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">REST APIs</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">Authentication</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-sm text-gray-600">
                                        <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                                        <span class="group-hover:text-gray-800 transition-colors">SDKs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out w-0 group-hover:w-full"></div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</section>'''
        
        (self.output_templates / "feature-cards.html").write_text(feature_cards_html, encoding='utf-8')
        print("🎯 Converted feature cards component to feature-cards.html")
    
    def convert_see_also_section(self):
        """Convert see also section to HTML template"""
        see_also_html = '''<section class="py-16 px-4 bg-gray-50">
    <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">See Also</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="{{ pathto('getting-started/installation') }}" class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
                <div class="text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 class="font-semibold mb-2 group-hover:text-blue-600 transition-colors">Installation</h3>
                <p class="text-sm text-gray-600">Get started quickly</p>
            </a>
            
            <a href="{{ pathto('api-reference/core') }}" class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 group">
                <div class="text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
                    </svg>
                </div>
                <h3 class="font-semibold mb-2 group-hover:text-green-600 transition-colors">Core API</h3>
                <p class="text-sm text-gray-600">API documentation</p>
            </a>
            
            <a href="{{ pathto('examples/index') }}" class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 group">
                <div class="text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 class="font-semibold mb-2 group-hover:text-purple-600 transition-colors">Examples</h3>
                <p class="text-sm text-gray-600">Code samples</p>
            </a>
            
            <a href="{{ pathto('security/best-practices') }}" class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 group">
                <div class="text-orange-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <h3 class="font-semibold mb-2 group-hover:text-orange-600 transition-colors">Security</h3>
                <p class="text-sm text-gray-600">Best practices</p>
            </a>
        </div>
    </div>
</section>'''
        
        (self.output_templates / "see-also-section.html").write_text(see_also_html, encoding='utf-8')
        print("👀 Converted see also section to see-also-section.html")
    
    def convert_user_guide_section(self):
        """Convert user guide section to HTML template"""
        user_guide_html = '''<section class="py-16 px-4">
    <div class="container mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">User Guide</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Step-by-step guides to help you get the most out of GRA Core Platform
            </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div class="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <span class="text-2xl">🚀</span>
                </div>
                <h3 class="text-xl font-semibold mb-4">Quick Start Guide</h3>
                <p class="text-gray-600 mb-6">Get up and running with GRA Core Platform in minutes with our comprehensive quick start guide.</p>
                <a href="{{ pathto('getting-started/quickstart') }}" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    Start Now
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
            
            <div class="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                    <span class="text-2xl">📚</span>
                </div>
                <h3 class="text-xl font-semibold mb-4">Complete Documentation</h3>
                <p class="text-gray-600 mb-6">Explore our complete documentation with detailed explanations, examples, and best practices.</p>
                <a href="{{ pathto('user-guide/index') }}" class="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                    Browse Docs
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>'''
        
        (self.output_templates / "user-guide-section.html").write_text(user_guide_html, encoding='utf-8')
        print("📚 Converted user guide section to user-guide-section.html")
    
    def extract_global_styles(self):
        """Extract global styles from app/globals.css"""
        globals_css = '''@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Styles */
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

/* Custom component styles */
.content-wrapper {
  @apply max-w-none;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus styles */
*:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out;
}

/* Responsive utilities */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}'''
        
        (self.output_static / "css" / "globals.css").write_text(globals_css, encoding='utf-8')
        print("🎨 Extracted global styles to globals.css")
    
    def create_component_css(self):
        """Create component-specific CSS"""
        components_css = '''/* Component-specific styles */

/* Header styles */
.header-nav a {
  position: relative;
}

.header-nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.header-nav a:hover::after {
  width: 100%;
}

/* Feature cards animations */
.feature-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-8px) scale(1.02);
}

/* Banner styles */
.banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Button styles */
.btn {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200;
}

.btn-primary {
  @apply text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}

.btn-secondary {
  @apply text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}

/* Card styles */
.card {
  @apply bg-white overflow-hidden shadow rounded-lg border border-gray-200;
}

.card-header {
  @apply px-4 py-5 sm:px-6 border-b border-gray-200;
}

.card-body {
  @apply px-4 py-5 sm:p-6;
}

/* Search styles */
#search-input {
  transition: all 0.3s ease;
}

#search-input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Mobile menu styles */
#mobile-menu {
  transition: all 0.3s ease;
}

#mobile-menu.show {
  display: block;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Theme toggle styles */
#theme-toggle {
  transition: transform 0.2s ease;
}

#theme-toggle:hover {
  transform: scale(1.1);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Loading states */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 640px) {
  .feature-card {
    margin-bottom: 1rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
  
  .text-4xl {
    font-size: 2.25rem;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    background: white !important;
    color: black !important;
  }
}'''
        
        (self.output_static / "css" / "components.css").write_text(components_css, encoding='utf-8')
        print("🎨 Created component-specific CSS")
    
    def create_component_js(self):
        """Create component JavaScript functionality"""
        components_js = '''// Component JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeHeader();
    initializeSearch();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeAnimations();
    
    console.log('GRA Core Platform Documentation loaded');
});

// Header functionality
function initializeHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Add scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Add transition
    header.style.transition = 'transform 0.3s ease';
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) return;
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });
}

function performSearch(query) {
    // Simple search implementation
    console.log('Searching for:', query);
    
    // In a real implementation, this would search through the documentation
    // For now, we'll just highlight matching text on the current page
    highlightSearchResults(query);
}

function highlightSearchResults(query) {
    // Remove existing highlights
    const existingHighlights = document.querySelectorAll('.search-highlight');
    existingHighlights.forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    
    if (!query) return;
    
    // Find and highlight matching text
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.parentElement.tagName !== 'SCRIPT' && 
            node.parentElement.tagName !== 'STYLE') {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const text = textNode.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        
        if (regex.test(text)) {
            const highlightedText = text.replace(regex, '<span class="search-highlight bg-yellow-200 px-1 rounded">$1</span>');
            const wrapper = document.createElement('div');
            wrapper.innerHTML = highlightedText;
            
            while (wrapper.firstChild) {
                textNode.parentNode.insertBefore(wrapper.firstChild, textNode);
            }
            textNode.remove();
        }
    });
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    // Set initial icon
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('svg');
    if (!icon) return;
    
    if (theme === 'dark') {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('show');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
        
        // Update button icon
        const icon = mobileMenuToggle.querySelector('svg');
        if (icon) {
            if (isHidden) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.feature-card, .card, section');
    animateElements.forEach(el => observer.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export functions for external use
window.GRADocs = {
    performSearch,
    highlightSearchResults,
    debounce,
    throttle
};'''
        
        (self.output_static / "js" / "components.js").write_text(components_js, encoding='utf-8')
        print("⚡ Created component JavaScript functionality")

if __name__ == "__main__":
    import sys
    project_root = sys.argv[1] if len(sys.argv) > 1 else "."
    
    converter = ReactToSphinxConverter(project_root)
    converter.convert_all()
