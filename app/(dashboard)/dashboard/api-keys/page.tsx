'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Copy } from 'lucide-react'
import { useAuthBridge } from '@/lib/auth-context'
import { useAPIKeys, useCreateAPIKey, useRevokeAPIKey } from '@/lib/hooks/use-api-keys'

export default function APIKeysPage() {
  const { apiKey, namespace } = useAuthBridge()
  const { apiKeys, isLoading, isError } = useAPIKeys(apiKey || '')
  const { createAPIKey } = useCreateAPIKey(apiKey || '')
  const { revokeAPIKey } = useRevokeAPIKey(apiKey || '')

  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyReadOnly, setNewKeyReadOnly] = useState(false)
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!newKeyName || !apiKey || !namespace) return

    setCreating(true)
    setError(null)
    try {
      const result = await createAPIKey({
        namespace_id: namespace.id,
        name: newKeyName,
        is_read_only: newKeyReadOnly,
      })
      setCreatedKey(result.key)
      setNewKeyName('')
      setNewKeyReadOnly(false)
    } catch (err: any) {
      setError(err.message || 'Failed to create API key')
    } finally {
      setCreating(false)
    }
  }

  const handleRevoke = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) return
    try {
      await revokeAPIKey(keyId)
    } catch (err: any) {
      alert(err.message || 'Failed to revoke API key')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground">Manage your API keys for authentication</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-destructive">Failed to load API keys</p>
            <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">API Keys</h2>
          <p className="text-muted-foreground">Manage your API keys for authentication</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create API Key
        </Button>
      </div>

      {/* Create API Key Dialog */}
      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle>Create New API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {createdKey ? (
              <div className="space-y-4">
                <div className="rounded-md border border-yellow-500 bg-yellow-500/10 p-4">
                  <p className="text-sm font-medium text-yellow-500">Save this key now!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You won't be able to see it again after closing this dialog.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-md bg-muted p-3 text-sm">{createdKey}</code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(createdKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => { setShowCreate(false); setCreatedKey(null); }}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                {error && (
                  <div className="rounded-md border border-destructive bg-destructive/10 p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="My API Key"
                    className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="readonly"
                    checked={newKeyReadOnly}
                    onChange={(e) => setNewKeyReadOnly(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="readonly" className="text-sm">
                    Read-only (can only query and fetch, not upsert or delete)
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreate} disabled={creating || !newKeyName}>
                    {creating ? 'Creating...' : 'Create'}
                  </Button>
                  <Button variant="outline" onClick={() => { setShowCreate(false); setError(null); }}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* API Keys Table */}
      {isLoading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">Loading API keys...</p>
          </CardContent>
        </Card>
      ) : apiKeys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium">No API keys yet</p>
            <p className="text-sm text-muted-foreground">Create your first API key to get started</p>
            <Button onClick={() => setShowCreate(true)} className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> Create API Key
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Key Prefix</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Requests</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Last Used</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key) => (
                <tr key={key.id} className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">{key.name}</td>
                  <td className="px-4 py-3 text-sm">
                    <code className="text-xs">{key.key_prefix}...</code>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded-full px-2 py-1 text-xs ${key.is_read_only ? 'bg-secondary' : 'bg-primary/10 text-primary'}`}>
                      {key.is_read_only ? 'Read-only' : 'Read-write'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{(key.total_requests || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{key.last_used_at || 'Never'}</td>
                  <td className="px-4 py-3 text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevoke(key.id)}
                      aria-label="Revoke API key"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
