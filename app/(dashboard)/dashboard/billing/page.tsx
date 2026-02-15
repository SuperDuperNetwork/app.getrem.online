'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useAuthBridge } from '@/lib/auth-context'
import { apiClient } from '@/lib/api-client'

export default function BillingPage() {
  const { apiKey, namespace } = useAuthBridge()
  const [upgrading, setUpgrading] = useState(false)

  const currentTier = namespace?.tier || 'free'

  const handleUpgrade = async (tier: string) => {
    if (!apiKey) return

    setUpgrading(true)
    try {
      const result = await apiClient.createCheckoutSession(apiKey, tier)
      window.location.href = result.checkout_url
    } catch (err: any) {
      alert(err.message || 'Failed to create checkout session')
      setUpgrading(false)
    }
  }

  const handleManageBilling = async () => {
    if (!apiKey) return

    try {
      const result = await apiClient.createPortalSession(apiKey)
      window.location.href = result.portal_url
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
              <Button className="w-full" onClick={() => handleUpgrade('pro')} disabled={upgrading}>
                {upgrading ? 'Loading...' : currentTier === 'free' ? 'Upgrade to Pro' : 'Change to Pro'}
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
              <Button className="w-full" onClick={() => handleUpgrade('business')} disabled={upgrading}>
                {upgrading ? 'Loading...' : 'Upgrade to Business'}
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
