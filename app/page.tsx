import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Lock, TrendingUp, DollarSign } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">REM Network</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Start Free</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Decentralized Vector Database
            <br className="hidden sm:inline" />
            {' '}for AI Applications
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Store and search billions of vectors with sub-100ms latency. Built on a decentralized network of miners for maximum reliability and performance.
          </p>
          <div className="flex gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://docs.getrem.online" target="_blank">
              <Button size="lg" variant="outline">
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Code Example */}
        <div className="w-full max-w-[800px] rounded-lg border bg-card p-6">
          <pre className="text-sm">
            <code>{`from rem_sdk import REMClient

client = REMClient(api_key="rem_xxx")
client.create_collection("my-collection", dimension=384)
client.upsert("my-collection", vectors=[...])
results = client.query("my-collection", vector=[...], top_k=10)`}</code>
          </pre>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Zap className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Sub-100ms query latency with distributed caching and optimized routing.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Lock className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Secure</h3>
            <p className="text-muted-foreground">
              End-to-end encryption with multi-replica redundancy for data safety.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Scalable</h3>
            <p className="text-muted-foreground">
              From prototype to production. Scale from thousands to billions of vectors.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <DollarSign className="h-10 w-10 text-primary" />
            <h3 className="text-xl font-bold">Affordable</h3>
            <p className="text-muted-foreground">
              $20 free credit on signup. Pay only for what you use.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-24">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[600px] text-muted-foreground">
              Start free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Free Tier */}
            <div className="flex flex-col gap-4 rounded-lg border p-6">
              <div>
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                <li>✓ $20 free credit</li>
                <li>✓ $0.10 per 1K vectors</li>
                <li>✓ $0.01 per 1K queries</li>
                <li>✓ Unlimited collections</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="flex flex-col gap-4 rounded-lg border-2 border-primary p-6">
              <div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-3xl font-bold">€29.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                <li>✓ 1M vectors included</li>
                <li>✓ 10M queries included</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full">Upgrade to Pro</Button>
              </Link>
            </div>

            {/* Business Tier */}
            <div className="flex flex-col gap-4 rounded-lg border p-6">
              <div>
                <h3 className="text-2xl font-bold">Business</h3>
                <p className="text-3xl font-bold">€99.99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                <li>✓ 10M vectors included</li>
                <li>✓ 100M queries included</li>
                <li>✓ Dedicated support</li>
                <li>✓ SLA guarantee</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full">Upgrade to Business</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 REM Network. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="https://docs.getrem.online" className="text-sm text-muted-foreground hover:underline">
              Docs
            </Link>
            <Link href="https://github.com/rem-network" className="text-sm text-muted-foreground hover:underline">
              GitHub
            </Link>
            <Link href="https://discord.gg/rem" className="text-sm text-muted-foreground hover:underline">
              Discord
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
