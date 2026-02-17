'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Globe, Shield, TrendingUp, DollarSign, Lock, Database, CheckCircle2, ChevronRight, Cpu, Network, BarChart3, Menu, X, Copy, Check, Search, Filter, BookOpen, Layers, Bot, ShoppingCart, Brain, Link2, Code } from 'lucide-react'

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

const HERO_CODE = `from rem import REM

client = REM(api_key="rem_xxx")

# Create collection with AES-256-GCM encrypted fields
collection = client.create_collection("products", dimension=384,
    encrypted_fields=["email", "pii_data"])

# Upsert vectors with metadata (encrypted fields auto-handled)
collection.upsert([
  {"id": "p1", "values": embed("..."), "metadata": {
      "category": "electronics", "price": 299.99}},
])

# Hybrid search: vector similarity + keyword matching + filters
results = collection.query(
    vector=embed("wireless headphones"),
    query_text="noise cancelling",    # BM25 keyword boost
    filter={"price": {"$lte": 500}},  # metadata filtering
    top_k=10)`

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
            <Link href="#use-cases" className="text-sm text-zinc-400 hover:text-white transition-colors">Use Cases</Link>
            <Link href="#integrations" className="text-sm text-zinc-400 hover:text-white transition-colors">Integrations</Link>
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
            <Link href="#use-cases" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Use Cases</Link>
            <Link href="#integrations" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-zinc-400 hover:text-white transition-colors py-1.5">Integrations</Link>
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

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
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

          {/* Install badge */}
          <div className="animate-fade-up delay-400 mb-16">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm">
              <code className="text-zinc-300 font-mono">pip install rem-vectordb</code>
              <HeroCopyButton text="pip install rem-vectordb" />
            </div>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-500 mx-auto max-w-3xl">
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
              <pre className="p-6 text-[13px] leading-relaxed overflow-x-auto"><code><span className="syn-kw">from</span> <span className="syn-var">rem</span> <span className="syn-kw">import</span> <span className="syn-cls">REM</span>{'\n'}{'\n'}<span className="syn-var">client</span> <span className="syn-op">=</span> <span className="syn-cls">REM</span>(<span className="syn-var">api_key</span><span className="syn-op">=</span><span className="syn-str">&quot;rem_xxx&quot;</span>){'\n'}{'\n'}<span className="syn-cmt"># Create collection with AES-256-GCM encrypted fields</span>{'\n'}<span className="syn-var">collection</span> <span className="syn-op">=</span> <span className="syn-var">client</span>.<span className="syn-fn">create_collection</span>(<span className="syn-str">&quot;products&quot;</span>, <span className="syn-var">dimension</span><span className="syn-op">=</span><span className="syn-num">384</span>,{'\n'}{'    '}<span className="syn-var">encrypted_fields</span><span className="syn-op">=</span>[<span className="syn-str">&quot;email&quot;</span>, <span className="syn-str">&quot;pii_data&quot;</span>]){'\n'}{'\n'}<span className="syn-cmt"># Upsert vectors with metadata (encrypted fields auto-handled)</span>{'\n'}<span className="syn-var">collection</span>.<span className="syn-fn">upsert</span>([{'\n'}{'  '}<span className="syn-op">{'{'}</span><span className="syn-str">&quot;id&quot;</span>: <span className="syn-str">&quot;p1&quot;</span>, <span className="syn-str">&quot;values&quot;</span>: <span className="syn-fn">embed</span>(<span className="syn-str">&quot;...&quot;</span>), <span className="syn-str">&quot;metadata&quot;</span>: <span className="syn-op">{'{'}</span>{'\n'}{'      '}<span className="syn-str">&quot;category&quot;</span>: <span className="syn-str">&quot;electronics&quot;</span>, <span className="syn-str">&quot;price&quot;</span>: <span className="syn-num">299.99</span><span className="syn-op">{'}'}</span><span className="syn-op">{'}'}</span>,{'\n'}]){'\n'}{'\n'}<span className="syn-cmt"># Hybrid search: vector similarity + keyword matching + filters</span>{'\n'}<span className="syn-var">results</span> <span className="syn-op">=</span> <span className="syn-var">collection</span>.<span className="syn-fn">query</span>({'\n'}{'    '}<span className="syn-var">vector</span><span className="syn-op">=</span><span className="syn-fn">embed</span>(<span className="syn-str">&quot;wireless headphones&quot;</span>),{'\n'}{'    '}<span className="syn-var">query_text</span><span className="syn-op">=</span><span className="syn-str">&quot;noise cancelling&quot;</span>,{'    '}<span className="syn-cmt"># BM25 keyword boost</span>{'\n'}{'    '}<span className="syn-var">filter</span><span className="syn-op">=</span><span className="syn-op">{'{'}</span><span className="syn-str">&quot;price&quot;</span>: <span className="syn-op">{'{'}</span><span className="syn-str">&quot;$lte&quot;</span>: <span className="syn-num">500</span><span className="syn-op">{'}'}</span><span className="syn-op">{'}'}</span>,{'  '}<span className="syn-cmt"># metadata filtering</span>{'\n'}{'    '}<span className="syn-var">top_k</span><span className="syn-op">=</span><span className="syn-num">10</span>)</code></pre>
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
              { icon: Shield, title: 'AES-256-GCM Encryption', desc: 'Per-field metadata encryption with per-namespace keys. Vectors are obfuscated before reaching miners — your data stays private even on a decentralized network.', color: 'text-green-400' },
              { icon: Search, title: 'Hybrid Search', desc: 'Combine vector similarity with BM25 keyword matching via Reciprocal Rank Fusion. Get the best of semantic understanding and exact keyword relevance.', color: 'text-cyan-400' },
              { icon: Filter, title: 'Metadata Filtering', desc: 'Pinecone-compatible filter operators ($eq, $gt, $in, $and, $or and more). Filter results by any metadata field with zero performance overhead.', color: 'text-amber-400' },
              { icon: Globe, title: 'Decentralized Network', desc: '2,000+ miners across the globe. No single point of failure. Your data is replicated across 3 miners for redundancy.', color: 'text-blue-400' },
              { icon: Zap, title: 'Sub-100ms Latency', desc: 'Queries routed to the nearest miner. Distributed caching ensures consistent low-latency responses globally.', color: 'text-purple-400' },
              { icon: Layers, title: 'Batch Operations', desc: 'Execute up to 10 queries in a single API call. Perfect for recommendation engines, AI agents, and parallel retrieval pipelines.', color: 'text-pink-400' },
              { icon: Code, title: 'Framework Integrations', desc: 'Native LangChain and LlamaIndex integrations. Drop-in vector store that works with your existing RAG pipeline in minutes.', color: 'text-orange-400' },
              { icon: Database, title: 'Full CRUD Operations', desc: 'Complete vector lifecycle — upsert, query, fetch by ID, and delete. Built for production RAG with source document retrieval and GDPR compliance.', color: 'text-teal-400' },
              { icon: DollarSign, title: '10x More Affordable', desc: 'Free tier with generous credit. Pay-as-you-go pricing that\'s a fraction of centralized alternatives like Pinecone.', color: 'text-emerald-400' },
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

      {/* Use Cases */}
      <Section id="use-cases" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Built for every <span className="text-gradient-green">AI use case</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              From RAG pipelines to recommendation engines — REM powers production AI at any scale.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* RAG Pipelines */}
            <div className="card-feature rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">RAG Pipelines</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Build retrieval-augmented generation with native LangChain and LlamaIndex support. Store document chunks with metadata, retrieve relevant context with hybrid search, and fetch source documents by ID for citations.
              </p>
              <div className="rounded-lg border border-white/10 bg-[#0d1117] p-4 overflow-x-auto">
                <pre className="text-[12px] leading-relaxed text-zinc-300"><code>{`from rem.integrations.langchain import REMVectorStore
from langchain_openai import OpenAIEmbeddings

store = REMVectorStore(
    api_key="rem_xxx",
    collection_name="docs",
    embedding=OpenAIEmbeddings()
)
store.add_texts(["Your documents here..."])
results = store.similarity_search("query", k=5)`}</code></pre>
              </div>
            </div>

            {/* Semantic Search */}
            <div className="card-feature rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold">Semantic Search</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Go beyond keywords. Hybrid search combines vector similarity with BM25 keyword matching via Reciprocal Rank Fusion. Filter by any metadata field with Pinecone-compatible operators.
              </p>
              <div className="rounded-lg border border-white/10 bg-[#0d1117] p-4 overflow-x-auto">
                <pre className="text-[12px] leading-relaxed text-zinc-300"><code>{`results = collection.query(
    vector=embed("wireless headphones"),
    query_text="noise cancelling",  # BM25 boost
    hybrid_alpha=0.5,               # 50/50 blend
    filter={"price": {"$lte": 500}},
    top_k=10
)`}</code></pre>
              </div>
            </div>

            {/* AI Agents */}
            <div className="card-feature rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">AI Agents</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Give your AI agents long-term memory. Store conversation embeddings, tool outputs, and knowledge. Batch queries let agents search multiple memory banks in a single API call.
              </p>
              <div className="rounded-lg border border-white/10 bg-[#0d1117] p-4 overflow-x-auto">
                <pre className="text-[12px] leading-relaxed text-zinc-300"><code>{`# Batch query across multiple memory types
results = collection.query_batch([
    {"vector": embed("user question"), "top_k": 5,
     "filter": {"type": "conversation"}},
    {"vector": embed("user question"), "top_k": 3,
     "filter": {"type": "tool_output"}},
    {"vector": embed("user question"), "top_k": 3,
     "filter": {"type": "knowledge"}},
])`}</code></pre>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card-feature rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold">Recommendations</h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Power product and content recommendations with vector similarity. Use metadata filters for personalization, batch queries for multiple recommendation feeds, and real-time upserts as users interact.
              </p>
              <div className="rounded-lg border border-white/10 bg-[#0d1117] p-4 overflow-x-auto">
                <pre className="text-[12px] leading-relaxed text-zinc-300"><code>{`# Find similar products, filtered by category
results = collection.query(
    vector=user_preference_embedding,
    top_k=20,
    filter={
        "category": {"$in": ["electronics", "gadgets"]},
        "in_stock": True,
        "price": {"$lte": 500}
    }
)`}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Integrations */}
      <Section id="integrations" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Integrates with your <span className="text-gradient-blue">stack</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Native integrations with the frameworks you already use. Drop-in and go.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Python SDK */}
            <div className="card-feature rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-blue-500/10 mb-4">
                <Code className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Python SDK</h3>
              <p className="text-sm text-zinc-400 mb-3">Sync and async clients with full type hints</p>
              <code className="text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded-full">pip install rem-vectordb</code>
            </div>

            {/* LangChain */}
            <div className="card-feature rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-green-500/10 mb-4">
                <Link2 className="h-7 w-7 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">LangChain</h3>
              <p className="text-sm text-zinc-400 mb-3">Drop-in VectorStore for RAG chains</p>
              <code className="text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded-full">pip install rem-vectordb[langchain]</code>
            </div>

            {/* LlamaIndex */}
            <div className="card-feature rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-purple-500/10 mb-4">
                <Brain className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">LlamaIndex</h3>
              <p className="text-sm text-zinc-400 mb-3">Native VectorStore for index pipelines</p>
              <code className="text-xs text-zinc-500 bg-white/5 px-3 py-1 rounded-full">pip install rem-vectordb[llamaindex]</code>
            </div>
          </div>

          {/* REST API note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-500">
              Prefer REST? Use any language with our <Link href="/docs#rest-api" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">REST API</Link> — just add <code className="text-xs text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">X-API-Key</code> header.
            </p>
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
              { step: '01', icon: Cpu, title: 'Create a Collection', desc: 'Define your vector dimension, distance metric, and encrypted fields. Your collection is automatically distributed and encrypted across miners.' },
              { step: '02', icon: Network, title: 'Upsert Vectors', desc: 'Upload embeddings with metadata. Sensitive fields are AES-256-GCM encrypted, vectors are obfuscated, and data is replicated across 3 miners.' },
              { step: '03', icon: BarChart3, title: 'Search & Retrieve', desc: 'Hybrid search combines vector similarity with BM25 keywords. Filter by metadata. Fetch source docs by ID. Batch queries for parallel retrieval.' },
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
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">$20 free credit included</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['$20 free credit on signup', 'Hybrid search & filtering', 'AES-256-GCM encryption', 'LangChain & LlamaIndex', '60 requests/min', 'Community support'].map((item, i) => (
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
                  <span className="text-4xl font-bold">$29.99</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">For growing applications</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['1M vectors included', '10M queries included', 'Hybrid search & filtering', 'Batch queries (10 per call)', 'Priority support', '99.9% uptime SLA'].map((item, i) => (
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
                  <span className="text-4xl font-bold">$99.99</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <p className="text-sm text-zinc-500 mt-2">For production workloads</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {['10M vectors included', '100M queries included', 'Hybrid search & filtering', 'Batch queries (10 per call)', 'Dedicated support', '99.99% uptime SLA'].map((item, i) => (
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
              Free credit included. No credit card required. Deploy your first vector collection in under 60 seconds.
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
                <li><Link href="#use-cases" className="hover:text-white transition-colors">Use Cases</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Developers</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/docs#quickstart" className="hover:text-white transition-colors">Quickstart</Link></li>
                <li><Link href="/docs#sdk" className="hover:text-white transition-colors">Python SDK</Link></li>
                <li><Link href="/docs#integrations" className="hover:text-white transition-colors">Integrations</Link></li>
                <li><Link href="/docs#rest-api" className="hover:text-white transition-colors">REST API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Community</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="https://discord.gg/9ndMQY4PYP" target="_blank" className="hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="https://x.com/RemNetwork" target="_blank" className="hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="https://t.me/RemDepin" target="_blank" className="hover:text-white transition-colors">Telegram</Link></li>
                <li><Link href="https://getrem.online/explorer.html" target="_blank" className="hover:text-white transition-colors">Network Explorer</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-600">&copy; 2026 REM Network. All rights reserved.</p>
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
