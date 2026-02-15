'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, ExternalLink } from 'lucide-react'
import { formatBytes, formatNumber } from '@/lib/utils'
import { useAuthBridge } from '@/lib/auth-context'
import { useCollections, useCreateCollection, useDeleteCollection } from '@/lib/hooks/use-collections'

export default function CollectionsPage() {
  const { apiKey } = useAuthBridge()
  const { collections, isLoading, isError } = useCollections(apiKey || '')
  const { createCollection } = useCreateCollection(apiKey || '')
  const { deleteCollection } = useDeleteCollection(apiKey || '')

  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDimension, setNewDimension] = useState('384')
  const [newMetric, setNewMetric] = useState('cosine')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async () => {
    if (!newName || !apiKey) return

    setCreating(true)
    setError(null)
    try {
      await createCollection({
        name: newName,
        dimension: parseInt(newDimension),
        metric: newMetric,
        replication_factor: 3,
      })
      setShowCreate(false)
      setNewName('')
      setNewDimension('384')
      setNewMetric('cosine')
    } catch (err: any) {
      setError(err.message || 'Failed to create collection')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection? This action cannot be undone.')) return
    try {
      await deleteCollection(id)
    } catch (err: any) {
      alert(err.message || 'Failed to delete collection')
    }
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
          <p className="text-muted-foreground">Manage your vector collections</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium text-destructive">Failed to load collections</p>
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
          <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
          <p className="text-muted-foreground">Manage your vector collections</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Collection
        </Button>
      </div>

      {/* Create Collection Dialog */}
      {showCreate && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md border border-destructive bg-destructive/10 p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="my-collection"
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Dimension</label>
                <input
                  type="number"
                  value={newDimension}
                  onChange={(e) => setNewDimension(e.target.value)}
                  placeholder="384"
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Metric</label>
                <select
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="cosine">Cosine</option>
                  <option value="euclidean">Euclidean</option>
                  <option value="dot_product">Dot Product</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} disabled={creating || !newName}>
                {creating ? 'Creating...' : 'Create'}
              </Button>
              <Button variant="outline" onClick={() => { setShowCreate(false); setError(null); }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Collections Table */}
      {isLoading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">Loading collections...</p>
          </CardContent>
        </Card>
      ) : collections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium">No collections yet</p>
            <p className="text-sm text-muted-foreground">Create your first collection to get started</p>
            <Button onClick={() => setShowCreate(true)} className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> Create Collection
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Dimension</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Metric</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Vectors</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Storage</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((col) => (
                <tr key={col.id} className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">{col.name}</td>
                  <td className="px-4 py-3 text-sm">{col.dimension}</td>
                  <td className="px-4 py-3 text-sm">{col.metric}</td>
                  <td className="px-4 py-3 text-sm">{formatNumber(col.vector_count || 0)}</td>
                  <td className="px-4 py-3 text-sm">{formatBytes(col.storage_bytes || 0)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/collections/${col.id}`}>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(col.id)}
                        aria-label="Delete collection"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
