#!/bin/bash

# Check if Python is installed
if ! which python > /dev/null; then
  echo "Python is not installed. Please install it."
  exit 1
fi

# Check Python version
python --version

# Check if required files exist
if [ ! -f "file1.txt" ]; then
  echo "Error: file1.txt not found."
  exit 1
fi

if [ ! -f "file2.txt" ]; then
  echo "Error: file2.txt not found."
  exit 1
fi

echo "All checks passed."
exit 0
