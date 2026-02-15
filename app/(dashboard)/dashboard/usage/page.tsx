'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuthBridge } from '@/lib/auth-context'
import { useCreditBalance, useUsageSummary } from '@/lib/hooks/use-usage'

export default function UsagePage() {
  const { apiKey } = useAuthBridge()
  const { creditBalance, isLoading: creditLoading } = useCreditBalance(apiKey || '')
  const { usageSummary, isLoading: usageLoading } = useUsageSummary(apiKey || '')

  const isLoading = creditLoading || usageLoading

  const balance = creditBalance?.balance || 0
  const balanceFormatted = `$${balance.toFixed(2)}`
  const usedThisMonth = usageSummary?.cost_this_month || 0
  const usedFormatted = `$${usedThisMonth.toFixed(2)}`
  const percentRemaining = balance > 0 ? ((balance / (balance + usedThisMonth)) * 100) : 0

  const vectorsStored = usageSummary?.vectors_stored || 0
  const queriesThisMonth = usageSummary?.queries_this_month || 0
  const totalCost = usageSummary?.cost_this_month || 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage</h2>
        <p className="text-muted-foreground">Monitor your usage and credit balance</p>
      </div>

      {/* Credit Balance */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-2xl font-bold">Loading...</div>
          ) : (
            <>
              <div className="text-4xl font-bold">{balanceFormatted}</div>
              <p className="mt-1 text-sm text-muted-foreground">{usedFormatted} used this month</p>
              <div className="mt-4 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${Math.max(0, Math.min(100, percentRemaining))}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {percentRemaining.toFixed(0)}% remaining
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Usage Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vectors Stored</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold">...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{vectorsStored.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">$0.10 per 1K vectors/month</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Queries This Month</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold">...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{queriesThisMonth.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">$0.01 per 1K queries</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-2xl font-bold">...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">This billing period</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Usage History</CardTitle>
          <Button variant="outline" size="sm">Export CSV</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No usage data yet</p>
            <p className="text-xs text-muted-foreground">Start using the API to see your usage history</p>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="border-primary">
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <h3 className="text-lg font-semibold">Need more capacity?</h3>
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro for 1M vectors and 10M queries included.
            </p>
          </div>
          <Link href="/dashboard/billing">
            <Button>Upgrade Plan</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
