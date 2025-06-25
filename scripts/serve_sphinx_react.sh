#!/bin/bash

set -e

echo "🌐 Starting Sphinx Documentation Server"

# Build if needed
if [ ! -d "_build/html" ]; then
    ./scripts/build_sphinx_react.sh
fi

# Start server
PORT=${1:-8000}
echo "🚀 Server: http://localhost:${PORT}"

cd _build/html
python3 -m http.server $PORT
