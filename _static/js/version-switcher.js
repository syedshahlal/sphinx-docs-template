// Version Switcher Functionality
class VersionSwitcher {
  constructor() {
    this.currentVersion = this.detectCurrentVersion()
    this.baseUrl = window.location.origin
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateCurrentVersionDisplay()
    this.highlightActiveVersion()
  }

  detectCurrentVersion() {
    // Extract version from URL path
    const path = window.location.pathname
    const versionMatch = path.match(/\/v(\d+\.\d+)\//)
    if (versionMatch) {
      return `v${versionMatch[1]}`
    }

    // Check for dev version
    if (path.includes("/dev/")) {
      return "dev"
    }

    // Default to latest
    return "v5.7"
  }

  updateCurrentVersionDisplay() {
    const currentVersionSpan = document.getElementById("current-version")
    if (currentVersionSpan) {
      currentVersionSpan.textContent = this.currentVersion
    }
  }

  highlightActiveVersion() {
    // Remove active class from all version items
    document.querySelectorAll(".version-item").forEach((item) => {
      item.classList.remove("active")
    })

    // Add active class to current version
    const activeItem = document.querySelector(`[data-version="${this.currentVersion}"]`)
    if (activeItem) {
      activeItem.classList.add("active")
    }
  }

  setupEventListeners() {
    // Version item clicks
    document.querySelectorAll(".version-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        const targetVersion = item.getAttribute("data-version")
        this.switchToVersion(targetVersion)
      })
    })

    // Compare versions button
    const compareBtn = document.getElementById("version-compare-btn")
    if (compareBtn) {
      compareBtn.addEventListener("click", () => {
        this.showVersionCompareModal()
      })
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + Shift + V to open version switcher
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "V") {
        e.preventDefault()
        this.openVersionDropdown()
      }
    })
  }

  switchToVersion(targetVersion) {
    if (targetVersion === this.currentVersion) return

    // Show loading state
    this.showLoadingState()

    // Get current page path without version
    const currentPath = window.location.pathname
    let cleanPath = currentPath.replace(/^\/v\d+\.\d+/, "").replace(/^\/dev/, "")

    // Ensure path starts with /
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath
    }

    // Construct new URL
    let newUrl
    if (targetVersion === "dev") {
      newUrl = `${this.baseUrl}/dev${cleanPath}`
    } else {
      newUrl = `${this.baseUrl}/${targetVersion}${cleanPath}`
    }

    // Navigate to new version
    window.location.href = newUrl
  }

  showLoadingState() {
    const currentVersionSpan = document.getElementById("current-version")
    if (currentVersionSpan) {
      const originalText = currentVersionSpan.textContent
      currentVersionSpan.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      // Restore after a short delay if navigation fails
      setTimeout(() => {
        if (currentVersionSpan.innerHTML.includes("fa-spinner")) {
          currentVersionSpan.textContent = originalText
        }
      }, 3000)
    }
  }

  openVersionDropdown() {
    const dropdown = document.getElementById("versionDropdown")
    if (dropdown && typeof bootstrap !== "undefined" && bootstrap.Dropdown) {
      const bsDropdown = new bootstrap.Dropdown(dropdown)
      bsDropdown.show()
    }
  }

  showVersionCompareModal() {
    // Create or show version comparison modal
    let modal = document.getElementById("version-compare-modal")
    if (!modal) {
      this.createVersionCompareModal()
      modal = document.getElementById("version-compare-modal")
    }

    if (typeof bootstrap !== "undefined") {
      const bsModal = new bootstrap.Modal(modal)
      bsModal.show()
    }
  }

  createVersionCompareModal() {
    const modalHtml = `
      <div class="modal fade" id="version-compare-modal" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="fas fa-exchange-alt me-2"></i>Compare Documentation Versions
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Compare From:</label>
                  <select class="form-select" id="compare-from-version">
                    <option value="v5.7">v5.7 (Latest)</option>
                    <option value="v5.6">v5.6 (Stable)</option>
                    <option value="v5.5">v5.5 (LTS)</option>
                    <option value="v5.4">v5.4 (Legacy)</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Compare To:</label>
                  <select class="form-select" id="compare-to-version">
                    <option value="v5.6">v5.6 (Stable)</option>
                    <option value="v5.5">v5.5 (LTS)</option>
                    <option value="v5.4">v5.4 (Legacy)</option>
                    <option value="dev">Development</option>
                  </select>
                </div>
              </div>
              
              <div class="comparison-results">
                <div class="row">
                  <div class="col-md-6">
                    <div class="version-info-card">
                      <h6 class="card-title">Version 5.7 Features</h6>
                      <ul class="feature-list">
                        <li><i class="fas fa-plus text-success me-2"></i>Enhanced GCP Integration</li>
                        <li><i class="fas fa-plus text-success me-2"></i>New API Endpoints</li>
                        <li><i class="fas fa-plus text-success me-2"></i>Improved Performance</li>
                        <li><i class="fas fa-plus text-success me-2"></i>Better Error Handling</li>
                        <li><i class="fas fa-plus text-success me-2"></i>Updated Documentation</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="version-info-card">
                      <h6 class="card-title">Version 5.6 Features</h6>
                      <ul class="feature-list">
                        <li><i class="fas fa-circle text-primary me-2"></i>Stable Core Features</li>
                        <li><i class="fas fa-circle text-primary me-2"></i>Basic GCP Support</li>
                        <li><i class="fas fa-circle text-primary me-2"></i>Standard APIs</li>
                        <li><i class="fas fa-minus text-warning me-2"></i>Limited Error Handling</li>
                        <li><i class="fas fa-minus text-warning me-2"></i>Basic Documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <h6>Migration Guide</h6>
                  <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>Upgrading from v5.6 to v5.7:</strong>
                    <ul class="mb-0 mt-2">
                      <li>Update your GCP configuration files</li>
                      <li>Review new API endpoint changes</li>
                      <li>Test error handling improvements</li>
                      <li>Update documentation references</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a href="/changelog.html" class="btn btn-primary">
                <i class="fas fa-list-alt me-2"></i>View Full Changelog
              </a>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.insertAdjacentHTML("beforeend", modalHtml)
  }
}

// Initialize version switcher when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new VersionSwitcher()
})

// Add version-specific styling
const versionStyles = `
  .version-dropdown {
    min-width: 280px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    border: none;
    border-radius: 12px;
  }

  .version-dropdown .dropdown-item {
    padding: 12px 16px;
    border-radius: 8px;
    margin: 4px 8px;
    transition: all 0.2s ease;
  }

  .version-dropdown .dropdown-item:hover {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    transform: translateX(4px);
  }

  .version-dropdown .dropdown-item.active {
    background: linear-gradient(135deg, #012169 0%, #0066cc 100%);
    color: white;
  }

  .version-dropdown .dropdown-item.active:hover {
    background: linear-gradient(135deg, #0066cc 0%, #012169 100%);
  }

  .version-dropdown .badge {
    font-size: 0.7rem;
    padding: 2px 6px;
  }

  .version-info-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    border: 1px solid #dee2e6;
    border-radius: 12px;
    padding: 20px;
    height: 100%;
  }

  .feature-list {
    list-style: none;
    padding: 0;
  }

  .feature-list li {
    padding: 8px 0;
    border-bottom: 1px solid #f1f3f4;
  }

  .feature-list li:last-child {
    border-bottom: none;
  }

  [data-theme="dark"] .version-info-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-color: #475569;
    color: #e2e8f0;
  }

  [data-theme="dark"] .feature-list li {
    border-bottom-color: #475569;
  }

  #current-version {
    font-weight: 600;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  }

  .dropdown-toggle::after {
    margin-left: 8px;
  }
`

// Inject version-specific styles
const styleSheet = document.createElement("style")
styleSheet.textContent = versionStyles
document.head.appendChild(styleSheet)
