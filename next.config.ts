import type { NextConfig } from "next";

const nextConfig: NextConfig = {
experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or "50mb" for larger files
    },
  },};

export default nextConfig;
