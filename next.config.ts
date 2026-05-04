import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
    middlewareClientMaxBodySize: 100 * 1024 * 1024, // 100MB, matches above
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pjsschovqymnfflwquau.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;