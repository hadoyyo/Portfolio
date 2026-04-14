/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

export default nextConfig;
