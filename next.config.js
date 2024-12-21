/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // This allows production builds to successfully complete even with ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Disable Node.js 'fs' module
    return config;
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
