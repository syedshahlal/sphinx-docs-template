# Getting Started with GCP 5.7

This guide will help you get started with Google Cloud Platform version 5.7.

## Prerequisites

Before you begin, ensure you have:

- A Google account
- Valid payment method (for billing)
- Basic understanding of cloud concepts

## Step 1: Create Your GCP Account

1. Visit [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with your Google account
3. Accept the terms of service
4. Set up billing information

## Step 2: Create Your First Project

\`\`\`bash
# Using gcloud CLI
gcloud projects create my-first-project --name="My First Project"
\`\`\`

Or use the web console:
1. Click "Select a project" dropdown
2. Click "New Project"
3. Enter project name and ID
4. Click "Create"

## Step 3: Enable APIs

Enable the APIs you'll need:

\`\`\`bash
# Enable common APIs
gcloud services enable compute.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable bigquery.googleapis.com
\`\`\`

## Step 4: Set Up Authentication

### Service Account Method
\`\`\`bash
# Create service account
gcloud iam service-accounts create my-service-account

# Download key file
gcloud iam service-accounts keys create ~/key.json \
  --iam-account my-service-account@my-project.iam.gserviceaccount.com
\`\`\`

### Application Default Credentials
\`\`\`bash
gcloud auth application-default login
\`\`\`

## Step 5: Deploy Your First Application

### Using App Engine
\`\`\`bash
# Initialize App Engine
gcloud app create --region=us-central

# Deploy application
gcloud app deploy
\`\`\`

### Using Compute Engine
\`\`\`bash
# Create VM instance
gcloud compute instances create my-instance \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --image-family=debian-11 \
  --image-project=debian-cloud
\`\`\`

## Common Commands

| Command | Description |
|---------|-------------|
| `gcloud config list` | Show current configuration |
| `gcloud projects list` | List all projects |
| `gcloud compute instances list` | List VM instances |
| `gcloud storage ls` | List storage buckets |

## Troubleshooting

### Authentication Issues
\`\`\`bash
# Re-authenticate
gcloud auth login

# Check current account
gcloud auth list
\`\`\`

### Permission Issues
\`\`\`bash
# Check IAM permissions
gcloud projects get-iam-policy PROJECT_ID
\`\`\`

## Next Steps

- Explore [Advanced Configuration](file2.md)
- Return to [Introduction](intro.md)
- Browse all topics in [Index](index.md)

---

*Need help? Check our troubleshooting guide or contact support.*
