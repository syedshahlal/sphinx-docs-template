#!/usr/bin/env python3
"""
Development server for GRA Core Platform Documentation
Serves the built documentation locally with enhanced features
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import threading
import time
from pathlib import Path
from datetime import datetime

class DocumentationHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler with logging and CORS support"""
    
    def log_message(self, format, *args):
        """Enhanced logging with timestamps and colors"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        client_ip = self.address_string()
        
        # Color codes
        GREEN = '\033[92m'
        BLUE = '\033[94m'
        YELLOW = '\033[93m'
        RED = '\033[91m'
        RESET = '\033[0m'
        
        # Determine color based on status code
        status_code = args[1] if len(args) > 1 else "000"
        if status_code.startswith('2'):
            color = GREEN
        elif status_code.startswith('3'):
            color = YELLOW
        elif status_code.startswith('4') or status_code.startswith('5'):
            color = RED
        else:
            color = BLUE
            
        print(f"{BLUE}[{timestamp}]{RESET} {color}{client_ip}{RESET} - {format % args}")
    
    def end_headers(self):
        """Add CORS headers for local development"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

def check_build_directory(directory):
    """Check if build directory exists and has content"""
    build_path = Path(directory)
    
    if not build_path.exists():
        print(f"❌ Error: Build directory '{directory}' not found.")
        print("   Please run 'scripts/build.sh' first to build the documentation.")
        return False
    
    # Check for index.html
    index_file = build_path / "index.html"
    if not index_file.exists():
        print(f"❌ Error: index.html not found in '{directory}'.")
        print("   The build directory appears to be empty or incomplete.")
        print("   Please run 'scripts/build.sh' to build the documentation.")
        return False
    
    # Count HTML files
    html_files = list(build_path.rglob("*.html"))
    css_files = list(build_path.rglob("*.css"))
    js_files = list(build_path.rglob("*.js"))
    
    print(f"✅ Build directory verified:")
    print(f"   📄 HTML files: {len(html_files)}")
    print(f"   🎨 CSS files: {len(css_files)}")
    print(f"   ⚡ JS files: {len(js_files)}")
    
    return True

def print_server_info(port, directory):
    """Print server startup information"""
    print("🚀 GRA Core Platform Documentation Server")
    print("=" * 50)
    print(f"📁 Serving: {os.path.abspath(directory)}")
    print(f"🌐 Port: {port}")
    print(f"⏰ Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    print("📖 Documentation URLs:")
    print(f"   🔗 Local:    http://localhost:{port}")
    print(f"   🔗 Network:  http://127.0.0.1:{port}")
    print()
    print("📋 Available Pages:")
    print("   🏠 Home:           /")
    print("   📚 User Guide:     /user-guide/installation.html")
    print("   🔧 API Reference:  /api/")
    print("   💡 Examples:       /examples/")
    print("   🎓 Tutorials:      /tutorials/")
    print("   🤝 Contributing:   /contributing/")
    print()
    print("💡 Tips:")
    print("   • Press Ctrl+C to stop the server")
    print("   • Refresh browser to see changes after rebuilding")
    print("   • Use 'scripts/build.sh' to rebuild documentation")
    print("   • Server logs will appear below")
    print()

def monitor_server_stats():
    """Monitor and display server statistics"""
    start_time = time.time()
    request_count = 0
    
    def update_stats():
        nonlocal request_count
        while True:
            time.sleep(30)  # Update every 30 seconds
            uptime = time.time() - start_time
            hours = int(uptime // 3600)
            minutes = int((uptime % 3600) // 60)
            seconds = int(uptime % 60)
            
            print(f"\n📊 Server Stats - Uptime: {hours:02d}:{minutes:02d}:{seconds:02d}")
    
    # Start stats monitoring in background
    stats_thread = threading.Thread(target=update_stats, daemon=True)
    stats_thread.start()

def serve_docs(port=8000, directory="_build/html", open_browser=True):
    """Serve the built documentation locally"""
    
    print("🔍 Checking build directory...")
    if not check_build_directory(directory):
        sys.exit(1)
    
    # Change to the build directory
    original_dir = os.getcwd()
    os.chdir(directory)
    
    print_server_info(port, directory)
    
    # Create server
    Handler = DocumentationHandler
    
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print("🟢 Server Status: RUNNING")
            print("=" * 50)
            
            # Open browser automatically
            if open_browser:
                def open_browser_delayed():
                    time.sleep(1)  # Wait for server to start
                    try:
                        webbrowser.open(f'http://localhost:{port}')
                        print(f"🌐 Opened browser at http://localhost:{port}")
                    except Exception as e:
                        print(f"⚠️  Could not open browser automatically: {e}")
                
                browser_thread = threading.Thread(target=open_browser_delayed, daemon=True)
                browser_thread.start()
            
            # Start server stats monitoring
            monitor_server_stats()
            
            print("📝 Access Log:")
            print("-" * 50)
            
            # Serve forever
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n")
        print("🛑 Server stopped by user (Ctrl+C)")
        print("👋 Thanks for using GRA Core Platform Documentation!")
        
    except OSError as e:
        if e.errno == 48 or "Address already in use" in str(e):
            print(f"❌ Error: Port {port} is already in use.")
            print(f"💡 Try a different port: python scripts/serve.py --port {port + 1}")
            print("   Or stop the process using that port.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)
        
    finally:
        # Return to original directory
        os.chdir(original_dir)

def main():
    """Main function with argument parsing"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Serve GRA Core Platform Documentation locally",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/serve.py                    # Serve on port 8000
  python scripts/serve.py --port 3000       # Serve on port 3000
  python scripts/serve.py --no-browser      # Don't open browser
  python scripts/serve.py --dir _build/html # Custom directory
        """
    )
    
    parser.add_argument(
        "--port", 
        type=int, 
        default=8000, 
        help="Port to serve on (default: 8000)"
    )
    
    parser.add_argument(
        "--directory", 
        default="_build/html", 
        help="Directory to serve (default: _build/html)"
    )
    
    parser.add_argument(
        "--no-browser", 
        action="store_true", 
        help="Don't open browser automatically"
    )
    
    args = parser.parse_args()
    
    serve_docs(
        port=args.port, 
        directory=args.directory, 
        open_browser=not args.no_browser
    )

if __name__ == "__main__":
    main()
