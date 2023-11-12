/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  transpilePackages: ['../../../common/src/*'],
};

module.exports = nextConfig;
