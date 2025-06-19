#!/usr/bin/env python3
"""
Development server for GRA Core Platform Documentation
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

def serve_docs(port=8000, directory="_build/html"):
    """Serve the built documentation locally."""
    
    # Check if build directory exists
    if not Path(directory).exists():
        print(f"Error: Build directory '{directory}' not found.")
        print("Please run 'make html' first to build the documentation.")
        sys.exit(1)
    
    # Change to the build directory
    os.chdir(directory)
    
    # Create server
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print(f"Serving GRA Core Platform Documentation at http://localhost:{port}")
            print("Press Ctrl+C to stop the server")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"Error: Port {port} is already in use.")
            print(f"Try a different port: python serve.py --port {port + 1}")
        else:
            print(f"Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Serve GRA Core Platform Documentation")
    parser.add_argument("--port", type=int, default=8000, help="Port to serve on (default: 8000)")
    parser.add_argument("--directory", default="_build/html", help="Directory to serve (default: _build/html)")
    
    args = parser.parse_args()
    serve_docs(args.port, args.directory)
