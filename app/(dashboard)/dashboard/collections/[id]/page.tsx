'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatBytes, formatNumber } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Copy } from 'lucide-react'
import { useAuthBridge } from '@/lib/auth-context'
import { useCollections } from '@/lib/hooks/use-collections'

export default function CollectionDetailPage() {
  const params = useParams()
  const collectionId = params.id as string
  const { apiKey } = useAuthBridge()
  const { collections, isLoading } = useCollections(apiKey || '')

  const collection = collections.find((c: any) => c.id === collectionId)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/collections">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Collection Details</h2>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/collections">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">
          {collection?.name || 'Collection Details'}
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">ID</span>
              <div className="flex items-center gap-2">
                <code className="text-sm">{collectionId}</code>
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(collectionId)} aria-label="Copy collection ID">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Dimension</span>
              <span className="text-sm font-medium">{collection?.dimension ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Metric</span>
              <span className="text-sm font-medium">{collection?.metric ?? '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Replication</span>
              <span className="text-sm font-medium">{collection?.replication_factor ?? '—'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vectors</span>
              <span className="text-sm font-medium">{formatNumber(collection?.vector_count || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Storage</span>
              <span className="text-sm font-medium">{formatBytes(collection?.storage_bytes || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Assigned Miners</span>
              <span className="text-sm font-medium">{collection?.assigned_miners ?? 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Synced Miners</span>
              <span className="text-sm font-medium">{collection?.synced_miners ?? 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Python SDK</h4>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`from rem_sdk import REMClient

client = REMClient(api_key="rem_xxx")

# Upsert vectors
client.upsert("${collectionId}", vectors=[
    {"id": "vec1", "values": [0.1] * ${collection?.dimension || 384}, "metadata": {"text": "hello"}},
])

# Query
results = client.query("${collectionId}", vector=[0.1] * ${collection?.dimension || 384}, top_k=10)`}</code>
            </pre>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">cURL</h4>
            <pre className="rounded-md bg-muted p-4 text-sm overflow-x-auto">
              <code>{`curl -X POST https://getrem.online/v1/collections/${collectionId}/vectors/query \\
  -H "X-API-Key: rem_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"vector": [0.1, ...], "top_k": 10}'`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
