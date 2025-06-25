#!/bin/bash

# This script sets up a simple development environment.

# Start a simple HTTP server in the current directory.
echo "Starting HTTP server on port 8000..."
python -m http.server &

# Open the index.html file in the default browser.
echo "Opening index.html in the default browser..."
xdg-open index.html

echo "Development environment setup complete."
