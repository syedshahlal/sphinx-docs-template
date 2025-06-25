#!/bin/bash

# Check if required tools are installed

# Check if python is installed
if ! which python > /dev/null; then
  echo "Error: python is not installed."
  exit 1
fi

echo "Checking python version..."
python --version

# Check if pip is installed
if ! which pip > /dev/null; then
  echo "Error: pip is not installed. Installing pip..."
  python -m ensurepip
  if ! which pip > /dev/null; then
    echo "Error: Failed to install pip."
    exit 1
  fi
fi

echo "Checking pip version..."
python -m pip --version

# Check if virtualenv is installed
if ! which virtualenv > /dev/null; then
  echo "virtualenv not found. Installing virtualenv..."
  python -m pip install virtualenv
  if ! which virtualenv > /dev/null; then
    echo "Error: Failed to install virtualenv."
    exit 1
  fi
fi

# Check if venv module is available
if ! python -c "import venv" > /dev/null 2>&1; then
  echo "Error: venv module is not available. Please install the python3-venv package."
  exit 1
fi

echo "Prerequisites check complete."
