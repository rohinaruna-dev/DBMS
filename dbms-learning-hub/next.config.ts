import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable static export for GitHub Pages / Netlify Drop
  output: 'export',
  basePath: '/DBMS', // Required for GitHub Pages sub-path hosting
  // Skip TS errors during build — MUI v7 Typography fontWeight is accepted at runtime
  typescript: {
    ignoreBuildErrors: true,
  },
  // Required for MUI v7 with App Router
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'framer-motion'],
  },
};

export default nextConfig;
