import type { NextConfig } from "next";
import path from "path";

const projectRoot = path.resolve(__dirname);
const localNodeModules = path.resolve(projectRoot, "node_modules");

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.context = projectRoot;
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      localNodeModules,
      ...(config.resolve.modules || []),
    ];
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      tailwindcss: path.resolve(localNodeModules, "tailwindcss"),
    };
    return config;
  },
};

export default nextConfig;
