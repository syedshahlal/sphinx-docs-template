/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development configuration
  ...(process.env.NODE_ENV === "development" && {
    // Enable hot reloading and fast refresh
    reactStrictMode: true,
    swcMinify: true,
  }),

  // Production configuration
  ...(process.env.NODE_ENV === "production" && {
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    basePath: process.env.GITHUB_PAGES ? "/gra-core-docs" : "",
    assetPrefix: process.env.GITHUB_PAGES ? "/gra-core-docs/" : "",
  }),

  // Common configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Enable local development
  experimental: {
    appDir: true,
  },

  images: {
    domains: [],
  },

  // Custom webpack config for development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Enable source maps in development
      config.devtool = "eval-source-map"
    }
    return config
  },
}

module.exports = nextConfig
