/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@healthbridge/ui", "@healthbridge/core", "@healthbridge/contracts"],
  async rewrites() {
    const apiUrl = process.env.API_URL || "http://localhost:4000";
    console.log(`[Next.js Rewrites] Proxying /api/* requests to: ${apiUrl}/api/*`);
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
