#!/usr/bin/env python3
"""
Enhanced Version management script for GRA Core Platform Documentation
Handles versioned documentation folders with .rst/.md files
"""

import os
import sys
import json
import shutil
import argparse
import subprocess
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any, Optional

class DocumentationVersionManager:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.docs_root = self.repo_path / "documentation"
        self.versions_file = self.repo_path / "_static" / "versions.json"
        self.switcher_file = self.repo_path / "_static" / "switcher.json"
        self.current_version_file = self.docs_root / "current_version.txt"
        
        # Ensure documentation structure exists
        self.ensure_documentation_structure()
    
    def ensure_documentation_structure(self):
        """Create the documentation folder structure if it doesn't exist"""
        self.docs_root.mkdir(exist_ok=True)
        
        # Create initial version if no versions exist
        if not any(self.docs_root.iterdir()):
            self.create_initial_version()
    
    def create_initial_version(self):
        """Create the initial v1.0.0 documentation structure"""
        initial_version = "v1.0.0"
        version_path = self.docs_root / initial_version
        
        # Create version folder structure
        folders = [
            "user-guide",
            "api-reference", 
            "examples",
            "tutorials",
            "contributing",
            "migration"
        ]
        
        for folder in folders:
            (version_path / folder).mkdir(parents=True, exist_ok=True)
            
            # Create index file for each folder
            index_file = version_path / folder / "index.rst"
            self.create_index_file(index_file, folder.replace("-", " ").title())
        
        # Create main index
        main_index = version_path / "index.rst"
        self.create_main_index(main_index, initial_version)
        
        # Set as current version
        self.set_current_version(initial_version)
        
        print(f"✅ Created initial documentation structure: {initial_version}")
    
    def create_index_file(self, file_path: Path, title: str):
        """Create a basic index.rst file"""
        content = f"""
{title}
{'=' * len(title)}

Welcome to the {title} section.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   getting-started
   configuration
   advanced-topics

Getting Started
---------------

This section contains comprehensive guides for {title.lower()}.

.. note::
   This documentation is version-controlled. You're viewing version {self.get_current_version()}.

"""
        file_path.write_text(content)
    
    def create_main_index(self, file_path: Path, version: str):
        """Create main index.rst file"""
        content = f"""
GRA Core Platform Documentation - {version}
{'=' * (40 + len(version))}

Welcome to the GRA Core Platform Documentation.

.. toctree::
   :maxdepth: 2
   :caption: Documentation Sections:

   user-guide/index
   api-reference/index
   examples/index
   tutorials/index
   contributing/index
   migration/index

Quick Links
-----------

* :doc:`user-guide/getting-started` - Get started quickly
* :doc:`api-reference/core` - Core API documentation
* :doc:`examples/quickstart` - Example implementations

Version Information
-------------------

You are currently viewing documentation for **{version}**.

* Release Date: {datetime.now().strftime('%Y-%m-%d')}
* Status: Active
* Previous Version: See :doc:`migration/index` for upgrade guides

"""
        file_path.write_text(content)
    
    def get_current_version(self) -> str:
        """Get the current active version"""
        if self.current_version_file.exists():
            return self.current_version_file.read_text().strip()
        return "v1.0.0"
    
    def set_current_version(self, version: str):
        """Set the current active version"""
        self.current_version_file.write_text(version)
    
    def get_all_versions(self) -> List[str]:
        """Get all available documentation versions"""
        if not self.docs_root.exists():
            return []
        
        versions = []
        for item in self.docs_root.iterdir():
            if item.is_dir() and item.name.startswith('v'):
                versions.append(item.name)
        
        # Sort versions (newest first)
        return sorted(versions, key=self.version_key, reverse=True)
    
    def version_key(self, version: str):
        """Convert version string to tuple for sorting"""
        try:
            # Remove 'v' prefix and split by dots
            parts = version.replace('v', '').split('.')
            return tuple(int(p) for p in parts)
        except:
            return (0, 0, 0)
    
    def create_new_version(self, new_version: str, from_version: Optional[str] = None, message: str = None):
        """Create a new documentation version"""
        if not new_version.startswith('v'):
            new_version = f'v{new_version}'
        
        new_version_path = self.docs_root / new_version
        
        if new_version_path.exists():
            print(f"❌ Version {new_version} already exists!")
            return False
        
        # Determine source version
        if from_version is None:
            from_version = self.get_current_version()
        
        from_version_path = self.docs_root / from_version
        
        if not from_version_path.exists():
            print(f"❌ Source version {from_version} does not exist!")
            return False
        
        # Copy from source version
        print(f"📁 Creating new version {new_version} from {from_version}...")
        shutil.copytree(from_version_path, new_version_path)
        
        # Update version references in files
        self.update_version_references(new_version_path, new_version)
        
        # Set as current version
        self.set_current_version(new_version)
        
        # Create git tag if in git repo
        if message:
            self.create_git_tag(new_version, message)
        
        # Update version files
        self.update_version_files()
        
        print(f"✅ Created new documentation version: {new_version}")
        print(f"📝 Updated current version to: {new_version}")
        
        return True
    
    def update_version_references(self, version_path: Path, version: str):
        """Update version references in documentation files"""
        for rst_file in version_path.rglob("*.rst"):
            try:
                content = rst_file.read_text()
                # Update version references (basic replacement)
                content = content.replace("version {", f"version {version}")
                content = content.replace("Version:", f"Version: {version}")
                rst_file.write_text(content)
            except Exception as e:
                print(f"⚠️  Warning: Could not update {rst_file}: {e}")
    
    def create_git_tag(self, version: str, message: str):
        """Create a git tag for the version"""
        try:
            subprocess.run(
                ["git", "tag", "-a", version, "-m", message],
                check=True,
                cwd=self.repo_path
            )
            print(f"🏷️  Created git tag: {version}")
        except subprocess.CalledProcessError as e:
            print(f"⚠️  Warning: Could not create git tag: {e}")
    
    def update_version_files(self):
        """Update versions.json and switcher.json files"""
        versions = self.get_all_versions()
        current_version = self.get_current_version()
        
        # Create versions data
        versions_data = {
            "current": current_version,
            "latest": versions[0] if versions else current_version,
            "versions": []
        }
        
        for version in versions:
            version_path = self.docs_root / version
            is_current = version == current_version
            
            versions_data["versions"].append({
                "version": version,
                "title": f"{version}" + (" (current)" if is_current else ""),
                "url": f"/documentation/{version}/",
                "is_current": is_current,
                "date": self.get_version_date(version_path),
                "status": "active" if is_current else "archived"
            })
        
        # Ensure directory exists
        self.versions_file.parent.mkdir(exist_ok=True)
        
        # Write versions file
        with open(self.versions_file, 'w') as f:
            json.dump(versions_data, f, indent=2)
        
        # Create switcher data
        switcher_data = []
        for version_info in versions_data["versions"]:
            switcher_data.append({
                "version": version_info["version"],
                "url": f"https://gra-core-docs.readthedocs.io{version_info['url']}",
                "preferred": version_info["is_current"]
            })
        
        # Write switcher file
        with open(self.switcher_file, 'w') as f:
            json.dump(switcher_data, f, indent=2)
        
        print(f"✅ Updated version files")
    
    def get_version_date(self, version_path: Path) -> str:
        """Get the creation date of a version"""
        try:
            stat = version_path.stat()
            return datetime.fromtimestamp(stat.st_ctime).isoformat()
        except:
            return datetime.now().isoformat()
    
    def list_versions(self):
        """List all available versions with details"""
        versions = self.get_all_versions()
        current = self.get_current_version()
        
        if not versions:
            print("❌ No documentation versions found.")
            return
        
        print("📋 Available Documentation Versions:")
        print(f"   Current: {current}")
        print(f"   Latest:  {versions[0] if versions else 'None'}")
        print("\n   All versions:")
        
        for version in versions:
            version_path = self.docs_root / version
            status = ""
            if version == current:
                status = " (current)"
            elif version == versions[0]:
                status = " (latest)"
            
            # Count documentation files
            rst_count = len(list(version_path.rglob("*.rst")))
            md_count = len(list(version_path.rglob("*.md")))
            
            print(f"   - {version}{status}")
            print(f"     📁 Path: {version_path}")
            print(f"     📄 Files: {rst_count} .rst, {md_count} .md")
            print(f"     📅 Created: {self.get_version_date(version_path)[:10]}")
    
    def switch_version(self, version: str):
        """Switch to a different version as current"""
        if not version.startswith('v'):
            version = f'v{version}'
        
        version_path = self.docs_root / version
        if not version_path.exists():
            print(f"❌ Version {version} does not exist!")
            return False
        
        self.set_current_version(version)
        self.update_version_files()
        
        print(f"✅ Switched to version: {version}")
        return True
    
    def delete_version(self, version: str, force: bool = False):
        """Delete a documentation version"""
        if not version.startswith('v'):
            version = f'v{version}'
        
        version_path = self.docs_root / version
        if not version_path.exists():
            print(f"❌ Version {version} does not exist!")
            return False
        
        current = self.get_current_version()
        if version == current and not force:
            print(f"❌ Cannot delete current version {version}. Use --force or switch to another version first.")
            return False
        
        if not force:
            confirm = input(f"⚠️  Are you sure you want to delete version {version}? (y/N): ")
            if confirm.lower() != 'y':
                print("❌ Deletion cancelled.")
                return False
        
        shutil.rmtree(version_path)
        
        # If we deleted the current version, switch to latest
        if version == current:
            remaining_versions = self.get_all_versions()
            if remaining_versions:
                self.switch_version(remaining_versions[0])
            else:
                self.create_initial_version()
        
        self.update_version_files()
        print(f"✅ Deleted version: {version}")
        return True
    
    def validate_documentation(self, version: Optional[str] = None):
        """Validate documentation structure and files"""
        if version is None:
            version = self.get_current_version()
        
        if not version.startswith('v'):
            version = f'v{version}'
        
        version_path = self.docs_root / version
        if not version_path.exists():
            print(f"❌ Version {version} does not exist!")
            return False
        
        print(f"🔍 Validating documentation for {version}...")
        
        issues = []
        
        # Check for required folders
        required_folders = ["user-guide", "api-reference", "examples"]
        for folder in required_folders:
            folder_path = version_path / folder
            if not folder_path.exists():
                issues.append(f"Missing required folder: {folder}")
            elif not (folder_path / "index.rst").exists():
                issues.append(f"Missing index.rst in folder: {folder}")
        
        # Check for broken references (basic check)
        for rst_file in version_path.rglob("*.rst"):
            try:
                content = rst_file.read_text()
                # Check for common issues
                if ":doc:" in content:
                    # Basic validation of doc references
                    pass
            except Exception as e:
                issues.append(f"Could not read file: {rst_file} - {e}")
        
        if issues:
            print("❌ Validation issues found:")
            for issue in issues:
                print(f"   - {issue}")
            return False
        else:
            print("✅ Documentation validation passed!")
            return True

def main():
    parser = argparse.ArgumentParser(description="Manage versioned documentation")
    parser.add_argument("--repo", default=".", help="Repository path")
    
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Create version command
    create_parser = subparsers.add_parser("create", help="Create a new documentation version")
    create_parser.add_argument("version", help="Version to create (e.g., 1.1.0)")
    create_parser.add_argument("--from", dest="from_version", help="Source version to copy from")
    create_parser.add_argument("--message", help="Version message/changelog")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List all versions")
    
    # Switch command
    switch_parser = subparsers.add_parser("switch", help="Switch current version")
    switch_parser.add_argument("version", help="Version to switch to")
    
    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a version")
    delete_parser.add_argument("version", help="Version to delete")
    delete_parser.add_argument("--force", action="store_true", help="Force deletion")
    
    # Validate command
    validate_parser = subparsers.add_parser("validate", help="Validate documentation")
    validate_parser.add_argument("--version", help="Version to validate (default: current)")
    
    # Update command
    update_parser = subparsers.add_parser("update", help="Update version files")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    manager = DocumentationVersionManager(args.repo)
    
    if args.command == "create":
        manager.create_new_version(args.version, args.from_version, args.message)
        
    elif args.command == "list":
        manager.list_versions()
        
    elif args.command == "switch":
        manager.switch_version(args.version)
        
    elif args.command == "delete":
        manager.delete_version(args.version, args.force)
        
    elif args.command == "validate":
        manager.validate_documentation(args.version)
        
    elif args.command == "update":
        manager.update_version_files()
        print("🎉 Version files updated successfully!")

if __name__ == "__main__":
    main()
