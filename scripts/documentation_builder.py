#!/usr/bin/env python3
"""
Documentation builder that handles versioned documentation structure
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path
from typing import List, Dict, Any

class DocumentationBuilder:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.docs_root = self.repo_path / "documentation"
        self.build_root = self.repo_path / "_build"
        self.source_root = self.repo_path
        
    def build_version(self, version: str, output_dir: str = None):
        """Build documentation for a specific version"""
        version_path = self.docs_root / version
        
        if not version_path.exists():
            print(f"❌ Version {version} does not exist!")
            return False
        
        if output_dir is None:
            output_dir = self.build_root / "html" / version
        
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        print(f"🔨 Building documentation for {version}...")
        
        # Create temporary conf.py for this version
        temp_conf = self.create_version_conf(version)
        
        try:
            # Build with Sphinx
            cmd = [
                "sphinx-build",
                "-b", "html",
                "-c", str(temp_conf.parent),
                str(version_path),
                str(output_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ Successfully built {version}")
                return True
            else:
                print(f"❌ Build failed for {version}")
                print(result.stderr)
                return False
                
        finally:
            # Cleanup temporary conf
            if temp_conf.exists():
                temp_conf.unlink()
    
    def create_version_conf(self, version: str) -> Path:
        """Create a version-specific conf.py file"""
        version_path = self.docs_root / version
        temp_conf = version_path / "conf.py"
        
        conf_content = f'''
# Configuration file for {version} documentation

import os
import sys
from datetime import datetime

# Add the parent directory to the path
sys.path.insert(0, os.path.abspath('../..'))

# Project information
project = 'GRA Core Platform'
copyright = f'{{datetime.now().year}}, Bank of America'
author = 'Bank of America Technology Team'
version = '{version}'
release = '{version}'

# Extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx.ext.napoleon',
    'sphinx.ext.intersphinx',
    'sphinx.ext.mathjax',
    'sphinx.ext.todo',
    'sphinx.ext.ifconfig',
    'sphinx_copybutton',
    'sphinx_design',
    'myst_parser',
]

# Templates and static files
templates_path = ['../../_templates']
html_static_path = ['../../_static']

# HTML theme
html_theme = 'pydata_sphinx_theme'
html_title = f"{{project}} Documentation - {{version}}"

# Theme options
html_theme_options = {{
    "repository_url": "https://github.com/bankofamerica/gra-core",
    "repository_branch": "main",
    "use_repository_button": True,
    "use_edit_page_button": True,
    "use_download_button": True,
    "path_to_docs": f"documentation/{version}",
    "navbar_align": "left",
    "show_navbar_depth": 2,
    "show_toc_level": 3,
    "switcher": {{
        "json_url": "https://gra-core-docs.bankofamerica.com/_static/switcher.json",
        "version_match": "{version}",
    }},
}}

# Version warning for non-current versions
html_context = {{
    "version": "{version}",
    "is_current_version": False,  # Will be updated by build script
}}

# Exclude patterns
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# Master document
master_doc = 'index'
'''
        
        temp_conf.write_text(conf_content)
        return temp_conf
    
    def build_all_versions(self):
        """Build documentation for all versions"""
        from scripts.version_manager import DocumentationVersionManager
        
        manager = DocumentationVersionManager(self.repo_path)
        versions = manager.get_all_versions()
        current_version = manager.get_current_version()
        
        if not versions:
            print("❌ No versions found to build!")
            return False
        
        print(f"🔨 Building documentation for {len(versions)} versions...")
        
        success_count = 0
        for version in versions:
            if self.build_version(version):
                success_count += 1
        
        # Create version index
        self.create_version_index(versions, current_version)
        
        print(f"✅ Successfully built {success_count}/{len(versions)} versions")
        return success_count == len(versions)
    
    def create_version_index(self, versions: List[str], current_version: str):
        """Create an index page for version selection"""
        index_path = self.build_root / "html" / "index.html"
        index_path.parent.mkdir(parents=True, exist_ok=True)
        
        html_content = f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRA Core Platform Documentation</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }}
        .header {{
            text-align: center;
            margin-bottom: 3rem;
        }}
        .version-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }}
        .version-card {{
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            transition: all 0.2s ease;
        }}
        .version-card:hover {{
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }}
        .version-card.current {{
            border-color: #3b82f6;
            background: #eff6ff;
        }}
        .version-title {{
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }}
        .version-badge {{
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background: #10b981;
            color: white;
            border-radius: 4px;
            font-size: 0.75rem;
            margin-left: 0.5rem;
        }}
        .version-description {{
            color: #64748b;
            margin-bottom: 1rem;
        }}
        .version-link {{
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            transition: background 0.2s ease;
        }}
        .version-link:hover {{
            background: #2563eb;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>GRA Core Platform Documentation</h1>
        <p>Select a version to view the documentation</p>
    </div>
    
    <div class="version-grid">
'''
        
        for version in versions:
            is_current = version == current_version
            card_class = "version-card current" if is_current else "version-card"
            badge = '<span class="version-badge">Current</span>' if is_current else ''
            
            html_content += f'''
        <div class="{card_class}">
            <div class="version-title">
                {version}
                {badge}
            </div>
            <div class="version-description">
                {'Latest stable release' if is_current else 'Previous release'}
            </div>
            <a href="{version}/index.html" class="version-link">View Documentation</a>
        </div>
'''
        
        html_content += '''
    </div>
    
    <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
        <p>
            <a href="https://github.com/bankofamerica/gra-core">GitHub Repository</a> |
            <a href="https://github.com/bankofamerica/gra-core/issues">Report Issues</a> |
            <a href="mailto:gra-support@bankofamerica.com">Contact Support</a>
        </p>
    </div>
</body>
</html>
'''
        
        index_path.write_text(html_content)
        print(f"✅ Created version index at {index_path}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Build versioned documentation")
    parser.add_argument("--repo", default=".", help="Repository path")
    parser.add_argument("--version", help="Specific version to build")
    parser.add_argument("--all", action="store_true", help="Build all versions")
    parser.add_argument("--output", help="Output directory")
    
    args = parser.parse_args()
    
    builder = DocumentationBuilder(args.repo)
    
    if args.all:
        builder.build_all_versions()
    elif args.version:
        builder.build_version(args.version, args.output)
    else:
        # Build current version by default
        from scripts.version_manager import DocumentationVersionManager
        manager = DocumentationVersionManager(args.repo)
        current = manager.get_current_version()
        builder.build_version(current, args.output)

if __name__ == "__main__":
    main()
