// Version comparison functionality
class VersionCompare {
  constructor() {
    this.currentVersion = document.querySelector(".version-switcher")?.value || "v5.7"
    this.baseUrl = window.location.origin
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadVersionSwitcher()
  }

  setupEventListeners() {
    const versionSwitcher = document.getElementById("version-switcher")
    const compareButton = document.getElementById("version-compare")

    if (versionSwitcher) {
      versionSwitcher.addEventListener("change", (e) => {
        this.switchVersion(e.target.value)
      })
    }

    if (compareButton) {
      compareButton.addEventListener("click", () => {
        this.showCompareModal()
      })
    }
  }

  async loadVersionSwitcher() {
    try {
      // In a real implementation, this would fetch from your version API
      const versions = [
        { version: "v5.7", label: "v5.7 (latest)", url: "/v5.7/" },
        { version: "v5.6", label: "v5.6", url: "/v5.6/" },
        { version: "v5.5", label: "v5.5", url: "/v5.5/" },
        { version: "v5.4", label: "v5.4", url: "/v5.4/" },
      ]

      const switcher = document.getElementById("version-switcher")
      if (switcher) {
        switcher.innerHTML = ""
        versions.forEach((v) => {
          const option = document.createElement("option")
          option.value = v.version
          option.textContent = v.label
          option.selected = v.version === this.currentVersion
          switcher.appendChild(option)
        })
      }
    } catch (error) {
      console.error("Failed to load version data:", error)
    }
  }

  switchVersion(version) {
    if (version === this.currentVersion) return

    // Get current page path
    const currentPath = window.location.pathname
    const pathWithoutVersion = currentPath.replace(/^\/v\d+\.\d+/, "")

    // Construct new URL
    const newUrl = `${this.baseUrl}/${version}${pathWithoutVersion}`

    // Navigate to new version
    window.location.href = newUrl
  }

  async showCompareModal() {
    const modal = document.getElementById("version-compare-modal")
    if (!modal) {
      this.createCompareModal()
      return
    }

    // Show modal
    const bsModal = new bootstrap.Modal(modal)
    bsModal.show()

    // Load comparison data
    await this.loadComparisonData()
  }

  createCompareModal() {
    const modalHtml = `
      <div class="modal fade" id="version-compare-modal" tabindex="-1">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Compare Documentation Versions</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="compare-version-select-1" class="form-label">Version 1:</label>
                  <select class="form-select" id="compare-version-select-1">
                    <option value="v5.7">v5.7 (latest)</option>
                    <option value="v5.6">v5.6</option>
                    <option value="v5.5">v5.5</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="compare-version-select-2" class="form-label">Version 2:</label>
                  <select class="form-select" id="compare-version-select-2">
                    <option value="v5.6" selected>v5.6</option>
                    <option value="v5.5">v5.5</option>
                    <option value="v5.4">v5.4</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <h6>Version <span id="compare-version-1">v5.7</span></h6>
                  <div id="compare-content-1" class="compare-content">
                    <div class="text-center p-4">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <h6>Version <span id="compare-version-2">v5.6</span></h6>
                  <div id="compare-content-2" class="compare-content">
                    <div class="text-center p-4">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="update-comparison">Update Comparison</button>
            </div>
          </div>
        </div>
      </div>
    `

    document.body.insertAdjacentHTML("beforeend", modalHtml)

    // Setup event listeners for the new modal
    const updateBtn = document.getElementById("update-comparison")
    if (updateBtn) {
      updateBtn.addEventListener("click", () => this.loadComparisonData())
    }

    // Show the modal
    const modal = document.getElementById("version-compare-modal")
    const bsModal = new bootstrap.Modal(modal)
    bsModal.show()

    this.loadComparisonData()
  }

  async loadComparisonData() {
    const version1Select = document.getElementById("compare-version-select-1")
    const version2Select = document.getElementById("compare-version-select-2")
    const content1 = document.getElementById("compare-content-1")
    const content2 = document.getElementById("compare-content-2")
    const label1 = document.getElementById("compare-version-1")
    const label2 = document.getElementById("compare-version-2")

    if (!version1Select || !version2Select) return

    const version1 = version1Select.value
    const version2 = version2Select.value

    // Update labels
    if (label1) label1.textContent = version1
    if (label2) label2.textContent = version2

    // Get current page path for comparison
    const currentPath = window.location.pathname.replace(/^\/v\d+\.\d+/, "") || "/index.html"

    try {
      // Load content for both versions
      const [content1Data, content2Data] = await Promise.all([
        this.fetchVersionContent(version1, currentPath),
        this.fetchVersionContent(version2, currentPath),
      ])

      // Display content
      if (content1) {
        content1.innerHTML = this.formatComparisonContent(content1Data, version1)
      }
      if (content2) {
        content2.innerHTML = this.formatComparisonContent(content2Data, version2)
      }

      // Highlight differences
      this.highlightDifferences()
    } catch (error) {
      console.error("Failed to load comparison data:", error)
      if (content1) {
        content1.innerHTML = '<div class="alert alert-danger">Failed to load content for ' + version1 + "</div>"
      }
      if (content2) {
        content2.innerHTML = '<div class="alert alert-danger">Failed to load content for ' + version2 + "</div>"
      }
    }
  }

  async fetchVersionContent(version, path) {
    try {
      const url = `${this.baseUrl}/${version}${path}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const html = await response.text()

      // Extract main content from HTML
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const mainContent = doc.querySelector(".article-content") || doc.querySelector("main") || doc.body

      return {
        html: mainContent ? mainContent.innerHTML : "Content not found",
        version: version,
        url: url,
      }
    } catch (error) {
      console.error(`Failed to fetch content for ${version}:`, error)
      return {
        html: `<div class="alert alert-warning">Content not available for ${version}</div>`,
        version: version,
        url: null,
      }
    }
  }

  formatComparisonContent(contentData, version) {
    return `
      <div class="version-content" data-version="${version}">
        <div class="content-meta mb-2">
          <small class="text-muted">
            ${contentData.url ? `<a href="${contentData.url}" target="_blank">View full page</a>` : "Content unavailable"}
          </small>
        </div>
        <div class="content-body">
          ${contentData.html}
        </div>
      </div>
    `
  }

  highlightDifferences() {
    // Simple diff highlighting - in production, use a proper diff library
    const content1 = document.querySelector("#compare-content-1 .content-body")
    const content2 = document.querySelector("#compare-content-2 .content-body")

    if (!content1 || !content2) return

    const text1 = content1.textContent || ""
    const text2 = content2.textContent || ""

    // Basic word-level comparison
    const words1 = text1.split(/\s+/)
    const words2 = text2.split(/\s+/)

    // This is a simplified diff - in production, use a library like diff2html
    if (text1 !== text2) {
      content1.style.borderLeft = "4px solid #28a745"
      content2.style.borderLeft = "4px solid #dc3545"
    }
  }
}

// Initialize version comparison
document.addEventListener("DOMContentLoaded", () => {
  new VersionCompare()
})
