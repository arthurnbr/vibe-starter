import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Off on purpose: internal CRUD app on a local SQLite file, every page is dynamic.
  // Cache Components adds Suspense/prerender constraints that cost time in a 40-min build.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
