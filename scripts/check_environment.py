#!/usr/bin/env python3
"""
Environment checker for GRA Core Platform Documentation
Verifies that all required dependencies are properly installed
"""

import sys
import subprocess
import importlib
import platform
from pathlib import Path

class EnvironmentChecker:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.info = []
        
    def log_error(self, message):
        self.errors.append(message)
        print(f"❌ ERROR: {message}")
        
    def log_warning(self, message):
        self.warnings.append(message)
        print(f"⚠️  WARNING: {message}")
        
    def log_info(self, message):
        self.info.append(message)
        print(f"✅ INFO: {message}")
        
    def check_python_version(self):
        """Check Python version"""
        print("\n🐍 Checking Python...")
        version = sys.version_info
        
        if version.major < 3 or (version.major == 3 and version.minor < 8):
            self.log_error(f"Python 3.8+ required, found {version.major}.{version.minor}")
            return False
        else:
            self.log_info(f"Python {version.major}.{version.minor}.{version.micro} ✓")
            return True
            
    def check_required_packages(self):
        """Check required Python packages"""
        print("\n📦 Checking required packages...")
        
        required_packages = {
            'sphinx': '6.0.0',
            'pydata_sphinx_theme': '0.14.0',
            'sphinx_design': '0.4.0',
            'sphinx_copybutton': '0.5.0',
            'myst_parser': '1.0.0',
        }
        
        all_good = True
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                if hasattr(module, '__version__'):
                    version = module.__version__
                    self.log_info(f"{package} {version} ✓")
                else:
                    self.log_info(f"{package} (version unknown) ✓")
            except ImportError:
                self.log_error(f"{package} not installed")
                all_good = False
                
        return all_good
        
    def check_optional_packages(self):
        """Check optional packages"""
        print("\n🔧 Checking optional packages...")
        
        optional_packages = [
            'sphinx_autobuild',
            'sphinx_multiversion',
            'sphinxcontrib_mermaid',
            'requests',
            'beautifulsoup4',
        ]
        
        for package in optional_packages:
            try:
                module = importlib.import_module(package)
                if hasattr(module, '__version__'):
                    version = module.__version__
                    self.log_info(f"{package} {version} ✓")
                else:
                    self.log_info(f"{package} (version unknown) ✓")
            except ImportError:
                self.log_warning(f"{package} not installed (optional)")
                
    def check_system_tools(self):
        """Check system tools"""
        print("\n🛠️  Checking system tools...")
        
        tools = {
            'git': 'Git version control',
            'make': 'Build automation (optional)',
        }
        
        for tool, description in tools.items():
            try:
                result = subprocess.run([tool, '--version'], 
                                      capture_output=True, text=True)
                if result.returncode == 0:
                    version_line = result.stdout.split('\n')[0]
                    self.log_info(f"{tool}: {version_line} ✓")
                else:
                    self.log_warning(f"{tool} not found ({description})")
            except FileNotFoundError:
                self.log_warning(f"{tool} not found ({description})")
                
    def check_project_structure(self):
        """Check project structure"""
        print("\n📁 Checking project structure...")
        
        required_files = [
            'conf.py',
            'index.rst',
            'requirements.txt',
        ]
        
        required_dirs = [
            '_static',
            '_templates',
        ]
        
        for file_path in required_files:
            if Path(file_path).exists():
                self.log_info(f"{file_path} ✓")
            else:
                self.log_error(f"{file_path} missing")
                
        for dir_path in required_dirs:
            if Path(dir_path).exists():
                self.log_info(f"{dir_path}/ ✓")
            else:
                self.log_warning(f"{dir_path}/ missing (will be created)")
                
    def check_build_capability(self):
        """Test if documentation can be built"""
        print("\n🏗️  Testing build capability...")
        
        if not Path('conf.py').exists():
            self.log_error("Cannot test build - conf.py missing")
            return False
            
        try:
            # Try a quick build test
            result = subprocess.run([
                'sphinx-build', '-b', 'html', '-q', 
                '.', '_build/test'
            ], capture_output=True, text=True, timeout=30)
            
            if result.returncode == 0:
                self.log_info("Test build successful ✓")
                return True
            else:
                self.log_error(f"Test build failed: {result.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            self.log_error("Test build timed out")
            return False
        except FileNotFoundError:
            self.log_error("sphinx-build command not found")
            return False
            
    def print_summary(self):
        """Print summary of checks"""
        print("\n" + "="*60)
        print("🔍 ENVIRONMENT CHECK SUMMARY")
        print("="*60)
        
        print(f"\n✅ Successful checks: {len(self.info)}")
        print(f"⚠️  Warnings: {len(self.warnings)}")
        print(f"❌ Errors: {len(self.errors)}")
        
        if self.errors:
            print("\n❌ ERRORS TO FIX:")
            for error in self.errors:
                print(f"   • {error}")
                
        if self.warnings:
            print("\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"   • {warning}")
                
        print(f"\n🖥️  System: {platform.system()} {platform.release()}")
        print(f"🐍 Python: {sys.version}")
        
        if not self.errors:
            print("\n🎉 Environment is ready for development!")
            print("\nNext steps:")
            print("   1. Run: make livehtml")
            print("   2. Open: http://localhost:8000")
        else:
            print("\n🔧 Please fix the errors above before proceeding.")
            
        return len(self.errors) == 0
        
    def run_all_checks(self):
        """Run all environment checks"""
        print("🔍 GRA Core Platform Documentation - Environment Check")
        print("="*60)
        
        checks = [
            self.check_python_version,
            self.check_required_packages,
            self.check_optional_packages,
            self.check_system_tools,
            self.check_project_structure,
            self.check_build_capability,
        ]
        
        for check in checks:
            try:
                check()
            except Exception as e:
                self.log_error(f"Check failed with exception: {e}")
                
        return self.print_summary()

def main():
    checker = EnvironmentChecker()
    success = checker.run_all_checks()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
