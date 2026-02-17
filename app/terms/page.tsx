import Link from 'next/link'
import { Database, ArrowLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060a14] text-white">
      <nav className="border-b border-white/5" style={{ background: 'rgba(8,12,25,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="mx-auto max-w-7xl px-6 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Database className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold">REM</span>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> February 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Service Provider</h2>
            <p>REM Network is operated by <strong className="text-white">BeClever O&Uuml;</strong>, a private limited company registered in the Republic of Estonia.</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Registration number: 14963110</li>
              <li>D-U-N-S number: 565718700</li>
              <li>Registered address: Harju maakond, Harku vald, Muraste k&uuml;la, Sauna tn 4-6, 76905, Estonia</li>
              <li>Contact: <span className="text-blue-400">beclever8@gmail.com</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Acceptance of Terms</h2>
            <p>By accessing or using REM Network (&quot;the Service&quot;), including the platform at app.getrem.online, the API at api.getrem.online, and the Python SDK, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Description of Service</h2>
            <p>REM Network provides a decentralized vector database service, including vector storage, similarity search, hybrid search (vector + keyword via Reciprocal Rank Fusion), batch queries, metadata filtering with Pinecone-compatible operators, per-field AES-256-GCM encryption, and related APIs. The service is powered by a distributed network of miners validated through Proof of RAM (PoRAM) consensus on the Sui blockchain.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Account Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account credentials and API keys. You must not share API keys publicly or embed them in client-side code. You are responsible for all activity under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Acceptable Use</h2>
            <p>You agree not to use the Service to: store illegal content; attempt to reverse-engineer the miner network or bypass vector obfuscation; abuse the API in ways that degrade service for other users; use the Service for any activity that violates applicable laws. Rate limits are enforced per your plan tier.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Billing &amp; Credits</h2>
            <p>Free tier includes $20 in API credits. Paid plans (Pro and Business) are billed monthly via Stripe. Usage beyond plan limits is charged at published overage rates. You can upgrade, downgrade, or cancel at any time. Refunds are handled on a case-by-case basis within 14 days of charge.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Data Ownership</h2>
            <p>You retain all intellectual property rights to the data you store on REM Network. We do not access, sell, or share your vector data. Metadata fields designated as encrypted remain encrypted with your namespace key across all miners.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Service Availability</h2>
            <p>We target 99.9% uptime for Pro plans and 99.99% for Business plans. Scheduled maintenance windows will be communicated in advance. The decentralized architecture with configurable replication factor (default 3x) provides inherent redundancy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, BeClever O&Uuml; shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Estonia, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Harju County, Estonia.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact</h2>
            <p>For questions about these terms, contact us at <span className="text-blue-400">beclever8@gmail.com</span> or <span className="text-blue-400">support@getrem.online</span>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
