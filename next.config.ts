import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Cloudflare Pages compatibility
  experimental: {
    runtime: 'edge',
  },
};

export default nextConfig;
