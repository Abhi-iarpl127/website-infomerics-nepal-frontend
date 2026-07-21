import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ratingcms.cwyde.com',
      },
      {
        protocol: 'https',
        hostname: 's3infomerics.bcwebwsie.com.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'infomerics-g.cwyde.com',
      },
      {
        protocol: 'https',
        hostname: 'groupcms.cwyde.com',
      },
    ],
  },
};

export default nextConfig;
