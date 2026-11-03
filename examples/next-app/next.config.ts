import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The example sits inside the package repo, which has its own lockfile.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
