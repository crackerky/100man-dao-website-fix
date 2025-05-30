/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable React strict mode for development
  reactStrictMode: true,
  // Optimize performance
  swcMinify: true,
  // Enable source maps in development
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
