import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**', // Broadened pathname
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Added direct Unsplash hostname
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
