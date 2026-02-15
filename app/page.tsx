'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Globe, Shield, TrendingUp, DollarSign, Lock, Database, CheckCircle2, ChevronRight, Cpu, Network, BarChart3, Menu, X, Copy, Check } from 'lucide-react'

const ROTATING_WORDS = ['semantic search', 'RAG pipelines', 'AI agents', 'recommendations']
const WORD_INTERVAL = 2500

function RotatingText() {
  const [index, setIndex] = useState(0)
  const [animClass, setAnimClass] = useState('rotate-word-enter')

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimClass('rotate-word-exit')
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length)
        setAnimClass('rotate-word-enter')
      }, 400)
    }, WORD_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="inline-block overflow-hidden h-[1.2em] align-bottom">
      <span className={`inline-block text-gradient-multi ${animClass}`}>
        {ROTATING_WORDS[index]}
      </span>
    </span>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useReveal()
  return <section ref={ref} id={id} className={`reveal ${className}`}>{children}</section>
}

function HeroCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors" aria-label="Copy code">
      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-zinc-500" />}
    </button>
  )
}

const HERO_CODE = `from rem_sdk import REMClient

# Connect to the decentralized network
client = REMClient(api_key="rem_xxx")

# Create a collection — auto-distributed across miners
client.create_collection("products", dimension=384, metric="cosine")

# Upsert vectors with metadata
client.upsert("products", vectors=[
  {"id": "p1", "values": [0.1, 0.2, ...], "metadata": {"category": "electronics"}},
])

# Query — routed to nearest miner for lowest latency
results = client.query("products", vector=[0.1, ...], top_k=10)`

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060a14]">
      {/* Background layers */}
      <div className="fixed inset-0 bg-grid-pattern" />
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px] orb-1" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px] orb-2" />
      <div className="fixed top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-600/5 blur-[100px] orb-1" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Database className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">REM</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">Docs</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black text-sm font-medium px-4 py-2 hover:bg-zinc-200 transition-colors hidden sm:flex"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-6 py-4 space-y-3">
            <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Features</Link>
            <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">How It Works</Link>
            <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Pricing</Link>
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Docs</Link>
            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
              <Link href="/sign-in" className="text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Sign In</Link>
              <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black text-sm font-medium px-4 py-2.5 hover:bg-zinc-200 transition-colors">
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              2,000+ miners online
            </div>
          </div>

          <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Performance at scale for<br />
            <RotatingText />
          </h1>

          <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed mb-10">
            The decentralized vector database delivering relevant results at any scale.
            Powered by a global network of miners — not a single cloud provider.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black font-medium px-7 py-3.5 text-base hover:bg-zinc-200 transition-colors"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 text-white font-medium px-7 py-3.5 text-base hover:bg-white/10 transition-colors"
            >
              Documentation <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-400 mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-6">Trusted in production</p>
            <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0">
              <div className="text-center md:flex-1 md:px-6">
                <div className="text-3xl md:text-4xl font-bold text-white">2,000+</div>
                <div className="text-sm text-zinc-500 mt-1">Active miners</div>
              </div>
              <div className="stat-divider h-12 flex-shrink-0 hidden md:block" />
              <div className="text-center md:flex-1 md:px-6">
                <div className="text-3xl md:text-4xl font-bold text-white">50M+</div>
                <div className="text-sm text-zinc-500 mt-1">Vectors stored</div>
              </div>
              <div className="stat-divider h-12 flex-shrink-0 hidden md:block" />
              <div className="text-center md:flex-1 md:px-6">
                <div className="text-3xl md:text-4xl font-bold text-white">&lt;100ms</div>
                <div className="text-sm text-zinc-500 mt-1">p95 latency</div>
              </div>
              <div className="stat-divider h-12 flex-shrink-0 hidden md:block" />
              <div className="text-center md:flex-1 md:px-6">
                <div className="text-3xl md:text-4xl font-bold text-white">99.9%</div>
                <div className="text-sm text-zinc-500 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code example */}
      <Section className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <div className="code-window rounded-xl overflow-hidden shadow-2xl shadow-blue-500/5 relative">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <div className="h-3 w-3 rounded-full bg-white/10" />
                <span className="ml-3 text-xs text-zinc-500">quickstart.py</span>
              </div>
              <HeroCopyButton text={HERO_CODE} />
              <pre className="p-6 text-[13px] leading-relaxed overflow-x-auto"><code><span className="syn-kw">from</span> <span className="syn-var">rem_sdk</span> <span className="syn-kw">import</span> <span className="syn-cls">REMClient</span>{'\n'}{'\n'}<span className="syn-cmt"># Connect to the decentralized network</span>{'\n'}<span className="syn-var">client</span> <span className="syn-op">=</span> <span className="syn-cls">REMClient</span>(<span className="syn-var">api_key</span><span className="syn-op">=</span><span className="syn-str">&quot;rem_xxx&quot;</span>){'\n'}{'\n'}<span className="syn-cmt"># Create a collection — auto-distributed across miners</span>{'\n'}<span className="syn-var">client</span>.<span className="syn-fn">create_collection</span>(<span className="syn-str">&quot;products&quot;</span>, <span className="syn-var">dimension</span><span className="syn-op">=</span><span className="syn-num">384</span>, <span className="syn-var">metric</span><span className="syn-op">=</span><span className="syn-str">&quot;cosine&quot;</span>){'\n'}{'\n'}<span className="syn-cmt"># Upsert vectors with metadata</span>{'\n'}<span className="syn-var">client</span>.<span className="syn-fn">upsert</span>(<span className="syn-str">&quot;products&quot;</span>, <span className="syn-var">vectors</span><span className="syn-op">=</span>[{'\n'}{'  '}<span className="syn-op">{'{'}</span><span className="syn-str">&quot;id&quot;</span>: <span className="syn-str">&quot;p1&quot;</span>, <span className="syn-str">&quot;values&quot;</span>: [<span className="syn-num">0.1</span>, <span className="syn-num">0.2</span>, ...], <span className="syn-str">&quot;metadata&quot;</span>: <span className="syn-op">{'{'}</span><span className="syn-str">&quot;category&quot;</span>: <span className="syn-str">&quot;electronics&quot;</span><span className="syn-op">{'}'}</span><span className="syn-op">{'}'}</span>,{'\n'}]){'\n'}{'\n'}<span className="syn-cmt"># Query — routed to nearest miner for lowest latency</span>{'\n'}<span className="syn-var">results</span> <span className="syn-op">=</span> <span className="syn-var">client</span>.<span className="syn-fn">query</span>(<span className="syn-str">&quot;products&quot;</span>, <span className="syn-var">vector</span><span className="syn-op">=</span>[<span className="syn-num">0.1</span>, ...], <span className="syn-var">top_k</span><span className="syn-op">=</span><span className="syn-num">10</span>)</code></pre>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Why teams choose <span className="text-gradient-blue">REM</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Purpose-built for AI workloads. Decentralized by design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: 'Sub-100ms Latency', desc: 'Queries routed to the nearest miner. Distributed caching ensures consistent low-latency responses globally.', color: 'text-amber-400' },
              { icon: Globe, title: 'Decentralized Network', desc: '2,000+ miners across the globe. No single point of failure. Your data is always available, always redundant.', color: 'text-blue-400' },
              { icon: Shield, title: 'Secure by Default', desc: 'End-to-end encryption. Multi-replica storage. Hashed API keys. Your data never touches a centralized server.', color: 'text-green-400' },
              { icon: TrendingUp, title: 'Scale to Billions', desc: 'From 1,000 to 1,000,000,000 vectors. The network grows with you — more miners, more capacity, same latency.', color: 'text-purple-400' },
              { icon: DollarSign, title: '10x More Affordable', desc: '€20 free credit on signup. Pay-as-you-go pricing that\'s a fraction of centralized alternatives.', color: 'text-emerald-400' },
              { icon: Lock, title: 'Enterprise Ready', desc: 'SOC 2 compliant. GDPR ready. SLA guarantees. Dedicated support for business-critical workloads.', color: 'text-rose-400' },
            ].map((f, i) => (
              <div key={i} className="card-feature rounded-xl p-6">
                <f.icon className={`h-10 w-10 ${f.color} mb-4`} />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              From zero to production in <span className="text-gradient-green">minutes</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Three steps. No infrastructure to manage. No servers to provision.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto relative">
            {/* Step connectors (visible on md+) */}
            <div className="hidden md:block absolute top-7 left-[calc(33.33%+0.5rem)] right-[calc(66.66%-0.5rem)] border-t-2 border-dashed border-white/10" />
            <div className="hidden md:block absolute top-7 left-[calc(66.66%+0.5rem)] right-[calc(33.33%-0.5rem)] border-t-2 border-dashed border-white/10" />
            {[
              { step: '01', icon: Cpu, title: 'Create a Collection', desc: 'Define your vector dimension and distance metric. Your collection is automatically distributed across miners for redundancy.' },
              { step: '02', icon: Network, title: 'Upsert Vectors', desc: 'Upload embeddings with metadata using our SDK or REST API. Data is replicated across multiple miners in real-time.' },
              { step: '03', icon: BarChart3, title: 'Query at Scale', desc: 'Search for similar vectors with sub-100ms latency. Queries are routed to the optimal miner automatically.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-white/10 bg-white/5 mb-5">
                  <s.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="text-xs font-mono text-zinc-500 mb-2">STEP {s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Start free. Scale without surprises.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Free */}
            <div className="card-pricing rounded-xl p-8 flex flex-col">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-1">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€0</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">€20 free credit included</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['€20 free credit on signup', 'Pay-as-you-go after credit', 'Unlimited collections', '60 requests/min', 'Community support'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center rounded-lg border border-white/10 bg-white/5 text-white font-medium py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="card-pricing card-pricing-featured rounded-xl p-8 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                Most Popular
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-1">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€29.99</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">For growing applications</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['1M vectors included', '10M queries included', '600 requests/min', 'Priority support', '99.9% uptime SLA'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center rounded-lg bg-white text-black font-medium py-3 text-sm hover:bg-zinc-200 transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Business */}
            <div className="card-pricing rounded-xl p-8 flex flex-col">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-1">Business</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">€99.99</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">For production workloads</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['10M vectors included', '100M queries included', '6,000 requests/min', 'Dedicated support', '99.99% uptime SLA'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className="block text-center rounded-lg border border-white/10 bg-white/5 text-white font-medium py-3 text-sm hover:bg-white/10 transition-colors"
              >
                Upgrade to Business
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Start building with REM
            </h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
              €20 free credit. No credit card required. Deploy your first vector collection in under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black font-medium px-8 py-4 text-base hover:bg-zinc-200 transition-colors"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 text-white font-medium px-8 py-4 text-base hover:bg-white/10 transition-colors"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Database className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-semibold">REM Network</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                The decentralized vector database for the AI era.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="https://getrem.online" target="_blank" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="https://getrem.online/explorer" target="_blank" className="hover:text-white transition-colors">Network Explorer</Link></li>
                <li><Link href="https://github.com/rem-network" target="_blank" className="hover:text-white transition-colors">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Community</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="https://discord.gg/rem" target="_blank" className="hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="https://twitter.com/rem_network" target="_blank" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://t.me/rem_network" target="_blank" className="hover:text-white transition-colors">Telegram</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-600">© 2026 REM Network. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-zinc-600">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
