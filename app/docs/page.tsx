'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Copy, Check, Book, Code, Zap, Key, Database, Search, ChevronRight, Shield, Layers, Link2, Brain, Download, ArrowRight } from 'lucide-react'

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
  { id: 'vectors', label: 'Vectors', icon: Download },
  { id: 'querying', label: 'Querying', icon: Search },
  { id: 'hybrid-search', label: 'Hybrid Search', icon: Layers },
  { id: 'batch-query', label: 'Batch Query', icon: Layers },
  { id: 'encryption', label: 'Encryption', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
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
            <CodeBlock lang="bash" code="pip install rem-vectordb" />

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Initialize the Client</h2>
            <CodeBlock code={`from rem import REM

client = REM(api_key="rem_your_api_key_here")`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Create a Collection</h2>
            <CodeBlock code={`collection = client.create_collection(
    name="my-collection",
    dimension=1536,        # Match your embedding model
    metric="cosine"        # cosine | euclidean | dot_product
)`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Upsert Vectors</h2>
            <CodeBlock code={`collection.upsert([
    {"id": "doc-1", "values": [0.1, 0.2, ...], "metadata": {"source": "wiki"}},
    {"id": "doc-2", "values": [0.3, 0.4, ...], "metadata": {"source": "blog"}},
])`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Query</h2>
            <CodeBlock code={`results = collection.query(
    vector=[0.1, 0.2, ...],
    top_k=10,
    filter={"source": "wiki"}
)

for match in results.matches:
    print(f"{match.id}: {match.score:.4f}")`} />

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Fetch & Delete</h2>
            <CodeBlock code={`# Fetch vectors by ID (for RAG source retrieval)
fetched = collection.fetch(ids=["doc-1", "doc-2"])

# Delete vectors by ID (for GDPR compliance)
deleted = collection.delete(ids=["doc-1"])`} />
          </section>

          {/* Authentication */}
          <section id="authentication">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Authentication</h2>
            <p className="text-zinc-400 mb-6">
              All API requests require an API key. You can generate keys from the <Link href="/dashboard/api-keys" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">dashboard</Link>.
            </p>

            <h3 className="text-lg font-semibold mb-3">Using the SDK</h3>
            <CodeBlock code={`from rem import REM

client = REM(api_key="rem_your_api_key_here")`} />

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
            <CodeBlock code={`collection = client.create_collection(
    name="products",
    dimension=384,
    metric="cosine",                     # "cosine" | "euclidean" | "dot_product"
    encrypted_fields=["email", "pii"],   # Optional: AES-256-GCM encryption
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
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">euclidean</td><td className="px-4 py-2.5">Spatial data, image features</td><td className="px-4 py-2.5">0 to infinity (lower = more similar)</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">dot_product</td><td className="px-4 py-2.5">Pre-normalized vectors, recommendations</td><td className="px-4 py-2.5">-infinity to infinity (higher = more similar)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">List Collections</h3>
            <CodeBlock code={`collections = client.list_collections()
for col in collections:
    print(f"{col.name} — {col.dimension}d, {col.metric}")`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Delete a Collection</h3>
            <CodeBlock code={`client.delete_collection("collection_id")`} />
          </section>

          {/* Vectors */}
          <section id="vectors">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Vectors</h2>
            <p className="text-zinc-400 mb-6">
              Vectors are the core data unit. Each vector has an ID, a list of float values, and optional metadata for filtering.
            </p>

            <h3 className="text-lg font-semibold mb-3">Upsert Vectors</h3>
            <p className="text-zinc-400 mb-3 text-sm">Insert or update vectors. If a vector with the same ID exists, it will be overwritten.</p>
            <CodeBlock code={`collection.upsert([
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
            <p className="text-zinc-400 mb-3 text-sm">Retrieve vectors by their IDs. Useful for RAG source document retrieval and citations.</p>
            <CodeBlock code={`result = collection.fetch(ids=["prod-001", "prod-002"])
for vec in result.vectors:
    print(f"{vec.id}: {len(vec.values)} dimensions")`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Delete Vectors</h3>
            <p className="text-zinc-400 mb-3 text-sm">Delete vectors by their IDs. Essential for GDPR compliance and data lifecycle management.</p>
            <CodeBlock code={`result = collection.delete(ids=["prod-001"])
print(f"Deleted {result.deleted_count} vectors")`} />
          </section>

          {/* Querying */}
          <section id="querying">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Querying</h2>
            <p className="text-zinc-400 mb-6">
              Find the most similar vectors to a given query vector. Queries are automatically routed to miners for lowest latency.
            </p>

            <h3 className="text-lg font-semibold mb-3">Basic Query</h3>
            <CodeBlock code={`results = collection.query(
    vector=[0.12, -0.34, 0.56, ...],
    top_k=10
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Query with Metadata Filter</h3>
            <CodeBlock code={`results = collection.query(
    vector=[0.12, -0.34, 0.56, ...],
    top_k=5,
    filter={
        "category": "electronics",
        "price": {"$lte": 500},
        "in_stock": True
    }
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Query with include_values</h3>
            <p className="text-zinc-400 mb-3 text-sm">Return the original vector values alongside scores. Useful for debugging and re-ranking.</p>
            <CodeBlock code={`results = collection.query(
    vector=[0.12, -0.34, 0.56, ...],
    top_k=5,
    include_values=True  # Returns original (deobfuscated) vectors
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
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$in</td><td className="px-4 py-2.5 font-sans text-sm">In array</td><td className="px-4 py-2.5">{`{"cat": {"$in": ["a","b"]}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$nin</td><td className="px-4 py-2.5 font-sans text-sm">Not in array</td><td className="px-4 py-2.5">{`{"cat": {"$nin": ["x"]}}`}</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">$and</td><td className="px-4 py-2.5 font-sans text-sm">Logical AND</td><td className="px-4 py-2.5">{`{"$and": [{...}, {...}]}`}</td></tr>
                  <tr><td className="px-4 py-2.5">$or</td><td className="px-4 py-2.5 font-sans text-sm">Logical OR</td><td className="px-4 py-2.5">{`{"$or": [{...}, {...}]}`}</td></tr>
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

          {/* Hybrid Search */}
          <section id="hybrid-search">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Hybrid Search</h2>
            <p className="text-zinc-400 mb-6">
              Combine vector similarity with BM25 keyword matching for the best of both worlds. Results are merged using Reciprocal Rank Fusion (RRF).
            </p>

            <h3 className="text-lg font-semibold mb-3">Vector + Keyword Search</h3>
            <CodeBlock code={`results = collection.query(
    vector=embed("wireless headphones"),
    query_text="noise cancelling",   # BM25 keyword search
    top_k=10
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Controlling the Blend</h3>
            <p className="text-zinc-400 mb-3 text-sm">Use <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded text-xs">hybrid_alpha</code> to control the balance between vector and keyword results.</p>
            <CodeBlock code={`# Pure vector search (default)
results = collection.query(vector=embed("query"), hybrid_alpha=0.0)

# Balanced hybrid (50/50)
results = collection.query(
    vector=embed("query"),
    query_text="keywords",
    hybrid_alpha=0.5
)

# Pure keyword search (no vector needed)
results = collection.query(
    query_text="exact phrase match",
    hybrid_alpha=1.0
)`} />

            <div className="mt-6 rounded-lg border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">hybrid_alpha</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Behavior</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">0.0</td><td className="px-4 py-2.5">Pure vector similarity</td><td className="px-4 py-2.5">Semantic search, similar items</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">0.3</td><td className="px-4 py-2.5">Mostly vector, slight keyword boost</td><td className="px-4 py-2.5">RAG with some keyword precision</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">0.5</td><td className="px-4 py-2.5">Equal blend</td><td className="px-4 py-2.5">General-purpose search</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5 font-mono text-xs">0.7</td><td className="px-4 py-2.5">Mostly keyword, some semantic</td><td className="px-4 py-2.5">Technical docs, code search</td></tr>
                  <tr><td className="px-4 py-2.5 font-mono text-xs">1.0</td><td className="px-4 py-2.5">Pure BM25 keyword matching</td><td className="px-4 py-2.5">Exact phrase matching</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Batch Query */}
          <section id="batch-query">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Batch Query</h2>
            <p className="text-zinc-400 mb-6">
              Execute multiple queries in a single API call. Queries run in parallel on the server for maximum throughput. Up to 10 queries per batch.
            </p>

            <CodeBlock code={`results = collection.query_batch([
    {
        "vector": embed("wireless headphones"),
        "top_k": 5,
        "filter": {"category": "electronics"}
    },
    {
        "vector": embed("running shoes"),
        "top_k": 5,
        "filter": {"category": "sports"}
    },
    {
        "query_text": "bluetooth speaker",
        "top_k": 3,
        "hybrid_alpha": 1.0
    }
])

# results is a list of QueryResult, one per query
for i, result in enumerate(results):
    print(f"Query {i}: {len(result.matches)} matches")`} />

            <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm text-blue-300/90">
                <strong>Use cases:</strong> Recommendation engines (multiple feeds in one call), AI agents (search across memory types), and any pipeline that needs parallel retrieval.
              </p>
            </div>
          </section>

          {/* Encryption */}
          <section id="encryption">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Encryption</h2>
            <p className="text-zinc-400 mb-6">
              REM provides two layers of data protection: per-field metadata encryption with AES-256-GCM and vector obfuscation using distance-preserving transformations.
            </p>

            <h3 className="text-lg font-semibold mb-3">Encrypted Metadata Fields</h3>
            <p className="text-zinc-400 mb-3 text-sm">Specify which metadata fields should be encrypted. Encrypted fields are invisible to miners but are automatically decrypted when you query.</p>
            <CodeBlock code={`# Create collection with encrypted fields
collection = client.create_collection(
    name="user-data",
    dimension=384,
    encrypted_fields=["email", "phone", "ssn"]  # AES-256-GCM
)

# Upsert — encrypted fields are handled automatically
collection.upsert([{
    "id": "user-1",
    "values": embed("John Doe profile"),
    "metadata": {
        "name": "John Doe",       # Stored as plaintext (filterable)
        "email": "john@example.com",  # Encrypted on miners
        "phone": "+1-555-0100",       # Encrypted on miners
        "ssn": "123-45-6789",         # Encrypted on miners
        "role": "admin"           # Stored as plaintext (filterable)
    }
}])

# Query — encrypted fields are auto-decrypted in results
results = collection.query(
    vector=embed("admin users"),
    filter={"role": "admin"},  # Only plaintext fields can be filtered
    top_k=10
)
# results include decrypted email, phone, ssn`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Vector Obfuscation</h3>
            <p className="text-zinc-400 mb-3 text-sm">All vectors are automatically obfuscated before being sent to miners using distance-preserving transformations (permutation + sign flip). This prevents miners from reconstructing your original embeddings while preserving similarity search accuracy.</p>

            <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-sm text-green-300/90">
                <strong>How it works:</strong> Per-namespace keys generate deterministic permutation and sign-flip seeds. Cosine, Euclidean, and dot-product distances are perfectly preserved — search quality is identical to unobfuscated vectors.
              </p>
            </div>
          </section>

          {/* Integrations */}
          <section id="integrations">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Framework Integrations</h2>
            <p className="text-zinc-400 mb-6">
              Native integrations with popular AI frameworks. Drop-in vector stores that work with your existing pipelines.
            </p>

            <h3 className="text-lg font-semibold mb-3">LangChain</h3>
            <p className="text-zinc-400 mb-3 text-sm">Drop-in <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded text-xs">VectorStore</code> for LangChain RAG pipelines.</p>
            <CodeBlock lang="bash" code="pip install rem-vectordb[langchain]" />
            <div className="mt-4" />
            <CodeBlock code={`from rem.integrations.langchain import REMVectorStore
from langchain_openai import OpenAIEmbeddings

# Create vector store
store = REMVectorStore(
    api_key="rem_xxx",
    collection_name="docs",
    embedding=OpenAIEmbeddings()
)

# Add documents
store.add_texts(
    texts=["REM is a decentralized vector database", "Powered by 2000+ miners"],
    metadatas=[{"source": "docs"}, {"source": "marketing"}]
)

# Similarity search
results = store.similarity_search("What is REM?", k=5)
for doc in results:
    print(doc.page_content)

# Search with scores
results_with_scores = store.similarity_search_with_score("What is REM?", k=5)
for doc, score in results_with_scores:
    print(f"{score:.4f}: {doc.page_content}")

# Search with metadata filter
results = store.similarity_search(
    "vector database",
    k=5,
    filter={"source": "docs"}
)

# Delete documents
store.delete(ids=["doc-id-1", "doc-id-2"])

# Create from texts (one-liner)
store = REMVectorStore.from_texts(
    texts=["Hello", "World"],
    embedding=OpenAIEmbeddings(),
    api_key="rem_xxx",
    collection_name="quickstart"
)`} />

            <h3 className="text-lg font-semibold mt-10 mb-3">LlamaIndex</h3>
            <p className="text-zinc-400 mb-3 text-sm">Native <code className="text-zinc-300 bg-white/5 px-1.5 py-0.5 rounded text-xs">BasePydanticVectorStore</code> for LlamaIndex index pipelines.</p>
            <CodeBlock lang="bash" code="pip install rem-vectordb[llamaindex]" />
            <div className="mt-4" />
            <CodeBlock code={`from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from rem.integrations.llamaindex import REMVectorStore

# Create vector store
vector_store = REMVectorStore(
    api_key="rem_xxx",
    collection_name="docs",
    dimension=1536
)

# Build index from documents
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(
    documents,
    vector_store=vector_store
)

# Query
query_engine = index.as_query_engine()
response = query_engine.query("What is REM Network?")
print(response)

# Use existing index
index = VectorStoreIndex.from_vector_store(vector_store)
retriever = index.as_retriever(similarity_top_k=5)
nodes = retriever.retrieve("vector database")`} />
          </section>

          {/* Python SDK */}
          <section id="sdk">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Python SDK Reference</h2>
            <p className="text-zinc-400 mb-6">Full reference for the <span className="font-mono text-sm text-zinc-300">rem-vectordb</span> Python package.</p>

            <h3 className="text-lg font-semibold mb-3">Installation</h3>
            <CodeBlock lang="bash" code={`pip install rem-vectordb              # Core SDK
pip install rem-vectordb[langchain]   # + LangChain integration
pip install rem-vectordb[llamaindex]  # + LlamaIndex integration`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Client</h3>
            <CodeBlock code={`from rem import REM

client = REM(
    api_key="rem_xxx",                          # Required
    base_url="https://api.getrem.online",       # Optional (default)
    timeout=30,                                  # Request timeout in seconds
)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Async Client</h3>
            <CodeBlock code={`from rem import AsyncREM

async with AsyncREM(api_key="rem_xxx") as client:
    collection = await client.create_collection("docs", dimension=384)
    await collection.upsert([...])
    results = await collection.query(vector=[...], top_k=10)`} />

            <h3 className="text-lg font-semibold mt-8 mb-3">Client Methods</h3>
            <div className="space-y-4">
              {[
                { method: 'create_collection(name, dimension, metric?, encrypted_fields?)', desc: 'Create a new collection. Returns Collection object.' },
                { method: 'get_collection(id)', desc: 'Get an existing collection by ID' },
                { method: 'list_collections()', desc: 'List all collections in the namespace' },
                { method: 'delete_collection(id)', desc: 'Delete a collection and all its vectors' },
              ].map((m) => (
                <div key={m.method} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <code className="text-sm text-blue-400 font-mono flex-shrink-0">{m.method}</code>
                  <span className="text-sm text-zinc-500">{m.desc}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-8 mb-3">Collection Methods</h3>
            <div className="space-y-4">
              {[
                { method: 'upsert(vectors)', desc: 'Insert or update vectors. Accepts list of dicts or Vector objects.' },
                { method: 'query(vector?, top_k, filter?, query_text?, hybrid_alpha?, include_values?)', desc: 'Search for similar vectors. Supports hybrid search and metadata filtering.' },
                { method: 'query_batch(queries)', desc: 'Execute multiple queries in parallel (max 10 per batch).' },
                { method: 'fetch(ids)', desc: 'Fetch vectors by ID. Returns FetchResult with vector values.' },
                { method: 'delete(ids)', desc: 'Delete vectors by ID. Returns DeleteResult with count.' },
                { method: 'stats()', desc: 'Get collection statistics (vector count, storage, etc.).' },
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
                { method: 'POST', path: '/collections', desc: 'Create a collection', body: '{"name": "products", "dimension": 384, "metric": "cosine", "encrypted_fields": ["email"]}' },
                { method: 'GET', path: '/collections', desc: 'List collections', body: null },
                { method: 'GET', path: '/collections/{id}', desc: 'Get collection details', body: null },
                { method: 'DELETE', path: '/collections/{id}', desc: 'Delete a collection', body: null },
                { method: 'POST', path: '/collections/{id}/vectors/upsert', desc: 'Upsert vectors', body: '{"vectors": [{"id": "v1", "values": [...], "metadata": {...}}]}' },
                { method: 'POST', path: '/collections/{id}/vectors/query', desc: 'Query vectors', body: '{"vector": [...], "top_k": 10, "filter": {...}, "query_text": "keywords", "hybrid_alpha": 0.5, "include_values": false}' },
                { method: 'POST', path: '/collections/{id}/vectors/query/batch', desc: 'Batch query (max 10)', body: '{"queries": [{"vector": [...], "top_k": 5}, {"query_text": "...", "top_k": 3}]}' },
                { method: 'POST', path: '/collections/{id}/vectors/fetch', desc: 'Fetch vectors by ID', body: '{"ids": ["v1", "v2"]}' },
                { method: 'POST', path: '/collections/{id}/vectors/delete', desc: 'Delete vectors', body: '{"ids": ["v1"]}' },
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
                    <th className="px-4 py-3 text-left font-medium text-zinc-300">Batch Queries</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-400">
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">Free</td><td className="px-4 py-2.5">60</td><td className="px-4 py-2.5">100</td><td className="px-4 py-2.5">10 per call</td></tr>
                  <tr className="border-b border-white/5"><td className="px-4 py-2.5">Pro</td><td className="px-4 py-2.5">600</td><td className="px-4 py-2.5">1,000</td><td className="px-4 py-2.5">10 per call</td></tr>
                  <tr><td className="px-4 py-2.5">Business</td><td className="px-4 py-2.5">6,000</td><td className="px-4 py-2.5">10,000</td><td className="px-4 py-2.5">10 per call</td></tr>
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
