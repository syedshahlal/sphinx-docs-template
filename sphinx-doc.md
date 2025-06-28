# Sphinx Documentation Integration Guide

This comprehensive guide explains how to create, manage, and integrate documentation using both Sphinx and the Next.js frontend in the GRA Core Platform project.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Creating New Documents](#creating-new-documents)
3. [Frontend Integration](#frontend-integration)
4. [Page Linking Strategies](#page-linking-strategies)
5. [Versioning System](#versioning-system)
6. [Build and Deployment](#build-and-deployment)
7. [Advanced Features](#advanced-features)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## 🎯 Overview

The GRA Core Platform uses a hybrid documentation approach:

- **Next.js Frontend**: Dynamic, interactive documentation with Markdown files
- **Sphinx Backend**: Traditional API documentation, technical references, and structured content
- **Unified System**: Seamless navigation and cross-referencing between both systems

### Architecture Flow

\`\`\`mermaid
graph TB
    A[User Request] --> B{Route Type}
    B -->|/docs/*| C[Next.js Frontend]
    B -->|/sphinx/*| D[Sphinx Backend]
    C --> E[Markdown Processor]
    D --> F[reStructuredText Processor]
    E --> G[React Components]
    F --> H[HTML Templates]
    G --> I[Unified Output]
    H --> I
\`\`\`

## 📝 Creating New Documents

### 1. Next.js Markdown Documents

#### Step 1: Create the Markdown File

Create a new `.md` file in `frontend/content/docs/`:

\`\`\`bash
# Example: Creating a new user guide
touch frontend/content/docs/user-guide.md
\`\`\`

#### Step 2: Add Frontmatter

Every Markdown file should start with YAML frontmatter:

\`\`\`yaml
---
title: "User Guide"
description: "Complete guide for using the GRA Core Platform"
date: "2024-01-15"
version: "1.0.0"
category: "user-guide"
tags: ["guide", "tutorial", "getting-started"]
author: "GRA Team"
order: 2
sidebar: true
toc: true
---
\`\`\`

#### Step 3: Write Content

Use standard Markdown syntax with enhanced features:

\`\`\`markdown
# User Guide

Welcome to the GRA Core Platform user guide.

## Getting Started

Follow these steps to get started:

1. **Installation**: Download and install the platform
2. **Configuration**: Set up your environment
3. **First Project**: Create your first project

### Code Examples

\`\`\`javascript
// Example API call
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'My Project',
    description: 'Project description'
  })
});
\`\`\`

### Interactive Elements

> **Note**: This is an important note for users.

> **Warning**: Be careful with this configuration.

### Links and References

- [API Reference](/docs/api-reference)
- [Sphinx Documentation](/sphinx/api/index.html)
- [External Link](https://example.com)

### Images

![Platform Overview](/images/docs/platform-overview.png)
\`\`\`

### 2. Sphinx reStructuredText Documents

#### Step 1: Create the RST File

Create a new `.rst` file in the appropriate `docs/` subdirectory:

\`\`\`bash
# Example: Creating API documentation
touch docs/api/authentication.rst
\`\`\`

#### Step 2: Write RST Content

\`\`\`rst
Authentication API
==================

.. currentmodule:: gra_platform.auth

Overview
--------

The Authentication API provides secure access to the GRA Core Platform.

.. autoclass:: AuthenticationManager
   :members:
   :undoc-members:
   :show-inheritance:

Quick Start
-----------

Here's how to authenticate with the platform:

.. code-block:: python

   from gra_platform import AuthenticationManager
   
   auth = AuthenticationManager(api_key="your-api-key")
   token = auth.get_access_token()

API Reference
-------------

.. autofunction:: authenticate_user

.. autofunction:: refresh_token

.. seealso::

   :doc:`user-guide`
      User guide for the platform
   
   :doc:`/frontend/docs/getting-started`
      Frontend getting started guide
\`\`\`

## 🔗 Frontend Integration

### 1. Component Integration

#### Creating Custom Components for Markdown

Create reusable components in `frontend/src/components/markdown/`:

\`\`\`typescript
// frontend/src/components/markdown/ApiExample.tsx
interface ApiExampleProps {
  endpoint: string;
  method: string;
  description: string;
}

export default function ApiExample({ endpoint, method, description }: ApiExampleProps) {
  return (
    <div className="border rounded-lg p-4 my-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-1 rounded text-xs font-mono ${
          method === 'GET' ? 'bg-green-100 text-green-800' :
          method === 'POST' ? 'bg-blue-100 text-blue-800' :
          method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {method}
        </span>
        <code className="font-mono text-sm">{endpoint}</code>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
\`\`\`

#### Using Components in Markdown (MDX Approach)

For advanced component integration, consider migrating to MDX:

\`\`\`mdx
---
title: "API Examples"
---

# API Examples

Here's how to use our API:

<ApiExample 
  endpoint="/api/v1/projects" 
  method="GET" 
  description="Retrieve all projects for the authenticated user"
/>

## Authentication

<CodeBlock language="javascript">
{`
const token = await authenticate({
  username: 'your-username',
  password: 'your-password'
});
`}
</CodeBlock>
\`\`\`

### 2. Navigation Integration

#### Update Navigation Configuration

Edit `frontend/src/lib/docs-config.ts`:

\`\`\`typescript
export const docsConfig = {
  navigation: [
    {
      title: "Getting Started",
      href: "/docs/getting-started",
      items: [
        {
          title: "Installation",
          href: "/docs/installation",
        },
        {
          title: "Quick Start",
          href: "/docs/quick-start",
        }
      ]
    },
    {
      title: "User Guide",
      href: "/docs/user-guide",
      items: [
        {
          title: "Basic Usage",
          href: "/docs/user-guide/basic-usage",
        },
        {
          title: "Advanced Features",
          href: "/docs/user-guide/advanced",
        }
      ]
    },
    {
      title: "API Reference",
      href: "/sphinx/api/index.html", // Links to Sphinx docs
      external: true
    }
  ]
};
\`\`\`

#### Dynamic Navigation Generation

Create a script to auto-generate navigation from frontmatter:

\`\`\`typescript
// scripts/generate-navigation.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface NavItem {
  title: string;
  href: string;
  order?: number;
  category?: string;
}

function generateNavigation() {
  const docsDir = path.join(process.cwd(), 'frontend/content/docs');
  const files = fs.readdirSync(docsDir, { recursive: true });
  
  const navItems: NavItem[] = [];
  
  files.forEach(file => {
    if (typeof file === 'string' && file.endsWith('.md')) {
      const filePath = path.join(docsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      navItems.push({
        title: data.title || file.replace('.md', ''),
        href: `/docs/${file.replace('.md', '')}`,
        order: data.order || 999,
        category: data.category || 'general'
      });
    }
  });
  
  // Sort by order and group by category
  const sortedItems = navItems.sort((a, b) => (a.order || 999) - (b.order || 999));
  
  // Generate navigation config
  const navConfig = groupBy(sortedItems, 'category');
  
  // Write to config file
  fs.writeFileSync(
    path.join(process.cwd(), 'frontend/src/lib/generated-nav.json'),
    JSON.stringify(navConfig, null, 2)
  );
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

generateNavigation();
\`\`\`

## 🔗 Page Linking Strategies

### 1. Internal Links (Within Next.js)

\`\`\`markdown
<!-- Relative links within docs -->
[Getting Started](./getting-started)
[User Guide](./user-guide)

<!-- Absolute links -->
[API Reference](/docs/api-reference)
[Home](/)

<!-- Links with anchors -->
[Authentication Section](/docs/api-reference#authentication)
\`\`\`

### 2. Cross-System Links (Next.js ↔ Sphinx)

#### From Next.js to Sphinx

\`\`\`markdown
<!-- Link to Sphinx-generated API docs -->
[Detailed API Reference](/sphinx/api/index.html)
[Python SDK Documentation](/sphinx/sdk/python.html)

<!-- With proper base URL handling -->
[API Classes]({sphinx_base_url}/api/classes.html)
\`\`\`

#### From Sphinx to Next.js

\`\`\`rst
.. seealso::

   `User Guide <{frontend_base_url}/docs/user-guide>`_
      Complete user guide with examples
   
   `Getting Started <{frontend_base_url}/docs/getting-started>`_
      Quick start tutorial
\`\`\`

### 3. Link Validation

Create a link checker script:

\`\`\`python
# scripts/validate_links.py
import re
import requests
from pathlib import Path

def validate_markdown_links(file_path):
    """Validate all links in a markdown file"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract markdown links
    links = re.findall(r'\[([^\]]+)\]$$([^)]+)$$', content)
    
    for text, url in links:
        if url.startswith('http'):
            # External link
            try:
                response = requests.head(url, timeout=5)
                if response.status_code >= 400:
                    print(f"❌ Broken external link: {url}")
                else:
                    print(f"✅ Valid external link: {url}")
            except:
                print(f"❌ Cannot reach: {url}")
        elif url.startswith('/'):
            # Internal absolute link
            # Check if file exists or route is valid
            print(f"🔍 Internal link: {url}")
        else:
            # Relative link
            relative_path = Path(file_path).parent / url
            if relative_path.exists():
                print(f"✅ Valid relative link: {url}")
            else:
                print(f"❌ Broken relative link: {url}")

# Usage
validate_markdown_links('frontend/content/docs/user-guide.md')
\`\`\`

## 📚 Versioning System

### 1. Version Structure

\`\`\`
docs/
├── v1.0/
│   ├── conf.py
│   ├── index.rst
│   └── api/
├── v1.1/
│   ├── conf.py
│   ├── index.rst
│   └── api/
└── latest/ -> v1.1/  # Symlink to latest version
\`\`\`

### 2. Version Management Script

\`\`\`python
# scripts/version_manager.py
import os
import shutil
from pathlib import Path

class VersionManager:
    def __init__(self, docs_root="docs"):
        self.docs_root = Path(docs_root)
        self.versions_file = self.docs_root / "versions.json"
    
    def create_version(self, version, source_version="latest"):
        """Create a new documentation version"""
        source_path = self.docs_root / source_version
        target_path = self.docs_root / f"v{version}"
        
        if target_path.exists():
            raise ValueError(f"Version {version} already exists")
        
        # Copy source to new version
        shutil.copytree(source_path, target_path)
        
        # Update version in conf.py
        conf_path = target_path / "conf.py"
        self._update_conf_version(conf_path, version)
        
        # Update versions registry
        self._update_versions_registry(version)
        
        print(f"✅ Created version {version}")
    
    def _update_conf_version(self, conf_path, version):
        """Update version in Sphinx conf.py"""
        with open(conf_path, 'r') as f:
            content = f.read()
        
        # Update version and release
        content = re.sub(r"version = '[^']*'", f"version = '{version}'", content)
        content = re.sub(r"release = '[^']*'", f"release = '{version}'", content)
        
        with open(conf_path, 'w') as f:
            f.write(content)
    
    def _update_versions_registry(self, version):
        """Update the versions registry"""
        import json
        
        if self.versions_file.exists():
            with open(self.versions_file, 'r') as f:
                versions = json.load(f)
        else:
            versions = {"versions": []}
        
        versions["versions"].append({
            "version": version,
            "path": f"v{version}",
            "created": datetime.now().isoformat()
        })
        
        with open(self.versions_file, 'w') as f:
            json.dump(versions, f, indent=2)
    
    def list_versions(self):
        """List all available versions"""
        versions = []
        for item in self.docs_root.iterdir():
            if item.is_dir() and item.name.startswith('v'):
                versions.append(item.name)
        return sorted(versions, reverse=True)
    
    def set_latest(self, version):
        """Set a version as the latest"""
        latest_path = self.docs_root / "latest"
        target_path = self.docs_root / f"v{version}"
        
        if latest_path.exists():
            latest_path.unlink()
        
        latest_path.symlink_to(target_path)
        print(f"✅ Set v{version} as latest")

# CLI usage
if __name__ == "__main__":
    import sys
    vm = VersionManager()
    
    if len(sys.argv) < 2:
        print("Usage: python version_manager.py <command> [args]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "create":
        version = sys.argv[2]
        vm.create_version(version)
    elif command == "list":
        versions = vm.list_versions()
        for v in versions:
            print(f"  {v}")
    elif command == "latest":
        version = sys.argv[2]
        vm.set_latest(version)
\`\`\`

### 3. Frontend Version Handling

\`\`\`typescript
// frontend/src/lib/version-config.ts
export interface VersionInfo {
  version: string;
  path: string;
  label: string;
  status: 'stable' | 'beta' | 'deprecated';
}

export const versions: VersionInfo[] = [
  {
    version: "1.1",
    path: "/sphinx/v1.1",
    label: "v1.1 (Latest)",
    status: "stable"
  },
  {
    version: "1.0",
    path: "/sphinx/v1.0",
    label: "v1.0",
    status: "stable"
  },
  {
    version: "0.9",
    path: "/sphinx/v0.9",
    label: "v0.9 (Deprecated)",
    status: "deprecated"
  }
];

export function getCurrentVersion(): VersionInfo {
  return versions.find(v => v.status === 'stable') || versions[0];
}
\`\`\`

### 4. Version Switcher Component

\`\`\`typescript
// frontend/src/components/shared/VersionSwitcher.tsx
import { useState } from 'react';
import { versions, type VersionInfo } from '@/lib/version-config';

export default function VersionSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(versions[0]);

  const handleVersionChange = (version: VersionInfo) => {
    setCurrentVersion(version);
    setIsOpen(false);
    
    // Navigate to the selected version
    window.location.href = version.path;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
      >
        <span>{currentVersion.label}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50">
          {versions.map((version) => (
            <button
              key={version.version}
              onClick={() => handleVersionChange(version)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                version.version === currentVersion.version ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <span>{version.label}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                version.status === 'stable' ? 'bg-green-100 text-green-800' :
                version.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {version.status}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\`

## 🚀 Build and Deployment

### 1. Build Scripts

#### Unified Build Script

\`\`\`bash
#!/bin/bash
# scripts/build-all.sh

set -e

echo "🏗️  Building GRA Core Platform Documentation"

# Build frontend
echo "📦 Building Next.js frontend..."
cd frontend
npm run build
cd ..

# Build Sphinx docs for all versions
echo "📚 Building Sphinx documentation..."
for version_dir in docs/v*/; do
    if [ -d "$version_dir" ]; then
        version=$(basename "$version_dir")
        echo "  Building $version..."
        sphinx-build -b html "$version_dir" "_build/html/$version"
    fi
done

# Build latest version
if [ -L "docs/latest" ]; then
    echo "  Building latest..."
    sphinx-build -b html "docs/latest" "_build/html/latest"
fi

echo "✅ Build complete!"
echo "📁 Frontend build: frontend/.next"
echo "📁 Sphinx build: _build/html"
\`\`\`

#### Development Server Script

\`\`\`bash
#!/bin/bash
# scripts/dev-server.sh

# Start Next.js dev server
echo "🚀 Starting Next.js development server..."
cd frontend
npm run dev &
NEXTJS_PID=$!
cd ..

# Start Sphinx auto-build
echo "📚 Starting Sphinx auto-build..."
sphinx-autobuild docs/latest _build/html/latest --host 0.0.0.0 --port 8001 &
SPHINX_PID=$!

echo "🎉 Development servers started!"
echo "📱 Next.js: http://localhost:3000"
echo "📚 Sphinx: http://localhost:8001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Cleanup function
cleanup() {
    echo "🛑 Stopping servers..."
    kill $NEXTJS_PID 2>/dev/null
    kill $SPHINX_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Wait for user interrupt
wait
\`\`\`

### 2. Deployment Configuration

#### Vercel Deployment (Next.js)

\`\`\`json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/docs/(.*)",
      "dest": "/frontend/$1"
    },
    {
      "src": "/sphinx/(.*)",
      "dest": "/sphinx/$1"
    }
  ],
  "functions": {
    "frontend/src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
\`\`\`

#### GitHub Pages Deployment

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy Documentation

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Setup Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        cd frontend && npm ci
        pip install -r requirements.txt
    
    - name: Build frontend
      run: |
        cd frontend
        npm run build
        npm run export
    
    - name: Build Sphinx docs
      run: |
        for version_dir in docs/v*/; do
          if [ -d "$version_dir" ]; then
            version=$(basename "$version_dir")
            sphinx-build -b html "$version_dir" "dist/sphinx/$version"
          fi
        done
    
    - name: Combine builds
      run: |
        mkdir -p dist
        cp -r frontend/out/* dist/
        # Sphinx files are already in dist/sphinx/
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
\`\`\`

## 🔧 Advanced Features

### 1. Search Integration

#### Algolia Search Setup

\`\`\`typescript
// frontend/src/lib/search.ts
import algoliasearch from 'algoliasearch/lite';

// ⚠️ Replace the two placeholder strings with your real credentials,
// or load them safely on the server and proxy the request.
const searchClient = algoliasearch(
  'YOUR_ALGOLIA_APP_ID',
  'YOUR_ALGOLIA_SEARCH_KEY'
);

export const searchIndex = searchClient.initIndex('gra_docs');

export interface SearchResult {
  objectID: string;
  title: string;
  content: string;
  url: string;
  type: 'markdown' | 'sphinx';
  version?: string;
}

export async function searchDocs(query: string): Promise<SearchResult[]> {
  const { hits } = await searchIndex.search<SearchResult>(query, {
    hitsPerPage: 20,
    attributesToRetrieve: ['title', 'content', 'url', 'type', 'version'],
    attributesToHighlight: ['title', 'content'],
  });
  
  return hits;
}
\`\`\`

#### Search Indexing Script

\`\`\`python
# scripts/index_content.py
import json
import os
from pathlib import Path
import frontmatter
from algoliasearch import algoliasearch

def index_markdown_files():
    """Index all markdown files for search"""
    client = algoliasearch.Client(
        os.getenv('ALGOLIA_APP_ID'),
        os.getenv('ALGOLIA_ADMIN_KEY')
    )
    index = client.init_index('gra_docs')
    
    docs_dir = Path('frontend/content/docs')
    records = []
    
    for md_file in docs_dir.rglob('*.md'):
        with open(md_file, 'r') as f:
            post = frontmatter.load(f)
        
        # Create search record
        record = {
            'objectID': str(md_file.relative_to(docs_dir)).replace('.md', ''),
            'title': post.metadata.get('title', ''),
            'content': post.content[:1000],  # Truncate content
            'url': f"/docs/{str(md_file.relative_to(docs_dir)).replace('.md', '')}",
            'type': 'markdown',
            'tags': post.metadata.get('tags', []),
            'category': post.metadata.get('category', ''),
        }
        records.append(record)
    
    # Upload to Algolia
    index.save_objects(records)
    print(f"✅ Indexed {len(records)} markdown files")

def index_sphinx_content():
    """Index Sphinx-generated content"""
    # This would parse the generated HTML files from Sphinx
    # and extract content for indexing
    pass

if __name__ == "__main__":
    index_markdown_files()
    index_sphinx_content()
\`\`\`

### 2. Analytics Integration

\`\`\`typescript
// frontend/src/lib/analytics.ts
import { Analytics } from '@vercel/analytics/react';

export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_title: title,
      page_location: url,
    });
  }
}

export function trackDocumentView(documentPath: string, documentType: 'markdown' | 'sphinx') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'document_view', {
      event_category: 'documentation',
      event_label: documentPath,
      custom_parameter_1: documentType,
    });
  }
}
\`\`\`

### 3. Content Validation

\`\`\`python
# scripts/validate_content.py
import re
import yaml
from pathlib import Path

class ContentValidator:
    def __init__(self):
        self.errors = []
        self.warnings = []
    
    def validate_markdown_file(self, file_path: Path):
        """Validate a markdown file"""
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Check frontmatter
        if not content.startswith('---'):
            self.errors.append(f"{file_path}: Missing frontmatter")
            return
        
        try:
            # Extract frontmatter
            parts = content.split('---', 2)
            frontmatter = yaml.safe_load(parts[1])
            markdown_content = parts[2]
            
            # Validate required fields
            required_fields = ['title', 'description']
            for field in required_fields:
                if field not in frontmatter:
                    self.errors.append(f"{file_path}: Missing required field '{field}'")
            
            # Validate links
            self._validate_links(file_path, markdown_content)
            
            # Validate images
            self._validate_images(file_path, markdown_content)
            
        except yaml.YAMLError as e:
            self.errors.append(f"{file_path}: Invalid YAML frontmatter: {e}")
    
    def _validate_links(self, file_path: Path, content: str):
        """Validate all links in content"""
        # Find markdown links
        links = re.findall(r'\[([^\]]+)\]$$([^)]+)$$', content)
        
        for text, url in links:
            if url.startswith('/docs/'):
                # Internal documentation link
                target_file = Path(f"frontend/content/docs/{url[6:]}.md")
                if not target_file.exists():
                    self.errors.append(f"{file_path}: Broken internal link: {url}")
            elif url.startswith('/sphinx/'):
                # Sphinx documentation link
                # Could validate against generated Sphinx content
                pass
    
    def _validate_images(self, file_path: Path, content: str):
        """Validate all images in content"""
        images = re.findall(r'!\[([^\]]*)\]$$([^)]+)$$', content)
        
        for alt_text, src in images:
            if src.startswith('/'):
                # Absolute path
                image_path = Path(f"frontend/public{src}")
                if not image_path.exists():
                    self.errors.append(f"{file_path}: Missing image: {src}")
            
            if not alt_text:
                self.warnings.append(f"{file_path}: Image missing alt text: {src}")
    
    def validate_all(self):
        """Validate all content"""
        docs_dir = Path('frontend/content/docs')
        
        for md_file in docs_dir.rglob('*.md'):
            self.validate_markdown_file(md_file)
        
        # Print results
        if self.errors:
            print("❌ Validation Errors:")
            for error in self.errors:
                print(f"  {error}")
        
        if self.warnings:
            print("⚠️  Warnings:")
            for warning in self.warnings:
                print(f"  {warning}")
        
        if not self.errors and not self.warnings:
            print("✅ All content validated successfully!")
        
        return len(self.errors) == 0

if __name__ == "__main__":
    validator = ContentValidator()
    success = validator.validate_all()
    exit(0 if success else 1)
\`\`\`

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures

**Problem**: Sphinx build fails with import errors
\`\`\`bash
# Solution: Check Python path and dependencies
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
pip install -r requirements.txt
\`\`\`

**Problem**: Next.js build fails with module not found
\`\`\`bash
# Solution: Clear cache and reinstall
cd frontend
rm -rf .next node_modules package-lock.json
npm install
npm run build
\`\`\`

#### 2. Link Issues

**Problem**: Cross-system links not working
- Check base URL configuration in both systems
- Verify deployment paths match link paths
- Use absolute URLs for cross-system links

#### 3. Version Conflicts

**Problem**: Multiple versions showing incorrect content
- Clear build cache: `rm -rf _build frontend/.next`
- Rebuild all versions: `make clean && make build`
- Check symlinks: `ls -la docs/latest`

### Debug Commands

\`\`\`bash
# Check all links
python scripts/validate_links.py

# Validate content
python scripts/validate_content.py

# Check build output
ls -la _build/html/
ls -la frontend/.next/

# Test local servers
curl http://localhost:3000/docs/getting-started
curl http://localhost:8001/api/index.html
\`\`\`

## 📋 Best Practices

### 1. Content Organization

- **Use consistent naming**: kebab-case for file names
- **Organize by topic**: Group related documents in subdirectories
- **Maintain hierarchy**: Use clear folder structure that matches navigation
- **Version appropriately**: Keep breaking changes in separate versions

### 2. Writing Guidelines

- **Clear frontmatter**: Always include title, description, and relevant metadata
- **Descriptive headings**: Use hierarchical heading structure (H1 → H2 → H3)
- **Code examples**: Include working code examples with proper syntax highlighting
- **Cross-references**: Link to related content in both systems

### 3. Maintenance

- **Regular validation**: Run content validation scripts before deployment
- **Link checking**: Validate all links periodically
- **Version cleanup**: Archive old versions that are no longer supported
- **Performance monitoring**: Track page load times and user engagement

### 4. Collaboration

- **Review process**: Implement PR reviews for documentation changes
- **Style guide**: Maintain consistent writing style and formatting
- **Contributor guide**: Provide clear instructions for contributors
- **Change tracking**: Document significant changes in changelogs

## 🎯 Quick Reference

### Essential Commands

\`\`\`bash
# Create new markdown document
touch frontend/content/docs/new-document.md

# Create new Sphinx document
touch docs/api/new-api.rst

# Build everything
make build

# Start development servers
make dev

# Validate content
python scripts/validate_content.py

# Create new version
python scripts/version_manager.py create 1.2

# Deploy
make deploy
\`\`\`

### File Templates

#### Markdown Template
\`\`\`markdown
---
title: "Document Title"
description: "Brief description of the document"
date: "2024-01-15"
category: "user-guide"
tags: ["tag1", "tag2"]
order: 1
---

# Document Title

Brief introduction to the document.

## Section 1

Content here.

## Section 2

More content.

## See Also

- [Related Document](/docs/related)
- [API Reference](/sphinx/api/index.html)
\`\`\`

#### RST Template
\`\`\`rst
Document Title
==============

.. currentmodule:: module_name

Brief introduction to the document.

Section 1
---------

Content here.

Section 2
---------

More content.

.. seealso::

   :doc:`related-document`
      Related documentation
   
   `Frontend Guide <{frontend_base_url}/docs/guide>`_
      Frontend documentation
\`\`\`

---

This guide provides a comprehensive foundation for managing documentation in the GRA Core Platform. For specific implementation details, refer to the individual component documentation and example files in the project.
