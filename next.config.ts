import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  //rout /api/ to backend path
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://webchanneldev4.ham-sun.com:10004/api/v1/tbank/:path*", // Proxy to backend
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
