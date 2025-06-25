# API Integration

Learn how to integrate your documentation with API endpoints.

## Overview

This documentation system can automatically link documentation pages to API endpoints, providing a seamless experience for developers.

## Features

### Automatic API Discovery
- Scans your API routes
- Generates documentation links
- Provides interactive examples

### Endpoint Documentation
- Parameter descriptions
- Response examples
- Error handling

## Usage

Create documentation files that correspond to your API endpoints:

\`\`\`markdown
# POST /api/users

Create a new user in the system.

## Parameters

- `name` (string, required): User's full name
- `email` (string, required): User's email address
- `role` (string, optional): User role (default: 'user')
\`\`\`

## Integration

The system automatically detects API endpoints and links them to corresponding documentation files.
