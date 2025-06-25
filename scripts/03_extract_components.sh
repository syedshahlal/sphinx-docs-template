#!/bin/bash

# This script extracts components from the build artifacts.
# It assumes that the build artifacts are located in the 'build' directory.
# It extracts the following components:
# - executables
# - libraries
# - configuration files
# - documentation

set -e

# Define the build directory
BUILD_DIR="build"

# Define the output directory
OUTPUT_DIR="dist"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Extract executables
echo "Extracting executables..."
find "$BUILD_DIR" -type f -executable -not -path "*/test/*" -print0 | while IFS= read -r -d $'\0' file; do
  if [[ "$file" == *".dSYM"* ]]; then
    continue
  fi
  cp -a "$file" "$OUTPUT_DIR/$(basename "$file")"
done

# Extract libraries
echo "Extracting libraries..."
find "$BUILD_DIR" -type f $$ -name "*.so" -o -name "*.dylib" -o -name "*.dll" -o -name "*.a" $$ -print0 | while IFS= read -r -d $'\0' file; do
  cp -a "$file" "$OUTPUT_DIR/$(basename "$file")"
done

# Extract configuration files
echo "Extracting configuration files..."
find "$BUILD_DIR" -type f $$ -name "*.ini" -o -name "*.conf" -o -name "*.yaml" -o -name "*.yml" -o -name "*.json" $$ -print0 | while IFS= read -r -d $'\0' file; do
  cp -a "$file" "$OUTPUT_DIR/$(basename "$file")"
done

# Extract documentation
echo "Extracting documentation..."
find "$BUILD_DIR" -type f $$ -name "*.md" -o -name "*.txt" -o -name "*.pdf" $$ -print0 | while IFS= read -r -d $'\0' file; do
  cp -a "$file" "$OUTPUT_DIR/$(basename "$file")"
done

# Create a version file
echo "Creating version file..."
VERSION=$(git describe --tags --always)
echo "$VERSION" > "$OUTPUT_DIR/version.txt"

# Create a checksum file
echo "Creating checksum file..."
find "$OUTPUT_DIR" -type f -print0 | sort -z | xargs -0 sha256sum | awk '{print $1, $2}' > "$OUTPUT_DIR/checksums.txt"

# Print a success message
echo "Components extracted successfully to '$OUTPUT_DIR'."

# Example of embedding python script
echo "Running embedded python script..."
python << 'EOF'
import os
import sys

print("Python script started")
print("Arguments:", sys.argv)
print("Environment:", os.environ)
print("Python script finished")
EOF
