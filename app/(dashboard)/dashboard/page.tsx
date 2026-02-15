'use client'

import { Database, Search, CreditCard, FolderOpen } from 'lucide-react'
import StatsCard from '@/components/dashboard/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthBridge } from '@/lib/auth-context'
import { useCollections } from '@/lib/hooks/use-collections'
import { useCreditBalance, useUsageSummary } from '@/lib/hooks/use-usage'

export default function DashboardPage() {
  const { apiKey, isLoading: authLoading, user } = useAuthBridge()
  const { collections, isLoading: collectionsLoading } = useCollections(apiKey || '')
  const { creditBalance, isLoading: creditLoading } = useCreditBalance(apiKey || '')
  const { usageSummary, isLoading: usageLoading } = useUsageSummary(apiKey || '')

  const isLoading = authLoading || collectionsLoading || creditLoading || usageLoading

  // Calculate total vectors across all collections
  const totalVectors = collections.reduce((sum: number, col: any) => sum + (col.vector_count || 0), 0)

  // Format credit balance
  const creditBalanceFormatted = creditBalance?.balance
    ? `$${creditBalance.balance.toFixed(2)}`
    : '$0.00'

  // Get queries today (or this month if daily not available)
  const queriesToday = usageSummary?.queries_this_month || 0

  // Calculate cost this month
  const costThisMonth = usageSummary?.cost_this_month
    ? `$${usageSummary.cost_this_month.toFixed(2)}`
    : '$0.00'

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your vector database today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Vectors"
          value={isLoading ? '...' : totalVectors.toLocaleString()}
          description={collections.length > 0 ? `Across ${collections.length} collections` : 'No collections yet'}
          icon={Database}
        />
        <StatsCard
          title="Queries This Month"
          value={isLoading ? '...' : queriesToday.toLocaleString()}
          description={costThisMonth !== '$0.00' ? `${costThisMonth} spent` : 'No queries yet'}
          icon={Search}
        />
        <StatsCard
          title="Credit Balance"
          value={isLoading ? '...' : creditBalanceFormatted}
          description={costThisMonth !== '$0.00' ? `${costThisMonth} used this month` : '$20 free credit on signup'}
          icon={CreditCard}
        />
        <StatsCard
          title="Collections"
          value={isLoading ? '...' : collections.length.toString()}
          description={collections.length > 0 ? `${collections.length} active` : 'Create your first collection'}
          icon={FolderOpen}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/dashboard/collections">
            <Button>Create Collection</Button>
          </Link>
          <Link href="/dashboard/api-keys">
            <Button variant="outline">Generate API Key</Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline">View Documentation</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Quick guide to using REM Network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              1
            </div>
            <div>
              <h4 className="font-semibold">Create a Collection</h4>
              <p className="text-sm text-muted-foreground">
                Collections store vectors of a fixed dimension with a specific distance metric.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              2
            </div>
            <div>
              <h4 className="font-semibold">Generate an API Key</h4>
              <p className="text-sm text-muted-foreground">
                Create an API key to authenticate your requests to the REM Network API.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              3
            </div>
            <div>
              <h4 className="font-semibold">Start Upserting Vectors</h4>
              <p className="text-sm text-muted-foreground">
                Use the SDK or API to upsert vectors and start querying your data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
