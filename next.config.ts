import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    domains: ["i.postimg.cc"],  // Add the allowed image domains here
  },
};

export default nextConfig;