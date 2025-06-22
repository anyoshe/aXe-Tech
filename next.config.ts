import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const isAnalyze = process.env.ANALYZE === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  async headers() {
    return [
      {
        source: "/(.*)\\.(png|jpg|jpeg|svg|gif|webp|woff2|woff|ttf|eot|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default isAnalyze
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig;
