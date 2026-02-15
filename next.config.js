/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  // Proxy API calls to the coordinator backend to avoid CORS issues.
  // Browser calls app.getrem.online/api/v1/* → rewritten to getrem.online/v1/*
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'https://getrem.online'
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
