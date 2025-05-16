import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "imxdhdqvbpzxypvwfnbp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
