import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // http://webchanneldev4.ham-sun.com:10004
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://webchanneldev4.ham-sun.com:10004/api/v1/tbank/:path*",
        basePath: false,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/@core"),
      "@redux": path.resolve(__dirname, "src/@redux"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@fake-db": path.resolve(__dirname, "src/@fake-db"),
      "views": path.resolve(__dirname, "src/views"),
    };
    return config;
  },
};

export default nextConfig;