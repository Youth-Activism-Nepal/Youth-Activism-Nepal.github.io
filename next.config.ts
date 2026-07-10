import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["i.postimg.cc", "youthactivismnepal.org.np"],  // Add the allowed image domains here
  }
};

export default nextConfig;
