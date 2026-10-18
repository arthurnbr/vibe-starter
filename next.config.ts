import { networkInterfaces } from "node:os"
import type { NextConfig } from "next";

// Without this, opening the dev server from another device (LAN IP, Tailscale 100.x, a phone) loads the HTML but
// blocks the dev scripts: the page shows, but no button, chart or form reacts. Allow every address of this machine.
const machineIps = Object.values(networkInterfaces())
  .flat()
  .flatMap((i) => (i && !i.internal ? [i.address] : []))

const nextConfig: NextConfig = {
  allowedDevOrigins: machineIps,
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
