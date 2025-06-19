#!/usr/bin/env python3
"""
Version management script for GRA Core Platform Documentation
"""

import os
import sys
import json
import argparse
import subprocess
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any

class VersionManager:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.versions_file = self.repo_path / "_static" / "versions.json"
        self.switcher_file = self.repo_path / "_static" / "switcher.json"
        
    def get_git_tags(self) -> List[str]:
        """Get all git tags that match version pattern"""
        try:
            result = subprocess.run(
                ["git", "tag", "-l", "v*.*"],
                capture_output=True,
                text=True,
                cwd=self.repo_path
            )
            if result.returncode == 0:
                tags = result.stdout.strip().split('\n')
                return [tag for tag in tags if tag.startswith('v')]
            return []
        except Exception as e:
            print(f"Error getting git tags: {e}")
            return []
    
    def get_current_version(self) -> str:
        """Get current version from conf.py"""
        conf_file = self.repo_path / "conf.py"
        if conf_file.exists():
            with open(conf_file, 'r') as f:
                content = f.read()
                for line in content.split('\n'):
                    if line.strip().startswith('version = '):
                        return line.split('=')[1].strip().strip("'\"")
        return "unknown"
    
    def create_version_entry(self, version: str, is_latest: bool = False) -> Dict[str, Any]:
        """Create a version entry for the switcher"""
        return {
            "version": version,
            "url": f"https://gra-core-docs.readthedocs.io/en/{version}/",
            "preferred": is_latest
        }
    
    def update_versions_file(self):
        """Update the versions.json file with current git tags"""
        tags = self.get_git_tags()
        current_version = self.get_current_version()
        
        # Sort versions (newest first)
        def version_key(v):
            try:
                parts = v.replace('v', '').split('.')
                return tuple(int(p) for p in parts)
            except:
                return (0, 0, 0)
        
        sorted_tags = sorted(tags, key=version_key, reverse=True)
        
        # Create versions data
        versions_data = {
            "current": current_version,
            "latest": sorted_tags[0] if sorted_tags else current_version,
            "versions": []
        }
        
        # Add current/development version
        if current_version not in sorted_tags:
            versions_data["versions"].append({
                "version": current_version,
                "title": f"{current_version} (development)",
                "url": "/",
                "is_development": True,
                "date": datetime.now().isoformat()
            })
        
        # Add released versions
        for tag in sorted_tags:
            versions_data["versions"].append({
                "version": tag,
                "title": f"{tag}" + (" (latest)" if tag == sorted_tags[0] else ""),
                "url": f"/{tag}/",
                "is_development": False,
                "date": self.get_tag_date(tag)
            })
        
        # Ensure directory exists
        self.versions_file.parent.mkdir(exist_ok=True)
        
        # Write versions file
        with open(self.versions_file, 'w') as f:
            json.dump(versions_data, f, indent=2)
        
        print(f"✅ Updated {self.versions_file}")
        return versions_data
    
    def update_switcher_file(self, versions_data: Dict[str, Any]):
        """Update the switcher.json file for pydata-sphinx-theme"""
        switcher_data = []
        
        for version_info in versions_data["versions"]:
            switcher_data.append({
                "version": version_info["version"],
                "url": f"https://gra-core-docs.readthedocs.io/en{version_info['url']}",
                "preferred": version_info["version"] == versions_data["latest"]
            })
        
        # Write switcher file
        with open(self.switcher_file, 'w') as f:
            json.dump(switcher_data, f, indent=2)
        
        print(f"✅ Updated {self.switcher_file}")
    
    def get_tag_date(self, tag: str) -> str:
        """Get the date when a tag was created"""
        try:
            result = subprocess.run(
                ["git", "log", "-1", "--format=%ai", tag],
                capture_output=True,
                text=True,
                cwd=self.repo_path
            )
            if result.returncode == 0:
                return result.stdout.strip()
        except Exception:
            pass
        return datetime.now().isoformat()
    
    def create_version_tag(self, version: str, message: str = None):
        """Create a new version tag"""
        if not version.startswith('v'):
            version = f'v{version}'
        
        if not message:
            message = f"Release {version}"
        
        try:
            # Create annotated tag
            subprocess.run(
                ["git", "tag", "-a", version, "-m", message],
                check=True,
                cwd=self.repo_path
            )
            print(f"✅ Created tag {version}")
            
            # Push tag
            subprocess.run(
                ["git", "push", "origin", version],
                check=True,
                cwd=self.repo_path
            )
            print(f"✅ Pushed tag {version}")
            
        except subprocess.CalledProcessError as e:
            print(f"❌ Error creating tag: {e}")
            sys.exit(1)
    
    def list_versions(self):
        """List all available versions"""
        if self.versions_file.exists():
            with open(self.versions_file, 'r') as f:
                data = json.load(f)
            
            print("📋 Available versions:")
            print(f"   Current: {data['current']}")
            print(f"   Latest:  {data['latest']}")
            print("\n   All versions:")
            
            for version_info in data["versions"]:
                status = ""
                if version_info.get("is_development"):
                    status = " (development)"
                elif version_info["version"] == data["latest"]:
                    status = " (latest)"
                
                print(f"   - {version_info['version']}{status}")
        else:
            print("❌ No versions file found. Run 'update' first.")
    
    def compare_versions(self, version1: str, version2: str):
        """Compare two versions (placeholder for future implementation)"""
        print(f"🔍 Comparing {version1} with {version2}")
        print("   This feature will be implemented in a future version.")

def main():
    parser = argparse.ArgumentParser(description="Manage documentation versions")
    parser.add_argument("--repo", default=".", help="Repository path")
    
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Update command
    update_parser = subparsers.add_parser("update", help="Update version files")
    
    # Tag command
    tag_parser = subparsers.add_parser("tag", help="Create a new version tag")
    tag_parser.add_argument("version", help="Version to tag (e.g., 5.7.0)")
    tag_parser.add_argument("--message", help="Tag message")
    
    # List command
    list_parser = subparsers.add_parser("list", help="List all versions")
    
    # Compare command
    compare_parser = subparsers.add_parser("compare", help="Compare versions")
    compare_parser.add_argument("version1", help="First version")
    compare_parser.add_argument("version2", help="Second version")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    manager = VersionManager(args.repo)
    
    if args.command == "update":
        versions_data = manager.update_versions_file()
        manager.update_switcher_file(versions_data)
        print("🎉 Version files updated successfully!")
        
    elif args.command == "tag":
        manager.create_version_tag(args.version, args.message)
        # Update version files after creating tag
        versions_data = manager.update_versions_file()
        manager.update_switcher_file(versions_data)
        
    elif args.command == "list":
        manager.list_versions()
        
    elif args.command == "compare":
        manager.compare_versions(args.version1, args.version2)

if __name__ == "__main__":
    main()
