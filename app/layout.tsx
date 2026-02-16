import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: 'REM Network - Decentralized Vector Database',
  description: 'Store and search billions of vectors with sub-100ms latency. The decentralized vector database powered by 2,000+ miners worldwide.',
  keywords: ['vector database', 'decentralized', 'embeddings', 'semantic search', 'RAG', 'AI infrastructure', 'REM Network'],
  authors: [{ name: 'REM Network' }],
  openGraph: {
    title: 'REM Network - Decentralized Vector Database',
    description: 'Store and search billions of vectors with sub-100ms latency. Powered by 2,000+ miners worldwide.',
    type: 'website',
    siteName: 'REM Network',
    url: 'https://app.getrem.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REM Network - Decentralized Vector Database',
    description: 'Store and search billions of vectors with sub-100ms latency. Powered by 2,000+ miners worldwide.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen antialiased">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
