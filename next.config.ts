import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash（プレースホルダー画像）
      { protocol: "https", hostname: "images.unsplash.com" },
      // microCMS（アイキャッチ画像）
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },
};

export default nextConfig;
