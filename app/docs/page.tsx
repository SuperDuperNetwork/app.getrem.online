'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Book, Code, Zap, Key, Database, Search, ChevronRight } from 'lucide-react'

function CopyButton({ text }: { text: string }) {
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

function CodeBlock({ code, lang = 'python' }: { code: string; lang?: string }) {
  return (
    <div className="relative rounded-lg border border-white/10 bg-[#0d1117] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 text-xs text-zinc-500">
        {lang}
      </div>
      <CopyButton text={code} />
      <pre className="p-4 text-[13px] leading-relaxed overflow-x-auto"><code className="text-zinc-300">{code}</code></pre>
    </div>
  )
}

const SECTIONS = [
  { id: 'quickstart', label: 'Quickstart', icon: Zap },
  { id: 'authentication', label: 'Authentication', icon: Key },
  { id: 'collections', label: 'Collections', icon: Database },
  { id: 'vectors', label: 'Vectors', icon: Search },
  { id: 'querying', label: 'Querying', icon: Search },
  { id: 'sdk', label: 'Python SDK', icon: Code },
  { id: 'rest-api', label: 'REST API', icon: Book },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart')

  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#060a14] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: 'rgba(8,12,25,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="mx-auto max-w-7xl px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Database className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-semibold">REM</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-sm text-zinc-400">Documentation</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-up" className="text-sm text-zinc-400 hover:text-white transition-colors">Get API Key</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 text-sm px-3 py-1.5 hover:bg-white/10 transition-colors">
              Dashboard <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20 self-start">
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === s.id
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <s.icon className="h-4 w-4" />
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 space-y-16">
          {/* Quickstart */}
          <section id="quickstart">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Getting Started with REM</h1>
            <p className="text-lg text-zinc-400 mb-8">
              Store, search, and manage vector embeddings at scale with the REM decentralized network.
            </p>

            <h2 className="text-xl font-semibold mb-4">1. Install the SDK</h2>
            <CodeBlock lang="bash" code="pip install rem-sdk" />

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Initialize the Client</h2>
            <CodeBlock code={`from rem_sdk import REMClient

client = REMClient(api_key="rem_your_api_key_here")`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Create a Collection</h2>
            <CodeBlock code={`client.create_collection(
    name="my-collection",
    dimension=1536,        # Match your embedding model
    metric="cosine"        # cosine | euclidean | dot_product
)`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Upsert Vectors</h2>
            <CodeBlock code={`client.upsert("my-collection", vectors=[
    {"id": "doc-1", "values": [0.1, 0.2, ...], "metadata": {"source": "wiki"}},
    {"id": "doc-2", "values": [0.3, 0.4, ...], "metadata": {"source": "blog"}},
])`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Query</h2>
            <CodeBlock code={`results = client.query(
    "my-collection",
    vector=[0.1, 0.2, ...],
    top_k=10,
    filter={"source": "wiki"}
)

for match in results["matches"]:
    print(f"{match['id']}: {match['score']:.4f}")`} />
          </section>

          {/* Authentication */}
          <section id="authentication">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Authentication</h2>
            <p className="text-zinc-400 mb-6">
              All API requests require an API key. You can generate keys from the <Link href="/dashboard/api-keys" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">dashboard</Link>.
            </p>

            <h3 className="text-lg font-semibold mb-3">Using the SDK</h3>
            <CodeBlock code={`client = REMClient(api_key="rem_xxx")`} />

            <h3 className="text-lg font-semibold mt-6 mb-3">Using the REST API</h3>
            <CodeBlock lang="bash" code={`curl -X GET https://api.getrem.online/v1/collections \\
  -H "X-API-Key: rem_your_api_key_here"`} />

            <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-300/90">
                Keep your API keys secure. Never expose them in client-side code or public repositories. Use environment variables in production.
              </p>
            </div>
          </section>

          {/* Collections */}
          <section id="collections">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Collections</h2>
            <p className="text-zinc-400 mb-6">
              A collection is a named group of vectors with a fixed dimension and distance metric. Collections are automatically distributed across miners for redundancy.
            </p>

            <h3 className="text-lg font-semibold mb-3">Create a Collection</h3>
            <CodeBlock code={`client.create_collection(
    name="products",
    dimension=384,
    metric="cosine",          # "cosine" | "euclidean" | "dot_product"
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Supported Dimensions</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Dimension</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Common Models</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">384</td><td className="px-4 py-2.5">all-MiniLM-L6-v2, BGE-small</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">768</td><td className="px-4 py-2.5">all-mpnet-base-v2, BGE-base, E5-base</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">1024</td><td className="px-4 py-2.5">Cohere embed-v3, BGE-large</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">1536</td><td className="px-4 py-2.5">OpenAI text-embedding-3-small, text-embedding-ada-002</td></tr>
                  <tr><td className="px-4 py-2.5">3072</td><td className="px-4 py-2.5">OpenAI text-embedding-3-large</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-zinc-500">Any integer dimension from 1 to 4096 is supported. The table above shows common embedding model dimensions.</p>

            <h3 className="text-lg font-semibold mt-8 mb-3">Distance Metrics</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Metric</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Best For</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Range</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">cosine</td><td className="px-4 py-2.5">Text similarity, semantic search, RAG</td><td className="px-4 py-2.5">0 to 1 (higher = more similar)</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">euclidean</td><td className="px-4 py-2.5">Spatial data, image features</td><td className="px-4 py-2.5">0 to ∞ (lower = more similar)</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">dot_product</td><td className="px-4 py-2.5">Pre-normalized vectors, recommendations</td><td className="px-4 py-2.5">-∞ to ∞ (higher = more similar)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">List Collections</h3>
            <CodeBlock code={`collections = client.list_collections()
for col in collections["collections"]:
    print(f"{col['name']} — {col['dimension']}d, {col['metric']}")`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Delete a Collection</h3>
            <CodeBlock code={`client.delete_collection("products")`} />
          </section>

          {/* Vectors */}
          <section id="vectors">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Vectors</h2>
            <p className="text-zinc-400 mb-6">
              Vectors are the core data unit. Each vector has an ID, a list of float values, and optional metadata for filtering.
            </p>

            <h3 className="text-lg font-semibold mb-3">Upsert Vectors</h3>
            <p className="text-zinc-400 mb-3 text-sm">Insert or update vectors. If a vector with the same ID exists, it will be overwritten.</p>
            <CodeBlock code={`client.upsert("products", vectors=[
    {
        "id": "prod-001",
        "values": [0.12, -0.34, 0.56, ...],  # Must match collection dimension
        "metadata": {
            "category": "electronics",
            "price": 299.99,
            "in_stock": True
        }
    },
    {
        "id": "prod-002",
        "values": [0.78, 0.91, -0.23, ...],
        "metadata": {
            "category": "clothing",
            "price": 49.99,
            "in_stock": False
        }
    }
])`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Fetch Vectors by ID</h3>
            <CodeBlock code={`vectors = client.fetch("products", ids=["prod-001", "prod-002"])`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Delete Vectors</h3>
            <CodeBlock code={`# Delete specific vectors
client.delete("products", ids=["prod-001"])

# Delete by metadata filter
client.delete("products", filter={"category": "electronics"})`} />
          </section>

          {/* Querying */}
          <section id="querying">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Querying</h2>
            <p className="text-zinc-400 mb-6">
              Find the most similar vectors to a given query vector. Queries are automatically routed to the nearest miner for lowest latency.
            </p>

            <h3 className="text-lg font-semibold mb-3">Basic Query</h3>
            <CodeBlock code={`results = client.query(
    "products",
    vector=[0.12, -0.34, 0.56, ...],
    top_k=10
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Query with Metadata Filter</h3>
            <CodeBlock code={`results = client.query(
    "products",
    vector=[0.12, -0.34, 0.56, ...],
    top_k=5,
    filter={
        "category": "electronics",
        "price": {"$lte": 500},
        "in_stock": True
    }
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Filter Operators</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Operator</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Description</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Example</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400 font-mono text-xs">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$eq</td><td className="px-4 py-2.5 font-sans text-sm">Equal to (default)</td><td className="px-4 py-2.5">{`{"field": "value"}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$ne</td><td className="px-4 py-2.5 font-sans text-sm">Not equal to</td><td className="px-4 py-2.5">{`{"field": {"$ne": "x"}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$gt</td><td className="px-4 py-2.5 font-sans text-sm">Greater than</td><td className="px-4 py-2.5">{`{"price": {"$gt": 100}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$gte</td><td className="px-4 py-2.5 font-sans text-sm">Greater than or equal</td><td className="px-4 py-2.5">{`{"price": {"$gte": 100}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$lt</td><td className="px-4 py-2.5 font-sans text-sm">Less than</td><td className="px-4 py-2.5">{`{"price": {"$lt": 50}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$lte</td><td className="px-4 py-2.5 font-sans text-sm">Less than or equal</td><td className="px-4 py-2.5">{`{"price": {"$lte": 50}}`}</td></tr>
                  <tr><td className="px-4 py-2.5">$in</td><td className="px-4 py-2.5 font-sans text-sm">In array</td><td className="px-4 py-2.5">{`{"cat": {"$in": ["a","b"]}}`}</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">Response Format</h3>
            <CodeBlock lang="json" code={`{
  "matches": [
    {
      "id": "prod-001",
      "score": 0.9542,
      "metadata": {"category": "electronics", "price": 299.99}
    },
    {
      "id": "prod-003",
      "score": 0.8891,
      "metadata": {"category": "electronics", "price": 149.99}
    }
  ]
}`} />
          </section>

          {/* Python SDK */}
          <section id="sdk">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Python SDK Reference</h2>
            <p className="text-zinc-400 mb-6">Full reference for the <span className="font-mono text-sm text-zinc-300">rem-sdk</span> Python package.</p>

            <h3 className="text-lg font-semibold mb-3">Installation</h3>
            <CodeBlock lang="bash" code="pip install rem-sdk" />

            <h3 className="text-lg font-semibold mt-8 mb-3">REMClient</h3>
            <CodeBlock code={`from rem_sdk import REMClient

client = REMClient(
    api_key="rem_xxx",                          # Required
    base_url="https://api.getrem.online",       # Optional (default)
    timeout=30,                                  # Request timeout in seconds
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Methods</h3>
            <div className="space-y-4">
              {[
                { method: 'create_collection(name, dimension, metric)', desc: 'Create a new vector collection' },
                { method: 'list_collections(cursor?, limit?)', desc: 'List all collections (paginated)' },
                { method: 'delete_collection(name)', desc: 'Delete a collection and all its vectors' },
                { method: 'upsert(collection, vectors)', desc: 'Insert or update vectors' },
                { method: 'query(collection, vector, top_k, filter?)', desc: 'Find similar vectors' },
                { method: 'fetch(collection, ids)', desc: 'Fetch vectors by ID' },
                { method: 'delete(collection, ids?, filter?)', desc: 'Delete vectors by ID or filter' },
              ].map((m) => (
                <div key={m.method} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <code className="text-sm text-blue-400 font-mono flex-shrink-0">{m.method}</code>
                  <span className="text-sm text-zinc-500">{m.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* REST API */}
          <section id="rest-api">
            <h2 className="text-2xl font-bold tracking-tight mb-4">REST API Reference</h2>
            <p className="text-zinc-400 mb-6">
              Base URL: <code className="text-sm text-zinc-300 bg-white/5 px-2 py-0.5 rounded">https://api.getrem.online/v1</code>
            </p>
            <p className="text-zinc-400 mb-6 text-sm">
              All requests must include the <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded text-xs">X-API-Key</code> header.
            </p>

            <div className="space-y-6">
              {[
                { method: 'POST', path: '/collections', desc: 'Create a collection', body: '{"name": "products", "dimension": 384, "metric": "cosine"}' },
                { method: 'GET', path: '/collections', desc: 'List collections', body: null },
                { method: 'DELETE', path: '/collections/{name}', desc: 'Delete a collection', body: null },
                { method: 'POST', path: '/collections/{name}/vectors/upsert', desc: 'Upsert vectors', body: '{"vectors": [{"id": "v1", "values": [...], "metadata": {...}}]}' },
                { method: 'POST', path: '/collections/{name}/vectors/query', desc: 'Query vectors', body: '{"vector": [...], "top_k": 10, "filter": {...}}' },
                { method: 'POST', path: '/collections/{name}/vectors/fetch', desc: 'Fetch vectors by ID', body: '{"ids": ["v1", "v2"]}' },
                { method: 'POST', path: '/collections/{name}/vectors/delete', desc: 'Delete vectors', body: '{"ids": ["v1"]}' },
              ].map((ep) => (
                <div key={ep.path + ep.method} className="rounded-lg border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      ep.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      ep.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{ep.method}</span>
                    <code className="text-sm text-zinc-300">{ep.path}</code>
                    <span className="text-xs text-zinc-600 ml-auto">{ep.desc}</span>
                  </div>
                  {ep.body && (
                    <div className="relative">
                      <CopyButton text={ep.body} />
                      <pre className="p-4 text-xs text-zinc-400 overflow-x-auto"><code>{ep.body}</code></pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Rate Limits */}
          <section className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold mb-4">Rate Limits</h3>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Plan</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Requests/min</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Max Vectors/Upsert</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">Free</td><td className="px-4 py-2.5">60</td><td className="px-4 py-2.5">100</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">Pro</td><td className="px-4 py-2.5">600</td><td className="px-4 py-2.5">1,000</td></tr>
                  <tr><td className="px-4 py-2.5">Business</td><td className="px-4 py-2.5">6,000</td><td className="px-4 py-2.5">10,000</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Need help */}
          <section className="text-center py-8">
            <p className="text-zinc-500 text-sm">
              Need help? Join our <Link href="https://discord.gg/rem" target="_blank" className="text-blue-400 hover:text-blue-300">Discord</Link> or email <span className="text-zinc-400">support@getrem.online</span>
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
