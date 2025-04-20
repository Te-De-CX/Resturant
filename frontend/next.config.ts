import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false, // Choose either this OR skipTrailingSlashRedirect
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'tedecx.pythonanywhere.com',
        pathname: '/media/**',
      }
    ],
  },
  // Recommended for debugging SSR issues
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Enable if you're using external redirects
  skipMiddlewareUrlNormalize: false, // Set to true ONLY if you have custom middleware
};

export default nextConfig;