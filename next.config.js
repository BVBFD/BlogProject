/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'nodejs' || 'experimental-edge',
    optimizeCss: true,
    swcMinify: true,
    bundlePagesExternals: true,
    optimizeServerReact: true,
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dewa3t2gi/image/upload/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
