#!/bin/bash

echo "🐛 Debug Information"
echo "==================="
echo ""

echo "📍 Current Directory:"
pwd
echo ""

echo "📁 Directory Contents:"
ls -la
echo ""

echo "🐍 Python Information:"
which python || echo "python not found"
python --version 2>/dev/null || echo "Cannot get Python version"
echo ""

echo "📦 pip Information:"
which pip || echo "pip not found"
pip --version 2>/dev/null || echo "Cannot get pip version"
echo ""

echo "🟢 Node.js Information:"
which node || echo "node not found"
node --version 2>/dev/null || echo "Cannot get Node version"
echo ""

echo "📦 npm Information:"
which npm || echo "npm not found"
npm --version 2>/dev/null || echo "Cannot get npm version"
echo ""

echo "📂 Project Structure:"
if [ -d "scripts" ]; then
    echo "✅ scripts/ directory exists"
    ls -la scripts/
else
    echo "❌ scripts/ directory missing"
fi
echo ""

if [ -d "venv" ]; then
    echo "✅ venv/ directory exists"
else
    echo "❌ venv/ directory missing"
fi
echo ""

echo "🔧 Script Permissions:"
if [ -d "scripts" ]; then
    for script in scripts/*.sh; do
        if [ -f "$script" ]; then
            if [ -x "$script" ]; then
                echo "✅ $script is executable"
            else
                echo "❌ $script is not executable"
                echo "   Run: chmod +x $script"
            fi
        fi
    done
fi
echo ""

echo "Press any key to continue..."
read -n 1 -s
