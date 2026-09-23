import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination:
          "https://api.omaweapp.my.id/.well-known/apple-app-site-association",
      },
    ];
  },
};

export default nextConfig;
