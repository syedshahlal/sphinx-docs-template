# Advanced GCP Configuration

Advanced configuration topics for Google Cloud Platform 5.7.

## Advanced Networking

### VPC Configuration

\`\`\`yaml
# vpc-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vpc-config
data:
  network_name: "custom-vpc"
  subnet_range: "10.0.0.0/16"
  region: "us-central1"
\`\`\`

### Custom Routes
\`\`\`bash
# Create custom route
gcloud compute routes create custom-route \
  --network=custom-vpc \
  --destination-range=192.168.1.0/24 \
  --next-hop-gateway=default-internet-gateway
\`\`\`

## Security Best Practices

### IAM Policies
\`\`\`json
{
  "bindings": [
    {
      "role": "roles/compute.admin",
      "members": [
        "user:admin@company.com"
      ]
    },
    {
      "role": "roles/storage.objectViewer",
      "members": [
        "serviceAccount:app@project.iam.gserviceaccount.com"
      ]
    }
  ]
}
\`\`\`

### Security Scanning
\`\`\`bash
# Enable security scanning
gcloud container images scan IMAGE_URL

# Check vulnerabilities
gcloud container images list-tags IMAGE_URL --show-occurrences
\`\`\`

## Monitoring and Logging

### Cloud Monitoring Setup
\`\`\`bash
# Install monitoring agent
curl -sSO https://dl.google.com/cloudagents/add-monitoring-agent-repo.sh
sudo bash add-monitoring-agent-repo.sh
sudo apt-get update
sudo apt-get install stackdriver-agent
\`\`\`

### Custom Metrics
```python
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()
project_name = f"projects/{project_id}"

# Create custom metric
descriptor = monitoring_v3.MetricDescriptor()
descriptor.type = "custom.googleapis.com/my_metric"
descriptor.metric_kind = monitoring_v3.MetricDescriptor.MetricKind.GAUGE
descriptor.value_type = monitoring_v3.MetricDescriptor.ValueType.DOUBLE

client.create_metric_descriptor(name=project_name, metric_descriptor=descriptor)
