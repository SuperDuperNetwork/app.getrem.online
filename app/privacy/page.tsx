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
            <h2 className="text-xl font-semibold text-white mb-3">1. Data Controller</h2>
            <p>Your personal data is processed by <strong className="text-white">BeClever O&Uuml;</strong>, a private limited company registered in Estonia (registration number 14963110), located at Harju maakond, Harku vald, Muraste k&uuml;la, Sauna tn 4-6, 76905, Estonia. Contact: <span className="text-blue-400">beclever8@gmail.com</span>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <p>When you sign up for REM Network, we collect your email address and account credentials via our authentication provider (Clerk). When you use our API, we log request metadata (timestamps, endpoints, response codes, latency) for usage billing and service monitoring. We do not collect or store the content of your vector data on our servers beyond what is necessary for routing.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Vector Data &amp; Security</h2>
            <p>Vectors and metadata you store through REM are distributed across our decentralized miner network. Metadata fields you designate as encrypted are protected with AES-256-GCM encryption before being sent to miners. Vectors are obfuscated using distance-preserving transformations (permutation + sign flip). Miners cannot read your encrypted metadata or reconstruct your original embeddings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. How We Use Your Information</h2>
            <p>We use your information to: provide and improve the REM Network service; process billing and usage tracking; send essential service-related communications; prevent fraud and abuse; and comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p>Your vector data is stored as long as your account is active. You can delete individual vectors at any time via the API, SDK, or dashboard. When you delete your account, all associated data is permanently removed from our coordinator database and propagated to miners.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Third-Party Services</h2>
            <p>We use the following third-party services, each with their own privacy policy:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li><strong className="text-white">Clerk</strong> - Authentication and user management</li>
              <li><strong className="text-white">Stripe</strong> - Payment processing and subscription billing</li>
              <li><strong className="text-white">Vercel</strong> - Platform hosting and analytics</li>
              <li><strong className="text-white">Sui Blockchain</strong> - On-chain reward distribution and smart contracts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>Under GDPR and Estonian data protection law, you have the right to: access your personal data; rectify inaccurate data; erase your data; restrict processing; data portability; and object to processing. To exercise any of these rights, contact us at <span className="text-blue-400">beclever8@gmail.com</span>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
            <p>We use essential cookies for authentication (via Clerk) and session management. We use Vercel Analytics for anonymous usage statistics. We do not use third-party advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>For privacy inquiries, contact us at <span className="text-blue-400">beclever8@gmail.com</span> or <span className="text-blue-400">support@getrem.online</span>.</p>
            <p className="mt-2">BeClever O&Uuml;, Harju maakond, Harku vald, Muraste k&uuml;la, Sauna tn 4-6, 76905, Estonia</p>
          </section>
        </div>
      </div>
    </div>
  )
}
