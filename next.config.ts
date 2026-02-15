import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: "/middleware",
        destination: "/proxy",
        permanent: false,
      },
      {
        source: "/middleware/:path*",
        destination: "/proxy/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
