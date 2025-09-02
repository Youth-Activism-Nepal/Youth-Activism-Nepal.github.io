import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    domains: ["i.postimg.cc", "youthactivismnepal.org.np"],  // Add the allowed image domains here
  },
};

export default nextConfig;