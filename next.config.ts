import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
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
