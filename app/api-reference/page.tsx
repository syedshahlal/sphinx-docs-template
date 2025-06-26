import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function APIReferencePage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Banner />
      <Header />
      <main className="content-section">
        <div className="content-container">
          <div className="content-layout">
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-content">
                <div className="hero-badge">
                  <span className="text-xs font-medium">API v5.7</span>
                </div>
                <h1 className="hero-title">API Reference</h1>
                <p className="hero-description">
                  Complete API documentation with examples and best practices for the GRA Core Platform.
                </p>
                <div className="hero-actions">
                  <a href="#quick-start" className="btn-primary">
                    Get Started
                  </a>
                  <a href="/docs/_build/html/v5.7/api-reference/index.html" className="btn-secondary">
                    View Full Docs
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Reference Cards */}
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">Quick Reference</h2>
                <p className="section-description">Essential information to get started</p>
              </div>
              <div className="reference-grid">
                <div className="reference-card">
                  <div className="reference-icon">🌐</div>
                  <h3 className="reference-title">Base URL</h3>
                  <code className="reference-code">
                    https://api.gra-core.bankofamerica.com
                  </code>
                </div>
                <div className="reference-card">
                  <div className="reference-icon">🔐</div>
                  <h3 className="reference-title">Authentication</h3>
                  <code className="reference-code">Bearer Token</code>
                </div>
                <div className="reference-card">
                  <div className="reference-icon">⚡</div>
                  <h3 className="reference-title">Rate Limit</h3>
                  <code className="reference-code">1000 req/hour</code>
                </div>
                <div className="reference-card">
                  <div className="reference-icon">📊</div>
                  <h3 className="reference-title">Format</h3>
                  <code className="reference-code">JSON</code>
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">API Endpoints</h2>
                <p className="section-description">Explore our comprehensive API documentation</p>
              </div>
              <div className="api-grid">
                <div className="api-card featured">
                  <div className="api-card-header">
                    <div className="api-icon">🔌</div>
                    <div className="api-badge">Core</div>
                  </div>
                  <h3 className="api-title">Core API</h3>
                  <p className="api-description">
                    Essential API endpoints for platform functionality, resource management, and core operations.
                  </p>
                  <div className="api-features">
                    <span className="feature-tag">Resource Management</span>
                    <span className="feature-tag">Configuration</span>
                    <span className="feature-tag">Monitoring</span>
                  </div>
                  <a href="/docs/_build/html/v5.7/api-reference/core.html" className="api-cta">
                    Explore Core API →
                  </a>
                </div>

                <div className="api-card">
                  <div className="api-card-header">
                    <div className="api-icon">🔐</div>
                    <div className="api-badge">Security</div>
                  </div>
                  <h3 className="api-title">Authentication</h3>
                  <p className="api-description">
                    Comprehensive authentication and authorization endpoints with OAuth 2.0 support.
                  </p>
                  <div className="api-features">
                    <span className="feature-tag">OAuth 2.0</span>
                    <span className="feature-tag">JWT Tokens</span>
                    <span className="feature-tag">RBAC</span>
                  </div>
                  <a href="/docs/_build/html/v5.7/api-reference/authentication.html" className="api-cta">
                    View Auth Docs →
                  </a>
                </div>

                <div className="api-card">
                  <div className="api-card-header">
                    <div className="api-icon">📊</div>
                    <div className="api-badge">Schema</div>
                  </div>
                  <h3 className="api-title">Data Models</h3>
                  <p className="api-description">
                    Complete schema definitions, data types, and validation rules for all API endpoints.
                  </p>
                  <div className="api-features">
                    <span className="feature-tag">JSON Schema</span>
                    <span className="feature-tag">Validation</span>
                    <span className="feature-tag">Examples</span>
                  </div>
                  <a href="/docs/_build/html/v5.7/api-reference/data-models.html" className="api-cta">
                    Browse Schemas →
                  </a>
                </div>

                <div className="api-card">
                  <div className="api-card-header">
                    <div className="api-icon">📦</div>
                    <div className="api-badge">SDK</div>
                  </div>
                  <h3 className="api-title">SDKs & Libraries</h3>
                  <p className="api-description">
                    Official client libraries and SDKs for multiple programming languages.
                  </p>
                  <div className="api-features">
                    <span className="feature-tag">Multi-language</span>
                    <span className="feature-tag">Examples</span>
                    <span className="feature-tag">Best Practices</span>
                  </div>
                  <a href="/docs/_build/html/v5.7/api-reference/sdks.html" className="api-cta">
                    Download SDKs →
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Example */}
            <div className="section-container">
              <div className="section-header">
                <h2 className="section-title">Try It Out</h2>
                <p className="section-description">Interactive example to get you started</p>
              </div>
              <div className="example-container">
                <div className="example-tabs">
                  <button className="tab-button active">cURL</button>
                  <button className="tab-button">JavaScript</button>
                  <button className="tab-button">Python</button>
                </div>
                <div className="example-content">
                  <pre className="code-block">
                    <code>{`curl -X GET "https://api.gra-core.bankofamerica.com/v1/status" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`}</code>
                  </pre>
                </div>
                <div className="example-response">
                  <h4 className="response-title">Response</h4>
                  <pre className="code-block response">
                    <code>{`{
  "success": true,
  "data": {
    "status": "operational",
    "version": "v5.7",
    "uptime": "99.99%"
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="section-container">
              <div className="support-section">
                <div className="support-content">
                  <h2 className="support-title">Need Help?</h2>
                  <p className="support-description">
                    Our team is here to help you succeed with the GRA Core Platform API.
                  </p>
                  <div className="support-links">
                    <a href="/docs/_build/html/v5.7/troubleshooting/index.html" className="support-link">
                      <span className="support-icon">📚</span>
                      <span>Documentation</span>
                    </a>
                    <a href="#" className="support-link">
                      <span className="support-icon">💬</span>
                      <span>Support Portal</span>
                    </a>
                    <a href="#" className="support-link">
                      <span className="support-icon">👥</span>
                      <span>Community</span>
                    </a>
                    <a href="#" className="support-link">
                      <span className="support-icon">📊</span>
                      <span>Status Page</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
