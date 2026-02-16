class REMAPIClient {
  private baseUrl: string

  constructor() {
    // In browser: use relative URL (proxied via Next.js rewrites to backend)
    // On server: use direct backend URL
    this.baseUrl = typeof window !== 'undefined'
      ? '/api/v1'
      : `${process.env.BACKEND_URL || 'https://api.getrem.online'}/v1`
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    if (typeof window !== 'undefined' && (window as any).__clerkGetToken) {
      const token = await (window as any).__clerkGetToken()
      if (token) {
        return { 'Authorization': `Bearer ${token}` }
      }
    }
    return {}
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const authHeaders = await this.getAuthHeaders()

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
        ...options.headers,
      },
    })

    if (!response.ok) {
      let error
      try {
        error = await response.json()
      } catch {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
      }
      throw new Error(error.error?.message || error.detail || 'Request failed')
    }

    return response.json()
  }

  // Collections
  async getCollections(cursor?: string, limit = 20) {
    const params = new URLSearchParams()
    if (cursor) params.set('cursor', cursor)
    params.set('limit', limit.toString())
    return this.request(`/collections?${params}`)
  }

  async createCollection(data: any) {
    return this.request('/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteCollection(id: string) {
    return this.request(`/collections/${id}`, {
      method: 'DELETE',
    })
  }

  // API Keys
  async getAPIKeys() {
    return this.request('/api-keys')
  }

  async createAPIKey(data: any) {
    return this.request('/api-keys', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async revokeAPIKey(keyId: string) {
    return this.request(`/api-keys/${keyId}`, {
      method: 'DELETE',
    })
  }

  // Usage
  async getCreditBalance() {
    return this.request('/usage/credit-balance')
  }

  async getUsageSummary() {
    return this.request('/usage/summary')
  }

  // Billing
  async createCheckoutSession(tier: string) {
    return this.request('/billing/checkout', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    })
  }

  async createPortalSession() {
    return this.request('/billing/portal', {
      method: 'POST',
    })
  }
}

export const apiClient = new REMAPIClient()
