import { Header } from "@/components/header"
import { Banner } from "@/components/banner"

export default function APIReferencePage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Banner />
      <Header />
      <main className="content-section">
        <div className="content-container">
          <div className="space-y-8">
            <div className="content-header border-b border-border pb-6">
              <h1 className="content-title">API Reference</h1>
              <p className="content-subtitle">
                Complete API documentation with examples and best practices for the GRA Core Platform.
              </p>
            </div>

            <div className="grid-2">
              <div className="card-base p-6 interactive-hover">
                <div className="feature-card-icon">
                  <span className="text-2xl">🔌</span>
                </div>
                <h2 className="feature-card-title">Core API</h2>
                <p className="feature-card-description mb-4">Essential API endpoints for platform functionality.</p>
                <a href="/api-reference/core" className="feature-card-cta">
                  View documentation →
                </a>
              </div>

              <div className="card-base p-6 interactive-hover">
                <div className="feature-card-icon">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="feature-card-title">Authentication</h2>
                <p className="feature-card-description mb-4">Authentication and security API endpoints.</p>
                <a href="/api-reference/authentication" className="feature-card-cta">
                  View documentation →
                </a>
              </div>

              <div className="card-base p-6 interactive-hover">
                <div className="feature-card-icon">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="feature-card-title">Data Models</h2>
                <p className="feature-card-description mb-4">Schema definitions and data types.</p>
                <a href="/api-reference/data-models" className="feature-card-cta">
                  View documentation →
                </a>
              </div>

              <div className="card-base p-6 interactive-hover">
                <div className="feature-card-icon">
                  <span className="text-2xl">📦</span>
                </div>
                <h2 className="feature-card-title">SDKs</h2>
                <p className="feature-card-description mb-4">Client libraries and software development kits.</p>
                <a href="/api-reference/sdks" className="feature-card-cta">
                  View documentation →
                </a>
              </div>
            </div>

            <div className="card-base p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Reference</h2>
              <div className="grid-2">
                <div>
                  <h3 className="font-medium mb-2">Base URL</h3>
                  <code className="text-sm bg-muted px-2 py-1 rounded border">
                    https://api.gra-core.bankofamerica.com
                  </code>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Authentication</h3>
                  <code className="text-sm bg-muted px-2 py-1 rounded border">Bearer Token</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
