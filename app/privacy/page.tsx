import Link from 'next/link'
import { Database, ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> February 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>When you sign up for REM Network, we collect your email address and account credentials via our authentication provider (Clerk). When you use our API, we log request metadata (timestamps, endpoints, response codes) for usage billing and debugging purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Vector Data</h2>
            <p>Vectors and metadata you store through REM are distributed across our miner network. Metadata fields you designate as encrypted are protected with AES-256-GCM encryption before being sent to miners. Vectors are obfuscated using distance-preserving transformations. Miners cannot read your encrypted metadata or reconstruct your original embeddings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use your information to provide and improve the REM Network service, process billing, send service-related communications, and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Retention</h2>
            <p>Your vector data is stored as long as your account is active. You can delete vectors at any time via the API or SDK. When you delete your account, all associated data is permanently removed from our network.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p>We use Clerk for authentication, Stripe for payment processing, and Vercel for hosting. Each service has its own privacy policy governing the data they process on our behalf.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Contact</h2>
            <p>For privacy inquiries, contact us at <span className="text-blue-400">support@getrem.online</span>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
