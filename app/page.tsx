import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Lock, TrendingUp, DollarSign, Database, Globe, Shield, Sparkles, Code2, CheckCircle2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-grid opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />

      {/* Floating orbs */}
      <div className="fixed top-20 left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-float" />
      <div className="fixed bottom-20 right-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-float-slow" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full glass-strong border-b border-white/10">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">REM Network</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="https://docs.getrem.online" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="gap-2 glow-blue">
                  Start Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
          <div className="flex max-w-[1100px] flex-col items-center gap-6 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Decentralized. Fast. Affordable.</span>
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="text-gradient-hero">Vector Database</span>
              <br />
              for the AI Era
            </h1>

            <p className="max-w-[800px] text-lg text-muted-foreground md:text-xl lg:text-2xl">
              Store and search billions of vectors with <span className="text-primary font-semibold">sub-100ms latency</span>.
              Built on a decentralized network of miners for maximum reliability and performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 text-base px-8 py-6 glow-blue">
                  Start Building Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://docs.getrem.online" target="_blank">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 glass">
                  <Code2 className="h-5 w-5" /> View Documentation
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>$20 free credit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Deploy in 60 seconds</span>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="w-full max-w-[900px] mt-12 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <div className="glass-strong rounded-xl overflow-hidden border border-white/10 glow-purple">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground">quickstart.py</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code>
                  <span className="syn-keyword">from</span> <span className="syn-var">rem_sdk</span> <span className="syn-keyword">import</span> <span className="syn-func">REMClient</span>{'\n\n'}
                  <span className="syn-comment"># Initialize client</span>{'\n'}
                  <span className="syn-var">client</span> <span className="syn-op">=</span> <span className="syn-func">REMClient</span>(<span className="syn-var">api_key</span><span className="syn-op">=</span><span className="syn-string">"rem_xxx"</span>){'\n\n'}
                  <span className="syn-comment"># Create collection</span>{'\n'}
                  <span className="syn-var">client</span>.<span className="syn-func">create_collection</span>(<span className="syn-string">"my-vectors"</span>, <span className="syn-var">dimension</span><span className="syn-op">=</span><span className="syn-num">384</span>){'\n\n'}
                  <span className="syn-comment"># Upsert vectors</span>{'\n'}
                  <span className="syn-var">client</span>.<span className="syn-func">upsert</span>(<span className="syn-string">"my-vectors"</span>, <span className="syn-var">vectors</span><span className="syn-op">=</span>[{'\n'}
                  {'  '}{'{'}
                  <span className="syn-string">"id"</span>: <span className="syn-string">"vec1"</span>, {'\n'}
                  {'    '}<span className="syn-string">"values"</span>: [<span className="syn-num">0.1</span>, <span className="syn-num">0.2</span>, ...], {'\n'}
                  {'    '}<span className="syn-string">"metadata"</span>: {'{'}<span className="syn-string">"text"</span>: <span className="syn-string">"hello world"</span>{'}'}{'\n'}
                  {'  '}{'}'}{'\n'}
                  ]){'\n\n'}
                  <span className="syn-comment"># Query similar vectors</span>{'\n'}
                  <span className="syn-var">results</span> <span className="syn-op">=</span> <span className="syn-var">client</span>.<span className="syn-func">query</span>(<span className="syn-string">"my-vectors"</span>, <span className="syn-var">vector</span><span className="syn-op">=</span>[...], <span className="syn-var">top_k</span><span className="syn-op">=</span><span className="syn-num">10</span>)
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container py-16 animate-fade-in-up" style={{animationDelay: '400ms'}}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient">2000+</div>
              <div className="text-sm text-muted-foreground mt-2">Active Miners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient">50M+</div>
              <div className="text-sm text-muted-foreground mt-2">Vectors Stored</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient">&lt;100ms</div>
              <div className="text-sm text-muted-foreground mt-2">Query Latency</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gradient">99.9%</div>
              <div className="text-sm text-muted-foreground mt-2">Uptime SLA</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Built for <span className="text-gradient">Performance</span>
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Everything you need to build production-ready AI applications with vector search.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="gradient-border p-6 rounded-xl glass">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Sub-100ms query latency with distributed caching, optimized routing, and edge deployment.
              </p>
            </div>

            <div className="gradient-border p-6 rounded-xl glass">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Decentralized</h3>
              <p className="text-muted-foreground">
                Powered by 2000+ miners worldwide. No single point of failure. Maximum reliability.
              </p>
            </div>

            <div className="gradient-border p-6 rounded-xl glass">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure by Design</h3>
              <p className="text-muted-foreground">
                End-to-end encryption with multi-replica redundancy. Your data is always safe.
              </p>
            </div>

            <div className="gradient-border p-6 rounded-xl glass">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Infinitely Scalable</h3>
              <p className="text-muted-foreground">
                From prototype to production. Scale from thousands to billions of vectors seamlessly.
              </p>
            </div>

            <div className="gradient-border p-6 rounded-xl glass">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Cost Effective</h3>
              <p className="text-muted-foreground">
                $20 free credit on signup. Pay only for what you use. No hidden fees or surprises.
              </p>
            </div>

            <div className="gradient-border p-6 rounded-xl glass">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
              <p className="text-muted-foreground">
                SOC 2 compliant. GDPR ready. Dedicated support. SLA guarantees for peace of mind.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="container py-24">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              How <span className="text-gradient">It Works</span>
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Get started in minutes. Deploy to production in hours.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Collection</h3>
              <p className="text-muted-foreground">
                Define your vector dimension and distance metric. Collections are automatically distributed across miners.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Upsert Vectors</h3>
              <p className="text-muted-foreground">
                Upload your embeddings with metadata. Vectors are replicated across multiple miners for redundancy.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Query & Scale</h3>
              <p className="text-muted-foreground">
                Search for similar vectors with sub-100ms latency. Scale to billions of vectors effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container py-24">
          <div className="flex flex-col items-center gap-4 text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Simple, <span className="text-gradient">Transparent Pricing</span>
            </h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Start free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-[1100px] mx-auto">
            {/* Free Tier */}
            <div className="gradient-border p-8 rounded-xl glass flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>$20 free credit on signup</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>$0.10 per 1K vectors/month</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>$0.01 per 1K queries</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Unlimited collections</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Community support</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="gradient-border p-8 rounded-xl glass flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€29.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>1M vectors included</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>10M queries included</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>99.9% uptime SLA</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full glow-blue">Upgrade to Pro</Button>
              </Link>
            </div>

            {/* Business Tier */}
            <div className="gradient-border p-8 rounded-xl glass flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€99.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>10M vectors included</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>100M queries included</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>99.99% uptime SLA</span>
                </li>
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full">Upgrade to Business</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <div className="glass-strong rounded-2xl p-12 md:p-16 text-center glow-purple">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to <span className="text-gradient">Build</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-[600px] mx-auto">
              Join thousands of developers building the next generation of AI applications with REM Network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="gap-2 text-base px-8 py-6 glow-blue">
                  Start Building Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://docs.getrem.online" target="_blank">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 py-6 glass">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="font-bold">REM Network</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The decentralized vector database for the AI era.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                  <li><Link href="https://docs.getrem.online" target="_blank" className="hover:text-foreground transition-colors">Documentation</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="https://getrem.online" target="_blank" className="hover:text-foreground transition-colors">About</Link></li>
                  <li><Link href="https://getrem.online/explorer" target="_blank" className="hover:text-foreground transition-colors">Explorer</Link></li>
                  <li><Link href="https://github.com/rem-network" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="https://discord.gg/rem" target="_blank" className="hover:text-foreground transition-colors">Discord</Link></li>
                  <li><Link href="https://twitter.com/rem_network" target="_blank" className="hover:text-foreground transition-colors">Twitter</Link></li>
                  <li><Link href="https://t.me/rem_network" target="_blank" className="hover:text-foreground transition-colors">Telegram</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2026 REM Network. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
