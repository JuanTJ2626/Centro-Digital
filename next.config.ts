import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // Si el link de tu repo es Centro-Digital, descomenta la siguiente línea:
  // basePath: '/Centro-Digital',
};

export default nextConfig;
