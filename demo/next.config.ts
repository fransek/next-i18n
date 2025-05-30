import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [new URL("https://www.countryflags.com/**")],
  },
};

export default nextConfig;
