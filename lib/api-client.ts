class REMAPIClient {
  private baseUrl: string

  constructor() {
    // In browser: use relative URL (proxied via Next.js rewrites to backend)
    // On server: use direct backend URL
    this.baseUrl = typeof window !== 'undefined'
      ? '/api/v1'
      : `${process.env.BACKEND_URL || 'https://api.getrem.online'}/v1`
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
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
  async getCollections(apiKey: string, cursor?: string, limit = 20) {
    const params = new URLSearchParams()
    if (cursor) params.set('cursor', cursor)
    params.set('limit', limit.toString())
    return this.request(`/collections?${params}`, {
      headers: { 'X-API-Key': apiKey },
    })
  }

  async createCollection(apiKey: string, data: any) {
    return this.request('/collections', {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: JSON.stringify(data),
    })
  }

  async deleteCollection(apiKey: string, id: string) {
    return this.request(`/collections/${id}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': apiKey },
    })
  }

  // API Keys
  async getAPIKeys(apiKey: string) {
    return this.request('/api-keys', {
      headers: { 'X-API-Key': apiKey },
    })
  }

  async createAPIKey(apiKey: string, data: any) {
    return this.request('/api-keys', {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: JSON.stringify(data),
    })
  }

  async revokeAPIKey(apiKey: string, keyId: string) {
    return this.request(`/api-keys/${keyId}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': apiKey },
    })
  }

  // Usage
  async getCreditBalance(apiKey: string) {
    return this.request('/usage/credit-balance', {
      headers: { 'X-API-Key': apiKey },
    })
  }

  async getUsageSummary(apiKey: string) {
    return this.request('/usage/summary', {
      headers: { 'X-API-Key': apiKey },
    })
  }

  // Billing
  async createCheckoutSession(apiKey: string, tier: string) {
    return this.request('/billing/checkout', {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
      body: JSON.stringify({ tier }),
    })
  }

  async createPortalSession(apiKey: string) {
    return this.request('/billing/portal', {
      method: 'POST',
      headers: { 'X-API-Key': apiKey },
    })
  }
}

export const apiClient = new REMAPIClient()
