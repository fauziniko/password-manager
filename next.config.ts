import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper routing and redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Ensure proper output for deployment
  output: 'standalone',
  
  // Environment variable validation
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  
  // Image optimization (if needed later)
  images: {
    domains: [],
  },
  
  // TypeScript and ESLint configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
