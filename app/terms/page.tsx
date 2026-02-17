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
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using REM Network (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>REM Network provides a decentralized vector database service, including vector storage, similarity search, hybrid search, batch queries, and related APIs. The service is powered by a distributed network of miners.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Account Responsibilities</h2>
            <p>You are responsible for maintaining the security of your account credentials and API keys. You must not share API keys publicly or in client-side code. You are responsible for all activity under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to use the Service to store illegal content, attempt to reverse-engineer the miner network, or abuse the API in ways that degrade service for other users. Rate limits are enforced per your plan tier.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Billing</h2>
            <p>Free tier includes $20 credit. Paid plans are billed monthly via Stripe. Usage beyond plan limits is charged at published overage rates. You can upgrade, downgrade, or cancel at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Ownership</h2>
            <p>You retain all rights to the data you store on REM Network. We do not access, sell, or share your vector data. Encrypted fields remain encrypted on all miners.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Service Availability</h2>
            <p>We target 99.9% uptime for Pro plans and 99.99% for Business plans. Scheduled maintenance windows will be communicated in advance. The decentralized architecture provides inherent redundancy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact</h2>
            <p>For questions about these terms, contact us at <span className="text-blue-400">support@getrem.online</span>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
