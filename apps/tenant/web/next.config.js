/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@healthbridge/ui", "@healthbridge/core", "@healthbridge/contracts"],
};

module.exports = nextConfig;
