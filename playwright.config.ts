import { networkInterfaces } from "node:os"
import { defineConfig, devices } from "@playwright/test"

const PORT = 3999
// Test through the machine's network IP, not localhost: localhost is a "secure context" where HTTPS-only browser APIs
// (crypto.randomUUID, navigator.clipboard…) exist. From a phone, the LAN or Tailscale over http they are undefined and
// the page crashes. Testing on localhost hid exactly that bug once.
const HOST =
  Object.values(networkInterfaces())
    .flat()
    .find((i) => i && i.family === "IPv4" && !i.internal)?.address ?? "127.0.0.1"

// Runs against a production build on a dedicated port, after a fresh db:reset, so it tests what is demoed.
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1366, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] }, grep: /@mobile/ },
  ],
  webServer: {
    command: `npm run db:reset && npx next build && npx next start -p ${PORT} -H 0.0.0.0`,
    url: `http://${HOST}:${PORT}`,
    timeout: 180_000,
    reuseExistingServer: false,
  },
})
