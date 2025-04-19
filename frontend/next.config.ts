import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },

// next.config.js
// module.exports = {
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
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
}

export default nextConfig;
