'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, CheckCircle2, XCircle } from 'lucide-react'
import { useAuthBridge } from '@/lib/auth-context'

export default function BillingPage() {
  const { namespace } = useAuthBridge()
  const [upgrading, setUpgrading] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const canceled = searchParams.get('canceled')

  const currentTier = namespace?.tier || 'free'

  const handleUpgrade = async (tier: string) => {
    setUpgrading(tier)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout')
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      }
    } catch (err: any) {
      alert(err.message || 'Failed to create checkout session')
      setUpgrading(null)
    }
  }

  const handleManageBilling = async () => {
    try {
      const res = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to open portal')
      if (data.portal_url) {
        window.location.href = data.portal_url
      }
    } catch (err: any) {
      alert(err.message || 'Failed to open billing portal')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {success && (
        <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
          <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-300">Payment successful</p>
            <p className="text-xs text-green-400/70">Your subscription has been activated. It may take a moment to reflect.</p>
          </div>
        </div>
      )}

      {canceled && (
        <div className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <XCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-300">Checkout canceled</p>
            <p className="text-xs text-yellow-400/70">No charges were made. You can try again anytime.</p>
          </div>
        </div>
      )}

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold capitalize">{currentTier}</div>
              <p className="text-sm text-muted-foreground">
                {currentTier === 'free' && '$20 free credit on signup'}
                {currentTier === 'pro' && '€29.99/month - 1M vectors, 10M queries'}
                {currentTier === 'business' && '€99.99/month - 10M vectors, 100M queries'}
              </p>
            </div>
            {currentTier !== 'free' && (
              <Button onClick={handleManageBilling} variant="outline">
                Manage Billing
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Free */}
        <Card className={currentTier === 'free' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                $20 free credit
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                $0.10 per 1K vectors
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                $0.01 per 1K queries
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Unlimited collections
              </li>
            </ul>
            {currentTier === 'free' ? (
              <Button className="w-full" disabled>Current Plan</Button>
            ) : (
              <Button className="w-full" variant="outline" onClick={handleManageBilling}>
                Manage Subscription
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className={currentTier === 'pro' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <div className="text-3xl font-bold">€29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                1M vectors included
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                10M queries included
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Priority support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Advanced analytics
              </li>
            </ul>
            {currentTier === 'pro' ? (
              <Button className="w-full" disabled>Current Plan</Button>
            ) : (
              <Button className="w-full" onClick={() => handleUpgrade('pro')} disabled={!!upgrading}>
                {upgrading === 'pro' ? 'Redirecting to Stripe...' : currentTier === 'free' ? 'Upgrade to Pro' : 'Change to Pro'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Business */}
        <Card className={currentTier === 'business' ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>Business</CardTitle>
            <div className="text-3xl font-bold">€99.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                10M vectors included
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                100M queries included
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Dedicated support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                SLA guarantee
              </li>
            </ul>
            {currentTier === 'business' ? (
              <Button className="w-full" disabled>Current Plan</Button>
            ) : (
              <Button className="w-full" onClick={() => handleUpgrade('business')} disabled={!!upgrading}>
                {upgrading === 'business' ? 'Redirecting to Stripe...' : 'Upgrade to Business'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      {currentTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Manage payment methods in Stripe</p>
                <p className="text-xs text-muted-foreground">Update cards, view invoices, and more</p>
              </div>
              <Button variant="outline" onClick={handleManageBilling}>
                Open Billing Portal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
