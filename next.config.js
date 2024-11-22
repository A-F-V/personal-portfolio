/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  images: {
    domains: [], // Add any image domains you'll be using
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(jpg|jpeg)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
